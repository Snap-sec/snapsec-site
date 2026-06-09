import React from 'react';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import VulnerabilitiesSection from './components/VulnerabilitiesSection';
import ContributionsSection from './components/ContributionsSection';
import ResearchSection from './components/ResearchSection';
import DemoReportSection from './components/DemoReportSection';
import GlobalPresenceSection from './components/GlobalPresenceSection';
import TeamSection from './components/TeamSection';
import CTASection from '../PlatformPage/components/CTASection';

const OurWorkPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <HeroSection />
      <MissionSection />
      <ContributionsSection />


      <VulnerabilitiesSection />
      <DemoReportSection />
      <GlobalPresenceSection />

      <ResearchSection />
      <TeamSection />
      <CTASection isServicesPage={true} />
    </main>
  );
};

export default OurWorkPage;
