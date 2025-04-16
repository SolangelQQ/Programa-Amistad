// backend/src/infrastructure/delivery/user/AuthController.ts
import { Request, Response } from 'express';
import { AuthenticateUserQuery } from '@core/application/user/queries/AuthenticateUserQuery';
import { UserRepository } from '@infrastructure/persistence/user/UserRepository';
import { PasswordService } from '../../services/auth/PasswordService';
import { JwtService } from '../../services/auth/JwtService';
import { AppError } from '@shared/errors/AppError';
import { GetUserByIdQuery } from '@core/application/user/queries/GetUserByIdQuery';
import { StringValue } from 'ms';

export class AuthController {
  private userRepository: UserRepository;
  private passwordService: PasswordService;
  private jwtService: JwtService;

  constructor() {
    this.userRepository = new UserRepository();
    this.passwordService = new PasswordService();
    
    // Convertimos el string a StringValue o number
    const expiresIn = this.parseExpiresIn(process.env.JWT_EXPIRES_IN || '1h');

    this.jwtService = new JwtService(
      process.env.JWT_SECRET || 'your-32-char-secret-key-here',
      {
        algorithm: 'HS256',
        expiresIn: expiresIn as number | StringValue // Aseguramos el tipo correcto
      }
    );
  }

  private parseExpiresIn(value: string): number | StringValue {
    // Si es un número directo (en milisegundos)
    if (/^\d+$/.test(value)) {
      return parseInt(value, 10);
    }
    // Si es un string con unidad (1h, 2d, etc.)
    return value as StringValue;
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const query = new AuthenticateUserQuery(
        this.userRepository,
        this.passwordService,
        this.jwtService
      );
      const result = await query.execute(email, password);
      
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new AppError('Authorization header missing', 401);
      }

      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verifyToken(token);

      const query = new GetUserByIdQuery(this.userRepository);
      const user = await query.execute(decoded.id);
      
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}