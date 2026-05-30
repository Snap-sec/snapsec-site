import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

// Risk Signal Rule Builder mockup — mirrors real ASM guided rule editor
function RuleBuilderMockup() {
  const conditions = [
    { field: 'Asset Type', op: 'is',  value: 'Port',        color: '#7C3AED' },
    { field: 'Service',    op: 'is',  value: 'SSH (22)',     color: '#DC2626' },
    { field: 'Exposure',   op: 'is',  value: 'External',    color: '#EA580C' },
    { field: 'Network',    op: 'is',  value: 'Public IP',   color: '#059669' },
  ];

  return (
    <div style={{ background: '#fff', borderRadius: '8px', border: '0.5px solid #D9D9D9', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid #F0F0F0', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>Guided Rule Editor</span>
          <span style={{ fontSize: '11px', color: '#6E6E6E', marginLeft: '8px' }}>Risk Signal Builder</span>
        </div>
        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: '#EDE9FE', color: '#7C3AED', fontWeight: 600 }}>LIVE YAML</span>
      </div>
      {/* Rule name */}
      <div style={{ padding: '12px 16px', borderBottom: '0.5px solid #F0F0F0', background: '#FAFAFA' }}>
        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rule Name</span>
        <div style={{ marginTop: 4, fontSize: '12px', fontWeight: 600, color: '#111827', fontFamily: 'monospace' }}>exposed-ssh-on-public-ip</div>
      </div>
      {/* Conditions */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Conditions</span>
        {conditions.map((cond, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: '110px 36px 1fr', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#111827', padding: '4px 8px', borderRadius: '4px', background: '#F5F5F5', border: '0.5px solid #EEEEEE' }}>{cond.field}</span>
            <span style={{ fontSize: '11px', color: '#6E6E6E', textAlign: 'center', fontWeight: 500 }}>{cond.op}</span>
            <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '4px', background: `${cond.color}12`, color: cond.color, border: `0.5px solid ${cond.color}33`, display: 'inline-block', width: 'fit-content' }}>{cond.value}</span>
          </motion.div>
        ))}
        {/* Match result */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ marginTop: '12px', padding: '12px', borderRadius: '6px', background: '#EDE9FE', border: '0.5px solid #7C3AED33', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 600 }}>17 assets match this signal rule</span>
          <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '4px', background: '#7C3AED', color: '#fff', fontWeight: 500 }}>Save Rule →</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function TailoredInsightsSection() {
  return (
    <section className="section-tailored-insights">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-xxl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">

          <FadeInBlock>
            <h3 className="heading-h1 w-full lg:max-w-[723px]">
              Detect Exposures with Rule-Based Risk Signals
            </h3>
          </FadeInBlock>

          <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">

            <FadeInBlock delay={0.1}>
              <div className="flex w-full flex-col gap-xl lg:max-w-[386px]">
                <div className="flex flex-col gap-sm">
                  <p className="body-heading-xl">Guided Rule Editor</p>
                  <p className="body-text-m text-gray-900">
                    Build signal detection rules using a visual condition builder — define field, operator, and value. Support for multiple conditions, live YAML preview, and instant asset matching. No code required.
                  </p>
                </div>
                <div className="flex flex-col gap-sm">
                  <p className="body-heading-xl">From Detection to Action</p>
                  <p className="body-text-m text-gray-900">
                    Signals evaluate assets after each scan. Detected exposures surface as violations with severity, trends, and impacted asset lists. Security teams can export findings, create VM tickets, and track remediation — all from one place.
                  </p>
                </div>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.2}>
              <div className="flex w-full flex-col gap-sm lg:max-w-[468px] lg:gap-md">
                <RuleBuilderMockup />
                <p className="body-text-xs text-gray-1000">
                  Risk Signals re-sync automatically after each scan to validate whether exposures have been remediated, giving teams continuous feedback on their attack surface posture.
                </p>
              </div>
            </FadeInBlock>

          </div>

        </div>
      </div>
    </section>
  );
}
