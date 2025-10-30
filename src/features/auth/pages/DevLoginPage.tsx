import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/config/AuthProvider';
import { User, Stethoscope, Shield, Check, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { logout as keycloakLogout } from '@/config/keycloak';

const DevLoginPage = () => {
  const navigate = useNavigate();
  const { setDevUser, isAuthenticated, user, logout } = useAuth();
  const isDevelopment = import.meta.env.DEV;
  const [isLoading, setIsLoading] = useState(false);
  const [keycloakState, setKeycloakState] = useState<'idle' | 'loading' | 'success' | 'redirecting'>('idle');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const loadingMessages = [
    "Estableciendo conexion segura...",
    "Verificando certificados SSL...",
    "Conectando con servidor de autenticacion...",
    "Preparando redireccion segura..."
  ];

  // Efecto para redirigir cuando ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user && !isLoggingOut) {
      console.log('[DEV] Usuario ya autenticado:', user);

      const userRole = user.role || (user.roles && user.roles[0]);

      const timer = setTimeout(() => {
  switch (userRole) {
    case 'practitioner':
    case 'doctor':
      navigate('/doctor/dashboard');
      break;
    case 'patient':
    case 'paciente':
      navigate('/patient/dashboard');
      break;
    case 'admin':
      navigate('/admin/dashboard');
      break;
    default:
      navigate('/dashboard');
  }
}, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, navigate, isLoggingOut]);

  // Auto-iniciar el proceso en producción
  useEffect(() => {
    if (!isDevelopment && keycloakState === 'idle') {
      handleKeycloakLogin();
    }
  }, [isDevelopment, keycloakState]);

  // Cambiar mensajes durante la carga
  useEffect(() => {
    if (keycloakState === 'loading') {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 800);

      return () => clearInterval(interval);
    }
  }, [keycloakState, loadingMessages.length]);

  const handleDevLogin = async (userType: 'paciente' | 'doctor' | 'admin') => {
    console.log(`[DEV] Login como ${userType}`);
    setIsLoading(true);

    try {
      const devUser = {
        id: `dev-${userType}-001`,
        name: userType === 'paciente' ? 'Juan Pérez' :
              userType === 'doctor' ? 'Dra. María García' : 'Admin Sistema',
        email: `${userType}@dev.com`,
        role: userType,
        roles: [userType],
        firstName: userType === 'paciente' ? 'Juan' :
                   userType === 'doctor' ? 'María' : 'Admin',
        lastName: userType === 'paciente' ? 'Pérez' :
                  userType === 'doctor' ? 'García' : 'Sistema'
      };

      await setDevUser(devUser);

      setTimeout(() => {
        switch (userType) {
          case 'paciente':
            navigate('/patient/dashboard');
            break;
          case 'doctor':
            navigate('/doctor/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }, 500);

    } catch (error) {
      console.error('[DEV] Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeycloakLogin = () => {
    console.log('[DEV] Iniciando login con Keycloak...');
    setKeycloakState('loading');

    setTimeout(() => {
      setKeycloakState('success');

      setTimeout(() => {
        setKeycloakState('redirecting');

        setTimeout(() => {
          console.log('Redirigiendo a Keycloak...');
          // Redirigir a Keycloak real
          const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak-production-2d31.up.railway.app/';
          const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'MediLink';
          const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'medilink-frontend';
          const redirectUri = encodeURIComponent(window.location.origin + '/dev-login');

          window.location.href = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;
        }, 1000);
      }, 1500);
    }, 2000);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (isDevelopment) {
        // En desarrollo, solo limpiar localStorage
        localStorage.removeItem('dev_user');
        localStorage.removeItem('dev_token');
        localStorage.removeItem('dev_user_type');
        window.location.reload();
      } else {
        // En producción, usar la función de logout del AuthProvider
        await logout();
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Fallback: forzar limpieza y redirección
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleForceKeycloakLogout = async () => {
    setIsLoggingOut(true);
    try {
      await keycloakLogout();
    } catch (error) {
      console.error('Error al cerrar sesión en Keycloak:', error);
      // Forzar redirección manual a Keycloak logout
      const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak-production-2d31.up.railway.app';
      const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'MediLink';
      const redirectUri = encodeURIComponent(window.location.origin);

      window.location.href = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleEmergencyLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak-production-2d31.up.railway.app';
    const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'MediLink';
    const redirectUri = encodeURIComponent(window.location.origin);

    window.location.href = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
  };

  // Si ya está autenticado, mostrar mensaje de redirección
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Sesión Activa
          </h2>

          {user && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Usuario: <span className="font-semibold">{user.name}</span></p>
              <p className="text-sm text-gray-600">Email: <span className="font-semibold">{user.email}</span></p>
              <p className="text-sm text-gray-600">Rol: <span className="font-semibold">{user.role || user.roles?.[0]}</span></p>
              {!isDevelopment && (
                <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  Autenticado con Keycloak
                </div>
              )}
              {isDevelopment && (
                <div className="mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                  Modo Desarrollo
                </div>
              )}
            </div>
          )}

          {!isLoggingOut && (
            <div className="mb-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-gray-600">Redirigiendo al dashboard...</p>
            </div>
          )}

          {isLoggingOut && (
            <div className="mb-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-2"></div>
              <p className="text-gray-600">Cerrando sesión...</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </button>

            {!isDevelopment && (
              <button
                onClick={handleForceKeycloakLogout}
                disabled={isLoggingOut}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Logout Keycloak Directo
              </button>
            )}

            <button
              onClick={handleEmergencyLogout}
              disabled={isLoggingOut}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚨 Logout de Emergencia
            </button>
          </div>

          {isDevelopment && (
            <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              <strong>Modo Desarrollo:</strong> Solo se limpiará el localStorage local
            </div>
          )}
        </div>
      </div>
    );
  }

  // En producción, mostrar loading automático hacia Keycloak
  if (!isDevelopment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            MediLink
          </h1>

          <div className="space-y-4">
            {keycloakState === 'idle' && (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleKeycloakLogin}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Iniciar sesión segura
                </button>
                <p className="text-gray-500 text-xs mt-2">Se abrirá en una ventana segura</p>
              </div>
            )}

            {keycloakState === 'loading' && (
              <div className="flex flex-col items-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                <p className="text-gray-600 font-medium transition-all duration-300">
                  {loadingMessages[messageIndex]}
                </p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{width: `${(messageIndex + 1) * 25}%`}}
                  ></div>
                </div>
              </div>
            )}

            {keycloakState === 'success' && (
              <div className="flex flex-col items-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4 animate-bounce">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-green-600 font-semibold">Conexión establecida</p>
                <p className="text-gray-600 text-sm mt-1">Verificando credenciales...</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-full"></div>
                </div>
              </div>
            )}

            {keycloakState === 'redirecting' && (
              <div className="flex flex-col items-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Redirigiendo al login seguro...</p>
                <p className="text-gray-500 text-sm mt-1">Por favor, espera...</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                keycloakState !== 'idle' ? 'bg-blue-600' : 'bg-gray-300'
              }`}></div>
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                keycloakState === 'success' || keycloakState === 'redirecting' ? 'bg-green-600' : 'bg-gray-300'
              }`}></div>
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                keycloakState === 'redirecting' ? 'bg-blue-600' : 'bg-gray-300'
              }`}></div>
            </div>
            <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-500">
              <span>Conectar</span>
              <span>Verificar</span>
              <span>Redirigir</span>
            </div>
          </div>

          {/* Botón de emergencia en producción */}
          <div className="mt-4">
            <button
              onClick={handleEmergencyLogout}
              className="text-xs text-gray-500 underline hover:text-gray-700"
            >
              ¿Problemas? Cerrar sesión forzado
            </button>
          </div>
        </div>
      </div>
    );
  }

  // En desarrollo, mostrar opciones de login simulado
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
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

        <div className="space-y-3">
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

        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Iniciando sesión...</p>
          </div>
        )}

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