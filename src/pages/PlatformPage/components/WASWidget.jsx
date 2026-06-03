import React from 'react';

const C = {
  critical: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  primary: '#004DFF',
  border: '#EEEEEE',
  borderLight: '#F5F5F5',
  bgCard: '#FAFAFA',
  bgHighlight: '#F0F7FF',
  text: '#1A1A1A',
  textSec: '#6E6E6E',
};

const endpoints = [
  { method: 'POST', path: '/v1/auth/login', status: 'Passed', color: C.success },
  { method: 'GET', path: '/v1/users/me', status: 'Passed', color: C.success },
  { method: 'GET', path: '/v1/admin/logs', status: '1 Issue', color: C.warning },
];

export default function WASWidget() {
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
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: C.text, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
          Web & API Security
        </span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: C.primary, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
          98%
        </span>
      </div>

      {/* ── Progress Bar ── */}
      <div style={{ height: '6px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${C.primary}, #3B82F6)`,
            borderRadius: '3px',
            width: '98%',
          }}
        />
      </div>

      {/* ── Info Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: C.textSec, fontWeight: 500 }}>
        <span>Target: api.acme.com</span>
        <span>142 Endpoints Tested</span>
      </div>

      {/* ── Endpoint Rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
        {endpoints.map((ep) => (
          <div
            key={ep.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '5px 8px',
              borderRadius: '6px',
              background: C.bgCard,
              border: `1px solid ${C.borderLight}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', flex: 1 }}>
              <span
                style={{
                  fontSize: '8px',
                  fontWeight: 700,
                  color: ep.method === 'POST' ? C.primary : C.success,
                  fontFamily: "'Inter', sans-serif",
                  background: '#fff',
                  padding: '1px 3.5px',
                  borderRadius: '3px',
                  border: `1px solid ${C.border}`,
                  flexShrink: 0,
                }}
              >
                {ep.method}
              </span>
              <span
                style={{
                  fontSize: '9.5px',
                  color: C.text,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {ep.path}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0, marginLeft: '6px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: ep.color }} />
              <span style={{ fontSize: '9px', fontWeight: 600, color: ep.color }}>
                {ep.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
