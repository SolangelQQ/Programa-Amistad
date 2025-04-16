import { User } from '../../core/domain/user.model';

class LocalStorageService {
  private readonly TOKEN_KEY = 'best_buddies_token';
  private readonly USER_KEY = 'best_buddies_user';

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public getUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  }

  public setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}

export const localStorageService = new LocalStorageService();