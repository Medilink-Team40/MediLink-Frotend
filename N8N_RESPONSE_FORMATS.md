# 🎯 Formatos de Respuesta N8N - Guía Visual

## 📥 Lo que tu Frontend Espera Ahora

El servicio N8N actualizado puede recibir y procesar **3 formatos diferentes**:

---

## Formato 1️⃣: Array JSON (Lo más común)

### ✅ N8N devuelve:
```json
[
  {
    "status": "error",
    "message": "Actualmente no puedo acceder a los datos necesarios, por favor inténtalo más tarde.",
    "data": {
      "paciente": "null",
      "doctor": "null",
      "especialidad": "null",
      "fecha_hora": "null",
      "alternativas": []
    }
  }
]
```

### ✅ Frontend extrae:
```
"Actualmente no puedo acceder a los datos necesarios, por favor inténtalo más tarde."
```

### 🔍 Proceso:
```
Array JSON
    ↓
Toma el primer elemento [0]
    ↓
Busca: message / response / text / data.message
    ↓
Retorna el texto
```

### 💻 En Consola:
```
📤 Enviando a N8N: {message: "Hola", sessionId: "..."}
📨 Respuesta cruda: [{"status":"error","message":"..."}]
📦 Array N8N encontrado: {status: 'error', message: '...'}
✅ Mensaje extraído del array: Actualmente no puedo acceder...
```

---

## Formato 2️⃣: Eventos Streaming N8N

### ✅ N8N devuelve:
```
{"type":"begin","metadata":{"nodeId":"3d148c55-75b0-4c52-a639-090d582631d0","nodeName":"AI Agent","itemIndex":0,"runIndex":0,"timestamp":1761514051231}}
{"type":"item","content":"```json\n{\n  \"status\": \"error\",\n  \"message\": \"Actualmente no puedo acceder...\"\n}\n```","metadata":{"nodeId":"3d148c55-75b0-4c52-a639-090d582631d0","nodeName":"AI Agent","itemIndex":0,"runIndex":0,"timestamp":1761514051500}}
{"type":"end","metadata":{"nodeId":"3d148c55-75b0-4c52-a639-090d582631d0","nodeName":"AI Agent","itemIndex":0,"runIndex":0,"timestamp":1761514051800}}
```

### ✅ Frontend extrae:
```
"Actualmente no puedo acceder a los datos necesarios, por favor inténtalo más tarde."
```

### 🔍 Proceso:
```
Eventos streaming (línea por línea)
    ↓
Parsea cada JSON
    ↓
Busca evento con type: "item"
    ↓
Extrae content
    ↓
Si está en ```json...``` lo extrae
    ↓
Busca message/response/text
    ↓
Retorna el texto
```

### 💻 En Consola:
```
📤 Enviando a N8N: {message: "Hola", sessionId: "..."}
📨 Respuesta cruda: {"type":"begin",...}
📄 Evento encontrado: begin
📄 Evento encontrado: item
📝 Contenido encontrado: {"status":"error"...}
✨ JSON de bloque de código: {status: 'error', message: '...'}
✅ Mensaje extraído de eventos: Actualmente no puedo acceder...
```

---

## Formato 3️⃣: JSON Directo (Simple)

### ✅ N8N devuelve:
```json
{
  "status": "success",
  "message": "Te he encontrado una cita disponible",
  "response": "El doctor está disponible mañana a las 10:00 AM"
}
```

### ✅ Frontend extrae:
```
"El doctor está disponible mañana a las 10:00 AM"
```

### 🔍 Proceso:
```
JSON directo
    ↓
Busca: message / response / text
    ↓
Retorna el texto
```

### 💻 En Consola:
```
📤 Enviando a N8N: {message: "¿Tienes disponibilidad?", sessionId: "..."}
📨 Respuesta cruda: {"status":"success","message":"..."}
✅ Mensaje extraído del array: Te he encontrado una cita...
```

---

## Campos Buscados (Orden de Prioridad)

El servicio busca en este orden exacto:

```
1️⃣ message
2️⃣ response
3️⃣ text
4️⃣ content
5️⃣ output
6️⃣ result
7️⃣ answer
```

Si ninguno existe, busca en `data.*`:
```
1️⃣ data.message
2️⃣ data.response
3️⃣ data.text
... y así
```

---

## ⚠️ Valores que Ignora

El servicio **automáticamente ignora**:

```json
{
  "message": "null",      ❌ Ignora (string "null")
  "message": null,        ❌ Ignora (null)
  "message": "",          ❌ Ignora (vacío)
  "message": "   ",       ❌ Ignora (solo espacios)
  "message": "Tu msg"     ✅ ACEPTA (válido)
}
```

---

## 🎯 Recomendaciones para N8N

### ✅ Mejor Estructura (Recomendado)

Configura tu webhook N8N para devolver SIEMPRE este formato:

```json
[
  {
    "message": "Aquí va tu respuesta final",
    "status": "success"  // optional
  }
]
```

**Ventajas:**
- ✅ Simple de parsear
- ✅ Compatible con varios sistemas
- ✅ Fácil de debuggear
- ✅ Rápido de procesar

### 📋 Ejemplo: Workflow N8N

```
[Input Nodo] (recibe el mensaje)
    ↓
[Tu lógica/IA] (procesa el mensaje)
    ↓
[Webhook Response] (devuelve)
    {
      "message": "{{ $json.response }}"
    }
```

---

## 🧪 Testing de Respuestas

### Test en Browser Console

```javascript
// Test Formato 1: Array JSON
const response1 = '[{"message":"Hola desde array"}]';
console.log('Response:', JSON.parse(response1));

// Test Formato 2: Eventos
const response2 = '{"type":"item","content":"{\\"message\\":\\"Hola desde eventos\\"}"}\n';
console.log('Response:', response2);

// Test Formato 3: JSON Directo
const response3 = '{"message":"Hola directo"}';
console.log('Response:', JSON.parse(response3));
```

### Test con cURL

```bash
# Prueba tu webhook actual
curl -X POST 'https://n8n-service-7r5q.onrender.com/webhook/902ba7bb-254e-47ad-b6ad-b591cd8080d1' \
  -H "Content-Type: application/json" \
  -d '{"message":"test","sessionId":"test123"}' \
  -v 2>&1 | grep -A 50 "< HTTP"
```

---

## 📊 Árbol de Decisión

```
┌─ Respuesta recibida
│
├─ ¿Empieza con [ ?
│  ├─ SÍ → Array JSON
│  │  └─ Extrae primer elemento
│  │     └─ Busca: message, response, text, etc
│  │        └─ RETORNA TEXTO ✅
│  │
│  └─ NO ↓
│
├─ ¿Empieza con { ?
│  ├─ SÍ → JSON Object
│  │  ├─ ¿Tiene type: "begin/item/end"?
│  │  │  ├─ SÍ → Evento Streaming
│  │  │  │  └─ Procesa múltiples líneas
│  │  │  │     └─ Busca type: "item"
│  │  │  │        └─ Extrae content
│  │  │  │           └─ RETORNA TEXTO ✅
│  │  │  │
│  │  │  └─ NO → JSON Directo
│  │  │     └─ Busca: message, response, text
│  │  │        └─ RETORNA TEXTO ✅
│  │  │
│  │  └─ NO ↓
│  │
└─ Texto plano
   └─ RETORNA PRIMEROS 200 CARACTERES ✅
```

---

## 🔴 Errores Comunes en N8N

### ❌ Error 1: Devuelve null
```json
{
  "message": null
}
```
**Solución:** Devuelve siempre un string:
```json
{
  "message": "Respuesta aquí"
}
```

### ❌ Error 2: Devuelve HTML
```html
<!DOCTYPE html>
<html>
  <body>Error...</body>
</html>
```
**Solución:** Verifica que:
- ✅ El webhook está activo
- ✅ Método POST está seleccionado
- ✅ Los nodos anteriores funcionan

### ❌ Error 3: Respuesta vacía
```json
{}
```
**Solución:** El campo message está vacío. Mapea correctamente:
```javascript
{
  "message": "{{ $json.resultado }}"  // Asegúrate que existe
}
```

### ❌ Error 4: Demasiado anidado
```json
{
  "data": {
    "response": {
      "result": {
        "message": "..."
      }
    }
  }
}
```
**Solución:** Simplifica la respuesta:
```json
{
  "message": "{{ $json.data.response.result.message }}"
}
```

---

## ✅ Verificar que Funciona

### Checklist Final

- [ ] Webhook N8N devuelve **array JSON** o **eventos**
- [ ] Primer campo es **message**, **response** o **text**
- [ ] El valor es un **string válido** (no null)
- [ ] Sin información anidada demasiada
- [ ] Probado con cURL (HTTP 200 OK)
- [ ] Chat muestra **solo el mensaje** en frontend

### Si Todo OK

```
✅ Usuario: "Hola"
✅ Frontend envía a N8N
✅ N8N procesa
✅ Frontend recibe respuesta limpia
✅ Chat muestra: "Tu respuesta aquí"
✅ Sin metadatos, timestamps, o IDs
```

---

## 📞 Debugging Rápido

1. **Abre DevTools (F12)**
2. **Ve a Console**
3. **Envía un mensaje en el chat**
4. **Busca logs azules:**
   ```
   📤 Enviando a N8N: ...
   📨 Respuesta cruda: ...
   ✅ Mensaje extraído: ...
   ```
5. **Si no ves ✅, copia los logs de error y revisa:**
   - URL correcta en `.env`?
   - Webhook activo en N8N?
   - Devuelve JSON válido?

---

## 🎉 Resultado Esperado

**En el chat deberías ver:**

```
Usuario: "Hola, necesito una cita"
[Tu mensaje aparece a la derecha con icono 👤]

Bot: "Actualmente no puedo acceder a los datos necesarios"
[Respuesta aparece a la izquierda con icono 🤖]
```

**NO deberías ver:**
```
❌ {"type":"begin",...}
❌ {"type":"item","content":"..."}
❌ {"metadata":{...}}
❌ Timestamps
❌ Node IDs
❌ Anything else que no sea el mensaje
```

---

**¿Preguntas? Revisa la sección de debugging o los logs en Console.** 🚀
