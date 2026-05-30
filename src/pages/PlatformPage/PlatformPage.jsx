import React from 'react';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import ProcessSection from './components/ProcessSection';
import CTASection from './components/CTASection';

const PlatformPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <CTASection />
    </main>
  );
};

export default PlatformPage;
