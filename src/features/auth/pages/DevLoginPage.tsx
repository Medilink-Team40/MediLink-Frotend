import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/config/AuthProvider';
import { User, Stethoscope, Shield, Check, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { logout as keycloakLogout, getDashboardPathByRole } from '@/config/keycloak'; // ✅ Importar getDashboardPathByRole

const DevLoginPage = () => {
  const navigate = useNavigate();
  const { setDevUser, isAuthenticated, user, logout } = useAuth();
  const isDevelopment = import.meta.env.DEV;
  const [isLoading, setIsLoading] = useState(false);
  const [keycloakState, setKeycloakState] = useState<'idle' | 'loading' | 'success' | 'redirecting'>('idle');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const hasStartedKeycloak = useRef(false);
  const hasRedirected = useRef(false); // ✅ Evitar múltiples redirecciones

  const loadingMessages = [
    "Estableciendo conexion segura...",
    "Verificando certificados SSL...",
    "Conectando con servidor de autenticacion...",
    "Preparando redireccion segura..."
  ];

  // ✅ NUEVO: Redirección automática cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated && user && user.roles && !hasRedirected.current) {
      console.log('🚀 DevLoginPage: Usuario autenticado detectado, redirigiendo...', user);
      hasRedirected.current = true;

      const dashboardPath = getDashboardPathByRole(user.roles);
      console.log('📍 Redirigiendo a:', dashboardPath);

      // Pequeño delay para mostrar el mensaje de redirección
      setTimeout(() => {
        navigate(dashboardPath, { replace: true });
      }, 1500);
    }
  }, [isAuthenticated, user, navigate]);

  // --- Keycloak login seguro ---
  const handleKeycloakLogin = () => {
    setKeycloakState('loading');

    setTimeout(() => {
      setKeycloakState('success');

      setTimeout(() => {
        setKeycloakState('redirecting');

        setTimeout(() => {
          const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak-production-2d31.up.railway.app';
          const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'MediLink';
          const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'medilink-frontend';
          const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');

          window.location.href = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;
        }, 1000);
      }, 1500);
    }, 2000);
  };

  // --- Efecto seguro: disparar Keycloak solo si no venimos de él ---
  useEffect(() => {
    if (!isDevelopment && keycloakState === 'idle' && !hasStartedKeycloak.current) {
      const params = new URLSearchParams(window.location.search);
      const cameFromKeycloak = params.get('code') || params.get('error');

      if (!cameFromKeycloak) {
        hasStartedKeycloak.current = true;
        handleKeycloakLogin();
      }
    }
  }, [isDevelopment, keycloakState]);

  // --- Mensajes animados ---
  useEffect(() => {
    if (keycloakState === 'loading') {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [keycloakState]);

  // --- Dev login manual ---
  const handleDevLogin = async (userType: 'paciente' | 'doctor' | 'admin') => {
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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (isDevelopment) {
        localStorage.removeItem('dev_user');
        localStorage.removeItem('dev_token');
        localStorage.removeItem('dev_user_type');
        window.location.reload();
      } else {
        await logout();
      }
    } catch {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };

  // --- Renderizar UI ---
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sesión Activa</h2>
          {user && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Usuario: <span className="font-semibold">{user.name}</span></p>
              <p className="text-sm text-gray-600">Email: <span className="font-semibold">{user.email}</span></p>
              <p className="text-sm text-gray-600">Rol: <span className="font-semibold">{user.role || user.roles?.[0]}</span></p>
            </div>
          )}
          <div className="mb-6">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-gray-600">Redirigiendo al dashboard...</p>
          </div>

          {/* ✅ NUEVO: Botón manual por si la redirección automática falla */}
          <button
            onClick={() => {
              if (user?.roles) {
                const dashboardPath = getDashboardPathByRole(user.roles);
                navigate(dashboardPath, { replace: true });
              }
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir al Dashboard Manualmente
          </button>
        </div>
      </div>
    );
  }

  // --- Producción: loading Keycloak ---
  if (!isDevelopment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          {keycloakState === 'loading' && (
            <div>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
              <p className="text-gray-600 font-medium">{loadingMessages[messageIndex]}</p>
            </div>
          )}
          {keycloakState === 'success' && <p className="text-green-600 font-semibold">Conexión establecida</p>}
          {keycloakState === 'redirecting' && <p className="text-gray-600">Redirigiendo al login seguro...</p>}
        </div>
      </div>
    );
  }

  // --- Desarrollo: botones dev login ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">MediLink</h1>
          <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-2">MODO DESARROLLO</div>
          <p className="text-gray-600 text-sm">Selecciona un tipo de usuario para acceder</p>
        </div>
        <div className="space-y-3">
          <button onClick={() => handleDevLogin('paciente')} disabled={isLoading} className="w-full p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition text-left">
            <div className="flex items-center"><User className="h-6 w-6 text-blue-600" /><div className="ml-4">Paciente</div></div>
          </button>
          <button onClick={() => handleDevLogin('doctor')} disabled={isLoading} className="w-full p-4 border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition text-left">
            <div className="flex items-center"><Stethoscope className="h-6 w-6 text-green-600" /><div className="ml-4">Doctor</div></div>
          </button>
          <button onClick={() => handleDevLogin('admin')} disabled={isLoading} className="w-full p-4 border-2 border-red-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition text-left">
            <div className="flex items-center"><Shield className="h-6 w-6 text-red-600" /><div className="ml-4">Administrador</div></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevLoginPage;
