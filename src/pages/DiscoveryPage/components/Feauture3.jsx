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

export default function Feauture3({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';

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
                {isVS ? "Asset Catalog" : "Custom Detection"}
              </span>

              {/* Heading */}
              <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight mt-xs">
                {isVS ? "Auto Updating Asset Catalog" : "Codify Your Security Policies with Custom YAML Rules"}
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] mt-sm">
                {isVS 
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
                    {isVS ? "Codified Vulnerability Logic" : "Codified Attack Surface"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVS 
                      ? "Translate complex library audits and version restrictions into executable files. Target specific package names, running ciphers, or server runtime headers."
                      : "Translate complex security policies into executable files. Target specific asset subnets, open ports, cloud resource configurations, or host tags."}
                  </p>
                </div>
              </div>
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">Instant Action Workflows</h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">Trigger immediate remediation. Automatically route policy violations directly to Jira, trigger webhook events, or alert security teams via Slack.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Static YAML Editor Widget (Span 7) */}
          <div className="lg:col-span-7 px-sm sm:px-xl lg:px-64px py-lg lg:py-88px bg-[#FAFAFA] flex items-center justify-center">
            <FadeInBlock className="w-full">
              {isVS ? (
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
