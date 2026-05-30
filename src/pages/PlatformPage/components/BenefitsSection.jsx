import React from 'react';

const BenefitsSection = () => {
  return (
    <div className="section-platform-benefits">
      <div className="container bg-white">
        <div className="section-platform-benefits__wrapper flex flex-col gap-lg border-x-[0.5px] border-gray-600 px-sm sm:px-xl lg:gap-64px lg:px-80px">
          <h2 className="heading-h1 mx-auto w-full text-center">
            One Platform for Identities, Agents, and Secrets
          </h2>
          <div className="section-platform-benefits__cards grid grid-cols-1 gap-xs md:grid-cols-2 lg:grid-cols-3">
            <a
              href="#"
              className="section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
            >
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Discover"
                  width="48"
                  height="48"
                  className="size-xl lg:size-xxl"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvisibility.c8ae017f.svg&w=96&q=75"
                />
              </span>
              <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                <span className="body-heading-m cursor-pointer">Discover</span>
                <p className="body-text-s cursor-pointer">
                  Inventory every Non-Human Identity, AI agent, and secret across your environment. Each one mapped to its owner, its permissions, and what it connects to.
                </p>
              </span>
            </a>

            <a
              href="#"
              className="section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
            >
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Govern"
                  width="48"
                  height="48"
                  className="size-xl lg:size-xxl"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flifecycle.c97ffe30.svg&w=96&q=75"
                />
              </span>
              <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                <span className="body-heading-m cursor-pointer">Govern</span>
                <p className="body-text-s cursor-pointer">
                  Manage the full lifecycle of identities, agents, and secrets. Ownership, access reviews, expiration, and accountability — in one place.
                </p>
              </span>
            </a>

            <a
              href="#"
              className="section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
            >
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Secure"
                  width="48"
                  height="48"
                  className="size-xl lg:size-xxl"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frisk.4ce5f86e.svg&w=96&q=75"
                />
              </span>
              <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                <span className="body-heading-m cursor-pointer">Secure</span>
                <p className="body-text-s cursor-pointer">
                  Assess posture and reduce risk across identities, agents, and secrets. Prioritized by what each one can access and the damage a compromise would cause.
                </p>
              </span>
            </a>

            <a
              href="#"
              className="section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
            >
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Detect"
                  width="48"
                  height="48"
                  className="size-xl lg:size-xxl"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdetection.a22b626d.svg&w=96&q=75"
                />
              </span>
              <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                <span className="body-heading-m cursor-pointer">Detect</span>
                <p className="body-text-s cursor-pointer">
                  Identify suspicious behavior across identities and agents in real time. Investigate with full context and respond before damage spreads.
                </p>
              </span>
            </a>

            <a
              href="#"
              className="section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
            >
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Protect"
                  width="48"
                  height="48"
                  className="size-xl lg:size-xxl"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprotection.78dabefd.svg&w=96&q=75"
                />
              </span>
              <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                <span className="body-heading-m cursor-pointer">Protect</span>
                <p className="body-text-s cursor-pointer">
                  Apply Zero Trust controls to identities and migrate static credentials to short-lived alternatives. Enforce without disrupting production.
                </p>
              </span>
            </a>

            <div
              className="section-platform-benefits__card relative flex items-center justify-center overflow-hidden rounded-8 border-[0.5px] border-gray-600 bg-white bg-cover bg-[center_bottom_-40px] bg-no-repeat p-md md:bg-[center_bottom_-32px] lg:bg-center"
              style={{
                backgroundImage: "url('https://www.clutch.security/_next/static/media/small-card-gradient.9573d86b.png')"
              }}
            >
              <div className="noise absolute inset-0 z-1"></div>
              <div className="section-platform-benefits__card-info flex flex-col items-center gap-md text-center">
                <p className="body-heading-xl [&_br]:hidden lg:[&_br]:block">
                  Every Identity. <br />
                  Every Agent. Every Secret. Secured.
                </p>
                <div className="z-2 relative">
                  <a href="#" className="group button-primary-s">
                    <span className="block">
                      Book a Demo
                      <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
