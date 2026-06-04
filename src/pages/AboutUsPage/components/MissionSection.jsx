import React from 'react';

const MissionSection = () => {
  return (
    <section className="section-mission bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Inner container with matching left/right and bottom borders */}
        <div className="section-border grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xxl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px]">
          
          {/* Left Column: Heading (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Our Purpose
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Continuous Attack Surface Visibility
            </h2>
          </div>

          {/* Right Column: Mission Text (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-md">
            <p className="text-[16px] sm:text-[18px] text-gray-900 leading-[1.5] font-normal">
              In the modern digital landscape, organizations are deploying applications, cloud instances, and APIs faster than ever. 
              Traditional, point-in-time security assessments and manual penetration testing simply cannot keep pace with this dynamic growth.
            </p>
            <p className="text-[16px] sm:text-[18px] text-gray-900 leading-[1.5] font-normal">
              Our mission is to provide security teams with continuous asset discovery, automated vulnerability scanning, and real-time risk intelligence. 
              We bridge the gap between engineering speed and security governance, keeping your external attack surface secure by default.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionSection;
