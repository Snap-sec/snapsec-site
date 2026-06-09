import React from 'react';

const HeroSection = () => {
  return (
    <section className="section-about-hero mt-[100px] lg:mt-[120px] bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching Discovery solutions and ContactUs sections */}
        <div className="section-border section-border-top flex flex-col border-b border-gray-600 border-x-[0.5px]">
          
          {/* Main Column: Heading, Mission description, Stats */}
          <div className="flex flex-col items-center justify-center px-sm sm:px-xl lg:px-80px py-lg lg:py-[120px] gap-xl text-center">
            <div className="flex flex-col items-center gap-sm w-full">
              {/* Heading */}
              <h1 className="text-[36px] sm:text-[48px] font-semibold leading-[1.15] text-black tracking-tight mt-xs w-full max-w-[1000px] lg:whitespace-nowrap">
                Proven Expertise in Penetration Testing
              </h1>

              {/* Subheading/Paragraph */}
              <p className="text-[15px] sm:text-[17px] text-gray-900 leading-[1.5] mt-sm max-w-[600px]">
                Explore our track record of securing complex digital environments. From web applications to cloud infrastructure, we deliver actionable intelligence and deep technical remediation guidance to eliminate critical vulnerabilities.
              </p>
            </div>

            {/* Quick highlight facts */}
            <div className="grid grid-cols-3 gap-xl mt-md pt-lg border-t border-gray-200 w-full max-w-[600px]">
              <div className="flex flex-col gap-[4px] items-center">
                <span className="text-[20px] sm:text-[24px] font-bold text-black leading-none">500+</span>
                <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider text-center">Assessments<br />Completed</span>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <span className="text-[20px] sm:text-[24px] font-bold text-black leading-none">150+</span>
                <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider text-center">Critical Bugs<br />Patched</span>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <span className="text-[20px] sm:text-[24px] font-bold text-black leading-none">10+</span>
                <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider text-center">Industries<br />Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
