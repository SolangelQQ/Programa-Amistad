// src/core/domain/user/role.entity.ts
import { Permission } from './permission.value-object';

export class Role {
  private _id: string;
  private _name: string;
  private _description: string;
  private _permissions: Permission[];

  constructor(
    id: string,
    name: string,
    description: string,
    permissions: Permission[] = []
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._permissions = permissions;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get permissions(): Permission[] {
    return [...this._permissions];
  }

  addPermission(permission: Permission): void {
    if (!this._permissions.some(p => p.value === permission.value)) {
      this._permissions.push(permission);
    }
  }

  hasPermission(permissionValue: string): boolean {
    return this._permissions.some(p => p.value === permissionValue);
  }

  toObject() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      permissions: this._permissions.map(p => p.value)
    };
  }
}