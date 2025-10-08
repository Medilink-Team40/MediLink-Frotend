import Keycloak from 'keycloak-js';

// Definir la interfaz para el token parseado
interface KeycloakTokenParsedExtended {
  email?: string;
  given_name?: string;
  family_name?: string;
  roles?: string[];
  [key: string]: any; // Para otras propiedades que pueda tener el token
}

// Configuración de Keycloak
const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "medi-link",
  clientId: "medi-link-frontend",
  onLoad: 'login-required' as const,
  checkLoginIframe: false,
  enableLogging: process.env.NODE_ENV === 'development',
};

// Crear una instancia de Keycloak
const keycloak = new Keycloak(keycloakConfig);

// Inicializar Keycloak
export const initKeycloak = (onAuthenticatedCallback?: () => void): Promise<boolean> => {
  return keycloak.init({
    onLoad: keycloakConfig.onLoad,
    checkLoginIframe: keycloakConfig.checkLoginIframe,
  }).then((authenticated: boolean) => {
    if (authenticated) {
      console.log("Usuario autenticado");
      onAuthenticatedCallback?.();
    } else {
      console.log("Usuario no autenticado");
      keycloak.login();
    }
    return authenticated;
  }).catch((error: Error) => {
    console.error('Error al inicializar keycloak:', error);
    return false;
  });
};

// Obtener token JWT
export const getToken = (): string | undefined => keycloak.token;

// Obtener información del usuario
export const getUserInfo = () => {
  if (keycloak.authenticated && keycloak.tokenParsed) {
    const tokenParsed = keycloak.tokenParsed as KeycloakTokenParsedExtended;
    return {
      id: keycloak.subject,
      email: tokenParsed.email,
      firstName: tokenParsed.given_name,
      lastName: tokenParsed.family_name,
      roles: tokenParsed.roles || [],
    };
  }
  return null;
};

// Cerrar sesión
export const logout = (): void => {
  keycloak.logout({ redirectUri: window.location.origin });
};

// Actualizar token
export const updateToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    keycloak.updateToken(5) // 5 segundos de margen
      .then(() => {
        if (keycloak.token) {
          resolve(keycloak.token);
        } else {
          reject(new Error('No se pudo actualizar el token'));
        }
      })
      .catch((err: Error) => {
        console.error('Error al actualizar el token:', err);
        reject(err);
      });
  });
};

export default keycloak;