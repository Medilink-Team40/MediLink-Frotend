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

const PUBLIC_ROUTES = ['/', '/register', '/test', '/connection-test', '/dev-login', '/auth/callback'];

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
  /**
   * Utiliza false en desarrollo si quiere
   * utilizar el flujo de keycloak
   * Utiliza true en desarrollo si quiere
   *  utilizar el flujo de DevLoginPage
   * enn producción siempre debe ir
   * import.meta.env.DEV
   */
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

  // ✅ Función para redirigir según rol después del login
  const redirectToDashboard = useCallback((userRoles: string[]) => {
    const dashboardPath = getDashboardPathByRole(userRoles);
    console.log('🚀 Redirigiendo a dashboard:', dashboardPath);
    navigate(dashboardPath, { replace: true });
  }, [navigate]);

  const login = useCallback(async () => {
    if (isDevelopment) {
      // En desarrollo, redirigir a DevLoginPage
      navigate('/dev-login');
      return;
    }

    try {
      console.log('🔐 Iniciando login con Keycloak...');
      const keycloak = getKeycloakInstance();
      await keycloak.login({
        redirectUri: `${window.location.origin}/auth/callback`, // ✅ Usar callback correcto
      });
    } catch (error) {
      console.error('Error al iniciar login:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [isDevelopment, navigate]);

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
      navigate('/'); // Redirigir a landing
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
  }, [isDevelopment, navigate]);

  const setDevUser = useCallback(async (devUser: User): Promise<void> => {
    console.log('👤 Configurando usuario dev:', devUser);
    setState({
      isAuthenticated: true,
      user: devUser,
      loading: false,
    });
    localStorage.setItem('dev_user', JSON.stringify(devUser));
    localStorage.setItem('dev_token', `dev-token-${devUser.role}-${Date.now()}`);
    localStorage.setItem('dev_user_type', devUser.role || '');

    // ✅ Redirigir automáticamente al dashboard en desarrollo
    if (devUser.roles && devUser.roles.length > 0) {
      redirectToDashboard(devUser.roles);
    }
  }, [redirectToDashboard]);

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

            // ✅ Si estás en landing y tienes usuario, redirigir a dashboard
            if (currentPath === '/' && user.roles) {
              redirectToDashboard(user.roles);
            }
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

          const user = {
            name: keycloak.tokenParsed?.name || '',
            email: keycloak.tokenParsed?.email || '',
            roles,
            role: roles.length > 0 ? roles[0] : undefined,
            picture: keycloak.tokenParsed?.picture,
            id: keycloak.tokenParsed?.sub,
          };

          setState({
            isAuthenticated: true,
            user,
            loading: false,
          });

          // ✅ Redirigir a dashboard si estás autenticado y en landing o callback
          if ((currentPath === '/' || currentPath.includes('/auth/callback')) && roles.length > 0) {
            redirectToDashboard(roles);
          }

        } else {
          setState({ isAuthenticated: false, user: null, loading: false });
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        setState({ isAuthenticated: false, user: null, loading: false });
        if (!isPublic) {
          navigate('/');
        }
      }
    };

    initAuth();
  }, [location.pathname, isDevelopment, devAuthData, navigate, redirectToDashboard]);

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
