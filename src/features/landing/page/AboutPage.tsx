import Header from '@/features/landing/components/Header';
import AboutSection from '@/features/landing/components/AboutSection';
import Footer from '@/features/landing/components/Footer';

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;