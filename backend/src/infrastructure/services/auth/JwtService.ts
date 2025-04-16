// backend/src/infrastructure/services/auth/JwtService.ts
import jwt, { JwtPayload as JWTPayload, SignOptions } from 'jsonwebtoken';
import { AppError } from '../../../shared/errors/AppError';

// 1. Extendemos la interfaz JwtPayload estándar
export interface JwtPayload extends JWTPayload {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
}

export class JwtService {
  private readonly defaultOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h'
  };

  constructor(
    private readonly secretKey: jwt.Secret, // Usamos el tipo Secret de jwt
    private readonly options: SignOptions = {}
  ) {
    if (typeof secretKey !== 'string' || secretKey.length < 8) {
      throw new Error('JWT secret key must be a string with at least 32 characters');
    }
    this.options = { ...this.defaultOptions, ...options };
  }

  // 2. Método generateToken con tipos explícitos
  generateToken(payload: JwtPayload): string {
    try {
      // Convertimos el payload a JwtPayload estándar
      const jwtPayload: JWTPayload = {
        ...payload,
        id: payload.id,
        email: payload.email
      };

      return jwt.sign(
        jwtPayload, // payload como JWTPayload
        this.secretKey, // secretKey como jwt.Secret
        {
          ...this.options,
          algorithm: 'HS256' // Algoritmo explícito
        } as SignOptions // Aseguramos el tipo SignOptions
      );
    } catch (error) {
      throw new AppError('Failed to generate token', 500);
    }
  }

  // 3. Método verifyToken con tipos explícitos
  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secretKey, this.options) as JwtPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Token expired', 401);
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid token', 401);
      }
      throw new AppError('Authentication failed', 401);
    }
  }
}