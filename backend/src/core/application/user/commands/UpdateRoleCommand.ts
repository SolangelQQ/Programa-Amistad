// src/core/application/user/commands/UpdateRoleCommand.ts
import { Role } from '../../../domain/user/role.entity';
import { Permission } from '../../../domain/user/permission.value-object';
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface UpdateRoleRequest {
  id: string;
  name?: string;
  description?: string;
  permissions?: string[];
}

export class UpdateRoleCommand {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateRoleRequest, requesterId: string): Promise<Role> {
    // Check if requester has role:update permission
    const requester = await this.userRepository.findById(requesterId);
    if (!requester || !requester.hasPermission('role:update')) {
      throw new AppError('No tienes permiso para actualizar roles', 403);
    }

    const role = await this.userRepository.findRoleById(request.id);
    if (!role) {
      throw new AppError('Rol no encontrado', 404);
    }

    const updatedRole = new Role(
      role.id,
      request.name || role.name,
      request.description || role.description,
      role.permissions
    );

    if (request.permissions) {
      const permissions = request.permissions
        .map(p => Permission.fromString(p))
        .filter((p): p is Permission => p !== undefined);
      
      // Clear and add new permissions
      updatedRole['_permissions'] = permissions;
    }

    await this.userRepository.saveRole(updatedRole);
    return updatedRole;
  }
}