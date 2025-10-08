import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {getKeycloakInstance} from '@/auth/keycloak';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
    useEffect(() => {
      const initialize = async () => {
        try {
          const authenticated = await getKeycloakInstance().init({
            onLoad: 'check-sso',
            checkLoginIframe: false
          });
          setIsAuthenticated(authenticated);
        } catch (error) {
          console.error('Error al inicializar Keycloak:', error);
          setIsAuthenticated(false);
        }
      };
      initialize();
    }, []);
  
    // Muestra un loader mientras se inicializa
    if (isAuthenticated === null) {
      return <div>Cargando...</div>;
    }
  
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
  };


  export default ProtectedRoute;