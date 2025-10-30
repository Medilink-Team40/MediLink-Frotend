import React, { useState, useEffect } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { getChatService } from '@/service/socket/chatSocketService';
import { Wifi, WifiOff, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface ChatConnectionTesterProps {
  socketUrl?: string;
  n8nWebhookUrl?: string;
}

/**
 * Componente para probar la configuración del chat
 * Úsalo durante desarrollo para validar la conexión
 */
const ChatConnectionTester: React.FC<ChatConnectionTesterProps> = ({
  socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
  n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '',
}) => {
  const { connectionStatus, sessionId } = useChatStore();
  const [socketConnected, setSocketConnected] = useState(false);
  const [webhookValid, setWebhookValid] = useState<boolean | null>(null);
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [error, setError] = useState('');

  // Verificar Socket.IO
  useEffect(() => {
    try {
      const service = getChatService({
        socketUrl,
        n8nWebhookUrl,
      });

      if (service.isConnected()) {
        setSocketConnected(true);
      } else {
        setSocketConnected(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, [socketUrl, n8nWebhookUrl]);

  // Probar webhook de N8N
  const testWebhook = async () => {
    if (!n8nWebhookUrl) {
      setWebhookValid(false);
      setError('URL de webhook no configurada');
      return;
    }

    setIsTestingWebhook(true);
    setError('');

    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'test',
          sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setWebhookValid(true);
        setTestResponse(JSON.stringify(data, null, 2));
      } else {
        setWebhookValid(false);
        setError(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      setWebhookValid(false);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsTestingWebhook(false);
    }
  };

  // Enviar mensaje de prueba
  const sendTestMessage = async () => {
    if (!testMessage.trim()) return;

    setIsTestingWebhook(true);
    setError('');

    try {
      if (!n8nWebhookUrl) {
        throw new Error('URL de webhook no configurada');
      }

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: testMessage,
          sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTestResponse(data.response || data.message || JSON.stringify(data));
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-40 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-900">🧪 Tester de Chat</h3>

      {/* Estado Socket.IO */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          {socketConnected ? (
            <>
              <Wifi className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-green-700">Socket Conectado</span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="font-semibold text-red-700">Socket Desconectado</span>
            </>
          )}
        </div>
        <p className="text-xs text-gray-600">URL: {socketUrl}</p>
        <p className="text-xs text-gray-600">Status: {connectionStatus}</p>
      </div>

      {/* Estado Webhook */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {webhookValid === true ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-green-700">Webhook OK</span>
              </>
            ) : webhookValid === false ? (
              <>
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-red-700">Webhook Error</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-gray-500" />
                <span className="font-semibold text-gray-700">No probado</span>
              </>
            )}
          </div>
          <button
            onClick={testWebhook}
            disabled={!n8nWebhookUrl || isTestingWebhook}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isTestingWebhook ? 'Probando...' : 'Probar'}
          </button>
        </div>
        <p className="text-xs text-gray-600 truncate">
          URL: {n8nWebhookUrl || 'No configurada'}
        </p>
      </div>

      {/* Sesión ID */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs font-semibold text-gray-700 mb-1">Session ID:</p>
        <p className="text-xs text-gray-600 font-mono break-all">{sessionId}</p>
      </div>

      {/* Prueba de mensaje */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs font-semibold text-gray-700 mb-2">Mensaje de prueba:</p>
        <input
          type="text"
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full px-2 py-1 text-xs border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendTestMessage}
          disabled={!testMessage.trim() || isTestingWebhook}
          className="w-full px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center space-x-1"
        >
          {isTestingWebhook ? (
            <>
              <Loader className="h-3 w-3 animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <span>Enviar</span>
          )}
        </button>
      </div>

      {/* Respuesta */}
      {testResponse && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs font-semibold text-green-700 mb-2">Respuesta:</p>
          <pre className="text-xs text-green-600 overflow-auto max-h-20 whitespace-pre-wrap">
            {testResponse}
          </pre>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs font-semibold text-red-700 mb-1">Error:</p>
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ChatConnectionTester;
