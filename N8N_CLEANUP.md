# 🧹 Limpieza de Respuestas N8N

## 📋 Problema Original

N8N envía respuestas con múltiples eventos y metadatos:

```
{"type":"begin","metadata":{...}}
{"type":"item","content":"```json\n{\"status\":\"error\",\"message\":\"...\"}```"}
{"type":"item","content":" null,\n \"doctor\": null..."}
{"type":"end","metadata":{...}}
```

Esto causaba: `SyntaxError: Unexpected non-whitespace character after JSON at position 153`

## ✅ Solución Implementada

### Paso 1: Extrae múltiples objetos JSON
```javascript
// De esto:
{"type":"begin",...}{"type":"item",...}{"type":"end",...}

// A esto:
[
  { type: "begin", ... },
  { type: "item", content: "..." },
  { type: "end", ... }
]
```

### Paso 2: Busca el objeto "item"
```javascript
// Busca específicamente:
{
  "type": "item",
  "content": "```json\n{...}\n```"
}
```

### Paso 3: Extrae JSON de código
```javascript
// De:
"content": "```json\n{\"status\":\"error\",\"message\":\"...\"}\n```"

// A:
{
  "status": "error",
  "message": "..."
}
```

### Paso 4: Extrae el mensaje final
```javascript
// De:
{
  "status": "error",
  "message": "Actualmente no puedo acceder a los datos..."
}

// A:
"Actualmente no puedo acceder a los datos..."
```

## 🔍 Campos que busca (en orden)

1. `response`
2. `message`
3. `text`
4. `content`
5. `output`
6. `result`
7. `answer`
8. `reply`

Si ninguno existe, serializa todo el objeto.

## 📊 Logs en la consola

Ahora verás logs detallados:

```
🧹 Limpiando respuesta de N8N...
📦 Se encontraron 4 objetos JSON
📄 Encontrado objeto "item" con contenido
✨ Respuesta limpia: { status: 'error', message: '...' }
💬 Mensaje extraído: Actualmente no puedo acceder a los datos...
```

## 🧪 Probar manualmente

En DevTools Console:

```javascript
// Simular respuesta de N8N
const n8nResponse = `{"type":"begin","metadata":{"nodeId":"xyz"}} {"type":"item","content":"{\\"message\\":\\"Hola!\\"}"}`;

// Ver cómo se limpia
console.log(n8nResponse);
```

## ✨ Casos manejados

### ✅ Caso 1: Múltiples eventos JSON
```
{"type":"begin",...}{"type":"item","content":"..."}{"type":"end",...}
```
→ Extrae el contenido del item

### ✅ Caso 2: JSON en bloques de código
```
{"content":"```json\n{...}\n```"}
```
→ Extrae el JSON del bloque

### ✅ Caso 3: Respuesta simple
```
{"message":"Tu respuesta"}
```
→ Retorna directamente

### ✅ Caso 4: Respuesta anidada
```
{"data":{"message":"Tu respuesta"}}
```
→ Busca en campos anidados

### ✅ Caso 5: Solo texto
```
Respuesta en texto plano
```
→ Retorna el texto

## 🔧 Debugging

Si aún ves metadatos en el chat:

1. **Abre DevTools Console** (F12)
2. **Envía un mensaje en el chat**
3. **Busca los logs:**
   - `🧹 Limpiando...` - Inicio
   - `📦 Se encontraron X objetos` - Cuántos JSONs encontró
   - `💬 Mensaje extraído:` - Lo que se mostrará

## 📝 Ejemplo completo

**Entrada (de N8N):**
```
{"type":"begin","metadata":{"nodeId":"3d148c55","nodeName":"AI Agent","timestamp":1761513669304}}
{"type":"item","content":"```json\n{\n \"status\": \"error\",\n \"message\": \"Actualmente no puedo acceder...\"\n}\n```","metadata":{"nodeId":"3d148c55","timestamp":1761513673753}}
{"type":"end","metadata":{"nodeId":"3d148c55","timestamp":1761513674320}}
```

**Proceso:**
1. ✅ Encuentra 3 objetos JSON
2. ✅ Identifica el tipo "item"
3. ✅ Extrae JSON del bloque ```json...```
4. ✅ Extrae el mensaje

**Salida (en el chat):**
```
Actualmente no puedo acceder a los datos necesarios, por favor inténtalo más tarde.
```

## 🚀 Ahora el chat funciona limpio

- ✅ Solo muestra el mensaje
- ✅ Sin metadatos
- ✅ Sin fechas
- ✅ Sin IDs de nodos
- ✅ Sin información analítica

---

Si aún hay problemas, verifica que N8N devuelva respuestas con al menos uno de estos campos:
- `message`
- `response`
- `text`
- O envuelto en ```json...```
