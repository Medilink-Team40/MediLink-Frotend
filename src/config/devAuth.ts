// devAuth.ts - Sistema de autenticación simulada para desarrollo

import { ROLES } from '@/routes/roles';

// Configuración de usuarios de prueba
const DEV_USERS = {
  paciente: {
    name: "Juan Pérez",
    email: "paciente@dev.com",
    roles: [ROLES.PACIENTE],
    picture: "https://ui-avatars.com/api/?name=Juan+Perez&background=3b82f6&color=fff"
  },
  doctor: {
    name: "Dra. María García",
    email: "doctor@dev.com",
    roles: [ROLES.DOCTOR],
    picture: "https://ui-avatars.com/api/?name=Maria+Garcia&background=10b981&color=fff"
  },
  admin: {
    name: "Admin Sistema",
    email: "admin@dev.com",
    roles: [ROLES.ADMIN],
    picture: "https://ui-avatars.com/api/?name=Admin+Sistema&background=ef4444&color=fff"
  }
};

// Tipo del usuario actual seleccionado (puede cambiarse en localStorage)
type UserType = keyof typeof DEV_USERS;

// Obtener el tipo de usuario desde localStorage o usar 'paciente' por defecto
export const getCurrentUserType = (): UserType => {
  if (typeof window === 'undefined') return 'paciente';

  const stored = localStorage.getItem('dev_user_type');
  if (stored && stored in DEV_USERS) {
    return stored as UserType;
  }
  return 'paciente';
};

// Cambiar el tipo de usuario (útil para testing)
export const setDevUserType = (type: UserType) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dev_user_type', type);
  console.log(` [DEV] Usuario cambiado a: ${type}`);
  // NO recargar la página - dejar que React Router maneje la navegación
};

// Limpiar datos de desarrollo
export const clearDevAuth = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('dev_user_type');
  console.log(' [DEV] Datos de autenticación limpiados');
};

// Función principal que retorna los datos de autenticación simulada
export const devAuthData = () => {
  const userType = getCurrentUserType();
  const userData = DEV_USERS[userType];

 

  return {
    isAuthenticated: true,
    user: userData,
    login: () => {
      console.log(' [DEV] Login simulado exitoso');
      return Promise.resolve(true);
    },
    logout: () => {
      console.log(' [DEV] Logout simulado');
      clearDevAuth();
      return Promise.resolve(false);
    }
  };
};

// Hook para usar en componentes
export const useDevAuth = () => {
  return devAuthData;
};

// Obtener los usuarios disponibles (para el componente de debug)
export const getDevUsers = () => DEV_USERS;

// Exportar todo junto
export default {
  devAuthData,
  useDevAuth,
  setDevUserType,
  clearDevAuth,
  getCurrentUserType,
  getDevUsers,
};