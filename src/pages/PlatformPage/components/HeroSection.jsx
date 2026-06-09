import React from 'react';

const HeroSection = ({ isServicesPage }) => {
  return (
    <div className="section-platform-hero mt-120px overflow-hidden lg:mt-140px">
      <div className="container bg-white">
        <div className="section-platform-hero__wrapper relative flex flex-col gap-xl overflow-hidden border-x-[0.5px] border-gray-600 px-sm pb-64px sm:px-xl lg:gap-xxl lg:px-80px lg:pb-88px">
          <div className="section-platform-hero__heading mx-auto flex w-full max-w-[790px] flex-col gap-md text-center">
            <h1 className="heading-hero">
              {isServicesPage 
                ? "Cybersecurity Services" 
                : "All Your Application Security Needs Centralized At One Place"}
            </h1>
            <p className="subtitle-m mx-auto w-full [&_br]:hidden lg:[&_br]:inline-block">
              {isServicesPage
                ? "We help businesses identify vulnerabilities, manage exposure, and protect their digital infrastructure from cyber threats."
                : "Eliminate the complexity of scattered security tools with a unified platform that brings visibility, governance, and threat detection together."}
            </p>
          </div>
          <div className="pointer-events-none relative z-1 mx-auto aspect-[632/290] w-full max-w-[632px] lg:pointer-events-auto">
            <div className="h-full w-full">
              <div className="in-view h-full w-full" style={{ opacity: 1, transform: "none" }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <img src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrations-grid.3d54a9be.svg&w=1200&q=75" className="w-full h-full object-contain" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="section-hero__grid pointer-events-none absolute -bottom-lg left-1/2 z-0 mx-auto flex w-[170%] -translate-x-1/2 justify-center md:w-[140%] lg:bottom-0 lg:w-full">
            <span className="block w-full lg:w-[1124px]" style={{ opacity: 1 }}>
              <img
                alt="Grid"
                width="1124"
                height="680"
                className="pointer-events-none w-full max-w-full select-none lg:w-[1124px] lg:max-w-none"
                src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrations-grid.3d54a9be.svg&w=1200&q=75"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
