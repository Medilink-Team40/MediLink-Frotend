/**
 * Tipos TypeScript para el Chat System
 */

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
  error?: boolean;
  metadata?: {
    sessionId?: string;
    userId?: string;
  };
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    userId?: string;
    userAgent?: string;
    locale?: string;
  };
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export interface ChatServiceConfig {
  socketUrl: string;
  n8nWebhookUrl?: string;
  useWebhook?: boolean;
}

export interface N8NWebhookConfig {
  webhookUrl: string;
  timeout?: number;
}

export interface SocketEventData {
  'chat:message': {
    text: string;
    sessionId: string;
    timestamp: string;
  };
  'chat:response': {
    text: string;
    sessionId: string;
  };
  'chat:typing': {
    isTyping: boolean;
  };
  'chat:error': {
    message: string;
  };
}

export interface N8NWebhookPayload {
  message: string;
  sessionId: string;
  timestamp: string;
  userAgent?: string;
}

export interface N8NWebhookResponse {
  response?: string;
  message?: string;
  text?: string;
  output?: string;
  [key: string]: unknown;
}

export interface ChatStoreState {
  messages: ChatMessage[];
  isLoading: boolean;
  hasUnreadMessages: boolean;
  isOpen: boolean;
  isMinimized: boolean;
  sessionId: string;
  connectionStatus: ConnectionStatus;
}

export interface ChatStoreActions {
  addMessage: (message: ChatMessage) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setUnreadMessages: (hasUnread: boolean) => void;
  toggleOpen: () => void;
  toggleMinimized: () => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  resetChat: () => void;
}

export interface ChatAssistantProps {
  socketUrl?: string;
  n8nWebhookUrl?: string;
  useSocket?: boolean;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
}

export interface ChatProviderProps {
  children: React.ReactNode;
  socketUrl?: string;
  n8nWebhookUrl?: string;
  useSocket?: boolean;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  enabled?: boolean;
}

export interface UseChatServiceOptions {
  socketUrl?: string;
  n8nWebhookUrl?: string;
  useSocket?: boolean;
  autoConnect?: boolean;
}

export interface UseChatServiceReturn {
  sendMessage: (message: string) => Promise<void>;
  connectSocket: () => any;
  connectN8N: () => any;
  sessionId: string;
}
