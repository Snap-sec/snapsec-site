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

// Interactive Vulnerability Management Dashboard Visual for VM (Final Benefits)
function VMDashboardVisual() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const vulnerabilities = [
    { id: "VM-101", title: "Remote Code Execution via Log4j", sev: "CRITICAL", owner: "Platform Team", status: "Active" },
    { id: "VM-102", title: "SQL Injection in Search Endpoint", sev: "CRITICAL", owner: "Vendor-A", status: "Active" },
    { id: "VM-103", title: "Cross-Site Scripting (XSS) in Profile", sev: "HIGH", owner: "Platform Team", status: "Risk Accepted" },
    { id: "VM-104", title: "TLS Certificate Expiring in 4 Days", sev: "MEDIUM", owner: "SecOps", status: "Active" },
    { id: "VM-105", title: "SSH Password Authentication Enabled", sev: "HIGH", owner: "SecOps", status: "Closed" }
  ];

  const filteredItems = vulnerabilities.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === "all" || item.sev.toLowerCase() === filterSeverity.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[360px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-blue-600" />
          <span className="text-gray-900 font-semibold text-[10px] tracking-wider uppercase text-left">
            VM Centralized Console
          </span>
        </div>
        <div className="flex gap-xs select-none">
          <button 
            onClick={() => setFilterSeverity("all")} 
            className={`px-[6px] py-[2px] text-[8px] font-bold rounded border ${filterSeverity === "all" ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-200"}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterSeverity("critical")} 
            className={`px-[6px] py-[2px] text-[8px] font-bold rounded border ${filterSeverity === "critical" ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-400 border-gray-200"}`}
          >
            Critical
          </button>
          <button 
            onClick={() => setFilterSeverity("high")} 
            className={`px-[6px] py-[2px] text-[8px] font-bold rounded border ${filterSeverity === "high" ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-400 border-gray-200"}`}
          >
            High
          </button>
        </div>
      </div>

      {/* Control Area */}
      <div className="bg-white border-b border-gray-100 p-xs flex gap-xs items-center select-none">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Advanced Search by ID, title, or owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-sm pr-xs py-xxs border border-gray-200 rounded text-[10px] outline-none focus:border-gray-400"
          />
        </div>
        <span className="text-[9px] font-mono text-gray-400 shrink-0 pr-xs">
          Showing {filteredItems.length} of {vulnerabilities.length}
        </span>
      </div>

      {/* Grid List */}
      <div className="flex-1 bg-[#FAFAFA] p-xs overflow-y-auto flex flex-col gap-xxs select-text">
        {filteredItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-[10px] text-gray-400 font-medium select-none">
            No vulnerabilities match the criteria
          </div>
        ) : (
          filteredItems.map((vuln, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded p-xs flex items-center justify-between text-[10px] shadow-sm">
              <div className="flex flex-col min-w-0 pr-sm text-left">
                <div className="flex items-center gap-xs">
                  <span className="font-bold text-gray-400 font-mono">{vuln.id}</span>
                  <span className={`text-[8px] font-extrabold px-[4px] py-[1.5px] rounded ${
                    vuln.sev === "CRITICAL" ? "bg-red-100 text-red-700" :
                    vuln.sev === "HIGH" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {vuln.sev}
                  </span>
                  <span className="text-gray-900 font-bold truncate max-w-[240px]">{vuln.title}</span>
                </div>
                <div className="text-[8px] text-gray-400 mt-xxs">
                  Owner: <span className="font-bold text-gray-500">{vuln.owner}</span>
                </div>
              </div>
              
              <div className="shrink-0 text-right">
                <span className={`text-[8px] font-bold px-[6px] py-[2px] rounded border ${
                  vuln.status === "Closed" ? "bg-green-50 text-green-700 border-green-200" :
                  vuln.status === "Risk Accepted" ? "bg-blue-50 text-blue-700 border-blue-200" :
                  "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {vuln.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-sm py-xs flex items-center justify-between text-[9px] text-gray-400 select-none">
        <span>Active Filters: Severity = {filterSeverity.toUpperCase()}</span>
        <span className="font-bold text-black uppercase cursor-pointer hover:underline">Launch Advanced Analytics &rarr;</span>
      </div>
    </div>
  );
}

// Interactive Focused Asset Class Dashboards for AIM (Feature 2 & Final Benefits)
function AIMFocusedDashboards() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Assets" },
    { id: "apis", label: "APIs" },
    { id: "certs", label: "Certificates" },
    { id: "storage", label: "Object Storage" }
  ];

  // Auto-rotation of tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(current => {
        if (current === "all") return "apis";
        if (current === "apis") return "certs";
        if (current === "certs") return "storage";
        return "all";
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navigation tabs */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex gap-xs overflow-x-auto select-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-xs py-[3px] text-[10px] font-bold rounded uppercase tracking-wider transition-all border ${
                activeTab === tab.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-400 border-gray-200 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-[8px] font-bold uppercase tracking-wider px-[6px] py-[2.5px] bg-indigo-50 text-indigo-600 border border-indigo-100 rounded select-none">
          AIM View Selector
        </span>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 p-sm bg-white overflow-y-auto flex flex-col justify-between select-text">
        {activeTab === "all" && (
          <div className="flex flex-col gap-sm">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider select-none">Global Asset Summary</div>
            <div className="grid grid-cols-3 gap-xs">
              <div className="border border-gray-200 rounded p-xs bg-[#FAFAFA]">
                <div className="text-[9px] text-gray-400 font-bold select-none">TOTAL ASSETS</div>
                <div className="text-[16px] font-mono font-extrabold text-black">250</div>
              </div>
              <div className="border border-gray-200 rounded p-xs bg-[#FAFAFA]">
                <div className="text-[9px] text-gray-400 font-bold select-none">RESOLVING</div>
                <div className="text-[16px] font-mono font-extrabold text-green-600">224</div>
              </div>
              <div className="border border-gray-200 rounded p-xs bg-[#FAFAFA]">
                <div className="text-[9px] text-gray-400 font-bold select-none">UNRESOLVED</div>
                <div className="text-[16px] font-mono font-extrabold text-red-500">26</div>
              </div>
            </div>
            <div className="border border-gray-200 rounded p-sm flex items-center justify-between text-[11px]">
              <div>
                <span className="font-bold text-black block">Shadow Infrastructure Found</span>
                <span className="text-gray-400 text-[10px]">3 unmanaged domains discovered last 24h</span>
              </div>
              <span className="text-[8px] font-bold bg-yellow-100 text-yellow-800 px-xs py-xxs rounded uppercase">Warning</span>
            </div>
          </div>
        )}

        {activeTab === "apis" && (
          <div className="flex flex-col gap-xs">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pb-xxs border-b border-gray-100 select-none">API Endpoint Classification</div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">GET /api/v1/users</span>
                <span className="px-xs py-[2px] bg-green-100 text-green-700 rounded text-[8px] font-bold uppercase">Secured</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">POST /api/v1/checkout</span>
                <span className="px-xs py-[2px] bg-green-100 text-green-700 rounded text-[8px] font-bold uppercase">Secured</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">GET /v2/debug-status</span>
                <span className="px-xs py-[2px] bg-red-100 text-red-700 rounded text-[8px] font-bold uppercase">Unauthenticated</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "certs" && (
          <div className="flex flex-col gap-xs">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pb-xxs border-b border-gray-100 select-none">SSL / TLS Certificates</div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">api.snapsec.co</span>
                <span className="px-xs py-[2px] bg-green-100 text-green-700 rounded text-[8px] font-bold uppercase">Valid (230d)</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">internal.snapsec.co</span>
                <span className="px-xs py-[2px] bg-yellow-100 text-yellow-700 rounded text-[8px] font-bold uppercase">Expires in 4d</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">dev.snapsec.co</span>
                <span className="px-xs py-[2px] bg-red-100 text-red-700 rounded text-[8px] font-bold uppercase">Expired 2d ago</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "storage" && (
          <div className="flex flex-col gap-xs">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pb-xxs border-b border-gray-100 select-none">Object Storage Buckets</div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">s3://prod-backups-bucket</span>
                <span className="px-xs py-[2px] bg-green-100 text-green-700 rounded text-[8px] font-bold uppercase">Private</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">s3://snapsec-cdn-assets</span>
                <span className="px-xs py-[2px] bg-green-100 text-green-700 rounded text-[8px] font-bold uppercase">Public</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-[4px] text-[10px]">
                <span className="font-mono text-gray-800">s3://development-test-data</span>
                <span className="px-xs py-[2px] bg-red-100 text-red-700 rounded text-[8px] font-bold uppercase">Exposed Publicly</span>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="border-t border-gray-100 pt-sm mt-sm flex items-center justify-between text-[9px] text-gray-400 select-none">
          <span>Click tabs to swap dashboard perspective</span>
          <span className="font-bold text-black uppercase cursor-pointer hover:underline">View full catalog &rarr;</span>
        </div>
      </div>
    </div>
  );
}

// Web Application UI Bug Map for WAS (Feature 1 and Final Benefits)
function WASWebUiBugMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredBug, setHoveredBug] = useState(null);

  const bugs = [
    {
      id: 0,
      x: 315,
      y: 102,
      title: "SQL Injection (SQLi)",
      parameter: "invoice_id",
      payload: "10023' OR 1=1 --",
      severity: "Critical",
      desc: "Allows database manipulation and sensitive data exposure via unvalidated search parameters."
    },
    {
      id: 1,
      x: 315,
      y: 147,
      title: "Stored Cross-Site Scripting (XSS)",
      parameter: "display_name",
      payload: "<script>alert('XSS')</script>",
      severity: "High",
      desc: "Executes arbitrary Javascript in the browser of users accessing this profile page."
    },
    {
      id: 2,
      x: 315,
      y: 192,
      title: "Broken Object Level Auth (IDOR)",
      parameter: "user_id",
      payload: "?user_id=1001",
      severity: "High",
      desc: "Permits unauthorized reading/modification of other profiles by swapping resource IDs."
    },
    {
      id: 3,
      x: 520,
      y: 102,
      title: "Server-Side Request Forgery (SSRF)",
      parameter: "webhook_url",
      payload: "http://169.254.169.254/latest/",
      severity: "Critical",
      desc: "Tricks the server into routing scan requests to internal local networks and instance metadata."
    },
    {
      id: 4,
      x: 520,
      y: 147,
      title: "Local File Inclusion (LFI)",
      parameter: "xml_path",
      payload: "file:///etc/passwd",
      severity: "High",
      desc: "Forces server to read system files or environment configuration parameters."
    },
    {
      id: 5,
      x: 520,
      y: 192,
      title: "Cross-Site Request Forgery (CSRF)",
      parameter: "action_token",
      payload: "No CSRF Token Supplied",
      severity: "Medium",
      desc: "Enables execution of malicious setting updates via unauthorized third-party user sessions."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % bugs.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const activeBug = hoveredBug || bugs[activeIndex];

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-red-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-yellow-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-green-400" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            WAS Vulnerability Analyzer
          </span>
        </div>
        <div className="flex items-center gap-xs text-gray-900 text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          <span className="text-red-600 uppercase">
            {bugs.length} Bugs Found
          </span>
        </div>
      </div>

      {/* SVG Container */}
      <div className="flex-1 relative overflow-hidden bg-white flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 600 240">
          <pattern id="wasGridFinal" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="240" fill="url(#wasGridFinal)" />

          {/* Browser Window Mock */}
          <rect x="30" y="20" width="540" height="200" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
          <rect x="30" y="20" width="540" height="24" rx="8" fill="#FAFAFA" />
          <line x1="30" y1="44" x2="570" y2="44" stroke="#E5E7EB" strokeWidth="1" />
          
          {/* Controls */}
          <circle cx="45" cy="32" r="3" fill="#EF4444" />
          <circle cx="55" cy="32" r="3" fill="#F59E0B" />
          <circle cx="65" cy="32" r="3" fill="#10B981" />
          <rect x="100" y="24" width="380" height="15" rx="4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
          <text x="110" y="34" className="font-mono text-[7px] fill-gray-400 select-none">https://app.corp.internal/settings/profile</text>

          {/* Sidebar */}
          <rect x="30" y="44" width="100" height="176" fill="#FAFAFA" />
          <line x1="130" y1="44" x2="130" y2="220" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="40" y="60" width="80" height="8" rx="2" fill="#E5E7EB" />
          <rect x="40" y="76" width="80" height="8" rx="2" fill="#E5E7EB" />
          <rect x="40" y="92" width="80" height="8" rx="2" fill="#E5E7EB" />
          <rect x="40" y="108" width="80" height="8" rx="2" fill="#E5E7EB" />

          {/* Content Headings */}
          <text x="145" y="70" className="font-sans text-[11px] font-bold fill-black select-none">Account Settings</text>
          <text x="145" y="80" className="font-sans text-[7px] fill-gray-400 select-none">Configure API endpoints and check parameters</text>

          {/* Input Fields */}
          <text x="145" y="98" className="font-sans text-[7px] font-bold fill-gray-500 select-none">Search Invoices (ID)</text>
          <rect x="145" y="102" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 0 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 0 ? 1.5 : 1} />
          <text x="150" y="113" className="font-mono text-[7px] fill-gray-700 select-none">10023' OR 1=1 --</text>

          <text x="145" y="143" className="font-sans text-[7px] font-bold fill-gray-500 select-none">User Display Name</text>
          <rect x="145" y="147" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 1 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 1 ? 1.5 : 1} />
          <text x="150" y="158" className="font-mono text-[7px] fill-gray-700 select-none">&lt;script&gt;alert('XSS')&lt;/script&gt;</text>

          <text x="145" y="188" className="font-sans text-[7px] font-bold fill-gray-500 select-none">Endpoint Identifier (IDOR)</text>
          <rect x="145" y="192" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 2 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 2 ? 1.5 : 1} />
          <text x="150" y="203" className="font-mono text-[7px] fill-gray-700 select-none">?user_id=1001</text>

          <text x="350" y="98" className="font-sans text-[7px] font-bold fill-gray-500 select-none">Outbound Webhook URL (SSRF)</text>
          <rect x="350" y="102" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 3 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 3 ? 1.5 : 1} />
          <text x="355" y="113" className="font-mono text-[7px] fill-gray-700 select-none">http://169.254.169.254/latest/</text>

          <text x="350" y="143" className="font-sans text-[7px] font-bold fill-gray-500 select-none">XML Report Path (LFI)</text>
          <rect x="350" y="147" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 4 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 4 ? 1.5 : 1} />
          <text x="355" y="158" className="font-mono text-[7px] fill-gray-700 select-none">file:///etc/passwd</text>

          <text x="350" y="188" className="font-sans text-[7px] font-bold fill-gray-500 select-none">CSRF Policy</text>
          <rect x="350" y="192" width="180" height="18" rx="4" fill={activeBug.id === 5 ? "#FEF2F2" : "#F9FAFB"} stroke={activeBug.id === 5 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 5 ? 1.5 : 1} />
          <text x="355" y="203" className="font-sans text-[7px] font-bold fill-red-600 select-none">Update Settings (No Token)</text>

          {/* Active target scanner overlay */}
          {activeBug && (
            <g>
              <circle cx={activeBug.x} cy={activeBug.y} r="8" fill="none" stroke="#EF4444" strokeWidth="1.2" className="animate-ping" />
              <line x1="300" y1="240" x2={activeBug.x} y2={activeBug.y} stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          )}

          {/* Nodes */}
          {bugs.map((bug) => {
            const isActive = activeBug?.id === bug.id;
            return (
              <g
                key={bug.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredBug(bug)}
                onMouseLeave={() => setHoveredBug(null)}
              >
                {isActive && (
                  <circle cx={bug.x} cy={bug.y} r="6" fill="#EF4444" fillOpacity="0.3" className="animate-pulse" />
                )}
                <circle cx={bug.x} cy={bug.y} r={isActive ? 4 : 3} fill="#EF4444" stroke="#FFF" strokeWidth="1" />
              </g>
            );
          })}
        </svg>

        {/* Tooltip description drawer */}
        <div className="absolute bottom-xs left-xs right-xs bg-white border border-gray-600 rounded-[6px] p-xs shadow-md flex items-center justify-between text-[11px] min-h-[46px] select-none">
          {activeBug && (
            <>
              <div className="flex flex-col min-w-0 pr-sm">
                <span className="font-bold text-black flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {activeBug.title}
                </span>
                <span className="text-[10px] text-gray-500 mt-[2px] leading-snug">{activeBug.desc}</span>
              </div>
              <div className="flex flex-col items-end shrink-0 text-right">
                <span className="text-[9px] uppercase font-bold tracking-wider px-[6px] py-[2.5px] rounded bg-red-100 text-red-700 border border-red-200">
                  {activeBug.severity}
                </span>
                <span className="font-mono text-[8px] text-gray-400 mt-xxs truncate max-w-[120px]">param: {activeBug.parameter}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FinalBenefits({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';
  const isWAS = moduleSlug === 'was';
  const isAIM = moduleSlug === 'aim';
  const isVM = moduleSlug === 'vm';

  const contextItems = isWAS ? [
    { label: 'Finding OWASP Top 10 vulnerabilities.' },
    { label: 'Finding SQL Injection (SQLi) bugs.' },
    { label: 'Finding Cross-Site Scripting (XSS) exposures.' },
    { label: 'Finding Server-Side Request Forgery (SSRF).' },
    { label: 'Finding Local File Inclusion (LFI) paths.' },
    { label: 'Finding Cross-Site Request Forgery (CSRF) vulnerabilities.' },
    { label: 'Finding Broken Object Level Authorization (IDOR).' },
    { label: 'Finding security misconfigurations and weak TLS versions.' }
  ] : isVS ? [
    { label: 'Automatically patch known package vulnerabilities (CVEs).' },
    { label: 'Enforce secure host configurations and parameters.' },
    { label: 'Upgrade out-of-date runtime and compiler libraries.' },
    { label: 'Disable insecure default access credentials.' },
    { label: 'Verify patches automatically using post-deployment scans.' },
    { label: 'Restrict Docker daemon sockets and container privileges.' },
    { label: 'Enforce modern TLS cipher-suites and certificates.' },
    { label: 'Upgrade deprecated operating system base images.' }
  ] : isAIM ? [
    { label: 'Cataloging all discovered subdomains and stages.' },
    { label: 'Tracking SSL/TLS certificate validity states.' },
    { label: 'Identifying unauthenticated API endpoint parameters.' },
    { label: 'Monitoring cloud object storage public exposure.' },
    { label: 'Tracing employee accounts and identity systems.' },
    { label: 'Listing repository visibility and push events.' },
    { label: 'Mapping internal and external host IP groups.' },
    { label: 'Syncing dynamic cloud infrastructure changes.' }
  ] : isVM ? [
    { label: 'Centrally normalized vulnerability catalog.' },
    { label: 'Multi-scanner integration pipelines.' },
    { label: 'Actionable SLA deadline warnings.' },
    { label: 'Segmented business unit structures.' },
    { label: 'Delegated third-party vendor ownership.' },
    { label: 'Director-approved risk waivers.' },
    { label: 'Advanced multi-parameter search indexing.' },
    { label: 'Instant developer ticketing connections.' }
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
              {isWAS
                ? "Dynamic Application Scanning actively evaluates your web interfaces and APIs to find vulnerabilities before exploit code does."
                : isVS 
                  ? "Vulnerability Remediation actively fixes system weaknesses by automating the verification of patch deployments."
                  : isAIM
                    ? "Asset Inventory Management actively maps your entire corporate footprint to eliminate security blind spots and shadow environments."
                    : isVM
                      ? "Vulnerability Management centralizes tracking, risk-based prioritization, and remediation workflows at scale."
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
              {isWAS ? (
                <WASWebUiBugMap />
              ) : isAIM ? (
                <AIMFocusedDashboards />
              ) : isVM ? (
                <VMDashboardVisual />
              ) : (
                <ASMReductionAnimation moduleSlug={moduleSlug} />
              )}
            </FadeInBlock>

            <FadeInBlock delay={0.3}>
              <p className="body-text-m mx-auto w-full text-center text-gray-900 max-w-[700px]">
                {isWAS
                  ? "Identifying web vulnerabilities reduces your exposure to malicious payloads. By securing inputs and validating access permissions, you prevent database breaches and server compromises."
                  : isVS
                    ? "Fixing vulnerabilities reduces your exposure to exploit code. By keeping packages updated and systems secure, you prevent attackers from executing code or escalating privileges."
                    : isAIM
                      ? "Cataloging your entire asset footprint stops shadow IT. By monitoring subdomains, repositories, and cloud buckets, you gain full architectural awareness and control."
                      : isVM
                        ? "Centralizing your vulnerability lifecycle ensures team accountability. By tracking SLAs, delegating ownership, and integrating workflows, you close gaps before they become breaches."
                        : "Shrinking your attack surface reduces your blast radius. By closing unused routes and shutting down exposed endpoints, you deny attackers a foothold into your critical organization resources."}
              </p>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
