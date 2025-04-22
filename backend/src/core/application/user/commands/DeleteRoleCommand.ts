// src/core/application/user/commands/DeleteRoleCommand.ts
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

export class DeleteRoleCommand {
  constructor(private userRepository: UserRepository) {}

  async execute(roleId: string, requesterId: string): Promise<void> {
    // Check if requester has role:delete permission
    const requester = await this.userRepository.findById(requesterId);
    if (!requester || !requester.hasPermission('role:delete')) {
      throw new AppError('No tienes permiso para eliminar roles', 403);
    }

    const role = await this.userRepository.findRoleById(roleId);
    if (!role) {
      throw new AppError('Rol no encontrado', 404);
    }

    // Check if role is assigned to any user
    const usersWithRole = await this.userRepository.findByRoleId(roleId);
    if (usersWithRole.length > 0) {
      throw new AppError('No se puede eliminar un rol asignado a usuarios', 400);
    }

    await this.userRepository.deleteRole(roleId);
  }
}