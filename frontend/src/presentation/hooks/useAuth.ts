import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../infrastructure/api/auth.api'
 // asegúrate de importar esto
import { User } from '../../core/domain/user.model'
export function useAuth() {
  const [user, setUser] = useState<User | null>(null) // 👈 corregido aquí
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    const response = await authApi.login({email, password})
    setUser(response.user) // ahora no da error
    localStorage.setItem('token', response.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return { user, login, logout }
}
