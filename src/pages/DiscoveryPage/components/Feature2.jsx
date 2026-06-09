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

// Interactive Rule Driven YAML Engine for VM (Feature 2)
function VMRuleDrivenEngine() {
  const [activeIdx, setActiveIdx] = useState(0);

  const automationRules = [
    {
      id: "triage-sandbox",
      title: "triage-sandbox",
      badge: "Filter",
      badgeClass: "bg-gray-50 text-gray-600 border-gray-200",
      description: "Auto-close sandbox DB issues",
      source: "Qualys Ingestion Feed",
      yaml: `# Triage rules for sandbox databases
rule: triage-sandbox
match:
  host: "*-sandbox-*"
  plugin_id: 10928
action:
  state: "auto-closed"
  triage: "non-prod-ignore"
  assignee: null`,
      trigger: "Host matching *-sandbox-* with plugin 10928",
      action: "Auto-close vulnerability and triage as Non-Production"
    },
    {
      id: "escalate-public-rce",
      title: "escalate-public-rce",
      badge: "Escalate",
      badgeClass: "bg-rose-50 text-rose-600 border-rose-200",
      description: "Escalate RCEs on public hosts",
      source: "Nessus Vulnerability Scan",
      yaml: `# Critical escalation for public RCEs
rule: escalate-public-rce
match:
  cvss: ">= 9.0"
  host: "api-public-*"
action:
  severity: "critical"
  sla: "24_hours"
  notify: "#sec-ops-alerts"`,
      trigger: "CVSS >= 9.0 on host matching api-public-*",
      action: "Promote to Critical severity, set 24h SLA, & ping #sec-ops-alerts"
    },
    {
      id: "ignore-test-keys",
      title: "ignore-test-keys",
      badge: "Ignore",
      badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
      description: "Ignore dummy keys in test dirs",
      source: "GitHub Secret Scanning",
      yaml: `# Filter test repository dummy keys
rule: ignore-test-keys
match:
  secret_type: "aws_access_key"
  file_path: "**/test/dummy_*"
action:
  severity: "info"
  classification: "false-positive"
  state: "resolved"`,
      trigger: "AWS access keys detected in files matching **/test/dummy_*",
      action: "Downgrade severity to Info, tag as false-positive, & auto-resolve"
    },
    {
      id: "ssl-expiry-warn",
      title: "ssl-expiry-warn",
      badge: "Assign",
      badgeClass: "bg-amber-50 text-amber-600 border-amber-200",
      description: "Warning for expiring SSL certs",
      source: "Continuous SSL Monitor",
      yaml: `# Handle SSL certificates nearing expiry
rule: ssl-expiry-warn
match:
  days_remaining: "<= 7"
  type: "ssl_certificate"
action:
  severity: "medium"
  assignee: "infrastructure-team"
  ticket_priority: "high"`,
      trigger: "SSL certificate days remaining <= 7 days",
      action: "Assign warning ticket to infrastructure-team with High priority"
    },
    {
      id: "database-sqli-sla",
      title: "database-sqli-sla",
      badge: "SLA Guard",
      badgeClass: "bg-blue-50 text-blue-600 border-blue-200",
      description: "Strict 4h SLA on DB SQLi",
      source: "Web App Vulnerability Scan",
      yaml: `# Enforce strict SLA for DB SQL injections
rule: database-sqli-sla
match:
  vulnerability_type: "SQL Injection"
  target_host: "*db-primary*"
action:
  sla: "4_hours"
  escalate_to: "security-lead"`,
      trigger: "SQL Injection vulnerability found on *db-primary*",
      action: "Set strict 4h SLA & escalate immediately to security-lead"
    },
    {
      id: "slack-ops-notify",
      title: "slack-ops-notify",
      badge: "Notify",
      badgeClass: "bg-purple-50 text-purple-600 border-purple-200",
      description: "Notify slack on critical CVEs",
      source: "Container Registry Scan",
      yaml: `# Route critical container CVEs to Slack
rule: slack-ops-notify
match:
  severity: "critical"
  cve_id: "CVE-2024-*"
action:
  channel: "#sec-alerts"
  mention: "@oncall"`,
      trigger: "Critical CVE-2024-* found in container registry scan",
      action: "Send alert to #sec-alerts Slack channel and ping @oncall"
    }
  ];

  const activeRule = automationRules[activeIdx];

  const highlightYaml = (yamlText) => {
    return yamlText.split('\n').map((line, i) => {
      if (line.trim().startsWith('#')) {
        return <div key={i} className="text-[#6A9955]">{line}</div>;
      }
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx);
        const val = line.slice(colonIdx);
        return (
          <div key={i}>
            <span className="text-[#9CDCFE]">{key}</span>
            <span className="text-gray-300">{val}</span>
          </div>
        );
      }
      return <div key={i} className="text-gray-300">{line}</div>;
    });
  };

  return (
    <div 
      className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px] text-left font-sans select-none" 
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Console Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-[10px] flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-red-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-yellow-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-green-400" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            Risk Normalization Engine
          </span>
        </div>
        <div className="flex items-center gap-xs text-gray-900 text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse inline-block" />
          <span className="text-[#10B981] uppercase font-bold">
            Rules Active
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 flex bg-white overflow-hidden">
        
        {/* Left Column: Vertical Tabs styled as Vulnerability/Rule Cards */}
        <div className="w-[45%] bg-white border-r border-gray-200 flex flex-col pt-3 pb-3 px-2.5 gap-1.5 overflow-hidden">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-0.5 flex items-center justify-between">
             <span>Automation Rules</span>
             <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </div>
          {automationRules.map((rule, idx) => {
            const isActive = idx === activeIdx;

            return (
              <div
                key={rule.id}
                onClick={() => setActiveIdx(idx)}
                className={`py-1.5 px-2.5 rounded-[6px] border text-left flex items-start transition-all duration-200 relative select-none cursor-pointer ${
                  isActive 
                    ? "bg-white border-blue-500 shadow-[0_2px_10px_rgba(59,130,246,0.06)] scale-[1.01]" 
                    : "bg-white border-gray-200/60 hover:border-gray-300 hover:bg-gray-50/30"
                }`}
              >

                {/* Title & Metadata */}
                <div className="flex-1 min-w-0 pr-[54px] pl-0.5">
                  <div className={`text-[10px] font-bold truncate leading-tight ${isActive ? "text-blue-700 font-extrabold" : "text-gray-900"}`}>
                    {rule.title}.yaml
                  </div>
                  <div className="text-[8.5px] text-gray-500 truncate leading-relaxed mt-[1px] font-medium">
                    {rule.description}
                  </div>
                </div>

                {/* Action Badge (Absolute Right) */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <span className={`text-[6.5px] font-extrabold px-1.5 py-0.5 rounded-[3px] border uppercase tracking-wider ${rule.badgeClass}`}>
                    {rule.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Code Editor + Info Card */}
        <div className="w-[55%] bg-white p-4 flex flex-col justify-between overflow-hidden relative">
          
          {/* Subtle Grid Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.3]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ruleGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ruleGrid)" />
          </svg>

          <div className="relative z-10 flex flex-col h-full">
            {/* Active Title */}
            <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold uppercase tracking-wider select-none mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Execution Logic
              </span>
              <span className="font-mono text-gray-600 bg-gray-50 border border-gray-200 shadow-sm px-[6px] py-[2px] rounded text-[8px]">YAML</span>
            </div>

            {/* Code Editor Box */}
            <div className="flex-1 bg-[#18181B] text-gray-200 rounded-[8px] shadow-md border border-gray-800 font-mono p-4 overflow-hidden flex flex-col relative">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800/60">
                 <span className="text-[9px] text-gray-400 font-medium">{activeRule.title}.yaml</span>
                 <span className="text-[8px] text-gray-600">UTF-8</span>
              </div>
              <div className="text-[10px] leading-[1.6] font-mono whitespace-pre select-all select-none overflow-y-auto hide-scrollbar flex-1">
                {highlightYaml(activeRule.yaml)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


// Multi-Scanner Dashboard for VS
function VSMultiScannerMap() {
  const [scanIndex, setScanIndex] = useState(0);
  const [pulseOffset, setPulseOffset] = useState(0);
  const [hoveredAsset, setHoveredAsset] = useState(null);

  useEffect(() => {
    // Cycle target asset every 1.5s
    const interval = setInterval(() => {
      setScanIndex(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate flow dots offset
    const interval = setInterval(() => {
      setPulseOffset(prev => (prev - 1) % 24);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const zone1 = {
    name: "US-EAST VPC (AWS)",
    cx: 120, cy: 80,
    assets: [
      { id: "z1-a1", x: 70, y: 50, name: "aws-microservice-1", info: "IP: 10.100.4.12 • Active Scan" },
      { id: "z1-a2", x: 170, y: 50, name: "aws-rds-primary", info: "IP: 10.100.12.80 • Active Scan" },
      { id: "z1-a3", x: 70, y: 110, name: "aws-s3-bucket", info: "S3 ARN • Active Scan" },
      { id: "z1-a4", x: 170, y: 110, name: "aws-load-balancer", info: "ELB Port 443 • Active Scan" }
    ]
  };

  const zone2 = {
    name: "EU-WEST CLOUD (GCP)",
    cx: 480, cy: 80,
    assets: [
      { id: "z2-a1", x: 430, y: 50, name: "gcp-storage-bucket", info: "Bucket URL • Active Scan" },
      { id: "z2-a2", x: 530, y: 50, name: "gcp-compute-inst", info: "IP: 35.190.15.55 • Active Scan" },
      { id: "z2-a3", x: 430, y: 110, name: "gcp-cloud-function", info: "API Endpoint • Active Scan" },
      { id: "z2-a4", x: 530, y: 110, name: "gcp-gke-node-1", info: "IP: 10.120.0.12 • Active Scan" }
    ]
  };

  const zone3 = {
    name: "ON-PREM CORP HQ",
    cx: 300, cy: 230,
    assets: [
      { id: "z3-a1", x: 230, y: 200, name: "corp-active-directory", info: "LDAP Auth Server • Active Scan" },
      { id: "z3-a2", x: 370, y: 200, name: "corp-nas-backup", info: "Storage Volume • Active Scan" },
      { id: "z3-a3", x: 240, y: 260, name: "corp-exchange-mail", info: "Mail Exchange • Active Scan" },
      { id: "z3-a4", x: 360, y: 260, name: "corp-internal-gitlab", info: "Git Host Server • Active Scan" }
    ]
  };

  const zones = [zone1, zone2, zone3];

  return (
    <div className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Console Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-red-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-yellow-400" />
          <span className="w-[8px] h-[8px] rounded-full bg-green-400" />
          <span className="text-gray-900 font-semibold text-[10px] ml-xs tracking-wider uppercase">
            Multi-Zone Scanner Orchestration
          </span>
        </div>
        <div className="flex items-center gap-xs text-gray-900 text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
          <span className="text-green-600 uppercase">
            3 Scanners Reporting
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 relative overflow-hidden bg-white cursor-crosshair flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 600 300">
          {/* Grid background */}
          <pattern id="multiScannerGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="300" fill="url(#multiScannerGrid)" />

          {/* Central Dashboard Hub connection lines (Flowing logs) */}
          {zones.map((zone, idx) => (
            <g key={`flow-${idx}`}>
              {/* Backing connection line */}
              <line
                x1="300" y1="140"
                x2={zone.cx} y2={zone.cy}
                stroke="#E5E7EB"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Animated reporting dots path */}
              <line
                x1="300" y1="140"
                x2={zone.cx} y2={zone.cy}
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                strokeDashoffset={pulseOffset}
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Central Dashboard Node */}
          <g transform="translate(285, 125)">
            <rect width="30" height="30" rx="4" fill="#059669" stroke="#047857" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 8px rgba(5, 150, 105, 0.2))' }} />
            <path d="M 7 10 h 16 M 7 15 h 16 M 7 20 h 16" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="23" cy="10" r="1.5" fill="#6EE7B7" />
            <circle cx="23" cy="15" r="1.5" fill="#6EE7B7" />
            <circle cx="23" cy="20" r="1.5" fill="#6EE7B7" />
          </g>
          <text x="300" y="115" textAnchor="middle" className="font-mono text-[9px] font-bold fill-gray-900 select-none">
            CENTRAL DASHBOARD
          </text>

          {/* Render each Multi-tenant Zone */}
          {zones.map((zone, zIdx) => {
            const activeAsset = zone.assets[scanIndex];
            return (
              <g key={`zone-${zIdx}`}>
                {/* Zone Boundary circle */}
                <circle
                  cx={zone.cx}
                  cy={zone.cy}
                  r="75"
                  fill="rgba(16, 185, 129, 0.01)"
                  stroke="#D1D5DB"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                
                {/* Zone Label */}
                <text x={zone.cx} y={zone.cy - 60} textAnchor="middle" className="font-mono text-[8px] font-bold fill-gray-500 select-none">
                  {zone.name}
                </text>

                {/* Laser scan beam to active asset */}
                {activeAsset && (
                  <line
                    x1={zone.cx}
                    y1={zone.cy}
                    x2={activeAsset.x}
                    y2={activeAsset.y}
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                    strokeDasharray="3 3"
                    className="animate-pulse"
                  />
                )}

                {/* Local Scanner Node (Green Dot) */}
                <g className="cursor-pointer">
                  <circle
                    cx={zone.cx}
                    cy={zone.cy}
                    r="10"
                    fill="#10B981"
                    fillOpacity="0.2"
                    className="animate-ping"
                  />
                  <circle
                    cx={zone.cx}
                    cy={zone.cy}
                    r="5"
                    fill="#10B981"
                    stroke="#047857"
                    strokeWidth="1"
                  />
                </g>

                {/* Assets (Red Dots) */}
                {zone.assets.map((asset, aIdx) => {
                  const isActive = aIdx === scanIndex;
                  return (
                    <g key={asset.id} className="cursor-pointer"
                       onMouseEnter={() => setHoveredAsset(asset)}
                       onMouseLeave={() => setHoveredAsset(null)}>
                      {/* Active target ring */}
                      {isActive && (
                        <circle
                          cx={asset.x}
                          cy={asset.y}
                          r="8"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="1"
                          className="animate-pulse"
                        />
                      )}
                      {/* Asset Dot */}
                      <circle
                        cx={asset.x}
                        cy={asset.y}
                        r={isActive ? 4.5 : 3}
                        fill="#EF4444"
                        opacity={isActive ? 1 : 0.6}
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        <div className={`absolute bottom-xs left-xs right-xs bg-white border border-gray-600 rounded-[6px] p-xs shadow-md transition-all duration-200 flex items-center justify-between text-[11px] ${hoveredAsset ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          {hoveredAsset && (
            <>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-black truncate">{hoveredAsset.name}</span>
                <span className="text-[10px] text-gray-500 mt-[1px]">{hoveredAsset.info}</span>
              </div>
              <span className="text-[9px] uppercase font-bold tracking-wider px-[6px] py-[2.5px] rounded-[4px] bg-red-100 text-red-700 border border-red-200 shrink-0 ml-sm">
                Scanning
              </span>
            </>
          )}
        </div>

        {/* Scan Info Display overlay */}
        {!hoveredAsset && (
          <div className="absolute bottom-xs left-xs bg-white border border-gray-200 rounded-[4px] px-[8px] py-[4px] text-[10px] text-gray-500 shadow-sm pointer-events-none">
            3 Scanners actively sweep-scanning local assets and streaming telemetry.
          </div>
        )}
      </div>

      {/* Legend Row */}
      <div className="bg-[#FAFAFA] border-t border-gray-200 px-sm py-[8px] flex items-center justify-between text-[10px] font-semibold text-gray-900">
        <div className="flex gap-md">
          <div className="flex items-center gap-[4px]">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Deployed Scanner (Green)</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Asset Host (Red)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Compliance Dashboard with 24-Dot Policy Grid
function StaticComplianceDashboard({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';
  const isASM = moduleSlug === 'asm' || !isVS;

  const [selectedRuleId, setSelectedRuleId] = useState(0);

  const asmAssets = [
    {
      id: 0,
      name: "snapsec-dev-backups",
      type: "AWS S3 Bucket",
      status: "Non-Compliant",
      violationsCount: 2,
      checkedTime: "Updated 5m ago"
    },
    {
      id: 1,
      name: "test-sandbox.internal.snapsec.co",
      type: "DNS / EC2 Host",
      status: "Non-Compliant",
      violationsCount: 3,
      checkedTime: "Updated 12m ago"
    },
    {
      id: 2,
      name: "api.prod.snapsec.co",
      type: "API Gateway",
      status: "Compliant",
      violationsCount: 0,
      checkedTime: "Updated 30m ago"
    },
    {
      id: 3,
      name: "www.snapsec.co",
      type: "Corporate Portal",
      status: "Compliant",
      violationsCount: 0,
      checkedTime: "Updated 45m ago"
    },
    {
      id: 4,
      name: "bastion.prod.snapsec.co",
      type: "SSH Bastion Node",
      status: "Compliant",
      violationsCount: 0,
      checkedTime: "Updated 1h ago"
    },
    {
      id: 5,
      name: "dev-portal.snapsec.co",
      type: "Developer Sandbox",
      status: "Compliant",
      violationsCount: 0,
      checkedTime: "Updated 2h ago"
    }
  ];

  // 24 Detailed policy rules mapping to the dots grid (VS vs ASM)
  const rules = isVS ? [
    // Violations (Red Dots)
    {
      id: 0,
      name: "Remote Code Execution (Log4j)",
      frameworks: "CVE-2021-44228",
      status: "Vulnerable",
      severity: "Critical",
      asset: "billing-app.staging (Log4j v2.14.1)",
      remediation: "Upgrade Log4j package to v2.17.1 or higher.",
      checkedTime: "Scanned 5m ago"
    },
    {
      id: 1,
      name: "Buffer Overflow in Nginx",
      frameworks: "CVE-2021-23017",
      status: "Vulnerable",
      severity: "Critical",
      asset: "nginx-reverse-proxy.prod (Nginx 1.19.0)",
      remediation: "Upgrade Nginx package to v1.20.1 or higher.",
      checkedTime: "Scanned 12m ago"
    },
    // Passed (Green Dots)
    {
      id: 2,
      name: "No Default SSH Host Keys",
      frameworks: "CIS Controls v8",
      status: "Passed",
      severity: "Medium",
      asset: "prod-db-host (SSH Server)",
      remediation: "No action required.",
      checkedTime: "Scanned 30m ago"
    },
    {
      id: 3,
      name: "No Weak SSL Ciphers Enforced",
      frameworks: "PCI-DSS v4.0",
      status: "Passed",
      severity: "High",
      asset: "api.prod.snapsec.co (HAProxy)",
      remediation: "No action required.",
      checkedTime: "Scanned 45m ago"
    },
    {
      id: 4,
      name: "Docker base image up-to-date",
      frameworks: "Container Best Practice",
      status: "Passed",
      severity: "Medium",
      asset: "gateway-service:latest",
      remediation: "No action required.",
      checkedTime: "Scanned 1h ago"
    },
    {
      id: 5,
      name: "Outdated Redis Version check",
      frameworks: "Security Best Practice",
      status: "Passed",
      severity: "High",
      asset: "cache.prod.snapsec.co (Redis 7.2)",
      remediation: "No action required.",
      checkedTime: "Scanned 1h ago"
    },
    {
      id: 6,
      name: "NodeJS Security Audit",
      frameworks: "NPM Package Audit",
      status: "Passed",
      severity: "High",
      asset: "payment-gateway package-lock.json",
      remediation: "No action required.",
      checkedTime: "Scanned 2h ago"
    },
    {
      id: 7,
      name: "Outdated OpenSSL check",
      frameworks: "CVE-2022-3786 Safe",
      status: "Passed",
      severity: "Low",
      asset: "dev-portal.snapsec.co (OpenSSL 3.0.7)",
      remediation: "No action required.",
      checkedTime: "Scanned 2h ago"
    },
    {
      id: 8,
      name: "No Plaintext Secrets in Env",
      frameworks: "SOC2 Compliance",
      status: "Passed",
      severity: "Critical",
      asset: "Kubernetes configmaps (Production)",
      remediation: "No action required.",
      checkedTime: "Scanned 3h ago"
    },
    {
      id: 9,
      name: "Kubernetes kubelet Config",
      frameworks: "K8s Hardening Guide",
      status: "Passed",
      severity: "High",
      asset: "EKS Cluster Nodes",
      remediation: "No action required.",
      checkedTime: "Scanned 3h ago"
    },
    {
      id: 10,
      name: "PostgreSQL Password Hashing",
      frameworks: "CIS Benchmark",
      status: "Passed",
      severity: "Medium",
      asset: "customer-db-primary (Postgres 15)",
      remediation: "No action required.",
      checkedTime: "Scanned 4h ago"
    },
    {
      id: 11,
      name: "Apache HTTP Server patch level",
      frameworks: "CVE-2021-41773 Safe",
      status: "Passed",
      severity: "Medium",
      asset: "blog.snapsec.co (Apache 2.4.51)",
      remediation: "No action required.",
      checkedTime: "Scanned 4h ago"
    },
    {
      id: 12,
      name: "Tomcat AJP connector disabled",
      frameworks: "Ghostcat Vulnerability Check",
      status: "Passed",
      severity: "Critical",
      asset: "internal-reporting-srv (Tomcat 9.0)",
      remediation: "No action required.",
      checkedTime: "Scanned 5h ago"
    },
    {
      id: 13,
      name: "No exposed Django debugging mode",
      frameworks: "OWASP Top 10",
      status: "Passed",
      severity: "Low",
      asset: "admin-portal.snapsec.co (Django)",
      remediation: "No action required.",
      checkedTime: "Scanned 5h ago"
    },
    {
      id: 14,
      name: "PHP-FPM Safe Socket configs",
      frameworks: "Nginx-PHP Security Guideline",
      status: "Passed",
      severity: "Medium",
      asset: "wordpress-site.staging",
      remediation: "No action required.",
      checkedTime: "Scanned 6h ago"
    },
    {
      id: 15,
      name: "No open SMB shares (Port 445)",
      frameworks: "WannaCry Ransomware Safe",
      status: "Passed",
      severity: "Critical",
      asset: "All corporate subnets",
      remediation: "No action required.",
      checkedTime: "Scanned 6h ago"
    },
    {
      id: 16,
      name: "Python Cryptography lib audit",
      frameworks: "PyPI Package Audit",
      status: "Passed",
      severity: "High",
      asset: "data-pipeline requirements.txt",
      remediation: "No action required.",
      checkedTime: "Scanned 7h ago"
    },
    {
      id: 17,
      name: "No RDP Port exposure (3389)",
      frameworks: "Brute Force Protection",
      status: "Passed",
      severity: "Low",
      asset: "AWS EC2 instances",
      remediation: "No action required.",
      checkedTime: "Scanned 8h ago"
    },
    {
      id: 18,
      name: "Valid TLS v1.3 configuration",
      frameworks: "Transport Cryptography",
      status: "Passed",
      severity: "Critical",
      asset: "snapsec.co Load Balancer",
      remediation: "No action required.",
      checkedTime: "Scanned 8h ago"
    },
    {
      id: 19,
      name: "No Elasticsearch public access",
      frameworks: "Data Leak Protection",
      status: "Passed",
      severity: "Low",
      asset: "logging-es (Port 9200)",
      remediation: "No action required.",
      checkedTime: "Scanned 9h ago"
    },
    {
      id: 20,
      name: "Kubernetes Dashboard disabled",
      frameworks: "K8s Security Standard",
      status: "Passed",
      severity: "High",
      asset: "prod-eks-cluster-02",
      remediation: "No action required.",
      checkedTime: "Scanned 9h ago"
    },
    {
      id: 21,
      name: "Spring Boot Actuator endpoints",
      frameworks: "Information Disclosure Safe",
      status: "Passed",
      severity: "Medium",
      asset: "search-api.staging",
      remediation: "No action required.",
      checkedTime: "Scanned 10h ago"
    },
    {
      id: 22,
      name: "No anonymous FTP server access",
      frameworks: "CIS Benchmark",
      status: "Passed",
      severity: "Critical",
      asset: "ftp.snapsec.co (Port 21)",
      remediation: "No action required.",
      checkedTime: "Scanned 10h ago"
    },
    {
      id: 23,
      name: "Docker socket mapping restricted",
      frameworks: "Container Privilege Escalation",
      status: "Passed",
      severity: "High",
      asset: "All container runners",
      remediation: "No action required.",
      checkedTime: "Scanned 12h ago"
    }
  ] : [
    // Violations (Red Dots)
    {
      id: 0,
      name: "No Public Storage Buckets",
      frameworks: "PCI-DSS • SOC2",
      status: "Violation",
      severity: "High",
      asset: "snapsec-dev-backups (AWS S3)",
      remediation: "Configure bucket ACL to block public access.",
      checkedTime: "Updated 5m ago"
    },
    {
      id: 1,
      name: "No Exposed Database Ports",
      frameworks: "CIS Controls • ISO 27001",
      status: "Violation",
      severity: "Critical",
      asset: "test-sandbox.internal.snapsec.co (Port 3306)",
      remediation: "Close Port 3306 or restrict to VPN IP ranges.",
      checkedTime: "Updated 12m ago"
    },
    // Passed (Green Dots)
    {
      id: 2,
      name: "Valid SSL/TLS Certificates",
      frameworks: "Security Best Practice",
      status: "Passed",
      severity: "Medium",
      asset: "api.prod.snapsec.co (Expires in 88 days)",
      remediation: "No action required.",
      checkedTime: "Updated 30m ago"
    },
    {
      id: 3,
      name: "TLS 1.2+ Protocol Enforcement",
      frameworks: "PCI-DSS • HIPAA",
      status: "Passed",
      severity: "High",
      asset: "www.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 45m ago"
    },
    {
      id: 4,
      name: "DNS Zone Transfer Blocked",
      frameworks: "CIS Controls",
      status: "Passed",
      severity: "Medium",
      asset: "snapsec.co DNS Nameservers",
      remediation: "No action required.",
      checkedTime: "Updated 1h ago"
    },
    {
      id: 5,
      name: "No Public Git Repositories",
      frameworks: "SOC2 • IP Protection",
      status: "Passed",
      severity: "High",
      asset: "github.com/snapsec-org",
      remediation: "No action required.",
      checkedTime: "Updated 1h ago"
    },
    {
      id: 6,
      name: "WAF Proxy Activation",
      frameworks: "OWASP Top 10 Guard",
      status: "Passed",
      severity: "High",
      asset: "api.prod.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 2h ago"
    },
    {
      id: 7,
      name: "Secure HTTP Headers",
      frameworks: "OWASP Best Practice",
      status: "Passed",
      severity: "Low",
      asset: "dev-portal.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 2h ago"
    },
    {
      id: 8,
      name: "No SMTP Open Relays",
      frameworks: "Email Security",
      status: "Passed",
      severity: "Critical",
      asset: "mail.snapsec.co (Port 25)",
      remediation: "No action required.",
      checkedTime: "Updated 3h ago"
    },
    {
      id: 9,
      name: "Subdomain Hijacking Safe",
      frameworks: "DNS Security",
      status: "Passed",
      severity: "High",
      asset: "All resolved DNS CNAME records",
      remediation: "No action required.",
      checkedTime: "Updated 3h ago"
    },
    {
      id: 10,
      name: "Secure SSH Host Key exchange",
      frameworks: "CIS Controls",
      status: "Passed",
      severity: "Medium",
      asset: "bastion.prod.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 4h ago"
    },
    {
      id: 11,
      name: "Content Security Policy (CSP)",
      frameworks: "OWASP Top 10",
      status: "Passed",
      severity: "Medium",
      asset: "www.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 4h ago"
    },
    {
      id: 12,
      name: "No Exposed Kubernetes Dashboard",
      frameworks: "Cloud Security Best Practice",
      status: "Passed",
      severity: "Critical",
      asset: "EKS Cluster Endpoint",
      remediation: "No action required.",
      checkedTime: "Updated 5h ago"
    },
    {
      id: 13,
      name: "X-Frame-Options Header Active",
      frameworks: "Clickjacking Protection",
      status: "Passed",
      severity: "Low",
      asset: "blog.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 5h ago"
    },
    {
      id: 14,
      name: "HSTS Header Enforced",
      frameworks: "Transport Security",
      status: "Passed",
      severity: "Medium",
      asset: "careers.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 6h ago"
    },
    {
      id: 15,
      name: "No Public Cloud Database Snapshots",
      frameworks: "SOC2 • Data Privacy",
      status: "Passed",
      severity: "Critical",
      asset: "AWS RDS PostgreSQL Snapshots",
      remediation: "No action required.",
      checkedTime: "Updated 6h ago"
    },
    {
      id: 16,
      name: "No Weak SSL Ciphers (3DES/RC4)",
      frameworks: "PCI-DSS Compliance",
      status: "Passed",
      severity: "High",
      asset: "api.prod.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 7h ago"
    },
    {
      id: 17,
      name: "CAA DNS Records Configured",
      frameworks: "PKI Trust Policy",
      status: "Passed",
      severity: "Low",
      asset: "snapsec.co CAA Record",
      remediation: "No action required.",
      checkedTime: "Updated 8h ago"
    },
    {
      id: 18,
      name: "No Exposed Redis instances",
      frameworks: "Database Protection",
      status: "Passed",
      severity: "Critical",
      asset: "cache.prod.snapsec.co (Port 6379)",
      remediation: "No action required.",
      checkedTime: "Updated 8h ago"
    },
    {
      id: 19,
      name: "Referrer-Policy Header Active",
      frameworks: "Privacy Best Practice",
      status: "Passed",
      severity: "Low",
      asset: "www.snapsec.co",
      remediation: "No action required.",
      checkedTime: "Updated 9h ago"
    },
    {
      id: 20,
      name: "Secure Cookie Attributes (Secure/HttpOnly)",
      frameworks: "Session Protection",
      status: "Passed",
      severity: "High",
      asset: "api.prod.snapsec.co Auth Cookies",
      remediation: "No action required.",
      checkedTime: "Updated 9h ago"
    },
    {
      id: 21,
      name: "No Directory Listing Enabled",
      frameworks: "Information Leakage",
      status: "Passed",
      severity: "Medium",
      asset: "staging.snapsec.co nginx config",
      remediation: "No action required.",
      checkedTime: "Updated 10h ago"
    },
    {
      id: 22,
      name: "No RDP Protocol Exposed (3389)",
      frameworks: "CIS Controls",
      status: "Passed",
      severity: "Critical",
      asset: "All public subnet host IPs",
      remediation: "No action required.",
      checkedTime: "Updated 10h ago"
    },
    {
      id: 23,
      name: "SPF/DKIM/DMARC Email Records",
      frameworks: "Domain Anti-Spoofing",
      status: "Passed",
      severity: "High",
      asset: "snapsec.co TXT records",
      remediation: "No action required.",
      checkedTime: "Updated 12h ago"
    }
  ];

  const current = rules[selectedRuleId] || rules[0];

  if (isASM) {
    return (
      <div 
        className="w-full rounded-[8px] border border-gray-600 bg-white overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col h-[400px] text-left font-sans select-none" 
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Title Header Bar - matching Feature 1 */}
        <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-[10px] flex items-center justify-between select-none">
          <div className="flex items-center gap-[6px]">
            <span className="w-[8px] h-[8px] rounded-full bg-red-500 animate-pulse" />
            <span className="text-gray-950 font-bold text-[11px] tracking-wider uppercase">
              Asset Compliance Monitor
            </span>
          </div>
          <div className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-xs py-xxs rounded">
            MONITORING VIOLATIONS
          </div>
        </div>

        {/* Content list - matches height/paddings, overflow-hidden keeps it static */}
        <div className="flex-1 flex flex-col divide-y divide-gray-150 overflow-hidden px-sm py-xs">
          {asmAssets.map((asset) => {
            const isCompliant = asset.status === "Compliant";
            return (
              <div key={asset.id} className="py-sm flex items-center justify-between">
                <div className="flex items-center gap-sm min-w-0">
                  {/* Status Indicator (Green tick / Red cross) */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-[11px] ${
                    isCompliant 
                      ? "bg-emerald-500" 
                      : "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.3)] animate-pulse"
                  }`}>
                    {isCompliant ? "✓" : "✗"}
                  </div>

                  {/* Asset Info */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-bold text-gray-950 truncate">
                      {asset.name}
                    </span>
                    <span className="text-[9px] text-gray-450 font-mono mt-[2px]">
                      {asset.type} • {asset.checkedTime}
                    </span>
                  </div>
                </div>

                {/* Violation Count badge */}
                <div className="shrink-0">
                  {isCompliant ? (
                    <span className="text-[8.5px] font-bold px-[8px] py-[3px] rounded bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                      Compliant
                    </span>
                  ) : (
                    <span className="text-[8.5px] font-bold px-[8px] py-[3px] rounded bg-rose-50 text-rose-700 border border-rose-100 uppercase tracking-wider">
                      {asset.violationsCount} {asset.violationsCount === 1 ? 'Violation' : 'Violations'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Fallback layout if not isASM (for VS compatibility if ever called)
  const stats = {
    col1Label: isVS ? "Security Checks" : "Policy Rules",
    col1Val: isVS ? "24 Active" : "24 Active",
    col2Label: isVS ? "Scanner Health" : "Audit Score",
    col2Val: isVS ? "98%" : "92%",
    col3Label: isVS ? "CVEs / Risks" : "Violations",
    col3Val: isVS ? "2 Open" : "2 Open"
  };

  return (
    <div className="w-full rounded-[6px] border border-gray-600 bg-white overflow-hidden flex flex-col h-[340px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Title Bar - Minimalist */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between text-[11px] font-semibold text-gray-900 select-none">
        <div className="flex items-center gap-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          <span className="tracking-tight text-[10px] font-bold uppercase text-left">
            {isVS ? "Vulnerability Auditing" : "COMPLIANCE ENGINE"}
          </span>
        </div>
        <div className="flex items-center gap-[6px] text-gray-900 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-semibold uppercase tracking-wider text-[9px] text-right">
            {isVS ? "Continuous Vulnerability Sweeps" : "Continuous Auditing"}
          </span>
        </div>
      </div>

      {/* Stats - Minimalist Grid */}
      <div className="grid grid-cols-3 border-b border-gray-200 bg-white text-[10px] font-semibold text-gray-900 select-none shrink-0">
        <div className="p-xs border-r border-gray-200 flex flex-col justify-center text-left">
          <span className="text-[8px] text-gray-400 uppercase tracking-wider text-left">
            {stats.col1Label}
          </span>
          <span className="text-[13px] font-bold text-black mt-[2px] text-left">{stats.col1Val}</span>
        </div>
        <div className="p-xs border-r border-gray-200 flex flex-col justify-center text-left">
          <span className="text-[8px] text-gray-400 uppercase tracking-wider text-left">
            {stats.col2Label}
          </span>
          <span className="text-[13px] font-bold text-black mt-[2px] text-left">{stats.col2Val}</span>
        </div>
        <div className="p-xs flex flex-col justify-center text-left">
          <span className="text-[8px] text-gray-400 uppercase tracking-wider text-left">
            {stats.col3Label}
          </span>
          <span className={`text-[13px] font-bold mt-[2px] text-left ${stats.col3Val.includes("0") ? "text-green-600" : "text-red-655"}`}>
            {stats.col3Val}
          </span>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-sm flex gap-sm bg-white min-h-0">
        
        {/* Left Side: Original 24-Dot Policy Grid */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <span className="text-[9px] font-bold text-gray-900 uppercase tracking-wider block">
              {isVS ? "Vulnerability Map" : "Policy Rule Map"}
            </span>
            <span className="text-[8px] text-gray-400 block mt-[2px]">
              {isVS ? "Hover over nodes to inspect vulnerabilities" : "Hover over nodes to inspect each check's compliance status"}
            </span>
          </div>

          {/* Dots Grid Layout (4 rows x 6 columns) */}
          <div className="grid grid-cols-6 gap-xs my-sm max-w-[200px]">
            {rules.map((rule, idx) => {
              const isSelected = selectedRuleId === idx;
              const isViolation = rule.status === "Violation" || rule.status === "Vulnerable";
              
              return (
                <div
                  key={rule.id}
                  onMouseEnter={() => setSelectedRuleId(idx)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    isSelected ? "ring-2 ring-black ring-offset-2" : "hover:scale-110"
                  } ${
                    isViolation 
                      ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)] animate-pulse" 
                      : "bg-green-500"
                  }`}
                  title={`${rule.name} (${rule.status})`}
                >
                  {/* Subtle inner center dot to denote selection */}
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected rule label helper */}
          <div className="border-t border-gray-100 pt-xs min-h-[36px]">
            <span className="text-[8px] text-gray-400 uppercase block font-semibold text-left">Active Selection</span>
            <span className="text-[10px] font-bold text-black truncate block mt-[2px] text-left">{current.name}</span>
          </div>
        </div>

        {/* Right Side: Original Static Inspector Panel */}
        <div className="w-[160px] sm:w-[200px] bg-[#FAFAFA] border border-gray-200 rounded-[4px] p-xs flex flex-col justify-between shrink-0 h-full select-none">
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                {isVS ? "Vulnerability Info" : "Rule Details"}
              </span>
              <span className={`text-[7px] font-bold uppercase tracking-wider px-[4px] py-[1px] rounded ${
                current.severity === "Critical" ? "bg-red-100 text-red-800" :
                current.severity === "High" ? "bg-orange-100 text-orange-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {current.severity}
              </span>
            </div>

            <h4 className="text-[11px] font-bold text-black leading-tight mt-xxs text-left">{current.name}</h4>
            
            <div className="mt-xs text-left">
              <span className="text-[8px] text-gray-400 font-bold uppercase block">Affected Asset</span>
              <span className="text-[9px] text-gray-900 mt-[1px] font-semibold break-all leading-tight block">{current.asset}</span>
            </div>

            <div className="mt-xs text-left">
              <span className="text-[8px] text-gray-400 font-bold uppercase block">Remediation</span>
              <span className="text-[9px] text-gray-900 mt-[1px] leading-tight block">{current.remediation}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-xxs text-[8px] text-gray-400 flex justify-between">
            <span>{isVS ? current.frameworks : "Audit status"}</span>
            <span>{current.checkedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// Interactive Focused Asset Class Dashboards for AIM (Feature 2)
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

// YAML Rule Editor Mockup for Web Application Scanner (Feature 2)
function WASYamlRulesEditor() {
  const yamlLines = [
    { num: "01", text: "id: ", highlight: true, val: "custom-sqli-payload-check" },
    { num: "02", text: "info:", highlight: true, val: "" },
    { num: "03", text: "  name: ", highlight: true, val: "\"SQL Injection Payload Detection\"" },
    { num: "04", text: "  severity: ", highlight: true, val: "critical" },
    { num: "05", text: "  description: ", highlight: true, val: "\"Detects SQL injection signatures in query parameters.\"" },
    { num: "06", text: "", highlight: false, val: "" },
    { num: "07", text: "conditions:", highlight: true, val: "" },
    { num: "08", text: "  - ", highlight: true, val: "request.method == 'GET'" },
    { num: "09", text: "  - ", highlight: true, val: "request.query.parameter matches \"('|\\\"|%27|%22)(.*)(select|union|insert)\"" },
    { num: "10", text: "  - ", highlight: true, val: "request.headers['user-agent'] contains 'sqlmap'" },
    { num: "11", text: "", highlight: false, val: "" },
    { num: "12", text: "actions:", highlight: true, val: "" },
    { num: "13", text: "  - ", highlight: true, val: "block_request: true" },
    { num: "14", text: "  - ", highlight: true, val: "notify: '#sec-was-alerts'" }
  ];

  return (
    <div className="w-full rounded-[6px] border border-gray-600 bg-white overflow-hidden flex flex-col h-[340px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Editor Title Bar */}
      <div className="bg-[#FAFAFA] border-b border-gray-600 px-sm py-xs flex items-center justify-between text-[11px] font-semibold text-gray-900 select-none">
        <div className="flex items-center gap-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          <span className="font-mono text-[10px] tracking-tight">
            custom-sqli-payload-check.yaml
          </span>
        </div>
        <span className="text-[8px] font-bold uppercase tracking-wider px-[6px] py-[2px] bg-gray-100 text-gray-600 rounded">WAS Rule Schema v1</span>
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

export default function Feature2({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';
  const isWAS = moduleSlug === 'was';
  const isAIM = moduleSlug === 'aim';
  const isVM = moduleSlug === 'vm';

  return (
    <section className="section-visibility-identity bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching page design guidelines */}
        <div className="section-border grid grid-cols-1 lg:grid-cols-12 border-b border-gray-600 border-x-[0.5px]">
          
          {/* Left Column: Heading & Content (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 gap-xl">
            <div className="flex flex-col items-start gap-sm w-full">
              {/* Badge */}
              <span className="inline-flex items-center rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold tracking-[0.16em] uppercase bg-[#F5F5F5] text-black border border-gray-300">
                {isVM ? "Risk Normalization" : isAIM ? "Focused Inquiries" : isWAS ? "Rule Customization" : isVS ? "Vulnerability Inspection" : "Compliance Auditing"}
              </span>

              {/* Heading */}
              <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight mt-xs">
                {isVM ? "Risk Normalization & Automation" : isAIM ? "Context-Specific Views & Isolation" : isWAS ? "Customizable Rule Engine" : isVS ? "Unlimited Scanner" : "Monitor Asset Compliance Violations"}
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] mt-sm">
                {isVM
                  ? "We provide multiple frameworks like True Risk, Normalization Engine, Auto Triage, and False Positive Analysis to automatically classify and normalize risk on vulnerability data."
                  : isAIM
                    ? "Isolate asset analysis by specific classes. Drill down contextually into subdomains, expiring SSL certificates, unauthenticated APIs, or repository states without distracting noise."
                    : isWAS
                      ? "Pre-written rules but we allow customization of those rules and adding new rules to match your needs."
                      : isVS 
                        ? "Deploy more than one scanner reporting to a single dashboard for multi-zoned networks."
                        : "Establish continuous guardrails to detect assets that violate security policies, regulatory frameworks, and configuration standards in real time."}
              </p>
            </div>

            {/* Checklist details */}
            <div className="flex flex-col gap-md pt-lg border-t border-gray-200 w-full">
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">
                    {isVM ? "True Risk Scoring" : isAIM ? "Environment Isolation" : isWAS ? "Pre-built Security Rules" : isVS ? "Continuous CVE Synchronization" : "Continuous Policy Verification"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVM
                      ? "Calculate true severity scores using contextual asset importance, exploit availability, and environment exposure."
                      : isAIM
                        ? "Classify asset networks by target stages (Production, Staging, Development) to isolate external exposures."
                        : "Access hundreds of ready-to-run rules covering OWASP Top 10, database bypasses, and file injection checks."}
                  </p>
                </div>
              </div>
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">
                    {isVM ? "Auto-Triage & False Positive Analysis" : isAIM ? "Type-Specific Insights" : isWAS ? "Tailored Signatures" : isVS ? "Actionable Patch Operations" : "Automatic Remediation Insights"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVM
                      ? "Automatically filter false positives and route verified vulnerabilities to appropriate developer queues."
                      : isAIM
                        ? "Track certificate expiration warning indicators and locate exposed cloud storage buckets contextually."
                        : isWAS
                          ? "Edit existing rules or write custom YAML definitions to target proprietary application flaws."
                          : isVS 
                            ? "Get precise upgrade commands and configuration changes to fix vulnerable package versions immediately."
                            : "Get precise actionable configuration changes for security groups, TLS layers, and IAM permissions."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Compliance Widget (Span 7) */}
          <div className="lg:col-span-7 px-sm sm:px-xl lg:px-64px py-lg lg:py-88px bg-[#FAFAFA] flex items-center justify-center">
            <FadeInBlock className="w-full">
              {isVM ? (
                <VMRuleDrivenEngine />
              ) : isAIM ? (
                <AIMFocusedDashboards />
              ) : isWAS ? (
                <WASYamlRulesEditor />
              ) : isVS ? (
                <VSMultiScannerMap />
              ) : (
                <StaticComplianceDashboard moduleSlug={moduleSlug} />
              )}
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
