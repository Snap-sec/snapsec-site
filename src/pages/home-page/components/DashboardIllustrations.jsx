import { motion } from 'framer-motion';

// ============================================================
// Color constants for dashboard elements
// ============================================================
const C = {
  critical: '#EF4444',
  high: '#F97316',
  medium: '#EAB308',
  low: '#3B82F6',
  success: '#10B981',
  primary: '#004DFF',
  border: '#EEEEEE',
  borderLight: '#F5F5F5',
  bgCard: '#FAFAFA',
  bgHighlight: '#F0F7FF',
  text: '#1A1A1A',
  textSec: '#6E6E6E',
};

const severityBg = {
  Critical: '#FEF2F2',
  High: '#FFF7ED',
  Medium: '#FEFCE8',
  Low: '#EFF6FF',
};

const statusBg = {
  Open: '#FEF2F2',
  'In Progress': '#FFFBEB',
  Resolved: '#ECFDF5',
};

// ============================================================
// Shared sub-components
// ============================================================

function MetricCard({ value, label, accent = C.primary, delay = 0, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      style={{
        flex: 1, padding: '10px 6px', borderRadius: '8px',
        background: C.bgCard, border: `1px solid ${C.borderLight}`,
        textAlign: 'center', minWidth: 0,
      }}
    >
      <div style={{
        fontSize: '18px', fontWeight: 700, color: accent,
        fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '8px', color: C.textSec, fontWeight: 500,
        marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.06em',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

function SeverityBar({ label, count, total, color, delay = 0, inView }) {
  const pct = Math.round((count / total) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ width: '40px', fontSize: '9px', color: C.textSec, fontWeight: 500, textAlign: 'right' }}>{label}</span>
      <div style={{ flex: 1, height: '6px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: color, borderRadius: '3px' }}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      </div>
      <span style={{
        width: '22px', fontSize: '10px', fontWeight: 600, color: C.text, textAlign: 'right',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>{count}</span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span style={{
      fontSize: '9px', fontWeight: 600, color: C.textSec,
      textTransform: 'uppercase', letterSpacing: '0.06em',
      display: 'block', marginBottom: '6px',
    }}>
      {children}
    </span>
  );
}

// ============================================================
// MINI DASHBOARD WIDGETS (for ExistSection)
// ============================================================

export function DiscoveryWidget({ inView = true }) {
  const assets = [
    { name: 'api.acme.com', tag: 'API', isNew: false },
    { name: '10.0.1.42', tag: 'Host', isNew: false },
    { name: 'cdn.acme.com', tag: 'CDN', isNew: true },
    { name: 'staging.acme.com', tag: 'Web', isNew: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.div
            animate={inView ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.success }}
          />
          <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            Assets Found
          </span>
        </div>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.primary, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
          156
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {assets.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '4px 7px', borderRadius: '6px',
              background: a.isNew ? C.bgHighlight : C.bgCard,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', flex: 1 }}>
              <div style={{
                width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0,
                background: a.isNew ? C.primary : C.success,
              }} />
              <span style={{ fontSize: '9.5px', color: '#333', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {a.name}
              </span>
            </div>
            <span style={{
              fontSize: '7px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px',
              flexShrink: 0, marginLeft: '4px',
              background: a.isNew ? '#DBEAFE' : '#E5E7EB', color: a.isNew ? '#1D4ED8' : '#6B7280',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {a.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ScanningWidget({ inView = true }) {
  const items = [
    { label: 'Critical', count: 3, pct: 8, color: C.critical },
    { label: 'High', count: 8, pct: 20, color: C.high },
    { label: 'Medium', count: 14, pct: 35, color: C.medium },
    { label: 'Low', count: 15, pct: 37, color: C.low },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.25 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
          Scan Results
        </span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.primary, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
          40
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {items.map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '42px', fontSize: '9px', color: C.textSec, fontWeight: 500 }}>{item.label}</span>
            <div style={{ flex: 1, height: '5px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: item.color, borderRadius: '3px' }}
                initial={{ width: '0%' }}
                animate={inView ? { width: `${item.pct}%` } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              />
            </div>
            <span style={{ width: '16px', fontSize: '9px', fontWeight: 600, color: C.text, textAlign: 'right' }}>{item.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function RemediationWidget({ inView = true }) {
  const statuses = [
    { label: 'Resolved', count: 24, color: C.success },
    { label: 'In Progress', count: 8, color: '#F59E0B' },
    { label: 'Open', count: 5, color: C.critical },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
          SLA Compliance
        </span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.success, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
          94%
        </span>
      </div>
      {/* Progress bar */}
      <div style={{ height: '6px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
        <motion.div
          style={{ height: '100%', background: `linear-gradient(90deg, ${C.success}, #34D399)`, borderRadius: '3px' }}
          initial={{ width: '0%' }}
          animate={inView ? { width: '94%' } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        />
      </div>
      {/* Status items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {statuses.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.25 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '4px 8px', borderRadius: '6px', background: C.bgCard,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: '10px', color: '#333', fontWeight: 500 }}>{s.label}</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>
              {s.count}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// FULL DASHBOARDS (for FeaturesSection)
// ============================================================

export function VMDashboard({ inView = true }) {
  const total = 247;
  const findings = [
    { label: 'Critical', count: 12, color: C.critical },
    { label: 'High', count: 34, color: C.high },
    { label: 'Medium', count: 89, color: C.medium },
    { label: 'Low', count: 112, color: C.low },
  ];
  const recentFindings = [
    { id: 'CVE-2024-1234', sev: 'Critical', asset: 'api-server', status: 'Open' },
    { id: 'CVE-2024-5678', sev: 'High', asset: 'web-app', status: 'In Progress' },
    { id: 'CVE-2024-9012', sev: 'Medium', asset: 'cdn-node', status: 'Resolved' },
  ];
  const sevColor = { Critical: C.critical, High: C.high, Medium: C.medium, Low: C.low };
  const statColor = { Open: C.critical, 'In Progress': '#F59E0B', Resolved: C.success };

  return (
    <motion.div
      className="aspect-[468/322] w-full rounded-12 overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: '#fff', border: `1px solid ${C.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        padding: '16px 18px', fontFamily: "'Inter', sans-serif",
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: C.primary }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Vulnerability Overview
          </span>
        </div>
        <span style={{ fontSize: '9px', color: C.textSec, fontWeight: 500 }}>Last 30 days</span>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexShrink: 0 }}>
        <MetricCard value="247" label="Findings" accent={C.text} delay={0.25} inView={inView} />
        <MetricCard value="12" label="Critical" accent={C.critical} delay={0.3} inView={inView} />
        <MetricCard value="34" label="High" accent={C.high} delay={0.35} inView={inView} />
        <MetricCard value="94%" label="SLA Comp." accent={C.success} delay={0.4} inView={inView} />
      </div>

      {/* Severity bars */}
      <div style={{ marginBottom: '12px', flexShrink: 0 }}>
        <SectionLabel>Severity Distribution</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {findings.map((f, i) => (
            <SeverityBar key={f.label} label={f.label} count={f.count} total={total} color={f.color} delay={0.35 + i * 0.08} inView={inView} />
          ))}
        </div>
      </div>

      {/* Recent findings table */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <SectionLabel>Recent Findings</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {recentFindings.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '4px 8px', borderRadius: '4px', background: C.bgCard, fontSize: '9px',
              }}
            >
              <span style={{ fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif", width: '30%' }}>{f.id}</span>
              <span style={{
                padding: '1px 5px', borderRadius: '3px', fontWeight: 600, fontSize: '7px',
                background: severityBg[f.sev], color: sevColor[f.sev],
                textTransform: 'uppercase', letterSpacing: '0.03em',
              }}>{f.sev}</span>
              <span style={{ color: C.textSec, width: '22%', textAlign: 'center' }}>{f.asset}</span>
              <span style={{
                padding: '1px 5px', borderRadius: '3px', fontWeight: 500, fontSize: '7px',
                background: statusBg[f.status], color: statColor[f.status],
              }}>{f.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ASMDashboard({ inView = true }) {
  const assets = [
    { domain: 'api.acme.com', ports: '443, 8080', tech: 'nginx', status: 'Monitored' },
    { domain: 'cdn.acme.com', ports: '443', tech: 'CloudFront', status: 'Monitored' },
    { domain: 'dev.acme.com', ports: '22, 443, 3000', tech: 'Node.js', status: 'New' },
    { domain: 'staging.acme.com', ports: '443, 5432', tech: 'Express', status: 'Risk' },
  ];
  const techBadges = [
    { name: 'nginx', color: '#009639' },
    { name: 'Node.js', color: '#339933' },
    { name: 'React', color: '#61DAFB' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Redis', color: '#DC382D' },
    { name: 'Docker', color: '#2496ED' },
  ];
  const statusStyle = {
    Monitored: { bg: '#ECFDF5', color: C.success },
    New: { bg: '#DBEAFE', color: C.primary },
    Risk: { bg: '#FEF2F2', color: C.critical },
  };

  return (
    <motion.div
      className="aspect-[468/322] w-full rounded-12 overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: '#fff', border: `1px solid ${C.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        padding: '16px 18px', fontFamily: "'Inter', sans-serif",
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#C49DE0' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Surface Monitor
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <motion.div
            animate={inView ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.success }}
          />
          <span style={{ fontSize: '9px', color: C.success, fontWeight: 500 }}>Live</span>
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexShrink: 0 }}>
        <MetricCard value="156" label="Subdomains" accent="#8B5CF6" delay={0.25} inView={inView} />
        <MetricCard value="23" label="Open Ports" accent={C.high} delay={0.3} inView={inView} />
        <MetricCard value="12" label="Certificates" accent={C.success} delay={0.35} inView={inView} />
      </div>

      {/* Asset discovery table */}
      <div style={{ marginBottom: '10px', flexShrink: 0 }}>
        <SectionLabel>Discovered Assets</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {assets.map((a, i) => (
            <motion.div
              key={a.domain}
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.07 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '4px 8px', borderRadius: '4px', background: C.bgCard, fontSize: '9px',
              }}
            >
              <span style={{ fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif", width: '32%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.domain}</span>
              <span style={{ color: C.textSec, width: '25%', textAlign: 'center', fontSize: '8px' }}>{a.ports}</span>
              <span style={{ color: C.textSec, width: '18%', textAlign: 'center' }}>{a.tech}</span>
              <span style={{
                padding: '1px 5px', borderRadius: '3px', fontWeight: 600, fontSize: '7px',
                background: statusStyle[a.status].bg, color: statusStyle[a.status].color,
                textTransform: 'uppercase', letterSpacing: '0.02em',
              }}>{a.status}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology stack */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <SectionLabel>Technology Stack</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {techBadges.map((t, i) => (
            <motion.span
              key={t.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.06 }}
              style={{
                fontSize: '8px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px',
                border: `1px solid ${t.color}20`, color: t.color,
                background: `${t.color}08`, letterSpacing: '0.02em',
              }}
            >
              {t.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AIMDashboard({ inView = true }) {
  const assetTypes = [
    { type: 'Web Applications', count: 342, color: C.primary, pct: 28 },
    { type: 'API Endpoints', count: 189, color: '#8B5CF6', pct: 15 },
    { type: 'Repositories', count: 234, color: C.success, pct: 19 },
    { type: 'IP Addresses', count: 156, color: C.high, pct: 13 },
    { type: 'Certificates', count: 89, color: '#EC4899', pct: 7 },
    { type: 'Cloud Resources', count: 237, color: '#06B6D4', pct: 18 },
  ];
  const recentChanges = [
    { asset: 'payment-api', action: 'Classified', team: 'Platform', time: '2m ago' },
    { asset: 'auth-service', action: 'Owner Set', team: 'Identity', time: '14m ago' },
    { asset: 'cdn-origin', action: 'Discovered', team: 'Infra', time: '1h ago' },
  ];
  const actionColors = {
    Classified: { bg: '#EFF6FF', color: C.primary },
    'Owner Set': { bg: '#ECFDF5', color: C.success },
    Discovered: { bg: '#FEF3C7', color: '#D97706' },
  };

  return (
    <motion.div
      className="aspect-[468/322] w-full rounded-12 overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: '#fff', border: `1px solid ${C.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        padding: '16px 18px', fontFamily: "'Inter', sans-serif",
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#A8C0FF' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Asset Inventory
          </span>
        </div>
        <span style={{ fontSize: '9px', color: C.textSec, fontWeight: 500 }}>1,247 total</span>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexShrink: 0 }}>
        <MetricCard value="1,247" label="Total Assets" accent={C.text} delay={0.25} inView={inView} />
        <MetricCard value="89" label="APIs" accent="#8B5CF6" delay={0.3} inView={inView} />
        <MetricCard value="234" label="Repositories" accent={C.success} delay={0.35} inView={inView} />
      </div>

      {/* Asset type breakdown */}
      <div style={{ marginBottom: '10px', flexShrink: 0 }}>
        <SectionLabel>Asset Types</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
          {assetTypes.map((a, i) => (
            <motion.div
              key={a.type}
              initial={{ opacity: 0, x: -4 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '3px 6px', borderRadius: '4px', background: C.bgCard,
              }}
            >
              <div style={{ width: '3px', height: '14px', borderRadius: '2px', background: a.color, flexShrink: 0 }} />
              <span style={{ fontSize: '8px', color: C.textSec, fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {a.type}
              </span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: C.text, fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>
                {a.count}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent changes */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <SectionLabel>Recent Activity</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {recentChanges.map((c, i) => (
            <motion.div
              key={c.asset}
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '3px 8px', borderRadius: '4px', background: C.bgCard, fontSize: '9px',
              }}
            >
              <span style={{ fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>{c.asset}</span>
              <span style={{
                padding: '1px 5px', borderRadius: '3px', fontWeight: 600, fontSize: '7px',
                background: actionColors[c.action].bg, color: actionColors[c.action].color,
                textTransform: 'uppercase',
              }}>{c.action}</span>
              <span style={{ color: C.textSec }}>{c.team}</span>
              <span style={{ color: C.textSec, fontSize: '8px' }}>{c.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function VSDashboard({ inView = true }) {
  const hosts = [
    { target: '192.168.1.1', type: 'Server', ports: '22, 80, 443', status: 'Secure' },
    { target: '10.0.0.15', type: 'Database', ports: '5432', status: 'Warning' },
    { target: '172.16.0.4', type: 'Router', ports: '80, 8080', status: 'Secure' },
  ];
  return (
    <motion.div
      className="aspect-[468/322] w-full rounded-12 overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: '#fff', border: `1px solid ${C.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        padding: '16px 18px', fontFamily: "'Inter', sans-serif",
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: C.success }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Vulnerability Scanner (VS)
          </span>
        </div>
        <span style={{ fontSize: '9px', color: C.textSec }}>Last run: 1h ago</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <MetricCard value="48" label="Scanned IPs" accent={C.text} delay={0.25} inView={inView} />
        <MetricCard value="1" label="Alert" accent={C.high} delay={0.3} inView={inView} />
        <MetricCard value="99.2%" label="Score" accent={C.success} delay={0.35} inView={inView} />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <SectionLabel>Infrastructure Scanning Status</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {hosts.map((h, i) => (
            <motion.div
              key={h.target}
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '4px', background: C.bgCard, fontSize: '9px' }}
            >
              <span style={{ fontWeight: 600, color: C.text }}>{h.target}</span>
              <span style={{ color: C.textSec }}>{h.type}</span>
              <span style={{ color: C.textSec, fontFamily: 'monospace' }}>Ports: {h.ports}</span>
              <span style={{ padding: '1px 5px', borderRadius: '3px', fontWeight: 600, fontSize: '7px', background: h.status === 'Secure' ? '#ECFDF5' : '#FEF2F2', color: h.status === 'Secure' ? C.success : C.critical }}>
                {h.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function WASDashboard({ inView = true }) {
  const findings = [
    { name: 'SQL Injection', type: 'Injection', severity: 'Critical' },
    { name: 'Cross-Site Scripting (XSS)', type: 'XSS', severity: 'High' },
    { name: 'Broken Authentication', type: 'Auth', severity: 'Medium' },
  ];
  const sevColor = { Critical: C.critical, High: C.high, Medium: C.medium };
  return (
    <motion.div
      className="aspect-[468/322] w-full rounded-12 overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: '#fff', border: `1px solid ${C.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        padding: '16px 18px', fontFamily: "'Inter', sans-serif",
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#F59E0B' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Web Application Scanner (WAS)
          </span>
        </div>
        <span style={{ fontSize: '9px', color: C.textSec }}>Active scan</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <MetricCard value="1,240" label="URLs Crawled" accent={C.text} delay={0.25} inView={inView} />
        <MetricCard value="3" label="Vulns" accent={C.critical} delay={0.3} inView={inView} />
        <MetricCard value="100%" label="Coverage" accent={C.success} delay={0.35} inView={inView} />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <SectionLabel>OWASP Top 10 Scan Detections</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {findings.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '4px', background: C.bgCard, fontSize: '9px' }}
            >
              <span style={{ fontWeight: 600, color: C.text }}>{f.name}</span>
              <span style={{ color: C.textSec }}>{f.type}</span>
              <span style={{ padding: '1px 5px', borderRadius: '3px', fontWeight: 600, fontSize: '7px', background: severityBg[f.severity], color: sevColor[f.severity] }}>
                {f.severity}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function VSDiscoveryWidget({ inView = true }) {
  const assets = [
    { name: 'api.acme.com',        tag: 'API', isNew: false },
    { name: '104.21.48.10',        tag: 'IP',  isNew: false },
    { name: 'dev-portal.acme.net', tag: 'Web', isNew: true  },
    { name: 's3-backups.acme.io',  tag: 'S3',  isNew: true  },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.div
            animate={inView ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.success }}
          />
          <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Assets Found</span>
        </div>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.primary, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>1,284</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {assets.map((a, i) => (
          <motion.div key={a.name}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 7px', borderRadius: '6px', background: a.isNew ? C.bgHighlight : C.bgCard }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', flex: 1 }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0, background: a.isNew ? C.primary : C.success }} />
              <span style={{ fontSize: '9.5px', color: '#333', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</span>
            </div>
            <span style={{ fontSize: '7px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', flexShrink: 0, marginLeft: '4px', background: a.isNew ? '#DBEAFE' : '#E5E7EB', color: a.isNew ? '#1D4ED8' : '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.tag}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function VSScanningWidget({ inView = true }) {
  const vulns = [
    { label: 'Critical', count: 4,   pct: 14,  color: C.critical },
    { label: 'High',     count: 18,  pct: 45,  color: C.high     },
    { label: 'Medium',   count: 41,  pct: 80,  color: C.medium   },
    { label: 'Low',      count: 112, pct: 100, color: C.low      },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.25 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>CVE Scan</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.primary, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>175</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {vulns.map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '42px', fontSize: '9px', color: C.textSec, fontWeight: 500 }}>{item.label}</span>
            <div style={{ flex: 1, height: '5px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', background: item.color, borderRadius: '3px' }}
                initial={{ width: '0%' }} animate={inView ? { width: `${item.pct}%` } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              />
            </div>
            <span style={{ width: '16px', fontSize: '9px', fontWeight: 600, color: C.text, textAlign: 'right' }}>{item.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function VSReportingWidget({ inView = true }) {
  const statuses = [
    { label: 'Resolved',  count: 38,  color: C.success  },
    { label: 'In Review', count: 21,  color: '#F59E0B'  },
    { label: 'Open',      count: 116, color: C.critical },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Report</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.success, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>94%</span>
      </div>
      <div style={{ height: '6px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
        <motion.div
          style={{ height: '100%', background: `linear-gradient(90deg, ${C.success}, #34D399)`, borderRadius: '3px' }}
          initial={{ width: '0%' }} animate={inView ? { width: '94%' } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {statuses.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', borderRadius: '6px', background: C.bgCard }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: '10px', color: '#333', fontWeight: 500 }}>{s.label}</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>{s.count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── ASM mini widgets ────────────────────────────────────────────────────────

export function ASMDiscoveryWidget({ inView = true }) {
  const assets = [
    { name: 'staging.acme.com',  source: 'DNS',   isNew: true  },
    { name: 'cdn-eu.acme.io',    source: 'CT Log', isNew: true  },
    { name: 'api.acme.com',      source: 'OSINT', isNew: false },
    { name: '185.220.101.6',     source: 'Scan',  isNew: false },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.div
            animate={inView ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B5CF6' }}
          />
          <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Surface Found</span>
        </div>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#8B5CF6', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>342</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {assets.map((a, i) => (
          <motion.div key={a.name}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 7px', borderRadius: '6px', background: a.isNew ? '#F5F3FF' : C.bgCard }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', flex: 1 }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0, background: a.isNew ? '#8B5CF6' : C.success }} />
              <span style={{ fontSize: '9.5px', color: '#333', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</span>
            </div>
            <span style={{ fontSize: '7px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', flexShrink: 0, marginLeft: '4px', background: a.isNew ? '#EDE9FE' : '#E5E7EB', color: a.isNew ? '#6D28D9' : '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.source}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ASMClassificationWidget({ inView = true }) {
  const risks = [
    { label: 'Exposed',   count: 23, pct: 60, color: C.critical  },
    { label: 'Shadow IT', count: 11, pct: 30, color: C.high       },
    { label: 'Miscfg',    count: 18, pct: 47, color: C.medium     },
    { label: 'Monitored', count: 290, pct: 100, color: C.success  },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.25 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Risk Map</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.primary, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>342</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {risks.map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '52px', fontSize: '9px', color: C.textSec, fontWeight: 500 }}>{item.label}</span>
            <div style={{ flex: 1, height: '5px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: item.color, borderRadius: '3px' }}
                initial={{ width: '0%' }}
                animate={inView ? { width: `${item.pct}%` } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              />
            </div>
            <span style={{ width: '22px', fontSize: '9px', fontWeight: 600, color: C.text, textAlign: 'right' }}>{item.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ASMRemediationWidget({ inView = true }) {
  const items = [
    { label: 'Verified Fixed', count: 19, color: C.success  },
    { label: 'In Progress',    count: 14, color: '#F59E0B'  },
    { label: 'Unassigned',     count: 9,  color: C.critical },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        width: '200px', background: '#fff', borderRadius: '12px',
        border: `1px solid ${C.border}`, padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Remediation</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.success, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>91%</span>
      </div>
      <div style={{ height: '6px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
        <motion.div
          style={{ height: '100%', background: `linear-gradient(90deg, ${C.success}, #34D399)`, borderRadius: '3px' }}
          initial={{ width: '0%' }} animate={inView ? { width: '91%' } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {items.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', borderRadius: '6px', background: C.bgCard }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: '10px', color: '#333', fontWeight: 500 }}>{s.label}</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>{s.count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
