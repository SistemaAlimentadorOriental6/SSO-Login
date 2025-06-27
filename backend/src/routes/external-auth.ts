import { Router, Request, Response } from 'express';
import { ExternalAuthService, ExternalAuthRequest } from '../services/external-auth';

const router = Router();

router.post('/external-auth', async (req: Request, res: Response) => {
  try {
    const { application, username, password } = req.body;

    // Validar datos requeridos
    if (!application || !username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Faltan datos requeridos: application, username, password'
      });
    }

    // Crear request para autenticación externa
    const authRequest: ExternalAuthRequest = {
      username,
      password,
      application
    };

    // Realizar autenticación externa
    const result = await ExternalAuthService.authenticateExternal(authRequest);

    return res.json(result);

  } catch (error: any) {
    console.error('Error en ruta external-auth:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

export default router; 