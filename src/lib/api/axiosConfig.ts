// src/api/axiosConfig.ts
import axios from 'axios';
import { getAccessToken, getKeycloakInstance } from '@/features/auth/authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 y no es una solicitud de actualización de token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const keycloak = getKeycloakInstance();
        const refreshed = await keycloak.updateToken(30); // 30 segundos de margen
        
        if (refreshed) {
          // Reintentar la petición con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error al actualizar el token:', refreshError);
        // Redirigir al login si no se puede actualizar el token
        window.location.origin;
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;