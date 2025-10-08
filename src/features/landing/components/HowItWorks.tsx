
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
      <section className="py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Cómo funciona
          </h2>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start mb-8">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default HowItWorks