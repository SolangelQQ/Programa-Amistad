// backend/src/interfaces/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../infrastructure/services/auth/JwtService';
import { AppError } from '../../shared/errors/AppError';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
      roles: string[];
      permissions: string[];
    };
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Authorization header missing', 401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new AppError('Token missing', 401);
  }

  const jwtService = new JwtService(
    process.env.JWT_SECRET || 'your-32-char-secret-key-here',
    {
      // Solo necesitamos el algoritmo para verificar
      algorithm: 'HS256'
    }
  );

  try {
    const decoded = jwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }
}

export function authorize(requiredPermissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new AppError('Forbidden - Insufficient permissions', 403);
    }

    next();
  };
}