// src/presentation/pages/admin/UserRoleAssignmentPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roleService, RoleDTO } from '../../../core/application/role.service';
import { userService } from '../../../core/application/user.service';
import Button from '../../components/common/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

interface UserWithRoles {
  id: string;
  name: string;
  email: string;
  roles: RoleDTO[];
}

const UserRoleAssignmentPage: React.FC = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [roles, setRoles] = useState<RoleDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has permission to assign roles
    if (!user || !user.permissions?.includes('role:assign')) {
      navigate('/dashboard');
      return;
    }
    
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [usersData, rolesData] = await Promise.all([
        userService.getAllUsers(),
        roleService.getAllRoles()
      ]);
      
      const usersWithRoles = await Promise.all(
        usersData.map(async (user) => {
          const userRoles = await roleService.getUserRoles(user.id);
          return {
            ...user,
            roles: userRoles
          };
        })
      );
      
      setUsers(usersWithRoles);
      setRoles(rolesData);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleToggle = async (userId: string, roleId: string, isChecked: boolean) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const userRoleIds = user.roles.map(r => r.id);
    let newRoleIds: string[];
    
    if (isChecked) {
      // Add role
      newRoleIds = [...userRoleIds, roleId];
    } else {
      // Remove role
      newRoleIds = userRoleIds.filter(id => id !== roleId);
    }

    setIsLoading(true);
    setError('');
    try {
      await roleService.assignRole({
        userId,
        roleIds: newRoleIds
      });
      
      // Update local state
      setUsers(users.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            roles: isChecked
              ? [...u.roles, roles.find(r => r.id === roleId)!]
              : u.roles.filter(r => r.id !== roleId)
          };
        }
        return u;
      }));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al actualizar roles');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Asignación de Roles</h1>
        <p className="text-gray-600">Gestione los roles de los usuarios del sistema</p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12">
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Usuario
                </th>
                {roles.map(role => (
                  <th key={role.id} scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  {roles.map(role => (
                    <td key={`${user.id}-${role.id}`} className="whitespace-nowrap px-6 py-4">
                      <input
                        type="checkbox"
                        checked={user.roles.some(r => r.id === role.id)}
                        onChange={(e) => handleRoleToggle(user.id, role.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserRoleAssignmentPage;