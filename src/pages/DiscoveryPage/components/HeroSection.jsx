import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// Simple NHI graph visualization
function NHIGraphCanvas() {
  const nodes = [
    { id: 'aws', label: 'AWS IAM', x: 80, y: 60, color: '#FF9900', size: 10 },
    { id: 'github', label: 'GitHub', x: 220, y: 40, color: '#24292E', size: 8 },
    { id: 'okta', label: 'Okta', x: 360, y: 70, color: '#007DC1', size: 9 },
    { id: 'gcp', label: 'GCP', x: 500, y: 45, color: '#4285F4', size: 8 },
    { id: 'azure', label: 'Azure', x: 580, y: 90, color: '#0089D6', size: 7 },
    { id: 'core', label: 'NHI Hub', x: 310, y: 145, color: '#004DFF', size: 14 },
    { id: 'vault', label: 'Vault', x: 160, y: 170, color: '#000', size: 7 },
    { id: 'k8s', label: 'K8s', x: 440, y: 180, color: '#326CE5', size: 7 },
    { id: 'jenkins', label: 'Jenkins', x: 60, y: 200, color: '#D33833', size: 6 },
    { id: 'terraform', label: 'Terraform', x: 550, y: 200, color: '#7B42BC', size: 6 },
  ];

  const edges = [
    ['core', 'aws'], ['core', 'github'], ['core', 'okta'], ['core', 'gcp'],
    ['core', 'azure'], ['core', 'vault'], ['core', 'k8s'],
    ['aws', 'jenkins'], ['github', 'jenkins'], ['k8s', 'terraform'],
    ['aws', 'github'], ['okta', 'gcp'],
  ];

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <svg viewBox="0 0 632 260" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0f4ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 z" fill="#D9D9D9" />
        </marker>
      </defs>

      {/* Grid background */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
      </pattern>
      <rect width="632" height="260" fill="url(#grid)" opacity="0.6" />

      {/* Edges */}
      {edges.map(([from, to], i) => {
        const f = nodeMap[from];
        const t = nodeMap[to];
        return (
          <motion.line
            key={i}
            x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke="#D9D9D9"
            strokeWidth="1"
            strokeDasharray="4 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 200 }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <circle cx={node.x} cy={node.y} r={node.size + 4} fill={node.color} fillOpacity="0.1" />
          <circle cx={node.x} cy={node.y} r={node.size} fill={node.color} />
          <text
            x={node.x}
            y={node.y + node.size + 11}
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            fill="#6E6E6E"
            fontFamily="'PP Radio Grotesk', sans-serif"
          >
            {node.label}
          </text>
        </motion.g>
      ))}

      {/* Pulse on core node */}
      <motion.circle
        cx={nodeMap['core'].x}
        cy={nodeMap['core'].y}
        r="22"
        fill="none"
        stroke="#004DFF"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        animate={{ r: [22, 34, 22], strokeOpacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function HeroSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section-visibility-hero mt-120px overflow-hidden lg:mt-140px">
      <div className="container">
        <div className="section-border relative flex flex-col gap-xxl overflow-hidden px-sm pt-xxl pb-64px sm:px-xl lg:px-80px lg:pt-88px lg:pb-88px">

          {/* Heading */}
          <FadeInBlock delay={0}>
            <div className="mx-auto flex w-full max-w-[506px] flex-col gap-md text-center">
              <h1 className="heading-hero w-full lg:mx-auto lg:max-w-[480px]">
                Discovery <br className="hidden lg:inline-block" /> &amp; Inventory
              </h1>
              <p className="subtitle-m mx-auto text-center text-gray-900">
                Automatically discovers and correlates all Non-Human Identities into a contextualized inventory
              </p>
            </div>
          </FadeInBlock>

          {/* Graph canvas */}
          <motion.div
            ref={ref}
            className="pointer-events-none relative z-10 mx-auto aspect-[632/260] w-full max-w-[632px]"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="h-full w-full rounded-8 border border-gray-300 bg-white overflow-hidden">
              <NHIGraphCanvas />
            </div>
          </motion.div>

          {/* Grid decoration */}
          <div className="pointer-events-none absolute -bottom-md left-1/2 z-0 flex w-[170%] -translate-x-1/2 justify-center md:w-[140%] lg:-bottom-56px lg:w-full">
            <svg width="1124" height="200" className="pointer-events-none w-full max-w-full opacity-20 select-none lg:w-[1124px] lg:max-w-none" viewBox="0 0 1124 200" preserveAspectRatio="none">
              <defs>
                <pattern id="bgGrid" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#D9D9D9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="1124" height="200" fill="url(#bgGrid)" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
