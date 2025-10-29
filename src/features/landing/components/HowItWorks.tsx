
const steps = [
    {
      number: "1",
      title: "Crea tu cuenta",
      description: "Regístrate en minutos de forma gratuita"
    },
    {
      number: "2",
      title: "Encuentra tu médico",
      description: "Busca por especialidad, ubicación o disponibilidad"
    },
    {
      number: "3",
      title: "Agenda tu cita",
      description: "Selecciona el horario que mejor te convenga"
    }
  ];
  
  const HowItWorks = () => {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            Cómo funciona
          </h2>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 ${index !== steps.length - 1 ? 'mb-8 sm:mb-12' : ''}`}>
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0 mx-auto sm:mx-0">
                  {step.number}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default HowItWorks