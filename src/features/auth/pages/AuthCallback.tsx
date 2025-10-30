// src/pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKeycloakCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        setError('No se recibió el código de autenticación.');
        setLoading(false);
        return;
      }

      try {
        const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL!;
        const realm = import.meta.env.VITE_KEYCLOAK_REALM!;
        const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID!;
        const redirectUri = `${window.location.origin}/auth/callback`;

        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('client_id', clientId);
        formData.append('code', code);
        formData.append('redirect_uri', redirectUri);

        const response = await fetch(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });

        if (!response.ok) throw new Error('Error al intercambiar código.');

        const data = await response.json();
        const payload = JSON.parse(atob(data.id_token.split('.')[1]));

        const user = {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          role: payload.realm_access?.roles?.[0] || 'user',
        };

        login();

        // Redirigir según rol
        const role = payload.realm_access?.roles?.[0] || 'user';
        switch (role) {
          case 'doctor':
          case 'practitioner':
            navigate('/doctor/dashboard');
            break;
          case 'paciente':
          case 'patient':
            navigate('/patient/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } catch (err: any) {
        console.error('Error en autenticación:', err);
        setError(err.message || 'Error desconocido en la autenticación');
      } finally {
        setLoading(false);
      }
    };

    handleKeycloakCallback();
  }, [navigate, login]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Procesando autenticación...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
