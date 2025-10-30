import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Wifi, RotateCcw } from 'lucide-react';
import { useChatStore, ChatMessage } from '@/store/useChatStore';
import { extractMessageFromN8NEvents, getN8NService } from '@/service/socket/n8nWebhookService';

interface ChatAssistantProps {
  n8nWebhookUrl?: string;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({
  n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL,
  position = 'bottom-right',
  primaryColor = '#3B82F6',
}) => {
  const {
    messages,
    isLoading,
    hasUnreadMessages,
    isOpen,
    isMinimized,
    sessionId,
    addMessage,
    removeMessage,
    setLoading,
    setUnreadMessages,
    toggleOpen,
    toggleMinimized,
    resetChat,
  } = useChatStore();

  const [inputMessage, setInputMessage] = useState('');
  const [n8nService] = useState(() => getN8NService({ webhookUrl: n8nWebhookUrl }));

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      metadata: { sessionId },
    };

    addMessage(userMessage);
    setInputMessage('');
    setLoading(true);

    addMessage({
      id: 'typing',
      text: 'Escribiendo...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true,
    });

    try {
      const botResponseRaw = await n8nService.sendMessage(userMessage.text, sessionId);
      const botResponse = extractMessageFromN8NEvents(botResponseRaw);

      removeMessage('typing');

      addMessage({
        id: `bot_${Date.now()}`,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        metadata: { sessionId },
      });

      if (!isOpen) setUnreadMessages(true);
    } catch (error) {
      console.error('  Error:', error);
      removeMessage('typing');

      addMessage({
        id: `error_${Date.now()}`,
        text: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        sender: 'bot',
        timestamp: new Date(),
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenChat = () => {
    toggleOpen();
    setUnreadMessages(false);
  };

  const positionClass = position === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4';

  const ConnectionIndicator = () => (
    <div className="flex items-center space-x-1 text-xs">
      <Wifi className="h-3 w-3 text-green-500" />
      <span className="text-gray-600">Conectado a N8N</span>
    </div>
  );

  return (
    <div className={`fixed ${positionClass} z-50`}>
      {isOpen && (
        <div className={`mb-4 w-80 md:w-96 bg-white rounded-lg shadow-2xl border transition-all duration-300 ${isMinimized ? 'h-12' : 'h-96'}`}>
          <div
            className="flex items-center justify-between p-4 rounded-t-lg text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
            onClick={() => toggleMinimized()}
          >
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Asistente MediLink</span>
              {hasUnreadMessages && <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={(e) => { e.stopPropagation(); resetChat(); }} className="p-1 hover:bg-white/20 rounded transition-colors" title="Reiniciar chat">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleMinimized(); }} className="p-1 hover:bg-white/20 rounded transition-colors">
                <Minimize2 className="h-4 w-4" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); toggleOpen(); }} className="p-1 hover:bg-white/20 rounded transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="px-4 pt-3 pb-2 border-b bg-gray-50">
                <ConnectionIndicator />
              </div>

              <div className="h-60 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg transition-colors ${message.error ? 'bg-red-100 text-red-800' : message.sender === 'user' ? 'text-white' : 'bg-gray-100 text-gray-800'}`}
                      style={!message.error && message.sender === 'user' ? { backgroundColor: primaryColor } : {}}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && !message.error && <Bot className="h-4 w-4 mt-0.5 shrink-0" />}
                        {message.sender === 'user' && <User className="h-4 w-4 mt-0.5 shrink-0" />}
                        <div className="flex-1">
                          {message.isTyping ? (
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.text}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors disabled:bg-gray-100"
                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="relative p-4 rounded-full text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          style={{ backgroundColor: primaryColor }}
          title="Abrir chat"
        >
          <MessageCircle className="h-6 w-6" />
          {hasUnreadMessages && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
