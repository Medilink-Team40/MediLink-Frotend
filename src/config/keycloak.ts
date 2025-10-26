// src/config/keycloak.ts
import Keycloak from 'keycloak-js';

// Configuración centralizada
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'medilink',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'medilink-frontend',
};

// Instancia de Keycloak para toda la app
export const keycloak = new Keycloak(keycloakConfig);

// Promise para evitar múltiples inicializaciones
let initializationPromise: Promise<boolean> | null = null;

/**
 * Inicializar Keycloak
 */
export const initKeycloak = (): Promise<boolean> => {
  if (!initializationPromise) {
    initializationPromise = keycloak
      .init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      })
      .then((authenticated) => {
        console.log(authenticated ? 'Usuario autenticado' : ' Usuario no autenticado');

        // Configurar refresh automático del token
        if (authenticated) {
          setInterval(() => {
            keycloak.updateToken(70).catch(() => {
              console.error(' Error al refrescar el token');
            });
          }, 60000); // Cada 60 segundos
        }

        return authenticated;
      })
      .catch((error) => {
        console.error(' [ERROR] Fallo al inicializar Keycloak', error);
        throw error;
      });
  }

  return initializationPromise;
};

/**
 * Obtener la instancia de Keycloak
 */
export const getKeycloakInstance = (): Keycloak => keycloak;

/**
 * Iniciar sesión
 */
export const login = async (): Promise<void> => {
  try {
    await keycloak.login({
      redirectUri: window.location.origin + '/dashboard',
    });
  } catch (error) {
    console.error(' [ERROR] Error al iniciar sesión:', error);
    throw error;
  }
};

/**
 * Cerrar sesión
 */
export const logout = async (): Promise<void> => {
  try {
    await keycloak.logout({
      redirectUri: window.location.origin,
    });
  } catch (error) {
    console.error(' [ERROR] Error al cerrar sesión:', error);
    throw error;
  }
};

/**
 * Verificar si está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!keycloak.authenticated;
};

/**
 * Obtener el token de acceso
 */
export const getAccessToken = (): string | undefined => {
  return keycloak.token;
};

/**
 * Obtener el refresh token
 */
export const getRefreshToken = (): string | undefined => {
  return keycloak.refreshToken;
};

/**
 * Actualizar el token
 */
export const updateToken = async (minValidity: number = 70): Promise<boolean> => {
  try {
    return await keycloak.updateToken(minValidity);
  } catch (error) {
    console.error(' Error al actualizar token:', error);
    return false;
  }
};

/**
 * Verificar si el usuario tiene un rol
 */
export const hasRole = (role: string): boolean => {
  return keycloak.hasRealmRole(role);
};

/**
 * Obtener roles del usuario
 */
export const getUserRoles = (): string[] => {
  return keycloak.tokenParsed?.realm_access?.roles || [];
};

export default {
  keycloak,
  initKeycloak,
  getKeycloakInstance,
  login,
  logout,
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  updateToken,
  hasRole,
  getUserRoles,
};