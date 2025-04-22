// src/core/domain/user/user.entity.ts
import { Role } from './role.entity';

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _status: string;
  private _roles: Role[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    status: string = 'active',
    roles: Role[] = [],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._status = status;
    this._roles = roles;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get status(): string {
    return this._status;
  }

  get roles(): Role[] {
    return [...this._roles];
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  addRole(role: Role): void {
    if (!this._roles.some(r => r.id === role.id)) {
      this._roles.push(role);
    }
  }

  removeRole(roleId: string): void {
    this._roles = this._roles.filter(r => r.id !== roleId);
  }

  hasRole(roleName: string): boolean {
    return this._roles.some(r => r.name === roleName);
  }

  hasPermission(permissionValue: string): boolean {
    return this._roles.some(role => role.hasPermission(permissionValue));
  }

  toObject() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      status: this._status,
      roles: this._roles.map(role => role.toObject()),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}