// src/infrastructure/persistence/user/UserRepository.ts
import { Role } from '@core/domain/user/role.entity';
import { User } from '@core/domain/user/user.entity';
import { Permission } from '@core/domain/user/permission.value-object';
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
  
  async findAll(): Promise<User[]> {
    const [users] = await this.connection.execute<RowDataPacket[]>(
      `SELECT * FROM users`
    );
    
    return Promise.all(users.map(async (userData) => {
      const roles = await this.findRolesByUserId(userData.id);
      return UserMapper.toDomain(userData, roles);
    }));
  }
  
  async findRoleById(roleId: string): Promise<Role | null> {
    const [roles] = await this.connection.execute<RowDataPacket[]>(
      `SELECT r.*, p.name, p.description as permission_description 
       FROM roles r
       LEFT JOIN role_permissions rp ON r.id = rp.role_id
       LEFT JOIN permissions p ON rp.permission_id = p.id
       WHERE r.id = ?`,
      [roleId]
    );
    
    if (roles.length === 0) return null;
    
    // Group permissions by role
    const roleData = roles[0];
    const permissions: Permission[] = [];
    
    roles.forEach(row => {
      if (row.permission) {
        permissions.push(new Permission(row.permission, row.permission_description));
      }
    });
    
    return new Role(roleData.id, roleData.name, roleData.description, permissions);
  }
  
  async findRolesByUserId(userId: string): Promise<Role[]> {
    const [roleRows] = await this.connection.execute<RowDataPacket[]>(
      `SELECT r.id, r.name, r.description 
       FROM roles r
       JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = ?`,
      [userId]
    );
    
    const roles: Role[] = [];
    
    for (const roleRow of roleRows) {
      const [permissionRows] = await this.connection.execute<RowDataPacket[]>(
        `SELECT p.name AS permission, p.description 
 FROM permissions p
 JOIN role_permissions rp ON p.id = rp.permission_id
 WHERE rp.role_id = ?`,
        [roleRow.id]
      );
      
      const permissions = permissionRows.map(
        p => new Permission(p.permission, p.description)
      );
      
      roles.push(new Role(roleRow.id, roleRow.name, roleRow.description, permissions));
    }
    
    return roles;
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
    
    const placeholders = roleIds.map(() => '?').join(',');
    const [roleRows] = await this.connection.execute<RowDataPacket[]>(
      `SELECT r.id, r.name, r.description 
       FROM roles r
       WHERE r.id IN (${placeholders})`,
      roleIds
    );
    
    const roles: Role[] = [];
    
    for (const roleRow of roleRows) {
      const [permissionRows] = await this.connection.execute<RowDataPacket[]>(
        `SELECT p.permission, p.description 
         FROM permissions p
         JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = ?`,
        [roleRow.id]
      );
      
      const permissions = permissionRows.map(
        p => new Permission(p.permission, p.description)
      );
      
      roles.push(new Role(roleRow.id, roleRow.name, roleRow.description, permissions));
    }
    
    return roles;
  }
  
  async findAllRoles(): Promise<Role[]> {
    const [roleRows] = await this.connection.execute<RowDataPacket[]>(
      `SELECT id, name, description FROM roles`
    );
    
    const roles: Role[] = [];
    
    for (const roleRow of roleRows) {
      const [permissionRows] = await this.connection.execute<RowDataPacket[]>(
        `SELECT p.permission, p.description 
         FROM permissions p
         JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = ?`,
        [roleRow.id]
      );
      
      const permissions = permissionRows.map(
        p => new Permission(p.permission, p.description)
      );
      
      roles.push(new Role(roleRow.id, roleRow.name, roleRow.description, permissions));
    }
    
    return roles;
  }
  
  async saveRole(role: Role): Promise<void> {
    const roleData = {
      id: role.id,
      name: role.name,
      description: role.description
    };
    
    const query = `
      INSERT INTO roles (id, name, description)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      description = VALUES(description)
    `;
    
    await this.connection.execute<ResultSetHeader>(query, [
      roleData.id,
      roleData.name,
      roleData.description
    ]);
    
    // Update role permissions
    await this.connection.execute<ResultSetHeader>(
      'DELETE FROM role_permissions WHERE role_id = ?',
      [roleData.id]
    );
    
    for (const permission of role.permissions) {
      // Find or create permission in the database
      const [permRows] = await this.connection.execute<RowDataPacket[]>(
        'SELECT id FROM permissions WHERE name = ?',
        [permission.value]
      );
      
      let permissionId: string;
      
      if (permRows.length === 0) {
        // Create new permission
        permissionId = await this.nextIdentity();
        await this.connection.execute<ResultSetHeader>(
          'INSERT INTO permissions (id, permission, description) VALUES (?, ?, ?)',
          [permissionId, permission.value, permission.description]
        );
      } else {
        permissionId = permRows[0].id;
      }
      
      // Associate permission with role
      await this.connection.execute<ResultSetHeader>(
        'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
        [roleData.id, permissionId]
      );
    }
  }
  
  async deleteRole(roleId: string): Promise<void> {
    // First delete role associations
    await this.connection.execute<ResultSetHeader>(
      'DELETE FROM role_permissions WHERE role_id = ?',
      [roleId]
    );
    
    await this.connection.execute<ResultSetHeader>(
      'DELETE FROM user_roles WHERE role_id = ?',
      [roleId]
    );
    
    // Then delete the role itself
    await this.connection.execute<ResultSetHeader>(
      'DELETE FROM roles WHERE id = ?',
      [roleId]
    );
  }
}