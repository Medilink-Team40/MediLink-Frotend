# 🚀 Configuración N8N Response Streaming

## 📋 ¿Qué es Response Streaming?

Response Streaming permite que N8N envíe datos en **tiempo real**, línea por línea, sin esperar a que se complete todo el proceso.

**Ventajas:**
- ✅ Respuestas más rápidas (percepción de velocidad)
- ✅ Ideal para respuestas largas
- ✅ Mejor UX en chats
- ✅ Sin metadatos innecesarios

---

## 🔧 Configuración en N8N

### Paso 1: Crear tu Workflow

1. En N8N, crea un nuevo workflow
2. Añade un trigger **Webhook**
   - Método: `POST`
   - Autenticación: `None` (o configura si necesitas)
   - Path: `/webhook/chat` (o el que uses)

### Paso 2: Procesar el Mensaje

Añade los nodos que necesites:
- Input nodo (recibe el mensaje)
- LLM/AI nodo (procesa con IA)
- Lógica personalizada

### Paso 3: Configurar Response Streaming ⭐

**IMPORTANTE:** Este es el paso crítico

1. Selecciona el **último nodo** que devuelve la respuesta
2. En la pestaña de configuración del webhook:
   - ✅ Habilita **Response Streaming**
   - ✅ Asegúrate de devolver un objeto con campos conocidos

### Paso 4: Estructura de Respuesta

El webhook debe devolver líneas JSON, una por una:

```json
{"message": "Tu respuesta aquí"}
{"message": "Continuación..."}
```

O si usas múltiples eventos:

```json
{"type": "start", "status": "processing"}
{"message": "Procesando solicitud..."}
{"message": "Resultado final"}
{"type": "end"}
```

---

## ✅ Estructura Correcta

### Opción 1: Simple (Recomendado)

En el último nodo de N8N, retorna:

```javascript
{
  "message": "Tu respuesta aquí"
}
```

### Opción 2: Con Status

```javascript
{
  "status": "success",
  "message": "Tu respuesta aquí"
}
```

### Opción 3: Con Metadata

```javascript
{
  "message": "Tu respuesta aquí",
  "timestamp": Date.now(),
  "sessionId": "{{ $json.sessionId }}"
}
```

---

## 📝 Ejemplo de Workflow N8N

```
1. Webhook (Trigger)
   ↓
2. Code Node (Procesa)
   return {
     "message": "Hola, soy MediLink"
   }
   ↓
3. Response (Devuelve)
```

**Nodo Code:**
```javascript
// En N8N Code node
return {
  "message": "Tu respuesta aquí"
};
```

---

## 🔍 Debugging

### En DevTools Console (F12)

Verás logs como:

```
📤 Enviando a N8N con streaming: {message: "Hola", sessionId: "..."}
📨 Chunk recibido: {"message":"Tu respuesta..."}
📦 Evento N8N: {message: "Tu respuesta..."}
✅ Mensaje encontrado: Tu respuesta...
✅ Respuesta final: Tu respuesta...
```

### Si No Ves Logs

1. Verifica que el webhook está activo en N8N
2. Abre DevTools Console (F12)
3. Envía un mensaje en el chat
4. Busca los logs azules (📤 📨 ✅)

---

## ❌ Errores Comunes

### Error 1: "No se encontró mensaje"

**Causa:** El webhook devuelve un objeto sin los campos `message`, `response`, o `text`

**Solución:**
```javascript
// Asegúrate que devuelves:
return {
  "message": "Tu respuesta"
};
```

### Error 2: "No se pudo leer la respuesta"

**Causa:** El Response Streaming no está configurado en N8N

**Solución:**
1. Ve al webhook en N8N
2. Busca la opción "Response Streaming"
3. Habilítala ✅

### Error 3: HTML en lugar de JSON

**Causa:** El webhook devuelve una página de error

**Solución:**
1. Verifica que el webhook está activo
2. Revisa los logs de N8N
3. Asegúrate que los nodos anteriores funcionan

### Error 4: Respuesta vacía

**Causa:** No se envía ningún objeto JSON

**Solución:**
```javascript
// Siempre retorna algo:
return {
  "message": "Tu mensaje aquí"
};
```

---

## 📊 Campos que Busca el Frontend

El servicio N8N busca en este orden:

1. `message` ✅ (Principal)
2. `response`
3. `text`
4. `content`
5. `output`
6. `result`
7. `answer`

**Usa cualquiera de estos campos y funcionará.**

---

## 🧪 Probar Streaming en Browser

```javascript
// Copia esto en DevTools Console:

fetch('https://tu-n8n.com/webhook/chat', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    message: "Hola",
    sessionId: "test123"
  })
})
.then(r => r.body.getReader())
.then(reader => {
  const decoder = new TextDecoder();
  function read() {
    return reader.read().then(({done, value}) => {
      if (done) return;
      console.log(decoder.decode(value));
      return read();
    });
  }
  return read();
})
.catch(err => console.error('Error:', err));
```

---

## 🎯 Checklist Final

- [ ] Webhook creado en N8N
- [ ] Response Streaming **habilitado**
- [ ] Devuelve JSON con campo `message`
- [ ] Testiado con cURL o Browser
- [ ] URL correcta en `.env`
- [ ] `npm install socket.io-client` ✅
- [ ] ChatProvider configurado ✅

---

## 🚀 En el Frontend

### App.tsx

```tsx
import ChatProvider from './config/ChatProvider';

function App() {
  return (
    <ChatProvider
      n8nWebhookUrl={import.meta.env.VITE_N8N_WEBHOOK_URL}
      useSocket={false}  // Solo N8N
      enabled={true}
    >
      {/* Tu contenido */}
    </ChatProvider>
  );
}
```

### .env

```env
VITE_N8N_WEBHOOK_URL=https://n8n-service-7r5q.onrender.com/webhook/902ba7bb-254e-47ad-b6ad-b591cd8080d1
```

---

## ✨ Resultado Final

### En el Chat Verás:

**Usuario:** "¿Tienes disponibilidad?"  
**Bot:** "Te he encontrado una cita disponible mañana a las 10:00 AM"

**NO verás:**
- ❌ `{"type":"begin",...}`
- ❌ Metadatos
- ❌ Timestamps
- ❌ Node IDs
- ❌ Nada excepto el mensaje

---

## 📞 Ejemplo Real

### N8N Workflow:

```
[Webhook - recibe mensaje]
         ↓
[Chat LLM - procesa]
         ↓
[Code - formatea respuesta]
   return {
     "message": result.text
   }
         ↓
[Webhook Response - devuelve streaming]
```

### Lo que devuelve N8N:

```
{"message":"Hola, ¿en qué puedo ayudarte?"}
```

### Lo que ve el usuario en el chat:

```
Hola, ¿en qué puedo ayudarte?
```

---

## 🎉 Listo

Tu chat ahora recibe streaming directo de N8N, limpio y sin metadatos.

**Próximos pasos:**
1. ✅ Configura Response Streaming en N8N
2. ✅ Prueba el webhook
3. ✅ Abre el chat y envía un mensaje
4. ✅ Verifica logs en DevTools Console

¡Debería funcionar perfectamente! 🚀
