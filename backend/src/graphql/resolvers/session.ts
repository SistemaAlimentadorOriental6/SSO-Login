import { Context } from '../../types';
import { requireAuth, requireRole } from '../../middleware/auth';

export const sessionResolvers = {
  Query: {
    mySessions: requireAuth(async (_parent: any, _args: any, context: Context) => {
      return await context.prisma.session.findMany({
        where: { userId: context.user!.id },
        orderBy: { lastActivity: 'desc' },
      });
    }),

    activeSessions: requireRole(['ADMIN', 'SUPER_ADMIN'])(async (_parent: any, { userId }: { userId: string }, context: Context) => {
      return await context.prisma.session.findMany({
        where: { 
          userId,
          isActive: true,
          expiresAt: { gt: new Date() }
        },
        orderBy: { lastActivity: 'desc' },
      });
    }),
  },

  Mutation: {
    // Los mutations de logout ya están en auth.ts
  },
}; 