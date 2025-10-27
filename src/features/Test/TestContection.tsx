import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, AlertCircle, User, Stethoscope, UserCog, Copy, Check, Trash2, Save, FolderOpen, Wifi, WifiOff } from 'lucide-react';

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
  timestamp?: string;
  duration?: number;
}

interface SavedRequest {
  id: string;
  name: string;
  method: string;
  endpoint: string;
  body?: string;
  token?: string;
}

interface ConnectionStatus {
  isConnected: boolean;
  message: string;
  lastChecked?: string;
  responseTime?: number;
}

const APITester = () => {
  const [endpoint, setEndpoint] = useState('/api/');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('{}');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('https://medilink-backend-production-3d65.up.railway.app');
  const [savedRequests, setSavedRequests] = useState<SavedRequest[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    message: 'Verificando conexión...'
  });
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

  // Verificar conexión al cargar el componente
  useEffect(() => {
    checkConnection();
  }, [baseUrl]);

  const checkConnection = async () => {
    setIsCheckingConnection(true);
    const startTime = Date.now();

    try {
      const response = await fetch(`${baseUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const duration = Date.now() - startTime;

      if (response.ok) {
        setConnectionStatus({
          isConnected: true,
          message: 'Conectado al backend',
          lastChecked: new Date().toISOString(),
          responseTime: duration
        });
      } else {
        setConnectionStatus({
          isConnected: false,
          message: `Error: ${response.status} - ${response.statusText}`,
          lastChecked: new Date().toISOString()
        });
      }
    } catch (error) {
      setConnectionStatus({
        isConnected: false,
        message: error instanceof Error ? error.message : 'No se pudo conectar al servidor',
        lastChecked: new Date().toISOString()
      });
    } finally {
      setIsCheckingConnection(false);
    }
  };

  const testEndpoint = async () => {
    if (!endpoint) {
      alert('Por favor ingresa un endpoint');
      return;
    }

    setIsLoading(true);
    setResult(null);
    const startTime = Date.now();

    try {
      const url = `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      };

      if (method !== 'GET' && method !== 'HEAD') {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody));
        } catch (e) {
          setResult({
            success: false,
            error: 'Cuerpo de la solicitud no es un JSON válido',
            timestamp: new Date().toISOString(),
          });
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch(url, options);
      const duration = Date.now() - startTime;
      const data = await response.json().catch(() => ({}));

      setResult({
        success: response.ok,
        data,
        error: response.ok ? undefined : data.message || 'Error en la solicitud',
        status: response.status,
        timestamp: new Date().toISOString(),
        duration,
      });
    } catch (error) {
      const duration = Date.now() - startTime;
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date().toISOString(),
        duration,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveRequest = () => {
    const name = prompt('Nombre para esta solicitud:');
    if (!name) return;

    const newRequest: SavedRequest = {
      id: Date.now().toString(),
      name,
      method,
      endpoint,
      body: requestBody,
      token,
    };

    setSavedRequests([...savedRequests, newRequest]);
  };

  const loadRequest = (request: SavedRequest) => {
    setMethod(request.method);
    setEndpoint(request.endpoint);
    setRequestBody(request.body || '{}');
    setToken(request.token || '');
    setShowSaved(false);
  };

  const deleteRequest = (id: string) => {
    setSavedRequests(savedRequests.filter(r => r.id !== id));
  };

  const clearAll = () => {
    setEndpoint('/api/');
    setMethod('GET');
    setRequestBody('{}');
    setToken('');
    setResult(null);
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(requestBody);
      setRequestBody(JSON.stringify(parsed, null, 2));
    } catch (e) {
      alert('JSON inválido');
    }
  };

  const getEndpointIcon = (endpoint: string) => {
    if (endpoint.includes('auth')) return <UserCog className="w-4 h-4" />;
    if (endpoint.includes('patient')) return <User className="w-4 h-4 text-blue-500" />;
    if (endpoint.includes('doctor')) return <Stethoscope className="w-4 h-4 text-green-500" />;
    return null;
  };

  const getStatusColor = (status?: number) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800';
    if (status >= 400 && status < 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
      PATCH: 'bg-purple-100 text-purple-800',
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  const presetEndpoints = [
    {
      name: 'Health Check',
      method: 'GET',
      endpoint: '/api/health',
      description: 'Verificar estado del servidor'
    },
    {
      name: 'Login',
      method: 'POST',
      endpoint: '/api/auth/login',
      body: JSON.stringify({ email: 'usuario@ejemplo.com', password: 'contraseña' }, null, 2)
    },
    {
      name: 'Registro Paciente',
      method: 'POST',
      endpoint: '/api/auth/register/patient',
      body: JSON.stringify({
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'paciente@ejemplo.com',
        password: 'contraseñaSegura123',
        birthDate: '1990-01-01',
        gender: 'male'
      }, null, 2)
    },
    {
      name: 'Registro Doctor',
      method: 'POST',
      endpoint: '/api/auth/register/doctor',
      body: JSON.stringify({
        firstName: 'Doctor',
        lastName: 'Apellido',
        email: 'doctor@ejemplo.com',
        password: 'contraseñaSegura123',
        specialty: 'Cardiología',
        licenseNumber: '123456'
      }, null, 2)
    },
    {
      name: 'Obtener Perfil',
      method: 'GET',
      endpoint: '/api/users/me'
    },
    {
      name: 'Listar Doctores',
      method: 'GET',
      endpoint: '/api/doctors'
    },
    {
      name: 'Especialidades',
      method: 'GET',
      endpoint: '/api/doctors/specialties'
    }
  ];

  const applyPreset = (preset: any) => {
    setMethod(preset.method);
    setEndpoint(preset.endpoint);
    setRequestBody(preset.body || '{}');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🔬 MediLink API Tester
          </h1>
          <p className="text-gray-600">
            Prueba y documenta los endpoints de la API de forma interactiva
          </p>
        </div>

        {/* Connection Status Banner */}
        <div className={`mb-6 p-4 rounded-xl border-2 transition-all ${
          connectionStatus.isConnected
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isCheckingConnection ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              ) : connectionStatus.isConnected ? (
                <Wifi className="w-5 h-5 text-green-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-600" />
              )}
              <div>
                <div className={`font-semibold ${
                  connectionStatus.isConnected ? 'text-green-900' : 'text-red-900'
                }`}>
                  {connectionStatus.message}
                </div>
                <div className="text-xs text-gray-600">
                  {connectionStatus.lastChecked && (
                    <>
                      {/* Última verificación: {new Date(connectionStatus.lastChecked).toLocaleTimeString()} */}
                      {connectionStatus.responseTime && ` • ${connectionStatus.responseTime}ms`}
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={checkConnection}
              disabled={isCheckingConnection}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingConnection ? 'Verificando...' : 'Verificar'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Configuración */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Configuración</h2>
                <div className="flex gap-2">
                  <button
                    onClick={saveRequest}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Guardar solicitud"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowSaved(!showSaved)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                    title="Ver guardadas"
                  >
                    <FolderOpen className="w-5 h-5" />
                  </button>
                  <button
                    onClick={clearAll}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Limpiar todo"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Base URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base URL
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Método y Endpoint */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Método
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endpoint
                  </label>
                  <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="/api/endpoint"
                  />
                </div>
              </div>

              {/* Token */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token de Autenticación
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Bearer token..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Body */}
              {['POST', 'PUT', 'PATCH'].includes(method) && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Cuerpo (JSON)
                    </label>
                    <button
                      onClick={formatJSON}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Formatear JSON
                    </button>
                  </div>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder='{"key": "value"}'
                    spellCheck="false"
                  />
                </div>
              )}

              {/* Botón Enviar */}
              <button
                onClick={testEndpoint}
                disabled={isLoading}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Solicitud'
                )}
              </button>
            </div>

            {/* Resultado */}
            {result && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Respuesta</h2>
                  <div className="flex gap-2 items-center">
                    {result.duration && (
                      <span className="text-sm text-gray-500">
                        {result.duration}ms
                      </span>
                    )}
                    {result.status && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    )}
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
                    className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    title="Copiar respuesta"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto max-h-96 border border-gray-200">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Solicitudes Guardadas */}
            {showSaved && savedRequests.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Solicitudes Guardadas</h3>
                <div className="space-y-2">
                  {savedRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-start">
                        <button
                          onClick={() => loadRequest(req)}
                          className="flex-1 text-left"
                        >
                          <div className="font-medium text-gray-900">{req.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <span className={`px-2 py-0.5 rounded text-xs ${getMethodColor(req.method)}`}>
                              {req.method}
                            </span>
                            <span className="truncate">{req.endpoint}</span>
                          </div>
                        </button>
                        <button
                          onClick={() => deleteRequest(req.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Endpoints Predefinidos */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Endpoints Rápidos</h3>
              <div className="space-y-2">
                {presetEndpoints.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="w-full p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-left"
                  >
                    <div className="flex items-center gap-2">
                      {getEndpointIcon(preset.endpoint)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{preset.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <span className={`px-2 py-0.5 rounded ${getMethodColor(preset.method)}`}>
                            {preset.method}
                          </span>
                          <span className="truncate">{preset.endpoint}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guía Rápida */}
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Guía Rápida</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-blue-800 mb-1">🔐 Autenticación</div>
                  <div className="text-blue-700 space-y-0.5">
                    <div>• POST /api/auth/login</div>
                    <div>• POST /api/auth/register/*</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-green-800 mb-1">👥 Usuarios</div>
                  <div className="text-green-700 space-y-0.5">
                    <div>• GET /api/users/me</div>
                    <div>• GET /api/patients</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-purple-800 mb-1">⚕️ Doctores</div>
                  <div className="text-purple-700 space-y-0.5">
                    <div>• GET /api/doctors</div>
                    <div>• GET /api/doctors/specialties</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITester;