import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {getKeycloakInstance} from '@/auth/keycloak';


interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

// En ProtectedRoute.tsx
const ProtectedRoute = ({ 
  children,
  redirectPath = '/',
}: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [keycloak] = useState(getKeycloakInstance());

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar si ya está autenticado
        if (keycloak.authenticated) {
          console.log("Usuario autenticado")
          setIsAuthenticated(true);
          return;
        }

        // Intentar actualizar el token
        const tokenExpiration = keycloak.tokenParsed?.exp;
        const isTokenValid = tokenExpiration &&
                            tokenExpiration > Date.now() / 1000;

        const authenticated = keycloak.authenticated || isTokenValid === true
        
        console.log("Token: ", keycloak.token ? "Presente": "Ausente")
        
       setIsAuthenticated(!!authenticated)

       if(!authenticated){
        
       }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [keycloak]);

  if (isAuthenticated === null) {
    return null; // O un spinner sutil
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

  export default ProtectedRoute;