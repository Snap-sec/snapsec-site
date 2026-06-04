import React from 'react';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import ValuesSection from './components/ValuesSection';
import ContributionsSection from './components/ContributionsSection';
import GlobalPresenceSection from './components/GlobalPresenceSection';
import TeamSection from './components/TeamSection';
import CTASection from '../PlatformPage/components/CTASection';

const AboutUsPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <ContributionsSection />
      <GlobalPresenceSection />
      <TeamSection />
      <CTASection />
    </main>
  );
};

export default AboutUsPage;
