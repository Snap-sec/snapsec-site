import React from 'react';
import HeroSection from '../PlatformPage/components/HeroSection';
import ProcessSection from '../PlatformPage/components/ProcessSection';
import CTASection from '../PlatformPage/components/CTASection';

const MethodologyPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <HeroSection isServicesPage={true} />
      <ProcessSection />
      <CTASection />
    </main>
  );
};

export default MethodologyPage;
