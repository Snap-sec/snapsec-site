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

// ─── WAS Dashboard ───────────────────────────────────────
function WASDashboard() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  const metrics = [
    { value: '842',   label: 'Endpoints Scanned', change: '+34 new',      up: true  },
    { value: '27',    label: 'Vulnerabilities',   change: '4 critical',   up: false },
    { value: '96.4%', label: 'Scan Coverage',     change: '+1.2% growth', up: true  },
    { value: '312ms', label: 'Avg Response',      change: 'stable',       up: true  },
  ];

  const segments = [
    { label: 'Injection',      count: 12, pct: 44, color: '#D97706', offset: 25 },
    { label: 'Broken Auth',     count: 6,  pct: 22, color: '#F59E0B', offset: 81 },
    { label: 'SSRF / XXE',      count: 4,  pct: 15, color: '#FBBF24', offset: 59 },
    { label: 'Security Config', count: 3,  pct: 11, color: '#FDE68A', offset: 44 },
    { label: 'Broken Access',   count: 2,  pct: 8,  color: '#FEF3C7', offset: 33 },
  ];

  const scanCoverage = [
    { name: 'SQL Injection', status: 'Passed', color: '#10B981', code: 'SQLI' },
    { name: 'Cross-Site Scripting', status: '8 High', color: '#EA580C', code: 'XSS' },
    { name: 'Broken Auth & Sessions', status: '6 Critical', color: '#DC2626', code: 'AUTH' },
    { name: 'SSRF & XXE Protection', status: '2 Medium', color: '#CA8A04', code: 'SSRF' },
    { name: 'Security Headers', status: 'Passed', color: '#10B981', code: 'HDRS' },
    { name: 'Access Control (IDOR)', status: 'Passed', color: '#10B981', code: 'IDOR' },
  ];

  const latencyData = [
    { ms: 142, label: '01' },
    { ms: 284, label: '02' },
    { ms: 96,  label: '03' },
    { ms: 350, label: '04' },
    { ms: 120, label: '05' },
    { ms: 410, label: '06' },
    { ms: 180, label: '07' },
    { ms: 290, label: '08' },
    { ms: 94,  label: '09' },
    { ms: 150, label: '10' },
    { ms: 312, label: '11' },
    { ms: 220, label: '12' },
  ];
  const maxLatency = 450;

  const endpoints = [
    { path: 'POST /v1/auth/login',     method: 'DAST Active',  coverage: '100%', time: '142ms', risk: 'Critical', issues: 3 },
    { path: 'GET /v2/checkout/cart',   method: 'DAST Active',  coverage: '94%',  time: '284ms', risk: 'High',     issues: 2 },
    { path: 'GET /v1/users/profile',   method: 'Passive Only', coverage: '100%', time: '88ms',  risk: 'Passed',   issues: 0 },
  ];

  const T_WAS = {
    bg: '#FFFFFF', panel: '#F9FAFB', border: '#E5E7EB', borderLight: '#F3F4F6',
    text: '#111827', textSec: '#6B7280', textMuted: '#9CA3AF',
    accent: '#D97706', critical: '#DC2626', high: '#EA580C',
    medium: '#CA8A04', low: '#2563EB', success: '#059669',
  };

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: T_WAS.bg, borderRadius: '12px', border: `1px solid ${T_WAS.border}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T_WAS.border}`, padding: '0 24px' }}>
          <div style={{ display: 'flex' }}>
            {['Dashboard', 'APIs & Web Apps', 'Dynamic Scans', 'Vulnerabilities', 'Coverage', 'Reports'].map((tab, i) => (
              <div key={tab} style={{
                padding: '13px 14px 11px', fontSize: '13px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? T_WAS.text : T_WAS.textSec,
                borderBottom: i === 0 ? `2px solid ${T_WAS.text}` : '2px solid transparent',
                marginBottom: '-1px', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>{tab}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T_WAS.success, boxShadow: `0 0 0 3px #D1FAE5` }} />
            <span style={{ fontSize: 11, color: T_WAS.textSec, fontWeight: 500 }}>Live · Scan 12m ago</span>
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
                style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${T_WAS.borderLight}`, background: T_WAS.panel }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: T_WAS.textSec, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: T_WAS.text, fontFamily: "'Inter', sans-serif", lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: m.up ? T_WAS.success : T_WAS.critical }}>
                    {m.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Three-column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '10px', marginBottom: '14px' }}>

            {/* Column 1: CWE Distribution Donut Chart */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_WAS.borderLight}`, background: T_WAS.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_WAS.text, marginBottom: '4px' }}>CWE Distribution</div>
              <div style={{ fontSize: '11px', color: T_WAS.textMuted, marginBottom: '16px' }}>Vulnerabilities by category</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg width="130" height="130" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="#E5E7EB" strokeWidth="4.5" />
                    {segments.map((item, idx) => (
                      <circle
                        key={idx}
                        cx="20"
                        cy="20"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="4.5"
                        strokeDasharray={`${item.pct} ${100 - item.pct}`}
                        strokeDashoffset={item.offset}
                      />
                    ))}
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif"
                  }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: T_WAS.text, lineHeight: 1 }}>27</span>
                    <span style={{ fontSize: '10px', color: T_WAS.textSec, fontWeight: 500 }}>Issues</span>
                  </div>
                </div>
                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {segments.slice(0, 4).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '10px', color: T_WAS.textSec, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column 2: Vulnerability Triage Grid */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ padding: '16px', borderRadius: '8px', border: `1px solid ${T_WAS.borderLight}`, background: T_WAS.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_WAS.text, marginBottom: '4px' }}>DAST Scanning Grid</div>
              <div style={{ fontSize: '11px', color: T_WAS.textMuted, marginBottom: '14px' }}>Rule status & test results</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {scanCoverage.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 5 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    style={{
                      padding: '8px', borderRadius: '6px', border: `1px solid ${T_WAS.borderLight}`,
                      background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: T_WAS.textMuted, letterSpacing: '0.04em' }}>{item.code}</span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color }} />
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: T_WAS.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                    <div style={{ fontSize: '10px', color: item.status === 'Passed' ? T_WAS.success : T_WAS.critical, fontWeight: 700 }}>{item.status}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Column 3: DAST Response Latency Profile */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
              style={{ padding: '16px', borderRadius: '8px', border: `1px solid ${T_WAS.borderLight}`, background: T_WAS.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_WAS.text, marginBottom: '4px' }}>Scan Latency Profile</div>
              <div style={{ fontSize: '11px', color: T_WAS.textMuted, marginBottom: '20px' }}>Response time of last 12 dynamic requests</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '100px', padding: '0 4px', borderBottom: `1px solid ${T_WAS.borderLight}` }}>
                {latencyData.map((item, i) => {
                  const pct = (item.ms / maxLatency) * 100;
                  const isHigh = item.ms > 300;
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '6%', gap: '4px' }}>
                      <div style={{ position: 'relative', width: '100%', height: '80px', display: 'flex', alignItems: 'flex-end' }}>
                        <motion.div
                          initial={{ height: 0 }} animate={inView ? { height: `${pct}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.6 + i * 0.04 }}
                          style={{
                            width: '100%', borderRadius: '2px 2px 0 0',
                            backgroundColor: isHigh ? '#F59E0B' : '#D97706', opacity: 0.8
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '8px', color: T_WAS.textMuted }}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: T_WAS.textSec, fontWeight: 500 }}>Average Latency</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: T_WAS.text }}>312ms</span>
              </div>
            </motion.div>

          </div>

          {/* ── API Endpoint Catalog Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ borderRadius: '8px', border: `1px solid ${T_WAS.borderLight}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr',
              padding: '9px 20px', background: T_WAS.panel, borderBottom: `1px solid ${T_WAS.borderLight}`,
            }}>
              {['ENDPOINT', 'METHOD', 'COVERAGE', 'RESPONSE TIME', 'STATUS', 'ISSUES'].map(h => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: T_WAS.textMuted, letterSpacing: '0.06em' }}>{h}</span>
              ))}
            </div>
            {endpoints.map((ep, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.82 + i * 0.06 }}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr',
                  padding: '10px 20px', background: '#fff', alignItems: 'center',
                  borderBottom: i < endpoints.length - 1 ? `1px solid ${T_WAS.borderLight}` : 'none',
                }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: T_WAS.text, fontFamily: "'SF Mono','Fira Code',monospace", letterSpacing: '-0.01em' }}>
                  {ep.path}
                </span>
                <span style={{ fontSize: '11px', color: T_WAS.textSec }}>{ep.method}</span>
                <span style={{ fontSize: '11px', color: T_WAS.textSec }}>{ep.coverage}</span>
                <span style={{ fontSize: '11px', color: T_WAS.textSec, fontFamily: "'SF Mono','Fira Code',monospace" }}>{ep.time}</span>
                <span style={{
                  fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', display: 'inline-block', width: 'fit-content',
                  background: ep.risk === 'Critical' || ep.risk === 'High' ? '#FEF2F2' : '#F0FDF4', color: ep.risk === 'Critical' || ep.risk === 'High' ? T_WAS.critical : T_WAS.success,
                }}>
                  {ep.risk}
                </span>
                <span style={{
                  fontSize: '12px', fontWeight: 700, color: ep.issues > 0 ? T_WAS.critical : T_WAS.textMuted,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {ep.issues}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// ─── AIM Dashboard ───────────────────────────────────────
function AIMDashboard() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  const metrics = [
    { value: '14',      label: 'Cloud Adapters',   change: '+2 new',        up: true  },
    { value: '12,481',  label: 'Ingested Assets',  change: '+142 synced',   up: true  },
    { value: '1,842',   label: 'Matched Vulns',    change: '98.4% linked',  up: true  },
    { value: 'Healthy', label: 'Ecosystem Sync',   change: '99.9% uptime',  up: true  },
  ];

  const cloudAdapters = [
    { provider: 'Amazon Web Services', assets: 4124, status: 'Synced', color: '#10B981', code: 'AWS' },
    { provider: 'Google Cloud Platform', assets: 1842, status: 'Synced', color: '#10B981', code: 'GCP' },
    { provider: 'Microsoft Azure', assets: 3110, status: 'Syncing', color: '#CA8A04', code: 'AZR' },
    { provider: 'Kubernetes Cluster', assets: 2457, status: 'Synced', color: '#10B981', code: 'K8S' },
  ];

  const riskMatrix = [
    { label: '96',   bg: '#FEF3C7', color: '#D97706' },
    { label: '42',   bg: '#FEE2E2', color: '#EF4444' },
    { label: '18',   bg: '#7F1D1D', color: '#FFFFFF' },
    { label: '420',  bg: '#DBEAFE', color: '#2563EB' },
    { label: '110',  bg: '#FEF3C7', color: '#D97706' },
    { label: '29',   bg: '#FEE2E2', color: '#EF4444' },
    { label: '1.2k', bg: '#D1FAE5', color: '#059669' },
    { label: '72',   bg: '#DBEAFE', color: '#2563EB' },
    { label: '8',    bg: '#FEF3C7', color: '#D97706' }
  ];

  const vulnerabilitySources = [
    { source: 'Snyk Ingestion', issues: 812, pct: 100, color: '#4F46E5' },
    { source: 'Trivy Registry Scans', issues: 416, pct: 51, color: '#06B6D4' },
    { source: 'Dependabot Security', issues: 384, pct: 47, color: '#004DFF' },
    { source: 'Snapsec WAS Scanner', issues: 230, pct: 28, color: '#D97706' },
  ];

  const assets = [
    { name: 'prod-eks-cluster-01', provider: 'AWS K8s', integrity: 'Passed', locked: 'Yes', vulns: '3 Crit, 12 High' },
    { name: 'customer-db-primary', provider: 'AWS RDS', integrity: 'Passed', locked: 'Yes', vulns: 'None' },
    { name: 'payment-gateway-api', provider: 'GCP Cloud Run', integrity: 'Verify', locked: 'No', vulns: '4 High, 8 Med' },
  ];

  const T_AIM = {
    bg: '#FFFFFF', panel: '#F9FAFB', border: '#E5E7EB', borderLight: '#F3F4F6',
    text: '#111827', textSec: '#6B7280', textMuted: '#9CA3AF',
    accent: '#004DFF', critical: '#DC2626', high: '#EA580C',
    medium: '#CA8A04', low: '#2563EB', success: '#059669',
  };

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: T_AIM.bg, borderRadius: '12px', border: `1px solid ${T_AIM.border}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T_AIM.border}`, padding: '0 24px' }}>
          <div style={{ display: 'flex' }}>
            {['Dashboard', 'Ecosystem Connectors', 'Asset Catalog', 'Risk Aggregation', 'SLA Tracking', 'Reports'].map((tab, i) => (
              <div key={tab} style={{
                padding: '13px 14px 11px', fontSize: '13px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? T_AIM.text : T_AIM.textSec,
                borderBottom: i === 0 ? `2px solid ${T_AIM.text}` : '2px solid transparent',
                marginBottom: '-1px', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>{tab}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T_AIM.success, boxShadow: `0 0 0 3px #D1FAE5` }} />
            <span style={{ fontSize: 11, color: T_AIM.textSec, fontWeight: 500 }}>Live · Connected 4m ago</span>
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
                style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${T_AIM.borderLight}`, background: T_AIM.panel }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: T_AIM.textSec, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: T_AIM.text, fontFamily: "'Inter', sans-serif", lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: m.change.includes('-') || m.change.includes('Failed') ? T_AIM.critical : T_AIM.success }}>
                    {m.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Three-column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '10px', marginBottom: '14px' }}>

            {/* Column 1: Ecosystem Cloud Adapters */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_AIM.borderLight}`, background: T_AIM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_AIM.text, marginBottom: '4px' }}>Cloud Connectors</div>
              <div style={{ fontSize: '11px', color: T_AIM.textMuted, marginBottom: '12px' }}>Infra discovery agents</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cloudAdapters.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between',
                    padding: '8px 10px', borderRadius: '6px', border: `1px solid ${T_AIM.borderLight}`, background: '#FFFFFF',
                    width: '100%'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: T_AIM.text }}>{item.provider}</span>
                      <span style={{ fontSize: '9px', color: T_AIM.textMuted }}>{item.assets.toLocaleString()} assets found</span>
                    </div>
                    <span style={{
                      fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                      backgroundColor: item.status === 'Synced' ? '#F0FDF4' : item.status === 'Syncing' ? '#FEF3C7' : '#FEF2F2',
                      color: item.color
                    }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Asset Risk Density Matrix */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ padding: '14px', borderRadius: '8px', border: `1px solid ${T_AIM.borderLight}`, background: T_AIM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_AIM.text, marginBottom: '4px' }}>Asset Risk Heatmap</div>
              <div style={{ fontSize: '11px', color: T_AIM.textMuted, marginBottom: '14px' }}>Asset Criticality vs Vuln Severity</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr', gap: '4px', textAlign: 'center', alignItems: 'center' }}>
                <span />
                <span style={{ fontSize: '8px', fontWeight: 600, color: T_AIM.textMuted }}>Low</span>
                <span style={{ fontSize: '8px', fontWeight: 600, color: T_AIM.textMuted }}>Med</span>
                <span style={{ fontSize: '8px', fontWeight: 600, color: T_AIM.textMuted }}>High</span>

                <span style={{ fontSize: '8px', fontWeight: 600, color: T_AIM.textMuted }}>H-Crit</span>
                {riskMatrix.slice(0, 3).map((item, idx) => (
                  <div key={idx} style={{ background: item.bg, padding: '10px 0', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: item.color }}>{item.label}</div>
                ))}

                <span style={{ fontSize: '8px', fontWeight: 600, color: T_AIM.textMuted }}>M-Crit</span>
                {riskMatrix.slice(3, 6).map((item, idx) => (
                  <div key={idx} style={{ background: item.bg, padding: '10px 0', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: item.color }}>{item.label}</div>
                ))}

                <span style={{ fontSize: '8px', fontWeight: 600, color: T_AIM.textMuted }}>L-Crit</span>
                {riskMatrix.slice(6, 9).map((item, idx) => (
                  <div key={idx} style={{ background: item.bg, padding: '10px 0', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: item.color }}>{item.label}</div>
                ))}
              </div>
            </motion.div>

            {/* Column 3: Vuln Aggregation Sources */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_AIM.borderLight}`, background: T_AIM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_AIM.text, marginBottom: '4px' }}>Aggregated Scanners</div>
              <div style={{ fontSize: '11px', color: T_AIM.textMuted, marginBottom: '16px' }}>Vulnerabilities mapped by origin</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {vulnerabilitySources.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', color: T_AIM.textSec, fontWeight: 500 }}>{item.source}</span>
                      <span style={{ fontSize: '11px', color: T_AIM.text, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{item.issues} Issues</span>
                    </div>
                    <div style={{ height: '4px', background: T_AIM.borderLight, borderRadius: 99 }}>
                      <motion.div
                        initial={{ width: 0 }} animate={inView ? { width: `${item.pct}%` } : {}}
                        transition={{ duration: 0.9, delay: 0.65 + i * 0.08, ease: 'easeOut' }}
                        style={{ height: '100%', background: item.color, borderRadius: 99 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Asset Catalog Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ borderRadius: '8px', border: `1px solid ${T_AIM.borderLight}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1.4fr',
              padding: '9px 20px', background: T_AIM.panel, borderBottom: `1px solid ${T_AIM.borderLight}`,
            }}>
              {['ASSET NAME', 'ADAPTER', 'INTEGRITY', 'SECRET LOCKED', 'AGGREGATED VULNS'].map(h => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: T_AIM.textMuted, letterSpacing: '0.06em' }}>{h}</span>
              ))}
            </div>
            {assets.map((ast, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.82 + i * 0.06 }}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1.4fr',
                  padding: '10px 20px', background: '#fff', alignItems: 'center',
                  borderBottom: i < assets.length - 1 ? `1px solid ${T_AIM.borderLight}` : 'none',
                }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: T_AIM.text, fontFamily: "'SF Mono','Fira Code',monospace", letterSpacing: '-0.01em' }}>
                  {ast.name}
                </span>
                <span style={{ fontSize: '11px', color: T_AIM.textSec }}>{ast.provider}</span>
                <span style={{
                  fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', display: 'inline-block', width: 'fit-content',
                  background: ast.integrity === 'Passed' ? '#F0FDF4' : '#FFFBEB', color: ast.integrity === 'Passed' ? T_AIM.success : T_AIM.medium
                }}>
                  {ast.integrity}
                </span>
                <span style={{ fontSize: '11px', color: T_AIM.textSec }}>{ast.locked}</span>
                <span style={{
                  fontSize: '12px', fontWeight: 700, color: ast.vulns.includes('Crit') || ast.vulns.includes('High') ? T_AIM.critical : T_AIM.textMuted,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {ast.vulns}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// ─── VS Dashboard ────────────────────────────────────────
function VSDashboard() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  const metrics = [
    { value: '8',       label: 'Scanner Agents',   change: '100% online',   up: true  },
    { value: '1,420',   label: 'Scanned Targets',  change: '+12 IPs/Subs',  up: true  },
    { value: '342',     label: 'Open Ports',       change: '8 crit ports',  up: false },
    { value: '98',      label: 'Open Vulns',       change: '14 critical',   up: false },
  ];

  const segments = [
    { label: 'Critical', count: 14, pct: 14, color: '#DC2626', offset: 25 },
    { label: 'High',     count: 28, pct: 29, color: '#EA580C', offset: 11 },
    { label: 'Medium',   count: 42, pct: 43, color: '#CA8A04', offset: 82 },
    { label: 'Low',      count: 14, pct: 14, color: '#2563EB', offset: 39 },
  ];

  const livePorts = [
    { port: '22', service: 'SSH', status: 'Filtered', color: '#CA8A04' },
    { port: '80', service: 'HTTP', status: 'Open', color: '#DC2626' },
    { port: '443', service: 'HTTPS', status: 'Open', color: '#059669' },
    { port: '3389', service: 'RDP', status: 'Closed', color: '#9CA3AF' },
    { port: '3306', service: 'MySQL', status: 'Filtered', color: '#CA8A04' },
    { port: '5432', service: 'Postgres', status: 'Closed', color: '#9CA3AF' },
    { port: '8080', service: 'Alt-HTTP', status: 'Open', color: '#DC2626' },
    { port: '27017', service: 'Mongo', status: 'Closed', color: '#9CA3AF' },
  ];

  const targets = [
    { target: 'api.snapsec.co',   ip: '104.244.42.1',   ports: '80, 443',     time: '20m ago', security: '1 Crit, 2 Med' },
    { target: '108.161.12.44',    ip: '108.161.12.44',  ports: '22, 80, 443', time: '1h ago',  security: 'Passed' },
    { target: 'staging.snapsec',  ip: '108.161.12.98',  ports: '8080',        time: '3h ago',  security: '1 High' },
  ];

  const T_VS = {
    bg: '#FFFFFF', panel: '#F9FAFB', border: '#E5E7EB', borderLight: '#F3F4F6',
    text: '#111827', textSec: '#6B7280', textMuted: '#9CA3AF',
    accent: '#059669', critical: '#DC2626', high: '#EA580C',
    medium: '#CA8A04', low: '#2563EB', success: '#059669',
  };

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: T_VS.bg, borderRadius: '12px', border: `1px solid ${T_VS.border}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T_VS.border}`, padding: '0 24px' }}>
          <div style={{ display: 'flex' }}>
            {['Dashboard', 'Scanner Agents', 'Targets Catalog', 'Exposure Map', 'Scan Schedules', 'Reports'].map((tab, i) => (
              <div key={tab} style={{
                padding: '13px 14px 11px', fontSize: '13px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? T_VS.text : T_VS.textSec,
                borderBottom: i === 0 ? `2px solid ${T_VS.text}` : '2px solid transparent',
                marginBottom: '-1px', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>{tab}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T_VS.success, boxShadow: `0 0 0 3px #D1FAE5` }} />
            <span style={{ fontSize: 11, color: T_VS.textSec, fontWeight: 500 }}>Live · 8 agents running</span>
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
                style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${T_VS.borderLight}`, background: T_VS.panel }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: T_VS.textSec, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: T_VS.text, fontFamily: "'Inter', sans-serif", lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: m.up ? T_VS.success : T_VS.critical }}>
                    {m.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Three-column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '10px', marginBottom: '14px' }}>

            {/* Column 1: Severity Distribution Donut Chart */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VS.borderLight}`, background: T_VS.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VS.text, marginBottom: '4px' }}>Severity Distribution</div>
              <div style={{ fontSize: '11px', color: T_VS.textMuted, marginBottom: '16px' }}>Vulnerabilities by criticality level</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg width="130" height="130" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="#E5E7EB" strokeWidth="4.5" />
                    {segments.map((item, idx) => (
                      <circle
                        key={idx}
                        cx="20"
                        cy="20"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="4.5"
                        strokeDasharray={`${item.pct} ${100 - item.pct}`}
                        strokeDashoffset={item.offset}
                      />
                    ))}
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif"
                  }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: T_VS.text, lineHeight: 1 }}>98</span>
                    <span style={{ fontSize: '10px', color: T_VS.textSec, fontWeight: 500 }}>Vulns</span>
                  </div>
                </div>
                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {segments.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '10px', color: T_VS.textSec, whiteSpace: 'nowrap' }}>{item.label} ({item.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column 2: Scan Activity Line Chart */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VS.borderLight}`, background: T_VS.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VS.text, marginBottom: '4px' }}>Scan Activity Trend</div>
              <div style={{ fontSize: '11px', color: T_VS.textMuted, marginBottom: '16px' }}>Network scans performed daily</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <svg width="100%" height="90" viewBox="0 0 200 90" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="vsAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  <line x1="10" y1="15" x2="190" y2="15" stroke={T_VS.borderLight} strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="10" y1="45" x2="190" y2="45" stroke={T_VS.borderLight} strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="10" y1="75" x2="190" y2="75" stroke={T_VS.borderLight} strokeWidth="1" strokeDasharray="3 3" />
                  
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    d="M 10 75 L 35 55 L 60 65 L 85 30 L 110 45 L 135 20 L 160 35 L 190 60 L 190 75 L 10 75 Z"
                    fill="url(#vsAreaGrad)"
                  />
                  
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    d="M 10 75 L 35 55 L 60 65 L 85 30 L 110 45 L 135 20 L 160 35 L 190 60"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {[
                    { x: 10, y: 75 }, { x: 35, y: 55 }, { x: 60, y: 65 },
                    { x: 85, y: 30 }, { x: 110, y: 45 }, { x: 135, y: 20 },
                    { x: 160, y: 35 }, { x: 190, y: 60 }
                  ].map((pt, idx) => (
                    <circle key={idx} cx={pt.x} cy={pt.y} r="2.5" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" />
                  ))}
                </svg>
                
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 4px', fontSize: '9px', color: T_VS.textMuted }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today'].map(day => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column 3: Live Port Scan Matrix */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VS.borderLight}`, background: T_VS.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VS.text, marginBottom: '4px' }}>Port Status Matrix</div>
              <div style={{ fontSize: '11px', color: T_VS.textMuted, marginBottom: '14px' }}>Key network services check</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px' }}>
                {livePorts.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '6px 4px', borderRadius: '6px', border: `1px solid ${T_VS.borderLight}`, background: '#FFFFFF',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: T_VS.text }}>{item.port}</span>
                    <span style={{ fontSize: '8px', color: T_VS.textMuted, textTransform: 'uppercase', marginBottom: '4px' }}>{item.service}</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: T_VS.textSec, fontWeight: 500 }}>Live scanning subnet...</span>
                <span style={{ fontSize: '10px', fontWeight: 600, color: T_VS.success }}>86% complete</span>
              </div>
            </motion.div>

          </div>

          {/* ── Targets Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ borderRadius: '8px', border: `1px solid ${T_VS.borderLight}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1.3fr',
              padding: '9px 20px', background: T_VS.panel, borderBottom: `1px solid ${T_VS.borderLight}`,
            }}>
              {['TARGET HOST/IP', 'IP ADDRESS', 'OPEN PORTS', 'LAST SCANNED', 'SECURITY RESULTS'].map(h => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: T_VS.textMuted, letterSpacing: '0.06em' }}>{h}</span>
              ))}
            </div>
            {targets.map((tgt, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.82 + i * 0.06 }}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1.3fr',
                  padding: '10px 20px', background: '#fff', alignItems: 'center',
                  borderBottom: i < targets.length - 1 ? `1px solid ${T_VS.borderLight}` : 'none',
                }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: T_VS.text, fontFamily: "'SF Mono','Fira Code',monospace", letterSpacing: '-0.01em' }}>
                  {tgt.target}
                </span>
                <span style={{ fontSize: '11px', color: T_VS.textSec, fontFamily: "'SF Mono','Fira Code',monospace" }}>{tgt.ip}</span>
                <span style={{ fontSize: '11px', color: T_VS.textSec }}>{tgt.ports}</span>
                <span style={{ fontSize: '11px', color: T_VS.textSec }}>{tgt.time}</span>
                <span style={{
                  fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', display: 'inline-block', width: 'fit-content',
                  background: tgt.security === 'Passed' ? '#F0FDF4' : '#FEF2F2', color: tgt.security === 'Passed' ? T_VS.success : T_VS.critical
                }}>
                  {tgt.security}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// ─── VM Dashboard ────────────────────────────────────────
function VMDashboard() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  const metrics = [
    { value: '58',      label: 'Connected Sources', change: 'Qualys, Trivy...',  up: true  },
    { value: '4,180',   label: 'Aggregated Vulns',  change: '-340 resolved',   up: true  },
    { value: '12',      label: 'SLA Breaches Risk', change: '24h remaining',   up: false },
    { value: '72.4%',   label: 'Auto-Remediation',  change: '3,026 auto-closed',up: true  },
  ];

  const scannerConnectors = [
    { name: 'Qualys Cloud Scanner', type: 'Infra Scanning', status: 'Connected', code: 'QLS', color: '#004DFF' },
    { name: 'Trivy Registry Scans', type: 'Container Image', status: 'Connected', code: 'TRV', color: '#059669' },
    { name: 'Snyk API Ingestion',  type: 'SCA & Code Security', status: 'Connected', code: 'SNK', color: '#4F46E5' },
    { name: 'GitHub Dependabot',   type: 'Dependency Alert', status: 'Syncing', code: 'GIT', color: '#CA8A04' },
  ];

  const severityStatus = [
    { severity: 'Critical', open: 120, closed: 842, color: '#DC2626' },
    { severity: 'High',     open: 450, closed: 1280, color: '#EA580C' },
    { severity: 'Medium',   open: 820, closed: 940, color: '#CA8A04' },
    { severity: 'Low',      open: 210, closed: 518, color: '#2563EB' },
  ];

  const slaSegments = [
    { label: 'Within SLA', pct: 94, color: '#059669', offset: 25 },
    { label: 'Near Breach', pct: 4,  color: '#CA8A04', offset: 31 },
    { label: 'Breached',    pct: 2,  color: '#DC2626', offset: 27 },
  ];

  const deptSla = [
    { name: 'DevSecOps', comp: 96, breach: 4 },
    { name: 'Infra Core', comp: 91, breach: 9 },
    { name: 'App Security', comp: 95, breach: 5 },
  ];

  const inboxVulns = [
    { cve: 'CVE-2023-38545: curl SOCKS5 overflow', source: 'Qualys & Snyk', score: '98/100', sla: 'DevSecOps (2d left)', status: 'Open' },
    { cve: 'CVE-2021-44228: Apache Log4j RCE', source: 'Trivy Container', score: '90/100', sla: 'SecOps (12h left)', status: 'Triaged' },
    { cve: 'CVE-2023-4863: libwebp heap overflow', source: 'Snyk API', score: '75/100', sla: 'AppTeam (Passed)', status: 'Remediating' },
  ];

  const T_VM = {
    bg: '#FFFFFF', panel: '#F9FAFB', border: '#E5E7EB', borderLight: '#F3F4F6',
    text: '#111827', textSec: '#6B7280', textMuted: '#9CA3AF',
    accent: '#004DFF', critical: '#DC2626', high: '#EA580C',
    medium: '#CA8A04', low: '#2563EB', success: '#059669',
  };

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: T_VM.bg, borderRadius: '12px', border: `1px solid ${T_VM.border}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T_VM.border}`, padding: '0 24px' }}>
          <div style={{ display: 'flex' }}>
            {['Remediation Inbox', 'Scanner Connectors', 'SLA Tracking', 'Automation Rules', 'Prioritization', 'Reports'].map((tab, i) => (
              <div key={tab} style={{
                padding: '13px 14px 11px', fontSize: '13px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? T_VM.text : T_VM.textSec,
                borderBottom: i === 0 ? `2px solid ${T_VM.text}` : '2px solid transparent',
                marginBottom: '-1px', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>{tab}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T_VM.success, boxShadow: `0 0 0 3px #D1FAE5` }} />
            <span style={{ fontSize: 11, color: T_VM.textSec, fontWeight: 500 }}>Live · 56+ sources active</span>
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
                style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: T_VM.textSec, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: T_VM.text, fontFamily: "'Inter', sans-serif", lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: m.label.includes('Breaches') ? T_VM.critical : T_VM.success }}>
                    {m.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Three-column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '10px', marginBottom: '14px' }}>

            {/* Column 1: Connected Scanner Adapters */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VM.text, marginBottom: '4px' }}>Scanner Connectors</div>
              <div style={{ fontSize: '11px', color: T_VM.textMuted, marginBottom: '12px' }}>Multi-vendor API ingestion feeds</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {scannerConnectors.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 10px', borderRadius: '6px', border: `1px solid ${T_VM.borderLight}`, background: '#FFFFFF'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>{item.name}</span>
                      <span style={{ fontSize: '9px', color: T_VM.textMuted }}>{item.type}</span>
                    </div>
                    <span style={{
                      fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                      backgroundColor: item.status === 'Connected' ? '#F0FDF4' : '#FEF3C7',
                      color: item.status === 'Connected' ? T_VM.success : T_VM.medium
                    }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Column 2: SLA Target Coverage Donut Chart */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VM.text, marginBottom: '4px' }}>SLA Target Coverage</div>
              <div style={{ fontSize: '11px', color: T_VM.textMuted, marginBottom: '16px' }}>Remediation timeline success rate</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg width="130" height="130" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="#E5E7EB" strokeWidth="4.5" />
                    {slaSegments.map((item, idx) => (
                      <circle
                        key={idx}
                        cx="20"
                        cy="20"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="4.5"
                        strokeDasharray={`${item.pct} ${100 - item.pct}`}
                        strokeDashoffset={item.offset}
                      />
                    ))}
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif"
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: T_VM.text, lineHeight: 1 }}>94.2%</span>
                    <span style={{ fontSize: '9px', color: T_VM.textSec, fontWeight: 500, marginTop: '2px' }}>Compliant</span>
                  </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                  {slaSegments.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '9px', color: T_VM.textSec, whiteSpace: 'nowrap' }}>{item.label} ({item.pct}%)</span>
                    </div>
                  ))}
                </div>
                <div style={{ width: '100%', borderTop: `1px solid ${T_VM.borderLight}`, paddingTop: '10px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {deptSla.map((d, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>{d.name}</span>
                      <span style={{ color: T_VM.success, fontWeight: 600, fontSize: '10px' }}>{d.comp}% Compliant</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column 3: Severity Open vs Closed Status */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VM.text, marginBottom: '4px' }}>Vulnerability Lifecycle</div>
              <div style={{ fontSize: '11px', color: T_VM.textMuted, marginBottom: '12px' }}>Open vs resolved by severity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {severityStatus.map((item, i) => {
                  const total = item.open + item.closed;
                  const openPct = Math.round((item.open / total) * 100);
                  const closedPct = 100 - openPct;
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>{item.severity}</span>
                        <span style={{ fontSize: '9px', color: T_VM.textSec }}>
                          <strong style={{ color: item.color }}>{item.open} open</strong> / {item.closed} res
                        </span>
                      </div>
                      <div style={{ height: '6px', background: T_VM.borderLight, borderRadius: 99, display: 'flex', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }} animate={inView ? { width: `${openPct}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
                          style={{ height: '100%', background: item.color }} />
                        <motion.div
                          initial={{ width: 0 }} animate={inView ? { width: `${closedPct}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.65 + i * 0.05 }}
                          style={{ height: '100%', background: '#10B981', opacity: 0.4 }} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ borderTop: `1px solid ${T_VM.borderLight}`, paddingTop: '10px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>AI False Positive Analysis</span>
                    <span style={{ fontSize: '9px', color: T_VM.success, fontWeight: 600, background: '#E6F4EA', padding: '1px 5px', borderRadius: '3px' }}>99.4% Acc</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '9px', color: T_VM.textSec }}>
                    <span>• <strong>892</strong> vulnerabilities auto-verified by LLM triage</span>
                    <span>• <strong>142</strong> false positives auto-dismissed (saved 34h)</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Inbox Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr',
              padding: '9px 20px', background: T_VM.panel, borderBottom: `1px solid ${T_VM.borderLight}`,
            }}>
              {['VULNERABILITY ID & TITLE', 'SOURCE SCANNER', 'PRIORITY SCORE', 'ASSIGNED GROUP / SLA', 'STATUS'].map(h => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: T_VM.textMuted, letterSpacing: '0.06em' }}>{h}</span>
              ))}
            </div>
            {inboxVulns.map((vul, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.82 + i * 0.06 }}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr',
                  padding: '10px 20px', background: '#fff', alignItems: 'center',
                  borderBottom: i < inboxVulns.length - 1 ? `1px solid ${T_VM.borderLight}` : 'none',
                }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: T_VM.text, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}>
                  {vul.cve}
                </span>
                <span style={{ fontSize: '11px', color: T_VM.textSec }}>{vul.source}</span>
                <span style={{ fontSize: '11px', color: T_VM.critical, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{vul.score}</span>
                <span style={{ fontSize: '11px', color: T_VM.textSec }}>{vul.sla}</span>
                <span style={{
                  fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', display: 'inline-block', width: 'fit-content',
                  background: vul.status === 'Open' ? '#FEF2F2' : vul.status === 'Triaged' ? '#FFFBEB' : '#F0FDF4',
                  color: vul.status === 'Open' ? T_VM.critical : vul.status === 'Triaged' ? T_VM.medium : T_VM.success
                }}>
                  {vul.status}
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
            ) : moduleSlug === 'was' ? (
              <WASDashboard />
            ) : moduleSlug === 'aim' ? (
              <AIMDashboard />
            ) : moduleSlug === 'vs' ? (
              <VSDashboard />
            ) : moduleSlug === 'vm' ? (
              <VMDashboard />
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
