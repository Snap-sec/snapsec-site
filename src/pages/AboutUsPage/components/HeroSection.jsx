import React from 'react';

const HeroSection = () => {
  return (
    <section className="section-about-hero mt-[100px] lg:mt-[120px] pb-64px lg:pb-88px bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
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
              <img
                src="/assets/about-hero.png"
                alt="Snapsec Identity Illustration"
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
