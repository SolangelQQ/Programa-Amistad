// src/infrastructure/persistence/user/UserMapper.ts
import { User } from '../../../core/domain/user/user.entity';
import { Role } from '../../../core/domain/user/role.entity';
import { Permission } from '../../../core/domain/user/permission.value-object';

interface PersistenceUser {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserMapper {
  static toDomain(persistence: any, roles: Role[] = []): User {
    return new User(
      persistence.id,
      persistence.name,
      persistence.email,
      persistence.password,
      persistence.status,
      roles,
      new Date(persistence.created_at),
      new Date(persistence.updated_at)
    );
  }

  static toPersistence(domain: User): PersistenceUser {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      status: domain.status,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt
    };
  }

  static roleToDomain(persistence: any): Role {
    let permissions: Permission[] = [];
    
    if (persistence.permissions && Array.isArray(persistence.permissions)) {
      permissions = persistence.permissions.map(
        (p: any) => new Permission(p.value, p.description)
      );
    }
    
    return new Role(
      persistence.id,
      persistence.name,
      persistence.description,
      permissions
    );
  }
}