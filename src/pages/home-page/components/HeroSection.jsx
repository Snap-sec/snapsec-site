import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ─── Theme tokens ───────────────────────────────────────
const T = {
  bg: '#FFFFFF',
  panel: '#F9FAFB',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  text: '#111827',
  textSec: '#6B7280',
  textMuted: '#9CA3AF',
  accent: '#004DFF',
  critical: '#DC2626',
  high: '#EA580C',
  medium: '#CA8A04',
  low: '#2563EB',
  success: '#059669',
};

const sevDot = { Critical: T.critical, High: T.high, Medium: T.medium, Low: T.low };
const statusStyle = {
  Open: { bg: '#FEF2F2', color: T.critical },
  'In Progress': { bg: '#FFF7ED', color: T.high },
  Resolved: { bg: '#F0FDF4', color: T.success },
};

// ─── Chart geometry ─────────────────────────────────────
const chartLine =
  'M 0 72 C 30 72 70 56 100 56 C 130 56 170 74 200 74 C 230 74 270 40 300 40 C 330 40 370 56 400 56 C 430 56 470 28 500 28 C 530 28 570 50 600 50 C 630 50 670 36 700 36';
const chartArea = chartLine + ' L 700 120 L 0 120 Z';
const dots = [[0,72],[100,56],[200,74],[300,40],[400,56],[500,28],[600,50],[700,36]];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];

// ─── Static data ────────────────────────────────────────
const metrics = [
  { value: '1,247', label: 'Total Assets', change: '+12.3%', up: true },
  { value: '247', label: 'Open Findings', change: '-8.1%', up: false },
  { value: '23', label: 'Exposures', change: '-15.4%', up: false },
  { value: '94%', label: 'SLA Compliance', change: '+3.2%', up: true },
];

const rows = [
  { id: 'CVE-2024-3891', asset: 'api.acme.com', sev: 'Critical', status: 'Open' },
  { id: 'CVE-2024-3654', asset: 'cdn.acme.com', sev: 'High', status: 'In Progress' },
  { id: 'CVE-2024-3421', asset: 'auth.acme.com', sev: 'Medium', status: 'Resolved' },
  { id: 'CVE-2024-3102', asset: 'store.acme.com', sev: 'Low', status: 'Resolved' },
];

const tabs = ['Overview', 'Findings', 'Assets', 'Exposures'];

// ─── Trend arrow SVG ────────────────────────────────────
function TrendArrow({ up }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ display: 'inline-block' }}>
      {up ? (
        <path d="M5 2L8 5.5H2L5 2Z" fill={T.success} />
      ) : (
        <path d="M5 8L8 4.5H2L5 8Z" fill={T.success} />
      )}
    </svg>
  );
}

// ─── Hero Dashboard ─────────────────────────────────────
function HeroDashboard() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: T.bg,
          borderRadius: '12px',
          border: `1px solid ${T.border}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Tab Bar ── */}
        <div
          style={{
            display: 'flex',
            borderBottom: `1px solid ${T.border}`,
            padding: '0 24px',
          }}
        >
          {tabs.map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: '13px 16px 11px',
                fontSize: '13px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? T.text : T.textSec,
                borderBottom: i === 0 ? `2px solid ${T.text}` : '2px solid transparent',
                marginBottom: '-1px',
                letterSpacing: '-0.01em',
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '24px' }}>

          {/* Metric Cards */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ gap: '12px', marginBottom: '24px' }}
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                style={{
                  padding: '16px 18px',
                  borderRadius: '8px',
                  border: `1px solid ${T.borderLight}`,
                  background: T.panel,
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: T.textSec,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      color: T.text,
                      fontFamily: "'Space Grotesk', sans-serif",
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: T.success,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    <TrendArrow up={m.up} />
                    {m.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Chart Panel ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              marginBottom: '20px',
              padding: '20px 20px 16px',
              borderRadius: '8px',
              border: `1px solid ${T.borderLight}`,
              background: T.panel,
            }}
          >
            {/* Chart header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: T.text,
                  letterSpacing: '-0.01em',
                }}
              >
                Findings Trend
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '3px',
                      borderRadius: '2px',
                      background: T.accent,
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ fontSize: '11px', color: T.textMuted, fontWeight: 500 }}>
                    Total
                  </span>
                </span>
                <span style={{ fontSize: '11px', color: T.textMuted }}>Last 8 months</span>
              </div>
            </div>

            {/* SVG Chart */}
            <svg
              viewBox="0 0 700 130"
              className="w-full"
              preserveAspectRatio="none"
              style={{ overflow: 'visible', display: 'block' }}
            >
              {/* Horizontal grid */}
              {[30, 55, 80, 105].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="700"
                  y2={y}
                  stroke={T.borderLight}
                  strokeWidth="1"
                />
              ))}

              {/* Gradient fill */}
              <defs>
                <linearGradient id="heroAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.accent} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={T.accent} stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Area */}
              <motion.path
                d={chartArea}
                fill="url(#heroAreaFill)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.0 }}
              />

              {/* Line */}
              <motion.path
                d={chartLine}
                fill="none"
                stroke={T.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
              />

              {/* Data dots */}
              {dots.map(([x, y], i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#fff"
                  stroke={T.accent}
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.25, type: 'spring' }}
                />
              ))}

              {/* Tooltip on peak (x=500, y=28) */}
              <motion.g
                initial={{ opacity: 0, y: 5 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.4, duration: 0.35 }}
              >
                <rect x="467" y="4" width="66" height="20" rx="5" fill={T.text} />
                <text
                  x="500"
                  y="17"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  58 findings
                </text>
                <polygon points="497,24 500,29 503,24" fill={T.text} />
              </motion.g>
            </svg>

            {/* Month labels */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
              }}
            >
              {months.map((m) => (
                <span
                  key={m}
                  style={{
                    fontSize: '10px',
                    color: T.textMuted,
                    fontWeight: 500,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Findings Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              borderRadius: '8px',
              border: `1px solid ${T.borderLight}`,
              overflow: 'hidden',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1.3fr 0.8fr 0.7fr',
                padding: '10px 20px',
                background: T.panel,
                borderBottom: `1px solid ${T.borderLight}`,
              }}
            >
              {['FINDING', 'ASSET', 'SEVERITY', 'STATUS'].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: T.textMuted,
                    letterSpacing: '0.06em',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Table rows */}
            {rows.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.75 + i * 0.06 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 1.3fr 0.8fr 0.7fr',
                  padding: '11px 20px',
                  background: '#fff',
                  borderBottom:
                    i < rows.length - 1 ? `1px solid ${T.borderLight}` : 'none',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: T.text,
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '-0.01em',
                  }}
                >
                  {r.id}
                </span>
                <span style={{ fontSize: '12px', color: T.textSec }}>{r.asset}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: sevDot[r.sev],
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '12px', color: T.textSec }}>{r.sev}</span>
                </span>
                <span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: statusStyle[r.status].bg,
                      color: statusStyle[r.status].color,
                    }}
                  >
                    {r.status}
                  </span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hero Section ───────────────────────────────────────
export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const words = [
    { text: 'Every Asset.', id: 1 },
    { text: 'Every Exposure.', id: 2 },
    { text: 'Every Finding.', id: 3 },
  ];

  return (
    <div className="mt-120px lg:mt-140px">
      <div className="container">
        <div className="section-border flex flex-col gap-md px-sm pb-xxl sm:px-xl lg:gap-lg lg:px-80px lg:pb-xxl">
          {/* Heading */}
          <div className="mx-auto flex max-w-[734px] flex-col items-center gap-sm text-center lg:gap-md">
            <h1 className="heading-h1 text-gray-700">
              {words.map((word) => (
                <motion.span
                  key={word.id}
                  className={`inline transition-colors duration-300 ease-in-out ${
                    currentWord === word.id ? 'text-black' : ''
                  }`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: (word.id - 1) * 0.15 }}
                >
                  {word.text}{' '}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="w-full flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <p className="subtitle-m w-full max-w-[520px] text-gray-900 text-center flex flex-col items-center justify-center">
                <span>Unify discovery, vulnerability management, intelligence,</span>
                <span>and protection across your entire ecosystem.</span>
              </p>
            </motion.div>
          </div>

          {/* Dashboard */}
          <motion.div
            className="w-full lg:mx-auto lg:max-w-[900px] midlg:max-w-[1100px]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
