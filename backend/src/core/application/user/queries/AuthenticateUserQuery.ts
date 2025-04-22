import { UserRepository } from '../../../../infrastructure/persistence/user/UserRepository';
import { PasswordService } from '../../../../infrastructure/services/auth/PasswordService';
import { JwtService } from '../../../../infrastructure/services/auth/JwtService';
import { AppError } from '../../../../shared/errors/AppError';

export class AuthenticateUserQuery {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async execute(email: string, password: string): Promise<{ token: string; user: any }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
  
    const isPasswordValid = await this.passwordService.comparePasswords(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }
  
    // Add null checks for roles
    const roles = user.roles || [];
    const permissions = roles.flatMap(role => (role.permissions || []).map(p => p.value));
  
    const token = this.jwtService.generateToken({
      id: user.id,
      email: user.email,
      roles: roles.map(role => role.name),
      permissions: permissions
    });
    
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: roles.map(role => role.name)
      }
    };
  }
}