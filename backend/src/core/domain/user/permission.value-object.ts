// src/core/domain/user/permission.value-object.ts

export class Permission {
  private _value: string;
  private _description: string;

  constructor(value: string, description: string) {
    this._value = value;
    this._description = description;
  }

  get value(): string {
    return this._value;
  }

  get description(): string {
    return this._description;
  }

  equals(permission: Permission): boolean {
    return this._value === permission.value;
  }

  static readonly USER_CREATE = new Permission('user:create', 'Create users');
  static readonly USER_READ = new Permission('user:read', 'Read user information');
  static readonly USER_UPDATE = new Permission('user:update', 'Update user information');
  static readonly USER_DELETE = new Permission('user:delete', 'Delete users');
  
  static readonly ROLE_CREATE = new Permission('role:create', 'Create roles');
  static readonly ROLE_READ = new Permission('role:read', 'Read role information');
  static readonly ROLE_UPDATE = new Permission('role:update', 'Update role information');
  static readonly ROLE_DELETE = new Permission('role:delete', 'Delete roles');
  static readonly ROLE_ASSIGN = new Permission('role:assign', 'Assign roles to users');
  
  static readonly ACTIVITY_CREATE = new Permission('activity:create', 'Create activities');
  static readonly ACTIVITY_READ = new Permission('activity:read', 'Read activity information');
  static readonly ACTIVITY_UPDATE = new Permission('activity:update', 'Update activity information');
  static readonly ACTIVITY_DELETE = new Permission('activity:delete', 'Delete activities');

  // Program specific permissions
  static readonly BUDDY_MANAGE = new Permission('buddy:manage', 'Manage buddies');
  static readonly PEERBUDDY_MANAGE = new Permission('peerbuddy:manage', 'Manage peer buddies');
  static readonly TUTOR_MANAGE = new Permission('tutor:manage', 'Manage tutors');
  
  static readonly ALL_PERMISSIONS = [
    Permission.USER_CREATE, Permission.USER_READ, Permission.USER_UPDATE, Permission.USER_DELETE,
    Permission.ROLE_CREATE, Permission.ROLE_READ, Permission.ROLE_UPDATE, Permission.ROLE_DELETE, Permission.ROLE_ASSIGN,
    Permission.ACTIVITY_CREATE, Permission.ACTIVITY_READ, Permission.ACTIVITY_UPDATE, Permission.ACTIVITY_DELETE,
    Permission.BUDDY_MANAGE, Permission.PEERBUDDY_MANAGE, Permission.TUTOR_MANAGE
  ];

  static fromString(value: string): Permission | undefined {
    return this.ALL_PERMISSIONS.find(p => p.value === value);
  }
}