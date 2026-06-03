import React from 'react';

const C = {
  critical: '#EF4444',
  success: '#10B981',
  primary: '#004DFF',
  primaryLight: '#F0F7FF',
  border: '#EEEEEE',
  borderLight: '#F5F5F5',
  bgCard: '#FAFAFA',
  text: '#1A1A1A',
  textSec: '#6E6E6E',
};

const steps = [
  {
    label: 'All Scanner Findings',
    value: '247',
    desc: 'Raw issues ingested across containers, code, and cloud hosts',
    active: false,
  },
  {
    label: 'Contextual Deduplication',
    value: '-161',
    desc: 'Consolidated duplicates and overlapping findings',
    active: false,
    isReduction: true,
  },
  {
    label: 'Exposure & Reachability Analysis',
    value: '12',
    desc: 'Isolated internet-facing routes and active exploits',
    active: true,
  },
];

export default function VMWidget() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Sparkles / AI Icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: C.primary }}>
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 600, color: C.text, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            AI Prioritization Funnel
          </span>
        </div>
        <div
          style={{
            fontSize: '9px',
            fontWeight: 600,
            color: C.primary,
            background: C.primaryLight,
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          Active Filter
        </div>
      </div>

      {/* ── Funnel / Pipeline Flow ── */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div key={step.label} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
              {/* Left Column: Line & Dots */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                {/* Dot */}
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: step.active ? C.primaryLight : C.bgCard,
                    border: `1.5px solid ${step.active ? C.primary : C.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: step.active ? C.primary : C.textSec,
                    }}
                  />
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    style={{
                      width: '1.5px',
                      flex: 1,
                      minHeight: '20px',
                      background: `linear-gradient(to bottom, ${C.border} 70%, transparent)`,
                    }}
                  />
                )}
              </div>

              {/* Right Column: Content */}
              <div
                style={{
                  flex: 1,
                  paddingBottom: isLast ? 0 : '14px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: step.active ? C.primary : C.text,
                    }}
                  >
                    {step.label}
                  </div>
                  <div style={{ fontSize: '9.5px', color: C.textSec, marginTop: '2px', lineHeight: '1.3' }}>
                    {step.desc}
                  </div>
                </div>

                {/* Metric Value */}
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    color: step.isReduction ? C.success : step.active ? C.primary : C.text,
                    background: step.active ? C.primaryLight : C.bgCard,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: `1px solid ${step.active ? `${C.primary}20` : C.border}`,
                    minWidth: '40px',
                    textAlign: 'center',
                  }}
                >
                  {step.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer Banner ── */}
      <div
        style={{
          padding: '8px',
          borderTop: `1px solid ${C.borderLight}`,
          background: C.bgCard,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <span style={{ fontSize: '9px', fontWeight: 600, color: C.textSec, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          Final Triage Rate: <span style={{ color: C.primary }}>95% Noise Eliminated</span>
        </span>
      </div>
    </div>
  );
}
