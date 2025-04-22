import { Request, Response } from 'express';
import { CreateUserCommand } from '@core/application/user/commands/CreateUserCommand';
import { AssignRoleCommand } from '@core/application/user/commands/AssignRoleCommand';
import { GetUserByIdQuery } from '@core/application/user/queries/GetUserByIdQuery';
import { GetUsersByRoleQuery } from '@core/application/user/queries/GetUsersByRoleQuery';
import { UserRepository } from '@infrastructure/persistence/user/UserRepository';
import { PasswordService } from '../../services/auth/PasswordService';
import { AppError } from '@shared/errors/AppError';

export class UserController {
  private userRepository: UserRepository;
  private passwordService: PasswordService;

  constructor() {
    this.userRepository = new UserRepository();
    this.passwordService = new PasswordService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, roleIds } = req.body;
      const command = new CreateUserCommand(this.userRepository, this.passwordService);
      const user = await command.execute(name, email, password, roleIds);
      
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async assignRole(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { roleId } = req.body;
  
      const command = new AssignRoleCommand(this.userRepository);
      const requestPayload = {
        userId,
        roleIds: [roleId]
      };
  
      const requesterId = req.user?.id || ''; // Asegúrate de tener middleware que agregue `req.user`
  
      await command.execute(requestPayload, requesterId);
  
      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
  

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const query = new GetUserByIdQuery(this.userRepository);
      const user = await query.execute(id);
      
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async getUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const query = new GetUsersByRoleQuery(this.userRepository);
      const users = await query.execute(roleId);
      
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}