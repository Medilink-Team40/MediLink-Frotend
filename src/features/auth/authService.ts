// src/features/auth/authService.ts
import {
  getKeycloakInstance,
  initKeycloak,
  login as keycloakLogin,
  logout as keycloakLogout,
  isAuthenticated as keycloakIsAuthenticated,
  getAccessToken as keycloakGetAccessToken,
  updateToken as keycloakUpdateToken,
  hasRole as keycloakHasRole,
  getUserRoles as keycloakGetUserRoles
} from '@/config/keycloak';

// Re-exportar las funciones de keycloak.ts
export { getKeycloakInstance };

/**
 * Inicialización de Keycloak
 */
export const initializeAuth = async (): Promise<boolean> => {
  try {
    const authenticated = await initKeycloak();
    return authenticated;
  } catch (error) {
    console.error('Error al inicializar Keycloak:', error);
    return false;
  }
};

/**
 * Iniciar sesión
 */
export const login = async (): Promise<void> => {
  try {
    await keycloakLogin();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

/**
 * Cerrar sesión
 */
export const logout = async (): Promise<void> => {
  try {
    await keycloakLogout();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

/**
 * Verificar si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  try {
    return keycloakIsAuthenticated();
  } catch {
    return false;
  }
};

/**
 * Obtener el token de acceso
 */
export const getAccessToken = (): string | undefined => {
  try {
    return keycloakGetAccessToken();
  } catch {
    return undefined;
  }
};

/**
 * Obtener el refresh token
 */
export const getRefreshToken = (): string | undefined => {
  try {
    const keycloak = getKeycloakInstance();
    return keycloak.refreshToken;
  } catch {
    return undefined;
  }
};

/**
 * Actualizar el token si está por expirar
 */
export const updateToken = async (minValidity: number = 70): Promise<boolean> => {
  try {
    return await keycloakUpdateToken(minValidity);
  } catch (error) {
    console.error('Error al actualizar token:', error);
    return false;
  }
};

/**
 * Obtener información del perfil del usuario
 */
export const getUserProfile = async () => {
  try {
    const keycloak = getKeycloakInstance();

    if (!keycloak.authenticated) {
      return null;
    }

    const profile = await keycloak.loadUserProfile();
    return {
      id: keycloak.subject,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
    };
  } catch (error) {
    console.error('Error al cargar el perfil del usuario:', error);
    return null;
  }
};

/**
 * Obtener información del usuario desde el token
 */
export const getUserInfo = () => {
  try {
    const keycloak = getKeycloakInstance();

    if (!keycloak.tokenParsed) {
      return null;
    }

    return {
      id: keycloak.tokenParsed.sub,
      username: keycloak.tokenParsed.preferred_username,
      email: keycloak.tokenParsed.email,
      name: keycloak.tokenParsed.name,
      firstName: keycloak.tokenParsed.given_name,
      lastName: keycloak.tokenParsed.family_name,
      roles: keycloak.tokenParsed.realm_access?.roles || [],
      
    };

  } catch {
    return null;
  }
};

/**
 * Verificar si el usuario tiene un rol específico
 */
export const hasRole = (role: string): boolean => {
  try {
    return keycloakHasRole(role);
  } catch {
    return false;
  }
};

/**
 * Verificar si el usuario tiene alguno de los roles especificados
 */
export const hasAnyRole = (roles: string[]): boolean => {
  return roles.some(role => hasRole(role));
};

/**
 * Obtener todos los roles del usuario
 */
export const getUserRoles = (): string[] => {
  try {
    return keycloakGetUserRoles();
  } catch {
    return [];
  }
};

export default {
  initializeAuth,
  getKeycloakInstance,
  login,
  logout,
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  updateToken,
  getUserProfile,
  getUserInfo,
  hasRole,
  hasAnyRole,
  getUserRoles,
};