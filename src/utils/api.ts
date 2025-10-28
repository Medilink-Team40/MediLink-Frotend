import axios from 'axios';
// ⚠️ Importamos las funciones necesarias desde su archivo keycloak.ts
import { getAccessToken, updateToken, logout } from '@/config/keycloak';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  headers: {
    'content-type': 'application/json',
  },
  timeout: 10000,
});

// 🚀 PASO CRÍTICO: Interceptor para adjuntar el Access Token y manejar el refresh
api.interceptors.request.use(async (config) => {
  const token = getAccessToken();

  if (token) {
    // 1. Verificar y actualizar el token antes de la solicitud
    try {
      // Intentamos refrescar el token si expira en 5 segundos (o menos)
      const updated = await updateToken(5);

      // Si el token fue actualizado, o si era válido, obtenemos la versión más reciente.
      const newToken = getAccessToken();

      // 2. Adjuntar el token en el encabezado
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
      }

    } catch (error) {
      console.error("Fallo al intentar refrescar el token:", error);
      // Si el token no se pudo actualizar (ej. Refresh Token expiró), forzamos el logout.
      // logout();
      // return Promise.reject(new Error("Sesión expirada. Por favor, inicie sesión nuevamente."));
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Opcional: Interceptor de respuesta para manejar 401 globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Respuesta 401 recibida. Redirigiendo a login.");
      // Opcional: Redirigir al usuario a la página de login si la API devuelve un 401
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default api;