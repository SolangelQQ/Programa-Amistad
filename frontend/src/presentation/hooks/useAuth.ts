import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../infrastructure/api/auth.api'
 // asegúrate de importar esto
import { User } from '../../core/domain/user.model'
import { localStorageService } from '../../infrastructure/storage/localStorage';



export function useAuth() {
  const [user, setUser] = useState<User | null>(localStorageService.getUser());
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({email, password});
      setUser(response.user);
      localStorageService.setToken(response.token);
      localStorageService.setUser(response.user); // Guarda el usuario en localStorage
      return true; // Indica éxito
    } catch (error) {
      console.error("Login failed:", error);
      return false; // Indica fallo
    }
  }

  const logout = () => {
    setUser(null);
    localStorageService.removeToken();
    localStorageService.removeUser();
    navigate('/login');
  }

  const isAuthenticated = () => {
    return !!localStorageService.getToken();
  }

  const hasPermission = (permissionValue: string): boolean => {
    if (!user) return false;
    
    if (user.permissions?.includes(permissionValue)) {
      return true;
    }

    return user.roles?.some(role => 
      role.permissions.includes(permissionValue)
    ) ?? false;
  };

  return { user, login, logout, hasPermission, isAuthenticated }
}