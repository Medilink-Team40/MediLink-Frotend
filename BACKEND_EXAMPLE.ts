/**
 * EJEMPLO: Backend Socket.IO para MediLink Chat
 * Este archivo muestra cómo configurar el servidor en Node.js/Express
 * 
 * npm install express socket.io cors dotenv axios
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Configurar Socket.IO con CORS
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Middleware
app.use(cors());
app.use(express.json());

// Almacenamiento temporal de sesiones
const sessions = new Map();

/**
 * Enviar mensaje a N8N y obtener respuesta
 */
async function sendToN8N(message: string, sessionId: string) {
  try {
    const response = await axios.post(
      process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/chat',
      {
        message,
        sessionId,
        timestamp: new Date().toISOString(),
      },
      {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data?.response || response.data?.message || 'Respuesta vacía';
  } catch (error) {
    console.error('Error enviando a N8N:', error);
    throw new Error('No se pudo procesar tu mensaje en este momento');
  }
}

/**
 * Eventos Socket.IO
 */
io.on('connection', (socket) => {
  const sessionId = socket.id;
  console.log(`✅ Cliente conectado: ${sessionId}`);

  // Almacenar información de la sesión
  sessions.set(sessionId, {
    connectedAt: new Date(),
    messageCount: 0,
    userId: null,
  });

  // Evento: Nuevo mensaje del usuario
  socket.on('chat:message', async (data: { text: string; sessionId: string }) => {
    const { text, sessionId: clientSessionId } = data;
    const session = sessions.get(sessionId);

    if (session) {
      session.messageCount++;
    }

    console.log(`📨 Mensaje de ${sessionId}: ${text}`);

    try {
      // Enviar indicador de que está escribiendo
      socket.emit('chat:typing', { isTyping: true });

      // Procesar el mensaje con N8N
      const botResponse = await sendToN8N(text, clientSessionId || sessionId);

      // Enviar respuesta
      socket.emit('chat:response', {
        text: botResponse,
        sessionId: clientSessionId || sessionId,
      });

      // Indicar que terminó de escribir
      socket.emit('chat:typing', { isTyping: false });
    } catch (error) {
      console.error('Error procesando mensaje:', error);

      socket.emit('chat:error', {
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  });

  // Evento: Desconexión
  socket.on('disconnect', () => {
    const session = sessions.get(sessionId);
    console.log(
      `❌ Cliente desconectado: ${sessionId} (${session?.messageCount || 0} mensajes)`
    );
    sessions.delete(sessionId);
  });

  // Evento: Error
  socket.on('error', (error) => {
    console.error(`Error en socket ${sessionId}:`, error);
  });
});

/**
 * Endpoints HTTP (opcionales)
 */

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    activeSessions: sessions.size,
  });
});

// Info del servidor
app.get('/stats', (req, res) => {
  const activeSessions = Array.from(sessions.entries()).map(([id, data]) => ({
    sessionId: id,
    ...data,
  }));

  res.json({
    activeSessions: activeSessions.length,
    sessions: activeSessions,
  });
});

/**
 * Iniciar servidor
 */
const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 MediLink Chat Server              ║
╠════════════════════════════════════════╣
║   Puerto: ${PORT}                           ║
║   N8N: ${process.env.N8N_WEBHOOK_URL || 'no configurado'}
║   Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  httpServer.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

export default httpServer;
