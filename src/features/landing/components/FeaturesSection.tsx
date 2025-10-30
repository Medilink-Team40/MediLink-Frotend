
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            Por qué elegir MediLink
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center group"
              >
                <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default FeaturesSection