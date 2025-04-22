// src/core/application/user/queries/GetAllRolesQuery.ts
import { Role } from '../../../domain/user/role.entity';
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

export class GetAllRolesQuery {
  constructor(private userRepository: UserRepository) {}

  async execute(requesterId: string): Promise<Role[]> {
    // Check if requester has role:read permission
    const requester = await this.userRepository.findById(requesterId);
    if (!requester || !requester.hasPermission('role:read')) {
      throw new AppError('No tienes permiso para ver roles', 403);
    }

    return this.userRepository.findAllRoles();
  }
}