import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Inline SVG icons for dropdown items ────────────────
const Icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="1" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="10" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="7" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  scan: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
      <line x1="9" y1="1" x2="9" y2="4" stroke="currentColor" strokeWidth="1.4" />
      <line x1="9" y1="14" x2="9" y2="17" stroke="currentColor" strokeWidth="1.4" />
      <line x1="1" y1="9" x2="4" y2="9" stroke="currentColor" strokeWidth="1.4" />
      <line x1="14" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L2.5 4.5V8.5C2.5 12.5 5.5 15.5 9 16.5C12.5 15.5 15.5 12.5 15.5 8.5V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6.5 9L8.5 11L12 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  bug: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <ellipse cx="9" cy="10.5" rx="4" ry="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 6C7 4.9 7.9 4 9 4C10.1 4 11 4.9 11 6" stroke="currentColor" strokeWidth="1.4" />
      <line x1="5" y1="8" x2="2" y2="6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="8" x2="16" y2="6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="5" y1="12" x2="2" y2="13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="12" x2="16" y2="13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  globe: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="9" cy="9" rx="3.5" ry="7.5" stroke="currentColor" strokeWidth="1.4" />
      <line x1="1.5" y1="9" x2="16.5" y2="9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L2 6L9 10L16 6L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M2 9L9 13L16 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L9 16L16 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="10" width="3" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7.5" y="6" width="3" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13" y="2" width="3" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  network: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="3" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="3" cy="14" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="14" r="2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="9" y1="5" x2="4" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="9" y1="5" x2="14" y2="12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  radar: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <line x1="9" y1="9" x2="14" y2="4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  fingerprint: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 15C5.5 12 5.5 9 6 7C6.5 5 7.5 4 9 4C10.5 4 11.5 5 12 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 13C3.5 10 3.5 8 4.5 5.5C5.5 3 7 2 9 2C11 2 12.5 3 13.5 5.5C14 7 14.5 8.5 14.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 16C8.5 14 8.5 12 9 10C9.3 8.5 9.8 7.5 9 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  server: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="11" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5" cy="4.5" r="0.8" fill="currentColor" />
      <circle cx="5" cy="13.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  tag: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 3.5C2 2.67 2.67 2 3.5 2H8.17C8.7 2 9.2 2.21 9.58 2.59L15.41 8.41C16.2 9.2 16.2 10.47 15.41 11.26L11.26 15.41C10.47 16.2 9.2 16.2 8.41 15.41L2.59 9.58C2.21 9.2 2 8.7 2 8.17V3.5Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  ),
  zap: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10 1.5L3 10.5H9L8 16.5L15 7.5H9L10 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M1.5 9C1.5 9 4 4 9 4C14 4 16.5 9 16.5 9C16.5 9 14 14 9 14C4 14 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
};

// ─── Arrow for links ────────────────────────────────────
const LinkArrow = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    style={{ flexShrink: 0, marginLeft: '2px', display: 'inline-block' }}
  >
    <path
      d="M1 1L5.5 6L1 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Dropdown data ──────────────────────────────────────
const dropdownData = {
  Usecases: {
    columns: [
      {
        badge: 'VULNERABILITY MANAGEMENT',
        badgeBg: '#004DFF',
        badgeColor: '#FFFFFF',
        items: [
          {
            icon: Icons.dashboard,
            title: 'Dashboard & Analytics',
            desc: 'Centralized vulnerability overview with SLA tracking and severity breakdown',
            link: 'https://docs.snapsec.co/products/vm/dashboard',
          },
          {
            icon: Icons.bug,
            title: 'Vulnerability Lifecycle',
            desc: 'Track vulnerabilities from discovery to remediation with full audit trail',
            link: 'https://docs.snapsec.co/products/vm/vulnerabilities',
          },
          {
            icon: Icons.shield,
            title: 'Remediation & SLA',
            desc: 'Enforce SLA compliance and manage remediation workflows at scale',
            link: 'https://docs.snapsec.co/products/vm/change-management',
          },
          {
            icon: Icons.chart,
            title: 'Risk Scoring & Prioritization',
            desc: 'Contextual risk scoring to focus on what matters most',
            link: 'https://docs.snapsec.co/products/vm/assessments',
          },
        ],
      },
      {
        badge: 'ATTACK SURFACE',
        badgeBg: '#E6C5F7',
        badgeColor: '#000000',
        items: [
          {
            icon: Icons.globe,
            title: 'Discovery & Inventory',
            desc: 'Continuously discover and inventory all external-facing assets',
            link: 'https://docs.snapsec.co/products/asm/assets',
          },
          {
            icon: Icons.radar,
            title: 'Exposure Detection',
            desc: 'Detect exposed services, misconfigurations, and shadow IT risks',
            link: 'https://docs.snapsec.co/products/asm/exposures',
          },
          {
            icon: Icons.scan,
            title: 'Continuous Scanning',
            desc: 'Automated surface monitoring with real-time change detection',
            link: 'https://docs.snapsec.co/products/asm/scanning',
          },
          {
            icon: Icons.network,
            title: 'Attack Path Mapping',
            desc: 'Visualize attack vectors and potential breach pathways',
            link: 'https://docs.snapsec.co/products/asm/overview',
          },
        ],
      },
      {
        badge: 'ASSET INTELLIGENCE',
        badgeBg: '#D9E4FF',
        badgeColor: '#000000',
        items: [
          {
            icon: Icons.layers,
            title: 'Asset Classification',
            desc: 'Automatically classify and tag assets by type, criticality, and ownership',
            link: 'https://docs.snapsec.co/products/aim/assets',
          },
          {
            icon: Icons.fingerprint,
            title: 'Technology Fingerprinting',
            desc: 'Identify technologies, frameworks, and services running on each asset',
            link: 'https://docs.snapsec.co/products/aim/technology',
          },
          {
            icon: Icons.server,
            title: 'Infrastructure Mapping',
            desc: 'Map relationships between assets, services, and infrastructure',
            link: 'https://docs.snapsec.co/products/aim/overview',
          },
          {
            icon: Icons.tag,
            title: 'Ownership & Tagging',
            desc: 'Assign ownership and manage asset metadata organization-wide',
            link: 'https://docs.snapsec.co/products/aim/assets',
          },
        ],
      },
      {
        badge: 'VULNERABILITY SCANNING',
        badgeBg: '#10B981',
        badgeColor: '#FFFFFF',
        items: [
          {
            icon: Icons.server,
            title: 'Infrastructure Scanning',
            desc: 'Continuous infrastructure and network vulnerability scanning',
            link: 'https://docs.snapsec.co/products/vs/scanning',
          },
          {
            icon: Icons.radar,
            title: 'Port & Service Discovery',
            desc: 'Detect open ports, protocols, and active network services',
            link: 'https://docs.snapsec.co/products/vs/overview',
          },
          {
            icon: Icons.search,
            title: 'Exposure Assessment',
            desc: 'Assess active network exposures and configuration issues',
            link: 'https://docs.snapsec.co/products/vs/overview',
          },
        ],
      },
      {
        badge: 'WEB APPLICATION SCANNING',
        badgeBg: '#F59E0B',
        badgeColor: '#000000',
        items: [
          {
            icon: Icons.zap,
            title: 'Dynamic Testing (DAST)',
            desc: 'Automated black-box security testing for running applications',
            link: 'https://docs.snapsec.co/products/was/overview',
          },
          {
            icon: Icons.network,
            title: 'API Vulnerability Scanning',
            desc: 'Identify vulnerabilities in REST, GraphQL, and SOAP APIs',
            link: 'https://docs.snapsec.co/products/was/api-scanning',
          },
          {
            icon: Icons.bug,
            title: 'OWASP Top 10 Audits',
            desc: 'Ensure coverage against common web application vulnerabilities',
            link: 'https://docs.snapsec.co/products/was/overview',
          },
        ],
      },
    ],
  },
  Modules: {
    columns: [
      {
        items: [
          {
            icon: Icons.globe,
            title: 'ASM',
            desc: 'Attack Surface Management: Continuous external discovery and exposure monitoring.',
            link: 'https://docs.snapsec.co/products/asm/assets',
          },
          {
            icon: Icons.layers,
            title: 'AIM',
            desc: 'Asset Intelligence Module: Automated classification and inventory metadata catalog.',
            link: 'https://docs.snapsec.co/products/aim/overview',
          },
        ],
      },
      {
        items: [
          {
            icon: Icons.scan,
            title: 'WAS',
            desc: 'Web Application Scanner: Automated dynamic DAST scanning for web apps and APIs.',
            link: 'https://docs.snapsec.co/products/was/overview',
          },
          {
            icon: Icons.zap,
            title: 'VS',
            desc: 'Vulnerability Scanner: Automated network, port, and infrastructure scanning.',
            link: 'https://docs.snapsec.co/products/vs/overview',
          },
        ],
      },
      {
        items: [
          {
            icon: Icons.shield,
            title: 'VM',
            desc: 'Vulnerability Management: Centralized tracking, scoring, and remediation workflows.',
            link: 'https://docs.snapsec.co/products/vm/dashboard',
          },
        ],
      },
    ],
  },
  Resources: {
    columns: [
      {
        badge: 'LEARN & SECURE',
        badgeBg: '#D9E4FF',
        badgeColor: '#000000',
        items: [
          {
            icon: Icons.globe,
            title: 'Docs',
            desc: 'Comprehensive API documentation, configuration guides, and product manuals.',
            link: 'https://docs.snapsec.co',
          },
          {
            icon: Icons.chart,
            title: 'Blog',
            desc: 'Stay informed with the latest cybersecurity trends, threat reports, and news.',
            link: 'https://blog.snapsec.co',
          },
          {
            icon: Icons.eye,
            title: 'YouTube Channel',
            desc: 'Video guides, product demonstrations, and technical deep-dives.',
            link: 'https://www.youtube.com/@snapsec',
          },
        ],
      },
      {
        badge: 'COMPANY & TRUST',
        badgeBg: '#E6C5F7',
        badgeColor: '#000000',
        items: [
          {
            icon: Icons.shield,
            title: 'Company Profile (PDF)',
            desc: 'Download our detailed company profile, capabilities brief, and overview.',
            link: '#',
          },
          {
            icon: Icons.tag,
            title: 'Public Recognitions',
            desc: 'Explore our certifications, industry awards, and standards compliance.',
            link: '#',
          },
          {
            icon: Icons.fingerprint,
            title: 'Clients & Testimonials',
            desc: 'What our partners and customers say about securing their assets with us.',
            link: '#',
          },
        ],
      },
    ],
  },
};

// ─── Single dropdown item ───────────────────────────────
function DropdownItem({ icon, title, desc, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-[12px] rounded-lg p-[10px] -mx-[10px] transition-colors duration-150 hover:bg-gray-50"
    >
      <span className="flex-shrink-0 mt-[2px] text-gray-500 group-hover:text-black transition-colors duration-150">
        {icon}
      </span>
      <div className="flex flex-col gap-[2px] min-w-0">
        <span className="inline-flex items-center gap-[4px] text-[14px] font-semibold text-gray-900 leading-[1.4] whitespace-nowrap">
          {title}
          <LinkArrow />
        </span>
        <span className="text-[13px] text-gray-500 leading-[1.45] font-normal">
          {desc}
        </span>
      </div>
    </a>
  );
}

// ─── Mega dropdown panel ────────────────────────────────
function MegaDropdown({ data, isOpen }) {
  const columnCount = data.columns.length;
  const isLarge = columnCount >= 5;

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 top-full pt-[8px] z-50 transition-all duration-200 ${
        isOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-[6px] pointer-events-none'
      }`}
      style={{ 
        width: 'max-content', 
        maxWidth: isLarge ? '1140px' : '960px' 
      }}
    >
      <div
        className="rounded-xl border border-gray-200 bg-white shadow-lg"
        style={{
          boxShadow:
            '0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <div 
          className={`flex gap-0 ${
            isLarge ? 'p-[20px] pb-[16px]' : 'p-[28px] pb-[24px]'
          }`}
        >
          {data.columns.map((col, ci) => (
            <div
              key={col.badge || ci}
              className={`flex flex-col gap-[16px] flex-1 ${
                isLarge
                  ? ci > 0 
                    ? 'pl-[12px] border-l border-gray-100' 
                    : ''
                  : ci > 0 
                    ? 'pl-[28px] border-l border-gray-100' 
                    : ''
              } ${
                isLarge
                  ? ci < data.columns.length - 1 
                    ? 'pr-[12px]' 
                    : ''
                  : ci < data.columns.length - 1 
                    ? 'pr-[28px]' 
                    : ''
              }`}
              style={{ minWidth: isLarge ? '215px' : '260px' }}
            >
              {/* Badge */}
              {col.badge && (
                <span
                  className={`inline-flex items-center self-start rounded-[5px] select-none uppercase font-semibold tracking-[0.06em] ${
                    isLarge ? 'text-[10px] px-[8px] py-[2.5px]' : 'text-[11px] px-[10px] py-[3px]'
                  }`}
                  style={{
                    backgroundColor: col.badgeBg,
                    color: col.badgeColor,
                  }}
                >
                  {col.badge}
                </span>
              )}

              {/* Items */}
              <div className="flex flex-col gap-[4px]">
                {col.items.map((item) => (
                  <DropdownItem key={item.title} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav items config ───────────────────────────────────
const navItems = [
  { label: 'Modules', hasDropdown: true },
  { label: 'Usecases', hasDropdown: true },
  { label: 'Resources', hasDropdown: true },
  { label: 'Company', hasDropdown: false, href: '/about-us' },
];

// ─── Header component ──────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleEnter = useCallback((label) => {
    clearTimeout(closeTimerRef.current);
    setOpenDropdown(label);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded] = useState(null);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 flex items-center py-[12px] transition-all duration-200 lg:py-midmd ${
        scrolled
          ? 'bg-white shadow-[0_1px_0_0_#D9D9D9]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide w-full max-w-[1204px] mx-auto px-md lg:px-lg">
        <div className="flex w-full items-center justify-between relative">
          {/* Logo */}
          <a href="/" className="inline-flex items-center select-none z-50">
            <img
              src="/assets/logo-full-black.svg"
              alt="Snapsec Suite"
              className="w-[104px] xl:w-[124px]"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => (
              <div
                key={item.label}
                className=""
                onMouseEnter={() =>
                  item.hasDropdown && handleEnter(item.label)
                }
                onMouseLeave={() => item.hasDropdown && handleLeave()}
              >
                {item.hasDropdown ? (
                  <div
                    className={`menu-link-wrapper cursor-pointer ${
                      openDropdown === item.label ? 'active' : ''
                    }`}
                  >
                    <span className="menu-link">
                      <span className="transition-all duration-300">
                        {item.label}
                      </span>
                      <span className="arrow-icon mt-[2px] flex items-center justify-center">
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href?.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="menu-link-wrapper"
                  >
                    <span className="menu-link">
                      <span className="transition-all duration-300">
                        {item.label}
                      </span>
                    </span>
                  </a>
                )}

                {/* Dropdown */}
                {item.hasDropdown && dropdownData[item.label] && (
                  <MegaDropdown
                    data={dropdownData[item.label]}
                    isOpen={openDropdown === item.label}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-xs z-50">
            <a
              href="https://suite.snapsec.co/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary-s"
            >
              <span>Live Demo</span>
            </a>

            {/* Mobile Burger */}
            <button
              type="button"
              aria-label="Menu"
              className="lg:hidden flex items-center justify-center w-[30px] h-[30px] rounded-full bg-black border-[0.5px] border-black z-50"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="relative w-[24px] h-[18px]">
                <span
                  className={`absolute left-1/2 -translate-x-1/2 h-[1.5px] rounded-full bg-white transition-all duration-300 ${
                    mobileOpen
                      ? 'top-1/2 -translate-y-1/2 w-[17px] rotate-45'
                      : 'top-[2px] w-[11px]'
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.5px] w-[17px] rounded-full bg-white transition-all duration-300 ${
                    mobileOpen ? 'scale-0' : 'scale-100'
                  }`}
                />
                <span
                  className={`absolute left-1/2 -translate-x-1/2 h-[1.5px] rounded-full bg-white transition-all duration-300 ${
                    mobileOpen
                      ? 'bottom-1/2 translate-y-1/2 w-[17px] -rotate-45'
                      : 'bottom-[2px] w-[11px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-[80px] px-md overflow-y-auto transition-all duration-300 lg:hidden ${
          mobileOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-0 mt-lg">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-gray-200">
              {item.hasDropdown ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-[14px] px-xs"
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label
                      )
                    }
                  >
                    <span className="heading-h6">{item.label}</span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className={`transition-transform duration-200 ${
                        mobileExpanded === item.label ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Accordion content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileExpanded === item.label
                        ? 'max-h-[2000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {dropdownData[item.label] && (
                      <div className="flex flex-col gap-[20px] pb-[16px] px-xs">
                        {dropdownData[item.label].columns.map((col, ci) => (
                          <div key={col.badge || ci} className="flex flex-col gap-[10px]">
                            {col.badge && (
                              <span
                                className="inline-flex items-center self-start rounded-[5px] px-[8px] py-[2px] text-[10px] font-semibold tracking-[0.06em] uppercase select-none"
                                style={{
                                  backgroundColor: col.badgeBg,
                                  color: col.badgeColor,
                                }}
                              >
                                {col.badge}
                              </span>
                            )}
                            <div className="flex flex-col gap-[6px]">
                              {col.items.map((it) => (
                                <a
                                  key={it.title}
                                  href={it.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-[8px] py-[6px]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <span className="text-gray-400 flex-shrink-0">
                                    {it.icon}
                                  </span>
                                  <span className="text-[14px] font-medium text-gray-800">
                                    {it.title}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <a
                  href={item.href || '#'}
                  className="heading-h6 block px-xs py-[14px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="mt-xl pb-[40px]">
          <a
            href="https://suite.snapsec.co/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary-m w-full text-center"
          >
            Live Demo
          </a>
        </div>
      </div>
    </header>
  );
}
