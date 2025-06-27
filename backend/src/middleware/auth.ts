import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { User } from '@prisma/client';

interface JWTPayload {
  userId: string;
  cedula: string;
  sessionId: string;
}

export async function authenticateToken(token: string): Promise<User | null> {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    
    // Verificar que la sesión esté activa
    const session = await prisma.session.findUnique({
      where: { 
        id: payload.sessionId,
        token: token,
        isActive: true
      }
    });
    
    if (!session || session.expiresAt < new Date()) {
      return null;
    }
    
    // Actualizar última actividad de la sesión
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivity: new Date() }
    });
    
    // Obtener el usuario
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });
    
    return user;
  } catch (error) {
    console.error('Error verificando token:', error);
    return null;
  }
}

export function generateToken(userId: string, cedula: string, sessionId: string): string {
  const payload = {
    userId,
    cedula,
    sessionId
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h'
  });
}

export function requireAuth(resolver: any) {
  return async (parent: any, args: any, context: any, info: any) => {
    if (!context.user) {
      throw new Error('No autorizado. Por favor inicia sesión.');
    }
    return resolver(parent, args, context, info);
  };
}

export function requireRole(roles: string[]) {
  return (resolver: any) => {
    return async (parent: any, args: any, context: any, info: any) => {
      if (!context.user) {
        throw new Error('No autorizado. Por favor inicia sesión.');
      }
      
      if (!roles.includes(context.user.role)) {
        throw new Error('No tienes permisos para realizar esta acción.');
      }
      
      return resolver(parent, args, context, info);
    };
  };
} 