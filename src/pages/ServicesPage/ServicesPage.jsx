import React from 'react';
import HeroSection from '../PlatformPage/components/HeroSection';
import BenefitsSection from '../PlatformPage/components/BenefitsSection';
import CTASection from '../PlatformPage/components/CTASection';
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQSchema } from '../../components/StructuredData';

const servicesFAQ = [
  { question: 'What cybersecurity services does Snapsec offer?', answer: 'Snapsec offers penetration testing, vulnerability assessment, attack surface management, web application scanning, API security testing, and continuous security monitoring services for enterprises.' },
  { question: 'Is Snapsec testing manual or automated?', answer: 'Snapsec uses a hybrid approach combining automated scanning for broad coverage with expert manual penetration testing for complex business logic flaws and access control vulnerabilities.' },
  { question: 'How long does a penetration test take?', answer: 'A typical web application assessment takes 1-3 weeks. Comprehensive infrastructure tests may run 2-4 weeks. Snapsec provides real-time streaming results throughout the engagement.' },
  { question: 'Do you provide remediation support?', answer: 'Yes, Snapsec provides detailed remediation guidance, developer-friendly code recommendations, architectural advice, and unlimited retests to verify fixes are correctly implemented.' },
  { question: 'What industries do you serve?', answer: 'Snapsec serves fintech, healthcare, e-commerce, SaaS, government, and enterprise organizations across 10+ industries with tailored security testing approaches.' },
];

const ServicesPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="Cybersecurity Services — Penetration Testing & Security Assessments | Snapsec"
        description="Expert-led penetration testing, vulnerability assessments, and security consulting services. Our 10-phase methodology combines automated scanning with manual expert analysis."
        canonicalUrl="https://snapsec.co/services"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Services', url: 'https://snapsec.co/services' },
      ]} />
      <FAQSchema questions={servicesFAQ} />
      <HeroSection isServicesPage={true} />
      <BenefitsSection isServicesPage={true} />
      <CTASection isServicesPage={true} />
    </main>
  );
};

export default ServicesPage;

