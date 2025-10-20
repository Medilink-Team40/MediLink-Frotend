// src/features/auth/AuthProvider.tsx
import React, { createContext, useEffect, useState, useCallback } from 'react';
import { initializeAuth, getKeycloakInstance } from '@/features/auth/authService';

// --- MEJORA 1: Añadimos la propiedad 'roles' a la interfaz del usuario ---
// Para tener un tipado estricto y claro de la información del usuario.
interface User {
  id: string | undefined;
  email: string | undefined;
  name: string | undefined;
  roles: string[]; // Los roles serán un array de strings.
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // El usuario puede ser nulo si no está autenticado.
  loading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(() => {
    const keycloak = getKeycloakInstance();
    keycloak.login({
      // Redirigir a la misma página después del login.
      redirectUri: `${window.location.origin}${location.pathname}`
    });
  }, []);

  const logout = useCallback(() => {
    const keycloak = getKeycloakInstance();
    keycloak.logout({ redirectUri: window.location.origin });
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await initializeAuth();
        if (authenticated) {
          const keycloak = getKeycloakInstance();
          
          // --- MEJORA 2: Extraemos los roles del token de Keycloak ---
          // Keycloak guarda los roles del "realm" en `tokenParsed.realm_access.roles`.
          // Es crucial verificar que `realm_access` y `roles` existan antes de asignarlos.
          const roles = keycloak.tokenParsed?.realm_access?.roles || [];

          setUser({
            id: keycloak.subject,
            email: keycloak.tokenParsed?.email,
            name: keycloak.tokenParsed?.name,
            roles: roles, // Guardamos los roles en el estado del usuario.
          });
        }
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};