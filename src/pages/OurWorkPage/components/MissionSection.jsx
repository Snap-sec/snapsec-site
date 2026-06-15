import React from 'react';
import { Link } from 'react-router-dom';

const MissionSection = () => {
  return (
    <section className="section-mission bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Inner container with matching left/right and bottom borders */}
        <div className="section-border grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xxl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px]">
          
          {/* Left Column: Heading (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Our Impact
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Human-Driven Pentesting. Real Security Impact.
            </h2>
          </div>

          {/* Right Column: Mission Text (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-md">
            <p className="text-[16px] sm:text-[18px] text-gray-900 leading-[1.5] font-normal">
              We go beyond automated vulnerability scanning. Our assessments combine advanced security tooling with expert-led manual testing to identify high-impact vulnerabilities, business logic flaws, and application-specific risks that automated solutions often miss. Every finding is validated, prioritized, and assessed based on its real-world business impact, enabling organizations to focus on the risks that matter most. Learn more about our approach in our <Link to="/service/our-methodology" className="underline hover:text-black font-semibold transition-colors">Methodology</Link>.
            </p>
            <p className="text-[16px] sm:text-[18px] text-gray-900 leading-[1.5] font-normal">
              Our core team comprises vetted offensive security specialists, including top-ranked threat researchers on global bug bounty platforms. We focus on identifying high-impact vulnerabilities that present material risks to your operations, delivering actionable intelligence rather than reports of low-severity noise.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionSection;
