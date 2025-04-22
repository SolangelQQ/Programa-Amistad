import React, { useState } from 'react';
import Navbar from './Navbar';
import { Sidebar } from './Sidebar';
import { Role } from '../../../core/domain/user.model';
import { useAuthContext } from '../../../App';
// Asegúrate de importar tus tipos

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Función para obtener el rol principal
  const getPrimaryRole = (userRoles?: Role[]): string => {
    if (!userRoles || userRoles.length === 0) return 'Invitado';
    return userRoles[0].name;
  };

  // Adaptar el usuario para el Sidebar
  const sidebarUser = {
    name: user?.name || 'Usuario',
    role: getPrimaryRole(user?.roles),
    // Puedes pasar más propiedades si el Sidebar las necesita
    originalUser: user // Opcional: pasar el usuario completo si es necesario
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        user={sidebarUser} 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;