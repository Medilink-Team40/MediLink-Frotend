import React from 'react';

const CookiesSection = () => {
  const lastUpdated = "24 de octubre de 2025";

  return (
    <div className="flex flex-col max-w-4xl flex-1 mx-auto px-4 md:px-8 lg:px-12 bg-white py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ 
            color: '#111618 !important',
            WebkitTextFillColor: '#111618 !important',
            opacity: '1 !important'
          }}
        >
          Política de Cookies
        </h1>
        <p 
          className="text-lg"
          style={{ 
            color: '#617c89 !important',
            WebkitTextFillColor: '#617c89 !important',
            opacity: '1 !important'
          }}
        >
          Última actualización: {lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-orange-50 rounded-lg p-6">
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            🍪 ¿Qué son las Cookies?
          </h2>
          <p 
            className="text-base leading-relaxed"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita MediLink. 
            Nos ayudan a proporcionar una experiencia segura, personalizada y eficiente en nuestra plataforma de 
            coordinación médica y teleasistencia, siempre respetando la confidencialidad de su información de salud.
          </p>
        </section>

        {/* Types of Cookies */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-6"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            1. Tipos de Cookies que Utilizamos
          </h2>
          
          <div className="grid gap-6">
            {/* Essential Cookies */}
            <div className="border border-red-200 bg-red-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🔒</span>
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  Cookies Esenciales (Obligatorias)
                </h3>
              </div>
              <p 
                className="text-sm mb-3"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Estas cookies son fundamentales para el funcionamiento seguro de la plataforma médica:
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  <strong>Autenticación:</strong> Mantienen su sesión médica segura
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  <strong>Seguridad:</strong> Protegen contra accesos no autorizados
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  <strong>Funcionalidad:</strong> Permiten agendar citas y acceder a historiales
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  <strong>Teleconsultas:</strong> Facilitan las conexiones de video seguras
                </li>
              </ul>
            </div>

            {/* Performance Cookies */}
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">📊</span>
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  Cookies de Rendimiento
                </h3>
              </div>
              <p 
                className="text-sm mb-3"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Nos ayudan a mejorar la velocidad y eficiencia de la plataforma:
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Optimización de carga de historiales médicos
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Mejora del rendimiento de teleconsultas
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Monitoreo del tiempo de respuesta del sistema
                </li>
              </ul>
            </div>

            {/* Functional Cookies */}
            <div className="border border-green-200 bg-green-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">⚙️</span>
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  Cookies Funcionales
                </h3>
              </div>
              <p 
                className="text-sm mb-3"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Personalizan su experiencia médica sin comprometer la privacidad:
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Recordar preferencias de idioma y zona horaria
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Configuraciones de accesibilidad médica
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Preferencias de notificaciones médicas
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Medical Data Protection */}
        <section className="bg-red-50 border-l-4 border-red-500 p-6">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            🏥 Protección Especial para Datos Médicos
          </h2>
          <p 
            className="text-base font-medium"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            <strong>IMPORTANTE:</strong> Las cookies en MediLink NUNCA almacenan información médica sensible 
            como diagnósticos, tratamientos o historiales clínicos. Esta información se maneja exclusivamente 
            a través de sistemas seguros cifrados y cumple con todos los estándares de privacidad médica.
          </p>
        </section>

        {/* Third Party Cookies */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            2. Cookies de Terceros en Servicios Médicos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                🎥 Servicios de Teleconsulta
              </h3>
              <p 
                className="text-sm mb-2"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Para las videollamadas médicas seguras utilizamos:
              </p>
              <ul className="text-xs space-y-1">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • WebRTC (protocolo seguro integrado)
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Zoom Healthcare (cumple HIPAA)
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Microsoft Teams for Healthcare
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                📅 Integración de Calendarios
              </h3>
              <p 
                className="text-sm mb-2"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Para sincronizar citas médicas:
              </p>
              <ul className="text-xs space-y-1">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Google Calendar (solo fechas y horas)
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Microsoft Outlook (integración médica)
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Calendarios de sistemas EHR
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cookie Management */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            3. Control de sus Cookies
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                ⚙️ Panel de Preferencias de MediLink
              </h3>
              <p 
                className="text-sm mb-4"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Puede gestionar sus preferencias de cookies directamente desde su cuenta:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1 rounded text-xs border">Configuración → Privacidad → Cookies</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 
                  className="font-semibold mb-2"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  🟢 Cookies Permitidas
                </h4>
                <ul className="text-sm space-y-1">
                  <li 
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    ✓ Autenticación médica segura
                  </li>
                  <li 
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    ✓ Funcionalidad de teleconsultas
                  </li>
                  <li 
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    ✓ Gestión de citas médicas
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 
                  className="font-semibold mb-2"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  🔴 Cookies Opcionales
                </h4>
                <ul className="text-sm space-y-1">
                  <li 
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    ⚙️ Personalización de interfaz
                  </li>
                  <li 
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    📊 Análisis de rendimiento
                  </li>
                  <li 
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    🎯 Mejoras de experiencia
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Browser Settings */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            4. Configuración del Navegador
          </h2>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p 
              className="text-sm font-medium"
              style={{ 
                color: '#111618 !important',
                WebkitTextFillColor: '#111618 !important',
                opacity: '1 !important'
              }}
            >
              ⚠️ Advertencia: Deshabilitar todas las cookies puede afectar el funcionamiento de servicios médicos críticos 
              como las teleconsultas y el acceso a historiales.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">🌐</div>
              <h4 
                className="font-semibold text-sm"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Chrome
              </h4>
              <p 
                className="text-xs"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Configuración → Avanzado → Privacidad
              </p>
            </div>
            
            <div className="bg-white border rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">🦊</div>
              <h4 
                className="font-semibold text-sm"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Firefox
              </h4>
              <p 
                className="text-xs"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Opciones → Privacidad y Seguridad
              </p>
            </div>
            
            <div className="bg-white border rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">🧭</div>
              <h4 
                className="font-semibold text-sm"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Safari
              </h4>
              <p 
                className="text-xs"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Preferencias → Privacidad
              </p>
            </div>
            
            <div className="bg-white border rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">📱</div>
              <h4 
                className="font-semibold text-sm"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Edge
              </h4>
              <p 
                className="text-xs"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Configuración → Cookies y permisos
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookiesSection;