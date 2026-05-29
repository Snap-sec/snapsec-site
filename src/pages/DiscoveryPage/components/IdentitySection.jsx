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

// Identity Lineage visual — a flow diagram
function IdentityLineageImage() {
  const nodes = [
    { id: 'user', label: 'John Doe', sublabel: 'Owner', x: 120, y: 80, shape: 'person' },
    { id: 'github', label: 'GitHub Repo', sublabel: 'Source', x: 320, y: 40, shape: 'box' },
    { id: 'key', label: 'API Key', sublabel: 'NHI', x: 520, y: 80, shape: 'key', highlight: true },
    { id: 'pipeline', label: 'CI/CD Pipeline', sublabel: 'Consumer', x: 720, y: 40, shape: 'box' },
    { id: 'aws', label: 'AWS S3', sublabel: 'Resource', x: 900, y: 80, shape: 'cloud' },
    { id: 'vault', label: 'HashiCorp Vault', sublabel: 'Storage', x: 320, y: 180, shape: 'box' },
    { id: 'prod', label: 'Production', sublabel: 'Environment', x: 720, y: 180, shape: 'box' },
  ];

  const edges = [
    ['user', 'key'],
    ['github', 'key'],
    ['key', 'pipeline'],
    ['pipeline', 'aws'],
    ['vault', 'key'],
    ['key', 'prod'],
  ];

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <svg viewBox="0 0 1060 260" className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="arrowLineage" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#D9D9D9" />
        </marker>
      </defs>

      {/* Background grid */}
      <pattern id="lgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F0F0F0" strokeWidth="0.5" />
      </pattern>
      <rect width="1060" height="260" fill="url(#lgGrid)" />

      {/* Edges */}
      {edges.map(([from, to], i) => {
        const f = nodeMap[from];
        const t = nodeMap[to];
        return (
          <motion.line
            key={i}
            x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke="#D9D9D9"
            strokeWidth="1.5"
            markerEnd="url(#arrowLineage)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          {node.highlight ? (
            <>
              <rect
                x={node.x - 36} y={node.y - 22}
                width="72" height="44"
                rx="6"
                fill="#004DFF"
                stroke="#004DFF"
                strokeWidth="1"
              />
              <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="'PP Radio Grotesk', sans-serif">{node.label}</text>
              <text x={node.x} y={node.y + 12} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="'PP Radio Grotesk', sans-serif">{node.sublabel}</text>
            </>
          ) : (
            <>
              <rect
                x={node.x - 36} y={node.y - 22}
                width="72" height="44"
                rx="6"
                fill="#fff"
                stroke="#D9D9D9"
                strokeWidth="1"
              />
              <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#111827" fontFamily="'PP Radio Grotesk', sans-serif">{node.label}</text>
              <text x={node.x} y={node.y + 12} textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="'PP Radio Grotesk', sans-serif">{node.sublabel}</text>
            </>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

export default function IdentitySection() {
  return (
    <section className="section-visibility-identity">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-lg overflow-hidden px-sm pt-xxl sm:px-xl lg:gap-64px lg:px-80px lg:pt-88px">

          {/* Heading */}
          <div className="flex flex-col gap-lg lg:flex-row lg:items-start lg:justify-between">
            <FadeInBlock delay={0}>
              <div className="flex w-full flex-col gap-sm lg:max-w-[504px]">
                <h3 className="heading-h1">
                  <span className="gradient-text-blue">Identity Lineage®</span>
                </h3>
                <p className="subtitle-m w-full lg:max-w-[365px] text-gray-900">
                  Quickly understand the full context of any Non-Human Identity with Clutch's Identity Lineage®
                </p>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.1}>
              <div className="flex w-full flex-col gap-md sm:flex-row sm:items-center sm:justify-between lg:max-w-[386px] lg:flex-col lg:items-start lg:justify-start">
                <p className="body-text-m">
                  <b>Identity Lineage<sup>®</sup></b> provides a contextualized view of any Non-Human Identity, offering detailed insights into how it operates and empowering security teams with a deep understanding of the organizational ecosystem through simple and intuitive visualization.
                </p>
              </div>
            </FadeInBlock>
          </div>

        </div>

        {/* Full-width image */}
        <FadeInBlock delay={0.2}>
          <div className="w-full section-border pt-xxl lg:pt-88px overflow-hidden">
            <div className="bg-gray-50 rounded-8 border border-gray-300 p-md overflow-x-auto">
              <IdentityLineageImage />
            </div>
          </div>
        </FadeInBlock>
      </div>
    </section>
  );
}
