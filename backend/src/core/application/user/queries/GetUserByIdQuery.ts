import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

export class GetUserByIdQuery {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<{
    id: string;
    name: string;
    email: string;
    status: string;
    roles: { id: string; name: string }[];
  }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      roles: user.roles.map(role => ({
        id: role.id,
        name: role.name
      }))
    };
  }
}