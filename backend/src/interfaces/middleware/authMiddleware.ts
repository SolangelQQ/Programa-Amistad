// src/interfaces/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../infrastructure/services/auth/JwtService';
import { UserRepository } from '../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../shared/errors/AppError';
import { Permission } from '@core/domain/user/permission.value-object';
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        roles: string[];
      };
    }
  }
}

const jwtService = new JwtService(
  'tu_super_secreto_muy_largo_y_complejo_aqui_min_32_caracteres', // secretKey (string)
  { 
    expiresIn: '1h', // Opciones (SignOptions)
    algorithm: 'HS256'
  }
);
const userRepository = new UserRepository();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith(`Bearer `)) {
      throw new AppError('Token no proporcionado', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwtService.verifyToken(token);

    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      throw new AppError('Token inválido', 401);
    }

    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      throw new AppError('Usuario no encontrado', 401);
    }

    req.user = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(role => role.name)
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(401).json({ message: 'No autorizado' });
  }
};

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Usuario no autenticado', 401);
      }

      const user = await userRepository.findById(req.user.id);
      if (!user) {
        throw new AppError('Usuario no encontrado', 401);
      }

      const permission = Permission.fromString(requiredPermission);
      if (!permission) {
        throw new AppError('Permiso no válido', 400);
      }


      if (!user.hasPermission(requiredPermission)) {
        throw new AppError('No tienes permiso para realizar esta acción', 403);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
};