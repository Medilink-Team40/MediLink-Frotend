import Keycloak, { KeycloakInstance } from 'keycloak-js';

// Configuración centralizada
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak-production-2d31.up.railway.app',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'MediLink',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'medilink-frontend',
};

export const keycloak: KeycloakInstance = new Keycloak(keycloakConfig);

let initializationPromise: Promise<boolean> | null = null;
let tokenRefreshInterval: number | null = null;

export const getUserRoles = (): string[] => {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles ?? [];

  // 2. Obtener Roles de Cliente (específicos de 'medilink-frontend')
  // Usamos keycloakConfig.clientId para acceder a la clave correcta en resource_access.
  const clientRoles = keycloak.tokenParsed?.resource_access?.[keycloakConfig.clientId]?.roles ?? [];

  // 3. Combinar ambos arrays y usar 'Set' para asegurar que no haya duplicados.
  return [...new Set([...realmRoles, ...clientRoles])];
};

export const getDashboardPathByRole = (roles: string[]): string => {
  if (roles.includes('admin')) {
    return '/admin/dashboard'; 
  }
  if (roles.includes('practitioner')) {
    return '/doctor/dashboard';
  }
  if (roles.includes('patient')) {
    return '/patient/dashboard';
  }
  return '/dashboard';
};

export const initKeycloak = (): Promise<boolean> => {
  if (!initializationPromise) {
    if (tokenRefreshInterval !== null) {
      clearInterval(tokenRefreshInterval);
    }

    initializationPromise = keycloak
      .init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      })
      .then((authenticated) => {
        if (authenticated) {
          tokenRefreshInterval = window.setInterval(() => {
            keycloak.updateToken(70).catch(() => {
              console.error('Error al refrescar el token');
            });
          }, 60000) as unknown as number;
        }
        return authenticated;
      })
      .catch((error) => {
        console.error('Fallo al inicializar Keycloak', error);
        throw error;
      });
  }
  return initializationPromise;
};

export const getKeycloakInstance = (): Keycloak => keycloak;

export const login = async (): Promise<void> => {
  try {
    await keycloak.login({
      redirectUri: window.location.origin + '/auth/callback',
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await keycloak.logout({
      redirectUri: window.location.origin,
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

export const isAuthenticated = (): boolean => {
  return !!keycloak.authenticated;
};

export const getAccessToken = (): string | undefined => {
  return keycloak.token;
};

export const getRefreshToken = (): string | undefined => {
  return keycloak.refreshToken;
};

export const updateToken = async (minValidity: number = 70): Promise<boolean> => {
  try {
    return await keycloak.updateToken(minValidity);
  } catch (error) {
    console.error('Error al actualizar token:', error);
    return false;
  }
};

export const hasRole = (role: string): boolean => {
  return keycloak.hasRealmRole(role);
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
  getDashboardPathByRole,
};