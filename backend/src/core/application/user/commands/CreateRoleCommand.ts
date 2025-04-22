
// src/core/application/user/commands/CreateRoleCommand.ts
import { Role } from '../../../domain/user/role.entity';
import { Permission } from '../../../domain/user/permission.value-object';
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';
import crypto from 'crypto';

interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export class CreateRoleCommand {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateRoleRequest, requesterId: string): Promise<Role> {
    // Check if requester has role:create permission
    const requester = await this.userRepository.findById(requesterId);
    if (!requester || !requester.hasPermission('role:create')) {
      throw new AppError('No tienes permiso para crear roles', 403);
    }

    const id = await this.userRepository.nextIdentity();
    const permissions = request.permissions
      .map(p => Permission.fromString(p))
      .filter((p): p is Permission => p !== undefined);

    const role = new Role(id, request.name, request.description, permissions);
    await this.userRepository.saveRole(role);
    return role;
  }
}