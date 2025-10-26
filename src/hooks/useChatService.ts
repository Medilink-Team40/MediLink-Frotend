import { useEffect, useCallback } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatSocketService, { getChatService } from '../service/socket/chatSocketService';
import N8NWebhookService, { getN8NService } from '../service/socket/n8nWebhookService';

interface UseChatServiceOptions {
  socketUrl?: string;
  n8nWebhookUrl?: string;
  useSocket?: boolean;
  autoConnect?: boolean;
}

/**
 * Hook personalizado para gestionar el servicio de chat
 * Simplifica la integración del chat en cualquier componente
 */
export const useChatService = ({
  socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
  n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '',
  useSocket = true,
  autoConnect = true,
}: UseChatServiceOptions = {}) => {
  const {
    sessionId,
    addMessage,
    removeMessage,
    setLoading,
    setConnectionStatus,
  } = useChatStore();

  // Inicializar y conectar servicio Socket.IO
  const connectSocket = useCallback((): ChatSocketService => {
    const service = getChatService({
      socketUrl,
      n8nWebhookUrl,
      useWebhook: false,
    });

    if (autoConnect && !service.isConnected()) {
      service.connect();
    }

    return service;
  }, [socketUrl, n8nWebhookUrl, autoConnect]);

  // Inicializar servicio N8N Webhook
  const connectN8N = useCallback((): N8NWebhookService => {
    return getN8NService({
      webhookUrl: n8nWebhookUrl,
      timeout: 30000,
    });
  }, [n8nWebhookUrl]);

  // Enviar mensaje
  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      setLoading(true);

      try {
        if (useSocket) {
          const service = connectSocket();
          if (service.isConnected()) {
            service.sendMessage(message);
          } else {
            throw new Error('Socket no está conectado');
          }
        } else {
          const service = connectN8N();
          if (!service.isValidUrl()) {
            throw new Error('URL de webhook inválida');
          }

          const response = await service.sendMessage(message, sessionId);
          removeMessage('typing');
          addMessage({
            id: `bot_${Date.now()}`,
            text: response,
            sender: 'bot',
            timestamp: new Date(),
            metadata: { sessionId },
          });

          setLoading(false);
        }
      } catch (error) {
        removeMessage('typing');
        addMessage({
          id: `error_${Date.now()}`,
          text: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          sender: 'bot',
          timestamp: new Date(),
          error: true,
        });
        setLoading(false);
      }
    },
    [useSocket, sessionId, setLoading, connectSocket, connectN8N, removeMessage, addMessage]
  );

  // Efecto para conexión automática
  useEffect(() => {
    if (useSocket && autoConnect) {
      const service = connectSocket();
      return () => {
        // No desconectar automáticamente para mantener sesión
      };
    }
  }, [useSocket, autoConnect, connectSocket]);

  return {
    sendMessage,
    connectSocket,
    connectN8N,
    sessionId,
  };
};

export default useChatService;
