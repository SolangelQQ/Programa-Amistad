// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import MainLayout from '../../components/layout/MainLayout';
// import Card from '../../components/ui/Card';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import { User } from '../../../core/domain/user.model';
// import { userService } from '../../../core/application/user.service';

// const UserProfile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     status: 'active' as 'active' | 'inactive' | 'pending',
//   });

//   useEffect(() => {
//     if (id) {
//       fetchUserData();
//     } else {
//       setLoading(false);
//     }
//   }, [id]);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const userData = await userService.getUserById(id!);
//       setUser(userData);
//       setFormData({
//         name: userData.name,
//         email: userData.email,
//         status: userData.status,
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError('No se pudo cargar la información del usuario');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSaving(true);

//     try {
//       if (id) {
//         await userService.updateUser(id, formData);
//         alert('Usuario actualizado con éxito');
//       } else {
//         // We would handle creation here
//         // For now, just navigate back
//         alert('La creación de usuarios se implementará próximamente');
//       }
//       navigate('/users');
//     } catch (error: any) {
//       setError(error.response?.data?.message || 'Error al guardar usuario');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//         </div>
//       );
//     }

//     return (
//       <>
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">
//             {id ? 'Editar Usuario' : 'Crear Usuario'}
//           </h1>
//         </div>

//         {error && (
//           <div className="text-red-600 mb-4">{error}</div>
//         )}

//         <Card>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <Input
//                 label="Nombre"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <Input
//                 label="Correo Electrónico"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Estado
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="active">Activo</option>
//                 <option value="inactive">Inactivo</option>
//                 <option value="pending">Pendiente</option>
//               </select>
//             </div>

//             <div className="flex justify-end gap-2">
//               <Button type="button" variant="secondary" onClick={() => navigate('/users')}>
//                 Cancelar
//               </Button>
//               <Button type="submit" isLoading={saving}>
//                 Guardar
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </>
//     );
//   };

//   return renderContent();
// };

// export default UserProfile;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { User } from '../../../core/domain/user.model';
import { userService } from '../../../core/application/user.service';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'active' as 'active' | 'inactive' | 'pending',
  });

  useEffect(() => {
    if (id) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await userService.getUserById(id!);
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        status: userData.status,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('No se pudo cargar la información del usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (id) {
        await userService.updateUser(id, formData);
        alert('Usuario actualizado con éxito');
      } else {
        // We would handle creation here
        // For now, just navigate back
        alert('La creación de usuarios se implementará próximamente');
      }
      navigate('/users');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar usuario');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Editar Usuario' : 'Crear Usuario'}
        </h1>
      </div>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => navigate('/users')}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={saving}>
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default UserProfile;