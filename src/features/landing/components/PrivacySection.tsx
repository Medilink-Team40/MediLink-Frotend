import React from 'react';

const PrivacySection = () => {
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
          Política de Privacidad
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
        <section className="bg-green-50 rounded-lg p-6">
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            🔒 Nuestro Compromiso con su Privacidad
          </h2>
          <p 
            className="text-base leading-relaxed"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            En MediLink, entendemos que la información de salud es extremadamente sensible y personal. Esta política 
            explica cómo recopilamos, utilizamos, protegemos y compartimos su información médica personal en cumplimiento 
            con las regulaciones de privacidad de datos de salud más estrictas.
          </p>
        </section>

        {/* Data Collection */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            1. Información que Recopilamos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                📋 Información Médica
              </h3>
              <ul className="space-y-2 text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Historiales clínicos y diagnósticos
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Resultados de exámenes médicos
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Medicamentos y tratamientos
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Notas de teleconsultas
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                👤 Información Personal
              </h3>
              <ul className="space-y-2 text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Nombre completo y fecha de nacimiento
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Información de contacto
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Datos de seguros médicos
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  • Información de emergencia
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Data */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            2. Cómo Utilizamos su Información
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl mt-1">✓</span>
              <div>
                <h4 
                  className="font-semibold"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  Coordinación de Atención Médica
                </h4>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Facilitar la comunicación entre usted y sus profesionales de la salud para una atención coordinada.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl mt-1">✓</span>
              <div>
                <h4 
                  className="font-semibold"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  Gestión de Citas y Recordatorios
                </h4>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Programar citas y enviar recordatorios automáticos por SMS y email.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl mt-1">✓</span>
              <div>
                <h4 
                  className="font-semibold"
                  style={{ 
                    color: '#111618 !important',
                    WebkitTextFillColor: '#111618 !important',
                    opacity: '1 !important'
                  }}
                >
                  Integración con Sistemas EHR
                </h4>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Sincronizar de forma segura con sistemas de historias clínicas electrónicas existentes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="bg-blue-50 rounded-lg p-6">
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            3. 🛡️ Medidas de Seguridad Avanzadas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Protección Técnica
              </h3>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Cifrado AES-256 para datos en reposo
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  TLS 1.3 para datos en tránsito
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Autenticación multifactor obligatoria
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Monitoreo continuo de seguridad
                </li>
              </ul>
            </div>
            
            <div>
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Protección Administrativa
              </h3>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Control de acceso basado en roles
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Auditorías regulares de seguridad
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Capacitación en privacidad del personal
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Políticas de retención de datos
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            4. Compartir su Información
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
              ⚠️ Su información médica NUNCA se vende ni se comparte con fines comerciales.
            </p>
          </div>
          
          <p 
            className="mb-4"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            Compartimos información únicamente en las siguientes circunstancias:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✓</span>
              <span 
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Con profesionales de la salud autorizados para su atención
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✓</span>
              <span 
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Con su consentimiento explícito por escrito
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✓</span>
              <span 
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Cuando sea requerido por ley o autoridades sanitarias
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✓</span>
              <span 
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                En situaciones de emergencia médica para salvar vidas
              </span>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            5. Sus Derechos sobre la Información
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 
                className="text-lg font-semibold"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Usted tiene derecho a:
              </h3>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Acceder a su información médica
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Solicitar correcciones de datos inexactos
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Solicitar eliminación de datos (con limitaciones médicas)
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Revocar consentimientos otorgados
                </li>
                <li 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  Recibir una copia de sus datos
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                📞 Ejercer sus Derechos
              </h3>
              <p 
                className="text-sm mb-3"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Para ejercer cualquiera de estos derechos, contáctenos:
              </p>
              <div className="text-sm space-y-1">
                <p 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  📧 privacy@medilink.com
                </p>
                <p 
                  style={{ 
                    color: '#617c89 !important',
                    WebkitTextFillColor: '#617c89 !important',
                    opacity: '1 !important'
                  }}
                >
                  📞 +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact and Updates */}
        <section className="bg-blue-50 rounded-lg p-6">
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            6. Actualizaciones y Contacto
          </h2>
          
          <p 
            className="mb-4"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            Nos reservamos el derecho de actualizar esta política. Le notificaremos sobre cambios importantes 
            por email y a través de la plataforma. Su uso continuado constituye aceptación de los cambios.
          </p>
          
          <div className="bg-white rounded p-4">
            <h3 
              className="font-semibold mb-2"
              style={{ 
                color: '#111618 !important',
                WebkitTextFillColor: '#111618 !important',
                opacity: '1 !important'
              }}
            >
              Oficial de Protección de Datos
            </h3>
            <p 
              className="text-sm"
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Para consultas específicas sobre privacidad, puede contactar directamente a nuestro Oficial 
              de Protección de Datos en: dpo@medilink.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacySection;