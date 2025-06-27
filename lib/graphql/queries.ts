import { gql } from '@apollo/client';

// Mutation para login
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        firstName
        lastName
        role
        isActive
        externalId
        createdAt
      }
    }
  }
`;

// Query para obtener el usuario actual
export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      firstName
      lastName
      role
      isActive
      externalId
      applications {
        id
        application {
          id
          name
          description
          url
          icon
          category
        }
        isFavorite
        lastAccessed
        accessCount
      }
    }
  }
`;

// Query para obtener las aplicaciones del usuario
export const GET_MY_APPLICATIONS = gql`
  query GetMyApplications {
    myApplications {
      id
      isFavorite
      lastAccessed
      accessCount
      application {
        id
        name
        description
        url
        icon
        category
        order
      }
    }
  }
`;

// Mutation para logout
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

// Mutation para cerrar una sesión específica
export const LOGOUT_SESSION_MUTATION = gql`
  mutation LogoutSession($sessionId: ID!) {
    logoutSession(sessionId: $sessionId)
  }
`;

// Query para obtener las sesiones del usuario
export const GET_MY_SESSIONS = gql`
  query GetMySessions {
    mySessions {
      id
      ipAddress
      userAgent
      isActive
      expiresAt
      createdAt
      lastActivity
    }
  }
`;

// Mutation para trackear acceso a aplicación
export const TRACK_APPLICATION_ACCESS = gql`
  mutation TrackApplicationAccess($applicationId: ID!) {
    trackApplicationAccess(applicationId: $applicationId) {
      id
      lastAccessed
      accessCount
    }
  }
`;

// Tipos TypeScript para las respuestas
export interface User {
  id: string;
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  externalId?: number;
  createdAt: string;
}

export interface Application {
  id: string;
  name: string;
  description?: string;
  url: string;
  icon?: string;
  category?: string;
  order: number;
}

export interface UserApplication {
  id: string;
  isFavorite: boolean;
  lastAccessed?: string;
  accessCount: number;
  application: Application;
}

export interface LoginResponse {
  login: {
    token: string;
    user: User;
  };
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface Session {
  id: string;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  lastActivity: string;
} 