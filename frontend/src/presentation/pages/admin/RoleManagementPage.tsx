// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/layout/Navbar';
// import { Sidebar } from '../../components/layout/Sidebar';

// interface Role {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// const RoleManagementPage: React.FC = () => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   useEffect(() => {
//     const fetchRoles = async () => {
//       setLoading(true);
//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Mock data based on the second image
//         setRoles([
//           {
//             id: 1,
//             name: 'Micaela Patiño',
//             email: 'micaela.patino@buddies.com',
//             role: 'Encargada del programa Amistad'
//           },
//           {
//             id: 2,
//             name: 'Pamela Inturias',
//             email: 'pamela.inturias@buddies.com',
//             role: 'Líder de buddies'
//           },
//           {
//             id: 3,
//             name: 'Sonia Lopez',
//             email: 'sonia.lopez@buddies.com',
//             role: 'Líder de peerbuddies'
//           },
//           {
//             id: 4,
//             name: 'Pedro Muñoz',
//             email: 'pedro.munoz@buddies.com',
//             role: 'Líder de actividades'
//           },
//           {
//             id: 5,
//             name: 'Hector Arispe',
//             email: 'hector.arispe@buddies.com',
//             role: 'Líder de tutores'
//           },
//         ]);
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoles();
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const mockUser = {
//     name: 'Alexia Zegarra',
//     role: 'Administrador'
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
        
//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
//           </div>
          
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-white">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
//                       Nombre
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
//                       Correo electrónico
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
//                       Rol
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
//                       Acciones
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {roles.map((role) => (
//                     <tr key={role.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {role.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {role.email}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {role.role}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button className="text-gray-400 hover:text-gray-600">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                             <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
//                           </svg>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default RoleManagementPage;







import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { roleService, RoleDTO } from '../../../core/application/role.service';

const RoleManagementPage: React.FC = () => {
  const [roles, setRoles] = useState<RoleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     setLoading(true);
  //     // try {
  //       const rolesFromApi = await roleService.getAllRoles();
  //       setRoles(rolesFromApi);
  //     // } catch (error) {
  //     //   console.error('Error fetching roles:', error);
  //     // } finally {
  //     //   setLoading(false);
  //     // }
  //   };

  //   fetchRoles();
  // }, []);

  return (
    <div className="flex h-screen">
      {/* <Sidebar collapsed={sidebarCollapsed} /> */}
      <div className="flex flex-col flex-1">
        {/* <Navbar onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} /> */}
        <main className="p-4">
          {/* <h1 className="text-xl font-bold mb-4">Gestión de Roles</h1>
          {loading ? (
            <p>Cargando roles...</p>
          ) : ( */}
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Nombre</th>
                  <th className="border px-4 py-2">Descripción</th>
                  <th className="border px-4 py-2">Permisos</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td className="border px-4 py-2">{role.name}</td>
                    <td className="border px-4 py-2">{role.description}</td>
                    <td className="border px-4 py-2">
                      {role.permissions.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          {/* )} */}
        </main>
      </div>
    </div>
  );
};

export default RoleManagementPage;











// // src/presentation/pages/admin/RoleManagementPage.tsx
// import React, { useEffect, useState } from 'react';
// import { roleService, RoleDTO } from '../../../core/application/role.service';
// import { Dialog } from '../../components/common/dialog';
// // import { Dialog } from '@headlessui/react';
// import { Checkbox } from '@headlessui/react';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import { Label } from '@headlessui/react';

// const allPermissions = [
//   'user:view',
//   'user:edit',
//   'role:view',
//   'role:edit',
//   'role:assign'
// ];

// const RoleManagementPage: React.FC = () => {
//   const [roles, setRoles] = useState<RoleDTO[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [editRole, setEditRole] = useState<RoleDTO | null>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   useEffect(() => {
//     loadRoles();
//   }, []);

//   const loadRoles = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const result = await roleService.getAllRoles();
//       setRoles(result);
//     } catch (err: any) {
//       setError('Error al cargar roles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePermissionToggle = (permission: string) => {
//     if (!editRole) return;
//     const hasPermission = editRole.permissions.includes(permission);
//     const updatedPermissions = hasPermission
//       ? editRole.permissions.filter(p => p !== permission)
//       : [...editRole.permissions, permission];
//     setEditRole({ ...editRole, permissions: updatedPermissions });
//   };

//   const handleSave = async () => {
//     if (!editRole) return;
//     setLoading(true);
//     try {
//       await roleService.updateRole({
//         id: editRole.id,
//         name: editRole.name,
//         description: editRole.description,
//         permissions: editRole.permissions,
//       });
      
//       setDialogOpen(false);
//       await loadRoles();
//     } catch (err) {
//       setError('Error al guardar el rol');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Roles</h1>

//       {error && (
//         <div className="text-red-600 mb-4">{error}</div>
//       )}

//       <div className="bg-white rounded-xl shadow-md p-4">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="px-4 py-2">Nombre</th>
//               <th className="px-4 py-2">Descripción</th>
//               <th className="px-4 py-2">Permisos</th>
//               <th className="px-4 py-2 text-right">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roles.map(role => (
//               <tr key={role.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2 font-medium">{role.name}</td>
//                 <td className="px-4 py-2 text-gray-600">{role.description}</td>
//                 <td className="px-4 py-2">
//                   <ul className="list-disc list-inside text-gray-600">
//                     {role.permissions.map(p => (
//                       <li key={p}>{p}</li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="px-4 py-2 text-right">
//                   <Button variant="outline" onClick={() => {
//                     setEditRole(role);
//                     setDialogOpen(true);
//                   }}>
//                     Editar
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <div className="max-w-md">
//           <h2 className="text-lg font-bold mb-4">Editar Rol</h2>

//           {editRole && (
//             <div className="space-y-4">
//               <div>
//                 <Label>Nombre</Label>
//                 <Input
//                   value={editRole.name}
//                   onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <Label>Descripción</Label>
//                 <Input
//                   value={editRole.description}
//                   onChange={(e) => setEditRole({ ...editRole, description: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <Label className="mb-2 block">Permisos</Label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {allPermissions.map(permission => (
//                     <div key={permission} className="flex items-center space-x-2">
//                       <Checkbox
//                       checked={editRole.permissions.includes(permission)}
//                       onChange={() => handlePermissionToggle(permission)}  // Cambié onCheckedChange a onChange
//                     />

//                       <span className="text-sm text-gray-700">{permission}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-2 pt-4">
//                 <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
//                 <Button onClick={handleSave}>Guardar</Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default RoleManagementPage;
