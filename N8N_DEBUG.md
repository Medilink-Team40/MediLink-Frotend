# 🔧 Debugging N8N Response

El error `SyntaxError: Unexpected non-whitespace character after JSON at position 153` significa que N8N está retornando algo que no es JSON válido.

## 📋 Posibles causas

1. **HTML error page** - N8N devuelve una página de error en HTML en lugar de JSON
2. **Texto plano** - Webhook devuelve solo texto, no JSON
3. **Formato mixto** - Respuesta contiene JSON + caracteres adicionales
4. **Encoding issues** - Problemas de codificación en la respuesta

## 🧪 Cómo debuggear

### Opción 1: Usar el ChatConnectionTester en desarrollo

```tsx
// En App.tsx o página de pruebas
import ChatConnectionTester from './features/Test/ChatConnectionTester';

// Verás el panel de prueba en la esquina inferior derecha
<ChatConnectionTester
  socketUrl={import.meta.env.VITE_SOCKET_URL}
  n8nWebhookUrl={import.meta.env.VITE_N8N_WEBHOOK_URL}
/>
```

El componente mostrará:
- ✅ Si el webhook responde correctamente
- 📝 El formato exacto de la respuesta
- ❌ Errores específicos

### Opción 2: Usar cURL para probar directamente

```bash
# Test el webhook de N8N directamente
curl -X POST https://n8n-service-7r5q.onrender.com/webhook/902ba7bb-254e-47ad-b6ad-b591cd8080d1 \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "message": "Hola",
    "sessionId": "test_123",
    "timestamp": "2024-01-01T12:00:00Z"
  }' \
  -v
```

Esto mostrará:
- Headers de respuesta
- Código HTTP
- Cuerpo exacto de la respuesta

### Opción 3: Ver logs en la consola del navegador

```javascript
// En DevTools Console
// 1. Abre Chat
// 2. Envía un mensaje
// 3. Verás logs como:

// "Raw response from N8N: {...}"
// "Parsed data: {...}"
```

Busca esos logs para ver exactamente qué está retornando N8N.

## ✅ Respuestas esperadas por N8N

### Formato 1: JSON simple (Recomendado)
```json
{
  "response": "Tu respuesta aquí"
}
```

### Formato 2: Campos alternativos
```json
{
  "message": "Tu respuesta"
}
```

### Formato 3: Respuesta compleja
```json
{
  "response": "Respuesta principal",
  "metadata": {
    "sessionId": "...",
    "timestamp": "..."
  }
}
```

### Formato 4: Solo texto (será normalizado)
```
Tu respuesta directa sin JSON
```

## 🔍 Verificar tu webhook N8N

### En N8N UI:

1. Abre tu workflow
2. Haz clic en el nodo "Webhook"
3. Verifica:
   - ✅ Está habilitado (toggle verde)
   - ✅ Método POST está seleccionado
   - ✅ La URL coincide con `VITE_N8N_WEBHOOK_URL`

4. En la pestaña "Response Mapping":
   - Asegúrate de que retorna un objeto JSON válido
   - El objeto debe tener al menos un campo con texto

### Ejemplo de configuración correcta en N8N:

**Entrada esperada:**
```
{
  "message": "texto del usuario",
  "sessionId": "...",
  "timestamp": "..."
}
```

**Nodo de procesamiento:**
```
[Tu lógica de IA/LLM aquí]
```

**Respuesta del webhook:**
```javascript
{
  "response": "{{ $json.respuesta_del_llm }}"
}
```

## 🛠️ Soluciones comunes

### Problema: HTML en lugar de JSON

**Síntomas:**
```
<!DOCTYPE html>
<html>
  <body>Error...</body>
</html>
```

**Solución:**
1. Verifica que el webhook está activo en N8N
2. Revisa los logs del webhook
3. Asegúrate de que todos los nodos anteriores están correctamente configurados

### Problema: Respuesta vacía

**Síntomas:**
```
{}
```

**Solución:**
1. El webhook está retornando un objeto vacío
2. Asegúrate de que el nodo previo devuelve datos
3. En el Webhook Response, mapea correctamente la respuesta

### Problema: Caracteres especiales

**Síntomas:**
```
Unexpected token < at position 0
```

**Solución:**
1. El servidor está retornando HTML
2. Verifica que es un webhook válido
3. Comprueba CORS si es desde diferente dominio

## 📡 Configuración de CORS en N8N

Si necesitas CORS en N8N, habilítalo:

```env
# En .env de N8N
WEBHOOK_TUNNEL_URL=https://n8n-service-7r5q.onrender.com
```

## 🔐 Verificar en tu consola del navegador

```javascript
// Copia esto en la consola:

// Test básico
fetch('https://n8n-service-7r5q.onrender.com/webhook/902ba7bb-254e-47ad-b6ad-b591cd8080d1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'test',
    sessionId: 'test_123'
  })
})
  .then(r => r.text())
  .then(text => {
    console.log('Raw response:', text);
    try {
      console.log('Parsed:', JSON.parse(text));
    } catch(e) {
      console.error('JSON parse error:', e.message);
    }
  })
  .catch(err => console.error('Fetch error:', err));
```

## 📝 Caso típico de error

```
Error: SyntaxError: Unexpected non-whitespace character after JSON at position 153
```

Esto significa que:
1. ✅ Los primeros 153 caracteres son JSON válido
2. ❌ Después hay caracteres adicionales no esperados

**Ejemplo:**
```
{"response":"Hola"},\n\n<html>error...</html>
                 ↑
           Problema aquí
```

## ✨ Solución rápida

Si N8N sigue devolviendo respuestas malformadas:

1. **Opción A:** Actualiza tu N8N workflow para devolver JSON puro:
```javascript
return {
  "response": "Tu respuesta aquí"
}
```

2. **Opción B:** Usa Socket.IO con tu backend en lugar de webhook directo
```env
VITE_SOCKET_URL=http://localhost:3001
```

3. **Opción C:** Crea un endpoint intermedio en tu backend que normalice la respuesta de N8N:
```typescript
app.post('/api/chat', async (req, res) => {
  const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(req.body)
  });
  
  const text = await n8nResponse.text();
  const data = JSON.parse(text); // Manejar errores
  
  res.json({ response: data.response });
});
```

---

**¿Aún hay problemas?** Verifica:
1. ✅ URL del webhook es correcta
2. ✅ Webhook está activo en N8N
3. ✅ Respuesta es JSON válido
4. ✅ No hay redirecciones
5. ✅ CORS está configurado correctamente
