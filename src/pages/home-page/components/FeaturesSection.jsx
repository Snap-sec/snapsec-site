import { useInView } from 'react-intersection-observer';
import { VMDashboard, ASMDashboard, AIMDashboard, VSDashboard, WASDashboard } from './DashboardIllustrations';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-all group-hover:translate-x-[2px]">
    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    label: { title: 'Vulnerability Management', bg: '#EAEFF6', color: '#3B4C63' },
    title: 'Unify, prioritize, and remediate security findings.',
    links: [
      { icon: '/assets/visibility.svg', title: 'Unified Vulnerability Dashboard', link: 'https://docs.snapsec.co/products/vm/dashboard' },
      { icon: '/assets/lifecycle.svg', title: 'Automated SLA Tracking & Analytics', link: 'https://docs.snapsec.co/products/vm/slate-analytics' },
      { icon: '/assets/risk.svg', title: 'Risk-Based Prioritization', link: 'https://docs.snapsec.co/products/vm/assets' },
      { icon: '/assets/detection.svg', title: 'Connect to Integrations Ecosystem', link: 'https://docs.snapsec.co/integrations/vm/index' },
    ],
    imageAlt: 'Vulnerability Management',
    layout: 'left',
  },
  {
    label: { title: 'Attack Surface', bg: '#EAEFF6', color: '#3B4C63' },
    title: 'Map and monitor your external attack surface.',
    links: [
      { icon: '/assets/visibility.svg', title: 'Continuous Asset Discovery', link: 'https://docs.snapsec.co/products/asm/asset-catalog' },
      { icon: '/assets/governance.svg', title: 'Subdomain & Port Monitoring', link: 'https://docs.snapsec.co/products/asm/subdomains' },
      { icon: '/assets/risk.svg', title: 'Exposure Detection Engine', link: 'https://docs.snapsec.co/products/asm/risk-signals' },
      { icon: '/assets/detection.svg', title: 'Certificate & Technology Intelligence', link: 'https://docs.snapsec.co/products/asm/dashboard' },
    ],
    imageAlt: 'Attack Surface Management',
    layout: 'right',
  },
  {
    label: { title: 'Asset Inventory', bg: '#EAEFF6', color: '#3B4C63' },
    title: 'Unify and contextualize all digital assets.',
    links: [
      { icon: '/assets/visibility2.svg', title: '360° Asset Coverage (APIs, Repos, IPs)', link: 'https://docs.snapsec.co/products/aim/dashboard' },
      { icon: '/assets/threat-detection.svg', title: 'Dynamic Classification Rules', link: 'https://docs.snapsec.co/products/aim/classifiers' },
      { icon: '/assets/vault.svg', title: 'Ownership & Team Mapping', link: 'https://docs.snapsec.co/products/aim/ownership' },
    ],
    imageAlt: 'Asset Inventory Management',
    layout: 'left',
  },
  {
    label: { title: 'Vulnerability Scanning', bg: '#EAEFF6', color: '#3B4C63' },
    title: 'Scan infrastructure continuously for active exposures.',
    links: [
      { icon: '/assets/threat-detection.svg', title: 'Continuous Infrastructure Scanning', link: 'https://docs.snapsec.co/products/vs/scanning' },
      { icon: '/assets/visibility.svg', title: 'Open Port & Service Discovery', link: 'https://docs.snapsec.co/products/vs/overview' },
      { icon: '/assets/risk.svg', title: 'Real-time Exposure Assessment', link: 'https://docs.snapsec.co/products/vs/overview' },
    ],
    imageAlt: 'Vulnerability Scanner',
    layout: 'right',
  },
  {
    label: { title: 'Web Application Scanning', bg: '#EAEFF6', color: '#3B4C63' },
    title: 'Run automated DAST scans for web apps and APIs.',
    links: [
      { icon: '/assets/visibility.svg', title: 'Dynamic AppSec Testing (DAST)', link: 'https://docs.snapsec.co/products/was/overview' },
      { icon: '/assets/threat-detection.svg', title: 'Automated API Vulnerability Scans', link: 'https://docs.snapsec.co/products/was/api-scanning' },
      { icon: '/assets/vault.svg', title: 'OWASP Top 10 Security Audits', link: 'https://docs.snapsec.co/products/was/overview' },
    ],
    imageAlt: 'Web Application Scanner',
    layout: 'left',
  },
];

const dashboardMap = {
  'Vulnerability Management': VMDashboard,
  'Attack Surface': ASMDashboard,
  'Asset Inventory': AIMDashboard,
  'Vulnerability Scanning': VSDashboard,
  'Web Application Scanning': WASDashboard,
};

function FeatureIllustration({ feature, inView }) {
  const Dashboard = dashboardMap[feature.label.title];
  if (!Dashboard) return null;
  return <Dashboard inView={inView} />;
}

function FeatureBlock({ feature, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-lg section-border px-sm py-xxl sm:px-xl lg:grid lg:grid-cols-[450px_minmax(0,_468px)] lg:items-start lg:justify-between lg:py-88px lg:pl-80px lg:pr-xl ${
        index > 0 ? 'section-border-top' : ''
      }`}
    >
      {/* Decorative line */}
      {index > 0 && (
        <div className="absolute -top-xl left-1/2 hidden h-80px w-[0.5px] -translate-x-1/2 bg-gray-600 lg:block" />
      )}

      {/* Info column */}
      <div className="flex flex-col items-start gap-md lg:gap-lg">
        <div className="flex flex-col items-start gap-xs">
          <span
            className="label-text-s inline-flex min-h-md select-none items-center justify-center rounded-4 px-[10px] py-xxs"
            style={{
              backgroundColor: feature.label.bg,
              color: feature.label.color,
            }}
          >
            {feature.label.title}
          </span>
          <p className="heading-h4">{feature.title}</p>
        </div>

        <div className="flex flex-col items-start gap-[10px]">
          {feature.links.map((link) => (
            <a
              key={link.title}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-xs whitespace-nowrap"
            >
              <img
                src={link.icon}
                alt={link.title}
                className="w-[18px] h-[18px] shrink-0"
              />
              <span className="body-text-m relative inline-block transition-all before:absolute before:bottom-[12%] before:left-0 before:right-0 before:h-[1px] before:w-0 before:bg-current before:transition-all group-hover:before:w-full whitespace-nowrap">
                {link.title}
              </span>
              <ArrowRight />
            </a>
          ))}
        </div>
      </div>

      {/* Illustration column */}
      <div className="pointer-events-none w-full">
        <FeatureIllustration feature={feature} inView={inView} />
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="overflow-hidden">
      <div className="container">
        {/* Heading */}
        <div className="section-border section-border-top flex flex-col items-center gap-md px-sm pt-xxl sm:px-xl lg:gap-lg lg:px-80px lg:pt-88px">
          <h3 className="heading-h1 mx-auto max-w-[801px] text-center">
            The Snapsec Suite Core Modules.
          </h3>
        </div>

        {/* Feature blocks */}
        <div>
          {features.map((feature, i) => (
            <FeatureBlock key={feature.label.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
