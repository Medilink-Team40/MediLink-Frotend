// src/components/common/Unauthorized.tsx
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Icono */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
          <ShieldAlert className="h-8 w-8 text-red-600" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Acceso Denegado
        </h1>

        {/* Descripción */}
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta página. Si crees que esto es un error, 
          contacta al administrador del sistema.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </button>
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <Home className="mr-2 h-4 w-4" />
            Ir al Dashboard
          </button>
        </div>

        {/* Info adicional */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Error 403 - Forbidden
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;