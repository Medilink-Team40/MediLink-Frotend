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
  // Campos adicionales para desarrollo
  id?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setDevUser: (user: User) => Promise<void>; // Ahora obligatorio
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['/', '/login', '/register', '/test', '/connection-test', '/dev-login'];

// Helper para verificar si una ruta es pública
const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => {
    if (route === '/') {
      return pathname === '/';
    }
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
      console.log('[DEV] Simulando inicio de sesión...');
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
      console.error('[ERROR] Error al iniciar sesión:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [isDevelopment, devAuthData]);

  // Logout function
  const logout = useCallback(async () => {
    if (isDevelopment) {
      console.log('[DEV] Cerrando sesión...');

      // Limpiar localStorage
      localStorage.removeItem('dev_user');
      localStorage.removeItem('dev_token');
      localStorage.removeItem('dev_user_type');

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
      console.error('[ERROR] Error al cerrar sesión:', error);
    }
  }, [isDevelopment]);

  // Función setDevUser para desarrollo
  const setDevUser = useCallback(async (devUser: User): Promise<void> => {
    console.log('[DEV] Estableciendo usuario de desarrollo:', devUser);

    setState({
      isAuthenticated: true,
      user: devUser,
      loading: false,
    });

    // Guardar en localStorage para persistencia
    localStorage.setItem('dev_user', JSON.stringify(devUser));
    localStorage.setItem('dev_token', `dev-token-${devUser.role}-${Date.now()}`);
    localStorage.setItem('dev_user_type', devUser.role || '');

    console.log('[DEV] Usuario configurado exitosamente');
  }, []);

  // Inicialización de autenticación
  useEffect(() => {
    const initAuth = async () => {
      const currentPath = location.pathname;
      const isPublic = isPublicRoute(currentPath);

      if (isDevelopment) {
        console.log(`[DEV] Inicializando en ruta: ${currentPath}`);
        console.log(`[DEV] ¿Es ruta pública? ${isPublic}`);

        // Verificar si hay un usuario de desarrollo guardado
        const savedUser = localStorage.getItem('dev_user');
        const savedToken = localStorage.getItem('dev_token');

        if (savedUser && savedToken) {
          try {
            const user = JSON.parse(savedUser);
            console.log('[DEV] Usuario encontrado en localStorage:', user);
            setState({
              isAuthenticated: true,
              user,
              loading: false,
            });
            return;
          } catch (error) {
            console.error('[DEV] Error al parsear usuario guardado:', error);
            localStorage.removeItem('dev_user');
            localStorage.removeItem('dev_token');
            localStorage.removeItem('dev_user_type');
          }
        }

        // En rutas públicas, no autenticar automáticamente
        if (isPublic) {
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
          return;
        }

        // En rutas privadas sin usuario guardado, usar devAuthData como fallback
        const auth = devAuthData();
        setState({
          isAuthenticated: auth.isAuthenticated,
          user: auth.user,
          loading: false,
        });
        return;
      }

      // --- Producción: Keycloak ---
      console.log('[PROD] Inicializando autenticación con Keycloak...');

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
        console.error('Error al inicializar autenticación:', error);
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
  const value: AuthContextType = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    login,
    logout,
    setDevUser, // Incluir setDevUser
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