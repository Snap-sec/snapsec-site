import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0, className = 'w-full' }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ASM Discovery Sources Graph — wide layout, sources left → engine center → outputs right
function IntegrationGraph() {
  const integrations = [
    { name: 'CT Logs',   y: 30,  color: '#6366F1' },
    { name: 'DNS',       y: 90,  color: '#0EA5E9' },
    { name: 'Port Scan', y: 150, color: '#7C3AED' },
    { name: 'Shodan',    y: 210, color: '#DC2626' },
    { name: 'WHOIS',     y: 270, color: '#059669' },
    { name: 'Web Crawl', y: 330, color: '#D97706' },
    { name: 'OSINT',     y: 390, color: '#374151' },
  ];

  // Hub sits in the horizontal center of the wide viewBox
  const HUB_X = 420;
  const HUB_Y = 210;

  const outputs = [
    { label: 'Asset Catalog', y: 130 },
    { label: 'Risk Signals',  y: 210 },
    { label: 'Reports',       y: 290 },
  ];

  return (
    <svg
      viewBox="0 0 720 420"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Subtle grid background */}
      <pattern id="igGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
      </pattern>
      <rect width="720" height="420" fill="url(#igGrid)" />

      {/* ── Hub pulse ring ── */}
      <motion.circle
        cx={HUB_X} cy={HUB_Y} r="48"
        fill="#7C3AED" fillOpacity="0.06"
        stroke="#7C3AED" strokeWidth="1"
        animate={{ r: [48, 60, 48], strokeOpacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={HUB_X} cy={HUB_Y} r="32" fill="#7C3AED" fillOpacity="0.12" />
      <circle cx={HUB_X} cy={HUB_Y} r="20" fill="#7C3AED" />
      <text x={HUB_X} y={HUB_Y - 2} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="'Inter', sans-serif">ASM</text>
      <text x={HUB_X} y={HUB_Y + 10} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.8)" fontFamily="'Inter', sans-serif">ENGINE</text>

      {/* ── Left: source nodes → hub ── */}
      {integrations.map((intg, i) => (
        <motion.g
          key={intg.name}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
        >
          {/* Dashed line: node → hub */}
          <motion.line
            x1={90} y1={intg.y}
            x2={HUB_X - 22} y2={HUB_Y}
            stroke="#D1D5DB"
            strokeWidth="1"
            strokeDasharray="5 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
          />
          {/* Outer glow ring */}
          <circle cx={52} cy={intg.y} r="22" fill={intg.color} fillOpacity="0.1" stroke={intg.color} strokeWidth="0.8" strokeOpacity="0.4" />
          {/* Solid node */}
          <circle cx={52} cy={intg.y} r="14" fill={intg.color} />
          {/* 2-letter abbrev */}
          <text x={52} y={intg.y + 4} textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700" fontFamily="'Inter', monospace">
            {intg.name.slice(0, 2).toUpperCase()}
          </text>
          {/* Label */}
          <text x={74} y={intg.y + 4} fontSize="11" fill="#6B7280" fontFamily="'Inter', sans-serif" fontWeight="500">
            {intg.name}
          </text>
        </motion.g>
      ))}

      {/* ── Right: hub → outputs ── */}
      {outputs.map((out, i) => (
        <motion.g
          key={out.label}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 + i * 0.15, duration: 0.5 }}
        >
          {/* Dashed line: hub → output */}
          <motion.line
            x1={HUB_X + 22} y1={HUB_Y}
            x2={560} y2={out.y}
            stroke="#7C3AED"
            strokeWidth="1"
            strokeDasharray="5 4"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.1 + i * 0.15, duration: 0.5 }}
          />
          {/* Output pill */}
          <rect x={562} y={out.y - 14} width={136} height={28} rx="6"
            fill="#7C3AED" fillOpacity="0.08"
            stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.35"
          />
          <text x={630} y={out.y + 5} textAnchor="middle" fontSize="11" fontWeight="600" fill="#7C3AED" fontFamily="'Inter', sans-serif">
            {out.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export default function IntegrationSection() {
  return (
    <section className="section-visibility-integration">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-lg overflow-hidden px-sm pb-xs pt-xxl sm:px-xl lg:gap-lg lg:px-80px lg:pb-64px lg:pt-88px">

          {/* Heading — single column, no button box */}
          <FadeInBlock delay={0}>
            <div className="flex w-full flex-col gap-sm lg:max-w-[600px]">
              <h3 className="heading-h1 whitespace-nowrap">Multi-Source Asset Discovery</h3>
              <p className="subtitle-m w-full lg:max-w-[480px] text-gray-900">
                ASM ingests data from active scanning, passive intelligence, and OSINT sources to build a complete picture of your external attack surface.
              </p>
            </div>
          </FadeInBlock>

          {/* Content: text left, full-width graph right */}
          <div className="flex flex-col gap-lg lg:flex-row lg:items-center">
            <FadeInBlock delay={0.15}>
              <div className="flex w-full flex-col gap-md lg:w-[320px] lg:shrink-0">
                <p className="body-text-m">
                  ASM combines <b>active scanning</b> (ports, services, web validation) with <b>passive intelligence</b> (CT logs, DNS, internet datasets) and technology fingerprinting to build a continuously updated, enriched asset inventory.
                </p>
                <p className="body-text-m">
                  Every discovered asset is classified, enriched with metadata (WAF, ASN, tech stack), and correlated with related entities — giving you complete external visibility with no manual effort.
                </p>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.25} className="flex-1 min-h-[340px] lg:min-h-[420px] relative">
              <div className="pointer-events-none absolute inset-0">
                <IntegrationGraph />
              </div>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
