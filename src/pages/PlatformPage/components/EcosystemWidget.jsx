import React from 'react';

const C = {
  primary: '#004DFF',
  success: '#10B981',
  border: '#EEEEEE',
  borderLight: '#F5F5F5',
  bgCard: '#FAFAFA',
  text: '#1A1A1A',
  textSec: '#6E6E6E',
};

// ─── Brand SVG Icons ────────────────────────────────────
const BrandIcons = {
  aws: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6.76 11.11c0 .28.03.5.08.68.06.17.13.36.23.56.04.06.05.13.05.18 0 .08-.05.16-.15.24l-.51.34c-.07.05-.14.07-.2.07-.08 0-.16-.04-.23-.12a2.4 2.4 0 01-.28-.36 6.3 6.3 0 01-.24-.45c-.6.71-1.36 1.07-2.27 1.07-.65 0-1.17-.19-1.55-.56-.38-.37-.58-.87-.58-1.49 0-.66.23-1.2.7-1.6.47-.41 1.09-.61 1.88-.61.26 0 .53.02.81.06.28.04.57.1.88.18v-.57c0-.59-.12-1-.37-1.25-.25-.24-.67-.36-1.27-.36-.27 0-.55.03-.84.1s-.57.16-.84.27a2.1 2.1 0 01-.25.1c-.05.02-.09.02-.12.02-.1 0-.16-.08-.16-.23v-.4c0-.12.01-.21.05-.26.04-.06.1-.11.2-.16.28-.14.6-.26.99-.35.38-.1.78-.14 1.21-.14.92 0 1.6.21 2.02.63.42.42.63 1.06.63 1.92v2.53zm-3.13 1.17c.25 0 .51-.05.79-.14.27-.09.51-.26.72-.49.12-.15.22-.31.27-.5.06-.19.09-.42.09-.69v-.33a6.5 6.5 0 00-.7-.13 5.7 5.7 0 00-.72-.04c-.51 0-.89.1-1.14.31-.25.21-.37.51-.37.9 0 .36.09.63.29.82.19.19.47.29.77.29zm6.18.82c-.13 0-.22-.02-.28-.07-.06-.04-.12-.14-.16-.28l-1.83-6.02a1.24 1.24 0 01-.07-.3c0-.12.06-.18.18-.18h.58c.14 0 .23.02.28.07.06.04.11.14.15.28l1.31 5.16 1.21-5.16c.04-.15.09-.24.15-.28.06-.04.16-.07.29-.07h.47c.14 0 .23.02.29.07.06.04.11.14.15.28l1.23 5.23 1.35-5.23c.04-.15.1-.24.15-.28a.5.5 0 01.29-.07h.55c.12 0 .18.06.18.18 0 .04-.01.07-.02.12-.01.04-.03.1-.06.18l-1.87 6.02c-.05.15-.1.24-.17.28-.06.04-.15.07-.28.07h-.51c-.14 0-.23-.02-.29-.07-.06-.05-.11-.14-.15-.29l-1.21-5.03-1.2 5.03c-.04.15-.09.24-.15.29-.06.05-.16.07-.29.07h-.51zm9.89.23c-.4 0-.8-.05-1.18-.14-.39-.1-.69-.2-.89-.33-.12-.07-.2-.15-.23-.22a.56.56 0 01-.04-.2v-.42c0-.15.06-.23.17-.23.05 0 .1.01.15.03.05.02.13.06.21.1.29.13.6.23.93.31.34.08.66.11 1 .11.53 0 .94-.09 1.22-.28.28-.19.43-.46.43-.81 0-.24-.08-.43-.23-.58-.15-.15-.44-.28-.85-.41l-1.22-.38c-.61-.19-1.07-.48-1.34-.85-.28-.37-.42-.78-.42-1.22 0-.35.08-.66.23-.93.15-.27.36-.51.62-.7.26-.19.55-.34.9-.44.34-.1.7-.15 1.08-.15.19 0 .39.01.59.04.21.03.4.07.58.12.18.05.34.1.49.16.15.06.26.12.34.18.11.07.2.15.24.22.05.07.07.17.07.29v.39c0 .15-.06.23-.17.23a.83.83 0 01-.3-.1 3.6 3.6 0 00-1.52-.31c-.48 0-.86.08-1.12.24-.27.16-.4.4-.4.74 0 .24.08.44.25.6.17.16.48.31.92.45l1.19.37c.61.2 1.04.47 1.31.82.26.35.39.75.39 1.19 0 .36-.07.69-.22.97-.15.29-.36.54-.62.74-.26.21-.58.36-.94.47-.38.11-.77.17-1.19.17z" fill="#252F3E"/>
      <path d="M21.37 16.47c-2.6 1.93-6.38 2.95-9.63 2.95-4.56 0-8.66-1.69-11.76-4.49-.24-.22-.03-.52.27-.35 3.35 1.95 7.49 3.12 11.77 3.12 2.89 0 6.06-.6 8.98-1.84.44-.19.81.29.37.61z" fill="#FF9900"/>
      <path d="M22.39 15.31c-.33-.43-2.2-.2-3.04-.1-.26.03-.29-.19-.07-.36 1.49-1.04 3.93-.74 4.21-.39.29.36-.08 2.83-1.47 4.01-.21.18-.42.08-.32-.15.31-.78 1.02-2.59.69-3.01z" fill="#FF9900"/>
    </svg>
  ),
  azure: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M13.05 4.24L7.56 18.04L2 18.06L9.11 4.24H13.05Z" fill="#0078D4"/>
      <path d="M14.07 6.72L17.39 14.28L8.31 18.04L19.53 18.04L22 18.06L14.07 6.72Z" fill="#0078D4" fillOpacity="0.8"/>
      <path d="M9.11 4.24L2 18.06L8.31 18.04L11.03 11.51L9.11 4.24Z" fill="#0078D4" fillOpacity="0.6"/>
    </svg>
  ),
  gcp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M15.65 8.84h1.07l3.05-3.05.15-1.3A10.52 10.52 0 0012.01 1.5a10.49 10.49 0 00-9.03 5.15l1.1-.15 6.1-1.01.49-.5a4.38 4.38 0 015.98 1.85l-.01 2z" fill="#EA4335"/>
      <path d="M20.44 6.65A10.46 10.46 0 0022.5 12c0 1.93-.54 3.75-1.47 5.3l-4.32-3.4.01-.02a4.4 4.4 0 00-.02-4.02l3.74-3.21z" fill="#4285F4"/>
      <path d="M7.13 14.08a4.38 4.38 0 01-.66-2.3c0-.83.23-1.61.64-2.27l-3.74-3.19A10.46 10.46 0 001.5 12c0 2.92 1.2 5.56 3.13 7.46l3.7-3.18-.49-.5.29-.5v-1.2z" fill="#FBBC05"/>
      <path d="M12 16.38a4.38 4.38 0 01-4.17-3.04L4.09 16.6A10.48 10.48 0 0012 22.5a10.48 10.48 0 007.72-3.4l-3.58-2.8A4.35 4.35 0 0112 16.39z" fill="#34A853"/>
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.475 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.525-4.475-10-10-10z" fill="#24292E"/>
    </svg>
  ),
  gitlab: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 21.35L18.18 7.52H5.82L12 21.35Z" fill="#E24329"/>
      <path d="M12 21.35L5.82 7.52H1.68L12 21.35Z" fill="#FC6D26"/>
      <path d="M1.68 7.52L.29 11.78c-.13.38 0 .8.32 1.04L12 21.35 1.68 7.52Z" fill="#FCA326"/>
      <path d="M1.68 7.52H5.82L3.92 2.17c-.14-.42-.74-.42-.88 0L1.68 7.52Z" fill="#E24329"/>
      <path d="M12 21.35L18.18 7.52H22.32L12 21.35Z" fill="#FC6D26"/>
      <path d="M22.32 7.52l1.39 4.26c.13.38 0 .8-.32 1.04L12 21.35l10.32-13.83Z" fill="#FCA326"/>
      <path d="M22.32 7.52H18.18l1.9-5.35c.14-.42.74-.42.88 0l1.36 5.35Z" fill="#E24329"/>
    </svg>
  ),
};

const categories = [
  { label: 'Cloud', active: true },
  { label: 'SaaS', active: false },
  { label: 'On-prem', active: false },
  { label: 'Code', active: false },
  { label: 'Identity', active: false },
];

const sources = [
  { name: 'Google Cloud Platform (GCP)', icon: BrandIcons.gcp, type: 'Cloud' },
  { name: 'Amazon Web Services (AWS)', icon: BrandIcons.aws, type: 'Cloud' },
  { name: 'Microsoft Azure', icon: BrandIcons.azure, type: 'Cloud' },
  { name: 'GitHub Enterprise', icon: BrandIcons.github, type: 'Cloud' },
];

export default function EcosystemWidget() {
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
      {/* ── Category tabs ── */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          borderBottom: `1px solid ${C.border}`,
          padding: '0 20px',
          overflowX: 'auto',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.label}
            style={{
              padding: '11px 14px',
              fontSize: '11px',
              fontWeight: cat.active ? 600 : 500,
              color: cat.active ? C.text : C.textSec,
              borderBottom: cat.active ? `2px solid ${C.text}` : '2px solid transparent',
              cursor: 'default',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.label}
          </div>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '400px' }}>
      {/* ── Table header ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 72px 72px',
          padding: '9px 20px',
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 500, color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Data Sources
        </span>
        <span style={{ fontSize: '10px', fontWeight: 500, color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
          Type
        </span>
        <span style={{ fontSize: '10px', fontWeight: 500, color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>
          Status
        </span>
      </div>

      {/* ── Rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sources.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 72px 72px',
              alignItems: 'center',
              padding: '10px 20px',
              borderBottom: i < sources.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            }}
          >
            {/* Name with brand icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '7px',
                  background: C.bgCard,
                  border: `1px solid ${C.borderLight}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: C.text }}>
                {s.name}
              </span>
            </div>

            {/* Type */}
            <span style={{ fontSize: '11px', color: C.textSec, textAlign: 'center' }}>
              {s.type}
            </span>

            {/* Status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.success }} />
              <span style={{ fontSize: '11px', fontWeight: 500, color: C.success }}>Active</span>
            </div>
          </div>
        ))}
      </div>
        </div>
      </div>
    </div>
  );
}
