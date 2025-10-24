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
      <section className="py-20 bg-blue-50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default Testimonials