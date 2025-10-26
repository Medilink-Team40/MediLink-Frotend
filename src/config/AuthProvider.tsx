import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDevAuth } from './devAuth';
import { getKeycloakInstance, initializeAuth } from '@/features/auth/authService';

// --- Interfaces ---
interface User {
  name: string;
  email: string;
  roles: string[];
  picture?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['/', '/login', '/register', '/test', '/connection-test'];

// Helper para verificar si una ruta es pública
const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => {
    // Exact match para la ruta raíz
    if (route === '/') {
      return pathname === '/';
    }
    // StartsWith para otras rutas
    return pathname.startsWith(route);
  });
};

// --- Componente AuthProvider ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const devAuthData = useDevAuth();
  const isDevelopment = import.meta.env.DEV;

  const [state, setState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
  }>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  // Login function
  const login = useCallback(async () => {
    if (isDevelopment) {
      console.log(' [DEV] Simulando inicio de sesión...');
      const auth = devAuthData();

      setState({
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        loading: false,
      });
      return;
    }

    // Producción: Keycloak login
    try {
      const keycloak = getKeycloakInstance();
      await keycloak.login({
        redirectUri: `${window.location.origin}${window.location.pathname}`,
      });
    } catch (error) {
      console.error(' [ERROR] Error al iniciar sesión:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [isDevelopment, devAuthData]);

  // Logout function
  const logout = useCallback(async () => {
    if (isDevelopment) {
      console.log(' [DEV] Cerrando sesión...');
      const auth = devAuthData();
      await auth.logout();

      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      return;
    }

    // Producción: Keycloak logout
    try {
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });

      const keycloak = getKeycloakInstance();
      await keycloak.logout({
        redirectUri: window.location.origin,
      });
    } catch (error) {
      console.error(' [ERROR] Error al cerrar sesión:', error);
    }
  }, [isDevelopment, devAuthData]);

  // Inicialización de autenticación
  useEffect(() => {
    const initAuth = async () => {
      const currentPath = location.pathname;
      const isPublic = isPublicRoute(currentPath);

      if (isDevelopment) {
        console.log(` [DEV] Inicializando en ruta: ${currentPath}`);
        console.log(` [DEV] ¿Es ruta pública? ${isPublic}`);

        // En rutas públicas, no autenticar automáticamente
        if (isPublic) {
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
          return;
        }

        // En rutas privadas, autenticar con datos de desarrollo
        const auth = devAuthData();
        setState({
          isAuthenticated: auth.isAuthenticated,
          user: auth.user,
          loading: false,
        });
        return;
      }

      // --- Producción: Keycloak ---
      console.log(' [PROD] Inicializando autenticación con Keycloak...');

      try {
        const authenticated = await initializeAuth();

        if (authenticated) {
          const keycloak = getKeycloakInstance();
          const roles = keycloak.tokenParsed?.realm_access?.roles || [];

          setState({
            isAuthenticated: true,
            user: {
              name: keycloak.tokenParsed?.name || '',
              email: keycloak.tokenParsed?.email || '',
              roles,
              picture: keycloak.tokenParsed?.picture,
            },
            loading: false,
          });
        } else {
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error(' Error al inicializar autenticación:', error);
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    initAuth();
  }, [location.pathname, isDevelopment, devAuthData]);

  // Provider value
  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook useAuth ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};