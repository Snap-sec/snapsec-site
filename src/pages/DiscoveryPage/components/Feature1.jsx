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

// Normalization Engine Animation for VM (Feature 1)
function VMNormalizationEngine() {
  const [pulse, setPulse] = useState(0);
  const [normalizedItems, setNormalizedItems] = useState([
    { id: "VM-201", title: "SQLi in /api/v1/checkout", sev: "CRITICAL", cvss: "9.8", source: "WAS Scanner" },
    { id: "VM-202", title: "Port 22 SSH exposed", sev: "HIGH", cvss: "8.4", source: "VS Scanner" },
    { id: "VM-203", title: "Outdated OpenSSL package", sev: "MEDIUM", cvss: "5.3", source: "Snyk Ingestion" }
  ]);

  useEffect(() => {
    const sources = ["WAS Scanner", "VS Scanner", "Snyk Ingestion", "Qualys API", "Bug Bounty Feed"];
    const titles = [
      { t: "Exposed S3 backups bucket", s: "HIGH", c: "8.1" },
      { t: "RCE in Log4j library version", s: "CRITICAL", c: "9.8" },
      { t: "XSS vulnerable parameter 'q'", s: "MEDIUM", c: "6.1" },
      { t: "CSRF token bypass in checkout", s: "HIGH", c: "7.5" }
    ];

    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % 3);
      
      // Add a normalized item periodically
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomSrc = sources[Math.floor(Math.random() * sources.length)];
      const newItem = {
        id: `VM-${Math.floor(Math.random() * 800) + 204}`,
        title: randomTitle.t,
        sev: randomTitle.s,
        cvss: randomTitle.c,
        source: randomSrc
      };

      setNormalizedItems(prev => [newItem, prev[0], prev[1]].slice(0, 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-blue-500 animate-pulse" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            Normalization Engine v1.2
          </span>
        </div>
        <div className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-xs py-xxs rounded">
          NORMALIZING FEEDS
        </div>
      </div>

      {/* SVG Container */}
      <div className="flex-1 bg-[#FAFAFA] relative overflow-hidden flex flex-col p-sm justify-between">
        
        {/* Top visual representation */}
        <div className="h-[120px] relative border border-gray-200 rounded bg-white overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 100">
            {/* Source logos/nodes on left */}
            <g transform="translate(30, 10)">
              <rect x="0" y="0" width="70" height="20" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
              <text x="35" y="13" textAnchor="middle" className="font-mono text-[8px] font-bold fill-gray-600 uppercase">Qualys</text>
            </g>
            <g transform="translate(30, 40)">
              <rect x="0" y="0" width="70" height="20" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
              <text x="35" y="13" textAnchor="middle" className="font-mono text-[8px] font-bold fill-gray-600 uppercase">Snyk</text>
            </g>
            <g transform="translate(30, 70)">
              <rect x="0" y="0" width="70" height="20" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
              <text x="35" y="13" textAnchor="middle" className="font-mono text-[8px] font-bold fill-gray-600 uppercase">WAS/VS</text>
            </g>

            {/* Central Normalizer Core */}
            <g transform="translate(250, 50)">
              <circle cx="0" cy="0" r="24" fill={pulse === 1 ? "#3B82F6" : "#4F46E5"} fillOpacity="0.1" className="animate-pulse" />
              <circle cx="0" cy="0" r="14" fill="#4F46E5" stroke="#3730A3" strokeWidth="1.5" />
              <text x="0" y="3" textAnchor="middle" className="font-mono text-[8px] font-bold fill-white">CORE</text>
            </g>

            {/* Ingestion Arrows */}
            <path d="M 110 20 L 220 40" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <path d="M 110 50 L 220 50" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <path d="M 110 80 L 220 60" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" fill="none" />

            {/* Output Lines to the standard feed */}
            <path d="M 280 50 L 380 50" stroke="#10B981" strokeWidth="1.5" strokeDasharray={pulse === 0 ? "4 4" : "none"} fill="none" className="transition-all duration-300" />
            <circle cx={pulse === 0 ? "300" : pulse === 1 ? "340" : "370"} cy="50" r="3" fill="#10B981" />

            <g transform="translate(390, 35)">
              <rect x="0" y="0" width="80" height="30" rx="4" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
              <text x="40" y="14" textAnchor="middle" className="font-mono text-[8px] font-extrabold fill-green-800">NORMALIZED</text>
              <text x="40" y="24" textAnchor="middle" className="font-mono text-[7px] fill-green-600">SCHEMA V1</text>
            </g>
          </svg>
        </div>

        {/* Real-time normalized output list */}
        <div className="flex-1 flex flex-col gap-xs justify-end mt-sm select-text">
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider select-none">Normalized Vulnerability Registry</div>
          {normalizedItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 rounded px-xs py-xxs text-[10px] font-mono shadow-sm">
              <div className="flex items-center gap-xs truncate">
                <span className="text-gray-400 font-bold">{item.id}</span>
                <span className="font-bold text-gray-900 truncate">{item.title}</span>
              </div>
              <div className="flex items-center gap-xs shrink-0 pl-xs">
                <span className="text-gray-400 text-[8px]">{item.source}</span>
                <span className={`text-[8px] font-extrabold px-[5px] py-[1.5px] rounded ${
                  item.sev === "CRITICAL" ? "bg-red-100 text-red-700" :
                  item.sev === "HIGH" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  CVSS {item.cvss}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Unified Asset map representation for AIM (Feature 1)
function AIMUnifiedAssetMap() {
  const [pulse, setPulse] = useState(0);
  const [counts, setCounts] = useState({ subdomains: 130, apis: 72, repos: 30, certs: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 4);
      setCounts(c => ({
        subdomains: c.subdomains + (Math.random() > 0.7 ? 1 : 0),
        apis: c.apis + (Math.random() > 0.8 ? 1 : 0),
        repos: c.repos + (Math.random() > 0.9 ? 1 : 0),
        certs: c.certs + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-blue-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-indigo-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-green-400" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            Asset Ingestion Core
          </span>
        </div>
        <div className="flex items-center gap-xs text-[10px] font-bold text-blue-600">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
          <span>INGESTING DATAFEED</span>
        </div>
      </div>

      {/* SVG Container */}
      <div className="flex-1 bg-white relative overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 600 240">
          {/* Grid background */}
          <pattern id="aimGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="240" fill="url(#aimGrid)" />

          {/* Connection Lines from perimeter to center */}
          <path d="M 120 70 L 300 120" stroke={pulse === 0 ? "#3B82F6" : "#E5E7EB"} strokeWidth={pulse === 0 ? "2" : "1.2"} fill="none" className="transition-all duration-300" />
          <path d="M 120 170 L 300 120" stroke={pulse === 1 ? "#6366F1" : "#E5E7EB"} strokeWidth={pulse === 1 ? "2" : "1.2"} fill="none" className="transition-all duration-300" />
          <path d="M 480 70 L 300 120" stroke={pulse === 2 ? "#10B981" : "#E5E7EB"} strokeWidth={pulse === 2 ? "2" : "1.2"} fill="none" className="transition-all duration-300" />
          <path d="M 480 170 L 300 120" stroke={pulse === 3 ? "#EC4899" : "#E5E7EB"} strokeWidth={pulse === 3 ? "2" : "1.2"} fill="none" className="transition-all duration-300" />

          {/* Central Hub Node */}
          <g transform="translate(300, 120)">
            <circle cx="0" cy="0" r="32" fill="#3B82F6" fillOpacity="0.05" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="20" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
            <text x="0" y="3" textAnchor="middle" className="font-mono text-[9px] font-bold fill-white select-none">AIM</text>
          </g>

          {/* Category Cards */}
          <g transform="translate(40, 40)">
            <rect x="0" y="0" width="100" height="40" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
            <rect x="0" y="0" width="100" height="5" rx="2" fill="#3B82F6" />
            <text x="8" y="20" className="font-sans text-[8px] font-bold fill-gray-500 uppercase select-none">SUBDOMAINS</text>
            <text x="8" y="32" className="font-mono text-[11px] font-extrabold fill-black">{counts.subdomains}</text>
          </g>

          <g transform="translate(40, 140)">
            <rect x="0" y="0" width="100" height="40" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
            <rect x="0" y="0" width="100" height="5" rx="2" fill="#6366F1" />
            <text x="8" y="20" className="font-sans text-[8px] font-bold fill-gray-500 uppercase select-none">API ENDPOINTS</text>
            <text x="8" y="32" className="font-mono text-[11px] font-extrabold fill-black">{counts.apis}</text>
          </g>

          <g transform="translate(460, 40)">
            <rect x="0" y="0" width="100" height="40" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
            <rect x="0" y="0" width="100" height="5" rx="2" fill="#10B981" />
            <text x="8" y="20" className="font-sans text-[8px] font-bold fill-gray-500 uppercase select-none">REPOSITORIES</text>
            <text x="8" y="32" className="font-mono text-[11px] font-extrabold fill-black">{counts.repos}</text>
          </g>

          <g transform="translate(460, 140)">
            <rect x="0" y="0" width="100" height="40" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
            <rect x="0" y="0" width="100" height="5" rx="2" fill="#EC4899" />
            <text x="8" y="20" className="font-sans text-[8px] font-bold fill-gray-500 uppercase select-none">CERTIFICATES</text>
            <text x="8" y="32" className="font-mono text-[11px] font-extrabold fill-black">{counts.certs}</text>
          </g>
        </svg>

        {/* Real-time Ticker */}
        <div className="absolute bottom-xs left-xs right-xs bg-white border border-gray-600 rounded-[4px] px-sm py-[6px] text-[10px] font-mono text-gray-500 flex justify-between select-none">
          <span>&gt; Ingesting cloud boundary log feeds...</span>
          <span className="font-bold text-green-600">SYNC ACTIVE</span>
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
          {/* Grid background */}
          <pattern id="wasGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="240" fill="url(#wasGrid)" />

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
          {/* SQLi */}
          <text x="145" y="98" className="font-sans text-[7px] font-bold fill-gray-500 select-none">Search Invoices (ID)</text>
          <rect x="145" y="102" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 0 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 0 ? 1.5 : 1} />
          <text x="150" y="113" className="font-mono text-[7px] fill-gray-700 select-none">10023' OR 1=1 --</text>

          {/* XSS */}
          <text x="145" y="143" className="font-sans text-[7px] font-bold fill-gray-500 select-none">User Display Name</text>
          <rect x="145" y="147" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 1 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 1 ? 1.5 : 1} />
          <text x="150" y="158" className="font-mono text-[7px] fill-gray-700 select-none">&lt;script&gt;alert('XSS')&lt;/script&gt;</text>

          {/* IDOR */}
          <text x="145" y="188" className="font-sans text-[7px] font-bold fill-gray-500 select-none">Endpoint Identifier (IDOR)</text>
          <rect x="145" y="192" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 2 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 2 ? 1.5 : 1} />
          <text x="150" y="203" className="font-mono text-[7px] fill-gray-700 select-none">?user_id=1001</text>

          {/* SSRF */}
          <text x="350" y="98" className="font-sans text-[7px] font-bold fill-gray-500 select-none">Outbound Webhook URL (SSRF)</text>
          <rect x="350" y="102" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 3 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 3 ? 1.5 : 1} />
          <text x="355" y="113" className="font-mono text-[7px] fill-gray-700 select-none">http://169.254.169.254/latest/</text>

          {/* LFI */}
          <text x="350" y="143" className="font-sans text-[7px] font-bold fill-gray-500 select-none">XML Report Path (LFI)</text>
          <rect x="350" y="147" width="180" height="18" rx="4" fill="#FFFFFF" stroke={activeBug.id === 4 ? "#EF4444" : "#E5E7EB"} strokeWidth={activeBug.id === 4 ? 1.5 : 1} />
          <text x="355" y="158" className="font-mono text-[7px] fill-gray-700 select-none">file:///etc/passwd</text>

          {/* CSRF */}
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
