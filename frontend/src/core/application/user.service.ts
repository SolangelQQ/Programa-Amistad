import { User } from '../domain/user.model';
import { userApi } from '../../infrastructure/api/user.api';
export class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      return await userApi.getUsers();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await userApi.getUserById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      return await userApi.updateUser(id, userData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await userApi.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();