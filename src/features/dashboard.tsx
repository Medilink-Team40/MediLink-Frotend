import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { getKeycloakInstance } from "@/auth/keycloak";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Página de prueba de autenticación
const DashboardPrueba = () => {
  const navigate = useNavigate();
  const keycloak = getKeycloakInstance();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    roles: [] as string[]
  });

  // Cargar información del usuario
  useEffect(() => {
    if (keycloak.tokenParsed) {
      setUserInfo({
        name: keycloak.tokenParsed.name || 'Usuario',
        email: keycloak.tokenParsed.email || '',
        roles: keycloak.tokenParsed.realm_access?.roles || []
      });
    }
  }, [keycloak]);

  const handleLogout = async () => {
    try {
      await keycloak.logout({ 
        redirectUri: window.location.origin 
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <DashboardHeader 
        userType="patient" 
        userName={userInfo.name || 'Usuario'} 
        onLogout={handleLogout} 
      />

      <main className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg border border-blue-100">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Panel de Prueba de Autenticación</h1>
        
        <div className="space-y-6">
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg">
            <h2 className="font-semibold text-blue-700 mb-3">Información del Usuario</h2>
            <div className="space-y-2">
              <p className="text-blue-900"><span className="font-medium">Nombre:</span> {userInfo.name}</p>
              <p className="text-blue-900"><span className="font-medium">Email:</span> {userInfo.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {userInfo.roles.map((role, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg">
            <h2 className="font-semibold text-blue-700 mb-3">Token de Acceso</h2>
            <div className="mt-2 p-3 bg-white border border-blue-200 rounded-lg overflow-x-auto">
              <code className="text-xs text-blue-800 break-all">
                {keycloak.token?.substring(0, 50)}...
              </code>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(keycloak.token || '');
                // Aquí podrías agregar un toast de confirmación
              }}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copiar token
            </button>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg">
            <h2 className="font-semibold text-blue-700 mb-3">Acciones</h2>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Actualizar Datos
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPrueba;