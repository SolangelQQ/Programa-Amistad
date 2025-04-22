// // src/core/application/role.service.ts
// import { roleApi } from '../../infrastructure/api/role.api';

// export interface RoleDTO {
//   id: string;
//   name: string;
//   description: string;
//   permissions: string[];
// }

// export interface CreateRoleRequest {
//   name: string;
//   description: string;
//   permissions: string[];
// }

// export interface UpdateRoleRequest {
//   id: string;
//   name?: string;
//   description?: string;
//   permissions?: string[];
// }

// export interface AssignRoleRequest {
//   userId: string;
//   roleIds: string[];
// }

// class RoleService {
//   async createRole(role: CreateRoleRequest): Promise<RoleDTO> {
//     const response = await roleApi.createRole(role);
//     return response;
//   }

//   async updateRole(role: UpdateRoleRequest): Promise<RoleDTO> {
//     const response = await roleApi.updateRole(role.id, role);
//     return response;
//   }

//   async deleteRole(roleId: string): Promise<void> {
//     await roleApi.deleteRole(roleId);
//   }

//   async assignRole(request: AssignRoleRequest): Promise<void> {
//     await roleApi.assignRole(request);
//   }


//   // Esto ahora funcionará sin errores de tipo
//   async getRoleById(roleId: string): Promise<RoleDTO> {
//     const response = await roleApi.getRoleById(roleId);
//     return response; // response ya es de tipo RoleDTO
//   }
//   async getAllRoles(): Promise<RoleDTO[]> {
//     const response = await roleApi.getAllRoles();
//     return response;
//   }

//   async getUserRoles(userId: string): Promise<RoleDTO[]> {
//     const response = await roleApi.getUserRoles(userId);
//     return response;
//   }

//   getAllPermissions(): string[] {
//     return [
//       'user:create', 'user:read', 'user:update', 'user:delete',
//       'role:create', 'role:read', 'role:update', 'role:delete', 'role:assign',
//       'activity:create', 'activity:read', 'activity:update', 'activity:delete',
//       'buddy:manage', 'peerbuddy:manage', 'tutor:manage'
//     ];
//   }

  
// }

// export const roleService = new RoleService();


// src/core/application/role.service.ts
import { roleApi } from '../../infrastructure/api/role.api';

export interface RoleDTO {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  id: string;
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface AssignRoleRequest {
  userId: string;
  roleIds: string[];
}

class RoleService {
  async createRole(role: CreateRoleRequest): Promise<RoleDTO> {
    const response = await roleApi.createRole(role);
    return response;
  }

  async updateRole(role: UpdateRoleRequest): Promise<RoleDTO> {
    const response = await roleApi.updateRole(role.id, role);
    return response;
  }

  async deleteRole(roleId: string): Promise<void> {
    await roleApi.deleteRole(roleId);
  }

  async assignRole(request: AssignRoleRequest): Promise<void> {
    await roleApi.assignRole(request);
  }

  async getRoleById(roleId: string): Promise<RoleDTO> {
    const response = await roleApi.getRoleById(roleId);
    return response;
  }

  async getAllRoles(): Promise<RoleDTO[]> {
    const response = await roleApi.getAllRoles();
    return response;
  }

  async getUserRoles(userId: string): Promise<RoleDTO[]> {
    const response = await roleApi.getUserRoles(userId);
    return response;
  }

  getAllPermissions(): string[] {
    return [
      'user:create', 'user:read', 'user:update', 'user:delete',
      'role:create', 'role:read', 'role:update', 'role:delete', 'role:assign',
      'activity:create', 'activity:read', 'activity:update', 'activity:delete',
      'buddy:manage', 'peerbuddy:manage', 'tutor:manage'
    ];
  }
}

export const roleService = new RoleService();
