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

// Normalization Engine Animation for VM (Feature 1)
function VMNormalizationEngine() {
  const [activeSourceIdx, setActiveSourceIdx] = useState(0);
  
  const SOURCES = [
    { name: "Qualys", domain: "qualys.com", y: 20, midY: 37 },
    { name: "Nessus", domain: "tenable.com", y: 85, midY: 102 },
    { name: "Snyk", domain: "snyk.io", y: 150, midY: 167 },
    { name: "Rapid7", domain: "rapid7.com", y: 215, midY: 232 },
    { name: "GitHub", domain: "github.com", y: 280, midY: 297 }
  ];

  const VULN_TEMPLATES = [
    { id: "VM-201", title: "Exposed SSH Port 22 on staging", sev: "HIGH", cvss: "8.4", source: "Qualys" },
    { id: "VM-202", title: "Apache Tomcat RCE (CVE-2024-XXXX)", sev: "CRITICAL", cvss: "9.8", source: "Nessus" },
    { id: "VM-203", title: "Prototype Pollution in lodash", sev: "MEDIUM", cvss: "6.5", source: "Snyk" },
    { id: "VM-204", title: "Outdated TLS 1.0 Enabled on API", sev: "MEDIUM", cvss: "5.4", source: "Rapid7" },
    { id: "VM-205", title: "Leaked AWS credentials in branch", sev: "CRITICAL", cvss: "9.3", source: "GitHub" },
    { id: "VM-206", title: "Exposed AWS S3 backups bucket", sev: "HIGH", cvss: "8.1", source: "Qualys" },
    { id: "VM-207", title: "SQLi in /api/v1/checkout", sev: "CRITICAL", cvss: "9.8", source: "Nessus" }
  ];

  const [items, setItems] = useState([
    VULN_TEMPLATES[2],
    VULN_TEMPLATES[3],
    VULN_TEMPLATES[4],
    VULN_TEMPLATES[0]
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSourceIdx(prev => {
        const nextIdx = (prev + 1) % SOURCES.length;
        
        // Find template corresponding to the next source
        const nextSource = SOURCES[nextIdx];
        const sourceTemplates = VULN_TEMPLATES.filter(t => t.source === nextSource.name);
        const randomTemplate = sourceTemplates[Math.floor(Math.random() * sourceTemplates.length)];
        
        setItems(current => {
          const filtered = current.filter(item => item.id !== randomTemplate.id);
          return [randomTemplate, ...filtered].slice(0, 4);
        });

        return nextIdx;
      });
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Header Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-[10px] flex items-center justify-between select-none">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-blue-600 animate-pulse" />
          <span className="text-gray-950 font-bold text-[11px] tracking-wider uppercase">
            VM Ingestion & Normalization
          </span>
        </div>
        <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-xs py-xxs rounded">
          NORMALIZING FEEDS
        </div>
      </div>

      {/* Main Grid split */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-white">
        
        {/* Left + Center (Col span 7): Ingestion Map */}
        <div className="md:col-span-7 border-r border-gray-600 relative overflow-hidden bg-[#FAFBFB] flex items-center justify-center p-xs">
          
          <svg className="w-full h-full max-h-[350px] overflow-visible" viewBox="0 0 310 340">
            {/* Definitions for masks / filters */}
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Connection lines from sources to Snapsec */}
            {SOURCES.map((source, idx) => {
              const isActive = idx === activeSourceIdx;
              return (
                <path 
                  key={idx}
                  d={`M 115 ${source.midY} L 210 167`} 
                  stroke={isActive ? "#3B82F6" : "#E5E7EB"} 
                  strokeWidth={isActive ? 2.5 : 1.5} 
                  strokeDasharray={isActive ? "none" : "3 3"}
                  fill="none"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Animated Flowing Particles on the paths */}
            {SOURCES.map((source, idx) => {
              const isActive = idx === activeSourceIdx;
              if (!isActive) return null;
              return (
                <circle key={`particle-${idx}`} r="3.5" fill="#3B82F6" className="shadow">
                  <animateMotion 
                    dur="1.2s" 
                    repeatCount="indefinite" 
                    path={`M 115 ${source.midY} L 210 167`} 
                  />
                </circle>
              );
            })}

            {/* Source nodes (External Tools) */}
            {SOURCES.map((source, idx) => {
              const isActive = idx === activeSourceIdx;
              return (
                <g key={idx} className="transition-all duration-300">
                  {/* Container Rect */}
                  <rect 
                    x="15" 
                    y={source.y} 
                    width="100" 
                    height="34" 
                    rx="6" 
                    fill="white" 
                    stroke={isActive ? "#3B82F6" : "#E5E7EB"} 
                    strokeWidth={isActive ? 2 : 1}
                    className="shadow-sm transition-all duration-300"
                  />
                  {/* Tool Logo Frame */}
                  <rect 
                    x="23" 
                    y={source.y + 8} 
                    width="18" 
                    height="18" 
                    rx="3" 
                    fill="#F9FAFB" 
                    stroke="#E5E7EB" 
                    strokeWidth="0.5" 
                  />
                  {/* Tool Logo image */}
                  <image 
                    href={`https://img.logo.dev/${source.domain}?token=pk_YDuXMfwrRe2kQtBuzc3Etg`} 
                    x="24" 
                    y={source.y + 9} 
                    width="16" 
                    height="16" 
                  />
                  {/* Tool Name Label */}
                  <text 
                    x="48" 
                    y={source.y + 20} 
                    className={`text-[9px] font-sans font-bold ${isActive ? "fill-blue-600" : "fill-gray-900"}`}
                  >
                    {source.name}
                  </text>
                  {/* Status Indicator Dot */}
                  <circle 
                    cx="106" 
                    cy={source.y + 17} 
                    r="2.5" 
                    fill={isActive ? "#3B82F6" : "#10B981"}
                    className={isActive ? "animate-pulse" : ""}
                  />
                </g>
              );
            })}

            {/* Snapsec Integration Hub (Gateway) */}
            {/* Snapsec Integration Hub (Gateway) */}
            <g transform="translate(210, 140)">
              {/* Outer pulsing ring */}
              <rect 
                x="0" 
                y="0" 
                width="75" 
                height="54" 
                rx="8" 
                fill="white" 
                stroke="#3B82F6" 
                strokeWidth="2" 
                className="animate-pulse"
              />
              {/* Logo image (actual mark in assets) */}
              <image 
                href="/assets/snapsec-mark.png"
                x="21.5" 
                y="11" 
                width="32" 
                height="32" 
              />
            </g>

            {/* Output line connecting Gateway to the Feed/List */}
            <path 
              d="M 285 167 L 345 167" 
              stroke="#3B82F6" 
              strokeWidth="2" 
              fill="none" 
            />
            {/* Animated particle flowing from Gateway to Feed */}
            <circle r="3.5" fill="#3B82F6">
              <animateMotion 
                dur="0.8s" 
                repeatCount="indefinite" 
                path="M 285 167 L 345 167" 
              />
            </circle>
          </svg>
        </div>

        {/* Right (Col span 5): Unified Security Dashboard */}
        <div className="md:col-span-5 flex flex-col bg-white overflow-hidden p-sm justify-between">
          
          {/* Finding Cards */}
          <div className="flex-1 flex flex-col gap-xs py-sm overflow-hidden">
            {items.map((item, idx) => {
              const isNewest = idx === 0;
              
              let sourceDomain = "qualys.com";
              if (item.source === "Qualys") sourceDomain = "qualys.com";
              if (item.source === "Nessus") sourceDomain = "tenable.com";
              if (item.source === "Snyk") sourceDomain = "snyk.io";
              if (item.source === "Rapid7") sourceDomain = "rapid7.com";
              if (item.source === "GitHub") sourceDomain = "github.com";

              return (
                <div 
                  key={item.id + idx}
                  className={`border rounded-[6px] p-xs flex items-center justify-between text-[10.5px] transition-all duration-300 ${
                    isNewest 
                      ? 'border-blue-500 bg-blue-50/20 shadow-sm' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-sm min-w-0">
                    {/* Source logo */}
                    <div className="w-5 h-5 rounded border border-gray-200 bg-white flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src={`https://img.logo.dev/${sourceDomain}?token=pk_YDuXMfwrRe2kQtBuzc3Etg`} 
                        alt={item.source}
                        className="w-4 h-4 object-contain"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0 text-left">
                      <div className="flex items-center gap-xs">
                        <span className="font-mono text-[9px] font-bold text-gray-400">{item.id}</span>
                        {isNewest && (
                          <span className="text-[8px] bg-blue-100 text-blue-800 font-bold px-[4px] rounded uppercase tracking-wider scale-90">
                            JUST INGESTED
                          </span>
                        )}
                      </div>
                      <span className="font-sans font-bold text-gray-900 truncate max-w-[140px] md:max-w-[170px]">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-sm shrink-0 pl-xs">
                    <span className={`text-[8px] font-extrabold px-[6px] py-[2px] rounded uppercase ${
                      item.sev === "CRITICAL" ? "bg-rose-50 text-rose-700 border border-rose-100" :
                      item.sev === "HIGH" ? "bg-amber-50 text-amber-700 border border-amber-100" : 
                      "bg-amber-50/40 text-amber-600 border border-amber-100/50"
                    }`}>
                      CVSS {item.cvss}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

// Unified Asset map representation for AIM (Feature 1)
function AIMUnifiedAssetMap() {
  const [activeSourceIdx, setActiveSourceIdx] = useState(0);
  
  const SOURCES = [
    { name: "Google Cloud", domain: "google.com", y: 20, midY: 37 },
    { name: "AWS", domain: "amazon.com", y: 85, midY: 102 },
    { name: "Postman", domain: "postman.com", y: 150, midY: 167 },
    { name: "GitHub", domain: "github.com", y: 215, midY: 232 },
    { name: "Slack", domain: "slack.com", y: 280, midY: 297 }
  ];

  const ASSET_TEMPLATES = [
    { id: "AST-401", details: "billing-prd.gcp.snapsec.co", type: "Subdomain", status: "MONITORED", source: "Google Cloud" },
    { id: "AST-402", details: "s3://invoices-backup-prd", type: "Cloud Bucket", status: "MONITORED", source: "AWS" },
    { id: "AST-403", details: "GET /api/v2/users/auth", type: "API Route", status: "EXPOSED", source: "Postman" },
    { id: "AST-404", details: "snapsec/gateway-service", type: "Repository", status: "MONITORED", source: "GitHub" },
    { id: "AST-405", details: "hooks.slack.com/services/...", type: "Webhook", status: "EXPOSED", source: "Slack" },
    { id: "AST-406", details: "log-collector.gcp.internal", type: "DNS Record", status: "MONITORED", source: "Google Cloud" },
    { id: "AST-407", details: "s3://customer-avatars-public", type: "Cloud Bucket", status: "MONITORED", source: "AWS" }
  ];

  const [items, setItems] = useState([
    ASSET_TEMPLATES[2],
    ASSET_TEMPLATES[3],
    ASSET_TEMPLATES[4],
    ASSET_TEMPLATES[0],
    ASSET_TEMPLATES[1]
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSourceIdx(prev => {
        const nextIdx = (prev + 1) % SOURCES.length;
        
        // Pick templates matching next source
        const nextSource = SOURCES[nextIdx];
        const sourceTemplates = ASSET_TEMPLATES.filter(t => t.source === nextSource.name);
        const randomTemplate = sourceTemplates[Math.floor(Math.random() * sourceTemplates.length)];
        
        setItems(current => {
          const filtered = current.filter(item => item.id !== randomTemplate.id);
          return [randomTemplate, ...filtered].slice(0, 5);
        });

        return nextIdx;
      });
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Header Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-[10px] flex items-center justify-between select-none">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-blue-600 animate-pulse" />
          <span className="text-gray-950 font-bold text-[11px] tracking-wider uppercase">
            Asset Inventory Discovery
          </span>
        </div>
        <div className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-xs py-xxs rounded">
          DISCOVERING ASSETS
        </div>
      </div>

      {/* Main Grid split */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-white">
        
        {/* Left + Center (Col span 7): Ingestion Map */}
        <div className="md:col-span-7 border-r border-gray-600 relative overflow-hidden bg-[#FAFBFB] flex items-center justify-center p-xs">
          
          <svg className="w-full h-full max-h-[350px] overflow-visible" viewBox="0 0 310 340">
            {/* Connection lines from sources to Snapsec */}
            {SOURCES.map((source, idx) => {
              const isActive = idx === activeSourceIdx;
              return (
                <path 
                  key={idx}
                  d={`M 115 ${source.midY} L 210 167`} 
                  stroke={isActive ? "#3B82F6" : "#E5E7EB"} 
                  strokeWidth={isActive ? 2.5 : 1.5} 
                  strokeDasharray={isActive ? "none" : "3 3"}
                  fill="none"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Animated Flowing Particles on the paths */}
            {SOURCES.map((source, idx) => {
              const isActive = idx === activeSourceIdx;
              if (!isActive) return null;
              return (
                <circle key={`particle-${idx}`} r="3.5" fill="#3B82F6" className="shadow">
                  <animateMotion 
                    dur="1.2s" 
                    repeatCount="indefinite" 
                    path={`M 115 ${source.midY} L 210 167`} 
                  />
                </circle>
              );
            })}

            {/* Source nodes (External Tools) */}
            {SOURCES.map((source, idx) => {
              const isActive = idx === activeSourceIdx;
              return (
                <g key={idx} className="transition-all duration-300">
                  {/* Container Rect */}
                  <rect 
                    x="15" 
                    y={source.y} 
                    width="100" 
                    height="34" 
                    rx="6" 
                    fill="white" 
                    stroke={isActive ? "#3B82F6" : "#E5E7EB"} 
                    strokeWidth={isActive ? 2 : 1}
                    className="shadow-sm transition-all duration-300"
                  />
                  {/* Tool Logo Frame */}
                  <rect 
                    x="23" 
                    y={source.y + 8} 
                    width="18" 
                    height="18" 
                    rx="3" 
                    fill="#F9FAFB" 
                    stroke="#E5E7EB" 
                    strokeWidth="0.5" 
                  />
                  {/* Tool Logo image */}
                  <image 
                    href={`https://img.logo.dev/${source.domain}?token=pk_YDuXMfwrRe2kQtBuzc3Etg`} 
                    x="24" 
                    y={source.y + 9} 
                    width="16" 
                    height="16" 
                  />
                  {/* Tool Name Label */}
                  <text 
                    x="48" 
                    y={source.y + 20} 
                    className={`text-[9px] font-sans font-bold ${isActive ? "fill-blue-600" : "fill-gray-900"}`}
                  >
                    {source.name}
                  </text>
                  {/* Status Indicator Dot */}
                  <circle 
                    cx="106" 
                    cy={source.y + 17} 
                    r="2.5" 
                    fill={isActive ? "#3B82F6" : "#10B981"}
                    className={isActive ? "animate-pulse" : ""}
                  />
                </g>
              );
            })}

            {/* Snapsec Center Discovery Hub */}
            {/* Snapsec Center Discovery Hub */}
            <g transform="translate(210, 140)">
              {/* Outer pulsing ring */}
              <rect 
                x="0" 
                y="0" 
                width="75" 
                height="54" 
                rx="8" 
                fill="white" 
                stroke="#3B82F6" 
                strokeWidth="2" 
                className="animate-pulse"
              />
              {/* Logo image (actual mark in assets) */}
              <image 
                href="/assets/snapsec-mark.png"
                x="21.5" 
                y="11" 
                width="32" 
                height="32" 
              />
            </g>

            {/* Output line connecting Gateway to the Feed/List */}
            <path 
              d="M 285 167 L 345 167" 
              stroke="#3B82F6" 
              strokeWidth="2" 
              fill="none" 
            />
            {/* Animated particle flowing from Gateway to Feed */}
            <circle r="3.5" fill="#3B82F6">
              <animateMotion 
                dur="0.8s" 
                repeatCount="indefinite" 
                path="M 285 167 L 345 167" 
              />
            </circle>
          </svg>
        </div>

        {/* Right (Col span 5): Live Asset Inventory Dashboard */}
        <div className="md:col-span-5 flex flex-col bg-white overflow-hidden p-sm gap-sm justify-center">
          
          {/* Dashboard Header */}
          <div className="flex justify-between items-center pb-[8px] border-b border-gray-150 select-none">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Discovered Assets
            </span>
            <span className="text-[9px] text-[#3B82F6] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse inline-block" />
              REAL-TIME SYNC
            </span>
          </div>

          {/* Discovered Assets Sleek Card List */}
          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden justify-center select-text">
            {items.map((item, idx) => {
              const isNewest = idx === 0;
              
              let sourceDomain = "google.com";
              if (item.source === "Google Cloud") sourceDomain = "google.com";
              else if (item.source === "AWS") sourceDomain = "amazon.com";
              else if (item.source === "Postman") sourceDomain = "postman.com";
              else if (item.source === "GitHub") sourceDomain = "github.com";
              else if (item.source === "Slack") sourceDomain = "slack.com";

              return (
                <div 
                  key={item.id + idx}
                  className={`py-1.5 px-2.5 rounded-[6px] border text-left flex items-center gap-2.5 transition-all duration-300 relative select-none ${
                    isNewest 
                      ? "bg-blue-50/30 border-blue-500/80 shadow-[0_2px_10px_rgba(59,130,246,0.08)] scale-[1.01]" 
                      : "bg-white border-gray-200/60"
                  }`}
                >
                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0 pr-[54px]">
                    <div className="text-[10px] font-bold text-gray-900 truncate leading-tight">
                      {item.details}
                    </div>
                    <div className="text-[7.5px] text-gray-400 font-bold uppercase tracking-wider mt-[1px]">
                      {item.type} • {item.id}
                    </div>
                  </div>

                  {/* Status Badge (Absolute Right) */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    <span className={`text-[7.5px] font-bold px-[4px] py-[1px] rounded-[3px] border uppercase tracking-wider scale-[0.8] origin-right ${
                      item.status === "EXPOSED" 
                        ? "bg-rose-50 text-rose-700 border-rose-200" 
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

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
            let statusColor = "text-gray-450";
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

// Interactive Radar Scanner Map for VS
function VSRadarScannerMap({ moduleSlug }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(a => (a + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const radarAssets = [
    // External IPs (Top-Left: angle 180 to 270)
    { id: 1, type: "external_ip", label: "104.244.42.1", info: "External IP • Cloudflare CDN", radius: 70, angle: 210, status: "Clean" },
    { id: 2, type: "external_ip", label: "54.219.12.18", info: "External IP • AWS NAT Gateway", radius: 110, angle: 230, status: "Clean" },
    { id: 3, type: "external_ip", label: "185.190.140.5", info: "External IP • Corporate VPN Gateway", radius: 130, angle: 195, status: "Clean" },
    { id: 4, type: "external_ip", label: "104.244.42.50", info: "External IP • Public Host (SSH Port 22 Open)", radius: 90, angle: 255, status: "Vulnerable", cve: "Open SSH Port 22 Detected" },
    
    // Subdomains (Top-Right: angle 270 to 360)
    { id: 10, type: "subdomain", label: "api.prod.snapsec.co", info: "Subdomain • Production Gateway", radius: 80, angle: 300, status: "Clean" },
    { id: 11, type: "subdomain", label: "auth.snapsec.co", info: "Subdomain • Okta Login Portal", radius: 120, angle: 335, status: "Clean" },
    { id: 12, type: "subdomain", label: "dev.snapsec.co", info: "Subdomain • Testing Sandbox Endpoint", radius: 100, angle: 285, status: "Clean" },
    { id: 13, type: "subdomain", label: "sandbox-dev.snapsec.co", info: "Subdomain • Vulnerable Jenkins CI Server", radius: 130, angle: 315, status: "Vulnerable", cve: "CVE-2023-40167 (Jenkins SSRF)" },

    // Internal IPs (Bottom-Left: angle 90 to 180)
    { id: 20, type: "internal_ip", label: "10.100.4.12", info: "Internal IP • Private PostgreSQL Host", radius: 75, angle: 120, status: "Clean" },
    { id: 21, type: "internal_ip", label: "10.100.12.80", info: "Internal IP • Jenkins CI Runner Node", radius: 115, angle: 155, status: "Clean" },
    { id: 22, type: "internal_ip", label: "10.200.1.15", info: "Internal IP • K8s Worker Node", radius: 95, angle: 100, status: "Clean" },
    { id: 23, type: "internal_ip", label: "10.200.1.104", info: "Internal IP • Vulnerable Billing App", radius: 130, angle: 140, status: "Vulnerable", cve: "CVE-2021-44228 (Log4j RCE)" },

    // IT Assets (Bottom-Right: angle 0 to 90)
    { id: 30, type: "it_asset", label: "corp-active-directory", info: "IT Asset • LDAP Authentication Server", radius: 85, angle: 45, status: "Clean" },
    { id: 31, type: "it_asset", label: "office-email-exchange", info: "IT Asset • Mail Exchange Server", radius: 120, angle: 15, status: "Clean" },
    { id: 32, type: "it_asset", label: "vpn-firewall.internal", info: "IT Asset • Corporate Perimeter Firewall", radius: 100, angle: 70, status: "Vulnerable", cve: "Outdated Firmware Version" },
    { id: 33, type: "it_asset", label: "internal-git-server", info: "IT Asset • Version Control Host", radius: 135, angle: 35, status: "Vulnerable", cve: "Outdated OpenSSL 1.1.1" }
  ];

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Console Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-red-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-yellow-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-green-400" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            Radar Scanner: Asset Discovery
          </span>
        </div>
        <div className="flex items-center gap-xs text-gray-900 text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
          <span className="text-green-600 uppercase">
            Radar Scanner Active
          </span>
        </div>
      </div>

      {/* SVG Radar Map Area */}
      <div className="flex-1 relative overflow-hidden bg-white cursor-crosshair flex items-center justify-center">
        
        {/* SVG Wrapper */}
        <svg className="w-full h-full" viewBox="0 0 600 300">
          <defs>
            <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Grid background */}
          <pattern id="radarGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="300" fill="url(#radarGrid)" />

          {/* Concentric Radar Rings */}
          <circle cx="300" cy="150" r="50" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="300" cy="150" r="100" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="300" cy="150" r="140" fill="none" stroke="#D1D5DB" strokeWidth="1" />

          {/* Radar Crosshair lines */}
          <line x1="150" y1="150" x2="450" y2="150" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="300" y1="10" x2="300" y2="290" stroke="#E5E7EB" strokeWidth="1" />

          {/* Quadrant Labels */}
          <g className="select-none pointer-events-none opacity-30 font-mono text-[9px] font-bold fill-gray-500">
            <text x="440" y="50" textAnchor="middle">SUBDOMAINS</text>
            <text x="160" y="50" textAnchor="middle">EXTERNAL IPs</text>
            <text x="160" y="260" textAnchor="middle">INTERNAL IPs</text>
            <text x="440" y="260" textAnchor="middle">IT ASSETS</text>
          </g>

          {/* Faded Sweep Trail Wedge */}
          <path
            d={`M 300 150 
                L ${300 + 140 * Math.cos(((angle - 25) * Math.PI) / 180)} ${150 + 140 * Math.sin(((angle - 25) * Math.PI) / 180)}
                A 140 140 0 0 1 ${300 + 140 * Math.cos((angle * Math.PI) / 180)} ${150 + 140 * Math.sin((angle * Math.PI) / 180)}
                Z`}
            fill="url(#radarSweepGrad)"
          />

          {/* Rotating Sweep Line */}
          <line
            x1="300"
            y1="150"
            x2={300 + 140 * Math.cos((angle * Math.PI) / 180)}
            y2={150 + 140 * Math.sin((angle * Math.PI) / 180)}
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 2px #10B981)' }}
          />

          {/* Asset Dots */}
          {radarAssets.map((asset) => {
            const x = 300 + asset.radius * Math.cos((asset.angle * Math.PI) / 180);
            const y = 150 + asset.radius * Math.sin((asset.angle * Math.PI) / 180);

            // Calculate sweep collision
            const angleDiff = (angle - asset.angle + 360) % 360;
            const isSweeping = angleDiff < 30; // within 30 degrees of rotating sweep
            const intensity = isSweeping ? (30 - angleDiff) / 30 : 0; // fade out tail intensity

            const isVulnerable = asset.status === "Vulnerable";
            const color = isVulnerable ? "#EF4444" : "#10B981";

            return (
              <g key={asset.id} className="cursor-pointer"
                 onMouseEnter={() => setHoveredNode(asset)}
                 onMouseLeave={() => setHoveredNode(null)}>
                
                {/* Active glowing ring during sweep */}
                {isSweeping && (
                  <circle
                    cx={x}
                    cy={y}
                    r={6 + intensity * 6}
                    fill={color}
                    fillOpacity={0.3 * intensity}
                    className="transition-all duration-100"
                  />
                )}
                
                {/* Core asset dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={hoveredNode?.id === asset.id ? 6 : (3 + intensity * 1.5)}
                  fill={color}
                  opacity={0.4 + intensity * 0.6}
                  className="transition-all duration-200"
                  style={{ filter: isSweeping ? `drop-shadow(0 0 3px ${color})` : 'none' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip inside container */}
        <div className={`absolute bottom-xs left-xs right-xs bg-white border border-gray-600 rounded-[6px] p-xs shadow-md transition-all duration-200 flex items-center justify-between text-[11px] ${hoveredNode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          {hoveredNode && (
            <>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-black truncate">{hoveredNode.label}</span>
                <span className="text-[10px] text-gray-500 mt-[1px]">{hoveredNode.info}</span>
              </div>
              <span className={`text-[9px] uppercase font-bold tracking-wider px-[6px] py-[2.5px] rounded-[4px] shrink-0 ml-sm ${
                hoveredNode.status === "Vulnerable"
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700"
              }`}>
                {hoveredNode.status === "Vulnerable" ? hoveredNode.cve : "Secure"}
              </span>
            </>
          )}
        </div>

        {/* Scan Info Display overlay */}
        {!hoveredNode && (
          <div className="absolute bottom-xs left-xs bg-white border border-gray-200 rounded-[4px] px-[8px] py-[4px] text-[10px] text-gray-500 shadow-sm pointer-events-none">
            Sweep Radar scanning active... Hover nodes to inspect.
          </div>
        )}

      </div>
      
      {/* Legend Row */}
      <div className="bg-[#FAFAFA] border-t border-gray-200 px-sm py-[8px] flex items-center justify-between text-[10px] font-semibold text-gray-900">
        <div className="flex gap-md">
          <div className="flex items-center gap-[4px]">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Secure Assets (12)</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Vulnerable Assets (4)</span>
          </div>
        </div>
      </div>

    </div>
  );
}

// Interactive Network Constellation Map
function DiscoveryNetworkMap({ moduleSlug }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [scanPulse, setScanPulse] = useState(0);

  const isVS = moduleSlug === 'vs';

  // Generate 60 nodes distributed into subnets / clusters
  const nodes = isVS ? [
    // Subnet A: Internal IPs (Center-Left)
    { id: 1, x: 120, y: 140, type: "internal_ip", host: "10.100.4.12", status: "Secure", info: "Internal IP • Private Database Host" },
    { id: 2, x: 160, y: 110, type: "internal_ip", host: "10.100.12.80", status: "Secure", info: "Internal IP • Jenkins CI Agent" },
    { id: 3, x: 170, y: 170, type: "internal_ip", host: "10.200.1.15", status: "Secure", info: "Internal IP • Kubernetes Pod Node" },
    { id: 4, x: 220, y: 120, type: "internal_ip", host: "10.200.1.99", status: "Secure", info: "Internal IP • Auth microservice" },
    
    // Subnet B: Subdomains (Center-Right)
    { id: 10, x: 380, y: 100, type: "subdomain", host: "api.prod.snapsec.co", status: "Secure", info: "Subdomain • Production API Gateway" },
    { id: 11, x: 430, y: 80, type: "subdomain", host: "auth.snapsec.co", status: "Secure", info: "Subdomain • Authentication Portal" },
    { id: 12, x: 440, y: 130, type: "subdomain", host: "dev.snapsec.co", status: "Secure", info: "Subdomain • Developer Sandbox" },
    { id: 13, x: 480, y: 110, type: "subdomain", host: "billing.snapsec.co", status: "Secure", info: "Subdomain • Stripe webhook target" },
    
    // Subnet C: External IPs (Top Center)
    { id: 20, x: 300, y: 50, type: "external_ip", host: "104.244.42.1", status: "Secure", info: "External IP • Cloudflare Edge Router" },
    { id: 21, x: 250, y: 70, type: "external_ip", host: "54.219.12.18", status: "Secure", info: "External IP • AWS NAT Gateway" },
    { id: 22, x: 350, y: 60, type: "external_ip", host: "185.190.140.5", status: "Secure", info: "External IP • Public VPN Concentrator" },
    
    // Subnet D: IT Assets (Bottom Center/Right)
    { id: 30, x: 340, y: 220, type: "it_asset", host: "corp-active-directory", status: "Secure", info: "IT Asset • Corporate LDAP Server" },
    { id: 31, x: 400, y: 240, type: "it_asset", host: "office-email-exchange", status: "Secure", info: "IT Asset • Microsoft Exchange" },
    
    // VULNERABILITIES (Red Pulsing Nodes)
    { id: 90, x: 260, y: 250, type: "exposure", host: "10.200.1.104", status: "Vulnerable", info: "Internal IP • Critical Risk • CVE-2021-44228 (Log4j RCE)" },
    { id: 91, x: 450, y: 210, type: "vpn-firewall.internal", status: "Vulnerable", info: "IT Asset • High Risk • Outdated firmware version" },
    { id: 92, x: 190, y: 60, type: "exposure", host: "104.244.42.50", status: "Vulnerable", info: "External IP • Critical Risk • Open SSH Port 22" },
    { id: 93, x: 130, y: 240, type: "exposure", host: "sandbox-dev.snapsec.co", status: "Vulnerable", info: "Subdomain • High Risk • CVE-2023-40167 (Jenkins SSRF)" },
    { id: 94, x: 500, y: 160, type: "exposure", host: "internal-git-server", status: "Vulnerable", info: "IT Asset • Medium Risk • Outdated OpenSSL 1.1.1" }
  ] : [
    // Subnet A: Corporate Portal (Center-Left)
    { id: 1, x: 120, y: 140, type: "domain", host: "snapsec.co", status: "Secure", info: "Apex Domain • DNS SEC Active" },
    { id: 2, x: 160, y: 110, type: "subdomain", host: "www.snapsec.co", status: "Secure", info: "IP: 104.244.42.1 • Cloudflare CDN" },
    { id: 3, x: 170, y: 170, type: "subdomain", host: "blog.snapsec.co", status: "Secure", info: "IP: 104.244.42.5 • Ghost CMS" },
    { id: 4, x: 220, y: 120, type: "subdomain", host: "careers.snapsec.co", status: "Secure", info: "Greenhouse API Integration" },
    
    // Subnet B: Production API Cluster (Center-Right)
    { id: 10, x: 380, y: 100, type: "api", host: "api.prod.snapsec.co", status: "Secure", info: "Kubernetes Load Balancer" },
    { id: 11, x: 430, y: 80, type: "api", host: "auth.api.prod.snapsec.co", status: "Secure", info: "OAuth2 Provider • Okta" },
    { id: 12, x: 440, y: 130, type: "api", host: "gateway.api.prod.snapsec.co", status: "Secure", info: "Kong API Gateway" },
    { id: 13, x: 480, y: 110, type: "api", host: "v2.api.prod.snapsec.co", status: "Secure", info: "REST API Endpoint" },
    
    // Subnet C: Cloud Infrastructure (Top Center)
    { id: 20, x: 300, y: 50, type: "cloud", host: "snapsec-main-vpc", status: "Secure", info: "AWS VPC • region: us-east-1" },
    { id: 21, x: 250, y: 70, type: "cloud", host: "prod-eks-cluster", status: "Secure", info: "AWS EKS Control Plane" },
    { id: 22, x: 350, y: 60, type: "cloud", host: "rds-postgres-replica", status: "Secure", info: "AWS RDS PostgreSQL (Private)" },
    
    // Subnet D: Staging & Dev Sandbox (Bottom Center/Right)
    { id: 30, x: 340, y: 220, type: "subdomain", host: "staging.snapsec.co", status: "Secure", info: "IP: 54.219.12.18 • nginx" },
    { id: 31, x: 400, y: 240, type: "subdomain", host: "dev.snapsec.co", status: "Secure", info: "IP: 54.219.12.19 • nginx" },
    
    // EXPOSURES (Red Pulsing Nodes)
    { id: 90, x: 260, y: 250, type: "exposure", host: "test-sandbox.internal.snapsec.co", status: "Exposed", info: "Critical Risk • Open SSH Port 22 Found" },
    { id: 91, x: 450, y: 210, type: "exposure", host: "snapsec-dev-backups", status: "Exposed", info: "High Risk • Public AWS S3 Bucket Exposed" },
    { id: 92, x: 190, y: 60, type: "exposure", host: "jenkins-ci.internal.snapsec.co", status: "Exposed", info: "Critical Risk • Unauthenticated Jenkins Dashboard" },
    { id: 93, x: 130, y: 240, type: "exposure", host: "db-admin.staging.snapsec.co", status: "Exposed", info: "High Risk • phpMyAdmin Exposure on Port 8080" },
    { id: 94, x: 500, y: 160, type: "exposure", host: "api-v1-deprecated.snapsec.co", status: "Exposed", info: "Medium Risk • Outdated endpoint lack rate limiting" }
  ];

  // Fill in background with extra static small asset dots (representing "alot of dots")
  const staticDots = [
    { x: 80, y: 80 }, { x: 90, y: 180 }, { x: 110, y: 40 }, { x: 140, y: 70 },
    { x: 150, y: 220 }, { x: 210, y: 190 }, { x: 240, y: 150 }, { x: 280, y: 100 },
    { x: 290, y: 180 }, { x: 320, y: 130 }, { x: 330, y: 90 }, { x: 360, y: 170 },
    { x: 390, y: 40 }, { x: 410, y: 150 }, { x: 420, y: 50 }, { x: 460, y: 60 },
    { x: 470, y: 260 }, { x: 480, y: 200 }, { x: 510, y: 110 }, { x: 530, y: 90 },
    { x: 540, y: 220 }, { x: 550, y: 150 }, { x: 100, y: 120 }, { x: 220, y: 80 },
    { x: 270, y: 210 }, { x: 310, y: 260 }, { x: 370, y: 230 }, { x: 490, y: 70 },
    { x: 160, y: 260 }, { x: 70, y: 200 }, { x: 120, y: 200 }, { x: 180, y: 200 }
  ];

  // Define network connections between main nodes
  const connections = [
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
    { from: 10, to: 11 }, { from: 10, to: 12 }, { from: 10, to: 13 },
    { from: 20, to: 21 }, { from: 20, to: 22 },
    { from: 30, to: 31 }, { from: 1, to: 20 }, { from: 10, to: 20 },
    { from: 30, to: 90 }, { from: 13, to: 91 }, { from: 21, to: 92 },
    { from: 3, to: 93 }, { from: 12, to: 94 }
  ];

  useEffect(() => {
    // Loop scanning sweep line effect
    const interval = setInterval(() => {
      setScanPulse(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Console Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-red-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-yellow-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-green-400" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            {isVS ? "Vulnerability Scan Topology" : "Asset Exposure Constellation"}
          </span>
        </div>
        <div className="flex items-center gap-xs text-gray-900 text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          <span className="text-red-600 uppercase">
            {isVS ? "5 VULNERABILITIES DETECTED" : "5 EXPOSURES FOUND"}
          </span>
        </div>
      </div>

      {/* SVG Network Map Area */}
      <div className="flex-1 relative overflow-hidden bg-white cursor-crosshair">
        
        {/* SVG Wrapper */}
        <svg className="w-full h-full" viewBox="0 0 600 300">
          {/* Grid background */}
          <pattern id="networkGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="300" fill="url(#networkGrid)" />

          {/* Cluster Labels */}
          {isVS ? (
            <g className="select-none pointer-events-none opacity-40 font-mono text-[9px] font-bold fill-gray-500">
              <text x="150" y="90" textAnchor="middle">INTERNAL IPs</text>
              <text x="430" y="60" textAnchor="middle">SUBDOMAINS</text>
              <text x="300" y="30" textAnchor="middle">EXTERNAL IPs</text>
              <text x="370" y="200" textAnchor="middle">IT ASSETS</text>
            </g>
          ) : (
            <g className="select-none pointer-events-none opacity-40 font-mono text-[9px] font-bold fill-gray-500">
              <text x="150" y="90" textAnchor="middle">CORPORATE PORTAL</text>
              <text x="430" y="60" textAnchor="middle">PRODUCTION API</text>
              <text x="300" y="30" textAnchor="middle">CLOUD INFRASTRUCTURE</text>
              <text x="370" y="200" textAnchor="middle">STAGING & DEV</text>
            </g>
          )}

          {/* Scanning Sweep Line */}
          <line
            x1={`${scanPulse}%`}
            y1="0"
            x2={`${scanPulse}%`}
            y2="300"
            stroke="rgba(239, 68, 68, 0.15)"
            strokeWidth="3"
          />

          {/* Network Connections */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            const isExposedPath = fromNode.type === "exposure" || toNode.type === "exposure";
            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isExposedPath ? "#FEE2E2" : "#E5E7EB"}
                strokeWidth={isExposedPath ? "1" : "0.75"}
                strokeDasharray={isExposedPath ? "2 2" : "none"}
              />
            );
          })}

          {/* Static Background Asset Dots ("Alot of dots") */}
          {staticDots.map((dot, idx) => (
            <circle
              key={`static-${idx}`}
              cx={dot.x}
              cy={dot.y}
              r="2"
              fill="#D1D5DB"
              className="opacity-70"
            />
          ))}

          {/* Secure Nodes */}
          {nodes.filter(n => n.type !== "exposure").map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={hoveredNode?.id === node.id ? "6" : "4"}
              fill="#22C55E"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            />
          ))}

          {/* Exposed Nodes (Red Pulsing Dots) */}
          {nodes.filter(n => n.type === "exposure").map((node) => (
            <g key={node.id} className="cursor-pointer"
               onMouseEnter={() => setHoveredNode(node)}
               onMouseLeave={() => setHoveredNode(null)}>
              {/* Outer pulsing ring */}
              <circle
                cx={node.x}
                cy={node.y}
                r="10"
                fill="#EF4444"
                fillOpacity="0.2"
                className="animate-ping"
              />
              {/* Main solid red dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r="5"
                fill="#EF4444"
              />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip inside container */}
        <div className={`absolute bottom-xs left-xs right-xs bg-white border border-gray-600 rounded-[6px] p-xs shadow-md transition-all duration-200 flex items-center justify-between text-[11px] ${hoveredNode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          {hoveredNode && (
            <>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-black truncate">{hoveredNode.host}</span>
                <span className="text-[10px] text-gray-500 mt-[1px]">{hoveredNode.info}</span>
              </div>
              <span className={`text-[9px] uppercase font-bold tracking-wider px-[6px] py-[2.5px] rounded-[4px] shrink-0 ml-sm ${
                hoveredNode.status === "Exposed" || hoveredNode.status === "Vulnerable"
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700"
              }`}>
                {hoveredNode.status}
              </span>
            </>
          )}
        </div>

        {/* Scan Info Display overlay */}
        {!hoveredNode && (
          <div className="absolute bottom-xs left-xs bg-white border border-gray-200 rounded-[4px] px-[8px] py-[4px] text-[10px] text-gray-500 shadow-sm pointer-events-none">
            {isVS ? "Hover over nodes to inspect system vulnerability logs" : "Hover over nodes to inspect asset risk profile"}
          </div>
        )}

      </div>
      
      {/* Legend Row */}
      <div className="bg-[#FAFAFA] border-t border-gray-200 px-sm py-[8px] flex items-center justify-between text-[10px] font-semibold text-gray-900">
        <div className="flex gap-md">
          <div className="flex items-center gap-[4px]">
            <span className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
            <span>{isVS ? `Scanned Hosts (${staticDots.length})` : `Unmanaged Assets (${staticDots.length})`}</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>{isVS ? "Patched & Secure (12)" : "Managed & Secure (12)"}</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{isVS ? "Active Vulnerabilities (5)" : "Exposed Risks (5)"}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function Feature1({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';
  const isWAS = moduleSlug === 'was';
  const isAIM = moduleSlug === 'aim';
  const isVM = moduleSlug === 'vm';

  return (
    <section className="section-visibility-integration bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching page design guidelines */}
        <div className="section-border grid grid-cols-1 lg:grid-cols-12 border-b border-gray-600 border-x-[0.5px]">
          
          {/* Left Column: Heading & Value highlights (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 gap-xl">
            <div className="flex flex-col items-start gap-sm w-full">
              {/* Badge */}
              <span className="inline-flex items-center rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold tracking-[0.16em] uppercase bg-[#F5F5F5] text-black border border-gray-300">
                {isVM ? "Data Aggregation" : isAIM ? "Asset Discovery" : isWAS ? "Dynamic Scan Engine" : isVS ? "Continuous Assessment" : "Multi-Source Discovery"}
              </span>

              {/* Heading / Value */}
              <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight mt-xs">
                {isVM ? "Unified Vulnerability Aggregation & Normalization" : isAIM ? "Unified Asset Inventory & Visibility" : isWAS ? "Comprehensive Web Application & API scanning" : isVS ? "Comprehensive Asset Coverage" : "See every asset exposed to the internet."}
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] mt-sm">
                {isVM
                  ? "Ingest vulnerabilities from multiple sources (scanners, pentests, bug bounties) and normalize them into a single, standardized registry."
                  : isAIM
                    ? "Discover and catalog your entire digital footprint including subdomains, API endpoints, SSL certificates, code repositories, and cloud resources."
                    : isWAS
                      ? "It scans more than 1000 vulnerabilities, including the OWASP Top 10 and other advanced web attacks on your web application."
                      : isVS 
                        ? "Scan assets like internal IPs, subdomains, external IPs, and IT assets all in one place."
                        : "Discover domains, subdomains, IPs, applications, APIs, cloud resources, and shadow IT assets across your organization to maintain a complete and continuously updated view of your external attack surface."}
              </p>
            </div>

            {/* Sub-features checklist */}
            <div className="flex flex-col gap-md pt-lg border-t border-gray-200 w-full">
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">
                    {isVM ? "Multi-Source Aggregation" : isAIM ? "Complete Asset Coverage" : isWAS ? "OWASP Top 10 Audits" : isVS ? "Automated CVE Mapping" : "Continuous Mapping"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVM
                      ? "Consolidate active inputs from WAS, VS, Snyk, and external API feeds automatically."
                      : isAIM
                        ? "Map subdomains, internal and external IP addresses, employee identities, and object storage buckets."
                        : isWAS
                          ? "Detect injection attacks, cross-site scripting, broken authentication, and security misconfigurations."
                          : isVS 
                            ? "Automatically match discovered services against the latest NVD vulnerability database."
                            : "Automatic monitoring of DNS records, CT logs, and cloud catalogs."}
                  </p>
                </div>
              </div>
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">
                    {isVM ? "Normalization Engine" : isAIM ? "Dynamic Continuous Sync" : isWAS ? "API & Input Exposure" : isVS ? "Package Version Audits" : "Shadow IT Detection"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVM
                      ? "Re-evaluate different scanner outputs and align them under a unified risk classification metric."
                      : isAIM
                        ? "Instantly sync with active agent logs, cloud metadata, and domain registries to keep inventory current."
                        : isWAS
                          ? "Verify forms, outbound webhook integrations, XML inputs, and API parameters against bypasses."
                          : isVS 
                            ? "Identify vulnerable third-party dependencies, open ports, and unpatched infrastructure."
                            : "Uncover rogue environments, unmanaged APIs, and forgotten cloud storage."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Constellation network visual (Span 7) */}
          <div className="lg:col-span-7 px-sm sm:px-xl lg:px-64px py-lg lg:py-88px bg-[#FAFAFA] flex items-center justify-center">
            <FadeInBlock delay={0.2} className="w-full">
              {isVM ? (
                <VMNormalizationEngine />
              ) : isAIM ? (
                <AIMUnifiedAssetMap />
              ) : isWAS ? (
                <WASWebUiBugMap />
              ) : isVS ? (
                <VSRadarScannerMap moduleSlug={moduleSlug} />
              ) : (
                <DiscoveryNetworkMap moduleSlug={moduleSlug} />
              )}
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
