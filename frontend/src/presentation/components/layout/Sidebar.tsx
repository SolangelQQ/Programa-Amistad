import { Menu, X, ChevronDown, Bell, Search } from 'lucide-react';

import { useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Home, Users, FileText, BarChart2, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  user: {
    name: string;
    role: string;
  };
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

export const Sidebar = ({ user, isCollapsed, toggleSidebar }: SidebarProps) => {
  const CustomNavLink = ({ children, to, ...props }: NavLinkProps) => (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }: NavLinkRenderProps) =>
        `flex items-center p-3 rounded-lg mb-1 transition-colors ${
          isActive ? 'bg-blue-700 text-white' : 'text-white hover:bg-blue-800'
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <div
      className={`h-screen bg-blue-900 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo & Collapse Button */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center">
            <img
              src="/logo.jpeg"
              alt="BestBuddies"
              className="h-12 w-12 rounded-md"
            />
            <div className="ml-2">
              <h2 className="text-lg font-bold">BestBuddies</h2>
              <p className="text-xs text-blue-200">Gestión de amistades</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto">
            <img
              src="/logo.jpeg"
              alt="BestBuddies"
              className="h-12 w-12 rounded-md"
            />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          {isCollapsed ? (
            <div className="flex items-center md:w-1/4">
            {toggleSidebar && (
              <button 
                onClick={toggleSidebar}
                className="text-white-600 focus:outline-none hover:bg-blue-700 p-2 rounded-md"
                aria-label="Toggle sidebar"
              >
                <Menu size={20} />
              </button>
            )}
          </div>
          ) : (
            <ChevronLeft size={20} />
            
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2 overflow-y-auto mt-6">
        <CustomNavLink to="/dashboard">
          <Home size={20} />
          {!isCollapsed && <span className="ml-3">Panel Principal</span>}
        </CustomNavLink>

        <CustomNavLink to="/user">
          <Users size={28} />
          {!isCollapsed && (
            <span className="ml-3">Emparejamiento de amistades & Actividades</span>
          )}
        </CustomNavLink>

        <CustomNavLink to="/reportes">
          <BarChart2 size={20} />
          {!isCollapsed && <span className="ml-3">Reportes</span>}
        </CustomNavLink>

        <CustomNavLink to="/documentos">
          <FileText size={20} />
          {!isCollapsed && <span className="ml-3">Documentos</span>}
        </CustomNavLink>

        {/* {user.role === 'Administrador' && ( */}
          <CustomNavLink to="/admin/role-management">
            <Settings size={20} />
            {!isCollapsed && <span className="ml-3">Roles</span>}
          </CustomNavLink>
        {/* )} */}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-800 flex items-center space-x-3">
        <div className="bg-blue-700 rounded-full h-10 w-10 flex items-center justify-center">
          {user.name.charAt(0)}
        </div>
        {!isCollapsed && (
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-blue-200">{user.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};