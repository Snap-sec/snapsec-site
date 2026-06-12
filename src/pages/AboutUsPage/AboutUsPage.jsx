import React from 'react';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import ValuesSection from './components/ValuesSection';
import ContributionsSection from './components/ContributionsSection';
import GlobalPresenceSection from './components/GlobalPresenceSection';
import TeamSection from './components/TeamSection';
import CTASection from '../PlatformPage/components/CTASection';
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';

const AboutUsPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="About Snapsec — Our Mission, Team & Cybersecurity Expertise"
        description="Snapsec is on a mission to map, scan, and secure every enterprise asset. Learn about our team, values, and commitment to application security excellence."
        canonicalUrl="https://snapsec.co/about-us"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'About Us', url: 'https://snapsec.co/about-us' },
      ]} />
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

