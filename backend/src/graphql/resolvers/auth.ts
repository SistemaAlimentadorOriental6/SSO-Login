import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Context, LoginInput } from '../../types';
import { validateExternalCredentials } from '../../config/database';
import { generateToken } from '../../middleware/auth';
import { ExternalAuthService } from '../../services/external-auth';

export const authResolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: Context) => {
      return context.user;
    },

    getExternalApplications: async (_: any, __: any, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Usuario no autenticado');
        }

        const configuredApps = ExternalAuthService.getConfiguredApps();
        
        // Obtener aplicaciones del usuario que están configuradas para auth externa
        const userApps = await context.prisma.userApplication.findMany({
          where: {
            userId: context.user.id,
            application: {
              name: {
                in: configuredApps.map(app => 
                  app.charAt(0).toUpperCase() + app.slice(1)
                )
              }
            }
          },
          include: {
            application: true
          }
        });

        return userApps.map(userApp => ({
          id: userApp.application.id,
          name: userApp.application.name,
          description: userApp.application.description,
          url: userApp.application.url,
          icon: userApp.application.icon,
          category: userApp.application.category,
          isFavorite: userApp.isFavorite,
          lastAccessed: userApp.lastAccessed,
          accessCount: userApp.accessCount,
          hasExternalAuth: true,
          authConfig: ExternalAuthService.getAppConfig(userApp.application.name.toLowerCase())
        }));

      } catch (error: any) {
        console.error('Error obteniendo aplicaciones externas:', error.message);
        throw new Error(error.message);
      }
    }
  },

  Mutation: {
    login: async (_parent: any, { input }: { input: LoginInput }, context: Context) => {
      const { username, password } = input;

      try {
        // Validar credenciales en base de datos externa
        const externalUser = await validateExternalCredentials(username, password);
        
        if (!externalUser) {
          // Registrar intento fallido
          await context.prisma.loginAttempt.create({
            data: {
              username,
              success: false,
              reason: 'Credenciales inválidas en sistema externo',
              ipAddress: context.req.ip,
              userAgent: context.req.get('User-Agent') || null,
            },
          });
          
          throw new Error('Credenciales inválidas');
        }

        // VALIDACIÓN ESTRICTA: El usuario DEBE existir en ambas bases de datos
        let user = await context.prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          // Registrar intento fallido
          await context.prisma.loginAttempt.create({
            data: {
              username,
              success: false,
              reason: `Usuario ${username} no existe en base de datos SSO. Debe estar en ambas bases para acceder.`,
              ipAddress: context.req.ip,
              userAgent: context.req.get('User-Agent') || null,
            },
          });
          
          throw new Error(`Usuario ${username} no está registrado en el sistema SSO. Contacta al administrador para que te registre en ambas bases de datos.`);
        }

        // Verificar que el externalId coincida
        if (user.externalId !== externalUser.id) {
          await context.prisma.loginAttempt.create({
            data: {
              userId: user.id,
              username,
              success: false,
              reason: 'ID externo no coincide entre bases de datos',
              ipAddress: context.req.ip,
              userAgent: context.req.get('User-Agent') || null,
            },
          });
          
          throw new Error('Error de sincronización entre bases de datos. Contacta al administrador.');
        }

        // Actualizar datos del usuario con información del sistema externo (sincronización)
        const hashedPassword = await bcrypt.hash(password, 12);
        user = await context.prisma.user.update({
          where: { id: user.id },
          data: { 
            password: hashedPassword,
            firstName: externalUser.firstName || user.firstName,
            lastName: externalUser.lastName || user.lastName,
            email: externalUser.email || user.email,
            role: externalUser.isSuperuser ? 'SUPER_ADMIN' : (externalUser.isStaff ? 'ADMIN' : 'USER'),
          },
        });

        if (!user.isActive) {
          throw new Error('Tu cuenta ha sido desactivada');
        }

        // Crear nueva sesión
        const sessionId = uuidv4();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 horas

        const token = generateToken(user.id, user.username, sessionId);

        await context.prisma.session.create({
          data: {
            id: sessionId,
            userId: user.id,
            token,
            ipAddress: context.req.ip,
            userAgent: context.req.get('User-Agent') || null,
            expiresAt,
          },
        });

        // Registrar intento exitoso
        await context.prisma.loginAttempt.create({
          data: {
            userId: user.id,
            username,
            success: true,
            ipAddress: context.req.ip,
            userAgent: context.req.get('User-Agent') || null,
          },
        });

        return {
          token,
          user,
        };
      } catch (error) {
        console.error('Error en login:', error);
        
        // Registrar intento fallido si no se registró antes
        try {
          await context.prisma.loginAttempt.create({
            data: {
              username,
              success: false,
              reason: error instanceof Error ? error.message : 'Error desconocido',
              ipAddress: context.req.ip,
              userAgent: context.req.get('User-Agent') || null,
            },
          });
        } catch (logError) {
          console.error('Error registrando intento fallido:', logError);
        }

        throw error;
      }
    },

    logout: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw new Error('No estás autenticado');
      }

      const token = context.req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return false;
      }

      await context.prisma.session.updateMany({
        where: { token, userId: context.user.id },
        data: { isActive: false },
      });

      return true;
    },

    logoutSession: async (_parent: any, { sessionId }: { sessionId: string }, context: Context) => {
      if (!context.user) {
        throw new Error('No estás autenticado');
      }

      await context.prisma.session.updateMany({
        where: { 
          id: sessionId, 
          userId: context.user.id 
        },
        data: { isActive: false },
      });

      return true;
    },

    authenticateExternal: async (
      _: any, 
      { application }: { application: string },
      context: Context
    ) => {
      try {
        // Primero verificar que el usuario esté autenticado en nuestro SSO
        if (!context.user) {
          throw new Error('Usuario no autenticado en SSO');
        }

        // Verificar que el usuario tenga acceso a la aplicación
        const userApp = await context.prisma.userApplication.findFirst({
          where: {
            userId: context.user.id,
            application: {
              name: {
                contains: application
              }
            }
          },
          include: {
            application: true
          }
        });

        if (!userApp) {
          throw new Error(`Usuario no tiene acceso a la aplicación ${application}`);
        }

        // Usar el nuevo método SSO para crear token y URL de redirección
        const ssoResult = await ExternalAuthService.authenticateExternalSSO(context.user, application);
        
        if (!ssoResult.success) {
          throw new Error(ssoResult.error || 'Error en autenticación SSO');
        }

        // Actualizar último acceso a la aplicación
        await context.prisma.userApplication.update({
          where: {
            id: userApp.id
          },
          data: {
            lastAccessed: new Date(),
            accessCount: {
              increment: 1
            }
          }
        });

        // Registrar intento exitoso
        await context.prisma.loginAttempt.create({
          data: {
            userId: context.user.id,
            username: context.user.username,
            success: true,
            reason: `Acceso simulado a aplicación externa ${application}`,
            ipAddress: context.req?.ip,
            userAgent: context.req?.headers['user-agent']
          }
        });

        return {
          success: true,
          message: `Acceso autorizado a ${application}`,
          token: ssoResult.token,
          sessionId: null,
          applicationUrl: ssoResult.redirectUrl || userApp.application.url || `/${application}`,
          userData: ssoResult.userData
        };

      } catch (error: any) {
        console.error('Error en autenticación externa:', error.message);
        
        // Registrar intento fallido si hay usuario en contexto
        if (context.user) {
          try {
            await context.prisma.loginAttempt.create({
              data: {
                userId: context.user.id,
                username: context.user.username,
                success: false,
                reason: `Error en autenticación externa: ${error.message}`,
                ipAddress: context.req?.ip,
                userAgent: context.req?.headers['user-agent']
              }
            });
          } catch (logError) {
            console.error('Error registrando intento fallido:', logError);
          }
        }

        throw new Error(error.message);
      }
    },

    getExternalAuthUrl: async (
      _: any,
      { application }: { application: string },
      context: Context
    ) => {
      try {
        if (!context.user) {
          throw new Error('Usuario no autenticado');
        }

        const config = ExternalAuthService.getAppConfig(application);
        if (!config) {
          throw new Error(`Aplicación ${application} no configurada`);
        }

                 // Verificar acceso del usuario
         const userApp = await context.prisma.userApplication.findFirst({
           where: {
             userId: context.user.id,
             application: {
               name: {
                 contains: application
               }
             }
           },
           include: {
             application: true
           }
         });

        if (!userApp) {
          throw new Error(`Usuario no tiene acceso a la aplicación ${application}`);
        }

        return {
          authUrl: config.authUrl,
          method: config.method,
          applicationUrl: userApp.application.url,
          requiresCredentials: true
        };

      } catch (error: any) {
        console.error('Error obteniendo URL de autenticación:', error.message);
        throw new Error(error.message);
      }
    }
  },
}; 