// src/core/application/user/queries/GetRoleByIdQuery.ts
import { Role } from '../../../domain/user/role.entity';
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

export class GetRoleByIdQuery {
  constructor(private userRepository: UserRepository) {}

  async execute(roleId: string, requesterId: string): Promise<Role> {
    // Check if requester has role:read permission
    const requester = await this.userRepository.findById(requesterId);
    if (!requester || !requester.hasPermission('role:read')) {
      throw new AppError('No tienes permiso para ver roles', 403);
    }

    const role = await this.userRepository.findRoleById(roleId);
    if (!role) {
      throw new AppError('Rol no encontrado', 404);
    }

    return role;
  }
}