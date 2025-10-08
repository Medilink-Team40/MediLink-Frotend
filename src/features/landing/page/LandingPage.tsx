// src/features/landing/page/LandingPage.tsx
import { useEffect } from 'react';
import Header from '@/features/landing/components/Header';
import HeroSection from '@/features/landing/components/HeroSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import HowItWorks from '@/features/landing/components/HowItWorks';
import Testimonials from '@/features/landing/components/Testimonials';
import CtaSection from '@/features/landing/components/CtaSection';
import Footer from '@/features/landing/components/Footer';

const LandingPage = () => {
  // Efecto para animaciones al hacer scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
          element.classList.add('opacity-100', 'translate-y-0');
          element.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Ejecutar una vez al cargar
    animateOnScroll();

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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