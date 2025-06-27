import axios from 'axios';
import jwt from 'jsonwebtoken';

export interface ExternalAuthConfig {
  name: string;
  authUrl: string;
  appUrl: string;
  method: 'POST' | 'GET';
  headers?: Record<string, string>;
  bodyFormat?: 'form-data' | 'json';
}

export interface ExternalAuthRequest {
  username: string;
  password: string;
  application: string;
}

export interface ExternalAuthResponse {
  success: boolean;
  token?: string;
  sessionId?: string;
  redirectUrl?: string;
  userData?: any;
  error?: string;
}

// Configuración de aplicaciones externas
const EXTERNAL_APPS_CONFIG: Record<string, ExternalAuthConfig> = {
  inspecciones: {
    name: 'Inspecciones',
    authUrl: 'https://inspecciones.sao6.com.co/auth/',
    appUrl: 'https://inspecciones.sao6.com.co/formulario',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    bodyFormat: 'form-data'
  },
  carrotaller: {
    name: 'Carrotaller',
    authUrl: 'https://carrotaller.sao6.com.co/auth/',
    appUrl: 'https://carrotaller.sao6.com.co/dashboard',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    bodyFormat: 'form-data'
  },
  activos: {
    name: 'Control de Activos',
    authUrl: 'https://activos.sao6.com.co/auth/',
    appUrl: 'https://activos.sao6.com.co/dashboard',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    bodyFormat: 'form-data'
  }
};

export class ExternalAuthService {
  /**
   * Crea un token SSO para autenticar en aplicación externa
   */
  static createSSOToken(userData: any, application: string): string {
    const secret = process.env.SSO_SECRET || 'your-secret-key';
    const payload = {
      userId: userData.id,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      application: application,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expira en 1 hora
    };
    
    console.log('🔐 SSO_SECRET en Node.js:', secret);
    console.log('📦 Payload del token:', payload);
    console.log('⏰ Tiempo actual:', new Date().toISOString());
    console.log('⏰ iat:', payload.iat, '- exp:', payload.exp);
    
    const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
    console.log('🎫 Token completo generado:', token);
    
    return token;
  }

  /**
   * Autentica un usuario en una aplicación externa usando SSO
   */
  static async authenticateExternalSSO(userData: any, application: string): Promise<ExternalAuthResponse> {
    const config = EXTERNAL_APPS_CONFIG[application.toLowerCase()];
    
    if (!config) {
      return {
        success: false,
        error: `Aplicación ${application} no configurada`
      };
    }

    try {
      // Crear token SSO
      const ssoToken = this.createSSOToken(userData, application);
      
      // Crear URL con token para auto-login
      const redirectUrl = `${config.appUrl}?sso_token=${ssoToken}`;
      
      console.log('🔑 Token SSO creado:', ssoToken.substring(0, 50) + '...');
      console.log('🌐 URL de redirección:', redirectUrl);
      console.log('👤 Datos del usuario:', userData);
      
      return {
        success: true,
        token: ssoToken,
        redirectUrl: redirectUrl,
        userData: {
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email
        }
      };

    } catch (error: any) {
      console.error(`Error creando token SSO para ${config.name}:`, error.message);
      return {
        success: false,
        error: `Error de autenticación SSO: ${error.message}`
      };
    }
  }

  /**
   * Autentica un usuario en una aplicación externa (método original)
   */
  static async authenticateExternal(request: ExternalAuthRequest): Promise<ExternalAuthResponse> {
    const config = EXTERNAL_APPS_CONFIG[request.application.toLowerCase()];
    
    if (!config) {
      return {
        success: false,
        error: `Aplicación ${request.application} no configurada`
      };
    }

    try {
      let requestData: any;
      let requestHeaders = { ...config.headers };

      if (config.bodyFormat === 'form-data') {
        // Formato form-data para aplicaciones que esperan este formato
        const formData = new URLSearchParams();
        formData.append('username', request.username);
        formData.append('password', request.password);
        requestData = formData.toString();
      } else {
        // Formato JSON
        requestData = {
          username: request.username,
          password: request.password
        };
        requestHeaders['Content-Type'] = 'application/json';
      }

      const response = await axios({
        method: config.method,
        url: config.authUrl,
        data: requestData,
        headers: requestHeaders,
        timeout: 10000, // 10 segundos de timeout
        validateStatus: () => true // No lanzar error por códigos de estado HTTP
      });

      // Procesar respuesta según el formato que devuelva cada aplicación
      return this.processExternalResponse(response, config.name);

    } catch (error: any) {
      console.error(`Error autenticando en ${config.name}:`, error.message);
      return {
        success: false,
        error: `Error de conexión con ${config.name}: ${error.message}`
      };
    }
  }

  /**
   * Procesa la respuesta de la aplicación externa
   */
  private static processExternalResponse(response: any, _appName: string): ExternalAuthResponse {
    const { status, data, headers } = response;

    // Si el status es 200-299, generalmente es exitoso
    if (status >= 200 && status < 300) {
      return {
        success: true,
        token: this.extractToken(data, headers),
        sessionId: this.extractSessionId(data, headers),
        userData: data
      };
    }

    // Si es 401 o 403, credenciales inválidas
    if (status === 401 || status === 403) {
      return {
        success: false,
        error: 'Credenciales inválidas'
      };
    }

    // Otros errores
    return {
      success: false,
      error: `Error ${status}: ${data?.message || data?.error || 'Error desconocido'}`
    };
  }

  /**
   * Extrae token de la respuesta (puede variar según la aplicación)
   */
  private static extractToken(data: any, headers: any): string | undefined {
    // Buscar token en diferentes ubicaciones comunes
    if (data?.token) return data.token;
    if (data?.access_token) return data.access_token;
    if (data?.authToken) return data.authToken;
    if (headers?.authorization) return headers.authorization;
    if (headers?.['x-auth-token']) return headers['x-auth-token'];
    
    return undefined;
  }

  /**
   * Extrae session ID de la respuesta
   */
  private static extractSessionId(data: any, headers: any): string | undefined {
    if (data?.sessionId) return data.sessionId;
    if (data?.session_id) return data.session_id;
    if (headers?.['set-cookie']) {
      // Buscar sessionid en cookies
      const cookies = headers['set-cookie'];
      for (const cookie of cookies) {
        const match = cookie.match(/sessionid=([^;]+)/);
        if (match) return match[1];
      }
    }
    
    return undefined;
  }

  /**
   * Obtiene la configuración de una aplicación
   */
  static getAppConfig(appName: string): ExternalAuthConfig | null {
    return EXTERNAL_APPS_CONFIG[appName.toLowerCase()] || null;
  }

  /**
   * Lista todas las aplicaciones configuradas
   */
  static getConfiguredApps(): string[] {
    return Object.keys(EXTERNAL_APPS_CONFIG);
  }
} 