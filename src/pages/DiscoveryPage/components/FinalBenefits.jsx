import React, { useState, useEffect } from 'react';
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

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-[3px]">
      <circle cx="9" cy="9" r="8.5" stroke="#D9D9D9" strokeWidth="1" />
      <path d="M5.5 9L7.5 11L12.5 7" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ASM Reduction Network Animation: Red dots transition to green based on the checkpoints
function ASMReductionAnimation({ moduleSlug }) {
  const [step, setStep] = useState(0);

  const isVS = moduleSlug === 'vs';

  // Targets matching the checklist items:
  // For VS: Patching CVEs, upgrading libraries, fixing configs.
  // For ASM: Decommissioning exposed admin dashboards, closing ports, restricting S3 buckets.
  const targets = isVS ? [
    { id: 1, label: "Log4j RCE", x: 80, y: 70, initialStatus: "Vulnerable", resolvedStatus: "Patched v2.17", idx: 0 },
    { id: 2, label: "OpenSSL v1.1.1", x: 220, y: 170, initialStatus: "Outdated", resolvedStatus: "Upgraded v3.0", idx: 1 },
    { id: 3, label: "SSH Root Login", x: 380, y: 60, initialStatus: "Enabled", resolvedStatus: "Disabled", idx: 2 },
    { id: 4, label: "Default Redis PW", x: 520, y: 160, initialStatus: "Default", resolvedStatus: "Rotated", idx: 3 },
    { id: 5, label: "Spring4Shell", x: 180, y: 60, initialStatus: "Vulnerable", resolvedStatus: "Patched v5.3", idx: 4 },
    { id: 6, label: "Docker Socket", x: 320, y: 170, initialStatus: "Exposed", resolvedStatus: "Restricted", idx: 5 },
    { id: 7, label: "Nginx Overflow", x: 480, y: 70, initialStatus: "Vulnerable", resolvedStatus: "Patched v1.20", idx: 6 }
  ] : [
    { id: 1, label: "Admin Dashboard", x: 80, y: 70, initialStatus: "Exposed", resolvedStatus: "Decommissioned", idx: 0 },
    { id: 2, label: "SSH Port 22", x: 220, y: 170, initialStatus: "Open", resolvedStatus: "Closed", idx: 1 },
    { id: 3, label: "Public S3 Bucket", x: 380, y: 60, initialStatus: "Public", resolvedStatus: "Restricted", idx: 2 },
    { id: 4, label: "Staging API v1", x: 520, y: 160, initialStatus: "Exposed", resolvedStatus: "Retired", idx: 3 },
    { id: 5, label: "TLS 1.0 Cipher", x: 180, y: 60, initialStatus: "Weak", resolvedStatus: "Enforced TLS 1.3", idx: 4 },
    { id: 6, label: "Code Repository", x: 320, y: 170, initialStatus: "Public", resolvedStatus: "Blocked Access", idx: 5 },
    { id: 7, label: "Sandbox Host", x: 480, y: 70, initialStatus: "Exposed", resolvedStatus: "Disabled Host", idx: 6 }
  ];

  const connections = [
    { from: 1, to: 5 }, { from: 5, to: 3 }, { from: 3, to: 7 },
    { from: 1, to: 2 }, { from: 2, to: 6 }, { from: 6, to: 4 }, { from: 4, to: 7 },
    { from: 5, to: 2 }, { from: 3, to: 6 }
  ];

  // Update step over time: 0 (all exposed) -> 7 (all resolved) -> 8 (verified) -> reset
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 9);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_2px_2px_rgba(0,0,0,0.04)] font-sans">
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 h-[36px] px-sm flex items-center justify-between select-none">
        <div className="flex items-center gap-[6px]">
          <span className="w-[6px] h-[6px] rounded-full bg-black" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
            {isVS ? "REMEDIATION PIPELINE" : "REDUCTION PIPELINE"}
          </span>
        </div>
        <div className="flex items-center gap-xs text-[10px] font-semibold">
          {step === 8 ? (
            <span className="text-green-600 flex items-center gap-[4px]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
              {isVS ? "ALL VULNERABILITIES PATCHED" : "ALL THREATS ELIMINATED"}
            </span>
          ) : (
            <span className="text-amber-600 flex items-center gap-[4px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
              {isVS ? `PATCHING ITEM ${step + 1} OF 7` : `RESOLVING ITEM ${step + 1} OF 7`}
            </span>
          )}
        </div>
      </div>

      {/* SVG Network Map */}
      <div className="p-sm bg-[#FAFAFA] relative overflow-hidden">
        <svg viewBox="0 0 600 240" className="w-full" preserveAspectRatio="xMidYMid meet">
          <pattern id="reductionGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#EAEAEA" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="240" fill="url(#reductionGrid)" />

          {/* Network Connections */}
          {connections.map((conn, idx) => {
            const fromNode = targets.find(n => n.id === conn.from);
            const toNode = targets.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            // A line is green only if both nodes are resolved
            const isFromResolved = step > fromNode.idx;
            const isToResolved = step > toNode.idx;
            const isLineResolved = isFromResolved && isToResolved;

            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isLineResolved ? "#86EFAC" : "#E5E7EB"}
                strokeWidth={isLineResolved ? "1" : "0.75"}
                style={{ transition: 'stroke 0.6s ease' }}
              />
            );
          })}

          {/* Active target nodes */}
          {targets.map((node) => {
            const isResolved = step > node.idx;
            const isActive = step === node.idx;
            const color = isResolved ? "#22C55E" : "#EF4444";
            
            return (
              <g key={node.id}>
                {/* Ping ring animation if node is currently being resolved */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill={color}
                    fillOpacity="0.2"
                    className="animate-ping"
                  />
                )}
                
                {/* Core node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  fill={color}
                  className="transition-colors duration-500"
                />
                
                {/* Node labels */}
                <text x={node.x} y={node.y - 12} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#111827">
                  {node.label}
                </text>
                
                {/* Status Badges */}
                <g transform={`translate(${node.x - 25}, ${node.y + 8})`}>
                  <rect
                    width="50"
                    height="12"
                    rx="2"
                    fill={isResolved ? "#DCFCE7" : "#FEE2E2"}
                    stroke={isResolved ? "#86EFAC" : "#FCA5A5"}
                    strokeWidth="0.5"
                  />
                  <text x="25" y="9" textAnchor="middle" fontSize="7" fontWeight="bold" fill={isResolved ? "#166534" : "#991B1B"}>
                    {isResolved ? node.resolvedStatus : node.initialStatus}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Global Stats Overlay */}
        <div className="absolute bottom-xs right-xs bg-white border border-gray-600 rounded-[4px] px-[10px] py-[6px] flex gap-md fontSize-[10px] select-none shadow-sm">
          <div>
            <span className="text-gray-400 text-[10px]">{isVS ? "Open CVEs: " : "Open Vulnerabilities: "}</span>
            <span className="font-bold text-[10px] text-black">
              {Math.max(0, 7 - step)}
            </span>
          </div>
          <div className="border-l border-gray-200 pl-md">
            <span className="text-gray-400 text-[10px]">{isVS ? "Patch Status: " : "Verification: "}</span>
            <span className="font-bold text-[10px] text-green-600">
              {step === 8 ? (isVS ? "SECURE" : "PASS") : (isVS ? "PATCHING" : "RUNNING")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinalBenefits({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';

  const contextItems = isVS ? [
    { label: 'Automatically patch known package vulnerabilities (CVEs).' },
    { label: 'Enforce secure host configurations and parameters.' },
    { label: 'Upgrade out-of-date runtime and compiler libraries.' },
    { label: 'Disable insecure default access credentials.' },
    { label: 'Verify patches automatically using post-deployment scans.' },
    { label: 'Restrict Docker daemon sockets and container privileges.' },
    { label: 'Enforce modern TLS cipher-suites and certificates.' },
    { label: 'Upgrade deprecated operating system base images.' }
  ] : [
    { label: 'Decommission exposed admin login dashboards.' },
    { label: 'Close unnecessary open service ports.' },
    { label: 'Restrict public cloud storage buckets.' },
    { label: 'Retire legacy staging API endpoints.' },
    { label: 'Automatically verify successful remediation cycles.' },
    { label: 'Enforce secure TLS cipher configurations.' },
    { label: 'Block unauthenticated code repository access.' },
    { label: 'Disable forgotten development sandbox hosts.' }
  ];

  return (
    <section className="section-visibility-context bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-xl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">

          <FadeInBlock className="w-full flex justify-center text-center">
            <p className="large-paragraph-m mx-auto w-full text-center text-black font-semibold max-w-[800px]">
              {isVS 
                ? "Vulnerability Remediation actively fixes system weaknesses by automating the verification of patch deployments."
                : "ASM Reduction actively shrinks your external attack surface by automating the elimination of unnecessary exposures."}
            </p>
          </FadeInBlock>

          {/* Context list */}
          <div className="grid grid-cols-1 gap-sm lg:grid-cols-2 lg:gap-x-100px">
            {contextItems.map((item, i) => (
              <FadeInBlock key={i} delay={i * 0.08}>
                <div className="flex gap-xs items-start">
                  <CheckIcon />
                  <p className="body-text-m text-gray-900">{item.label}</p>
                </div>
              </FadeInBlock>
            ))}
          </div>

          {/* Dashboard mockup + closing text */}
          <div className="flex flex-col gap-md lg:gap-lg">
            <FadeInBlock delay={0.2}>
              <ASMReductionAnimation moduleSlug={moduleSlug} />
            </FadeInBlock>

            <FadeInBlock delay={0.3}>
              <p className="body-text-m mx-auto w-full text-center text-gray-900 max-w-[700px]">
                {isVS
                  ? "Fixing vulnerabilities reduces your exposure to exploit code. By keeping packages updated and systems secure, you prevent attackers from executing code or escalating privileges."
                  : "Shrinking your attack surface reduces your blast radius. By closing unused routes and shutting down exposed endpoints, you deny attackers a foothold into your critical organization resources."}
              </p>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
