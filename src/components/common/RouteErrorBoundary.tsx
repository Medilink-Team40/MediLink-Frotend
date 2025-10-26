// src/components/common/RouteErrorBoundary.tsx
import { useRouteError, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export const RouteErrorBoundary = () => {
    const error: any = useRouteError();
    const navigate = useNavigate();

   console.error('[ERROR] Route Error:', error);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900">
                    {error?.status === 404 ? '¡Ups! Página no encontrada' : '¡Algo salió mal!'}
                </h1>
                <p className="mt-2 text-gray-600">
                    {error?.status === 404
                        ? 'La página que estás buscando no existe o ha sido movida.'
                        : 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.'
                    }
                </p>

                {import.meta.env.DEV && error && (
                    <details className="mt-4 p-4 bg-gray-50 rounded-lg text-left text-sm text-gray-600">
                        <summary className="font-medium cursor-pointer">Detalles del error</summary>
                        <pre className="mt-2 overflow-auto max-h-40 p-2 bg-white rounded border border-gray-200">
                            {error.statusText || error.message || JSON.stringify(error, null, 2)}
                        </pre>
                    </details>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={handleGoHome}>
                        <Home className="mr-2 h-4 w-4" />
                        Volver al inicio
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleReload}
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Recargar página
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RouteErrorBoundary;