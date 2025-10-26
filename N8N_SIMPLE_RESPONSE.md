# 🎯 Configuración N8N - Respuestas JSON Simples

## 📋 ¿Qué Necesita el Frontend?

El frontend espera que N8N devuelva un **JSON simple** con estos campos:

```json
{
  "message": "Tu respuesta aquí"
}
```

**Eso es todo lo que necesita.** Nada de metadatos, streaming, ni complejidad.

---

## 🔧 Configuración en N8N

### Paso 1: Crear Webhook

1. En N8N crea un nuevo workflow
2. Añade un nodo **Webhook**
   - Método: `POST`
   - Autenticación: `None`
   - Path: `/webhook/chat` (o similar)

### Paso 2: Procesar Mensaje

Añade los nodos que necesites:
- LLM node (procesa con IA)
- Code node (lógica personalizada)
- Database (si necesitas datos)

### Paso 3: Devolver Respuesta

En el **último nodo**, devuelve un objeto JSON simple:

```javascript
{
  "message": "Tu respuesta aquí"
}
```

---

## 📝 Ejemplos de Configuración

### Ejemplo 1: Respuesta Simple (Recomendado)

**Último nodo (Code):**
```javascript
return {
  "message": "Hola, soy tu asistente MediLink"
};
```

**N8N devuelve:**
```json
{
  "message": "Hola, soy tu asistente MediLink"
}
```

**El usuario ve:**
```
Hola, soy tu asistente MediLink
```

---

### Ejemplo 2: Con LLM

**Nodo 1: Webhook** → recibe `{ message: "Usuario pregunta" }`

**Nodo 2: OpenAI/Claude/LLM**
```
Prompt: "{{ $json.message }}"
```

**Nodo 3: Code**
```javascript
return {
  "message": $json.choices[0].message.content  // o tu campo
};
```

**N8N devuelve:**
```json
{
  "message": "Respuesta de la IA"
}
```

---

### Ejemplo 3: Con Lógica Condicional

**Nodo 1: Webhook** → recibe mensaje

**Nodo 2: Code** (lógica personalizada)
```javascript
const userMessage = $json.message.toLowerCase();

if (userMessage.includes('hola')) {
  return { "message": "¡Hola! ¿En qué puedo ayudarte?" };
}
if (userMessage.includes('cita')) {
  return { "message": "Te puedo ayudar a agendar una cita" };
}

return { "message": "No entendí tu pregunta" };
```

**N8N devuelve:**
```json
{
  "message": "¡Hola! ¿En qué puedo ayudarte?"
}
```

---

## ✅ Campos que Acepta el Frontend

Puedes usar cualquiera de estos:

```javascript
// Opción 1: message ✅ (Recomendado)
{ "message": "Tu respuesta" }

// Opción 2: response
{ "response": "Tu respuesta" }

// Opción 3: text
{ "text": "Tu respuesta" }

// Opción 4: content
{ "content": "Tu respuesta" }

// Opción 5: output
{ "output": "Tu respuesta" }

// Opción 6: result
{ "result": "Tu respuesta" }

// Opción 7: answer
{ "answer": "Tu respuesta" }
```

**El frontend buscará en este orden y usará el primero que encuentre.**

---

## 🚫 Lo Que NO Hacer

```javascript
// ❌ MALO: Devuelves todo
return $json;

// ❌ MALO: Array sin procesar
return [{ message: "..." }];

// ❌ MALO: Devuelves metadatos
return {
  type: "message",
  metadata: { ... },
  message: "..."
};

// ❌ MALO: Demasiado anidado
return {
  data: {
    result: {
      message: "..."
    }
  }
};
```

---

## ✅ Lo Que SÍ Hacer

```javascript
// ✅ BUENO: Simple
return { "message": "Hola" };

// ✅ BUENO: Con status
return {
  "status": "success",
  "message": "Tu respuesta"
};

// ✅ BUENO: Con contexto
return {
  "message": "Tu respuesta",
  "sessionId": $json.sessionId
};
```

---

## 🧪 Probar tu Webhook

### Con cURL

```bash
curl -X POST 'https://tu-n8n.com/webhook/chat' \
  -H "Content-Type: application/json" \
  -d '{
    "message": "hola",
    "sessionId": "test123"
  }'
```

**Respuesta esperada:**
```json
{
  "message": "Tu respuesta aquí"
}
```

### En Browser Console

```javascript
fetch('https://tu-n8n.com/webhook/chat', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    message: "hola",
    sessionId: "test123"
  })
})
.then(r => r.json())
.then(data => console.log('Respuesta:', data))
.catch(e => console.error('Error:', e));
```

---

## 📊 Flujo Completo

```
Usuario escribe: "Hola"
        ↓
Frontend envía POST a N8N
  Body: { message: "Hola", sessionId: "..." }
        ↓
N8N procesa el mensaje
        ↓
N8N devuelve JSON
  { "message": "¡Hola! ¿En qué puedo ayudarte?" }
        ↓
Frontend extrae el campo "message"
        ↓
Chat muestra: "¡Hola! ¿En qué puedo ayudarte?"
```

---

## 🔍 Debugging

### En DevTools Console (F12)

Verás:
```
📤 Enviando a N8N: {message: "Hola", sessionId: "..."}
📨 Respuesta cruda: {"message":"¡Hola..."}
📋 Datos parseados: {message: "¡Hola..."}
✅ Mensaje extraído: ¡Hola! ¿En qué puedo ayudarte?
```

### Si hay error "No se encontró mensaje"

**Causas:**
1. El webhook devuelve `null` o un objeto vacío
2. El campo no es `message`, `response`, etc.
3. El valor es `"null"` (string) en lugar de mensaje real

**Solucionar:**
- Verifica que devuelves `{ "message": "algo" }`
- No devuelvas objetos anidados complejos
- Asegúrate que el valor no es `null` o vacío

---

## 🎯 Checklist Final

- [ ] Webhook creado en N8N
- [ ] POST method configurado
- [ ] Última respuesta es JSON simple
- [ ] Campo `message` (u otro permitido) con valor string
- [ ] Probado con cURL o Browser
- [ ] URL en `.env` es correcta

---

## 🚀 Implementación Rápida

**En N8N:**
```
[Webhook] → [Tu Lógica] → [Code Node]
                            return {
                              "message": resultado
                            }
```

**En Frontend:**
```tsx
<ChatProvider
  n8nWebhookUrl="https://tu-n8n.com/webhook/chat"
/>
```

**Listo.** El chat funciona. 🎉

---

## 📝 Template N8N Listo para Copiar

```javascript
// Copia esto en un nodo Code de N8N

// Tu lógica aquí
const mensaje = $json.message;
const respuesta = procesarMensaje(mensaje);

// Devuelve esto
return {
  "message": respuesta
};
```

---

**¿Preguntas? Revisa los logs en DevTools Console (F12).** 🔍
