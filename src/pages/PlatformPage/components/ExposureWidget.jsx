import React from 'react';

const C = {
  critical: '#EF4444',
  high: '#F97316',
  success: '#10B981',
  primary: '#004DFF',
  border: '#EEEEEE',
  borderLight: '#F5F5F5',
  bgCard: '#FAFAFA',
  text: '#1A1A1A',
  textSec: '#6E6E6E',
};

const statusStyles = {
  Monitored: { bg: '#ECFDF5', color: C.success },
  New: { bg: '#EFF6FF', color: C.primary },
  Risk: { bg: '#FEF2F2', color: C.critical },
};

const assets = [
  { domain: 'app.acme.com', type: 'Web App', ports: '443', status: 'Monitored' },
  { domain: 'api.acme.com', type: 'API', ports: '443, 8080', status: 'Monitored' },
  { domain: 'staging.acme.com', type: 'Web App', ports: '443, 3000', status: 'Risk' },
];

const stats = [
  { label: 'Subdomains', value: '156' },
  { label: 'Open Ports', value: '23' },
  { label: 'Certificates', value: '12' },
];

export default function ExposureWidget() {
  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: '14px',
        border: `1px solid ${C.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke={C.text} strokeWidth="1.4" />
            <ellipse cx="9" cy="9" rx="3.5" ry="7.5" stroke={C.text} strokeWidth="1.4" />
            <line x1="1.5" y1="9" x2="16.5" y2="9" stroke={C.text} strokeWidth="1.4" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 600, color: C.text }}>
            External Attack Surface
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.success }} />
          <span style={{ fontSize: '9px', fontWeight: 500, color: C.success }}>Live</span>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              padding: '8px 12px',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: C.text,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: '8px',
                fontWeight: 500,
                color: C.textSec,
                marginTop: '2px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Table header ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 64px 72px 72px',
          padding: '6px 16px',
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        {['Asset', 'Type', 'Ports', 'Status'].map((h, i) => (
          <span
            key={h}
            style={{
              fontSize: '9px',
              fontWeight: 500,
              color: C.textSec,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textAlign: i === 0 ? 'left' : 'center',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* ── Rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {assets.map((a, i) => {
          const st = statusStyles[a.status];
          return (
            <div
              key={a.domain}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 64px 72px 72px',
                alignItems: 'center',
                padding: '7px 16px',
                borderBottom: i < assets.length - 1 ? `1px solid ${C.borderLight}` : 'none',
              }}
            >
              {/* Domain */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: C.text,
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {a.domain}
              </span>

              {/* Type */}
              <span style={{ fontSize: '10px', color: C.textSec, textAlign: 'center' }}>
                {a.type}
              </span>

              {/* Ports */}
              <span
                style={{
                  fontSize: '9.5px',
                  color: C.textSec,
                  textAlign: 'center',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {a.ports}
              </span>

              {/* Status badge */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span
                  style={{
                    fontSize: '8.5px',
                    fontWeight: 600,
                    padding: '1.5px 6px',
                    borderRadius: '4px',
                    background: st.bg,
                    color: st.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {a.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
