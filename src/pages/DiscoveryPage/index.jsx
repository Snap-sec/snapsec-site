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

const moduleData = {
  asm: {
    label: 'ASM',
    name: 'Attack Surface Management',
    tagline: 'Continuously discover every internet-facing asset and monitor your external exposure in real time.',
    badge: 'ATTACK SURFACE',
    badgeBg: '#E6C5F7',
    badgeColor: '#000',
    accentColor: '#7C3AED',
  },
  aim: {
    label: 'AIM',
    name: 'Asset Intelligence Module',
    tagline: 'Automatically classify and enrich every asset with ownership, technology, and relationship data.',
    badge: 'ASSET INTELLIGENCE',
    badgeBg: '#D9E4FF',
    badgeColor: '#000',
    accentColor: '#004DFF',
  },
  was: {
    label: 'WAS',
    name: 'Web Application Scanner',
    tagline: 'Automated dynamic DAST scanning for web apps and APIs — detect OWASP Top 10 and beyond.',
    badge: 'WEB APPLICATION SCANNING',
    badgeBg: '#FEF3C7',
    badgeColor: '#000',
    accentColor: '#D97706',
  },
  vs: {
    label: 'VS',
    name: 'Vulnerability Scanner',
    tagline: 'Detect vulnerabilities across network infrastructure with continuous, automated scanning.',
    badge: 'VULNERABILITY SCANNING',
    badgeBg: '#D1FAE5',
    badgeColor: '#000',
    accentColor: '#059669',
  },
  vm: {
    label: 'VM',
    name: 'Vulnerability Management',
    tagline: 'Centralized tracking, risk-based prioritization, and remediation workflows at scale.',
    badge: 'VULNERABILITY MANAGEMENT',
    badgeBg: '#004DFF',
    badgeColor: '#FFF',
    accentColor: '#004DFF',
  },
};

export default function DiscoveryPage() {
  const { moduleSlug } = useParams();
  const slug = (moduleSlug || 'asm').toLowerCase();
  const mod = moduleSlug ? moduleData[slug] : null;

  const showFeatures = slug === 'asm' || slug === 'vs' || slug === 'was' || slug === 'aim' || slug === 'vm';

  return (
    <>
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

