import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, Search } from 'lucide-react';
import { useAuthContext } from '../../../App';

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthContext();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Función para verificar si el usuario tiene rol de administrador
  const isAdmin = () => {
    if (!user?.roles) return false;
    // Asumiendo que roles es un array de objetos Role que tienen una propiedad 'name' o similar
    return user.roles.some(role => role.name === 'Administrador');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#user-menu-button') && !target.closest('#user-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Función para obtener el nombre del rol principal
  const getPrimaryRoleName = () => {
    if (!user?.roles || user.roles.length === 0) return 'Invitado';
    // Suponiendo que el primer rol es el principal
    return user.roles[0].name || 'Usuario';
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu toggle button */}
        {/* <div className="flex items-center md:w-1/4">
          {toggleSidebar && (
            <button 
              onClick={toggleSidebar}
              className="text-gray-600 focus:outline-none hover:bg-gray-100 p-2 rounded-md"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
          )}
        </div> */}
        
        {/* Center - Search */}
        <div className="hidden md:block flex-grow max-w-md mx-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar..."
            />
          </div>
        </div>
        
        {/* Right side - Notifications & Profile */}
        <div className="flex items-center space-x-4 md:w-1/4 justify-end">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
          
          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center space-x-3 focus:outline-none"
              id="user-menu-button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-700">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-gray-500">{getPrimaryRoleName()}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <ChevronDown size={16} className="text-gray-500 hidden md:block" />
            </button>
            
            {isProfileOpen && (
              <div
                id="user-menu"
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5"
              >
                <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mi Perfil
                </Link>
                <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Configuración
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          {/* Mobile search */}
          <div className="px-4 py-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Buscar..."
              />
            </div>
          </div>
          
          {/* Mobile navigation */}
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              Panel Principal
            </Link>
            <Link to="/dashboard/amistades" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/amistades') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              Emparejamiento de amistades
            </Link>
            <Link to="/dashboard/reportes" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/reportes') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              Reportes
            </Link>
            <Link to="/dashboard/documentos" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/documentos') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              Documentos
            </Link>
            {/* Usando la función isAdmin para verificar el rol */}
            {isAdmin() && (
              <Link to="/dashboard/roles" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/roles') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                Roles
              </Link>
            )}
          </div>
          
          {/* Mobile profile info */}
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name || 'Usuario'}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email || ''}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/dashboard/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Mi Perfil
              </Link>
              <Link to="/dashboard/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Configuración
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;