import { UserCredentials, UserRegistration, User } from '../domain/user.model';
import { authApi } from '../../infrastructure/api/auth.api';
import { localStorageService } from '../../infrastructure/storage/localStorage';

export class AuthService {
  async login(credentials: UserCredentials): Promise<User> {
    try {
      const response = await authApi.login(credentials);
      localStorageService.setToken(response.token);
      localStorageService.setUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  }

  async register(userData: UserRegistration): Promise<User> {
    try {
      const response = await authApi.register(userData);
      localStorageService.setToken(response.token);
      localStorageService.setUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle(googleToken: string): Promise<User> {
    try {
      const response = await authApi.loginWithGoogle(googleToken);
      localStorageService.setToken(response.token);
      localStorageService.setUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  }


  async logout(): Promise<void> {
    localStorageService.removeToken();
    localStorageService.removeUser();
  }

  isAuthenticated(): boolean {
    return !!localStorageService.getToken();
  }

  getCurrentUser(): User | null {
    return localStorageService.getUser();
  }
}

export const authService = new AuthService();