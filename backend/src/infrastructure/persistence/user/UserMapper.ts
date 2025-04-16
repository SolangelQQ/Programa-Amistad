import { Role } from '@core/domain/user/role.entity';
import { User } from '@core/domain/user/user.entity';
export class UserMapper {
  static toDomain(userData: any, roles: Role[] = []): User {
    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.status,
      new Date(userData.created_at),
      new Date(userData.updated_at),
      roles
    );
  }

  static roleToDomain(roleData: any): Role {
    return new Role(
      roleData.id,
      roleData.name,
      roleData.description,
      new Date(roleData.created_at),
      new Date(roleData.updated_at),
      JSON.parse(roleData.permissions || '[]')
    );
  }

  static toPersistence(user: User): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      status: user.status,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };
  }

  static roleToPersistence(role: Role): any {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: JSON.stringify(role.permissions),
      created_at: role.createdAt,
      updated_at: role.updatedAt
    };
  }
}