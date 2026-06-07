import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, className = 'w-full' }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        inView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}
    >
      {children}
    </div>
  );
}

// Interactive Ownership Assignment & Integration Sync for VM (Feature 3)
function VMOwnershipTickets() {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Platform Engineering", tickets: 14, compliance: 94.2, violations: 2 },
    { id: 2, name: "SecOps Core", tickets: 5, compliance: 98.7, violations: 0 },
    { id: 3, name: "Billing & Finance", tickets: 29, compliance: 76.5, violations: 8 },
    { id: 4, name: "Vendor-B Devs", tickets: 12, compliance: 88.0, violations: 1 }
  ]);
  const [notified, setNotified] = useState({});

  const handleNotify = (id) => {
    setNotified(prev => ({ ...prev, [id]: "Sending..." }));
    setTimeout(() => {
      setNotified(prev => ({ ...prev, [id]: "Alerted ✓" }));
    }, 800);
  };

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-[10px] flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-gray-955 font-bold text-[10px] tracking-tight uppercase">
            Accountability Leaderboard
          </span>
        </div>
        <div className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-xs py-xxs rounded">
          DEPT COMPLIANCE TRACKER
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-3 border-b border-gray-200 bg-[#FAFBFB] p-xs gap-xs select-none shrink-0">
        <div className="bg-white border border-gray-200 rounded p-[6px] text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase">Total Tickets</span>
          <span className="text-[14px] font-bold text-gray-900 mt-xxs block">60</span>
        </div>
        <div className="bg-white border border-gray-200 rounded p-[6px] text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase">Avg Compliance</span>
          <span className="text-[14px] font-bold text-indigo-600 mt-xxs block">89.3%</span>
        </div>
        <div className="bg-white border border-gray-200 rounded p-[6px] text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase">Active Breaches</span>
          <span className="text-[14px] font-bold text-red-600 mt-xxs block">11</span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 overflow-y-auto bg-white p-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400 text-[8.5px] uppercase font-bold select-none">
              <th className="pb-xxs font-bold">Department</th>
              <th className="pb-xxs font-bold text-center">Tickets</th>
              <th className="pb-xxs font-bold text-center">Compliance</th>
              <th className="pb-xxs font-bold text-center">Violations</th>
              <th className="pb-xxs font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => {
              const complianceColor = 
                dept.compliance >= 95 ? "text-green-600" :
                dept.compliance >= 85 ? "text-yellow-600" : "text-red-600";
              
              const violationColor =
                dept.violations === 0 ? "text-gray-400" :
                dept.violations < 3 ? "text-orange-500 font-bold" : "text-red-600 font-extrabold";

              const isNotified = notified[dept.id];

              return (
                <tr key={dept.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-xs">
                    <span className="text-[10.5px] font-semibold text-gray-900 block leading-tight">{dept.name}</span>
                    <span className="text-[8px] text-gray-400 block mt-[2px] font-mono">Owner assigned</span>
                  </td>
                  <td className="py-xs text-center">
                    <span className="text-[10px] font-bold text-gray-800 font-mono">{dept.tickets}</span>
                  </td>
                  <td className="py-xs text-center">
                    <span className={`text-[10px] font-bold font-mono ${complianceColor}`}>
                      {dept.compliance}%
                    </span>
                  </td>
                  <td className="py-xs text-center">
                    <span className={`text-[10px] font-mono ${violationColor}`}>
                      {dept.violations}
                    </span>
                  </td>
                  <td className="py-xs text-right">
                    <button
                      onClick={() => handleNotify(dept.id)}
                      disabled={isNotified && isNotified !== "Sending..."}
                      className={`px-xs py-[3px] rounded text-[8px] font-bold uppercase tracking-wider transition border ${
                        isNotified === "Alerted ✓" 
                          ? "bg-green-50 text-green-700 border-green-200"
                          : isNotified === "Sending..."
                            ? "bg-gray-50 text-gray-400 border-gray-200 animate-pulse"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                      }`}
                    >
                      {isNotified || "Notify"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="bg-white border-t border-gray-200 px-xs py-xxs flex items-center justify-between text-[8px] text-gray-400 font-semibold select-none shrink-0">
        <span>SLA countdown active</span>
        <span className="text-gray-505">Auto-escalation enabled</span>
      </div>

    </div>
  );
}

// Auto-Updating Catalog Illustration for VS
function VSAutoUpdatingCatalogMap() {
  const [scanIndex, setScanIndex] = useState(0);
  const [newAssetOpacity, setNewAssetOpacity] = useState(0);
  const [newAssetName, setNewAssetName] = useState('temp-dev-runner');
  const [discoveredList, setDiscoveredList] = useState([
    { name: 'rds-db-primary', time: '10m ago', status: 'Scanned' },
    { name: 'prod-s3-backups', time: '23m ago', status: 'Scanned' },
    { name: 'api-gateway', time: '1h ago', status: 'Scanned' }
  ]);

  const assetPool = [
    'temp-dev-runner',
    'stale-db-backup',
    'k8s-ingress-pod-12',
    'testing-sandbox-vm',
    'internal-jenkins-agent'
  ];

  useEffect(() => {
    // Scan one asset at a time every 1.5s
    const interval = setInterval(() => {
      setScanIndex(prev => {
        const next = (prev + 1) % 5;
        // If next is 4 (the auto-discovered new asset), trigger a name rotation
        if (next === 4) {
          const name = assetPool[Math.floor(Math.random() * assetPool.length)];
          setNewAssetName(name);
          setNewAssetOpacity(1);
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Update discoveredList when scan completes for the newly discovered asset
  useEffect(() => {
    if (scanIndex === 4) {
      const timer = setTimeout(() => {
        setDiscoveredList(prev => {
          // Prevent duplicates in short succession
          if (prev[0].name === newAssetName) return prev;
          return [
            { name: newAssetName, time: 'Just now', status: 'Scanned' },
            ...prev.slice(0, 2)
          ];
        });
      }, 800); // add to catalog in the middle of active scan
      return () => clearTimeout(timer);
    }
  }, [scanIndex, newAssetName]);

  // Slowly fade out new asset opacity after scanning completes and scan index moves on
  useEffect(() => {
    if (scanIndex !== 4 && newAssetOpacity > 0) {
      const timer = setTimeout(() => {
        setNewAssetOpacity(prev => Math.max(0, prev - 0.2));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [scanIndex, newAssetOpacity]);

  const assets = [
    { id: 0, x: 90, y: 110, name: "rds-db-primary", type: "DB" },
    { id: 1, x: 90, y: 190, name: "prod-s3-backups", type: "Storage" },
    { id: 2, x: 270, y: 110, name: "api-gateway", type: "API Gateway" },
    { id: 3, x: 270, y: 190, name: "k8s-ingress", type: "Load Balancer" },
    { id: 4, x: 180, y: 150, name: newAssetName, type: "Ephemeral Host" }
  ];

  const activeAsset = assets[scanIndex];

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-red-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-yellow-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-green-400" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            Cloud Sync Scanner Orchestration
          </span>
        </div>
        <div className="flex items-center gap-xs text-gray-900 text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse inline-block" />
          <span className="text-[#10B981] uppercase font-bold">
            Cloud Connected
          </span>
        </div>
      </div>

      {/* SVG Container */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <svg className="w-full h-full" viewBox="0 0 600 240">
          {/* Grid background */}
          <pattern id="catalogGridNew" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="240" fill="url(#catalogGridNew)" />

          {/* Cloud Boundary Box (Left Side) */}
          <rect
            x="40"
            y="40"
            width="280"
            height="180"
            rx="8"
            fill="rgba(59, 130, 246, 0.01)"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <g transform="translate(50, 48)">
            <rect x="0" y="0" width="16" height="10" rx="1.5" fill="#EBF5FF" stroke="#3B82F6" strokeWidth="1" />
            <text x="22" y="8" className="font-mono text-[7px] font-bold fill-blue-600 uppercase select-none">AWS Production VPC</text>
          </g>

          {/* Scanner Node (Right Side) */}
          <g transform="translate(480, 130)">
            {/* Active Radar Rings */}
            <circle cx="0" cy="0" r="30" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="0" cy="0" r="12" fill="#10B981" fillOpacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="6" fill="#10B981" stroke="#047857" strokeWidth="1" />
          </g>
          <text x="480" y="90" textAnchor="middle" className="font-mono text-[8px] font-bold fill-green-600 select-none">
            SNAPSEC SCANNER
          </text>

          {/* Connected Bridge Line (Scanner to Cloud VPC) */}
          <line
            x1="320"
            y1="130"
            x2="450"
            y2="130"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <text x="385" y="120" textAnchor="middle" className="font-mono text-[6px] font-semibold fill-gray-500 select-none">
            CLOUDSYNC CONNECTOR
          </text>

          {/* Scanning Beam (Fired from Scanner to Targeted Asset) */}
          {activeAsset && (
            <g>
              <line
                x1="480"
                y1="130"
                x2={activeAsset.x}
                y2={activeAsset.y}
                stroke="#10B981"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                className="animate-pulse"
              />
              <circle
                cx={activeAsset.x}
                cy={activeAsset.y}
                r="10"
                fill="none"
                stroke="#10B981"
                strokeWidth="1"
                className="animate-ping"
              />
            </g>
          )}

          {/* Render assets inside Cloud Box */}
          {assets.map((asset) => {
            const isActive = activeAsset?.id === asset.id;
            const isNewAsset = asset.id === 4;

            // Compute node color and opacity
            let opacity = 1;
            let color = "#3B82F6"; // cloud blue

            if (isNewAsset) {
              opacity = newAssetOpacity;
              color = "#F59E0B"; // yellow for newly auto-detected assets
            }
            if (isActive) {
              color = "#10B981"; // green during active scanning
            }

            return (
              <g key={asset.id} opacity={opacity} className="transition-opacity duration-300">
                {/* Glow ring around active scanner target */}
                {isActive && (
                  <circle
                    cx={asset.x}
                    cy={asset.y}
                    r="8"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1"
                  />
                )}
                {/* Core Asset Dot */}
                <circle
                  cx={asset.x}
                  cy={asset.y}
                  r={isActive ? 5 : 4}
                  fill={color}
                  stroke="#FFF"
                  strokeWidth="1"
                />
                {/* Asset Name Label */}
                <text
                  x={asset.x}
                  y={asset.y - 10}
                  textAnchor="middle"
                  className="font-mono text-[8px] font-semibold fill-gray-900 select-none"
                >
                  {asset.name}
                </text>
                {/* Small indicator label */}
                {isNewAsset && (
                  <text
                    x={asset.x}
                    y={asset.y + 16}
                    textAnchor="middle"
                    className="font-mono text-[6px] font-bold fill-amber-600 bg-amber-50 px-[3px] rounded select-none uppercase"
                  >
                    Auto-Detected
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Catalog List Mockup Overlay */}
        <div className="absolute bottom-xs left-xs right-xs bg-white border border-gray-600 rounded-[6px] p-xs shadow-sm flex flex-col gap-[3px] text-[10px]">
          <div className="flex justify-between font-mono text-[8px] font-bold text-gray-500 border-b border-gray-200 pb-[3px] select-none">
            <span>CATALOG REGISTRY</span>
            <span>INGESTION STATUS</span>
          </div>
          {discoveredList.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-[10px]">
              <span className="font-semibold text-gray-900 truncate max-w-[150px]">{item.name}</span>
              <div className="flex items-center gap-[4px]">
                <span className="text-gray-400 text-[9px]">{item.time}</span>
                <span className="text-[8px] font-bold text-green-600 bg-green-50 border border-green-200 px-[5px] py-[1px] rounded uppercase">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Minimalist, Static YAML Code Editor Mockup
function YamlEditorMockup({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';

  const yamlLines = isVS ? [
    { num: "01", text: "id: ", highlight: true, val: "outdated-openssl-detection" },
    { num: "02", text: "info:", highlight: true, val: "" },
    { num: "03", text: "  name: ", highlight: true, val: "\"Outdated OpenSSL Version\"" },
    { num: "04", text: "  severity: ", highlight: true, val: "high" },
    { num: "05", text: "  description: ", highlight: true, val: "\"Flags production hosts running vulnerable OpenSSL versions.\"" },
    { num: "06", text: "", highlight: false, val: "" },
    { num: "07", text: "conditions:", highlight: true, val: "" },
    { num: "08", text: "  - ", highlight: true, val: "package.name == 'openssl'" },
    { num: "09", text: "  - ", highlight: true, val: "package.version < '3.0.7'" },
    { num: "10", text: "  - ", highlight: true, val: "subnet.environment == 'Production'" },
    { num: "11", text: "", highlight: false, val: "" },
    { num: "12", text: "actions:", highlight: true, val: "" },
    { num: "13", text: "  - ", highlight: true, val: "notify: '#sec-alerts-slack'" },
    { num: "14", text: "  - ", highlight: true, val: "ticket: 'Jira - SecOps'" }
  ] : [
    { num: "01", text: "id: ", highlight: true, val: "custom-staging-db-check" },
    { num: "02", text: "info:", highlight: true, val: "" },
    { num: "03", text: "  name: ", highlight: true, val: "\"Exposed MySQL Port in Staging\"" },
    { num: "04", text: "  severity: ", highlight: true, val: "critical" },
    { num: "05", text: "  description: ", highlight: true, val: "\"Flags database ports exposed externally in dev subnets.\"" },
    { num: "06", text: "", highlight: false, val: "" },
    { num: "07", text: "conditions:", highlight: true, val: "" },
    { num: "08", text: "  - ", highlight: true, val: "asset.type == 'IP Address'" },
    { num: "09", text: "  - ", highlight: true, val: "port.open == 3306" },
    { num: "10", text: "  - ", highlight: true, val: "subnet.environment == 'Staging'" },
    { num: "11", text: "  - ", highlight: true, val: "network.visibility == 'Public'" },
    { num: "12", text: "", highlight: false, val: "" },
    { num: "13", text: "actions:", highlight: true, val: "" },
    { num: "14", text: "  - ", highlight: true, val: "notify: '#sec-alerts-slack'" },
    { num: "15", text: "  - ", highlight: true, val: "ticket: 'Jira - SecOps'" }
  ];

  return (
    <div className="w-full rounded-[6px] border border-gray-600 bg-white overflow-hidden flex flex-col h-[340px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Editor Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between text-[11px] font-semibold text-gray-900 select-none">
        <div className="flex items-center gap-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          <span className="font-mono text-[10px] tracking-tight">
            {isVS ? "outdated-openssl-detection.yaml" : "custom-staging-db-check.yaml"}
          </span>
        </div>
        <span className="text-[8px] font-bold uppercase tracking-wider px-[6px] py-[2px] bg-gray-100 text-gray-600 rounded">YAML Schema v2</span>
      </div>

      {/* Editor Code Area */}
      <div className="flex-1 p-sm bg-[#FAFAFA] overflow-y-auto font-mono text-[11px] leading-relaxed text-gray-900">
        {yamlLines.map((line, idx) => (
          <div key={idx} className="flex select-text">
            <span className="text-gray-400 w-[24px] pr-xs text-right select-none border-r border-gray-200 mr-sm">
              {line.num}
            </span>
            <span className="flex-1 whitespace-pre">
              {line.highlight ? (
                <>
                  <span className="text-purple-700 font-semibold">{line.text}</span>
                  <span className="text-green-700">{line.val}</span>
                </>
              ) : (
                line.text
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Editor Footer */}
      <div className="bg-white border-t border-gray-200 px-sm py-xs flex items-center justify-between text-[9px] text-gray-400 font-semibold select-none">
        <span>Encoding: UTF-8</span>
        <span className="text-green-600 flex items-center gap-xxs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Rule Validated
        </span>
      </div>

    </div>
  );
}

// Live Risk Insights & Trigger Feeds for AIM (Feature 3)
function AIMRiskInsights() {
  const [alerts, setAlerts] = useState([
    { type: "CRITICAL", text: "SSL certificate expired on dev.snapsec.co", time: "Just now", color: "text-red-600 bg-red-50 border-red-200" },
    { type: "HIGH", text: "Unauthenticated API: /v2/debug-status", time: "2m ago", color: "text-orange-600 bg-orange-50 border-orange-200" },
    { type: "HIGH", text: "Public Storage Bucket: snapsec-cdn-assets", time: "10m ago", color: "text-orange-600 bg-orange-50 border-orange-200" }
  ]);

  useEffect(() => {
    const alertPool = [
      { type: "MEDIUM", text: "Open DB port 5432 exposed on 12.84.92.10", color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
      { type: "CRITICAL", text: "GitHub repository 'internal-auth' set to PUBLIC", color: "text-red-600 bg-red-50 border-red-200" },
      { type: "INFO", text: "New subdomain ingested: admin-portal.snapsec.co", color: "text-blue-600 bg-blue-50 border-blue-200" },
      { type: "HIGH", text: "Unencrypted TLS cipher suite found on mail.corp.co", color: "text-orange-600 bg-orange-50 border-orange-200" }
    ];

    const interval = setInterval(() => {
      const randomAlert = alertPool[Math.floor(Math.random() * alertPool.length)];
      setAlerts(prev => [
        { ...randomAlert, time: "Just now" },
        ...prev.map(a => {
          if (a.time === "Just now") return { ...a, time: "1m ago" };
          if (a.time === "1m ago") return { ...a, time: "5m ago" };
          return { ...a, time: "10m ago" };
        })
      ].slice(0, 3));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-red-500 animate-pulse" />
          <span className="text-gray-900 font-semibold text-[10px] tracking-wider uppercase">
            Risk Monitor & Triggers
          </span>
        </div>
        <span className="text-[8px] font-bold uppercase tracking-wider px-[6px] py-[2.5px] bg-red-50 text-red-600 rounded">
          3 Critical Exposures
        </span>
      </div>

      {/* Main split display */}
      <div className="flex-1 flex min-h-0 bg-[#FAFAFA]">
        {/* Left Side: Risk Severity Chart */}
        <div className="w-[40%] border-r border-gray-200 p-sm flex flex-col justify-between select-none">
          <span className="text-gray-900 font-bold text-[10px] uppercase pb-xs border-b border-gray-200">Severity</span>
          <div className="flex-1 flex flex-col justify-center gap-xs">
            {/* Critical */}
            <div className="flex flex-col">
              <div className="flex justify-between text-[8px] font-bold text-gray-500">
                <span>CRITICAL</span>
                <span>2</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-xxs overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: "40%" }} />
              </div>
            </div>
            {/* High */}
            <div className="flex flex-col">
              <div className="flex justify-between text-[8px] font-bold text-gray-500">
                <span>HIGH</span>
                <span>5</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-xxs overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: "70%" }} />
              </div>
            </div>
            {/* Medium */}
            <div className="flex flex-col">
              <div className="flex justify-between text-[8px] font-bold text-gray-500">
                <span>MEDIUM</span>
                <span>12</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-xxs overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: "90%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Streaming alerts */}
        <div className="flex-1 p-sm bg-white overflow-y-auto flex flex-col gap-xs select-text">
          <span className="text-gray-900 font-bold text-[10px] uppercase pb-xs border-b border-gray-100 select-none">Live Triggers Stream</span>
          <div className="flex-1 flex flex-col gap-xs justify-start">
            {alerts.map((alert, idx) => (
              <div key={idx} className={`p-xs border rounded flex items-center justify-between text-[10px] ${alert.color}`}>
                <div className="flex flex-col min-w-0 pr-xs">
                  <span className="font-extrabold uppercase text-[8px] tracking-wider">{alert.type}</span>
                  <span className="truncate text-gray-900 font-semibold mt-xxs">{alert.text}</span>
                </div>
                <span className="text-[8px] text-gray-400 font-bold shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Report Writer Illustration for WAS (Feature 3)
function WASAiReportWriter() {
  const [timeline, setTimeline] = useState(0);
  const [typedText, setTypedText] = useState("");

  const fullReportText = [
    "# AI VULNERABILITY ANALYSIS REPORT",
    "Target: https://app.corp.internal/api/v1/invoice",
    "Severity: CRITICAL (9.8/10)",
    "",
    "## EXECUTIVE SUMMARY",
    "AI agent analyzed the 500 DB logs and verified a SQL Injection vulnerability. Query parameter 'id' lacks proper input binding, allowing arbitrary database extraction.",
    "",
    "## REMEDIATION SUGGESTION",
    "Use prepared statements or parameterize inputs:",
    "  db.Query('SELECT * FROM inv WHERE id = ?', id)"
  ];

  // Drive animation lifecycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeline(t => (t + 1) % 40);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Update typed text based on timeline
  useEffect(() => {
    // If timeline resets, clear text
    if (timeline === 0) {
      setTypedText("");
    } else {
      const joined = fullReportText.join("\n");
      const charactersToDisplay = Math.min(joined.length, timeline * 10);
      setTypedText(joined.slice(0, charactersToDisplay));
    }
  }, [timeline]);

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-blue-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-purple-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-pink-400" />
          <span className="text-gray-950 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            AI Co-Pilot Reporter
          </span>
        </div>
        <div className="flex items-center gap-xs text-[10px] font-bold text-purple-600">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping inline-block" />
          <span>WRITING POC REPORT...</span>
        </div>
      </div>

      {/* Main split display */}
      <div className="flex-1 flex min-h-0 bg-[#FAFAFA]">
        {/* Left Side: Scan Logs */}
        <div className="w-[40%] border-r border-gray-200 p-sm font-mono text-[9px] text-gray-400 overflow-hidden flex flex-col gap-xs select-none">
          <div className="text-gray-900 font-bold border-b border-gray-200 pb-[3px]">CRAWLER STREAM</div>
          <div className="truncate text-green-600 font-semibold">&gt; [GET] /profile - 200 OK</div>
          <div className="truncate text-green-600 font-semibold">&gt; [GET] /invoices - 200 OK</div>
          <div className="truncate text-red-500 font-bold animate-pulse">&gt; [GET] /invoice?id=12' OR 1=1 - 500</div>
          <div className="truncate text-gray-500">&gt; DB Exception: syntax near "'"</div>
          <div className="truncate text-purple-600 font-bold">&gt; AI Agent crawling nodes...</div>
          <div className="truncate text-purple-600 font-bold">&gt; Attempting injection validation...</div>
          <div className="truncate text-red-500 font-bold">&gt; Vulnerability confirmed (SQLi)</div>
          <div className="truncate text-purple-500">&gt; Triggering AI reporting cycle...</div>
        </div>

        {/* Right Side: AI Report Preview */}
        <div className="flex-1 p-sm bg-white overflow-y-auto flex flex-col font-mono text-[9px] text-gray-900 select-text">
          <div className="flex-1 whitespace-pre-wrap leading-relaxed select-text">
            {typedText}
            <span className="w-1.5 h-3 bg-purple-500 inline-block animate-pulse ml-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Feauture3({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';
  const isWAS = moduleSlug === 'was';
  const isAIM = moduleSlug === 'aim';
  const isVM = moduleSlug === 'vm';

  return (
    <section className="section-visibility-yaml bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching page design guidelines */}
        <div className="section-border grid grid-cols-1 lg:grid-cols-12 border-b border-gray-600 border-x-[0.5px]">
          
          {/* Left Column: Heading & Content (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 gap-xl">
            <div className="flex flex-col items-start gap-sm w-full">
              {/* Badge */}
              <span className="inline-flex items-center rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold tracking-[0.16em] uppercase bg-[#F5F5F5] text-black border border-gray-300">
                {isVM ? "Ownership & SLAs" : isAIM ? "Risk Intelligence" : isWAS ? "AI Engine" : isVS ? "Asset Catalog" : "Custom Detection"}
              </span>

              {/* Heading */}
              <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight mt-xs">
                {isVM ? "Vulnerability Ownership & Accountability" : isAIM ? "Identify Risk Concentration Quickly" : isWAS ? "AI Driven Intelligence" : isVS ? "Auto Updating Asset Catalog" : "Codify Your Security Policies with Custom YAML Rules"}
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] mt-sm">
                {isVM
                  ? "Assign clear ownership of vulnerabilities to specific business units or developers, and enforce automated SLA deadlines to ensure timely remediation and accountability."
                  : isAIM
                    ? "Instantly flag critical vulnerabilities, expired SSL certificates, and unauthenticated APIs across all discovered endpoints to prevent security incidents."
                    : isWAS
                      ? "We use AI for crawling and finding more vulnerabilities and for reporting."
                      : isVS 
                        ? "The asset catalog automatically detects and brings them to scanning."
                        : "Don't rely on generic checks. Write simple, declarative YAML rules to instantly target company-specific exposures, enforce strict guardrails, and secure your environment on your own terms."}
              </p>
            </div>

            {/* Checklist details */}
            <div className="flex flex-col gap-md pt-lg border-t border-gray-200 w-full">
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">
                    {isVM ? "Vulnerability Ownership" : isAIM ? "Alerting & Triggers" : isWAS ? "AI-Powered Crawling" : isVS ? "Codified Vulnerability Logic" : "Codified Attack Surface"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVM
                      ? "Segment assets and delegate vulnerability ownership to developers, engineering groups, or vendors automatically on detection."
                      : isAIM
                        ? "Generate dynamic security alerts to notify security teams whenever public storage buckets or unauthenticated endpoints are identified."
                        : isWAS
                          ? "Our autonomous agent crawls complex SPAs, authenticated login forms, and API routes to uncover deep, hidden endpoints."
                          : isVS 
                            ? "Translate complex library audits and version restrictions into executable files. Target specific package names, running ciphers, or server runtime headers."
                            : "Translate complex security policies into executable files. Target specific asset subnets, open ports, cloud resource configurations, or host tags."}
                  </p>
                </div>
              </div>
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">
                    {isVM ? "SLA Enforcements" : isAIM ? "Risk Prioritization" : isWAS ? "Automated Reporting" : "Instant Action Workflows"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVM
                      ? "Enforce strict resolution countdowns based on vulnerability severity, triggering escalation alerts before SLAs breach."
                      : isAIM
                        ? "Classify exposures by severity to help security teams prioritize remediation on critical issues first."
                        : isWAS
                          ? "Generate detailed vulnerability reports, complete with reproducible proof-of-concept steps and direct remediation code."
                          : "Trigger immediate remediation. Automatically route policy violations directly to Jira, trigger webhook events, or alert security teams via Slack."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Static YAML Editor Widget (Span 7) */}
          <div className="lg:col-span-7 px-sm sm:px-xl lg:px-64px py-lg lg:py-88px bg-[#FAFAFA] flex items-center justify-center">
            <FadeInBlock className="w-full">
              {isVM ? (
                <VMOwnershipTickets />
              ) : isAIM ? (
                <AIMRiskInsights />
              ) : isWAS ? (
                <WASAiReportWriter />
              ) : isVS ? (
                <VSAutoUpdatingCatalogMap />
              ) : (
                <YamlEditorMockup moduleSlug={moduleSlug} />
              )}
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
