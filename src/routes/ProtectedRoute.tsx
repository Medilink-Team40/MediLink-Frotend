import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/config/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = []
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    const isDevelopment = import.meta.env.DEV;
    const redirectTo = isDevelopment ? '/dev-login' : '/login';

    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  // Si se especifican roles permitidos, verificar autorización
  if (allowedRoles.length > 0 && user) {
    // Verificación segura de roles
    const userRoles = user.roles || [];
    const userRole = user.role;

    // Verificar si el usuario tiene algún rol permitido
    const hasAllowedRole = allowedRoles.some(allowedRole => {
      // Verificar en el array de roles
      if (userRoles.includes && userRoles.includes(allowedRole)) {
        return true;
      }
      // Verificar el rol individual
      if (userRole === allowedRole) {
        return true;
      }
      return false;
    });

    if (!hasAllowedRole) {
      // Redirigir a página de "Sin autorización" o al dashboard general
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si todo está bien, mostrar el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;