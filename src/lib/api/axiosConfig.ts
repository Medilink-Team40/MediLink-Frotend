// src/api/axiosConfig.ts
import axios from 'axios';
import { getAccessToken, getKeycloakInstance, updateToken } from '@/features/auth/authService';
import keycloak from 'keycloak-js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL  ,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Token de desarrollo (mock)
const getDevToken = () => {
  // En desarrollo, usar un token simulado o ninguno
  return import.meta.env.VITE_DEV_TOKEN || 'dev-token-mock';
};

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const isDevelopment = import.meta.env.DEV;

    if (isDevelopment) {
      // En desarrollo: usar token simulado o ninguno
      const devToken = getDevToken();
      if (devToken && devToken !== 'dev-token-mock') {
        config.headers.Authorization = `Bearer ${devToken}`;
      }
      console.log(` [DEV] ${config.method?.toUpperCase()} ${config.url}`);
    } else {
      // En producción: usar token de Keycloak
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error(' Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    // Log de respuestas exitosas en desarrollo
    if (import.meta.env.DEV) {
      console.log(` [DEV] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const isDevelopment = import.meta.env.DEV;

    // Log del error
    console.error(' Response error:', {
      status: error.response?.status,
      url: originalRequest?.url,
      message: error.message,
    });

    // Si el error es 401 (No autorizado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isDevelopment) {
        // En desarrollo: redirigir al login
        console.warn(' [DEV] Token expirado o inválido. Redirigiendo a /login');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // En producción: intentar refrescar el token con Keycloak
      try {
        const keycloak = getKeycloakInstance();
        const refreshed = await keycloak.updateToken(30); // 30 segundos de margen

        if (refreshed) {
          console.log('Token actualizado correctamente');
          // Reintentar la petición con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error(' Error al actualizar el token:', refreshError);
        // Redirigir al login si no se puede actualizar el token
        const keycloak = getKeycloakInstance();
        await keycloak.login({...originalRequest});
        return Promise.reject(refreshError);
      }
    }

    // Manejar otros errores comunes
    if (error.response?.status === 403) {
      console.error(' Acceso denegado (403)');
    } else if (error.response?.status === 404) {
      console.error(' Recurso no encontrado (404)');
    } else if (error.response?.status >= 500) {
      console.error(' Error del servidor (500+)');
    }

    return Promise.reject(error);
  }
);

export default api;

// Exportar función helper para hacer requests con mejor manejo de errores
export const apiRequest = async <T = any>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  try {
    const response = await api[method](url, data, config);
    return response.data;
  } catch (error: any) {
    // Extraer mensaje de error más amigable
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Error desconocido';

    throw new Error(errorMessage);
  }
};

// Helpers específicos
export const get = <T = any>(url: string, config?: any) =>
  apiRequest<T>('get', url, undefined, config);

export const post = <T = any>(url: string, data?: any, config?: any) =>
  apiRequest<T>('post', url, data, config);

export const put = <T = any>(url: string, data?: any, config?: any) =>
  apiRequest<T>('put', url, data, config);

export const del = <T = any>(url: string, config?: any) =>
  apiRequest<T>('delete', url, undefined, config);

export const patch = <T = any>(url: string, data?: any, config?: any) =>
  apiRequest<T>('patch', url, data, config);