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

// Asset correlation flow: Subdomain → IP → Port → Web Server → Signal
function AssetCorrelationDiagram() {
  const nodes = [
    { id: 'sub',    label: 'Subdomain',  sublabel: 'api.acme.com',        x: 100, y: 130, highlight: false },
    { id: 'ip',     label: 'IP Address', sublabel: '104.21.48.10',         x: 300, y: 80,  highlight: false },
    { id: 'port',   label: 'Port',       sublabel: ':443 / :22',           x: 500, y: 130, highlight: false },
    { id: 'web',    label: 'Web Server', sublabel: 'Nginx 1.18',           x: 700, y: 80,  highlight: false },
    { id: 'signal', label: 'Risk Signal',sublabel: '4 Active Signals',     x: 900, y: 130, highlight: true  },
    { id: 'dns',    label: 'DNS Record', sublabel: 'CNAME → CF',           x: 300, y: 200, highlight: false },
    { id: 'cert',   label: 'Certificate',sublabel: 'Expires in 14d',       x: 700, y: 200, highlight: false },
  ];
  const edges = [
    ['sub','ip'], ['ip','port'], ['port','web'], ['web','signal'],
    ['sub','dns'], ['dns','ip'], ['web','cert'], ['cert','signal'],
  ];
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <svg viewBox="0 0 1060 280" className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="corrArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#D9D9D9"/>
        </marker>
      </defs>
      <pattern id="corrGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F0F0F0" strokeWidth="0.5"/>
      </pattern>
      <rect width="1060" height="280" fill="url(#corrGrid)"/>
      {edges.map(([from, to], i) => {
        const f = nodeMap[from], t = nodeMap[to];
        return (
          <motion.line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke="#D9D9D9" strokeWidth="1.5" markerEnd="url(#corrArrow)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}/>
        );
      })}
      {nodes.map((node, i) => (
        <motion.g key={node.id}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
          <rect x={node.x - 40} y={node.y - 26} width="80" height="52" rx="6"
            fill={node.highlight ? '#7C3AED' : '#fff'}
            stroke={node.highlight ? '#7C3AED' : '#D9D9D9'} strokeWidth="1"/>
          <text x={node.x} y={node.y - 8} textAnchor="middle" fontSize="11" fontWeight="700"
            fill={node.highlight ? '#fff' : '#111827'} fontFamily="'Inter', sans-serif">
            {node.label}
          </text>
          <text x={node.x} y={node.y + 10} textAnchor="middle" fontSize="9"
            fill={node.highlight ? 'rgba(255,255,255,0.8)' : '#9CA3AF'} fontFamily="'Inter', sans-serif">
            {node.sublabel}
          </text>
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

          <div className="flex flex-col gap-lg lg:flex-row lg:items-start lg:justify-between">
            <FadeInBlock delay={0}>
              <div className="flex w-full flex-col gap-sm lg:max-w-[504px]">
                <h3 className="heading-h1">
                  <span className="gradient-text-blue">Asset Correlation</span>
                </h3>
                <p className="subtitle-m w-full lg:max-w-[365px] text-gray-900">
                  Trace every exposure across the full infrastructure chain — from subdomain to IP to port to web server to risk signal.
                </p>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.1}>
              <div className="flex w-full flex-col gap-md sm:flex-row sm:items-center sm:justify-between lg:max-w-[386px] lg:flex-col lg:items-start lg:justify-start">
                <p className="body-text-m">
                  <b>Asset Correlation</b> connects every layer of your external infrastructure into a single, traceable chain. Subdomain → IP → Ports → Web Server → Risk Signals. Understanding how assets relate lets security teams perform faster root cause analysis and understand the full blast radius of any exposure.
                </p>
              </div>
            </FadeInBlock>
          </div>

        </div>

        <FadeInBlock delay={0.2}>
          <div className="w-full section-border pt-xxl lg:pt-88px overflow-hidden">
            <div className="bg-gray-50 rounded-8 border border-gray-300 p-md overflow-x-auto">
              <AssetCorrelationDiagram />
            </div>
          </div>
        </FadeInBlock>
      </div>
    </section>
  );
}
