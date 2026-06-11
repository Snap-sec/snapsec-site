import React from 'react';
import { Link } from 'react-router-dom';

const PLATFORM_BENEFITS = [
  {
    title: 'Discover',
    desc: 'Snapsec continuously inventories assets, applications, cloud resources, identities, secrets, AI agents, and external attack surfaces, creating a complete and continuously updated security visibility layer.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    title: 'Detect',
    desc: 'Snapsec aggregates findings from security scanners, cloud platforms, code repositories, and security tools to identify vulnerabilities, misconfigurations, exposed secrets, and security risks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  {
    title: 'Prioritize',
    desc: 'Snapsec analyzes exploitability, business impact, asset criticality, internet exposure, and threat intelligence to identify the risks that matter most and require immediate attention.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: 'Remediate',
    desc: 'Snapsec provides clear remediation guidance, ownership mapping, automated workflows, and engineering collaboration tools that accelerate vulnerability resolution across teams and environments.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  },
  {
    title: 'Govern',
    desc: 'Snapsec delivers continuous risk oversight, policy alignment, compliance visibility, and executive reporting, enabling organizations to measure progress, enforce accountability, and strengthen security outcomes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  }
];

const CYBERSECURITY_SERVICES = [
  {
    title: 'VAPT (Vulnerability Assessment & Penetration Testing)',
    desc: 'Identify security weaknesses in your networks, systems, and applications through comprehensive automated scans and manual deep-dive penetration testing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: 'Mobile Application Penetration Testing',
    desc: 'Thoroughly assess iOS and Android applications for security vulnerabilities, reverse-engineering risks, weak cryptography, and unsafe storage practices.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    title: 'Infrastructure Penetration Testing',
    desc: 'Evaluate your internal and external networks, servers, and active directory configurations to expose paths attackers could use to compromise your organization.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" />
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    title: 'Vulnerability Scanning',
    desc: 'Continuously monitor your perimeter and internal assets with automated scans, ensuring rapid detection of newly disclosed vulnerabilities and misconfigurations.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    )
  },
  {
    title: 'API Security Testing',
    desc: 'Validate authentication mechanisms, endpoint validation rules, and data leakage risks across all public-facing and internal REST, GraphQL, and SOAP APIs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="3" width="6" height="6" rx="1" />
        <rect x="16" y="15" width="6" height="6" rx="1" />
        <rect x="2" y="9" width="6" height="6" rx="1" />
        <path d="M8 12h8M16 6h-4v6M16 18h-4v-6" />
      </svg>
    )
  },
  {
    title: 'Continuous Security Testing',
    desc: 'Adopt a proactive defense posture with recurring scheduled assessments that continuously validate your security posture against emerging threat vectors.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    )
  },
  {
    title: 'Secure Code Review',
    desc: 'Identify critical logic flaws, security vulnerabilities, and adherence to secure coding guidelines through manual and automated analysis of your source code.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    title: 'Cloud Security Assessment & Testing',
    desc: 'Audit AWS, GCP, and Azure environments for configuration drift, overly permissive IAM roles, exposed resources, and alignment with industry compliance benchmarks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    )
  }
];

const BenefitsSection = ({ isServicesPage }) => {
  const cardsToRender = isServicesPage ? CYBERSECURITY_SERVICES : PLATFORM_BENEFITS;

  return (
    <div className="section-platform-benefits">
      <div className="container bg-white">
        <div className={`section-platform-benefits__wrapper flex flex-col gap-lg border-x-[0.5px] border-gray-600 px-sm sm:px-xl lg:gap-64px lg:px-80px ${isServicesPage ? 'pb-xxl lg:pb-88px' : ''}`}>
          {!isServicesPage && (
            <h2 className="heading-h1 mx-auto w-full text-center">
              One Platform for Discovery, Detection, Scanning and Remiation.
            </h2>
          )}
          <div className="section-platform-benefits__cards grid grid-cols-1 gap-xs md:grid-cols-2 lg:grid-cols-3">
            {cardsToRender.map((card, idx) => {
              const cardHref = isServicesPage
                ? `/contact-us?query=${encodeURIComponent("I am interested in " + card.title)}`
                : "#";
              const Tag = isServicesPage ? Link : 'a';

              return (
                <Tag
                  key={card.title + idx}
                  {...(isServicesPage ? { to: cardHref } : { href: cardHref })}
                  className="group section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FAFBFB] text-[#555] border border-gray-200/60 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black">
                    {card.icon}
                  </div>
                  <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                    <span className="body-heading-m cursor-pointer">{card.title}</span>
                    <p className="body-text-s cursor-pointer">{card.desc}</p>
                  </span>
                </Tag>
              );
            })}

            <div
              className="section-platform-benefits__card relative flex items-center justify-center overflow-hidden rounded-8 border-[0.5px] border-gray-600 bg-white bg-cover bg-[center_bottom_-40px] bg-no-repeat p-md md:bg-[center_bottom_-32px] lg:bg-center"
              style={{
                backgroundImage: "url('/assets/small-card-gradient.png')"
              }}
            >
              <div className="noise absolute inset-0 z-1"></div>
              <div className="section-platform-benefits__card-info flex flex-col items-center gap-md text-center">
                <p className="body-heading-xl [&_br]:hidden lg:[&_br]:block">
                  {isServicesPage ? (
                    <>
                      Assess. Verify. <br />
                      Remediate. Protect. Secure.
                    </>
                  ) : (
                    <>
                      Discover. Detect. <br />
                      Prioritize. Remediate. Govern.
                    </>
                  )}
                </p>
                <div className="z-2 relative">
                  <Link to="/contact-us" className="group button-primary-s">
                    <span className="block">
                      Book a Demo
                      <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">
                        -&gt;
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
