

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle, User, Stethoscope, UserCog } from 'lucide-react';


interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
}

const TestConection = () => {
  const [endpoint, setEndpoint] = useState<string>('/api/');
  const [method, setMethod] = useState<string>('GET');
  const [requestBody, setRequestBody] = useState<string>('{}');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [token, setToken] = useState<string>('');




  const testEndpoint = async () => {
    if (!endpoint) {
      alert('Por favor ingresa un endpoint');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const url = `http://localhost:8080${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      };

      if (method !== 'GET' && method !== 'HEAD') {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody));
        } catch (e) {
          setResult({
            success: false,
            error: 'Cuerpo de la solicitud no es un JSON válido'
          });
          return;
        }
      }

      const response = await fetch(url, options);
      const data = await response.json().catch(() => ({}));

      setResult({
        success: response.ok,
        data,
        error: response.ok ? undefined : data.message || 'Error en la solicitud',
        status: response.status
      });
    } catch (error) {
      console.error('Error:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getEndpointIcon = (endpoint: string) => {
    if (endpoint.includes('auth')) return <UserCog className="w-5 h-5" />;
    if (endpoint.includes('patient')) return <User className="w-5 h-5 text-blue-500" />;
    if (endpoint.includes('doctor')) return <Stethoscope className="w-5 h-5 text-green-500" />;
    return null;
  };

  const getStatusColor = (status?: number) => {
    if (!status) return 'bg-gray-100';
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800';
    if (status >= 400 && status < 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const presetEndpoints = [
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
    }
  ];

  const applyPreset = (preset: any) => {
    setMethod(preset.method);
    setEndpoint(preset.endpoint);
    if (preset.body) {
      setRequestBody(preset.body);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 bg-gray-50  to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-amber-50 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Probador de API Medi-Link
          </h1>
          <p className="text-gray-600">
            Prueba los endpoints de la API de Medi-Link
          </p>
        </div>

        {/* Configuración */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuración de la Solicitud</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método HTTP
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endpoint
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  http://localhost:8080
                </span>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="/api/endpoint"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token de Autenticación (opcional)
            </label>
            <Input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Bearer token..."
            />
          </div>

          {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Cuerpo de la Solicitud (JSON)
                </label>
                <span className="text-xs text-gray-500">Formato JSON</span>
              </div>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full h-40 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder='{"key": "value"}'
                spellCheck="false"
              />
            </div>
          )}

          <Button
            onClick={testEndpoint}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Solicitud'
            )}
          </Button>
        </Card>

        {/* Endpoints predefinidos */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Endpoints Predefinidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetEndpoints.map((preset, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => applyPreset(preset)}
              >
                <div className="flex items-center">
                  {getEndpointIcon(preset.endpoint)}
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{preset.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{preset.method} {preset.endpoint}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Resultados */}
        {result && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Resultado</h2>
              {result.status && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                  {result.status} {result.status === 200 ? 'OK' : 'Error'}
                </span>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </Card>
        )}

        {/* Guía Rápida */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Guía Rápida</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Autenticación</h3>
              <ul className="text-sm space-y-1 text-blue-700">
                <li>• POST /api/auth/login</li>
                <li>• POST /api/auth/refresh</li>
                <li>• POST /api/auth/logout</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Pacientes</h3>
              <ul className="text-sm space-y-1 text-green-700">
                <li>• GET /api/patients</li>
                <li>• GET /api/patients/:id</li>
                <li>• POST /api/patients</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Doctores</h3>
              <ul className="text-sm space-y-1 text-purple-700">
                <li>• GET /api/doctors</li>
                <li>• GET /api/doctors/:id</li>
                <li>• GET /api/doctors/specialties</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


export default TestConection