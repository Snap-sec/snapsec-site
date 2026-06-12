import { useParams } from 'react-router-dom';
import HeroSection from './components/HeroSection.jsx';
import ChallengeSection from './components/ChallengeSection.jsx';
import SolutionSection from './components/SolutionSection.jsx';
import QuoteSection from './components/QuoteSection.jsx';
import Feature1 from './components/Feature1.jsx';
import Feature2 from './components/Feature2.jsx';
import Feature3 from './components/Feature3.jsx';
import FinalBenefits from './components/FinalBenefits.jsx';
import CTABannerSection from './components/CTABannerSection.jsx';
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, SoftwareAppSchema } from '../../components/StructuredData';

const moduleData = {
  asm: {
    label: 'ASM',
    name: 'Attack Surface Management',
    tagline: 'Continuously discover every internet-facing asset and monitor your external exposure in real time.',
    badge: 'Attack Surface Management',
    badgeBg: '#E6C5F7',
    badgeColor: '#000',
    accentColor: '#7C3AED',
  },
  aim: {
    label: 'AIM',
    name: 'Asset Inventory Management Module',
    tagline: 'Automatically classify and enrich every asset with ownership, technology, and relationship data.',
    badge: 'Asset Inventory Management',
    badgeBg: '#D9E4FF',
    badgeColor: '#000',
    accentColor: '#004DFF',
  },
  was: {
    label: 'WAS',
    name: 'Web Application Scanner',
    tagline: 'Automated dynamic DAST scanning for web apps and APIs — detect OWASP Top 10 and beyond.',
    badge: 'Web Application Scanning',
    badgeBg: '#FEF3C7',
    badgeColor: '#000',
    accentColor: '#D97706',
  },
  vs: {
    label: 'VS',
    name: 'Vulnerability Scanner',
    tagline: 'Detect vulnerabilities across network infrastructure with continuous, automated scanning.',
    badge: 'Vulnerability Scanning',
    badgeBg: '#D1FAE5',
    badgeColor: '#000',
    accentColor: '#059669',
  },
  vm: {
    label: 'VM',
    name: 'Vulnerability Management',
    tagline: 'Centralized tracking, risk-based prioritization, and remediation workflows at scale.',
    badge: 'Vulnerability Management',
    badgeBg: '#004DFF',
    badgeColor: '#FFF',
    accentColor: '#004DFF',
  },
};

const seoData = {
  asm: {
    title: 'Attack Surface Management (ASM) — External Asset Discovery & Monitoring | Snapsec',
    description: 'Continuously discover and monitor every internet-facing asset. Snapsec\'s ASM module maps subdomains, IPs, ports, and cloud services to identify shadow IT and external exposures in real time.',
    softwareName: 'Snapsec ASM — Attack Surface Management',
  },
  aim: {
    title: 'Asset Inventory Management (AIM) — Automated Asset Classification | Snapsec',
    description: 'Automatically classify, enrich, and manage every asset with ownership, technology, and relationship data. Connects AWS, GCP, Azure, and Kubernetes for unified visibility.',
    softwareName: 'Snapsec AIM — Asset Inventory Management',
  },
  was: {
    title: 'Web Application Scanner (WAS) — Automated DAST & API Security Testing | Snapsec',
    description: 'Automated dynamic application security testing (DAST) for web apps and APIs. Detect OWASP Top 10 vulnerabilities, injection flaws, broken auth, and SSRF with continuous scanning.',
    softwareName: 'Snapsec WAS — Web Application Scanner',
  },
  vs: {
    title: 'Vulnerability Scanner (VS) — Network & Infrastructure Security Scanning | Snapsec',
    description: 'Continuous network vulnerability scanning for infrastructure, ports, and services. Deploy scanner agents to detect CVEs, misconfigurations, and exposed services across your network.',
    softwareName: 'Snapsec VS — Vulnerability Scanner',
  },
  vm: {
    title: 'Vulnerability Management (VM) — Risk-Based Prioritization & Remediation | Snapsec',
    description: 'Centralized vulnerability management with risk-based prioritization, SLA tracking, and automated remediation workflows. Aggregate findings from Qualys, Snyk, Trivy, and more.',
    softwareName: 'Snapsec VM — Vulnerability Management',
  },
};

export default function DiscoveryPage() {
  const { moduleSlug } = useParams();
  const slug = (moduleSlug || 'asm').toLowerCase();
  const mod = moduleSlug ? moduleData[slug] : null;
  const seo = seoData[slug] || seoData.asm;

  const showFeatures = slug === 'asm' || slug === 'vs' || slug === 'was' || slug === 'aim' || slug === 'vm';

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonicalUrl={`https://snapsec.co/discovery/${slug}`}
      />
      <OrganizationSchema />
      <SoftwareAppSchema
        name={seo.softwareName}
        description={seo.description}
        url={`https://snapsec.co/discovery/${slug}`}
        category="SecurityApplication"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: mod?.name || 'Module', url: `https://snapsec.co/discovery/${slug}` },
      ]} />
      <HeroSection moduleSlug={slug} mod={mod} />
      <ChallengeSection moduleSlug={slug} mod={mod} />
      <SolutionSection moduleSlug={slug} mod={mod} />
      <QuoteSection moduleSlug={slug} mod={mod} />
      {showFeatures && (
        <>
          <Feature1 moduleSlug={slug} />
          <Feature2 moduleSlug={slug} />
          <Feature3 moduleSlug={slug} />
          <FinalBenefits moduleSlug={slug} />
        </>
      )}
      <CTABannerSection moduleSlug={slug} />
    </>
  );
}


