/**
 * Servicio para comunicación con N8N vía webhook
 * Recibe respuestas JSON simples (no streaming)
 */

interface N8NEventBase {
  type: string;
  metadata: {
    nodeId: string;
    nodeName: string;
    itemIndex: number;
    runIndex: number;
    timestamp: number;
  };
}

// Evento de tipo "item" con contenido
interface N8NEventItem extends N8NEventBase {
  type: 'item';
  content: string;
}

// Eventos completos
type N8NEvent = N8NEventBase | N8NEventItem;


interface N8NWebhookConfig {
  webhookUrl: string;
  timeout?: number;
}

class N8NWebhookService {
  private config: N8NWebhookConfig;
  private controller: AbortController | null = null;

  constructor(config: N8NWebhookConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Extrae el mensaje de un objeto JSON
   */
  private extractMessageFromObject(obj: any): string | null {
    if (!obj || typeof obj !== 'object') {
      return null;
    }

    // Buscar campos comunes en orden de prioridad
    const fields = ['message', 'response', 'text', 'content', 'output', 'result', 'answer'];

    for (const field of fields) {
      if (obj[field] && typeof obj[field] === 'string' && obj[field] !== 'null' && obj[field].trim()) {
        return obj[field].trim();
      }
    }

    // Si tiene 'data' anidado
    if (obj.data && typeof obj.data === 'object') {
      for (const field of fields) {
        if (obj.data[field] && typeof obj.data[field] === 'string' && obj.data[field] !== 'null' && obj.data[field].trim()) {
          return obj.data[field].trim();
        }
      }
    }

    return null;
  }

  /**
   * Envía un mensaje al webhook de N8N y recibe respuesta JSON
   */
  public async sendMessage(message: string, sessionId: string): Promise<string> {
    try {
      this.controller = new AbortController();
      const timeoutId = setTimeout(
        () => this.controller?.abort(),
        this.config.timeout
      );

      console.log('Enviando a N8N:', { message, sessionId });

      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
        signal: this.controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Obtener respuesta como JSON
      const responseText = await response.text();
      if (!responseText) {
        throw new Error('Respuesta vacia del servidor N8N');
      }
      /**
       * La linea 115 fue comentada porque causaba errores de build al ejecutar
       * pnpm build 
       */
    //  console.debug('Respuesta cruda:', responseText.substring(0, Math.min(300, responseText.length)));

      // Parsear JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.warn('No es JSON valido, retornando como texto');
        return responseText;
      }

      // Si es array, tomar el primer elemento
      if (Array.isArray(data)) {
        console.log('Array detectado, tomando primer elemento');
        if (data.length > 0) {
          data = data[0];
        } else {
          throw new Error('Array vacío');
        }
      }

      console.log('Datos parseados:', data);

      // Extraer el mensaje
      const messageText = this.extractMessageFromObject(data);

      if (!messageText) {
        console.error('No se encontró mensaje en la respuesta:', data);
        throw new Error('No se encontró campo de mensaje válido en la respuesta');
      }

      console.log('Mensaje extraído:', messageText);
      return messageText;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La solicitud tardó demasiado. Intenta nuevamente.');
        }
        console.error('Error:', error.message);
        throw error;
      }
      throw new Error('Error desconocido al conectar con N8N');
    }
  }

  /**
   * Cancela la solicitud actual
   */
  public cancel(): void {
    this.controller?.abort();
  }

  /**
   * Valida la URL del webhook
   */
  public isValidUrl(): boolean {
    try {
      new URL(this.config.webhookUrl);
      return true;
    } catch {
      return false;
    }
  }
}

let n8nService: N8NWebhookService | null = null;

export const getN8NService = (config: N8NWebhookConfig): N8NWebhookService => {
  if (!n8nService) {
    n8nService = new N8NWebhookService(config);
  }
  return n8nService;
};

export default N8NWebhookService;


/**
 * Convierte una respuesta streaming de N8N en un solo string
 */

export function extractMessageFromN8NEvents(n8nResponse: any): string {
  try {
    // Convertir a string si no lo es
    const responseStr = typeof n8nResponse === 'string' ? n8nResponse : JSON.stringify(n8nResponse);

    // Separar por líneas y parsear cada línea como JSON
    const lines = responseStr.split(/\r?\n/);
    const messages: string[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        if (obj.type === 'item' && obj.content) {
          messages.push(obj.content);
        }
      } catch {
        // Ignorar líneas que no sean JSON
      }
    }

    // Concatenar todos los contenidos de los items
    if (messages.length > 0) {
      return messages.join(' ');
    }

    // Fallback: devolver la cadena original
    return responseStr;
  } catch (err) {
    console.error('Error extrayendo mensaje de N8N:', err);
    return 'Actualmente no puedo acceder a los datos necesarios, por favor inténtalo más tarde.';
  }
}


/**
 * Extrae un string de un objeto JSON, recursivamente
 */
function extractTextFromObject(obj: any): string | null {
  if (!obj) return null;
  if (typeof obj === 'string') return obj.trim();
  if (typeof obj !== 'object') return null;

  // Campos comunes
  const fields = ['message','response','text','content','output','result','answer'];
  for (const field of fields) {
    const value = obj[field];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  // Recursión en valores internos
  for (const value of Object.values(obj)) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'object') {
      const nested = extractTextFromObject(value);
      if (nested) return nested;
    }
  }

  return null;
}
