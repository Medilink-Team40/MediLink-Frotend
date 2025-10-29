// src/features/landing/components/Testimonials.tsx
const testimonials = [
    {
      quote: "Encontré un médico especialista en minutos. ¡Excelente servicio!",
      author: "María G.",
      role: "Paciente"
    },
    {
      quote: "La mejor plataforma para gestionar mis citas médicas de forma sencilla.",
      author: "Carlos M.",
      role: "Paciente"
    }
  ];
  
  const Testimonials = () => {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-base sm:text-lg italic mb-4 sm:mb-6 text-gray-700 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default Testimonials