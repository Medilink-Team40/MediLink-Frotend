import React from 'react';
import { Button } from '@/components/ui/button';

const FeaturesPageSection = () => {
  const mainFeatures = [
    {
      icon: '↔️',
      title: 'Interoperabilidad con HCE',
      description: 'Se conecta sin problemas con varios sistemas de Historias Clínicas Electrónicas, asegurando la consistencia de los datos.'
    },
    {
      icon: '🔒',
      title: 'Intercambio Seguro de Datos',
      description: 'La transferencia de datos cifrados y compatible con HIPAA protege la privacidad del paciente y la información sensible.'
    },
    {
      icon: '👥',
      title: 'Colaboración en Tiempo Real',
      description: 'Permite la comunicación instantánea y el intercambio de datos entre pacientes y proveedores de atención médica.'
    }
  ];

  const patientBenefits = [
    {
      title: 'Conveniencia',
      description: 'Acceda a sus registros de salud y comuníquese con su médico desde cualquier lugar.'
    },
    {
      title: 'Mejor Coordinación de la Atención',
      description: 'Asegúrese de que todos sus proveedores tengan la información más actualizada.'
    },
    {
      title: 'Empoderamiento',
      description: 'Tome un papel activo en la gestión de su salud con fácil acceso a sus datos.'
    }
  ];

  const professionalBenefits = [
    {
      title: 'Eficiencia',
      description: 'Reduzca las tareas administrativas con la entrada de datos automatizada y flujos de trabajo optimizados.'
    },
    {
      title: 'Mejores Resultados',
      description: 'Tome decisiones más informadas con una visión integral del historial del paciente.'
    },
    {
      title: 'Colaboración Mejorada',
      description: 'Consulte fácilmente con otros especialistas y coordine la atención al paciente.'
    }
  ];

  return (
    <div className="flex flex-col max-w-6xl flex-1 mx-auto px-4 md:px-8 lg:px-12 bg-white">
      {/* Hero Section */}
      <div className="py-4">
        <div className="px-4 md:px-8">
          <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-start justify-end px-6 pb-10 md:px-12" 
               style={{
                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKNmX7S-sndJBHAbRPu5SOPjIXrqm6vMTs58fc6nGOXRH4nghiHwXmy1PqqUXt7cc_yqRwfxUVOBdjR6zZSPaG2JlWwaaXFJXn7Wk5uCvsAZ4C3_WnTdXP0A33EBZZmmZVQ5GbS4KwaSNY3Wx_XYF8oH_nRjIZNo4_7DZu7b9MaMJ_zkPCsNhKYS9fDnC6W0wcOyq61EVFzeOshAX5yiYg5ZZCCIIKtV-23eFP6hR95SiPmOLTtgFpbCzudzX2RxFAekO-pAy41iMx")`
               }}
          >
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl md:font-black md:leading-tight md:tracking-[-0.033em]">
                Conectando su viaje de atención médica sin problemas con MediLink
              </h1>
              <h2 className="text-white text-sm font-normal leading-normal md:text-base md:font-normal md:leading-normal">
                MediLink es una plataforma revolucionaria que proporciona interoperabilidad perfecta con HCE, 
                intercambio seguro de datos y colaboración en tiempo real entre pacientes y profesionales médicos.
              </h2>
            </div>
            <div className="flex-wrap gap-3 flex">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 md:h-12 md:px-5 text-sm md:text-base font-bold rounded-lg">
                Regístrese para una Demostración
              </Button>
              <Button 
                variant="secondary"
                className="bg-white/80 hover:bg-white/90 text-gray-900 h-10 px-4 md:h-12 md:px-5 text-sm md:text-base font-bold rounded-lg"
              >
                Aprende más
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <h2 
        className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 md:px-8 pb-3 pt-8"
        style={{ 
          color: '#111618 !important',
          WebkitTextFillColor: '#111618 !important',
          opacity: '1 !important'
        }}
      >
        Funcionalidades Principales
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 py-8">
        {mainFeatures.map((feature, index) => (
          <div key={index} className="p-8 rounded-lg bg-white shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">
                  {feature.icon}
                </span>
              </div>
            </div>
            <h3 
              className="text-lg font-semibold mb-3 text-center"
              style={{ 
                color: '#111618 !important',
                WebkitTextFillColor: '#111618 !important',
                opacity: '1 !important'
              }}
            >
              {feature.title}
            </h3>
            <p 
              className="text-sm text-center leading-relaxed"
              style={{ 
                color: '#617c89 !important',
                WebkitTextFillColor: '#617c89 !important',
                opacity: '1 !important'
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <h2 
        className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 md:px-8 pb-3 pt-10"
        style={{ 
          color: '#111618 !important',
          WebkitTextFillColor: '#111618 !important',
          opacity: '1 !important'
        }}
      >
        Cómo Funciona MediLink
      </h2>
      
      <div className="px-4 md:px-8 py-6">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center space-x-4 flex-wrap">
              <div className="bg-white rounded-full p-4 shadow-md">
                <span className="text-2xl">🏥</span>
              </div>
              <div className="text-blue-600 text-2xl">→</div>
              <div className="bg-white rounded-full p-4 shadow-md">
                <span className="text-2xl">💻</span>
              </div>
              <div className="text-blue-600 text-2xl">→</div>
              <div className="bg-white rounded-full p-4 shadow-md">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <p 
                className="text-lg leading-relaxed mb-4"
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                <strong>Portal Web de Coordinación de Citas y Teleasistencia</strong>
              </p>
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ 
                  color: '#617c89 !important',
                  WebkitTextFillColor: '#617c89 !important',
                  opacity: '1 !important'
                }}
              >
                MediLink conecta clínicas, pacientes y profesionales médicos en una plataforma unificada que gestiona 
                citas presenciales y virtuales, historiales médicos y comunicación segura. Eliminamos la fragmentación 
                de datos y los errores de agenda que afectan a los centros de salud actuales.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 text-xl">📅</span>
                  </div>
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      color: '#111618 !important',
                      WebkitTextFillColor: '#111618 !important',
                      opacity: '1 !important'
                    }}
                  >
                    Gestión Inteligente
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    Citas presenciales y virtuales con disponibilidad en tiempo real
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">🔒</span>
                  </div>
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      color: '#111618 !important',
                      WebkitTextFillColor: '#111618 !important',
                      opacity: '1 !important'
                    }}
                  >
                    Seguridad Avanzada
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    Integración FHIR y autenticación multifactor para proteger datos médicos
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 text-xl">📱</span>
                  </div>
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      color: '#111618 !important',
                      WebkitTextFillColor: '#111618 !important',
                      opacity: '1 !important'
                    }}
                  >
                    Teleasistencia
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    Teleconsultas con video, chat seguro y recordatorios automáticos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 py-10">
        {/* Patient Benefits */}
        <div>
          <h3 
            className="text-xl font-bold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            Beneficios para Pacientes
          </h3>
          <ul className="space-y-3">
            {patientBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <div>
                  <span 
                    className="font-semibold"
                    style={{ 
                      color: '#111618 !important',
                      WebkitTextFillColor: '#111618 !important',
                      opacity: '1 !important'
                    }}
                  >
                    {benefit.title}:
                  </span>
                  <span 
                    className="ml-1"
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    {benefit.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Professional Benefits */}
        <div>
          <h3 
            className="text-xl font-bold mb-4"
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            Beneficios para Profesionales
          </h3>
          <ul className="space-y-3">
            {professionalBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <div>
                  <span 
                    className="font-semibold"
                    style={{ 
                      color: '#111618 !important',
                      WebkitTextFillColor: '#111618 !important',
                      opacity: '1 !important'
                    }}
                  >
                    {benefit.title}:
                  </span>
                  <span 
                    className="ml-1"
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    {benefit.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg p-8 my-10 mx-4 md:mx-8 text-center shadow-lg border border-gray-100">
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ 
            color: '#111618 !important',
            WebkitTextFillColor: '#111618 !important',
            opacity: '1 !important'
          }}
        >
          ¿Listo para experimentar la integración perfecta?
        </h2>
        <p 
          className="mb-6"
          style={{ 
            color: '#617c89 !important',
            WebkitTextFillColor: '#617c89 !important',
            opacity: '1 !important'
          }}
        >
          Desbloquee el poder de la atención médica conectada y revolucione la forma en que gestiona la información del paciente.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-5 text-base font-bold rounded-lg">
            Regístrese para una Demostración
          </Button>
          <Button 
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100 text-gray-900 h-12 px-5 text-base font-bold rounded-lg border border-gray-300"
          >
            Lea nuestras preguntas frecuentes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPageSection;