import { User } from '../../../domain/user/user.entity';
import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { PasswordService } from '../../../../infrastructure/services/auth/PasswordService';
import { AppError } from '../../../../shared/errors/AppError';

export class CreateUserCommand {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService
  ) {}

  async execute(
    name: string,
    email: string,
    password: string,
    roleIds: string[] = []
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }
  
    const hashedPassword = await this.passwordService.hashPassword(password);
    const userId = await this.userRepository.nextIdentity(); // Aquí añadimos await
    const user = new User(
      userId, // Usamos el id ya resuelto
      name,
      email,
      hashedPassword,
      'active',
      new Date(),
      new Date()
    );

    // Assign roles if provided
    if (roleIds.length > 0) {
      const roles = await this.userRepository.findRolesByIds(roleIds);
      user.roles = roles;
    }

    await this.userRepository.save(user);
    return user;
  }
}