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

// Query Builder UI mockup
function QueryBuilderImage() {
  const conditions = [
    { field: 'Type', op: 'is', value: 'API Key', color: '#004DFF' },
    { field: 'Risk', op: '≥', value: 'High', color: '#DC2626' },
    { field: 'Last Rotated', op: '>', value: '90 days', color: '#EA580C' },
    { field: 'Environment', op: 'is', value: 'Production', color: '#059669' },
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      border: '0.5px solid #D9D9D9',
      overflow: 'hidden',
      fontFamily: "'PP Radio Grotesk', sans-serif",
    }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid #F0F0F0', background: '#FAFAFA' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>Query Builder</span>
        <span style={{ fontSize: '11px', color: '#6E6E6E', marginLeft: '8px' }}>Custom NHI filters</span>
      </div>

      {/* Conditions */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {conditions.map((cond, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 40px 1fr',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <span style={{
              fontSize: '11px', fontWeight: 600, color: '#111827',
              padding: '4px 8px', borderRadius: '4px',
              background: '#F5F5F5', border: '0.5px solid #EEEEEE',
            }}>
              {cond.field}
            </span>
            <span style={{
              fontSize: '11px', color: '#6E6E6E',
              textAlign: 'center', fontWeight: 500,
            }}>
              {cond.op}
            </span>
            <span style={{
              fontSize: '11px', fontWeight: 600,
              padding: '4px 10px', borderRadius: '4px',
              background: `${cond.color}12`,
              color: cond.color,
              border: `0.5px solid ${cond.color}33`,
              display: 'inline-block',
              width: 'fit-content',
            }}>
              {cond.value}
            </span>
          </motion.div>
        ))}

        {/* Result */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '12px',
            padding: '12px',
            borderRadius: '6px',
            background: '#F0F4FF',
            border: '0.5px solid #004DFF33',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#004DFF', fontWeight: 600 }}>
            23 NHIs match this query
          </span>
          <span style={{
            fontSize: '11px', padding: '4px 10px', borderRadius: '4px',
            background: '#004DFF', color: '#fff', fontWeight: 500,
          }}>
            Run Query →
          </span>
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
              Unlock Tailored Insights Using Clutch's Powerful Query Builder
            </h3>
          </FadeInBlock>

          <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">

            <FadeInBlock delay={0.1}>
              <div className="flex w-full flex-col gap-xl lg:max-w-[386px]">
                <div className="flex flex-col gap-sm">
                  <p className="body-heading-xl">Tailored Data Consumption</p>
                  <p className="body-text-m text-gray-900">
                    Clutch's advanced query builder enables security teams to create multi-conditional queries with detailed granularity, allowing them to consume Clutch's contextualized inventory in the way that best suits their needs and workflows.
                  </p>
                </div>
                <div className="flex flex-col gap-sm">
                  <p className="body-heading-xl">Flexible Breach Containment Options</p>
                  <p className="body-text-m text-gray-900">
                    Clutch facilitates a wide range of query options, enabling security teams to understand the potential impact of breaches, such as identifying unrotated NHIs from compromised applications, and covering various practices and scenarios.
                  </p>
                </div>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.2}>
              <div className="flex w-full flex-col gap-sm lg:max-w-[468px] lg:gap-md">
                <QueryBuilderImage />
                <p className="body-text-xs text-gray-1000">
                  Complex ecosystems, workflows, and technology stacks may require security teams to move beyond inventory lists and actively query data in more dynamic and flexible ways.
                </p>
              </div>
            </FadeInBlock>

          </div>

        </div>
      </div>
    </section>
  );
}
