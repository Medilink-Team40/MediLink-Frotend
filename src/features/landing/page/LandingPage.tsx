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
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

const { isAuthenticated, loading } = useAuth();

  const navigate = useNavigate();

 useEffect(() => {
    // Si la autenticación no está cargando y el usuario está autenticado...
    if (!loading && isAuthenticated) {
      // ...redirígelo al dashboard.
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]); // El efecto se ejecuta si estos valores cambian

  // Mientras carga la autenticación o si ya se va a redirigir, no muestra nada
  if (loading || isAuthenticated) {
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