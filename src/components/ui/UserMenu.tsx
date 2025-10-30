import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/config/AuthProvider';
import { User, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SimpleUserMenu: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated || !user) return null;

  const userRole = user.role || user.roles?.[0] || 'user';

  const getDashboardPath = () => {
    switch (userRole) {
      case 'admin': return '/admin/dashboard';
      case 'doctor':
      case 'practitioner': return '/doctor/dashboard';
      case 'paciente':
      case 'patient': return '/patient/dashboard';
      default: return '/dashboard';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <User className="h-4 w-4" />
        <span>{user.name?.split(' ')[0] || 'Usuario'}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
          <Link
            to={getDashboardPath()}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            to={`/${userRole}/profile`}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Mi Perfil
          </Link>
          <hr className="my-1" />
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 inline mr-2" />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleUserMenu;