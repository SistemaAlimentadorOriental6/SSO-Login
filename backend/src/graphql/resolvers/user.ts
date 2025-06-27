import bcrypt from 'bcryptjs';
import { Context, CreateUserInput, UpdateUserInput } from '../../types';
import { requireAuth, requireRole } from '../../middleware/auth';

export const userResolvers = {
  Query: {
    users: requireAuth(async (_parent: any, args: any, context: Context) => {
      const { skip = 0, take = 50, where = {} } = args;
      
      return await context.prisma.user.findMany({
        skip,
        take,
        where: {
          ...(where.username && { username: { contains: where.username } }),
          ...(where.email && { email: { contains: where.email } }),
          ...(where.isActive !== undefined && { isActive: where.isActive }),
          ...(where.role && { role: where.role }),
        },
        orderBy: { createdAt: 'desc' },
      });
    }),

    user: requireAuth(async (_parent: any, { id }: { id: string }, context: Context) => {
      return await context.prisma.user.findUnique({
        where: { id },
      });
    }),

    userByUsername: requireAuth(async (_parent: any, { username }: { username: string }, context: Context) => {
      return await context.prisma.user.findUnique({
        where: { username },
      });
    }),

    dashboardStats: requireRole(['ADMIN', 'SUPER_ADMIN'])(async (_parent: any, _args: any, context: Context) => {
      const [totalUsers, activeUsers, totalApplications, totalSessions] = await Promise.all([
        context.prisma.user.count(),
        context.prisma.user.count({ where: { isActive: true } }),
        context.prisma.application.count({ where: { isActive: true } }),
        context.prisma.session.count({ where: { isActive: true } }),
      ]);

      return {
        totalUsers,
        activeUsers,
        totalApplications,
        totalSessions,
      };
    }),

    loginAttempts: requireRole(['ADMIN', 'SUPER_ADMIN'])(async (_parent: any, args: any, context: Context) => {
      const { username, skip = 0, take = 50 } = args;
      
      return await context.prisma.loginAttempt.findMany({
        skip,
        take,
        where: username ? { username } : {},
        orderBy: { createdAt: 'desc' },
      });
    }),
  },

  Mutation: {
    createUser: requireRole(['ADMIN', 'SUPER_ADMIN'])(async (_parent: any, { input }: { input: CreateUserInput }, context: Context) => {
      const hashedPassword = await bcrypt.hash(input.password, 12);
      
      return await context.prisma.user.create({
        data: {
          ...input,
          password: hashedPassword,
          role: (input.role as any) || 'USER',
        },
      });
    }),

    updateUser: requireAuth(async (_parent: any, { id, input }: { id: string; input: UpdateUserInput }, context: Context) => {
      // Los usuarios solo pueden actualizar su propio perfil, excepto admins
      if (context.user!.id !== id && !['ADMIN', 'SUPER_ADMIN'].includes(context.user!.role)) {
        throw new Error('No tienes permisos para actualizar este usuario');
      }

      const updateData: any = { ...input };
      
      if (input.password) {
        updateData.password = await bcrypt.hash(input.password, 12);
      }

      return await context.prisma.user.update({
        where: { id },
        data: updateData,
      });
    }),

    deleteUser: requireRole(['SUPER_ADMIN'])(async (_parent: any, { id }: { id: string }, context: Context) => {
      // No permitir auto-eliminación
      if (context.user!.id === id) {
        throw new Error('No puedes eliminar tu propia cuenta');
      }

      await context.prisma.user.delete({
        where: { id },
      });

      return true;
    }),

    changePassword: requireAuth(async (_parent: any, { oldPassword, newPassword }: { oldPassword: string; newPassword: string }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { id: context.user!.id },
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      return await context.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedNewPassword },
      });
    }),
  },
}; 