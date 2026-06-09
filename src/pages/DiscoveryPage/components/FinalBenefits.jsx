import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ENDPOINTS = [
  { 
    id: 1, 
    method: 'GET', 
    url: '/api/v1/auth/session', 
    status: 'secure', 
    vulnType: null,
    cvss: null,
    tests: [
      { name: 'SQL Injection', status: 'PASS', payload: "' OR '1'='1" },
      { name: 'XSS Injection', status: 'PASS', payload: "<script>alert('snapsec')</script>" },
      { name: 'Auth Bypass', status: 'PASS', payload: "Authorization: Bearer null" }
    ]
  },
  { 
    id: 2, 
    method: 'POST', 
    url: '/api/v1/admin/fetch-image', 
    status: 'vulnerable', 
    vulnType: 'SSRF',
    cvss: '8.2',
    vulnerability: 'Server-Side Request Forgery on fetch endpoint',
    tests: [
      { name: 'SQL Injection', status: 'PASS', payload: "id=1; WAITFOR DELAY '0:0:5'" },
      { name: 'XSS Injection', status: 'PASS', payload: "\"><svg/onload=confirm(1)>" },
      { name: 'SSRF Probing', status: 'FAIL', payload: "url=http://169.254.169.254/latest/meta-data/" }
    ]
  },
  { 
    id: 3, 
    method: 'GET', 
    url: '/api/v1/products/search', 
    status: 'secure', 
    vulnType: null,
    cvss: null,
    tests: [
      { name: 'SQL Injection', status: 'PASS', payload: "' UNION SELECT NULL, @@version --" },
      { name: 'Command Injection', status: 'PASS', payload: "search=;whoami" },
      { name: 'Directory Traversal', status: 'PASS', payload: "../../etc/passwd" }
    ]
  },
  { 
    id: 4, 
    method: 'POST', 
    url: '/api/v1/billing/charge', 
    status: 'vulnerable', 
    vulnType: 'SQL Injection',
    cvss: '9.1',
    vulnerability: 'Blind SQL Injection in invoice payload',
    tests: [
      { name: 'Parameter Tampering', status: 'PASS', payload: "amount=-100" },
      { name: 'XSS Injection', status: 'PASS', payload: "</textarea><script>fetch(keys)</script>" },
      { name: 'SQL Injection', status: 'FAIL', payload: "charge_id=1' OR SLEEP(5) --" }
    ]
  },
  { 
    id: 5, 
    method: 'GET', 
    url: '/api/v2/users/profile', 
    status: 'secure', 
    vulnType: null,
    cvss: null,
    tests: [
      { name: 'Authentication Flaws', status: 'PASS', payload: "Cookie: session=invalid" },
      { name: 'IDOR Validation', status: 'PASS', payload: "user_id=9999" },
      { name: 'SSRF Probing', status: 'PASS', payload: "avatar=http://localhost:80" }
    ]
  },
  { 
    id: 6, 
    method: 'POST', 
    url: '/api/v1/checkout/apply-coupon', 
    status: 'vulnerable', 
    vulnType: 'IDOR',
    cvss: '7.5',
    vulnerability: 'Insecure Direct Object Reference in coupon ownership checks',
    tests: [
      { name: 'SQL Injection', status: 'PASS', payload: "coupon=' OR 1=1" },
      { name: 'XSS Injection', status: 'PASS', payload: "<img src=x onerror=alert(1)>" },
      { name: 'IDOR Validation', status: 'FAIL', payload: "user_id=1024&coupon_id=55" }
    ]
  },
  { 
    id: 7, 
    method: 'GET', 
    url: '/api/v1/files/download', 
    status: 'secure', 
    vulnType: null,
    cvss: null,
    tests: [
      { name: 'Path Traversal', status: 'PASS', payload: "file=../../../../etc/passwd" },
      { name: 'Null Byte Injection', status: 'PASS', payload: "file=resume.pdf%00.png" },
      { name: 'Privilege Check', status: 'PASS', payload: "role=admin" }
    ]
  },
  { 
    id: 8, 
    method: 'DELETE', 
    url: '/api/v1/posts/102', 
    status: 'secure', 
    vulnType: null,
    cvss: null,
    tests: [
      { name: 'CSRF Token Check', status: 'PASS', payload: "X-CSRF-Token: missing" },
      { name: 'Authorization Flaws', status: 'PASS', payload: "Authorization: User" },
      { name: 'SQL Injection', status: 'PASS', payload: "id=102 OR 1=1" }
    ]
  }
];

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
  const [activeEndpointIdx, setActiveEndpointIdx] = useState(0);
  const [activeTestIdx, setActiveTestIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [history, setHistory] = useState([]); // Array of finished index results

  const activeEndpoint = ENDPOINTS[activeEndpointIdx];
  const currentTest = activeEndpoint.tests[activeTestIdx];

  useEffect(() => {
    if (!isScanning) return;

    const timer = setTimeout(() => {
      if (activeTestIdx < activeEndpoint.tests.length - 1) {
        // Next test in same endpoint
        setActiveTestIdx(prev => prev + 1);
      } else if (activeTestIdx === activeEndpoint.tests.length - 1) {
        // Advance to verdict state
        setActiveTestIdx(activeEndpoint.tests.length);
      } else {
        // Finalized current endpoint, move to next
        setHistory(prev => [...prev, activeEndpointIdx]);
        setActiveTestIdx(0);
        setActiveEndpointIdx(prev => (prev + 1) % ENDPOINTS.length);
      }
    }, activeTestIdx === activeEndpoint.tests.length ? 1500 : 800);

    return () => clearTimeout(timer);
  }, [activeEndpointIdx, activeTestIdx, isScanning]);

  // When loop wraps around to index 0, reset history
  useEffect(() => {
    if (activeEndpointIdx === 0 && activeTestIdx === 0) {
      setHistory([]);
    }
  }, [activeEndpointIdx, activeTestIdx]);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-[10px] flex items-center justify-between select-none">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-blue-600 animate-pulse" />
          <span className="text-gray-950 font-bold text-[11px] tracking-wider uppercase">
            Dynamic DAST API Audit
          </span>
        </div>
        
        <div className="flex gap-md items-center text-[10px] font-mono">
          <div className="text-gray-500">
            COMPLETED: <span className="text-black font-bold">{history.length}</span>
          </div>
          <div className="text-gray-500">
            VULNERABLE: <span className="text-rose-600 font-bold">{ENDPOINTS.filter((e, idx) => history.includes(idx) && e.status === 'vulnerable').length}</span>
          </div>
          <button 
            onClick={() => setIsScanning(!isScanning)} 
            className="ml-sm px-[8px] py-[2px] rounded border border-gray-600 text-[9px] hover:bg-gray-100 transition-colors uppercase font-bold text-gray-700 active:scale-95"
          >
            {isScanning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-white">
        
        {/* Left Panel: Sleek Rows */}
        <div className="md:col-span-7 border-r border-gray-600 flex flex-col bg-white overflow-y-auto">
          {ENDPOINTS.map((endpoint, idx) => {
            const isActive = idx === activeEndpointIdx;
            const isFinished = history.includes(idx);
            
            let statusDot = (
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-350"></span>
              </span>
            );
            let statusLabel = "Pending";
            let statusColor = "text-gray-455";
            let rowBg = "bg-white";

            if (isActive) {
              statusDot = (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              );
              statusLabel = "Auditing";
              statusColor = "text-amber-600 font-bold";
              rowBg = "bg-blue-50/40 border-l-[3px] border-blue-500 pl-[9px]";
            } else if (isFinished) {
              if (endpoint.status === 'vulnerable') {
                statusDot = (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                );
                statusLabel = "Vulnerable";
                statusColor = "text-rose-600 font-bold";
              } else {
                statusDot = (
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                );
                statusLabel = "Secure";
                statusColor = "text-emerald-600 font-bold";
              }
            }

            let methodColor = "bg-gray-105 text-gray-700";
            if (endpoint.method === 'GET') methodColor = "bg-emerald-50 text-emerald-700 border border-emerald-100";
            if (endpoint.method === 'POST') methodColor = "bg-blue-50 text-blue-700 border border-blue-100";
            if (endpoint.method === 'DELETE') methodColor = "bg-rose-50 text-rose-700 border border-rose-100";

            return (
              <div 
                key={endpoint.id}
                className={`h-[42px] px-sm flex items-center justify-between border-b border-gray-100 last:border-b-0 transition-colors duration-150 ${rowBg} ${!isActive && 'pl-[12px]'}`}
              >
                <div className="flex items-center gap-sm min-w-0">
                  <span className={`text-[8px] font-bold px-[5px] py-[1.5px] rounded uppercase font-mono tracking-wider ${methodColor}`}>
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-[9.5px] font-medium text-gray-900 truncate max-w-[200px] md:max-w-[240px]">
                    {endpoint.url}
                  </span>
                </div>

                <div className="flex items-center gap-xs pr-xs">
                  {statusDot}
                  <span className={`text-[8.5px] font-mono tracking-wide ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Panel: Sleek Inspection detail */}
        <div className="md:col-span-5 flex flex-col bg-[#FAFBFB] p-sm justify-between">
          
          {/* Target summary card */}
          <div className="flex flex-col gap-xs">
            <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Target Asset Details</span>
            <div className="bg-white border border-gray-200 rounded-[6px] p-xs shadow-sm flex flex-col gap-[3px]">
              <div className="flex justify-between items-center text-[10px] text-gray-500">
                <span>Method:</span>
                <span className="font-bold text-gray-800">{activeEndpoint.method}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-500">
                <span>Route:</span>
                <span className="font-mono text-[9px] text-gray-800 truncate max-w-[120px]">{activeEndpoint.url}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-500">
                <span>Host:</span>
                <span className="text-gray-850">api.snapsec.co</span>
              </div>
            </div>
          </div>

          {/* Live Check Steps */}
          <div className="flex flex-col gap-xs flex-1 my-sm justify-center">
            <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Vulnerability Audits</span>
            <div className="flex flex-col gap-[6px]">
              {activeEndpoint.tests.map((test, index) => {
                const isTestPast = index < activeTestIdx;
                const isTestCurrent = index === activeTestIdx;

                let checkIcon = (
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                );
                let checkLabelClass = "text-gray-400";
                let checkBadge = null;

                if (isTestPast) {
                  checkIcon = (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  );
                  checkLabelClass = "text-gray-900 font-medium";
                  checkBadge = <span className="text-[7.5px] bg-emerald-50 text-emerald-700 px-[4px] rounded border border-emerald-100">PASS</span>;
                } else if (isTestCurrent) {
                  checkIcon = (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  );
                  checkLabelClass = "text-amber-700 font-bold";
                  checkBadge = <span className="text-[7.5px] bg-amber-50 text-amber-700 px-[4px] rounded border border-amber-100 animate-pulse">TESTING</span>;
                }

                // If failed
                if (activeTestIdx === activeEndpoint.tests.length && index === activeEndpoint.tests.length - 1 && activeEndpoint.status === 'vulnerable') {
                  checkIcon = (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  );
                  checkLabelClass = "text-rose-700 font-bold";
                  checkBadge = <span className="text-[7.5px] bg-rose-50 text-rose-700 px-[4px] rounded border border-rose-100 font-bold">EXPOSED</span>;
                } else if (activeTestIdx === activeEndpoint.tests.length && index === activeEndpoint.tests.length - 1 && activeEndpoint.status !== 'vulnerable') {
                  checkIcon = (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  );
                  checkLabelClass = "text-emerald-700 font-bold";
                  checkBadge = <span className="text-[7.5px] bg-emerald-50 text-emerald-700 px-[4px] rounded border border-emerald-100">PASS</span>;
                }

                return (
                  <div key={index} className="flex items-center justify-between text-[10.5px]">
                    <div className="flex items-center gap-xs">
                      {checkIcon}
                      <span className={checkLabelClass}>{test.name}</span>
                    </div>
                    {checkBadge}
                  </div>
                );
              })}
            </div>
          </div>


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
