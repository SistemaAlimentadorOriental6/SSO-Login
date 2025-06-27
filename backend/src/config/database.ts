import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { verifyDjangoPassword, isDjangoHash } from '../utils/django-auth';

dotenv.config();

// Cliente Prisma para base de datos SSO
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Configuración para base de datos externa
const externalDbConfig = {
  host: process.env.EXTERNAL_DB_HOST,
  port: parseInt(process.env.EXTERNAL_DB_PORT || '3306'),
  user: process.env.EXTERNAL_DB_USER,
  password: process.env.EXTERNAL_DB_PASSWORD,
  database: process.env.EXTERNAL_DB_NAME
  // Sin configuración SSL para evitar errores de conexión
};

// Pool de conexiones para base de datos externa
let externalDbPool: mysql.Pool;

export async function getExternalDbConnection() {
  if (!externalDbPool) {
    externalDbPool = mysql.createPool({
      ...externalDbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return externalDbPool;
}

// Función para validar credenciales en base de datos externa
export async function validateExternalCredentials(username: string, password: string): Promise<any> {
  try {
    const pool = await getExternalDbConnection();
    
    // Consulta a la tabla auth_user de bdsaocomco_operaciones
    const [rows] = await pool.execute(
      'SELECT id, username, first_name, last_name, email, is_active, is_staff, is_superuser, password FROM auth_user WHERE username = ? AND is_active = 1',
      [username]
    );
    
    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0] as any;
      
      // Validar contraseña usando el hash de Django
      let isValidPassword = false;
      
      if (isDjangoHash(user.password)) {
        // Si es hash de Django, usar verificación Django
        isValidPassword = verifyDjangoPassword(password, user.password);
      } else {
        // Si no es hash de Django, comparación directa (fallback)
        isValidPassword = user.password === password;
      }
      
      if (isValidPassword) {
        return {
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          isActive: user.is_active === 1,
          isStaff: user.is_staff === 1,
          isSuperuser: user.is_superuser === 1
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error validando credenciales externas:', error);
    return null;
  }
}

// Cerrar conexiones al terminar la aplicación
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  if (externalDbPool) {
    await externalDbPool.end();
  }
}); 