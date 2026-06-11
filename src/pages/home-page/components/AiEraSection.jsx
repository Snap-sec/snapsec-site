import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const illustrationItems = [
  { icon: '/assets/user.svg', label: 'Attack Surface Management (ASM)' },
  { icon: '/assets/medal.svg', label: 'Asset Inventory Management (AIM)' },
  { icon: '/assets/apps.svg', label: 'Vulnerability Scanning (VS)' },
  { icon: '/assets/robot.svg', label: 'Web Application Scanner (WAS)' },
  { icon: '/assets/identity-lineage.svg', label: 'Vulnerability Management (VM)' },
];

export default function AiEraSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="overflow-hidden">
      <div className="container">
        <div
          ref={ref}
          className="section-border section-border-top flex flex-col gap-xl overflow-hidden px-sm pt-[100px] pb-xxl sm:px-xl lg:gap-96px lg:px-80px lg:py-88px"
        >
          {/* Top area */}
          <div className="flex flex-col gap-xl lg:flex-row lg:items-center lg:justify-between lg:gap-lg">
            {/* Left info */}
            <div className="flex flex-col items-start gap-md lg:max-w-[480px] lg:gap-lg">
              <div className="flex flex-col gap-sm">
                {/* Mobile introducing */}
                <div className="flex items-center gap-xs font-primary text-[13px] font-medium uppercase leading-[140%] tracking-[0.16em] lg:hidden">
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    Introducing
                  </motion.span>
                  <motion.img
                    src="/assets/snapsec-logo.png"
                    alt="Snapsec"
                    className="w-[120px] select-none"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </div>

                <h3 className="heading-h1 max-w-[801px]">
                  5 Modules, One Platform
                </h3>
              </div>

              <p className="subtitle-l lg:max-w-[451px]">
                Powered by the{' '}
                <b>
                  Snapsec Shared Data Layer
                </b>, which connects external discovery, automated scanners, asset catalogs, and vulnerability tickets into a single unified workspace. One platform. Complete context. Across every team.
              </p>
            </div>

            {/* Right illustration */}
            <div className="flex flex-col gap-lg w-full lg:w-auto">
              {/* Desktop introducing */}
              <div className="hidden items-center gap-xs font-primary text-[13px] font-medium uppercase leading-[140%] tracking-[0.16em] lg:flex">
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  Introducing
                </motion.span>
                <motion.img
                  src="/assets/snapsec-logo.png"
                  alt="Snapsec"
                  className="w-[120px] select-none"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
              </div>

              {/* Illustration items */}
              <div className="relative flex flex-col items-start gap-midsm pl-xl w-full">
                {/* Arrows */}
                <div className="pointer-events-none absolute left-0 top-midmd">
                  <img src="/assets/arrow-first.svg" alt="" className="w-midmd" />
                </div>
                {[94, 154, 214].map((top, i) => (
                  <div
                    key={i}
                    className="pointer-events-none absolute left-0"
                    style={{ top: `${top}px` }}
                  >
                    <img src="/assets/arrow.svg" alt="" className="w-[17px]" />
                  </div>
                ))}

                {/* Items */}
                {illustrationItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="hover-lift group relative flex h-xxl items-center gap-xs rounded-8 border-[0.5px] border-black bg-white px-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    {i < illustrationItems.length - 1 && (
                      <div className="pointer-events-none absolute -bottom-xs -left-[28px] h-[0.5px] w-xs bg-gray-700" />
                    )}
                    <img src={item.icon} alt={item.label} className="w-[18px] h-[18px] shrink-0" />
                    <span className="subtitle-s shrink-0">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div className="group relative flex flex-col gap-md overflow-hidden border-[0.5px] border-[#D9D9D9] p-md lg:flex-row lg:items-center lg:justify-between lg:py-[33px] lg:px-xxl">
            {/* Full Card Background with Blur */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
              <div className="absolute inset-0 opacity-[0.08] blur-[1px]" style={{
                backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                backgroundSize: '16px 16px'
              }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/8 blur-[80px]" />
            </div>

            <p className="subtitle-m relative z-[2] lg:max-w-[650px]">
              Snapsec Suite provides complete visibility, governance, and SLA
              enforcement across your entire application and infrastructure footprint.
            </p>
            <a
              href="https://suite.snapsec.co/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary-m shrink-0 relative z-[2] text-center"
            >
              Explore Live Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-xxs">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
