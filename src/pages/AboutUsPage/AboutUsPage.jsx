import React from 'react';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import ValuesSection from './components/ValuesSection';
import TeamSection from './components/TeamSection';
import CTASection from '../PlatformPage/components/CTASection';

const AboutUsPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </main>
  );
};

export default AboutUsPage;
