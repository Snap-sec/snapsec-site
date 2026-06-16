import React from 'react';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import VulnerabilitiesSection from './components/VulnerabilitiesSection';
import ContributionsSection from './components/ContributionsSection';
import ResearchSection from './components/ResearchSection';
import DemoReportSection from './components/DemoReportSection';
import GlobalPresenceSection from './components/GlobalPresenceSection';
import RedTeamLeadersSection from './components/RedTeamLeadersSection';
import CTASection from '../PlatformPage/components/CTASection';
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';

const OurWorkPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="Our Work — Penetration Testing Case Studies & Research | Snapsec"
        description="Explore Snapsec's track record: 500+ security assessments, 150+ critical bugs patched across 10+ industries. View case studies, research, and sample pentest reports."
        canonicalUrl="https://snapsec.co/our-work"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Our Work', url: 'https://snapsec.co/our-work' },
      ]} />
      <HeroSection />
      <MissionSection />
      <ContributionsSection />


      <VulnerabilitiesSection />
      <DemoReportSection />
      <GlobalPresenceSection />

      <ResearchSection />
      <RedTeamLeadersSection />
      <CTASection isServicesPage={true} />
    </main>
  );
};

export default OurWorkPage;

