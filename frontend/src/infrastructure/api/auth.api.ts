import { UserCredentials, UserRegistration, User } from '../../core/domain/user.model';
import { apiClient } from './apiClient';

interface AuthResponse {
  user: User;
  token: string;
}

class AuthApi {
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  }

  async register(userData: UserRegistration): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', userData);
  }
  
  async loginWithGoogle(googleToken: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/google-login', { token: googleToken });
  }
}

export const authApi = new AuthApi();