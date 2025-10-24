
const features = [
    {
      icon: "⏱️",
      title: "Citas Rápidas",
      description: "Agenda en minutos con especialistas verificados"
    },
    {
      icon: "👨‍⚕️",
      title: "Médicos Certificados",
      description: "Profesionales de la salud altamente calificados"
    },
    {
      icon: "📱",
      title: "Plataforma Fácil",
      description: "Interfaz intuitiva para todas las edades"
    }
  ];
  
  const FeaturesSection = () => {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por qué elegir MediLink
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default FeaturesSection