import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// Animated integration graph showing NHI connections
function IntegrationGraph() {
  const integrations = [
    { name: 'GitHub', y: 40, color: '#24292E' },
    { name: 'AWS IAM', y: 90, color: '#FF9900' },
    { name: 'Okta', y: 140, color: '#007DC1' },
    { name: 'GCP', y: 190, color: '#4285F4' },
    { name: 'Vault', y: 240, color: '#000000' },
    { name: 'Azure AD', y: 290, color: '#0089D6' },
    { name: 'Jenkins', y: 340, color: '#D33833' },
  ];

  return (
    <svg viewBox="0 0 328 385" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {/* Central hub */}
      <motion.circle
        cx="164" cy="192" r="40"
        fill="#004DFF"
        fillOpacity="0.08"
        stroke="#004DFF"
        strokeWidth="1"
        animate={{ r: [40, 48, 40] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx="164" cy="192" r="28" fill="#004DFF" fillOpacity="0.12" />
      <circle cx="164" cy="192" r="18" fill="#004DFF" />
      <text x="164" y="196" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="'PP Radio Grotesk', sans-serif">NHI</text>
      <text x="164" y="206" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="'PP Radio Grotesk', sans-serif">HUB</text>

      {/* Integration connections */}
      {integrations.map((intg, i) => (
        <motion.g
          key={intg.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        >
          {/* Line from left side to center */}
          <motion.line
            x1="80" y1={intg.y}
            x2="146" y2="192"
            stroke="#D9D9D9"
            strokeWidth="1"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
          />
          {/* Node circle */}
          <circle cx="56" cy={intg.y} r="20" fill={intg.color} fillOpacity="0.1" stroke={intg.color} strokeWidth="1" />
          <circle cx="56" cy={intg.y} r="12" fill={intg.color} />
          <text x="56" y={intg.y + 3} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600" fontFamily="monospace">
            {intg.name.slice(0, 2).toUpperCase()}
          </text>
          {/* Label */}
          <text x="82" y={intg.y + 4} fontSize="10" fill="#6E6E6E" fontFamily="'PP Radio Grotesk', sans-serif">
            {intg.name}
          </text>
        </motion.g>
      ))}

      {/* Right side outputs */}
      {[
        { label: 'Inventory', y: 130 },
        { label: 'Context', y: 192 },
        { label: 'Lineage', y: 254 },
      ].map((out, i) => (
        <motion.g
          key={out.label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.15 }}
        >
          <motion.line
            x1="182" y1="192"
            x2="240" y2={out.y}
            stroke="#004DFF"
            strokeWidth="1"
            strokeDasharray="4 3"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
          />
          <rect x="242" y={out.y - 12} width="72" height="24" rx="4" fill="#004DFF" fillOpacity="0.08" stroke="#004DFF" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="278" y={out.y + 4} textAnchor="middle" fontSize="10" fontWeight="500" fill="#004DFF" fontFamily="'PP Radio Grotesk', sans-serif">
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

          {/* Heading row */}
          <div className="flex flex-col gap-lg lg:flex-row lg:items-start lg:justify-between">
            <FadeInBlock delay={0}>
              <div className="flex w-full flex-col gap-sm lg:max-w-[524px]">
                <h3 className="heading-h1">Seamless Integration for Non-Human Identity Data</h3>
                <p className="subtitle-m w-full lg:max-w-[416px] text-gray-900">
                  Integrates seamlessly and gathers vital information from various systems and tools
                </p>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.1}>
              <div className="flex w-full flex-col gap-md sm:flex-row sm:items-center sm:justify-between lg:mt-sm lg:max-w-[204px] lg:flex-col lg:items-start lg:justify-start">
                <div className="flex items-center gap-xs label-text-m">
                  Introducing <span className="font-bold text-black ml-xs">Clutch</span>
                </div>
                <div className="w-full sm:w-auto lg:w-full">
                  <a className="button-primary-m w-full sm:w-auto lg:w-full" href="/book-demo">
                    <span className="block">See Clutch in Action <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">→</span></span>
                  </a>
                </div>
              </div>
            </FadeInBlock>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-sm lg:flex-row lg:items-center lg:gap-140px">
            <FadeInBlock delay={0.15}>
              <div className="flex w-full flex-col gap-md lg:max-w-[352px]">
                <p className="body-text-m">
                  This information is compiled into a <b>comprehensive inventory of all NHIs and presented in a clear graph view</b>, enabling security teams to understand their Non-Human Identity footprint across the enterprise.
                </p>
                <p className="body-text-m">
                  With Clutch, you can finally see the full picture of your digital Non‑Human Identity ecosystem, enabling you to <b>secure your NHIs everywhere</b>.
                </p>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.25}>
              <div className="pointer-events-none relative aspect-[328/385] w-full lg:max-w-[328px]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-sm w-full bg-gradient-to-b from-white to-transparent z-10" />
                <IntegrationGraph />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-sm w-full bg-gradient-to-t from-white to-transparent z-10" />
              </div>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
