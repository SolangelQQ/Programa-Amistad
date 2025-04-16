// backend/src/core/application/user/queries/GetUsersByRoleQuery.ts
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { AppError } from '../../../../shared/errors/AppError';

export class GetUsersByRoleQuery {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(roleId: string): Promise<Array<{
    id: string;
    name: string;
    email: string;
    status: string;
  }>> {
    const users = await this.userRepository.findByRoleId(roleId);
    
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status
    }));
  }
}