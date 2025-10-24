// src/features/landing/page/LandingPage.tsx

import Header from '@/features/landing/components/Header';
import HeroSection from '@/features/landing/components/HeroSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import HowItWorks from '@/features/landing/components/HowItWorks';
import Testimonials from '@/features/landing/components/Testimonials';
import CtaSection from '@/features/landing/components/CtaSection';
import Footer from '@/features/landing/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LandingPage = () => {

const { isAuthenticated, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

 // Eliminamos la redirección automática al dashboard para que la landing sea
 // la página por defecto incluso cuando el usuario esté autenticado.
 // Mostrar solo el estado de carga mientras se inicializa la autenticación.
  if (loading) {
    return <div>Cargando...</div>;
  }
 
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;