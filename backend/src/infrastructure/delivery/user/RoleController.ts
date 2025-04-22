// src/infrastructure/delivery/user/RoleController.ts
import { Request, Response } from 'express';
import { CreateRoleCommand } from '../../../core/application/user/commands/CreateRoleCommand';
import { UpdateRoleCommand } from '../../../core/application/user/commands/UpdateRoleCommand';
import { DeleteRoleCommand } from '../../../core/application/user/commands/DeleteRoleCommand';
import { AssignRoleCommand } from '../../../core/application/user/commands/AssignRoleCommand';
import { GetRoleByIdQuery } from '../../../core/application/user/queries/GetRoleByIdQuery';
import { GetAllRolesQuery } from '../../../core/application/user/queries/GetAllRolesQuery';
import { GetUserRolesQuery } from '../../../core/application/user/queries/GetUserRolesQuery';
import { UserRepository } from '../../persistence/user/UserRepository';
import { AppError } from '../../../shared/errors/AppError';

export class RoleController {
  private userRepository: UserRepository;
  
  constructor() {
    this.userRepository = new UserRepository();
  }
  
  async createRole(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, permissions } = req.body;
      const userId = req.user?.id;
      
      if (!userId) {
        throw new AppError('Usuario no autenticado', 401);
      }
      
      const command = new CreateRoleCommand(this.userRepository);
      const role = await command.execute({ name, description, permissions }, userId);
      
      return res.status(201).json({ 
        message: 'Rol creado exitosamente',
        data: role.toObject()
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  async updateRole(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, description, permissions } = req.body;
      const userId = req.user?.id;
      
      if (!userId) {
        throw new AppError('Usuario no autenticado', 401);
      }
      
      const command = new UpdateRoleCommand(this.userRepository);
      const role = await command.execute({ id, name, description, permissions }, userId);
      
      return res.status(200).json({ 
        message: 'Rol actualizado exitosamente',
        data: role.toObject()
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  async deleteRole(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      
      if (!userId) {
        throw new AppError('Usuario no autenticado', 401);
      }
      
      const command = new DeleteRoleCommand(this.userRepository);
      await command.execute(id, userId);
      
      return res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  async assignRole(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, roleIds } = req.body;
      const requesterId = req.user?.id;
      
      if (!requesterId) {
        throw new AppError('Usuario no autenticado', 401);
      }
      
      const command = new AssignRoleCommand(this.userRepository);
      await command.execute({ userId, roleIds }, requesterId);
      
      return res.status(200).json({ message: 'Roles asignados exitosamente' });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  async getRoleById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      
      if (!userId) {
        throw new AppError('Usuario no autenticado', 401);
      }
      
      const query = new GetRoleByIdQuery(this.userRepository);
      const role = await query.execute(id, userId);
      
      return res.status(200).json({ 
        data: role.toObject()
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  async getAllRoles(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        throw new AppError('Usuario no autenticado', 401);
      }
      
      const query = new GetAllRolesQuery(this.userRepository);
      const roles = await query.execute(userId);
      
      return res.status(200).json({ 
        data: roles.map(role => role.toObject())
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  async getUserRoles(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const requesterId = req.user?.id;
      
      if (!requesterId) {
        throw new AppError('Usuario no autenticado', 401);
      }
      
      const query = new GetUserRolesQuery(this.userRepository);
      const roles = await query.execute(userId, requesterId);
      
      return res.status(200).json({ 
        data: roles.map(role => role.toObject())
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}