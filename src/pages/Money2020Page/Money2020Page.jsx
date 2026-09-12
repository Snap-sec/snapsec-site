import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../PlatformPage/components/HeroSection';
import CTASection from '../PlatformPage/components/CTASection';
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQSchema } from '../../components/StructuredData';

const SNAPSEC_PRODUCTS = [
  {
    title: 'ASM — Attack Surface Management',
    tagline: 'Continuous External Asset Discovery',
    badge: 'PLATFORM MODULE',
    desc: 'Discover internet-facing assets and detect shadow IT across Saudi Arabia.',
    link: '/discovery/asm',
    actionText: 'Explore ASM',
    highlights: [
      'Continuous Internet-Facing Asset Discovery',
      'Shadow IT & Rogue Subdomain Detection',
      '24/7 Real-Time Exposure & Leak Alerts',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'AIM — Asset Inventory Module',
    tagline: 'Automated System of Record',
    badge: 'PLATFORM MODULE',
    desc: 'Unified asset inventory and ownership catalog required for SAMA compliance.',
    link: '/discovery/aim',
    actionText: 'Explore AIM',
    highlights: [
      'Automated Asset Discovery & Classification',
      'Engineering Team Ownership Mapping',
      'SAMA Audit-Ready Inventory Exports',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: 'WAS — Web Application Scanner',
    tagline: 'Dynamic DAST for Apps & APIs',
    badge: 'PLATFORM MODULE',
    desc: 'Automated dynamic DAST scanning for web applications and active APIs.',
    link: '/discovery/was',
    actionText: 'Explore WAS',
    highlights: [
      'Dynamic Web Application Scanning',
      'Continuous API Endpoint Fuzzing',
      'Zero False-Positive Verification Engine',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'VS — Vulnerability Scanner',
    tagline: 'Network & Infrastructure Scanning',
    badge: 'PLATFORM MODULE',
    desc: 'Continuous network, port, and infrastructure vulnerability scanning.',
    link: '/discovery/vs',
    actionText: 'Explore VS',
    highlights: [
      'CVE Vulnerability & Zero-Day Tracking',
      'Port, Service & Network Boundary Auditing',
      'Cloud Configuration Baseline Checks',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'VM — Vulnerability Management',
    tagline: 'Unified Triage & Remediation',
    badge: 'PLATFORM MODULE',
    desc: 'Centralized triage and remediation tracking integrated with Jira and CI/CD.',
    link: '/discovery/vm',
    actionText: 'Explore VM',
    highlights: [
      'Risk-Based Exploitability Scoring',
      'Remediation SLA & Ownership Tracking',
      'Direct Jira, GitHub & CI/CD Integrations',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'SAST — AI-Driven Code Scanner',
    tagline: 'Static Application Security Testing',
    badge: 'PLATFORM MODULE',
    desc: 'AI-powered static analysis to detect vulnerabilities and secrets in source code.',
    link: '/contact-us?query=SAST%20-%20AI%20Driven%20Code%20Scanner',
    actionText: 'Explore SAST',
    highlights: [
      'AI-Assisted Code Vulnerability Detection',
      'Hardcoded Secrets & Credential Scanning',
      'Automated Pull Request Security Reviews',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" />
      </svg>
    ),
  },
  {
    title: 'SCA — Software Composition Analysis',
    tagline: 'Open-Source & Supply Chain Security',
    badge: 'PLATFORM MODULE',
    desc: 'Identify vulnerabilities and license risks across open-source dependencies.',
    link: '/contact-us?query=SCA%20-%20Software%20Composition%20Analysis',
    actionText: 'Explore SCA',
    highlights: [
      'Automated Dependency & CVE Tracking',
      'Open-Source License Compliance Checks',
      'Software Bill of Materials (SBOM) Export',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Cloud Security Configuration Assessments',
    tagline: 'Continuous Cloud Posture & Compliance',
    badge: 'PLATFORM MODULE',
    desc: 'Audit AWS, Azure, GCP, and KSA cloud configurations against security benchmarks.',
    link: '/contact-us?query=Cloud%20Security%20Configuration%20Assessments',
    actionText: 'Explore Cloud Security',
    highlights: [
      'Automated CIS Benchmark Audits',
      'KSA Cloud Data Residency Validation',
      'IAM Misconfiguration & Drift Detection',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <path d="m9 13 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'AI Web, Mobile, API & Red Teaming Platform',
    tagline: 'Autonomous Offensive Security Platform',
    badge: 'PLATFORM MODULE',
    desc: 'Autonomous pentesting platform continuously simulating real-world attack vectors.',
    link: '/contact-us?query=AI%20Web%20Mobile%20API%20Red%20Teaming%20Pentesting%20Platform',
    actionText: 'Explore AI Pentest',
    highlights: [
      'Automated Web, Mobile & API Attacks',
      'Autonomous Red Teaming Simulations',
      'Real-Time Streaming Proof-of-Concepts',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const SNAPSEC_SERVICES = [
  {
    title: 'Web & Mobile Penetration Testing',
    tagline: 'Deep Offensive Security for FinTech Apps',
    badge: 'VAPT SERVICE',
    desc: 'Manual and automated penetration testing for fintech applications and APIs.',
    link: '/contact-us?query=Web%20and%20Mobile%20Penetration%20Testing',
    actionText: 'Explore Pentest',
    highlights: [
      'Deep Business Logic & Authentication Flaws',
      'iOS & Android Binary & API Testing',
      '100% Free 30-Day Retesting Guarantee',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    title: 'Open Banking & API Security Testing',
    tagline: 'SAMA Open Banking & FAPI Compliance',
    badge: 'FINTECH SPECIALTY',
    desc: 'Offensive security testing for SAMA Open Banking and FAPI 1.0 standards.',
    link: '/contact-us?query=Open%20Banking%20Security%20Testing',
    actionText: 'Explore API Testing',
    highlights: [
      'FAPI 1.0 Advanced Security Profile Audit',
      'OAuth2 Token & State Tampering Testing',
      'Account Information & Payment Initiation Checks',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" />
        <line x1="12" y1="1" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="1" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="23" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Cloud & Infrastructure Penetration Testing',
    tagline: 'AWS, Azure, GCP & KSA Data Sovereignty',
    badge: 'INFRASTRUCTURE',
    desc: 'Cloud configuration, IAM, and KSA data sovereignty security audits.',
    link: '/contact-us?query=Cloud%20and%20Infrastructure%20Testing',
    actionText: 'Explore Cloud',
    highlights: [
      'In-Kingdom Data Residency & Sovereignty Check',
      'IAM Role & Privilege Escalation Audit',
      'Container & Kubernetes Perimeter Testing',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    title: 'SAMA CSF & NCA ECC Readiness',
    tagline: 'Audit Preparation for Saudi FinTechs',
    badge: 'COMPLIANCE',
    desc: 'Gap assessment and auditor-accepted roadmaps for SAMA licensing.',
    link: '/contact-us?query=SAMA%20CSF%20and%20NCA%20Compliance',
    actionText: 'Explore Compliance',
    highlights: [
      'Full SAMA CSF & NCA ECC Control Gap Matrix',
      'Formal SAMA-Accepted Attestation Report',
      'Auditor-Ready Compliance Submission Package',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Continuous Offensive Testing & Retesting',
    tagline: 'Year-Round Offensive Security Retainer',
    badge: 'RETAINER',
    desc: 'Year-round proactive pentesting and ASM with guaranteed <24h retesting.',
    link: '/contact-us?query=Continuous%20Offensive%20Testing',
    actionText: 'Explore Retainer',
    highlights: [
      'Guaranteed <24h Retesting SLA for Fixes',
      'Dedicated Offensive Security Architect',
      'Year-Round Attack Simulation & Testing',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    ),
  },
  {
    title: 'Secure Code Review (SAST & Manual)',
    tagline: 'Source Code Vulnerability Discovery',
    badge: 'CODE AUDIT',
    desc: 'Source code inspection to eliminate critical logic flaws and secrets.',
    link: '/contact-us?query=Secure%20Code%20Review',
    actionText: 'Explore Code Review',
    highlights: [
      'Manual White-Box Logic & Auth Flaw Inspection',
      'Actionable Remediation Code Snippets',
      'Developer Security Walkthrough & Briefing',
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const FINTECH_CORE_TIERS = [
  {
    tag: 'STARTUP',
    title: 'For Startups',
    tagline: 'Build Secure from Day One',
    desc: 'Build on compliant foundations. We help early-stage Saudi fintechs establish essential SAMA CSF controls, enforce in-Kingdom data residency, and eliminate critical vulnerabilities before handling customer funds.',
    query: 'Startup - SAMA Compliance from Day One',
    deliverables: [
      'SAMA CSF Baseline Architecture & Threat Modeling',
      'KSA Cloud Data Residency & Encryption Audit (SAMA Cloud Rules)',
      'Pre-Launch Web, Mobile & Backend API Penetration Testing',
      'Payment Rail, Webhook & Transaction Logic Integrity Testing',
      'Identity, Privileged Access Management (PAM) & MFA Enforcement',
      'SAMA-Formatted Initial Security Assessment & Fix Roadmap',
    ],
    ctaAction: 'Get Started as a Startup',
    isHighlight: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    tag: 'SANDBOX',
    title: 'For Sandbox',
    tagline: 'Prepare for SAMA Licensing & Launch',
    desc: 'Clearing SAMA audits requires zero open critical vulnerabilities and full control mapping. We guide you through every regulatory checkpoint until your license is approved.',
    query: 'Sandbox - Prepare for SAMA licensing and launch',
    deliverables: [
      'Full SAMA CSF & NCA ECC Control Gap Assessment',
      'Deep Manual Penetration Testing on Web, Mobile & Core APIs',
      'SAMA Open Banking Framework (FAPI 1.0 Advanced) Testing',
      'Payment Rail, Fast Transfer & Logic Tampering Defense',
      'Formal SAMA-accepted Audit Report & Attestation Letter',
      '100% Free Unlimited Retests until all high risks are closed',
    ],
    ctaAction: 'Prepare for SAMA Licensing',
    isHighlight: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    tag: 'ENTERPRISE',
    title: 'For Enterprises',
    tagline: 'Maintain Continuous SAMA Readiness',
    desc: 'Compliance is not a one-time audit. As your transaction volume scales, we deliver continuous offensive testing, perimeter monitoring, and developer pipeline integrations.',
    query: 'Enterprise - Maintain continuous SAMA cybersecurity readiness',
    deliverables: [
      'Year-round Continuous Penetration Testing & AI Red-Teaming',
      '24/7 Attack Surface Management (ASM) across Saudi Arabia',
      'DevSecOps Pipeline Automation (GitHub Actions, GitLab, CI/CD)',
      'KSA Cloud Data Sovereignty & Multi-Region Audit (AWS / Oracle KSA)',
      'Dedicated Offensive Security Architect & <24h Retest SLA',
      'Executive, Board & Auditor-ready compliance scorecards',
    ],
    ctaAction: 'Scale Securely with Enterprise',
    isHighlight: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    ),
  },
];

const Money2020Page = () => {
  const [activeTab, setActiveTab] = useState('products');

  const featureCards = (
    <div className="flex flex-col items-center w-full gap-8 pt-16 sm:pt-20 lg:pt-24">
      {/* Header section above cards */}
      <div className="flex flex-col items-center text-center w-full max-w-[790px] mx-auto gap-3">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-[#111111] tracking-[-0.02em] leading-tight w-full">
          SAMA Cybersecurity Readiness Programs
        </h2>
        <p className="text-[14px] sm:text-[16px] text-[#444444] leading-relaxed w-full max-w-[640px] mx-auto">
          Tailored security testing and compliance roadmaps for every stage of your SAMA journey.
        </p>
      </div>

      <div className="section-platform-benefits__cards grid grid-cols-1 gap-4 md:grid-cols-3 w-full items-stretch">
      {FINTECH_CORE_TIERS.map((tier) => {
        const link = `/contact-us?query=${encodeURIComponent(tier.query + ' - Money2020')}`;
        return (
          <Link
            key={tier.tag}
            to={link}
            className={`group section-platform-benefits__card flex cursor-pointer flex-col justify-between items-start rounded-12 border p-6 lg:p-7 text-left transition-all duration-200 shadow-xs relative min-h-[550px] lg:min-h-[580px] ${
              tier.isHighlight
                ? 'border-gray-800 bg-[#FAFAFA] hover:border-black hover:bg-white'
                : 'border-gray-300 bg-white hover:border-gray-800 hover:bg-[#FAFBFB]'
            }`}
          >
            {/* Top section: Icon */}
            <div className="flex flex-col gap-5 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#FAFBFB] text-[#444] border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:bg-black group-hover:text-white group-hover:border-black">
                  {tier.icon}
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[22px] font-bold text-[#111111] tracking-[-0.01em] leading-snug">
                  {tier.title}
                </h3>
                <p className="text-[14px] font-semibold text-[#1A1A1A] leading-snug">
                  "{tier.tagline}"
                </p>
                <p className="text-[14px] text-[#333333] mt-2 leading-[1.6]">
                  {tier.desc}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="w-full border-t border-gray-200 pt-4 mt-1">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#444444] block mb-3">
                  INCLUDED DELIVERABLES
                </span>
                <ul className="flex flex-col gap-2.5">
                  {tier.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#111111] font-medium leading-snug">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-black shrink-0 mt-[2px]"
                      >
                        <path
                          d="M13.333 4L6 11.333 2.667 8"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom section: Clear Prominent CTA Button */}
            <div className="w-full border-t border-gray-200 pt-4 mt-6">
              <div className={`w-full py-3 px-4 rounded-6 text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                tier.isHighlight
                  ? 'bg-black text-white group-hover:bg-[#222222]'
                  : 'border border-black bg-white text-black group-hover:bg-black group-hover:text-white'
              }`}>
                <span>{tier.ctaAction}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
      </div>
    </div>
  );

  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="Cybersecurity for Fintechs in Saudi Arabia | Snapsec"
        description="Expert-led penetration testing, vulnerability assessments, and security consulting services for Saudi FinTechs."
        canonicalUrl="https://snapsec.co/money2020"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Saudi Fintechs', url: 'https://snapsec.co/money2020' },
      ]} />
      <HeroSection
        isServicesPage={true}
        title="Cybersecurity for Fintechs in Saudi Arabia"
        subtitle="We help Saudi FinTechs identify vulnerabilities, achieve SAMA & NCA compliance, and protect their digital infrastructure from cyber threats."
        ctaText="Get a Free Cybersecurity Audit"
        ctaNote="Exclusive Money20/20 Offer • Claim a complimentary audit for your fintech"
        ctaLink="/contact-us?query=Free%20Cybersecurity%20Audit%20-%20Money2020%20Special%20Offer"
        featureCards={featureCards}
      />

      {/* Interactive Tabs Section: Our Products & Our Services */}
      <section className="section-platform-benefits pb-xxl lg:pb-88px">
        <div className="container bg-white">
          <div className="section-platform-benefits__wrapper flex flex-col gap-lg border-x-[0.5px] border-gray-600 px-sm sm:px-xl lg:gap-48px lg:px-80px">
            {/* Header & Tab Switch */}
            <div className="flex flex-col items-center text-center w-full max-w-[790px] mx-auto gap-5 pt-10 sm:pt-14">
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#111111] tracking-[-0.02em] leading-tight">
                Our Products & Services
              </h2>
              <p className="text-[14px] sm:text-[16px] text-[#444444] leading-relaxed max-w-[620px] mx-auto">
                Explore our automated security intelligence platform modules and specialized offensive security services built to protect Saudi FinTechs.
              </p>

              {/* Tab Switch Buttons */}
              <div className="inline-flex p-1.5 rounded-full bg-[#F3F4F6] border border-gray-200 mt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'products'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-[#555555] hover:text-black'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <span>Our Products</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    activeTab === 'products' ? 'bg-[#333333] text-white' : 'bg-[#E5E7EB] text-[#555555]'
                  }`}>
                    {SNAPSEC_PRODUCTS.length} Products
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'services'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-[#555555] hover:text-black'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Our Services</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    activeTab === 'services' ? 'bg-[#333333] text-white' : 'bg-[#E5E7EB] text-[#555555]'
                  }`}>
                    {SNAPSEC_SERVICES.length} Services
                  </span>
                </button>
              </div>
            </div>

            {/* Render Cards Grid */}
            <div className="section-platform-benefits__cards grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 w-full items-stretch">
              {(activeTab === 'products' ? SNAPSEC_PRODUCTS : SNAPSEC_SERVICES).map((item, idx) => (
                <Link
                  key={item.title + idx}
                  to={item.link}
                  className="group section-platform-benefits__card flex cursor-pointer flex-col justify-between items-start rounded-none border border-gray-200 bg-white p-6 text-left transition-all duration-200 hover:border-black hover:bg-[#FAFBFB] shadow-xs"
                >
                  <div className="flex flex-col gap-4 w-full">
                    {/* Top section: Icon only (label removed) */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-shrink-0 w-11 h-11 rounded-none bg-[#FAFBFB] text-[#444] border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:bg-black group-hover:text-white group-hover:border-black">
                        {item.icon}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[18px] font-bold text-[#111111] tracking-[-0.01em] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[13px] font-semibold text-[#1A1A1A] leading-snug">
                        {item.tagline}
                      </p>
                      <p className="text-[13.5px] text-[#444444] mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Highlights / Deliverables */}
                    <div className="w-full border-t border-gray-100 pt-3 mt-1">
                      <ul className="flex flex-col gap-2">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2 text-[12.5px] text-[#222222] font-medium leading-snug">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="text-black shrink-0"
                            >
                              <path
                                d="M13.333 4L6 11.333 2.667 8"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action: Small Button */}
                  <div className="w-full border-t border-gray-100 pt-4 mt-5 flex items-center justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none text-[12px] font-semibold text-black bg-white border border-black group-hover:bg-black group-hover:text-white transition-all duration-200">
                      <span>{item.actionText}</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection
        isServicesPage={true}
        badge="Money20/20 Special Offer"
        title="Get a Free Cybersecurity Audit with Snapsec"
        subtitle="Because of Money20/20, we're offering Saudi FinTechs a complimentary, zero-risk cybersecurity audit. Connect with our team at the event or claim your free audit today."
        ctaText="Claim Your Free Audit"
        ctaLink="/contact-us?query=Free%20Cybersecurity%20Audit%20-%20Money2020%20Special%20Offer"
      />
    </main>
  );
};

export default Money2020Page;
