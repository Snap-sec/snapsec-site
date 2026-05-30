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

const T = {
  bg: '#FFFFFF', panel: '#F9FAFB', border: '#E5E7EB', borderLight: '#F3F4F6',
  text: '#111827', textSec: '#6B7280', textMuted: '#9CA3AF',
  accent: '#7C3AED', critical: '#DC2626', high: '#EA580C',
  medium: '#CA8A04', low: '#2563EB', success: '#059669',
};

// ─── ASM Dashboard ───────────────────────────────────────
function ASMDashboard() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  // Real ASM key metrics (from docs: assets, signals, risk, exposure)
  const metrics = [
    { value: '3,412', label: 'Total Assets',     change: '+87 new',      up: true  },
    { value: '214',   label: 'Risk Signals',      change: '+12 active',   up: false },
    { value: '38',    label: 'Exposed Services',  change: '−5 resolved',  up: false },
    { value: '9',     label: 'Open Tickets',      change: '3 critical',   up: false },
  ];

  // Real asset distribution from docs: IP Addresses, Ports, Subdomains,
  // Technologies, Web Servers, Certificates, DNS Records
  const assetDist = [
    { label: 'Subdomains',    count: 1184, pct: 100, color: T.accent },
    { label: 'IP Addresses',  count:  632, pct: 53,  color: '#A78BFA' },
    { label: 'Ports',         count:  478, pct: 40,  color: '#C4B5FD' },
    { label: 'Web Servers',   count:  312, pct: 26,  color: '#DDD6FE' },
    { label: 'DNS Records',   count:  289, pct: 24,  color: '#EDE9FE' },
    { label: 'Certificates',  count:  201, pct: 17,  color: '#F5F3FF' },
    { label: 'Technologies',  count:  316, pct: 27,  color: '#8B5CF6' },
  ];

  // Real signal distribution from docs: DNS Records, IP Addresses, Ports, Web Servers
  const signalDist = [
    { label: 'Ports',         count: 94,  pct: 100, color: T.critical  },
    { label: 'Web Servers',   count: 61,  pct: 65,  color: T.high      },
    { label: 'IP Addresses',  count: 38,  pct: 40,  color: T.medium    },
    { label: 'DNS Records',   count: 21,  pct: 22,  color: T.low       },
  ];

  // Asset catalog rows — trimmed to 3 for compact display
  const assets = [
    { host: 'api.acme.com',          type: 'Subdomain',  waf: 'Cloudflare', ports: '443, 80',  exposed: true,  signals: 4 },
    { host: 'dev-portal.acme.net',   type: 'Subdomain',  waf: '—',          ports: '22, 3000', exposed: true,  signals: 7 },
    { host: '104.21.48.10',          type: 'IP Address', waf: 'AWS',        ports: '443',      exposed: true,  signals: 2 },
  ];

  // Attack surface posture chart data (side-by-side asset vs signal counts)
  const posture = [
    { label: 'Subdomains', assets: 1184, signals: 48 },
    { label: 'IPs',        assets:  632, signals: 38 },
    { label: 'Ports',      assets:  478, signals: 94 },
    { label: 'Web Svrs',   assets:  312, signals: 61 },
    { label: 'DNS',        assets:  289, signals: 21 },
  ];
  const maxAssets = 1184;

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: T.bg, borderRadius: '12px', border: `1px solid ${T.border}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}`, padding: '0 24px' }}>
          <div style={{ display: 'flex' }}>
            {['Dashboard', 'Asset Catalog', 'Risk Signals', 'Tickets', 'Scans', 'Reports'].map((tab, i) => (
              <div key={tab} style={{
                padding: '13px 14px 11px', fontSize: '13px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? T.text : T.textSec,
                borderBottom: i === 0 ? `2px solid ${T.text}` : '2px solid transparent',
                marginBottom: '-1px', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>{tab}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.success, boxShadow: `0 0 0 3px #D1FAE5` }} />
            <span style={{ fontSize: 11, color: T.textSec, fontWeight: 500 }}>Live · Scan 6m ago</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '14px 20px' }}>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '10px', marginBottom: '14px' }}>
            {metrics.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${T.borderLight}`, background: T.panel }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: T.textSec, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: T.text, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: m.up ? T.success : T.critical }}>
                    {m.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Three-column: Asset Dist | Signal Dist | Posture ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '10px', marginBottom: '14px' }}>

            {/* Asset Distribution */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T.borderLight}`, background: T.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T.text, marginBottom: '4px' }}>Asset Distribution</div>
              <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '16px' }}>By infrastructure type</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {assetDist.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.07 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', color: T.textSec, fontWeight: 500 }}>{item.label}</span>
                      <span style={{ fontSize: '11px', color: T.text, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{item.count.toLocaleString()}</span>
                    </div>
                    <div style={{ height: '4px', background: T.borderLight, borderRadius: 99 }}>
                      <motion.div
                        initial={{ width: 0 }} animate={inView ? { width: `${item.pct}%` } : {}}
                        transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                        style={{ height: '100%', background: item.color, borderRadius: 99 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Signal Distribution */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ padding: '18px', borderRadius: '8px', border: `1px solid ${T.borderLight}`, background: T.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T.text, marginBottom: '4px' }}>Signal Distribution</div>
              <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '16px' }}>Active risk signals by layer</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {signalDist.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', color: T.textSec, fontWeight: 500 }}>{item.label}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}>{item.count} signals</span>
                    </div>
                    <div style={{ height: '4px', background: T.borderLight, borderRadius: 99 }}>
                      <motion.div
                        initial={{ width: 0 }} animate={inView ? { width: `${item.pct}%` } : {}}
                        transition={{ duration: 0.9, delay: 0.65 + i * 0.08, ease: 'easeOut' }}
                        style={{ height: '100%', background: item.color, borderRadius: 99, opacity: 0.8 }} />
                    </div>
                  </motion.div>
                ))}
                <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: `1px solid ${T.borderLight}`, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Total Signals</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: T.text, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>214</span>
                </div>
              </div>
            </motion.div>

            {/* Attack Surface Posture */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
              style={{ padding: '18px', borderRadius: '8px', border: `1px solid ${T.borderLight}`, background: T.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T.text, marginBottom: '4px' }}>Attack Surface Posture</div>
              <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '16px' }}>Assets vs signals per layer</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {posture.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.65 + i * 0.08 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', color: T.textSec, fontWeight: 500, width: '52px', flexShrink: 0 }}>{item.label}</span>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {/* Assets bar */}
                        <div style={{ height: '5px', background: T.borderLight, borderRadius: 99 }}>
                          <motion.div
                            initial={{ width: 0 }} animate={inView ? { width: `${(item.assets / maxAssets) * 100}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.7 + i * 0.08 }}
                            style={{ height: '100%', background: T.accent, borderRadius: 99, opacity: 0.7 }} />
                        </div>
                        {/* Signals bar */}
                        <div style={{ height: '5px', background: T.borderLight, borderRadius: 99 }}>
                          <motion.div
                            initial={{ width: 0 }} animate={inView ? { width: `${Math.min((item.signals / maxAssets) * 100 * 8, 100)}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.75 + i * 0.08 }}
                            style={{ height: '100%', background: T.critical, borderRadius: 99, opacity: 0.7 }} />
                        </div>
                      </div>
                      <span style={{ fontSize: '10px', color: T.textMuted, width: '24px', textAlign: 'right', flexShrink: 0 }}>{item.signals}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 4, borderRadius: 2, background: T.accent, opacity: 0.7, display: 'inline-block' }} />
                  <span style={{ fontSize: '10px', color: T.textMuted }}>Assets</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 4, borderRadius: 2, background: T.critical, opacity: 0.7, display: 'inline-block' }} />
                  <span style={{ fontSize: '10px', color: T.textMuted }}>Signals</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Asset Catalog Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ borderRadius: '8px', border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr',
              padding: '9px 20px', background: T.panel, borderBottom: `1px solid ${T.borderLight}`,
            }}>
              {['HOST', 'TYPE', 'WAF', 'OPEN PORTS', 'EXPOSED', 'SIGNALS'].map(h => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: T.textMuted, letterSpacing: '0.06em' }}>{h}</span>
              ))}
            </div>
            {assets.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.82 + i * 0.06 }}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr',
                  padding: '10px 20px', background: '#fff', alignItems: 'center',
                  borderBottom: i < assets.length - 1 ? `1px solid ${T.borderLight}` : 'none',
                }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: T.text, fontFamily: "'SF Mono','Fira Code',monospace", letterSpacing: '-0.01em' }}>
                  {a.host}
                </span>
                <span style={{ fontSize: '11px', color: T.textSec }}>{a.type}</span>
                <span style={{ fontSize: '11px', color: T.textSec }}>{a.waf}</span>
                <span style={{ fontSize: '11px', color: T.textSec, fontFamily: "'SF Mono','Fira Code',monospace" }}>{a.ports}</span>
                <span style={{
                  fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', display: 'inline-block', width: 'fit-content',
                  background: a.exposed ? '#FEF2F2' : '#F0FDF4', color: a.exposed ? T.critical : T.success,
                }}>
                  {a.exposed ? 'Yes' : 'No'}
                </span>
                <span style={{
                  fontSize: '12px', fontWeight: 700, color: a.signals > 3 ? T.critical : a.signals > 0 ? T.medium : T.textMuted,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {a.signals}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// ─── Default NHI Graph ───────────────────────────────────
function NHIGraphCanvas() {
  const nodes = [
    { id: 'aws',       label: 'AWS IAM',   x: 80,  y: 60,  color: '#FF9900', size: 10 },
    { id: 'github',    label: 'GitHub',    x: 220, y: 40,  color: '#24292E', size: 8  },
    { id: 'okta',      label: 'Okta',      x: 360, y: 70,  color: '#007DC1', size: 9  },
    { id: 'gcp',       label: 'GCP',       x: 500, y: 45,  color: '#4285F4', size: 8  },
    { id: 'azure',     label: 'Azure',     x: 580, y: 90,  color: '#0089D6', size: 7  },
    { id: 'core',      label: 'NHI Hub',   x: 310, y: 145, color: '#004DFF', size: 14 },
    { id: 'vault',     label: 'Vault',     x: 160, y: 170, color: '#000',    size: 7  },
    { id: 'k8s',       label: 'K8s',       x: 440, y: 180, color: '#326CE5', size: 7  },
    { id: 'jenkins',   label: 'Jenkins',   x: 60,  y: 200, color: '#D33833', size: 6  },
    { id: 'terraform', label: 'Terraform', x: 550, y: 200, color: '#7B42BC', size: 6  },
  ];
  const edges = [
    ['core','aws'],['core','github'],['core','okta'],['core','gcp'],
    ['core','azure'],['core','vault'],['core','k8s'],
    ['aws','jenkins'],['github','jenkins'],['k8s','terraform'],['aws','github'],['okta','gcp'],
  ];
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });
  return (
    <svg viewBox="0 0 632 260" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
      </pattern>
      <rect width="632" height="260" fill="url(#grid)" opacity="0.6" />
      {edges.map(([from, to], i) => {
        const f = nodeMap[from], t = nodeMap[to];
        return <motion.line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y}
          stroke="#D9D9D9" strokeWidth="1" strokeDasharray="4 3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.05 }} />;
      })}
      {nodes.map((node, i) => (
        <motion.g key={node.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 200 }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
          <circle cx={node.x} cy={node.y} r={node.size + 4} fill={node.color} fillOpacity="0.1" />
          <circle cx={node.x} cy={node.y} r={node.size} fill={node.color} />
          <text x={node.x} y={node.y + node.size + 11} textAnchor="middle" fontSize="9" fontWeight="500"
            fill="#6E6E6E" fontFamily="'PP Radio Grotesk', sans-serif">{node.label}</text>
        </motion.g>
      ))}
      <motion.circle cx={nodeMap['core'].x} cy={nodeMap['core'].y} r="22"
        fill="none" stroke="#004DFF" strokeWidth="1.5" strokeOpacity="0.4"
        animate={{ r: [22, 34, 22], strokeOpacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
    </svg>
  );
}

export default function HeroSection({ moduleSlug, mod }) {
  const heading = mod ? mod.name : 'Discovery & Inventory';
  const subtitle = mod
    ? mod.tagline
    : 'Automatically discovers and correlates all Non-Human Identities into a contextualized inventory';

  return (
    <div className="mt-120px lg:mt-140px">
      <div className="container">
        <div className="section-border flex flex-col gap-md px-sm pb-xxl sm:px-xl lg:gap-lg lg:px-80px lg:pb-xxl">

          <FadeInBlock delay={0}>
            <div className="mx-auto flex max-w-[734px] flex-col items-center gap-sm text-center lg:gap-md">
              <h1 className="heading-h1 text-black whitespace-nowrap">{heading}</h1>
              <p className="subtitle-m w-full max-w-[520px] text-gray-900 text-center">{subtitle}</p>
            </div>
          </FadeInBlock>

          <motion.div
            className="w-full lg:mx-auto lg:max-w-[900px] midlg:max-w-[1100px]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {moduleSlug === 'asm' ? (
              <ASMDashboard />
            ) : (
              <div className="aspect-[632/260] w-full rounded-[12px] border border-gray-300 bg-white overflow-hidden">
                <NHIGraphCanvas />
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
