import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// HTTP link para conectar con el backend GraphQL
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// Auth link para incluir el token JWT en las requests
const authLink = setContext((_, { headers }) => {
  // Obtener el token del localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Error link para manejar errores de GraphQL
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Si hay error de autenticación, limpiar token y redirigir
      if (message.includes('No autorizado') || message.includes('No estás autenticado')) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
        window.location.href = '/';
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Crear cliente Apollo
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
});

// Hook para obtener el usuario actual
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user-data');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

// Función para limpiar la sesión
export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
    apolloClient.clearStore();
  }
}; 