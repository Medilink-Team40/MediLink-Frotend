# 📝 Ejemplos N8N - Código Listo para Copiar

## 🎯 Usa Estos Ejemplos Directamente

---

## 1️⃣ Ejemplo Básico

**Nodo:** Code (JavaScript)

```javascript
return {
  "message": "Hola, soy MediLink"
};
```

**Resultado en el chat:**
```
Hola, soy MediLink
```

---

## 2️⃣ Con LLM (OpenAI/Claude)

**Nodo 1: Webhook**
- Recibe el mensaje del usuario

**Nodo 2: OpenAI/LLM**
```
Prompt: "Responde en español: {{ $json.message }}"
```

**Nodo 3: Code**
```javascript
// Extrae la respuesta del LLM
const llmResponse = $json.choices?.[0]?.message?.content || 
                     $json.message || 
                     "No pude generar una respuesta";

return {
  "message": llmResponse
};
```

**Resultado:**
```
Usuario: "¿Qué es MediLink?"
Bot: "MediLink es una plataforma de telemedicina..."
```

---

## 3️⃣ Con Lógica Condicional

**Nodo:** Code

```javascript
const userMessage = $json.message.toLowerCase().trim();

// Detectar intención
if (userMessage.includes('hola') || userMessage.includes('hi')) {
  return {
    "message": "¡Hola! 👋 Soy tu asistente MediLink. ¿En qué puedo ayudarte?"
  };
}

if (userMessage.includes('cita') || userMessage.includes('appointment')) {
  return {
    "message": "Te puedo ayudar a agendar una cita. ¿Con qué especialista deseas hablar?"
  };
}

if (userMessage.includes('horario') || userMessage.includes('schedule')) {
  return {
"message": "Nuestro horario es: Lunes a Viernes 8am-8pm, Sábados 9am-2pm"
  };
}

return {
  "message": "Lo siento, no entendí tu pregunta. ¿Puedes reformularla?"
};
```

---

## 4️⃣ Accediendo a Base de Datos

**Nodo 1: Webhook** → recibe mensaje

**Nodo 2: Database Query** (SQL)
```sql
SELECT * FROM doctors WHERE specialty = '{{ $json.specialty }}'
LIMIT 5
```

**Nodo 3: Code**
```javascript
const doctors = $json;
const count = doctors.length || 0;

let response;
if (count > 0) {
  const doctorNames = doctors.map(d => d.name).join(', ');
  response = `Encontré ${count} doctores disponibles: ${doctorNames}`;
} else {
  response = "No hay doctores disponibles en este momento. Intenta más tarde.";
}

return {
  "message": response
};
```

---

## 5️⃣ Con Información del Contexto

**Nodo:** Code

```javascript
const { message, sessionId } = $json;

// Construir respuesta con contexto
const timestamp = new Date().toLocaleString('es-ES');
const response = `${message}\n\n(Registrado: ${timestamp})`;

return {
  "message": response,
  "sessionId": sessionId
};
```

---

## 6️⃣ Buscar Información y Responder

**Nodo 1: Webhook**

**Nodo 2: If Node** (verificar tipo de pregunta)

**Nodo 3: Database/API Lookup**

**Nodo 4: Code**
```javascript
const userMessage = $json.message;
const lookupData = $json.lookupResult;

let response;

if (lookupData && lookupData.length > 0) {
  response = `Encontré información: ${JSON.stringify(lookupData[0])}`;
} else {
  response = `No encontré información para: ${userMessage}`;
}

return {
  "message": response
};
```

---

## 7️⃣ Validación de Entrada

**Nodo:** Code

```javascript
const userMessage = $json.message || '';

// Validar entrada
if (!userMessage || userMessage.trim().length === 0) {
  return {
    "message": "Por favor, escribe un mensaje válido."
  };
}

if (userMessage.length > 500) {
  return {
    "message": "Tu mensaje es demasiado largo. Por favor, acórtalo a 500 caracteres."
  };
}

if (userMessage.length < 2) {
  return {
    "message": "Tu mensaje es muy corto. Por favor, sé más específico."
  };
}

// Si pasa todas las validaciones
return {
  "message": `Entendido. Procesando: ${userMessage}`
};
```

---

## 8️⃣ Con Manejo de Errores

**Nodo:** Code

```javascript
try {
  const userMessage = $json.message;
  
  if (!userMessage) {
    throw new Error('El mensaje está vacío');
  }
  
  // Simular procesamiento
  const response = `Has dicho: ${userMessage}`;
  
  return {
    "message": response,
    "status": "success"
  };
  
} catch (error) {
  return {
    "message": `Error al procesar: ${error.message}`,
    "status": "error"
  };
}
```

---

## 9️⃣ Llamada HTTP a API Externa

**Nodo 1: Webhook**

**Nodo 2: HTTP Request Node**
```
Método: GET
URL: https://jsonplaceholder.typicode.com/users/1
```

**Nodo 3: Code**
```javascript
// $json contiene la respuesta de la API
const apiResponse = $json;

return {
  "message": `API respondió: ${apiResponse.name} (${apiResponse.email})`
};
```

---

## 🔟 Respuesta Dinámica Según Usuario

**Nodo:** Code

```javascript
const { message, sessionId, userAgent } = $json;

// Lógica diferente según contexto
let response;

if (userAgent.includes('Mobile')) {
  response = "📱 Detecté que estás en mobile. ¿Cómo puedo ayudarte?";
} else {
  response = "💻 Hola desde desktop. ¿En qué puedo ayudarte?";
}

return {
  "message": response
};
```

---

## 1️⃣1️⃣ Con Timer/Delay

**Nodo 1: Webhook**

**Nodo 2: Wait Node**
```
Time: 1 second (simula procesamiento)
```

**Nodo 3: Code**
```javascript
return {
  "message": "Procesé tu solicitud. Aquí está la respuesta."
};
```

---

## 1️⃣2️⃣ Respuesta con Formato

**Nodo:** Code

```javascript
const userMessage = $json.message;
const currentTime = new Date().toLocaleTimeString('es-ES');

const response = `
📋 Detalles:
• Mensaje: ${userMessage}
• Hora: ${currentTime}
• Estado: Procesado ✅
`.trim();

return {
  "message": response
};
```

---

## 1️⃣3️⃣ Múltiples Datos (Elegir el Primero)

**Nodo:** Code

```javascript
const items = [
  "Opción 1: Agendar cita",
  "Opción 2: Ver disponibilidad",
  "Opción 3: Consultar horario"
];

// Seleccionar basado en entrada
const userInput = $json.message.toLowerCase();
let selectedOption;

if (userInput.includes('1')) {
  selectedOption = items[0];
} else if (userInput.includes('2')) {
  selectedOption = items[1];
} else {
  selectedOption = items[2];
}

return {
  "message": `Seleccionaste: ${selectedOption}`
};
```

---

## 1️⃣4️⃣ Guardar y Recuperar Datos

**Nodo 1: Webhook**

**Nodo 2: Database Update/Insert**
```sql
INSERT INTO chat_history (message, timestamp) 
VALUES ('{{ $json.message }}', NOW())
```

**Nodo 3: Code**
```javascript
return {
  "message": "Tu mensaje fue guardado correctamente.",
  "timestamp": new Date().toISOString()
};
```

---

## 1️⃣5️⃣ Respuesta Basada en Hora

**Nodo:** Code

```javascript
const hour = new Date().getHours();

let greeting;
if (hour < 12) {
  greeting = "Buenos días";
} else if (hour < 18) {
  greeting = "Buenas tardes";
} else {
  greeting = "Buenas noches";
}

return {
  "message": `${greeting}! ¿En qué puedo ayudarte?`
};
```

---

## ✨ Template Completo Recomendado

Copia esto en tu nodo Code de N8N:

```javascript
// ============================================
// TEMPLATE COMPLETO PARA MEDILINK
// ============================================

try {
  // 1. Validar entrada
  const userMessage = $json.message?.trim() || '';
  
  if (!userMessage) {
    throw new Error('Mensaje vacío');
  }

  // 2. Procesar mensaje (tu lógica aquí)
  // Ejemplo: llamar a LLM, consultar BD, etc.
  
  // 3. Construir respuesta
  const response = `Has preguntado: ${userMessage}`;
  
  // 4. Devolver al frontend
  return {
    "message": response,
    "status": "success"
  };

} catch (error) {
  // Manejo de errores
  return {
    "message": `Error: ${error.message || 'Algo salió mal'}`,
    "status": "error"
  };
}
```

---

## 📋 Checklist Para Cada Ejemplo

- [x] Devuelve un objeto JSON
- [x] Tiene un campo `message` (o response, text, etc)
- [x] El valor es un string, no null
- [x] Sin metadatos adicionales
- [x] Testeado en el chat

---

## 🚀 Usa Estos Ejemplos

1. Selecciona el ejemplo que necesitas
2. Cópialo en un nodo Code de N8N
3. Adapta a tu lógica
4. Prueba en el chat

**¡Listo!** El chat recibirá respuestas limpias. ✨
