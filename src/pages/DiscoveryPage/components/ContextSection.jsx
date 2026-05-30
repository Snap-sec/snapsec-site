import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-[3px]">
      <circle cx="9" cy="9" r="8.5" stroke="#D9D9D9" strokeWidth="1" />
      <path d="M5.5 9L7.5 11L12.5 7" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// NHI context dashboard mockup
function ContextDashboardMockup() {
  const contextItems = [
    { key: 'Host',        value: 'api.acme.com',        type: 'Discovered Asset' },
    { key: 'WAF',         value: 'Cloudflare',           type: 'Protection Layer' },
    { key: 'ASN / Host',  value: 'AS13335 Cloudflare',   type: 'Infrastructure' },
    { key: 'Tech Stack',  value: 'Nginx, React, Vercel',  type: 'Technology' },
    { key: 'DNS Record',  value: 'CNAME → cf-proxy.net', type: 'DNS Mapping' },
    { key: 'Certificate', value: 'Expires in 14 days',   type: 'TLS Status' },
  ];

  const riskItems = [
    { label: 'Exposed SSH Port (22)',   severity: 'Critical', color: '#DC2626' },
    { label: 'Expired TLS Certificate', severity: 'High',     color: '#EA580C' },
    { label: 'Open Admin Panel',        severity: 'Medium',   color: '#CA8A04' },
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      border: '0.5px solid #D9D9D9',
      boxShadow: '0px 2px 2px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      fontFamily: "'PP Radio Grotesk', sans-serif",
    }}>
      {/* Topbar */}
      <div style={{
        display: 'flex', alignItems: 'center', height: '32px', padding: '0 12px',
        borderBottom: '0.5px solid #D9D9D9', background: '#FAFAFA', position: 'relative',
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['#D9D9D9', '#D9D9D9', '#D9D9D9'].map((c, i) => (
            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>suite.snapsec.co / asm / asset-catalog / api.acme.com</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        {/* Left: context fields */}
        <div style={{ padding: '16px', borderRight: '0.5px solid #F0F0F0' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', marginBottom: '12px' }}>
            ASSET CONTEXT
          </div>
          {contextItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              style={{
                display: 'flex', flexDirection: 'column', gap: '2px',
                padding: '8px 0',
                borderBottom: i < contextItems.length - 1 ? '0.5px solid #F5F5F5' : 'none',
              }}
            >
              <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 500 }}>{item.type}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#111827' }}>{item.key}</span>
                <span style={{ fontSize: '11px', color: '#6E6E6E', maxWidth: '160px', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: risk panel */}
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', marginBottom: '12px' }}>
            RISK FACTORS
          </div>
          {riskItems.map((risk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 10px',
                marginBottom: '8px',
                borderRadius: '6px',
                background: `${risk.color}0d`,
                border: `0.5px solid ${risk.color}33`,
              }}
            >
              <span style={{ fontSize: '12px', color: '#111827', fontWeight: 500 }}>{risk.label}</span>
              <span style={{
                fontSize: '10px', fontWeight: 600,
                padding: '2px 8px', borderRadius: '4px',
                background: `${risk.color}20`,
                color: risk.color,
              }}>
                {risk.severity}
              </span>
            </motion.div>
          ))}

          {/* Exposure scope */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', marginBottom: '8px' }}>
              EXPOSURE SCOPE
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['Subdomains: 4', 'IPs: 2', 'Ports: 6', 'Web Servers: 3', '+2 signals'].map((item, i) => (
                <span key={i} style={{
                  fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                  background: '#FEF2F2', color: '#DC2626',
                  border: '0.5px solid #FCA5A533',
                  fontWeight: 500,
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const contextItems = [
  { label: 'WAF detection — Cloudflare, Akamai, Fastly and more' },
  { label: 'ASN and hosting provider identification (AWS, GCP, Azure)' },
  { label: 'Technology fingerprinting — frameworks, CDN, analytics' },
  { label: 'DNS record type mapping (A, CNAME, MX, SOA)' },
  { label: 'Certificate validity, expiry timelines and domain associations' },
];

export default function ContextSection() {
  return (
    <section className="section-visibility-context">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-xl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">

          <FadeInBlock>
            <p className="large-paragraph-m mx-auto w-full text-center">
              ASM enriches every discovered asset with rich metadata — WAF provider, ASN, technology stack, DNS records, certificates and open ports — giving security teams instant context for faster investigation and prioritization.
            </p>
          </FadeInBlock>

          {/* Context list */}
          <div className="grid grid-cols-1 gap-sm lg:grid-cols-2 lg:gap-x-100px">
            {contextItems.map((item, i) => (
              <FadeInBlock key={i} delay={i * 0.08}>
                <div className="flex gap-xs items-start">
                  <CheckIcon />
                  <p className="body-text-m">{item.label}</p>
                </div>
              </FadeInBlock>
            ))}
          </div>

          {/* Dashboard mockup + closing text */}
          <div className="flex flex-col gap-md lg:gap-lg">
            <FadeInBlock delay={0.2}>
              <ContextDashboardMockup />
            </FadeInBlock>

            <FadeInBlock delay={0.3}>
              <p className="body-text-m mx-auto w-full  text-center text-gray-900">
                Rich asset context means security teams don't just see what's exposed — they understand why it matters, who owns it, and how to fix it. Actionable context drives faster remediation and smarter prioritization.
              </p>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
