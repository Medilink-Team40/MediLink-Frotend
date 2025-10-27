# 🔧 N8N Streaming Events - Solución

## 📋 El Problema

N8N está devolviendo **dos tipos de formatos simultáneamente**:

### Formato 1: Array JSON (Lo que esperas)
```json
[
  {
    "status": "error",
    "message": "Actualmente no puedo acceder...",
    "data": {
      "paciente": "null",
      "doctor": "null"
    }
  }
]
```

### Formato 2: Eventos Streaming (Lo que recibes)
```
{"type":"begin","metadata":{...}}
{"type":"item","content":"...","metadata":{...}}
{"type":"end","metadata":{...}}
```

## ✅ La Solución

El servicio N8N ahora intenta **3 estrategias en orden**:

### 1️⃣ **Extrae del Array JSON**
Si recibe: `[{"message":"...",...}]`  
→ Extrae el `message` del primer elemento

### 2️⃣ **Extrae de Eventos Streaming**
Si recibe eventos con `type: "item"` y `content`  
→ Parsea cada evento  
→ Busca JSON en el `content`  
→ Extrae el mensaje

### 3️⃣ **Fallback a Texto Crudo**
Si nada funciona  
→ Retorna los primeros 200 caracteres limpios

## 📊 Flujo de Procesamiento

```
Respuesta de N8N
    ↓
¿Es Array JSON?
    ├─ SÍ → Extrae mensaje del array ✅
    └─ NO ↓
      ¿Contiene eventos streaming?
          ├─ SÍ → Busca objetos "item" ✅
          └─ NO ↓
            Retorna texto crudo limpio ✅
```

## 🔍 Debugging

En DevTools Console verás:

```
📤 Enviando a N8N: {message: "Hola", ...}
📨 Respuesta cruda: [{"status":"error",...}]
📦 Array N8N encontrado: {status: 'error', message: '...'}
✅ Mensaje extraído del array: Actualmente no puedo acceder...
```

O si es streaming:

```
📤 Enviando a N8N: {message: "Hola", ...}
📨 Respuesta cruda: {"type":"begin",...}
📄 Evento encontrado: begin
📄 Evento encontrado: item
📝 Contenido encontrado: {"status":"error"...}
✨ JSON directo: {status: 'error', message: '...'}
✅ Mensaje extraído de eventos: Actualmente no puedo acceder...
```

## 🎯 Campos que busca

El servicio busca en este orden:

1. `message`
2. `response`
3. `text`
4. `content`
5. `output`
6. `result`
7. `answer`

Si está anidado en `data`:
- `data.message`
- `data.response`
- etc.

## ✨ Casos Manejados

### ✅ Array JSON
```json
[{"message":"Tu mensaje"}]
```
→ "Tu mensaje"

### ✅ Array con data anidado
```json
[{
  "status": "error",
  "data": {"message": "Tu mensaje"}
}]
```
→ "Tu mensaje"

### ✅ Eventos streaming
```
{"type":"item","content":"{\"message\":\"Tu mensaje\"}"}
```
→ "Tu mensaje"

### ✅ JSON en bloque de código
```
{"type":"item","content":"```json\n{\"message\":\"...\"}\n```"}
```
→ "Tu mensaje"

### ✅ Respuesta con valores null
```json
[{
  "message": "Actualmente no puedo...",
  "data": {"paciente": "null"}
}]
```
→ "Actualmente no puedo..." (ignora campos con valor "null")

## 🚀 Recomendaciones para N8N

Para optimizar la respuesta, configura tu webhook N8N para retornar:

### Opción A: Array JSON Simple (Recomendado)
```json
[{
  "message": "Tu respuesta aquí"
}]
```

### Opción B: Array con Status
```json
[{
  "status": "success",
  "message": "Tu respuesta aquí",
  "data": { ... }
}]
```

### Opción C: JSON Directo
```json
{
  "message": "Tu respuesta aquí"
}
```

## 🧪 Probar tu Webhook

### Desde Browser Console
```javascript
fetch('https://tu-n8n.com/webhook/...', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({message: 'test', sessionId: 'test'})
})
  .then(r => r.text())
  .then(text => {
    console.log('Raw:', text);
    console.log('Parsed:', JSON.parse(text));
  })
  .catch(e => console.error('Error:', e));
```

### Desde Terminal
```bash
curl -X POST https://tu-n8n.com/webhook/... \
  -H "Content-Type: application/json" \
  -d '{"message":"test","sessionId":"test"}' \
  -v
```

## 📝 En el Chat Ahora Verás

Antes (Error ❌):
```
{"type":"begin",...} {"type":"item",...} {"type":"end",...}
```

Después (Limpio ✅):
```
Actualmente no puedo acceder a los datos necesarios, 
por favor inténtalo más tarde.
```

## 🔔 Si Aún no Funciona

1. **Abre DevTools (F12)**
2. **Envía un mensaje en el chat**
3. **Busca los logs azules** en Console:
   - `📤 Enviando a N8N:`
   - `📨 Respuesta cruda:`
   - `✅ Mensaje extraído:`

4. **Comparte los logs** si necesitas ayuda

## 🎉 Resultado Final

Tu chat ahora:
- ✅ Maneja arrays JSON
- ✅ Maneja eventos streaming
- ✅ Limpia automáticamente metadatos
- ✅ Extrae solo el mensaje
- ✅ Funciona con múltiples formatos de N8N

---

**El chat está listo. Pruébalo ahora y reporta cualquier problema en los logs.** 🚀
