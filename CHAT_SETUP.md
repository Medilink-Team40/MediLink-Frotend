# 🚀 Configuración del Chat Assistant MediLink

Este documento te guía por la configuración completa del nuevo sistema de chat basado en Socket.IO y Zustand.

## 📋 Características

✅ **Socket.IO en tiempo real** - Comunicación bidireccional con el backend  
✅ **Fallback a N8N Webhook** - Funciona incluso sin Socket.IO  
✅ **Zustand Store** - Estado global eficiente y persistente  
✅ **Indicadores de conexión** - Estado visual de la conexión  
✅ **Sesiones persistentes** - Los mensajes se guardan en el almacenamiento local  
✅ **UI/UX moderna** - Interfaz pulida con animaciones suaves  
✅ **TypeScript** - Tipado completo para mayor seguridad  

## 🔧 Instalación

### 1. Instalar Socket.IO (si aún no está instalado)

```bash
npm install socket.io-client
# o
pnpm add socket.io-client
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env.local` y configura tus URLs:

```env
# Socket.IO Backend
VITE_SOCKET_URL=http://localhost:3001

# N8N Webhook (fallback)
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
```

## 📱 Uso Básico

### Opción 1: Usando ChatProvider (Recomendado)

En tu `App.tsx` o `main.tsx`:

```tsx
import ChatProvider from './config/ChatProvider';
import ChatAssistant from './components/chat/ChatAssistant';

function App() {
  return (
    <ChatProvider
      socketUrl={import.meta.env.VITE_SOCKET_URL}
      n8nWebhookUrl={import.meta.env.VITE_N8N_WEBHOOK_URL}
      useSocket={true}
      position="bottom-right"
      primaryColor="#3B82F6"
      enabled={true}
    >
      {/* Tu contenido */}
    </ChatProvider>
  );
}
```

### Opción 2: Usar ChatAssistant directamente

```tsx
import ChatAssistant from './components/chat/ChatAssistant';

function App() {
  return (
    <>
      {/* Tu contenido */}
      <ChatAssistant
        socketUrl="http://localhost:3001"
        n8nWebhookUrl="https://your-n8n.com/webhook/chat"
        useSocket={true}
        position="bottom-right"
        primaryColor="#3B82F6"
      />
    </>
  );
}
```

### Opción 3: Usar el hook personalizado

```tsx
import { useChatService } from './hooks/useChatService';
import { useChatStore } from './store/useChatStore';

function MyComponent() {
  const { sendMessage, sessionId } = useChatService({
    socketUrl: 'http://localhost:3001',
    useSocket: true,
  });

  const messages = useChatStore(state => state.messages);

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
      <button onClick={() => sendMessage('Hola')}>Enviar</button>
    </div>
  );
}
```

## 🎨 Props del ChatAssistant

```typescript
interface ChatAssistantProps {
  socketUrl?: string;           // URL del servidor Socket.IO
  n8nWebhookUrl?: string;       // URL del webhook de N8N
  useSocket?: boolean;          // Usar Socket.IO (true) o Webhook (false)
  position?: 'bottom-right' | 'bottom-left'; // Posición del chat
  primaryColor?: string;        // Color primario (#hexadecimal)
}
```

## 🗄️ Zustand Store

El store global `useChatStore` proporciona:

```typescript
const {
  messages,              // Array de mensajes
  isLoading,            // Estado de carga
  hasUnreadMessages,    // Tiene mensajes sin leer
  isOpen,               // Chat abierto
  isMinimized,          // Chat minimizado
  sessionId,            // ID de sesión único
  connectionStatus,     // 'connected' | 'disconnected' | 'connecting'

  // Acciones
  addMessage,           // Agregar mensaje
  removeMessage,        // Eliminar mensaje por ID
  updateMessage,        // Actualizar mensaje
  clearMessages,        // Limpiar todos los mensajes
  setLoading,          // Establecer estado de carga
  setUnreadMessages,   // Establecer mensajes no leídos
  toggleOpen,          // Alternar apertura del chat
  toggleMinimized,     // Alternar minimización
  setConnectionStatus, // Establecer estado de conexión
  resetChat,           // Reiniciar el chat
} = useChatStore();
```

## 🔌 Configurar Backend Socket.IO

### Node.js/Express

```typescript
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Tu frontend
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('chat:message', async (data) => {
    console.log('Mensaje recibido:', data);

    // Procesar con N8N o tu lógica
    const response = await procesarMensaje(data.text);

    // Enviar respuesta
    socket.emit('chat:response', {
      text: response,
      sessionId: data.sessionId,
    });
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

httpServer.listen(3001, () => {
  console.log('Servidor de chat en puerto 3001');
});
```

### Integración con N8N Webhook

En tu backend, redirige mensajes a N8N:

```typescript
async function procesarMensaje(mensaje: string) {
  const response = await fetch(process.env.N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: mensaje }),
  });
  
  const data = await response.json();
  return data.response;
}
```

## 🌐 Configurar N8N Webhook

1. En N8N, crea un workflow con un trigger "Webhook"
2. Configura el método POST
3. Copia la URL del webhook
4. Establece como `VITE_N8N_WEBHOOK_URL` en tu `.env`

### Estructura esperada de N8N

**Entrada:**
```json
{
  "message": "usuario pregunta algo",
  "sessionId": "session_123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Salida (una de estas):**
```json
{
  "response": "respuesta del bot",
  "sessionId": "session_123"
}
```

## 🚀 Deployment

### Vercel/Netlify

```env
VITE_SOCKET_URL=https://api.tudominio.com:3001
VITE_N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/chat
```

### Variables críticas a configurar

```env
# Desarrollo
VITE_SOCKET_URL=http://localhost:3001
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat

# Producción
VITE_SOCKET_URL=https://api.medilink.com:3001
VITE_N8N_WEBHOOK_URL=https://n8n.medilink.com/webhook/chat
```

## 🔍 Debugging

### Logs en consola

El sistema registra automáticamente:

```typescript
// Ver en DevTools Console
✅ Socket inicializado
✅ Conectado al servidor de chat
❌ Desconectado del servidor
```

### Monitorear estado en tiempo real

```tsx
import { useChatStore } from './store/useChatStore';

function DebugPanel() {
  const { connectionStatus, messages, sessionId } = useChatStore();
  
  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded">
      <p>Conexión: {connectionStatus}</p>
      <p>Sesión: {sessionId}</p>
      <p>Mensajes: {messages.length}</p>
    </div>
  );
}
```

## ⚠️ Troubleshooting

### Chat no recibe mensajes

1. Verifica que el Socket está conectado (`connectionStatus === 'connected'`)
2. Valida que `VITE_SOCKET_URL` es correcto
3. Revisa CORS en el servidor backend
4. Si Socket.IO falla, cambia a `useSocket={false}` para usar webhook

### N8N Webhook no responde

1. Verifica que la URL en `VITE_N8N_WEBHOOK_URL` es accesible
2. Asegúrate que el webhook está activo en N8N
3. Revisa los logs de N8N
4. Prueba con curl:
```bash
curl -X POST https://your-n8n.com/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

### Persistencia de mensajes no funciona

- Verifica que localStorage no está deshabilitado
- Revisa que el navegador permite almacenamiento local
- Limpia el storage: `localStorage.removeItem('medilink-chat-store')`

## 📚 Estructura de archivos

```
src/
├── components/
│   └── chat/
│       └── ChatAssistant.tsx          # Componente principal
├── config/
│   └── ChatProvider.tsx               # Provider wrapper
├── hooks/
│   └── useChatService.ts              # Hook personalizado
├── service/
│   └── socket/
│       ├── chatSocketService.ts       # Servicio Socket.IO
│       └── n8nWebhookService.ts       # Servicio Webhook
└── store/
    └── useChatStore.ts                # Zustand store
```

## 🎯 Próximos pasos

1. ✅ Instala socket.io-client
2. ✅ Configura variables de entorno
3. ✅ Envuelve tu app con ChatProvider o usa ChatAssistant
4. ✅ Configura tu backend Socket.IO
5. ✅ Prueba la conexión

## 📞 Soporte

Para problemas o sugerencias, revisa:
- Logs en DevTools Console
- Estado del store en Redux DevTools
- Conexión de red en Network tab

---

**¡Tu chat está listo para producción! 🎉**
