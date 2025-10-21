import Keycloak from 'keycloak-js';


// 1. Configuración centralizada
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

// instancia de Keycloak para toda la app
export const keycloak = new Keycloak(keycloakConfig);


let initializationPromise: Promise<boolean> | null = null;


export const initKeycloak = (): Promise<boolean> => {
  if (!initializationPromise) {
    initializationPromise = new Promise((resolve, reject) => {
      keycloak.init({
        onLoad: 'check-sso', 
        checkLoginIframe: false,
        pkceMethod:'S256',
        redirectUri: window.location.origin + '/dashboard'
      })
      .then((authenticated) => {
        resolve(authenticated);
      })
      .catch((error) => {
        console.error("Fallo al inicializar Keycloak", error);
        reject(error);
      });
    });
  }

  // Siempre devolvemos la promesa
  return initializationPromise;
};



export const getKeycloakInstance = (): Keycloak => keycloak;

export const login = (): void => {
  keycloak.login();
};

export const logout = (): void => {
  keycloak.logout({ redirectUri: window.location.origin });
};


