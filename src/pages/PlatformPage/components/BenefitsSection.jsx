import React from 'react';

const BenefitsSection = () => {
  return (
    <div className="section-platform-benefits">
      <div className="container bg-white">
        <div className="section-platform-benefits__wrapper flex flex-col gap-lg border-x-[0.5px] border-gray-600 px-sm sm:px-xl lg:gap-64px lg:px-80px">
          <h2 className="heading-h1 mx-auto w-full text-center">
            One Platform for Discovery, Detection, Scanning and Remiation.
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
                  Snapsec continuously inventories assets, applications, cloud resources, identities, secrets, AI agents, and external attack surfaces, creating a complete and continuously updated security visibility layer.
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
                  Snapsec aggregates findings from security scanners, cloud platforms, code repositories, and security tools to identify vulnerabilities, misconfigurations, exposed secrets, and security risks.
                </p>
              </span>
            </a>

            <a
              href="#"
              className="section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
            >
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Prioritize"
                  width="48"
                  height="48"
                  className="size-xl lg:size-xxl"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frisk.4ce5f86e.svg&w=96&q=75"
                />
              </span>
              <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                <span className="body-heading-m cursor-pointer">Prioritize</span>
                <p className="body-text-s cursor-pointer">
                  Snapsec analyzes exploitability, business impact, asset criticality, internet exposure, and threat intelligence to identify the risks that matter most and require immediate attention.
                </p>
              </span>
            </a>

            <a
              href="#"
              className="section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
            >
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Remediate"
                  width="48"
                  height="48"
                  className="size-xl lg:size-xxl"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprotection.78dabefd.svg&w=96&q=75"
                />
              </span>
              <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                <span className="body-heading-m cursor-pointer">Remediate</span>
                <p className="body-text-s cursor-pointer">
                  Snapsec provides clear remediation guidance, ownership mapping, automated workflows, and engineering collaboration tools that accelerate vulnerability resolution across teams and environments.
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
                  Snapsec delivers continuous risk oversight, policy alignment, compliance visibility, and executive reporting, enabling organizations to measure progress, enforce accountability, and strengthen security outcomes.
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
                  Discover. Detect. <br />
                  Prioritize. Remediate. Govern.
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
