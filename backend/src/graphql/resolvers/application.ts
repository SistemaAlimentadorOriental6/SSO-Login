import { Context } from '../../types';
import { requireAuth, requireRole } from '../../middleware/auth';

interface CreateApplicationInput {
  name: string;
  description?: string;
  url: string;
  icon?: string;
  category?: string;
  order?: number;
}

interface UpdateApplicationInput {
  name?: string;
  description?: string;
  url?: string;
  icon?: string;
  category?: string;
  order?: number;
  isActive?: boolean;
}

export const applicationResolvers = {
  Query: {
    applications: requireAuth(async (_parent: any, args: any, context: Context) => {
      const { skip = 0, take = 50, onlyActive = true } = args;
      
      return await context.prisma.application.findMany({
        skip,
        take,
        where: onlyActive ? { isActive: true } : {},
        orderBy: { order: 'asc' },
      });
    }),

    application: requireAuth(async (_parent: any, { id }: { id: string }, context: Context) => {
      return await context.prisma.application.findUnique({
        where: { id },
      });
    }),

    myApplications: requireAuth(async (_parent: any, _args: any, context: Context) => {
      return await context.prisma.userApplication.findMany({
        where: { userId: context.user!.id },
        include: { application: true },
        orderBy: { lastAccessed: 'desc' },
      });
    }),
  },

  Mutation: {
    createApplication: requireRole(['ADMIN', 'SUPER_ADMIN'])(async (_parent: any, { input }: { input: CreateApplicationInput }, context: Context) => {
      return await context.prisma.application.create({
        data: {
          ...input,
          order: input.order || 0,
        },
      });
    }),

    updateApplication: requireRole(['ADMIN', 'SUPER_ADMIN'])(async (_parent: any, { id, input }: { id: string; input: UpdateApplicationInput }, context: Context) => {
      return await context.prisma.application.update({
        where: { id },
        data: input,
      });
    }),

    deleteApplication: requireRole(['SUPER_ADMIN'])(async (_parent: any, { id }: { id: string }, context: Context) => {
      await context.prisma.application.delete({
        where: { id },
      });

      return true;
    }),

    addApplicationToUser: requireAuth(async (_parent: any, { applicationId }: { applicationId: string }, context: Context) => {
      // Verificar que la aplicación existe y está activa
      const application = await context.prisma.application.findUnique({
        where: { id: applicationId },
      });

      if (!application || !application.isActive) {
        throw new Error('Aplicación no encontrada o inactiva');
      }

      // Verificar si ya existe la relación
      const existing = await context.prisma.userApplication.findUnique({
        where: {
          userId_applicationId: {
            userId: context.user!.id,
            applicationId,
          },
        },
      });

      if (existing) {
        return existing;
      }

      return await context.prisma.userApplication.create({
        data: {
          userId: context.user!.id,
          applicationId,
        },
        include: { application: true },
      });
    }),

    removeApplicationFromUser: requireAuth(async (_parent: any, { applicationId }: { applicationId: string }, context: Context) => {
      await context.prisma.userApplication.deleteMany({
        where: {
          userId: context.user!.id,
          applicationId,
        },
      });

      return true;
    }),

    toggleFavoriteApplication: requireAuth(async (_parent: any, { applicationId }: { applicationId: string }, context: Context) => {
      const userApp = await context.prisma.userApplication.findUnique({
        where: {
          userId_applicationId: {
            userId: context.user!.id,
            applicationId,
          },
        },
      });

      if (!userApp) {
        throw new Error('No tienes acceso a esta aplicación');
      }

      return await context.prisma.userApplication.update({
        where: { id: userApp.id },
        data: { isFavorite: !userApp.isFavorite },
        include: { application: true },
      });
    }),

    trackApplicationAccess: requireAuth(async (_parent: any, { applicationId }: { applicationId: string }, context: Context) => {
      const userApp = await context.prisma.userApplication.findUnique({
        where: {
          userId_applicationId: {
            userId: context.user!.id,
            applicationId,
          },
        },
      });

      if (!userApp) {
        throw new Error('No tienes acceso a esta aplicación');
      }

      return await context.prisma.userApplication.update({
        where: { id: userApp.id },
        data: {
          lastAccessed: new Date(),
          accessCount: { increment: 1 },
        },
        include: { application: true },
      });
    }),
  },
}; 