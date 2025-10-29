//import { useChatStore } from '@/store/useChatStore';
import io, { Socket } from 'socket.io-client';

interface SocketChatConfig {
  socketUrl: string;
  n8nWebhookUrl?: string;
  useWebhook?: boolean;
}

class ChatSocketService {
  private socket: Socket | null = null;
  private config: SocketChatConfig;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(config: SocketChatConfig) {
    this.config = config;
  }

  /**
   * Inicializa la conexión Socket.IO
   */
  public connect(): void {
    if (this.socket?.connected) {
      console.log('Socket ya está conectado');
      return;
    }

    try {
      this.socket = io(this.config.socketUrl, {
        reconnection: true,
        reconnectionDelay: this.reconnectDelay,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: this.maxReconnectAttempts,
        transports: ['websocket', 'polling'],
      });

      this.setupEventListeners();
      console.log('Socket inicializado');
    } catch (error) {
      console.error('Error al inicializar socket:', error);
      useChatStore.getState().setConnectionStatus('disconnected');
    }
  }

  /**
   * Configura los listeners de eventos
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Conectado al servidor de chat');
      useChatStore.getState().setConnectionStatus('connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Desconectado del servidor');
      useChatStore.getState().setConnectionStatus('disconnected');
    });

    this.socket.on('chat:response', (data) => {
      this.handleBotResponse(data);
    });

    this.socket.on('chat:typing', (data) => {
      this.handleTypingIndicator(data);
    });

    this.socket.on('chat:error', (error) => {
      this.handleError(error);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
      useChatStore.getState().setConnectionStatus('disconnected');
    });

    this.socket.on('reconnect_attempt', () => {
      this.reconnectAttempts++;
      console.log(`Intento de reconexión ${this.reconnectAttempts}`);
    });
  }

  /**
   * Envía un mensaje al servidor
   */
  public sendMessage(message: string): void {
    if (!this.socket?.connected) {
      console.warn('Socket no está conectado');
      this.showError('Conexión perdida. Intenta nuevamente.');
      return;
    }

    const { sessionId } = useChatStore.getState();

    this.socket.emit('chat:message', {
      text: message,
      sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Maneja la respuesta del bot
   */
  private handleBotResponse(data: {
    text: string;
    sessionId: string;
  }): void {
    const { removeMessage, addMessage, setLoading } = useChatStore.getState();

    // Eliminar indicador de escritura
    removeMessage('typing');

    // Añadir respuesta del bot
    addMessage({
      id: `bot_${Date.now()}`,
      text: data.text,
      sender: 'bot',
      timestamp: new Date(),
      metadata: {
        sessionId: data.sessionId,
      },
    });

    setLoading(false);
  }

  /**
   * Maneja el indicador de escritura
   */
  private handleTypingIndicator(data: { isTyping: boolean }): void {
    const { addMessage, removeMessage } = useChatStore.getState();

    if (data.isTyping) {
      addMessage({
        id: 'typing',
        text: 'Escribiendo...',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true,
      });
    } else {
      removeMessage('typing');
    }
  }

  /**
   * Maneja errores
   */
  private handleError(error: { message: string }): void {
    this.showError(error.message || 'Error en el servidor');
  }

  /**
   * Muestra un mensaje de error
   */
  private showError(message: string): void {
    const { removeMessage, addMessage, setLoading } = useChatStore.getState();

    removeMessage('typing');
    addMessage({
      id: `error_${Date.now()}`,
      text: message,
      sender: 'bot',
      timestamp: new Date(),
      error: true,
    });

    setLoading(false);
  }

  /**
   * Desconecta el socket
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('Socket desconectado');
    }
  }

  /**
   * Obtiene el estado de conexión
   */
  public isConnected(): boolean {
    return this.socket?.connected || false;
  }

  /**
   * Obtiene la instancia del socket
   */
  public getSocket(): Socket | null {
    return this.socket;
  }
}

let chatService: ChatSocketService | null = null;

export const getChatService = (config: SocketChatConfig): ChatSocketService => {
  if (!chatService) {
    chatService = new ChatSocketService(config);
  }
  return chatService;
};

export default ChatSocketService;
