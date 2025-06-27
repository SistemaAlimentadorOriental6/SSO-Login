import * as crypto from 'crypto';

/**
 * Genera un hash de contraseña compatible con Django
 * Django usa el formato: algorithm$salt$hash
 * Por defecto usa PBKDF2 con SHA256
 */
export function makeDjangoPasswordHash(password: string): string {
  const algorithm = 'pbkdf2_sha256';
  const iterations = 600000; // Django 4.x default
  const salt = crypto.randomBytes(12).toString('base64').slice(0, 12);
  
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const hashBase64 = hash.toString('base64');
  
  return `${algorithm}$${iterations}$${salt}$${hashBase64}`;
}

/**
 * Verifica una contraseña contra un hash de Django
 */
export function verifyDjangoPassword(password: string, hashedPassword: string): boolean {
  try {
    const parts = hashedPassword.split('$');
    
    if (parts.length !== 4) {
      console.error('Formato de hash Django inválido');
      return false;
    }
    
    const [algorithm, iterations, salt, hash] = parts;
    
    if (algorithm !== 'pbkdf2_sha256') {
      console.error('Algoritmo no soportado:', algorithm);
      return false;
    }
    
    const iterationsNum = parseInt(iterations, 10);
    const computedHash = crypto.pbkdf2Sync(password, salt, iterationsNum, 32, 'sha256');
    const computedHashBase64 = computedHash.toString('base64');
    
    return computedHashBase64 === hash;
  } catch (error) {
    console.error('Error verificando contraseña Django:', error);
    return false;
  }
}

/**
 * Verifica si un hash parece ser de Django
 */
export function isDjangoHash(hash: string): boolean {
  return hash.startsWith('pbkdf2_sha256$') && hash.split('$').length === 4;
} 