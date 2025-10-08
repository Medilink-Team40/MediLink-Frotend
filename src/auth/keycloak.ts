import Keycloak from 'keycloak-js';

// 1. Configuración centralizada
const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "medi-link",
  clientId: "medi-link-frontend",
};

// instancia de Keycloak para toda la app
const keycloak = new Keycloak(keycloakConfig);


let initializationPromise: Promise<boolean> | null = null;


export const initKeycloak = (): Promise<boolean> => {
  if (!initializationPromise) {
    initializationPromise = new Promise((resolve, reject) => {
      keycloak.init({
        onLoad: 'check-sso', 
        checkLoginIframe: false,
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