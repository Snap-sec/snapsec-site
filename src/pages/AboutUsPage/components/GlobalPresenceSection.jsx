import React, { useState } from 'react';

const GlobalPresenceSection = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  const locations = [
    { name: "United States", city: "San Francisco & New York", x: 220, y: 170, latency: "< 12ms", status: "Active" },
    { name: "Canada", city: "Toronto", x: 260, y: 150, latency: "< 18ms", status: "Active" },
    { name: "United Kingdom", city: "London", x: 450, y: 110, latency: "< 8ms", status: "Active" },
    { name: "Germany", city: "Frankfurt", x: 500, y: 135, latency: "< 10ms", status: "Active" },
    { name: "Saudi Arabia", city: "Riyadh", x: 580, y: 210, latency: "< 24ms", status: "Active" },
    { name: "United Arab Emirates", city: "Dubai", x: 600, y: 205, latency: "< 20ms", status: "Active" },
    { name: "India", city: "Bangalore & Delhi", x: 680, y: 235, latency: "< 15ms", status: "Active" },
    { name: "Singapore", city: "Singapore", x: 740, y: 280, latency: "< 14ms", status: "Active" },
    { name: "Japan", city: "Tokyo", x: 830, y: 170, latency: "< 22ms", status: "Active" },
    { name: "Australia", city: "Sydney", x: 870, y: 380, latency: "< 28ms", status: "Active" }
  ];

  return (
    <section className="section-global-presence bg-white border-t border-gray-200" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching Discovery solutions and ContactUs sections */}
        <div className="section-border grid grid-cols-1 lg:grid-cols-12 border-b border-gray-600 border-x-[0.5px]">
          
          {/* Left Column: Stats & Text (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 gap-xl">
            <div className="flex flex-col items-start gap-sm w-full">
              {/* Badge */}
              <span className="inline-flex items-center rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold tracking-[0.16em] uppercase bg-[#F5F5F5] text-black border border-gray-300">
                Global Network
              </span>

              {/* Heading */}
              <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight mt-xs">
                Securing Assets Across 10+ Countries
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] mt-sm">
                Our globally distributed vulnerability scanning node network operates 24/7. This guarantees low-latency external discovery and simulates real-world threat actors from local networks in major regions.
              </p>
            </div>

            {/* Region List */}
            <div className="grid grid-cols-2 gap-sm pt-md border-t border-gray-200 w-full">
              {locations.map((loc, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-[6px] cursor-pointer group"
                  onMouseEnter={() => setActiveLocation(loc)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  <span className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${activeLocation?.name === loc.name ? 'bg-primary scale-125' : 'bg-gray-400 group-hover:bg-black'}`} />
                  <span className="text-[12px] font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {loc.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: World Map Visual (Span 8) */}
          <div className="lg:col-span-8 px-sm sm:px-xl lg:px-64px py-lg lg:py-88px bg-[#FAFAFA] flex flex-col justify-center relative overflow-hidden min-h-[360px] lg:min-h-[480px]">
            
            {/* World Map SVG Container */}
            <div className="relative w-full aspect-[2/1] select-none">
              
              {/* Map Outline & Dot-grid Pattern */}
              <svg viewBox="0 0 1000 500" className="w-full h-full text-gray-200" fill="currentColor">
                {/* Stylized continent paths */}
                {/* Greenland */}
                <path d="M 320,40 L 360,50 L 350,80 L 310,70 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />
                
                {/* North America */}
                <path d="M 120,80 L 260,70 L 290,100 L 270,120 L 280,150 L 210,220 L 190,190 L 170,190 L 160,150 L 120,130 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />
                
                {/* South America */}
                <path d="M 210,220 L 250,220 L 280,260 L 300,320 L 280,420 L 240,450 L 230,420 L 220,320 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />
                
                {/* Eurasia (Europe + Asia) */}
                <path d="M 450,110 L 520,70 L 680,60 L 800,60 L 860,80 L 880,120 L 840,160 L 800,180 L 760,240 L 720,260 L 660,250 L 580,240 L 520,230 L 480,200 L 440,160 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />
                
                {/* UK / Ireland */}
                <path d="M 440,100 L 460,90 L 450,120 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />
                
                {/* Japan */}
                <path d="M 830,140 L 850,160 L 840,190 L 820,170 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />

                {/* Africa */}
                <path d="M 440,210 L 480,200 L 520,230 L 580,240 L 600,270 L 580,350 L 560,400 L 530,420 L 520,380 L 480,320 L 440,260 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />
                
                {/* Madagascar */}
                <path d="M 600,340 L 610,350 L 600,380 L 590,370 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />

                {/* Australia */}
                <path d="M 780,340 L 840,330 L 890,360 L 870,410 L 800,410 L 770,380 Z" fill="#EAEAEA" stroke="#D5D5D5" strokeWidth="0.75" />

                {/* Regional boundaries labels */}
                <text x="210" y="160" className="text-[10px] font-bold fill-gray-500 opacity-60 tracking-wider">AMER</text>
                <text x="500" y="145" className="text-[10px] font-bold fill-gray-500 opacity-60 tracking-wider">EMEA</text>
                <text x="640" y="230" className="text-[10px] font-bold fill-gray-500 opacity-60 tracking-wider">APAC</text>
                <text x="830" y="375" className="text-[10px] font-bold fill-gray-500 opacity-60 tracking-wider">ANZ</text>
                
                {/* Abstract network connection lines */}
                <path d="M 220 170 Q 335 140 450 110 T 680 235" fill="none" stroke="#BBBBBB" strokeWidth="0.75" strokeDasharray="3 4" />
                <path d="M 450 110 Q 525 155 600 205 T 870 380" fill="none" stroke="#BBBBBB" strokeWidth="0.75" strokeDasharray="3 4" />
                <path d="M 680 235 Q 755 202 830 170" fill="none" stroke="#BBBBBB" strokeWidth="0.75" strokeDasharray="3 4" />
              </svg>

              {/* Pulsing Indicators */}
              {locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${loc.x / 10}%`,
                    top: `${loc.y / 5}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setActiveLocation(loc)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  {/* Glowing Pulse Rings */}
                  <span className="absolute inline-flex h-4 w-4 rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black border border-white" />
                  
                  {/* Inline micro tooltip on hover */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-xs rounded-[4px] px-sm py-[4px] bg-black text-white text-[10px] whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-10 ${activeLocation?.name === loc.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                    <p className="font-bold">{loc.name}</p>
                    <p className="text-[8px] text-gray-300">{loc.city} ({loc.latency})</p>
                  </div>
                </div>
              ))}

            </div>

            {/* Interactive Status Card at bottom corner */}
            <div className={`absolute bottom-sm right-sm bg-white border border-gray-600 rounded-[8px] p-sm shadow-md transition-all duration-300 max-w-[240px] w-full ${activeLocation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              {activeLocation && (
                <div className="flex flex-col gap-[2px]">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-bold text-black">{activeLocation.name}</span>
                    <span className="text-[8px] font-bold uppercase tracking-wider px-[4px] py-[1px] bg-green-100 text-green-800 rounded">
                      {activeLocation.status}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-500">{activeLocation.city}</p>
                  <div className="flex items-center justify-between mt-xxs pt-xxs border-t border-gray-100">
                    <span className="text-[8px] font-semibold text-gray-400">Scanner Latency:</span>
                    <span className="text-[9px] font-bold text-black">{activeLocation.latency}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
