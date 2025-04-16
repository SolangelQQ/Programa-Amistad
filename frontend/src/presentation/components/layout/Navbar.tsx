// import { Link } from 'react-router-dom'

// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-semibold text-gray-800">
//               Best Buddies
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100">
//               Inicio
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../core/application/auth.service';
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold">Best Buddies</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/dashboard" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-500">
                  Dashboard
                </Link>
                <Link to="/users" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-500">
                  Usuarios
                </Link>
                <Link to="/activities" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-500">
                  Actividades
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex max-w-xs items-center rounded-full bg-primary-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                    id="user-menu-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span className="sr-only">Abrir menú de usuario</span>
                    <div className="h-8 w-8 rounded-full bg-primary-400 flex items-center justify-center text-white">
                      {user?.name.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </button>
                </div>
                {isMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-primary-700 p-2 text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <Link to="/dashboard" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-500">
              Dashboard
            </Link>
            <Link to="/users" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-500">
              Usuarios
            </Link>
            <Link to="/activities" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-500">
              Actividades
            </Link>
          </div>
          <div className="border-t border-primary-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center text-white">
                  {user?.name.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user?.name || 'Usuario'}</div>
                <div className="text-sm font-medium text-primary-300">{user?.email || 'email@example.com'}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Link to="/profile" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-primary-500">
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-white hover:bg-primary-500"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;