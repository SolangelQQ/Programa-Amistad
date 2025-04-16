import { Role } from './role.entity';
import { Permission } from './permission.value-object';

export type UserStatus = 'active' | 'inactive' | 'pending';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public status: UserStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public roles: Role[] = [],
    public permissions: Permission[] = []
  ) {}

  hasPermission(permission: Permission): boolean {
    return this.permissions.includes(permission) || 
           this.roles.some(role => role.permissions.includes(permission));
  }

  assignRole(role: Role): void {
    if (!this.roles.some(r => r.id === role.id)) {
      this.roles.push(role);
      this.updatedAt = new Date();
    }
  }

  removeRole(roleId: string): void {
    this.roles = this.roles.filter(role => role.id !== roleId);
    this.updatedAt = new Date();
  }
}