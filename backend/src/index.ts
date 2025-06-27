import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { prisma } from './config/database';
import { authenticateToken } from './middleware/auth';
import { Context } from './types';
import externalAuthRoutes from './routes/external-auth';

dotenv.config();

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT || 4000;

  // Configurar CORS
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  }));

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Registrar rutas REST
  app.use(json());
  app.use('/', externalAuthRoutes);

  // Crear servidor Apollo
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Iniciar servidor Apollo
  await server.start();

  // Aplicar middleware de Apollo a Express
  app.use(
    '/graphql',
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Obtener el usuario del token si existe
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = token ? await authenticateToken(token) : null;

        return {
          prisma,
          user,
          req,
        };
      },
    })
  );

  // Iniciar servidor HTTP
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  
  console.log(`🚀 Servidor SSO iniciado en http://localhost:${PORT}`);
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
}

// Manejo de errores
process.on('unhandledRejection', (err) => {
  console.error('Error no manejado:', err);
  process.exit(1);
});

// Iniciar servidor
startServer().catch((err) => {
  console.error('Error al iniciar servidor:', err);
  process.exit(1);
}); 