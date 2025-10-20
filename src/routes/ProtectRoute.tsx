// src/components/ProtectRoute.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/AuthProvider';
import { Spinner } from '@/components/ui/spinner';

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (!isAuthenticated) {
         
          navigate('/', {
            state: { from: location },
            replace: true
          });
        }
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, loading, navigate, location]);

  if (loading || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className='6' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // O un componente de redirección
  }

  return <>{children}</>;
};

export default ProtectRoute