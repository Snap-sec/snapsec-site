import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// Mock dashboard UI showing NHI inventory table
function DashboardMockup() {
  const items = [
    { type: 'API Key', name: 'github-actions-prod', env: 'Production', owner: 'DevOps', risk: 'High', status: 'Active' },
    { type: 'Service Account', name: 'k8s-cluster-sa', env: 'Staging', owner: 'Platform', risk: 'Medium', status: 'Active' },
    { type: 'OAuth Token', name: 'slack-integration', env: 'Production', owner: 'Engineering', risk: 'Low', status: 'Active' },
    { type: 'Secret', name: 'db-password-prod', env: 'Production', owner: 'Backend', risk: 'Critical', status: 'Stale' },
    { type: 'Certificate', name: 'ssl-cert-api', env: 'Production', owner: 'Infra', risk: 'Medium', status: 'Expiring' },
  ];

  const riskColors = {
    Critical: '#DC2626',
    High: '#EA580C',
    Medium: '#CA8A04',
    Low: '#2563EB',
  };

  const statusColors = {
    Active: { bg: '#F0FDF4', color: '#059669' },
    Stale: { bg: '#FEF2F2', color: '#DC2626' },
    Expiring: { bg: '#FFF7ED', color: '#EA580C' },
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        border: '0.5px solid #D9D9D9',
        boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        fontFamily: "'PP Radio Grotesk', sans-serif",
      }}
    >
      {/* Browser topbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '32px',
          padding: '0 12px',
          borderBottom: '0.5px solid #D9D9D9',
          background: '#FAFAFA',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {['#D9D9D9', '#D9D9D9', '#D9D9D9'].map((c, i) => (
            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
            <circle cx="5.5" cy="6" r="5" stroke="#6E6E6E" strokeWidth="1" />
            <path d="M5.5 2V6L7.5 8" stroke="#6E6E6E" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '11px', color: '#6E6E6E', fontFamily: 'inherit' }}>snapsec.io</span>
        </div>
      </div>

      {/* Table header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 0.8fr 0.8fr 0.7fr 0.7fr',
          padding: '10px 16px',
          background: '#FAFAFA',
          borderBottom: '0.5px solid #EEEEEE',
        }}
      >
        {['TYPE', 'NAME', 'ENV', 'OWNER', 'RISK', 'STATUS'].map(h => (
          <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em' }}>
            {h}
          </span>
        ))}
      </div>

      {/* Table rows */}
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.07 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr 0.8fr 0.8fr 0.7fr 0.7fr',
            padding: '10px 16px',
            borderBottom: i < items.length - 1 ? '0.5px solid #F5F5F5' : 'none',
            alignItems: 'center',
            background: '#fff',
          }}
        >
          <span style={{ fontSize: '11px', color: '#6E6E6E', fontWeight: 400 }}>{item.type}</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827', fontFamily: 'monospace', letterSpacing: '-0.01em' }}>
            {item.name}
          </span>
          <span style={{
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '4px',
            background: '#F0F0F0',
            color: '#333',
            display: 'inline-block',
            width: 'fit-content',
          }}>
            {item.env}
          </span>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>{item.owner}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: riskColors[item.risk],
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '11px', color: '#333' }}>{item.risk}</span>
          </span>
          <span style={{
            fontSize: '10px',
            fontWeight: 500,
            padding: '2px 6px',
            borderRadius: '4px',
            background: statusColors[item.status].bg,
            color: statusColors[item.status].color,
            display: 'inline-block',
            width: 'fit-content',
          }}>
            {item.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const solutionCards = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
        <circle cx="24" cy="24" r="8" fill="none" stroke="#000" strokeWidth="1.5" />
        <line x1="24" y1="8" x2="24" y2="16" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="32" x2="24" y2="40" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="24" x2="16" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="24" x2="40" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Discovery',
    text: 'Continuously discover any NHI with no blind spots',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
        <rect x="12" y="14" width="24" height="20" rx="2" stroke="#000" strokeWidth="1.5" />
        <line x1="16" y1="20" x2="32" y2="20" stroke="#000" strokeWidth="1" />
        <line x1="16" y1="24" x2="28" y2="24" stroke="#000" strokeWidth="1" />
        <line x1="16" y1="28" x2="24" y2="28" stroke="#000" strokeWidth="1" />
      </svg>
    ),
    title: 'Inventory',
    text: 'Catalog and correlate all NHIs across dispersed ecosystems',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
        <circle cx="24" cy="24" r="6" stroke="#000" strokeWidth="1.5" fill="none" />
        <path d="M24 12 L30 22 L38 20 L32 28 L38 36 L28 32 L24 40 L20 32 L10 36 L16 28 L10 20 L18 22 Z" stroke="#000" strokeWidth="1" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: 'Context',
    text: 'Understand all NHIs through deep contextualization and enrichment',
  },
];

export default function SolutionSection() {
  return (
    <section className="section-solution">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-xxl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">

          {/* Heading */}
          <FadeInBlock>
            <div className="mx-auto flex w-full max-w-[734px] flex-col gap-sm text-center items-center">
              <h3 className="heading-h1 text-center">The Clutch Solution</h3>
              <p className="subtitle-m mx-auto w-full max-w-[320px] text-gray-900 text-center">
                Complete and Contextualized Visibility. Clear. Simplified
              </p>
            </div>
          </FadeInBlock>

          <div className="flex flex-col gap-xxl">
            {/* Icons Cards */}
            <div className="grid grid-cols-1 gap-lg lg:gap-md lg:grid-cols-3">
              {solutionCards.map((card, i) => (
                <FadeInBlock key={i} delay={i * 0.1}>
                  <div className="flex gap-midmd lg:flex-col lg:gap-sm">
                    <span className="block shrink-0">{card.icon}</span>
                    <div className="flex flex-col gap-xxs lg:gap-xs">
                      <p className="body-heading-m">{card.title}</p>
                      <p className="body-text-s text-gray-900">{card.text}</p>
                    </div>
                  </div>
                </FadeInBlock>
              ))}
            </div>

            {/* Dashboard mockup */}
            <FadeInBlock delay={0.2}>
              <DashboardMockup />
            </FadeInBlock>

            {/* CTA */}
            <FadeInBlock delay={0.3}>
              <div className="flex justify-center">
                <a className="button-primary-m" href="/book-demo">
                  <span className="block">See Clutch in Action <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">→</span></span>
                </a>
              </div>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
