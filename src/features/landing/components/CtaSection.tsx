// src/features/landing/components/CtaSection.tsx
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
          ¿Listo para comenzar?
        </h2>
        <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
          Únete a miles de personas que ya están cuidando su salud con MediLink.
        </p>
        <Link to="/register">
          <Button 
            size="lg" 
            className="text-base sm:text-lg bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Crear cuenta gratuita
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CtaSection