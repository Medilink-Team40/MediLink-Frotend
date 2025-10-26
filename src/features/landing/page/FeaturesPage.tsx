import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturesPageSection from '../components/FeaturesPageSection';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Header />
      <FeaturesPageSection />
      <Footer />
    </div>
  );
};

export default FeaturesPage;