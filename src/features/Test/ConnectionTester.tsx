import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Loader2, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface TestEndpoint {
  name: string;
  url: string;
  method: string;
  status?: 'loading' | 'success' | 'error';
  responseTime?: number;
  statusCode?: number;
  error?: string;
}

const ConnectionTester = () => {
  const baseUrl = 'https://medilink-backend-production-3d65.up.railway.app';
  
  const [endpoints, setEndpoints] = useState<TestEndpoint[]>([
    { name: 'Health Check', url: '/api/health', method: 'GET' },
    { name: 'Auth Login', url: '/api/auth/login', method: 'POST' },
    { name: 'Doctors List', url: '/appointments', method: 'GET' },
    { name: 'Specialties', url: '/appointments/specialties', method: 'GET' },
  ]);

  const [isTestingAll, setIsTestingAll] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Test automático al cargar
    testAllEndpoints();
  }, []);

  const testEndpoint = async (endpoint: TestEndpoint): Promise<TestEndpoint> => {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${baseUrl}${endpoint.url}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
        // Para POST, enviar un body vacío
        ...(endpoint.method === 'POST' && { body: JSON.stringify({}) })
      });

      const duration = Date.now() - startTime;

      return {
        ...endpoint,
        status: response.ok ? 'success' : 'error',
        responseTime: duration,
        statusCode: response.status,
        error: response.ok ? undefined : `HTTP ${response.status}`
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      return {
        ...endpoint,
        status: 'error',
        responseTime: duration,
        error: error instanceof Error ? 
          (error.message.includes('CORS') || error.message.includes('Failed to fetch')
            ? 'CORS Error - Backend no permite localhost'
            : error.message
          ) : 'Connection failed'
      };
    }
  };

  const testAllEndpoints = async () => {
    setIsTestingAll(true);
    setOverallStatus('testing');

    // Marcar todos como loading
    setEndpoints(prev => prev.map(e => ({ ...e, status: 'loading' as const })));

    // Probar cada endpoint
    const results = await Promise.all(
      endpoints.map(endpoint => testEndpoint(endpoint))
    );

    setEndpoints(results);

    // Determinar estado general
    const allSuccess = results.every(r => r.status === 'success');
    const anySuccess = results.some(r => r.status === 'success');
    
    setOverallStatus(allSuccess ? 'success' : anySuccess ? 'error' : 'error');
    setIsTestingAll(false);
  };

  const testSingleEndpoint = async (index: number) => {
    const endpoint = endpoints[index];
    
    // Marcar como loading
    setEndpoints(prev => prev.map((e, i) => 
      i === index ? { ...e, status: 'loading' as const } : e
    ));

    // Probar endpoint
    const result = await testEndpoint(endpoint);

    // Actualizar resultado
    setEndpoints(prev => prev.map((e, i) => 
      i === index ? result : e
    ));
  };

  const getStatusIcon = (status?: 'loading' | 'success' | 'error') => {
    if (status === 'loading') return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
    if (status === 'success') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'error') return <XCircle className="w-5 h-5 text-red-500" />;
    return <div className="w-5 h-5 bg-gray-200 rounded-full" />;
  };

  const getStatusColor = (status?: 'loading' | 'success' | 'error') => {
    if (status === 'loading') return 'border-blue-200 bg-blue-50';
    if (status === 'success') return 'border-green-200 bg-green-50';
    if (status === 'error') return 'border-red-200 bg-red-50';
    return 'border-gray-200 bg-white';
  };

  const successCount = endpoints.filter(e => e.status === 'success').length;
  const totalCount = endpoints.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            {overallStatus === 'testing' ? (
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            ) : overallStatus === 'success' ? (
              <Wifi className="w-12 h-12 text-green-600" />
            ) : (
              <WifiOff className="w-12 h-12 text-red-600" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Backend Connection Test
          </h1>
          <p className="text-gray-600 mb-4">
            {baseUrl}
          </p>

          {/* Status Summary */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow">
            <span className="font-semibold text-gray-700">
              {successCount}/{totalCount} endpoints
            </span>
            {overallStatus === 'success' ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                ✓ Conectado
              </span>
            ) : overallStatus === 'testing' ? (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                • Probando...
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                ✗ Con errores
              </span>
            )}
          </div>
        </div>

        {/* Test All Button */}
        <div className="mb-6 text-center">
          <button
            onClick={testAllEndpoints}
            disabled={isTestingAll}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isTestingAll ? 'animate-spin' : ''}`} />
            {isTestingAll ? 'Probando...' : 'Probar Todos los Endpoints'}
          </button>
        </div>

        {/* Endpoints List */}
        <div className="space-y-3">
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all ${getStatusColor(endpoint.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(endpoint.status)}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{endpoint.name}</div>
                    <div className="text-sm text-gray-600">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mr-2 ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      {endpoint.url}
                    </div>
                    {endpoint.status === 'success' && (
                      <div className="text-xs text-green-600 mt-1">
                        ✓ {endpoint.statusCode} • {endpoint.responseTime}ms
                      </div>
                    )}
                    {endpoint.status === 'error' && (
                      <div className="text-xs text-red-600 mt-1">
                        ✗ {endpoint.error}
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => testSingleEndpoint(index)}
                  disabled={endpoint.status === 'loading'}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Probar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">ℹ️ Información</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Health Check:</strong> Verifica que el servidor esté activo</p>
            <p>• <strong>Auth Login:</strong> Endpoint de autenticación (esperará error 400/401 sin credenciales)</p>
            <p>• <strong>Doctors List:</strong> Lista de doctores disponibles</p>
            <p>• <strong>Specialties:</strong> Especialidades médicas disponibles</p>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> Algunos endpoints pueden devolver error 401 (No autorizado) si requieren autenticación. 
              Esto es normal y significa que el servidor está funcionando correctamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTester;