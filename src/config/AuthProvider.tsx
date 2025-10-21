// AuthProvider.tsx (Corregido)

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDevAuth } from './devAuth'; // Asumimos que está en la misma carpeta
import { getKeycloakInstance, initializeAuth } from '@/features/auth/authService';

// --- Interfaces---
interface User {
  name: string;
  email: string;
  roles: string[];
  pinture?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Componente AuthProvider ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  // 1. Hook de Estado (Incondicional)
  // Este estado unificado manejará tanto el mock de 'dev' como el estado real de 'prod'.
  const [state, setState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
  }>({
    isAuthenticated: false,
    user: null,
    loading: true // Siempre empezamos asumiendo que estamos cargando
  });

  
  const devAuthData = useDevAuth();

  // 3. Hook 'login' (Incondicional)
  const login = useCallback(async () => {
    // Lógica condicional DENTRO del hook
    if (import.meta.env.DEV) {
      console.log("Modo desarrollo: inicio de sesión simulado");
      const auth = devAuthData();
      await auth.login(); 
      setState({
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        loading: false
      });
      return;
    }

    // Lógica de producción
    try {
      const keycloak = getKeycloakInstance();
      await keycloak.login({
        redirectUri: `${window.location.origin}${window.location.pathname}`
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }, [devAuthData]); // Dependemos de devAuthData para la simulación

  // 4. Hook 'logout' (Incondicional)
  const logout = useCallback(async () => {
    // Lógica condicional DENTRO del hook
    if (import.meta.env.DEV) {
      console.log("Modo desarrollo: cierrando sesión ...");
      const auth = devAuthData();
      await auth.logout(); // Llama a la simulación (Promise.resolve())
      // Simulamos el logout actualizando el estado
      setState({
        isAuthenticated: false,
        user: null,
        loading: false
      });
      return;
    }

    // Lógica de producción
    try {
      // Actualizamos el estado local primero para una UI reactiva
      setState({
        isAuthenticated: false,
        user: null,
        loading: false
      });
      const keycloak = getKeycloakInstance();
      // Keycloak se encargará de la redirección
      await keycloak.logout({
        redirectUri: window.location.origin
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, [devAuthData]); // Dependemos de devAuthData para la simulación

  // 5. Hook 'useEffect' para inicialización (Incondicional)
  useEffect(() => {
    // Lógica condicional DENTRO del hook
    if (import.meta.env.DEV) {
      console.log("AuthProvider: Modo Desarrollo Activado.");
      // En 'dev', simplemente aplicamos los datos mock y terminamos la carga
      const auth = devAuthData();
      setState({
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        loading: false
      });
      return; // No ejecutamos la lógica de Keycloak
    }

    // --- Lógica de Producción ---
    console.log("AuthProvider: Modo Producción Activado.");
    const initAuth = async () => {
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
              roles
            },
            loading: false
          });
        } else {
          // No autenticado, pero la inicialización terminó
          setState(prev => ({ ...prev, isAuthenticated: false, user: null, loading: false }));
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        setState(prev => ({ ...prev, isAuthenticated: false, user: null, loading: false }));
      }
    };

    initAuth();
    
    // El array de dependencias vacío asegura que esto solo se ejecute una vez.
    // Incluimos devAuthData por completitud, aunque sabemos que es un objeto estable.
  }, [devAuthData]);

  // 6. Retorno del Provider (Incondicional)
  // El valor del provider siempre se alimenta del 'state' unificado
  // y de las funciones 'login'/'logout' que ya contienen la lógica condicional.
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook useAuth---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};