// src/core/application/user/queries/GetUserRolesQuery.ts
import { Role } from '../../../domain/user/role.entity';
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

export class GetUserRolesQuery {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, requesterId: string): Promise<Role[]> {
    // Check if requester has user:read permission or is reading their own roles
    const requester = await this.userRepository.findById(requesterId);
    if (!requester || (!requester.hasPermission('user:read') && requesterId !== userId)) {
      throw new AppError('No tienes permiso para ver los roles de este usuario', 403);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return user.roles;
  }
}