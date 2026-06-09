import React from 'react';
import HeroSection from '../PlatformPage/components/HeroSection';
import BenefitsSection from '../PlatformPage/components/BenefitsSection';
import CTASection from '../PlatformPage/components/CTASection';

const ServicesPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <HeroSection isServicesPage={true} />
      <BenefitsSection isServicesPage={true} />
      <CTASection isServicesPage={true} />
    </main>
  );
};

export default ServicesPage;
