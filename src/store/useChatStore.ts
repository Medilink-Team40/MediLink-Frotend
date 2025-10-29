//import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  hasUnreadMessages: boolean;
  isOpen: boolean;
  isMinimized: boolean;
  sessionId: string;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';

  // Actions
  addMessage: (message: ChatMessage) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setUnreadMessages: (hasUnread: boolean) => void;
  toggleOpen: () => void;
  toggleMinimized: () => void;
  setConnectionStatus: (status: 'connected' | 'disconnected' | 'connecting') => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        messages: [
          {
            id: '1',
            text: '¡Hola! 👋 Soy tu asistente virtual de MediLink. ¿En qué puedo ayudarte hoy?',
            sender: 'bot',
            timestamp: new Date(),
          },
        ],
        isLoading: false,
        hasUnreadMessages: false,
        isOpen: false,
        isMinimized: false,
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        connectionStatus: 'disconnected',

        addMessage: (message) =>
          set((state) => ({
            messages: [...state.messages, message],
          })),

        removeMessage: (id) =>
          set((state) => ({
            messages: state.messages.filter((msg) => msg.id !== id),
          })),

        updateMessage: (id, updates) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, ...updates } : msg
            ),
          })),

        clearMessages: () =>
          set({
            messages: [
              {
                id: '1',
                text: '¡Hola! 👋 Soy tu asistente virtual de MediLink. ¿En qué puedo ayudarte hoy?',
                sender: 'bot',
                timestamp: new Date(),
              },
            ],
          }),

        setLoading: (loading) => set({ isLoading: loading }),

        setUnreadMessages: (hasUnread) =>
          set({ hasUnreadMessages: hasUnread }),

        toggleOpen: () =>
          set((state) => ({
            isOpen: !state.isOpen,
            hasUnreadMessages: state.isOpen ? state.hasUnreadMessages : false,
          })),

        toggleMinimized: () =>
          set((state) => ({
            isMinimized: !state.isMinimized,
          })),

        setConnectionStatus: (status) =>
          set({ connectionStatus: status }),

        resetChat: () =>
          set({
            messages: [
              {
                id: '1',
                text: '¡Hola! 👋 Soy tu asistente virtual de MediLink. ¿En qué puedo ayudarte hoy?',
                sender: 'bot',
                timestamp: new Date(),
              },
            ],
            isLoading: false,
            hasUnreadMessages: false,
            connectionStatus: 'disconnected',
          }),
      }),
      {
        name: 'medilink-chat-store',
        partialize: (state) => ({
          messages: state.messages.filter(m => m.sender === 'bot' || (m.sender === 'user' && !m.isTyping)),
          sessionId: state.sessionId,
        }),
      }
    ),
    { name: 'ChatStore' }
  )
);
