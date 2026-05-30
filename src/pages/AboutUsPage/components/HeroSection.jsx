import React from 'react';

const HeroSection = () => {
  return (
    <section className="section-about-hero mt-120px lg:mt-140px overflow-hidden pb-64px lg:pb-88px">
      <div className="container bg-white">
        <div className="flex flex-col gap-xl lg:gap-xxl px-sm sm:px-xl lg:px-80px">
          <div className="mx-auto flex w-full max-w-[790px] flex-col gap-md text-center">
            <h1 className="heading-hero">
              Taking the Lead in Identity Security for the AI Era
            </h1>
            <p className="subtitle-m mx-auto w-full text-gray-900">
              We are on a mission to secure every Non-Human Identity, AI agent, and secret across digital environments with innovative, seamless solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
