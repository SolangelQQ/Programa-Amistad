import { Role } from '@core/domain/user/role.entity';
import { User } from '@core/domain/user/user.entity';
import { getConnection } from '../../../shared/config/database';
import { UserMapper } from './UserMapper';
import { AppError } from '../../../shared/errors/AppError';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import crypto from 'crypto';

export class UserRepository {
  private connection = getConnection();

  async nextIdentity(): Promise<string> {
    return crypto.randomUUID();
  }

  async save(user: User): Promise<void> {
    const userData = UserMapper.toPersistence(user);
    const query = `
      INSERT INTO users (id, name, email, password, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        email = VALUES(email),
        password = VALUES(password),
        status = VALUES(status),
        updated_at = VALUES(updated_at)
    `;

    await this.connection.execute<ResultSetHeader>(query, [
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.status,
      userData.createdAt,
      userData.updatedAt
    ]);

    // Update user roles
    await this.connection.execute<ResultSetHeader>(
      'DELETE FROM user_roles WHERE user_id = ?',
      [userData.id]
    );

    if (user.roles.length > 0) {
      const roleValues = user.roles.map(role => [userData.id, role.id]);
      await this.connection.execute<ResultSetHeader>(
        'INSERT INTO user_roles (user_id, role_id) VALUES ?',
        [roleValues]
      );
    }
  }

  async findById(id: string): Promise<User | null> {
    const [users] = await this.connection.execute<RowDataPacket[]>(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
  
    if (users.length === 0) return null;
  
    const userData = users[0];
    const roles = await this.findRolesByUserId(id);
    
    return UserMapper.toDomain(userData, roles);
  }

  async findByEmail(email: string): Promise<User | null> {
    const [users] = await this.connection.execute<RowDataPacket[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
  
    if (users.length === 0) return null;
  
    const userData = users[0];
    const roles = await this.findRolesByUserId(userData.id);
    
    return UserMapper.toDomain(userData, roles);
  }

  async findRoleById(roleId: string): Promise<Role | null> {
    const [roles] = await this.connection.execute<RowDataPacket[]>(
      `SELECT * FROM roles WHERE id = ?`,
      [roleId]
    );
  
    if (roles.length === 0) return null;
    return UserMapper.roleToDomain(roles[0]);
  }

  async findRolesByUserId(userId: string): Promise<Role[]> {
    const [roles] = await this.connection.execute<RowDataPacket[]>(
      `SELECT r.* FROM roles r
       JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = ?`,
      [userId]
    );
  
    return roles.map(roleData => UserMapper.roleToDomain(roleData));
  }

  async findByRoleId(roleId: string): Promise<User[]> {
    const [users] = await this.connection.execute<RowDataPacket[]>(
      `SELECT u.* FROM users u
       JOIN user_roles ur ON u.id = ur.user_id
       WHERE ur.role_id = ?`,
      [roleId]
    );

    return Promise.all(users.map(async (userData) => {
      const roles = await this.findRolesByUserId(userData.id);
      return UserMapper.toDomain(userData, roles);
    }));
  }

  async findRolesByIds(roleIds: string[]): Promise<Role[]> {
    if (roleIds.length === 0) return [];
    
    const [roles] = await this.connection.execute<RowDataPacket[]>(
      `SELECT * FROM roles WHERE id IN (?)`,
      [roleIds]
    );

    return roles.map(roleData => UserMapper.roleToDomain(roleData));
  }

  async findAllRoles(): Promise<Role[]> {
    const [roles] = await this.connection.execute<RowDataPacket[]>(
      `SELECT * FROM roles`
    );
    return roles.map(roleData => UserMapper.roleToDomain(roleData));
  }
}