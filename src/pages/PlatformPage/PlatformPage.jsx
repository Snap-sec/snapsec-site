import React from 'react';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import ProcessSection from './components/ProcessSection';
import CTASection from './components/CTASection';
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, SoftwareAppSchema, BreadcrumbSchema } from '../../components/StructuredData';

const PlatformPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="Platform — Centralized AppSec & Vulnerability Management | Snapsec"
        description="Snapsec's platform centralizes attack surface management, vulnerability scanning, asset inventory, and security intelligence. One unified dashboard for your entire security program."
        canonicalUrl="https://snapsec.co/platform"
      />
      <OrganizationSchema />
      <SoftwareAppSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Platform', url: 'https://snapsec.co/platform' },
      ]} />
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <CTASection />
    </main>
  );
};

export default PlatformPage;

