import React from 'react';
import ChatAssistant from '../components/chat/ChatAssistant';

/**
 * Provider para el Chat Assistant
 * Envuelve tu aplicación con este componente para habilitar el chat
 */

interface ChatProviderProps {
  children: React.ReactNode;
  //socketUrl?: string;
  n8nWebhookUrl?: string;
  useSocket?: boolean;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  enabled?: boolean;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  //socketUrl,
  n8nWebhookUrl,
  useSocket = true,
  position = 'bottom-right',
  primaryColor = '#3B82F6',
  enabled = true,
}) => {
  return (
    <>
      {children}
      {enabled && (
        <ChatAssistant
          //socketUrl={socketUrl}
          n8nWebhookUrl={n8nWebhookUrl}
          //useSocket={useSocket}
          position={position}
          primaryColor={primaryColor}
        />
      )}
    </>
  );
};

export default ChatProvider;
