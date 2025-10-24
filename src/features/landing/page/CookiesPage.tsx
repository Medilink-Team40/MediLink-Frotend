import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookiesSection from '../components/CookiesSection';

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Header />
      <CookiesSection />
      <Footer />
    </div>
  );
};

export default CookiesPage;