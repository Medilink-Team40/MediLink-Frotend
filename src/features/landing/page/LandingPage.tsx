// src/features/landing/page/LandingPage.tsx

import Header from '@/features/landing/components/Header';
import HeroSection from '@/features/landing/components/HeroSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import HowItWorks from '@/features/landing/components/HowItWorks';
import Testimonials from '@/features/landing/components/Testimonials';
import CtaSection from '@/features/landing/components/CtaSection';
import Footer from '@/features/landing/components/Footer';

const LandingPage = () => {
  

  return (
    <div className="flex min-h-screen flex-col">
      
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