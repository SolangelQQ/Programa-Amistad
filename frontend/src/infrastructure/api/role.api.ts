// // src/infrastructure/api/role.api.ts
// import { apiClient } from './apiClient';
// import { CreateRoleRequest, UpdateRoleRequest, AssignRoleRequest } from '../../core/application/role.service';

// class RoleApi {
//   async createRole(role: CreateRoleRequest) {
//     return apiClient.post('/roles', role);
//   }

//   async updateRole(roleId: string, role: UpdateRoleRequest) {
//     return apiClient.put(`/roles/${roleId}`, role);
//   }

//   async deleteRole(roleId: string) {
//     return apiClient.delete(`/roles/${roleId}`);
//   }

//   async assignRole(request: AssignRoleRequest) {
//     return apiClient.post('/roles/assign', request);
//   }

//   async getRoleById(roleId: string) {
//     return apiClient.get(`/roles/${roleId}`);
//   }

//   async getAllRoles() {
//     return apiClient.get('/roles');
//   }

//   async getUserRoles(userId: string) {
//     return apiClient.get(`/roles/user/${userId}`);
//   }
// }

// export const roleApi = new RoleApi();

// src/infrastructure/api/role.api.ts
import { apiClient } from './apiClient';

import { 
  CreateRoleRequest, 
  UpdateRoleRequest, 
  AssignRoleRequest,
  RoleDTO 
} from '../../core/application/role.service';

class RoleApi {
  async createRole(role: CreateRoleRequest): Promise<RoleDTO> {
    return apiClient.post<RoleDTO>('/roles', role);
  }

  async updateRole(roleId: string, role: UpdateRoleRequest): Promise<RoleDTO> {
    return apiClient.put<RoleDTO>(`/roles/${roleId}`, role);
  }

  async deleteRole(roleId: string): Promise<void> {
    return apiClient.delete(`/roles/${roleId}`);
  }

  async assignRole(request: AssignRoleRequest): Promise<void> {
    return apiClient.post('/roles/assign', request);
  }

  async getRoleById(roleId: string): Promise<RoleDTO> {
    return apiClient.get<RoleDTO>(`/roles/${roleId}`);
  }

  async getAllRoles(): Promise<RoleDTO[]> {
    return apiClient.get<RoleDTO[]>('/roles');
  }

  async getUserRoles(userId: string): Promise<RoleDTO[]> {
    return apiClient.get<RoleDTO[]>(`/roles/user/${userId}`);
  }
}

export const roleApi = new RoleApi();