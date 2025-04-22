// src/core/application/user/commands/AssignRoleCommand.ts
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface AssignRoleRequest {
  userId: string;
  roleIds: string[];
}

export class AssignRoleCommand {
  constructor(private userRepository: UserRepository) {}

  async execute(request: AssignRoleRequest, requesterId: string): Promise<void> {
    // Check if requester has role:assign permission
    const requester = await this.userRepository.findById(requesterId);
    if (!requester || !requester.hasPermission('role:assign')) {
      throw new AppError('No tienes permiso para asignar roles', 403);
    }

    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const roles = await this.userRepository.findRolesByIds(request.roleIds);
    if (roles.length !== request.roleIds.length) {
      throw new AppError('Uno o más roles no encontrados', 404);
    }

    // Update user roles
    user['_roles'] = roles;
    await this.userRepository.save(user);
  }
}