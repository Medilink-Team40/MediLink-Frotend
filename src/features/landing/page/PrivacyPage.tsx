import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrivacySection from '../components/PrivacySection';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Header />
      <PrivacySection />
      <Footer />
    </div>
  );
};

export default PrivacyPage;