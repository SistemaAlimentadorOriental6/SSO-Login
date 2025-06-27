import { PrismaClient, User } from '@prisma/client';
import { Request } from 'express';

export interface Context {
  prisma: PrismaClient;
  user: User | null;
  req: Request;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface CreateUserInput {
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password: string;
  role?: string;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  password?: string;
}

export interface PaginationArgs {
  skip?: number;
  take?: number;
}

export interface UserFilter {
  username?: string;
  email?: string;
  isActive?: boolean;
  role?: string;
} 