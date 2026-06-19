import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { VSDiscoveryWidget, VSScanningWidget, VSReportingWidget, ASMDiscoveryWidget, ASMClassificationWidget, ASMRemediationWidget } from '../../home-page/components/DashboardIllustrations';

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

// ============================================================
// Custom Mockup Widgets for AIM, WAS, and VM
// ============================================================

function AIMDiscoveryWidget({ inView = true }) {
  const providers = [
    { name: 'Amazon Web Services', tag: 'AWS', color: '#FF9900' },
    { name: 'GitHub Integration', tag: 'Code', color: '#24292F' },
    { name: 'Google Cloud Platform', tag: 'GCP', color: '#4285F4' },
    { name: 'Okta Identity', tag: 'IdP', color: '#007DC1' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Sources</span>
        </div>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#004DFF', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>12</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {providers.map((p, i) => (
          <motion.div key={p.name}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 7px', borderRadius: '6px', background: '#FAFAFA' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', flex: 1 }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0, background: p.color }} />
              <span style={{ fontSize: '9.5px', color: '#333', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
            </div>
            <span style={{ fontSize: '7px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', flexShrink: 0, marginLeft: '4px', background: '#E5E7EB', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.tag}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AIMInventoryWidget({ inView = true }) {
  const assets = [
    { name: 'user-db-prod', tag: 'Database', owner: 'DB Team' },
    { name: 'auth-gateway', tag: 'API', owner: 'SecOps' },
    { name: 'payment-portal', tag: 'Web App', owner: 'Finance' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.25 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Classified</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#004DFF', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>1,247</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {assets.map((a, i) => (
          <motion.div key={a.name}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', padding: '5px 7px', borderRadius: '6px', background: '#FAFAFA', gap: '2px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '9.5px', color: '#1A1A1A', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</span>
              <span style={{ fontSize: '7px', fontWeight: 600, padding: '0px 3px', borderRadius: '2px', background: '#DBEAFE', color: '#1D4ED8', textTransform: 'uppercase' }}>{a.tag}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#6E6E6E' }}>
              <span>Owner:</span>
              <span style={{ fontWeight: 500 }}>{a.owner}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AIMMappingWidget({ inView = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Relationships</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#10B981', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>98%</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-around', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', zIndex: 2 }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F3F4F6', border: '1px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span style={{ fontSize: '7px', fontWeight: 600, color: '#6E6E6E' }}>IAM Role</span>
          </div>

          <svg width="24" height="8" style={{ position: 'absolute', left: '46px', top: '10px' }}>
            <line x1="0" y1="4" x2="24" y2="4" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3,3" />
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', zIndex: 2 }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F3F4F6', border: '1px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#004DFF" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="22" y2="7"/><line x1="2" y1="17" x2="22" y2="17"/></svg>
            </div>
            <span style={{ fontSize: '7px', fontWeight: 600, color: '#6E6E6E' }}>EC2 Host</span>
          </div>

          <svg width="24" height="8" style={{ position: 'absolute', right: '46px', top: '10px' }}>
            <line x1="0" y1="4" x2="24" y2="4" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3,3" />
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', zIndex: 2 }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F3F4F6', border: '1px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
            </div>
            <span style={{ fontSize: '7px', fontWeight: 600, color: '#6E6E6E' }}>RDS DB</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WASConfigureWidget({ inView = true }) {
  const configs = [
    { label: 'Target URL', value: 'app.acme.com' },
    { label: 'Auth Method', value: 'OAuth 2.0 Token' },
    { label: 'API Schema', value: 'openapi.json' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Scope Config</span>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>Ready</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {configs.map((c, i) => (
          <motion.div key={c.label}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', padding: '5px 7px', borderRadius: '6px', background: '#FAFAFA', gap: '1px' }}
          >
            <span style={{ fontSize: '7.5px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>{c.label}</span>
            <span style={{ fontSize: '9.5px', color: '#333', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: c.label === 'Target URL' ? 'monospace' : 'inherit' }}>{c.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function WASCrawlingWidget({ inView = true }) {
  const urls = [
    { method: 'GET', path: '/api/v1/user', status: '200' },
    { method: 'POST', path: '/api/v1/login', status: '200' },
    { method: 'GET', path: '/dashboard', status: '302' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.25 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} className="animate-pulse" />
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Crawling</span>
        </div>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#3B82F6', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>1.2k urls</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {urls.map((u, i) => (
          <motion.div key={u.path}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 7px', borderRadius: '6px', background: '#FAFAFA' }}
          >
            <span style={{ fontSize: '8px', fontWeight: 700, padding: '1px 3px', borderRadius: '2px', background: u.method === 'GET' ? '#ECFDF5' : '#EFF6FF', color: u.method === 'GET' ? '#059669' : '#1D4ED8' }}>{u.method}</span>
            <span style={{ fontSize: '9px', color: '#333', fontWeight: 500, flex: 1, margin: '0 6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{u.path}</span>
            <span style={{ fontSize: '8.5px', color: '#10B981', fontWeight: 600 }}>{u.status}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function WASScanResultsWidget({ inView = true }) {
  const vulns = [
    { label: 'Injection', severity: 'Critical', color: '#EF4444' },
    { label: 'Broken Auth', severity: 'High', color: '#F97316' },
    { label: 'XSS Flaw', severity: 'Medium', color: '#EAB308' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>OWASP Scan</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#EF4444', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>3</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {vulns.map((v, i) => (
          <motion.div key={v.label}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 8px', borderRadius: '6px', background: '#FAFAFA' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: v.color }} />
              <span style={{ fontSize: '9.5px', color: '#333', fontWeight: 500 }}>{v.label}</span>
            </div>
            <span style={{ fontSize: '7.5px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', background: v.severity === 'Critical' ? '#FEF2F2' : v.severity === 'High' ? '#FFF7ED' : '#FEFCE8', color: v.color }}>{v.severity}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function VMAggregateWidget({ inView = true }) {
  const sources = [
    { name: 'Snapsec VS', count: 40, color: '#004DFF' },
    { name: 'Snyk Ingest', count: 129, color: '#4C1D95' },
    { name: 'GitHub Alert', count: 84, color: '#24292F' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Ingested</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#004DFF', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>253</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {sources.map((s, i) => (
          <motion.div key={s.name}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 7px', borderRadius: '6px', background: '#FAFAFA' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: '9.5px', color: '#333', fontWeight: 500 }}>{s.name}</span>
            </div>
            <span style={{ fontSize: '9.5px', color: '#1A1A1A', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{s.count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function VMPrioritizeWidget({ inView = true }) {
  const steps = [
    { label: 'Total Ingested', count: 253, barWidth: '100%', color: '#9CA3AF' },
    { label: 'Unique (Deduplicated)', count: 92, barWidth: '36%', color: '#3B82F6' },
    { label: 'Prioritized Risk', count: 48, barWidth: '19%', color: '#EF4444' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.25 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Deduplication</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>-63% Noise</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7.5px', fontWeight: 500, color: '#6E6E6E' }}>
              <span>{s.label}</span>
              <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{s.count}</span>
            </div>
            <div style={{ height: '4px', background: '#F3F4F6', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', width: s.barWidth, background: s.color, borderRadius: '2px' }}
                initial={{ width: '0%' }}
                animate={inView ? { width: s.barWidth } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function VMRemediateWidget({ inView = true }) {
  const stats = [
    { label: 'Jira Tickets Active', count: 14, color: '#0052CC' },
    { label: 'SLA Violations', count: 0, color: '#10B981' },
    { label: 'Auto-Closed', count: 32, color: '#10B981' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        width: '200px', maxWidth: '100%', background: '#fff', borderRadius: '12px',
        border: '1px solid #EEEEEE', padding: '14px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Remediation</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#10B981', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>100%</span>
      </div>
      
      <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: '3px' }}
          initial={{ width: '0%' }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', borderRadius: '6px', background: '#FAFAFA' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: '10px', color: '#333', fontWeight: 500 }}>{s.label}</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#1A1A1A', fontFamily: "'Space Grotesk', sans-serif" }}>{s.count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// Unified Process Mockup Data & Routing Configuration
// ============================================================

const MODULE_PROCESS_ITEMS = {
  aim: [
    { title: 'Discovery',      sub: 'CLOUDS & PERMISSIONS',          Widget: AIMDiscoveryWidget    },
    { title: 'Inventory',      sub: 'CONTEXT & METADATA',            Widget: AIMInventoryWidget    },
    { title: 'Mapping',        sub: 'RELATIONSHIP GRAPH',            Widget: AIMMappingWidget      },
  ],
  vs: [
    { title: 'Discovery',      sub: 'HOSTS & CLOUD ASSETS',          Widget: VSDiscoveryWidget     },
    { title: 'Scanning',       sub: 'CVEs & MISCONFIGURATIONS',      Widget: VSScanningWidget      },
    { title: 'Reporting',      sub: 'SEVERITY & REMEDIATION',        Widget: VSReportingWidget     },
  ],
  asm: [
    { title: 'Discovery',      sub: 'OSINT & DNS INTELLIGENCE',      Widget: ASMDiscoveryWidget    },
    { title: 'Classification', sub: 'RISK & SHADOW IT MAPPING',      Widget: ASMClassificationWidget },
    { title: 'Remediation',    sub: 'OWNERSHIP & RETEST TRACKING',   Widget: ASMRemediationWidget  },
  ],
  was: [
    { title: 'Configure',      sub: 'SCOPE & API SCHEMAS',           Widget: WASConfigureWidget    },
    { title: 'Crawling',       sub: 'AI-POWERED EXPLORATION',        Widget: WASCrawlingWidget     },
    { title: 'Scanning',       sub: 'OWASP TOP 10 DETECTION',        Widget: WASScanResultsWidget  },
  ],
  vm: [
    { title: 'Aggregate',      sub: 'INTEGRATIONS & TOOL INGESTION', Widget: VMAggregateWidget     },
    { title: 'Prioritize',     sub: 'RISK RATINGS & FALSE POSITIVES', Widget: VMPrioritizeWidget    },
    { title: 'Remediate',      sub: 'SLA TRACKING & FIX VALIDATION', Widget: VMRemediateWidget     },
  ],
};

function ProcessCard({ item, index, isLast }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });
  const delay = 0.25 * index;

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <div ref={ref} className="group relative flex flex-col items-center justify-between gap-md px-xs pb-md pt-sm last:pb-0 lg:px-md lg:pb-xs lg:last:pb-xs">
      {!isLast && (
        <div className="pointer-events-none absolute bottom-[-16px] left-1/2 z-[2] flex w-full -translate-x-1/2 items-center lg:bottom-1/2 lg:left-auto lg:right-[-54px] lg:h-full lg:w-[108px] lg:translate-x-0 lg:translate-y-1/2 lg:flex-col lg:py-0">
          <div className="h-[0.5px] w-full grow bg-gray-200 lg:h-full lg:w-[0.5px]" />
          <motion.div
            animate={controls}
            initial="hidden"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="bg-white p-[4px] rounded-full"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm text-gray-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 lg:rotate-0">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </motion.div>
          <div className="h-[0.5px] w-full grow bg-gray-200 lg:h-full lg:w-[0.5px]" />
        </div>
      )}
      <div className="flex flex-col items-center text-center w-full">
        <div className="flex min-h-[200px] lg:min-h-[240px] w-full items-end justify-center pb-midsm lg:pb-sm">
          <motion.div animate={controls} initial="hidden" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, delay }} className="shrink-0">
            <item.Widget inView={inView} />
          </motion.div>
        </div>
        <motion.div animate={controls} initial="hidden" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.5, delay }}>
          <p className="body-heading-m">{item.title}</p>
        </motion.div>
      </div>
      <motion.div animate={controls} initial="hidden" variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, delay }} className="w-full">
        <div className="mb-lg flex min-h-md w-full select-none items-center justify-center rounded-[6px] bg-gray-50 border border-gray-200 px-sm py-[10px] last:mb-0 lg:mb-0">
          <span className="label-text-m text-center text-gray-700">{item.sub}</span>
        </div>
      </motion.div>
    </div>
  );
}

function DynamicProcessMockup({ slug }) {
  const items = MODULE_PROCESS_ITEMS[slug] || MODULE_PROCESS_ITEMS.asm;
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-lg lg:grid-cols-3 lg:gap-0">
        {items.map((item, i) => (
          <ProcessCard key={item.title} item={item} index={i} isLast={i === items.length - 1} />
        ))}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const solutionData = {
  aim: {
    title: 'How Snapsec AIM works',
    desc: 'AIM continuously discovers assets, identities, secrets, applications, and infrastructure across your environment. It builds a centralized inventory enriched with ownership, relationships, and context, giving security teams complete visibility into what exists, who owns it, and how it connects.',
    btnText: 'Explore AIM Live',
    cards: [
      {
        "title": "Discovery",
        "text": "Connect cloud providers, repositories, identity platforms, infrastructure, and security tools to continuously discover assets, identities, applications, secrets, and services."
      },
      {
        "title": "Inventory",
        "text": "Normalize and classify discovered resources into a centralized inventory with ownership, criticality, business context, and security metadata."
      },
      {
        "title": "Mapping",
        "text": "Build a dynamic relationship graph that maps assets, identities, secrets, permissions, and dependencies to provide complete visibility across the environment."
      }
    ]
  },
  vs: {
    title: 'The Snapsec VS Solution',
    desc: 'VS continuously scans infrastructure, cloud resources, applications, and external assets to identify vulnerabilities and security weaknesses. Automated assessments help teams detect issues quickly, maintain ongoing visibility, and reduce the time between vulnerability introduction and discovery.',
    btnText: 'Explore VS Live',
    cards: [
      {
        "title": "Discovery",
        "text": "Automatically discover hosts, applications, cloud resources, containers, network services, and external assets that require continuous vulnerability assessment."
      },
      {
        "title": "Scanning",
        "text": "Perform continuous vulnerability scans across discovered assets to identify known vulnerabilities, missing patches, insecure configurations, and exploitable weaknesses."
      },
      {
        "title": "Reporting",
        "text": "Generate actionable reports with severity ratings, affected assets, remediation guidance, and trend analysis to help teams understand and address security risks."
      }
    ]
  },
  asm: {
    title: 'The Snapsec ASM Solution',
    desc: 'ASM continuously discovers, inventories, and monitors internet-facing assets across your organization. It identifies exposed services, shadow IT, unknown assets, and security risks, helping teams understand and secure their entire external attack surface before attackers find it.',
    btnText: 'Explore ASM Live',
    cards: [
      {
        "title": "Discovery",
        "text": "Continuously discover your external perimeter, mapping subdomains, cloud resources, exposed services, and IP addresses via active scanning and OSINT."
      },
      {
        "title": "Classification",
        "text": "Categorize your assets, map shadow IT, identify vulnerabilities, and prioritize security exposures based on asset criticality and business impact."
      },
      {
        "title": "Remediation",
        "text": "Assign asset ownership, initiate automated remediation tickets, track progress, and continuously retest exposures to verify successful mitigation."
      }
    ]
  },
  was: {
    title: 'The Snapsec WAS Solution',
    desc: 'WAS performs continuous security testing of web applications and APIs, uncovering vulnerabilities such as authentication flaws, injection issues, and business logic weaknesses. Security and development teams receive validated findings with actionable guidance to strengthen application security.',
    btnText: 'Explore WAS Live',
    cards: [
      {
        "title": "Configure",
        "text": "Perform a one-time setup by defining application scope, authentication methods, user roles, API specifications, and crawling preferences to ensure accurate testing coverage."
      },
      {
        "title": "Crawling",
        "text": "AI-powered crawling automatically explores applications, APIs, workflows, forms, and authenticated areas to discover features, endpoints, and attack surfaces that require testing."
      },
      {
        "title": "Scanning",
        "text": "Every discovered request, endpoint, and application feature is automatically tested for vulnerabilities, misconfigurations, authentication weaknesses, and security flaws with continuous validation."
      }
    ]
  },
  vm: {
    title: 'The Snapsec VM Solution',
    desc: 'VM aggregates vulnerability data from all security tools into a single platform, eliminates noise through deduplication and false-positive analysis, identifies root causes, prioritizes true risk, and orchestrates remediation workflows so security and engineering teams can resolve issues faster.',
    btnText: 'Explore VM Live',
    cards: [
      {
        "title": "Aggregate",
        "text": "Collect vulnerability findings from scanners, cloud security tools, code analysis platforms, penetration tests, and third-party security solutions into a single platform."
      },
      {
        "title": "Prioritize",
        "text": "Eliminate duplicates, identify false positives, correlate related findings, and prioritize vulnerabilities based on true risk, exploitability, asset criticality, and business impact."
      },
      {
        "title": "Remediate",
        "text": "Assign ownership, create tickets, track remediation progress, monitor SLAs, and validate fixes to ensure vulnerabilities are resolved efficiently across teams."
      }
    ]
  }
};

const cardIcons = [
  // Icon 1
  (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
      <circle cx="24" cy="24" r="8" fill="none" stroke="#000" strokeWidth="1.5" />
      <line x1="24" y1="8" x2="24" y2="16" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="32" x2="24" y2="40" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="24" x2="16" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="24" x2="40" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // Icon 2
  (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
      <rect x="12" y="14" width="24" height="20" rx="2" stroke="#000" strokeWidth="1.5" />
      <line x1="16" y1="20" x2="32" y2="20" stroke="#000" strokeWidth="1" />
      <line x1="16" y1="24" x2="28" y2="24" stroke="#000" strokeWidth="1" />
      <line x1="16" y1="28" x2="24" y2="28" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  // Icon 3
  (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
      <path d="M16 20L24 28L32 20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="16" r="3" stroke="#000" strokeWidth="1.5" />
    </svg>
  )
];

export default function SolutionSection({ moduleSlug }) {
  const slug = (moduleSlug || 'asm').toLowerCase();
  const data = solutionData[slug] || solutionData.asm;

  return (
    <section className="section-solution">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-xxl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">

          <FadeInBlock>
            <div className="mx-auto flex w-full max-w-[734px] flex-col gap-sm text-center items-center">
              <h3 className="heading-h1 text-center">{data.title}</h3>
              <p className="body-text-m mx-auto w-full max-w-[620px] text-gray-900 text-center" style={{ marginTop: '12px', lineHeight: '1.6' }}>
                {data.desc}
              </p>
            </div>
          </FadeInBlock>

          <div className="flex flex-col gap-xxl">
            <div className="grid grid-cols-1 gap-lg lg:gap-md lg:grid-cols-3">
              {data.cards.map((card, i) => (
                <FadeInBlock key={i} delay={i * 0.1}>
                  <div className="flex gap-midmd lg:flex-col lg:gap-sm">
                    <span className="block shrink-0">{cardIcons[i] || cardIcons[0]}</span>
                    <div className="flex flex-col gap-xxs lg:gap-xs">
                      <p className="body-heading-m">{card.title}</p>
                      <p className="body-text-s text-gray-900">{card.text}</p>
                    </div>
                  </div>
                </FadeInBlock>
              ))}
            </div>

            <FadeInBlock delay={0.2}>
              <DynamicProcessMockup slug={slug} />
            </FadeInBlock>

            <FadeInBlock delay={0.3}>
              <div className="flex justify-center">
                <a className="button-primary-m" href="https://suite.snapsec.co/demo" target="_blank" rel="noopener noreferrer">
                  <span className="block">{data.btnText} <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">→</span></span>
                </a>
              </div>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
