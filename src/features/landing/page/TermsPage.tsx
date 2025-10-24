import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TermsSection from '../components/TermsSection';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Header />
      <TermsSection />
      <Footer />
    </div>
  );
};

export default TermsPage;