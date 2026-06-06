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
                {isVS ? "Continuous Assessment" : "Multi-Source Discovery"}
              </span>

              {/* Heading / Value */}
              <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight mt-xs">
                {isVS ? "Comprehensive Asset Coverage" : "See every asset exposed to the internet."}
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] mt-sm">
                {isVS 
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
                    {isVS ? "Automated CVE Mapping" : "Continuous Mapping"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVS 
                      ? "Automatically match discovered services against the latest NVD vulnerability database."
                      : "Automatic monitoring of DNS records, CT logs, and cloud catalogs."}
                  </p>
                </div>
              </div>
              <div className="flex gap-sm items-start">
                <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-[2px]">✓</span>
                <div>
                  <h4 className="text-[13px] font-bold text-black">
                    {isVS ? "Package Version Audits" : "Shadow IT Detection"}
                  </h4>
                  <p className="text-[12px] text-gray-900 mt-[2px]">
                    {isVS 
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
              {isVS ? (
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
