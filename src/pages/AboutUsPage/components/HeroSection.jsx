import React from 'react';

const IdentityIllustration = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#004DFF" />
          <stop offset="100%" stopColor="#002699" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#004DFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#002699" stopOpacity="0" />
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
        <style>{`
          @keyframes rotateCw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes rotateCcw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          @keyframes pulseRadar {
            0% { r: 40px; opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { r: 100px; opacity: 0; }
          }
          @keyframes floatCenter {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          @keyframes dashFlow {
            to {
              stroke-dashoffset: -20;
            }
          }
          .rotate-cw {
            transform-origin: 200px 200px;
            animation: rotateCw 28s linear infinite;
          }
          .rotate-ccw {
            transform-origin: 200px 200px;
            animation: rotateCcw 24s linear infinite;
          }
          .pulse-circle {
            transform-origin: 200px 200px;
            animation: pulseRadar 4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          }
          .float-logo {
            animation: floatCenter 5s ease-in-out infinite;
            transform-origin: 200px 200px;
          }
          .dash-line {
            stroke-dasharray: 6 4;
            animation: dashFlow 1.2s linear infinite;
          }
        `}</style>
      </defs>

      {/* Pulsing radar rings in the background */}
      <circle cx="200" cy="200" r="60" stroke="#004DFF" strokeWidth="1" strokeOpacity="0.25" className="pulse-circle" />
      <circle cx="200" cy="200" r="85" fill="url(#glowGrad)" />

      {/* Decorative concentric grid lines */}
      <circle cx="200" cy="200" r="180" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="200" cy="200" r="130" stroke="#F3F4F6" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="75" stroke="#E5E7EB" strokeWidth="1" />

      {/* Slow spinning background elements */}
      <g className="rotate-cw">
        <circle cx="200" cy="70" r="4" fill="#004DFF" fillOpacity="0.3" />
        <circle cx="200" cy="330" r="4" fill="#004DFF" fillOpacity="0.3" />
        <circle cx="70" cy="200" r="4" fill="#004DFF" fillOpacity="0.3" />
        <circle cx="330" cy="200" r="4" fill="#004DFF" fillOpacity="0.3" />
      </g>
      <g className="rotate-ccw">
        <path d="M 200 45 A 155 155 0 0 1 355 200" stroke="#004DFF" strokeWidth="1" strokeDasharray="5 15" strokeOpacity="0.4" />
        <path d="M 200 355 A 155 155 0 0 1 45 200" stroke="#004DFF" strokeWidth="1" strokeDasharray="5 15" strokeOpacity="0.4" />
      </g>

      {/* Connection paths (dash-lines flowing inward) */}
      <g>
        {/* Node 1 (108, 108) to Center */}
        <line x1="108" y1="108" x2="200" y2="200" stroke="#004DFF" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="108" y1="108" x2="200" y2="200" stroke="#004DFF" strokeWidth="1.2" className="dash-line" />

        {/* Node 2 (292, 108) to Center */}
        <line x1="292" y1="108" x2="200" y2="200" stroke="#004DFF" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="292" y1="108" x2="200" y2="200" stroke="#004DFF" strokeWidth="1.2" className="dash-line" />

        {/* Node 3 (292, 292) to Center */}
        <line x1="292" y1="292" x2="200" y2="200" stroke="#004DFF" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="292" y1="292" x2="200" y2="200" stroke="#004DFF" strokeWidth="1.2" className="dash-line" />

        {/* Node 4 (108, 292) to Center */}
        <line x1="108" y1="292" x2="200" y2="200" stroke="#004DFF" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="108" y1="292" x2="200" y2="200" stroke="#004DFF" strokeWidth="1.2" className="dash-line" />
      </g>

      {/* Floating Center Shield Logo */}
      <g className="float-logo">
        <circle cx="200" cy="200" r="42" fill="white" filter="url(#shadow)" />
        <circle cx="200" cy="200" r="42" stroke="#E5E7EB" strokeWidth="1" />
        
        <image
          href="/assets/snapsec-mark.png"
          x="173"
          y="173"
          width="54"
          height="54"
        />
      </g>

      {/* Orbiting nodes with icons */}
      {/* Node 1 (108, 108) - Cloud (AWS/GCP/Azure) */}
      <g transform="translate(108, 108)">
        <circle r="22" fill="white" stroke="#E5E7EB" strokeWidth="1.5" filter="url(#shadow)" />
        <g transform="translate(-9, -9) scale(0.75)" stroke="#004DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </g>
      </g>

      {/* Node 2 (292, 108) - Code / Git */}
      <g transform="translate(292, 108)">
        <circle r="22" fill="white" stroke="#E5E7EB" strokeWidth="1.5" filter="url(#shadow)" />
        <g transform="translate(-9, -9) scale(0.75)" stroke="#004DFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </g>
      </g>

      {/* Node 3 (292, 292) - Database */}
      <g transform="translate(292, 292)">
        <circle r="22" fill="white" stroke="#E5E7EB" strokeWidth="1.5" filter="url(#shadow)" />
        <g transform="translate(-9, -9) scale(0.75)" stroke="#004DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </g>
      </g>

      {/* Node 4 (108, 292) - Key / Secrets */}
      <g transform="translate(108, 292)">
        <circle r="22" fill="white" stroke="#E5E7EB" strokeWidth="1.5" filter="url(#shadow)" />
        <g transform="translate(-9, -9) scale(0.75)" stroke="#004DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </g>
      </g>
    </svg>
  );
};

const HeroSection = () => {
  return (
    <section className="section-about-hero mt-[100px] lg:mt-[120px] bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching Discovery solutions and ContactUs sections */}
        <div className="section-border section-border-top grid grid-cols-1 lg:grid-cols-2 border-b border-gray-600 border-x-[0.5px]">
          
          {/* Left Column: Heading, Mission description, Stats */}
          <div className="flex flex-col justify-center px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 gap-md">
            <div className="flex flex-col items-start gap-sm w-full">
              {/* Badge */}
              <span className="inline-flex items-center rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold tracking-[0.16em] uppercase bg-[#F5F5F5] text-black border border-gray-300">
                About Snapsec
              </span>

              {/* Heading */}
              <h1 className="text-[36px] sm:text-[48px] font-semibold leading-[1.15] text-black tracking-tight mt-xs max-w-[480px]">
                Taking the Lead in Unified Appsec Management
              </h1>

              {/* Subheading/Paragraph */}
              <p className="text-[15px] sm:text-[17px] text-gray-900 leading-[1.5] mt-sm max-w-[500px]">
                We are on a mission to map, scan, and secure every enterprise asset, web application, and API across digital environments with automated, real-time intelligence.
              </p>
            </div>

            {/* Quick highlight facts */}
            <div className="grid grid-cols-3 gap-sm mt-lg pt-lg border-t border-gray-200">
              <div className="flex flex-col gap-[4px]">
                <span className="text-[20px] sm:text-[24px] font-bold text-black leading-none">100%</span>
                <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider">Automated</span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[20px] sm:text-[24px] font-bold text-black leading-none">24/7</span>
                <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider">Continuous</span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[20px] sm:text-[24px] font-bold text-black leading-none">Unified</span>
                <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider">Risk View</span>
              </div>
            </div>
          </div>

          {/* Right Column: Orbiting spheres illustration */}
          <div className="px-sm sm:px-xl lg:px-80px py-lg lg:py-88px bg-[#FAFAFA] flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              <IdentityIllustration />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
