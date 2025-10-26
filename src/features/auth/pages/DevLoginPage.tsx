// src/features/auth/pages/DevLoginPage.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/config/AuthProvider';
import { setDevUserType } from '@/config/devAuth';
import { User, Stethoscope, Shield } from 'lucide-react';
import { useState } from 'react';

const DevLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const isDevelopment = import.meta.env.DEV;
  const [isLoading, setIsLoading] = useState(false);

  const handleDevLogin = (userType: 'paciente' | 'doctor' | 'admin') => {
    console.log(` [DEV] Login como ${userType}`);
    setIsLoading(true);
    
    // Guardar el tipo de usuario en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('dev_user_type', userType);
    }
    
    // Navegar directamente al dashboard
    // El AuthProvider detectará el cambio automáticamente
    navigate('/dashboard');
  };

  const handleKeycloakLogin = () => {
    // En producción, esto iniciará el flujo de Keycloak
    console.log(' [DEV] Iniciando login con Keycloak...');
    login();
  };

  // En producción, redirigir automáticamente a Keycloak
  if (!isDevelopment) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            MediLink
          </h1>
          
          <p className="text-gray-600 mb-6">
            Redirigiendo al sistema de autenticación segura...
          </p>
          
          <button
            onClick={handleKeycloakLogin}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continuar con Keycloak
          </button>
        </div>
      </div>
    );
  }

  // En desarrollo, mostrar opciones de login simulado
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            MediLink
          </h1>
          
          <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-2">
             MODO DESARROLLO
          </div>
          
          <p className="text-gray-600 text-sm">
            Selecciona un tipo de usuario para acceder
          </p>
        </div>

        {/* Opciones de Login */}
        <div className="space-y-3">
          {/* Paciente */}
          <button
            onClick={() => handleDevLogin('paciente')}
            disabled={isLoading}
            className="w-full p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center">
              <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="font-semibold text-gray-900">Paciente</div>
                <div className="text-sm text-gray-500">Juan Pérez</div>
                <div className="text-xs text-gray-400">paciente@dev.com</div>
              </div>
            </div>
          </button>

          {/* Doctor */}
          <button
            onClick={() => handleDevLogin('doctor')}
            disabled={isLoading}
            className="w-full p-4 border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center">
              <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="font-semibold text-gray-900">Doctor</div>
                <div className="text-sm text-gray-500">Dra. María García</div>
                <div className="text-xs text-gray-400">doctor@dev.com</div>
              </div>
            </div>
          </button>

          {/* Admin */}
          <button
            onClick={() => handleDevLogin('admin')}
            disabled={isLoading}
            className="w-full p-4 border-2 border-red-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center">
              <div className="shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <div className="font-semibold text-gray-900">Administrador</div>
                <div className="text-sm text-gray-500">Admin Sistema</div>
                <div className="text-xs text-gray-400">admin@dev.com</div>
              </div>
            </div>
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Iniciando sesión...</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Esta página solo aparece en modo desarrollo.
            <br />
            En producción se usará Keycloak.
          </p>
        </div>

       
      </div>
    </div>
  );
};

export default DevLoginPage;