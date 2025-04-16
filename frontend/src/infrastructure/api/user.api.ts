import { User } from '../../core/domain/user.model';
import { apiClient } from './apiClient';

class UserApi {
  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  }

  async getUserById(id: string): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return apiClient.post<User>('/users', userData);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return apiClient.put<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete(`/users/${id}`);
  }
}

export const userApi = new UserApi();