import { prisma } from '../config/database';
import { getExternalDbConnection } from '../config/database';
import { makeDjangoPasswordHash } from './django-auth';

interface UserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
  isActive?: boolean;
  isStaff?: boolean;
  isSuperuser?: boolean;
}

/**
 * Crea un usuario en ambas bases de datos de forma sincronizada
 */
export async function createUserInBothDbs(userData: UserData): Promise<{ success: boolean; message: string }> {
  const { username, password, firstName, lastName, email, isActive = true, isStaff = false, isSuperuser = false } = userData;

  try {
    // 1. Verificar que el usuario no exista en ninguna de las dos bases
    const existingInSSO = await prisma.user.findUnique({
      where: { username }
    });

    if (existingInSSO) {
      return { success: false, message: `Usuario ${username} ya existe en base de datos SSO` };
    }

    const pool = await getExternalDbConnection();
    const [existingExternal] = await pool.execute(
      'SELECT id FROM auth_user WHERE username = ?',
      [username]
    );

    if (Array.isArray(existingExternal) && existingExternal.length > 0) {
      return { success: false, message: `Usuario ${username} ya existe en base de datos externa` };
    }

    // 2. Crear hash de Django para la contraseña
    const djangoHash = makeDjangoPasswordHash(password);

    // 3. Crear usuario en base de datos externa (auth_user)
    const [result] = await pool.execute(
      `INSERT INTO auth_user (
        username, password, first_name, last_name, email, 
        is_active, is_staff, is_superuser, date_joined
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [username, djangoHash, firstName, lastName, email || '', isActive ? 1 : 0, isStaff ? 1 : 0, isSuperuser ? 1 : 0]
    );

    const externalUserId = (result as any).insertId;

    // 4. Crear usuario en base de datos SSO
    const bcrypt = require('bcryptjs');
    const hashedPasswordSSO = await bcrypt.hash(password, 12);

    const ssoUser = await prisma.user.create({
      data: {
        username,
        password: hashedPasswordSSO,
        firstName,
        lastName,
        email: email || null,
        externalId: externalUserId,
        isActive,
        isVerified: true,
        role: isSuperuser ? 'SUPER_ADMIN' : (isStaff ? 'ADMIN' : 'USER'),
      }
    });

    // 5. Asignar aplicaciones por defecto
    await assignDefaultApplications(ssoUser.id);

    return { 
      success: true, 
      message: `Usuario ${username} creado exitosamente en ambas bases de datos` 
    };

  } catch (error) {
    console.error('Error creando usuario en ambas bases:', error);

    return { 
      success: false, 
      message: `Error creando usuario: ${error instanceof Error ? error.message : 'Error desconocido'}. IMPORTANTE: Verifica que el usuario esté en ambas bases de datos antes de intentar login.` 
    };
  }
}

/**
 * Verifica que un usuario esté sincronizado entre ambas bases de datos
 */
export async function verifyUserSync(username: string): Promise<{ 
  inSync: boolean; 
  ssoExists: boolean; 
  externalExists: boolean; 
  details: string 
}> {
  try {
    // Verificar en SSO
    const ssoUser = await prisma.user.findUnique({
      where: { username }
    });

    // Verificar en base externa
    const pool = await getExternalDbConnection();
    const [externalRows] = await pool.execute(
      'SELECT id, username, first_name, last_name, email, is_active FROM auth_user WHERE username = ?',
      [username]
    );

    const externalUser = Array.isArray(externalRows) && externalRows.length > 0 ? externalRows[0] as any : null;

    const ssoExists = !!ssoUser;
    const externalExists = !!externalUser;

    if (!ssoExists && !externalExists) {
      return {
        inSync: false,
        ssoExists: false,
        externalExists: false,
        details: 'Usuario no existe en ninguna base de datos'
      };
    }

    if (!ssoExists) {
      return {
        inSync: false,
        ssoExists: false,
        externalExists: true,
        details: 'Usuario existe solo en base de datos externa'
      };
    }

    if (!externalExists) {
      return {
        inSync: false,
        ssoExists: true,
        externalExists: false,
        details: 'Usuario existe solo en base de datos SSO'
      };
    }

    // Verificar que los datos básicos coincidan
    const dataMatches = 
      ssoUser.firstName === externalUser.first_name &&
      ssoUser.lastName === externalUser.last_name &&
      ssoUser.email === externalUser.email &&
      ssoUser.externalId === externalUser.id;

    return {
      inSync: dataMatches,
      ssoExists: true,
      externalExists: true,
      details: dataMatches ? 'Usuario sincronizado correctamente' : 'Datos no coinciden entre bases'
    };

  } catch (error) {
    return {
      inSync: false,
      ssoExists: false,
      externalExists: false,
      details: `Error verificando sincronización: ${error instanceof Error ? error.message : 'Error desconocido'}`
    };
  }
}

/**
 * Asigna aplicaciones por defecto a un usuario
 */
async function assignDefaultApplications(userId: string) {
  const defaultApps = ['Inspecciones', 'Carrotaller', 'Control de Activos'];
  
  for (const appName of defaultApps) {
    const app = await prisma.application.findFirst({
      where: { name: appName }
    });

    if (app) {
      const existing = await prisma.userApplication.findUnique({
        where: {
          userId_applicationId: {
            userId,
            applicationId: app.id
          }
        }
      });

      if (!existing) {
        await prisma.userApplication.create({
          data: {
            userId,
            applicationId: app.id
          }
        });
      }
    }
  }
} 