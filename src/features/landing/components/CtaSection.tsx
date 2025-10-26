// src/features/landing/components/CtaSection.tsx
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-20 bg-linear-to-r from-blue-600 to-blue-800 text-white">
      <div className="container px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para comenzar?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Únete a miles de personas que ya están cuidando su salud con MediLink.
        </p>
        <Button size="lg" className="text-lg bg-white text-blue-600 hover:bg-gray-100">
          <Link to="/registro">Crear cuenta gratuita</Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection