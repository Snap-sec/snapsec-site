import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} className="w-full"
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

// Asset Catalog mockup showing real ASM columns
function AssetCatalogMockup() {
  const assets = [
    { host: 'api.acme.com',        type: 'Subdomain',  waf: 'Cloudflare', ports: '443, 80',  exposed: true,  signals: 4 },
    { host: '104.21.48.10',        type: 'IP Address', waf: 'AWS',        ports: '443',       exposed: true,  signals: 2 },
    { host: 'dev-portal.acme.net', type: 'Subdomain',  waf: '—',          ports: '22, 3000',  exposed: true,  signals: 7 },
    { host: 'mail.acme.com',       type: 'Subdomain',  waf: '—',          ports: '25, 587',   exposed: false, signals: 1 },
    { host: 'cdn.assets.acme.io',  type: 'Web Server', waf: 'Fastly',     ports: '443',       exposed: false, signals: 0 },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: '8px', border: '0.5px solid #D9D9D9', boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      {/* Browser bar */}
      <div style={{ display: 'flex', alignItems: 'center', height: '32px', padding: '0 12px', borderBottom: '0.5px solid #D9D9D9', background: '#FAFAFA', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['#D9D9D9','#D9D9D9','#D9D9D9'].map((c,i) => <div key={i} style={{ width:6,height:6,borderRadius:'50%',background:c }} />)}
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none"><circle cx="5.5" cy="6" r="5" stroke="#6E6E6E" strokeWidth="1"/><path d="M5.5 2V6L7.5 8" stroke="#6E6E6E" strokeWidth="1" strokeLinecap="round"/></svg>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>suite.snapsec.co / asm / assets</span>
        </div>
      </div>
      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr', padding: '9px 16px', background: '#FAFAFA', borderBottom: '0.5px solid #EEEEEE' }}>
        {['HOST','TYPE','WAF','OPEN PORTS','EXPOSED','SIGNALS'].map(h => (
          <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em' }}>{h}</span>
        ))}
      </div>
      {assets.map((a, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.07 }}
          style={{ display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr', padding: '10px 16px', borderBottom: i < assets.length-1 ? '0.5px solid #F5F5F5' : 'none', alignItems: 'center', background: '#fff' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827', fontFamily: "'SF Mono','Fira Code',monospace", letterSpacing: '-0.01em' }}>{a.host}</span>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>{a.type}</span>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>{a.waf}</span>
          <span style={{ fontSize: '11px', color: '#6E6E6E', fontFamily: 'monospace' }}>{a.ports}</span>
          <span style={{ fontSize: '10px', fontWeight: 500, padding: '2px 6px', borderRadius: '4px', background: a.exposed ? '#FEF2F2' : '#F0FDF4', color: a.exposed ? '#DC2626' : '#059669', display: 'inline-block', width: 'fit-content' }}>{a.exposed ? 'Yes' : 'No'}</span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: a.signals > 3 ? '#DC2626' : a.signals > 0 ? '#CA8A04' : '#9CA3AF', fontFamily: "'Space Grotesk',sans-serif" }}>{a.signals}</span>
        </motion.div>
      ))}
    </div>
  );
}

const solutionCards = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1"/>
        <circle cx="24" cy="24" r="8" fill="none" stroke="#000" strokeWidth="1.5"/>
        <line x1="24" y1="8" x2="24" y2="16" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="32" x2="24" y2="40" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="24" x2="16" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="32" y1="24" x2="40" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Continuous Discovery',
    text: 'Automatically discover every external-facing asset — subdomains, IPs, ports, web servers, certificates, DNS records — with no blind spots.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1"/>
        <rect x="12" y="14" width="24" height="20" rx="2" stroke="#000" strokeWidth="1.5"/>
        <line x1="16" y1="20" x2="32" y2="20" stroke="#000" strokeWidth="1"/>
        <line x1="16" y1="24" x2="28" y2="24" stroke="#000" strokeWidth="1"/>
        <line x1="16" y1="28" x2="24" y2="28" stroke="#000" strokeWidth="1"/>
      </svg>
    ),
    title: 'Unified Asset Catalog',
    text: 'Explore and manage all discovered assets in one place. Filter by type, WAF, exposure status, network scope, or signal presence.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1"/>
        <path d="M16 20L24 28L32 20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="16" r="3" stroke="#000" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Risk Signals',
    text: 'Continuously detect exposures using rule-based intelligence. Signals evaluate assets after each scan and surface violations with severity and trends.',
  },
];

export default function SolutionSection() {
  return (
    <section className="section-solution">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-xxl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">

          <FadeInBlock>
            <div className="mx-auto flex w-full max-w-[734px] flex-col gap-sm text-center items-center">
              <h3 className="heading-h1 text-center">The Snapsec ASM Solution</h3>
              <p className="subtitle-m mx-auto w-full max-w-[420px] text-gray-900 text-center">
                Unified Visibility. Actionable Insights. Real-Time Awareness.
              </p>
            </div>
          </FadeInBlock>

          <div className="flex flex-col gap-xxl">
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

            <FadeInBlock delay={0.2}>
              <AssetCatalogMockup />
            </FadeInBlock>

            <FadeInBlock delay={0.3}>
              <div className="flex justify-center">
                <a className="button-primary-m" href="https://suite.snapsec.co/demo" target="_blank" rel="noopener noreferrer">
                  <span className="block">Explore ASM Live <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">→</span></span>
                </a>
              </div>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
