import { Permission } from './permission.value-object';

export class Role {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public permissions: Permission[] = []
  ) {}

  addPermission(permission: Permission): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
      this.updatedAt = new Date();
    }
  }

  removePermission(permission: Permission): void {
    this.permissions = this.permissions.filter(p => p !== permission);
    this.updatedAt = new Date();
  }
}