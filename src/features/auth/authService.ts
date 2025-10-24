// src/features/auth/authService.ts
import { getKeycloakInstance, initKeycloak, login, logout } from '@/config/keycloak';

// Re-exportar las funciones de keycloak.ts
export { getKeycloakInstance, login, logout };

// Inicialización de Keycloak
export const initializeAuth = async (): Promise<boolean> => {
  try {
    const authenticated = await initKeycloak();
    return authenticated;
  } catch (error) {
    console.error('Error al inicializar Keycloak:', error);
    return false;
  }
};

// Verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  const keycloak = getKeycloakInstance();
  return !!keycloak.authenticated;
};

// Obtener el token de acceso
export const getAccessToken = (): string | undefined => {
  const keycloak = getKeycloakInstance();
  return keycloak.token;
};

// Obtener información del perfil del usuario
export const getUserProfile = async () => {
  const keycloak = getKeycloakInstance();
  try {
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