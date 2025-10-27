# 🎯 Guía Rápida de Instalación - Chat MediLink

## ✅ Checklist de Instalación

### Paso 1: Instalar dependencias
```bash
npm install socket.io-client
# o
pnpm add socket.io-client
```

### Paso 2: Configurar variables de entorno

Abre `.env.local` (o `.env` si trabajas en desarrollo) y añade:

```env
# Socket.IO (Backend)
VITE_SOCKET_URL=http://localhost:3001

# N8N Webhook (Fallback/Alternativa)
VITE_N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/chat
```

### Paso 3: Usar ChatProvider en tu App.tsx

```tsx
import ChatProvider from './config/ChatProvider';

function App() {
  return (
    <ChatProvider
      socketUrl={import.meta.env.VITE_SOCKET_URL}
      n8nWebhookUrl={import.meta.env.VITE_N8N_WEBHOOK_URL}
      useSocket={true}
      enabled={true}
    >
      {/* Tu contenido aquí */}
    </ChatProvider>
  );
}

export default App;
```

### Paso 4: (Opcional) Usar ChatConnectionTester en desarrollo

En tu App.tsx o página de pruebas:

```tsx
import ChatConnectionTester from './features/Test/ChatConnectionTester';

function App() {
  return (
    <>
      {/* Tu contenido */}
      {import.meta.env.DEV && (
        <ChatConnectionTester
          socketUrl={import.meta.env.VITE_SOCKET_URL}
          n8nWebhookUrl={import.meta.env.VITE_N8N_WEBHOOK_URL}
        />
      )}
    </>
  );
}
```

## 📁 Archivos Creados

```
src/
├── components/chat/
│   └── ChatAssistant.tsx           ✅ Componente principal mejorado
├── config/
│   └── ChatProvider.tsx            ✅ Provider wrapper
├── hooks/
│   └── useChatService.ts           ✅ Hook personalizado
├── service/socket/
│   ├── chatSocketService.ts        ✅ Socket.IO client
│   └── n8nWebhookService.ts        ✅ N8N webhook client
├── store/
│   └── useChatStore.ts             ✅ Zustand store
├── features/Test/
│   └── ChatConnectionTester.tsx    ✅ Tester componente

Raíz del proyecto:
├── CHAT_SETUP.md                   📚 Documentación completa
├── BACKEND_EXAMPLE.ts              📝 Ejemplo backend Node.js
└── .env.example                    ⚙️  Variables de entorno
```

## 🚀 Configuración del Backend

### Opción A: Usar tu backend existente (Recomendado)

Si ya tienes un backend Node.js/Express con Socket.IO en `MediLink-BackendTeam40`, solo necesitas:

1. Instalar dependencias:
```bash
npm install socket.io axios
```

2. Añadir el handler en tu servidor Socket.IO:

```typescript
io.on('connection', (socket) => {
  socket.on('chat:message', async (data) => {
    // Procesar con N8N o tu lógica
    const response = await procesarMensaje(data.text);
    
    socket.emit('chat:response', {
      text: response,
      sessionId: data.sessionId,
    });
  });
});
```

Ver `BACKEND_EXAMPLE.ts` para implementación completa.

### Opción B: Usar N8N Webhook directamente

Si prefieres usar N8N sin backend Socket.IO:

1. En tu `.env`:
```env
VITE_SOCKET_URL=
VITE_N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/chat
```

2. En ChatAssistant:
```tsx
<ChatProvider useSocket={false} />
```

## 🧪 Pruebas

### Test 1: Verificar conexión Socket.IO

```bash
# Terminal 1: Backend
cd MediLink-BackendTeam40
npm run dev

# Terminal 2: Frontend
cd MediLink-Frotend
npm run dev
```

Abre http://localhost:5173 y revisa la consola:
- ✅ Si ves `Conectado al servidor de chat` → Socket.IO funciona

### Test 2: Probar Webhook N8N

Usa el componente `ChatConnectionTester` que ya está integrado:
1. Abre tu app en desarrollo
2. Haz clic en el botón "Probar" al lado de "Webhook"
3. Si ves "Webhook OK" → La configuración es correcta

### Test 3: Enviar un mensaje

1. Abre el chat
2. Escribe un mensaje
3. Deberías ver la respuesta en segundos

## ⚡ Características Incluidas

✅ **Real-time Socket.IO** - Comunicación bidireccional  
✅ **Fallback automático** - Si Socket falla, usa webhook  
✅ **Persistencia de sesión** - Los mensajes se guardan en localStorage  
✅ **Indicadores de conexión** - Ve en tiempo real el estado  
✅ **UI moderna** - Interfaz pulida con animaciones  
✅ **TypeScript** - Tipado completo  
✅ **Zustand Store** - Estado global eficiente  
✅ **Devtools integrados** - Debugging en Redux DevTools  
✅ **Sesiones únicas** - Cada usuario tiene su sessionId  
✅ **Respuestas inteligentes** - Manejo de errores robusto  

## 🐛 Troubleshooting

### El chat no aparece
- Verifica que `ChatProvider` envuelve tu aplicación
- Comprueba que `enabled={true}` en ChatProvider

### No hay conexión Socket
- Revisa que `VITE_SOCKET_URL` es correcto
- Verifica CORS en tu backend
- Cambia a `useSocket={false}` para usar webhook

### N8N Webhook no funciona
- Valida que la URL en `VITE_N8N_WEBHOOK_URL` es correcta
- Prueba con curl:
```bash
curl -X POST https://n8n.tudominio.com/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

### Mensajes no se guardan
- Abre DevTools → Application → Local Storage
- Busca `medilink-chat-store`
- Si no existe, hay un problema con localStorage

## 📞 Referencia Rápida

### Usar el hook en cualquier componente
```tsx
import { useChatService } from './hooks/useChatService';

function MyComponent() {
  const { sendMessage, sessionId } = useChatService();
  
  return (
    <button onClick={() => sendMessage('Hola')}>
      Enviar
    </button>
  );
}
```

### Acceder al estado global
```tsx
import { useChatStore } from './store/useChatStore';

function MyComponent() {
  const { messages, isOpen, connectionStatus } = useChatStore();
  
  return <div>{messages.length} mensajes</div>;
}
```

### Personalizar colores
```tsx
<ChatProvider primaryColor="#FF6B6B" /> // Rojo
<ChatProvider primaryColor="#51CF66" /> // Verde
<ChatProvider primaryColor="#845EF7" /> // Púrpura
```

## 🎉 ¡Listo!

Tu chat está configurado y listo para producción. 

**Próximos pasos:**
1. ✅ Instala socket.io-client
2. ✅ Configura `.env`
3. ✅ Envuelve tu app con ChatProvider
4. ✅ Prueba el componente ChatConnectionTester
5. ✅ Implementa el backend (ver BACKEND_EXAMPLE.ts)

---

**Para más detalles:** Lee `CHAT_SETUP.md`

¡Cualquier duda, revisa la documentación o los logs en la consola! 🚀
