import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatAssistantProps {
  n8nWebhookUrl?: string;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({
  n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/chat',
  position = 'bottom-right',
  primaryColor = '#3B82F6'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! 👋 Soy tu asistente virtual de MediLink. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle sending message to n8n
  const sendMessageToN8N = async (message: string): Promise<string> => {
    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
          sessionId: `session_${Date.now()}`, // Simple session management
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      return data.response || data.message || 'Lo siento, no pude procesar tu mensaje.';
    } catch (error) {
      console.error('Error sending message to n8n:', error);
      return 'Lo siento, hay un problema temporal con el servicio. Por favor, intenta más tarde.';
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      text: 'Escribiendo...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingMessage]);

    try {
      // Send to n8n and get response
      const botResponse = await sendMessageToN8N(userMessage.text);

      // Remove typing indicator and add real response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        return [...withoutTyping, botMessage];
      });

      // Show unread indicator if chat is closed
      if (!isOpen) {
        setHasUnreadMessages(true);
      }

    } catch (error) {
      // Remove typing indicator and show error
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Lo siento, ocurrió un error. Por favor, intenta nuevamente.',
          sender: 'bot',
          timestamp: new Date()
        };
        return [...withoutTyping, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Open chat and mark as read
  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnreadMessages(false);
  };

  // Position classes
  const positionClass = position === 'bottom-right'
    ? 'bottom-4 right-4'
    : 'bottom-4 left-4';

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`fixed ${positionClass} z-50`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-80 md:w-96 bg-white rounded-lg shadow-2xl border transition-all duration-300 ${
          isMinimized ? 'h-12' : 'h-96'
        }`}>
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 rounded-t-lg text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Asistente MediLink</span>
              {hasUnreadMessages && (
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="p-1 hover:bg-white/20 rounded"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="h-4 w-4 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1">
                          {message.isTyping ? (
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm">{message.text}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="relative p-4 rounded-full text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          style={{ backgroundColor: primaryColor }}
        >
          <MessageCircle className="h-6 w-6" />
          {hasUnreadMessages && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;