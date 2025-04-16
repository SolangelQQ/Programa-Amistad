import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

export class AssignRoleCommand {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, roleId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const role = await this.userRepository.findRoleById(roleId);
    if (!role) {
      throw new AppError('Role not found', 404);
    }

    user.assignRole(role);
    await this.userRepository.save(user);
  }
}