import HeroSection from './components/HeroSection.jsx';
import LogosSection from './components/LogosSection.jsx';
import ExistSection from './components/ExistSection.jsx';
import AiEraSection from './components/AiEraSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import TestimonialSection from './components/TestimonialSection.jsx';
import CTASection from './components/CTASection.jsx';
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Snapsec — Centralized Application Security Platform | Attack Surface & Vulnerability Management"
        description="Snapsec unifies attack surface management, vulnerability scanning, and security intelligence into one platform. Discover, prioritize, and remediate risks across your entire digital ecosystem."
        canonicalUrl="https://snapsec.co/"
        ogTitle="Snapsec — See Every Asset. Every Exposure. Every Finding."
        ogDescription="Unify discovery, vulnerability management, intelligence, and protection across your entire ecosystem with Snapsec's centralized AppSec platform."
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://snapsec.co/' }]} />
      <HeroSection />
      <LogosSection />
      <ExistSection />
      <AiEraSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}

