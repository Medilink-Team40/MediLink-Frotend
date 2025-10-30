// src/pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/config/AuthProvider';
import { getDashboardPathByRole } from '@/config/keycloak';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Esperar un momento para que el AuthProvider procese la autenticación
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (isAuthenticated && user?.roles) {
          const dashboardPath = getDashboardPathByRole(user.roles);
          console.log('🚀 Callback: Redirigiendo a', dashboardPath);
          navigate(dashboardPath, { replace: true });
        } else {
          console.log('❌ Callback: No autenticado, redirigiendo a landing');
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('Error en callback:', err);
        setError('Error en la autenticación');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleCallback();
  }, [navigate, isAuthenticated, user]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Procesando autenticación...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
