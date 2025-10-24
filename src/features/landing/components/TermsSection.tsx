import React from 'react';

const TermsSection = () => {
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
          Términos y Condiciones
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
        <section className="bg-blue-50 rounded-lg p-6">
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            1. Introducción
          </h2>
          <p 
            className="text-base leading-relaxed"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            Bienvenido a MediLink, el Portal Web de Coordinación de Citas y Teleasistencia. Estos términos y condiciones 
            rigen el uso de nuestra plataforma que conecta pacientes con profesionales de la salud para la gestión de 
            citas presenciales y virtuales, acceso a historiales médicos y comunicación segura.
          </p>
        </section>

        {/* Definitions */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            2. Definiciones
          </h2>
          <div className="space-y-3">
            <div>
              <strong 
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                "Plataforma":
              </strong>
              <span 
                className="ml-2"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Se refiere a MediLink, incluyendo todos sus servicios de coordinación médica y teleasistencia.
              </span>
            </div>
            <div>
              <strong 
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                "Usuario":
              </strong>
              <span 
                className="ml-2"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Cualquier persona que acceda y utilice la plataforma, incluyendo pacientes y profesionales médicos.
              </span>
            </div>
            <div>
              <strong 
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                "Teleconsulta":
              </strong>
              <span 
                className="ml-2"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                Consulta médica realizada a través de medios digitales seguros integrados en la plataforma.
              </span>
            </div>
          </div>
        </section>

        {/* Medical Services */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            3. Servicios Médicos y Responsabilidades
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
              ⚠️ Importante: MediLink es una plataforma tecnológica que facilita la conexión entre pacientes y profesionales 
              de la salud, pero no proporciona directamente servicios médicos.
            </p>
          </div>
          <ul className="space-y-3 list-disc list-inside">
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Los profesionales médicos registrados son independientes y responsables de sus propias prácticas médicas.
            </li>
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              La plataforma facilita la gestión de citas y comunicación, pero no interfiere en las decisiones médicas.
            </li>
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Todos los usuarios deben verificar las credenciales de los profesionales médicos antes de recibir atención.
            </li>
          </ul>
        </section>

        {/* Data and Privacy */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            4. Protección de Datos Médicos
          </h2>
          <p 
            className="mb-4"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            Cumplimos con los más altos estándares de seguridad para la protección de información médica:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Integración segura con sistemas EHR mediante estándares FHIR
            </li>
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Cifrado end-to-end para todas las comunicaciones médicas
            </li>
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Autenticación multifactor obligatoria para acceso a historiales médicos
            </li>
          </ul>
        </section>

        {/* Usage Terms */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            5. Términos de Uso de la Plataforma
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Permitido:
              </h3>
              <ul className="space-y-1 list-disc list-inside text-green-700">
                <li>Agendar y modificar citas médicas</li>
                <li>Acceder a su historial clínico personal</li>
                <li>Participar en teleconsultas programadas</li>
                <li>Recibir recordatorios automáticos</li>
              </ul>
            </div>
            <div>
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Prohibido:
              </h3>
              <ul className="space-y-1 list-disc list-inside text-red-700">
                <li>Compartir credenciales de acceso</li>
                <li>Usar la plataforma para emergencias médicas</li>
                <li>Interferir con otros usuarios</li>
                <li>Acceder a datos no autorizados</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Emergency Disclaimer */}
        <section className="bg-red-50 border-l-4 border-red-500 p-6">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            🚨 Aviso Importante sobre Emergencias
          </h2>
          <p 
            className="text-base font-medium"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            En caso de emergencia médica, NO utilice esta plataforma. Llame inmediatamente al número de emergencias 
            local (911) o diríjase al servicio de urgencias más cercano.
          </p>
        </section>

        {/* Liability */}
        <section>
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            6. Limitación de Responsabilidad
          </h2>
          <p 
            className="mb-4"
            style={{ 
              color: '#617c89 !important',
              WebkitTextFillColor: '#617c89 !important',
              opacity: '1 !important'
            }}
          >
            MediLink actúa como intermediario tecnológico y no asume responsabilidad por:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Decisiones médicas tomadas por profesionales de la salud
            </li>
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Resultados de tratamientos médicos
            </li>
            <li 
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              Interrupciones temporales del servicio por mantenimiento
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsSection;