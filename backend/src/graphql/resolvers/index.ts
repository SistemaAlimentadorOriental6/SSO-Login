import { authResolvers } from './auth';
import { userResolvers } from './user';
import { applicationResolvers } from './application';
import { sessionResolvers } from './session';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

// Resolver para el tipo DateTime
const dateTimeResolver = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    return new Date(value as string);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  DateTime: dateTimeResolver,
  
  Query: {
    ...authResolvers.Query,
    ...userResolvers.Query,
    ...applicationResolvers.Query,
    ...sessionResolvers.Query,
  },
  
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...applicationResolvers.Mutation,
    ...sessionResolvers.Mutation,
  },
  
  // Resolvers de relaciones
  User: {
    sessions: async (parent: any, _args: any, context: any) => {
      return await context.prisma.session.findMany({
        where: { userId: parent.id },
        orderBy: { lastActivity: 'desc' }
      });
    },
    permissions: async (parent: any, _args: any, context: any) => {
      return await context.prisma.userPermission.findMany({
        where: { userId: parent.id },
        include: { permission: true }
      });
    },
    applications: async (parent: any, _args: any, context: any) => {
      return await context.prisma.userApplication.findMany({
        where: { userId: parent.id },
        include: { application: true }
      });
    },
  },
  
  Session: {
    user: async (parent: any, _args: any, context: any) => {
      return await context.prisma.user.findUnique({
        where: { id: parent.userId }
      });
    },
  },
  
  UserApplication: {
    user: async (parent: any, _args: any, context: any) => {
      return await context.prisma.user.findUnique({
        where: { id: parent.userId }
      });
    },
    application: async (parent: any, _args: any, context: any) => {
      return await context.prisma.application.findUnique({
        where: { id: parent.applicationId }
      });
    },
  },
  
  UserPermission: {
    user: async (parent: any, _args: any, context: any) => {
      return await context.prisma.user.findUnique({
        where: { id: parent.userId }
      });
    },
    permission: async (parent: any, _args: any, context: any) => {
      return await context.prisma.permission.findUnique({
        where: { id: parent.permissionId }
      });
    },
  },
  
  Permission: {
    application: async (parent: any, _args: any, context: any) => {
      if (!parent.applicationId) return null;
      return await context.prisma.application.findUnique({
        where: { id: parent.applicationId }
      });
    },
  },
}; 