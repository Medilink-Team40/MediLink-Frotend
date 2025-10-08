import Keycloak from 'keycloak-js';

// 1. Configuración centralizada
const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "medi-link",
  clientId: "medi-link-frontend",
};

// 2. UNA SOLA instancia de Keycloak para toda la app
const keycloak = new Keycloak(keycloakConfig);

// 3. (LA CLAVE) Guardamos la promesa de inicialización para evitar llamarla dos veces
let initializationPromise: Promise<boolean> | null = null;

/**
 * Función idempotente para inicializar Keycloak.
 * Si se llama varias veces, solo ejecutará la inicialización una vez
 * y devolverá la misma promesa a todas las llamadas.
 */
export const initKeycloak = (): Promise<boolean> => {
  // Si la promesa de inicialización no existe, la creamos.
  if (!initializationPromise) {
    console.log("Creando nueva promesa de inicialización de Keycloak...");
    initializationPromise = new Promise((resolve, reject) => {
      keycloak.init({
        onLoad: 'check-sso', // No fuerza el login al cargar
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        console.log(authenticated ? "Usuario autenticado" : "Usuario no autenticado");
        resolve(authenticated);
      })
      .catch((error) => {
        console.error("Fallo al inicializar Keycloak", error);
        // Rechazamos la promesa para que el AuthProvider pueda capturar el error
        reject(error);
      });
    });
  }

  // Siempre devolvemos la promesa (ya sea la nueva o la existente)
  return initializationPromise;
};

// --- Funciones de Ayuda ---

export const getKeycloakInstance = (): Keycloak => keycloak;

export const login = (): void => {
  keycloak.login();
};

export const logout = (): void => {
  keycloak.logout({ redirectUri: window.location.origin });
};