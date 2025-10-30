import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDevAuth } from './devAuth';
import { getKeycloakInstance, initKeycloak, getUserRoles, getDashboardPathByRole } from '../config/keycloak';

// --- Interfaces ---
interface User {
  name: string;
  email: string;
  roles: string[];
  picture?: string;
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
  setDevUser: (user: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ['/', '/login', '/register', '/test', '/connection-test', '/dev-login'];

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
  const navigate = useNavigate();
  const devAuthData = useDevAuth();
  const isDevelopment = false;
  //import.meta.env.DEV; // forzar entorno de desarrollo con false

  const [state, setState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
  }>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const login = useCallback(async () => {
    if (isDevelopment) {
      const auth = devAuthData();
      console.log(' Estado de Autenticación:', auth);
      setState({
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        loading: false,
      });
      return;
    }

    try {
      const keycloak = getKeycloakInstance();
      await keycloak.login({
        redirectUri: `${window.location.origin}${window.location.pathname}`,
      });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [isDevelopment, devAuthData]);

  const logout = useCallback(async () => {
    if (isDevelopment) {
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
      console.error('Error al cerrar sesión:', error);
    }
  }, [isDevelopment]);

  const setDevUser = useCallback(async (devUser: User): Promise<void> => {
    setState({
      isAuthenticated: true,
      user: devUser,
      loading: false,
    });
    localStorage.setItem('dev_user', JSON.stringify(devUser));
    localStorage.setItem('dev_token', `dev-token-${devUser.role}-${Date.now()}`);
    localStorage.setItem('dev_user_type', devUser.role || '');
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const currentPath = location.pathname;
      const isPublic = isPublicRoute(currentPath);

      if (isDevelopment) {
        const savedUser = localStorage.getItem('dev_user');
        const savedToken = localStorage.getItem('dev_token');

        if (savedUser && savedToken) {
          try {
            const user = JSON.parse(savedUser);
            setState({ isAuthenticated: true, user, loading: false });
            return;
          } catch (error) {
            localStorage.removeItem('dev_user');
            localStorage.removeItem('dev_token');
            localStorage.removeItem('dev_user_type');
          }
        }

        if (isPublic) {
          setState({ isAuthenticated: false, user: null, loading: false });
          return;
        }

        const auth = devAuthData();
        setState({ isAuthenticated: auth.isAuthenticated, user: auth.user, loading: false });
        return;
      }

      // --- Producción: Keycloak ---
      try {
        const authenticated = await initKeycloak();

        if (authenticated) {
          const keycloak = getKeycloakInstance();

          const roles = getUserRoles();
          const userDashboardPath = getDashboardPathByRole(roles);

          setState({
            isAuthenticated: true,
            user: {
              name: keycloak.tokenParsed?.name || '',
              email: keycloak.tokenParsed?.email || '',
              roles,
              role: roles.length > 0 ? roles[0] : undefined,
              picture: keycloak.tokenParsed?.picture,
            },
            loading: false,
          });

          // Lógica de Redirección Condicional
          if (currentPath.includes('/dev-login') && userDashboardPath) {
             navigate(userDashboardPath, { replace: true });
          }

        } else {
          setState({ isAuthenticated: false, user: null, loading: false });
        }
      } catch (error) {
        setState({ isAuthenticated: false, user: null, loading: false });
        if (!isPublic) {
            navigate('/login');
        }
      }
    };

    initAuth();
  }, [location.pathname, isDevelopment, devAuthData, navigate]);

  const value: AuthContextType = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    login,
    logout,
    setDevUser,
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