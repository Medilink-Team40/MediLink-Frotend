import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/config/AuthProvider';
import { ROLES } from './roles';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.some(role => user?.roles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};