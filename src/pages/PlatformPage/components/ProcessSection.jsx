import React from 'react';

const ProcessSection = () => {
  return (
    <div className="section-platform-process">
      <div className="container bg-white">
        <div className="section-platform-process__wrapper flex flex-col gap-lg border-x-[0.5px] border-gray-600 px-sm pb-xxl pt-64px sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
          <h3 className="heading-h1">How Snapsec Works</h3>
          <div className="section-platform-process__items relative flex flex-col gap-xl lg:gap-96px">
            <div className="absolute left-[-84px] top-56px hidden h-full bg-white pt-sm lg:block">
              <div
                className="pointer-events-none h-full w-lg"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #c9c9c9 0.5px, white 0.5px)",
                  backgroundSize: "8px 24px",
                  backgroundRepeat: "repeat-y"
                }}
              ></div>
            </div>
            <div className="dot-wrapper absolute left-[-92px] top-72px hidden h-full w-md items-start justify-start lg:flex">
              <div className="dot sticky top-120px h-md w-md rounded-full bg-black" style={{ transform: "none" }}></div>
            </div>

            <div className="section-platform-process__item flex flex-col-reverse gap-sm border-t-[0.5px] border-gray-600 pt-xl lg:flex-row lg:items-center lg:justify-between lg:gap-md lg:border-t-0 lg:pt-0 [&:nth-child(3)]:border-t-0 [&:nth-child(3)]:pt-0">
              <div className="section-platform-process__item-info flex flex-col gap-sm lg:gap-md">
                <p className="body-heading-xl w-full lg:max-w-[366px]">
                  Connect Your Entire Ecosystem
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  AIM automatically connects to your cloud platforms, repositories, infrastructure, identity providers, and security tools to create a complete asset inventory. Gain continuous visibility into every asset, owner, relationship, and dependency across your environment, establishing the foundation for effective exposure and risk management.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Connect Your Entire Ecosystem"
                    width="1404"
                    height="1068"
                    className="w-full"
                    src="/images/process-ecosystem.png"
                  />
                </span>
              </div>
            </div>

            <div className="section-platform-process__item flex flex-col-reverse gap-sm border-t-[0.5px] border-gray-600 pt-xl lg:flex-row lg:items-center lg:justify-between lg:gap-md lg:border-t-0 lg:pt-0 [&:nth-child(3)]:border-t-0 [&:nth-child(3)]:pt-0">
              <div className="section-platform-process__item-info flex flex-col gap-sm lg:gap-md">
                <p className="body-heading-xl w-full lg:max-w-[366px]">
                  Identify Vulnerabilities Before Attackers
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  VS continuously scans internal and external assets to uncover vulnerabilities, misconfigurations, outdated software, exposed services, and security weaknesses. By providing accurate and actionable findings, VS helps teams detect risks early and strengthen security posture before threats can be exploited.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Identify Vulnerabilities Before Attackers"
                    width="1404"
                    height="981"
                    className="w-full"
                    src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprocess-image-2.b7cf8839.png&w=1920&q=75"
                  />
                </span>
              </div>
            </div>

            <div className="section-platform-process__item flex flex-col-reverse gap-sm border-t-[0.5px] border-gray-600 pt-xl lg:flex-row lg:items-center lg:justify-between lg:gap-md lg:border-t-0 lg:pt-0 [&:nth-child(3)]:border-t-0 [&:nth-child(3)]:pt-0">
              <div className="section-platform-process__item-info flex flex-col gap-sm lg:gap-md">
                <p className="body-heading-xl w-full lg:max-w-[366px]">
                  See Your External Exposure
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  ASM continuously discovers and monitors internet-facing assets, domains, subdomains, cloud resources, and shadow IT. By revealing what attackers can see, ASM helps organizations identify unknown exposures, reduce attack surface risk, and maintain visibility across their expanding digital footprint.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="See Your External Exposure"
                    width="1404"
                    height="1122"
                    className="w-full"
                    src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprocess-image-3.ad083c62.png&w=1920&q=75"
                  />
                </span>
              </div>
            </div>

            <div className="section-platform-process__item flex flex-col-reverse gap-sm border-t-[0.5px] border-gray-600 pt-xl lg:flex-row lg:items-center lg:justify-between lg:gap-md lg:border-t-0 lg:pt-0 [&:nth-child(3)]:border-t-0 [&:nth-child(3)]:pt-0">
              <div className="section-platform-process__item-info flex flex-col gap-sm lg:gap-md">
                <p className="body-heading-xl w-full lg:max-w-[366px]">
                  Secure Every Web Application
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  WAS performs continuous security assessments of web applications and APIs to identify vulnerabilities such as injection flaws, authentication weaknesses, misconfigurations, and exposed sensitive data. Deliver secure applications faster with actionable findings, validation workflows, and continuous testing coverage.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Secure Every Web Application"
                    width="1404"
                    height="912"
                    className="w-full"
                    src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprocess-image-4.02d698d4.png&w=1920&q=75"
                  />
                </span>
              </div>
            </div>

            <div className="section-platform-process__item flex flex-col-reverse gap-sm border-t-[0.5px] border-gray-600 pt-xl lg:flex-row lg:items-center lg:justify-between lg:gap-md lg:border-t-0 lg:pt-0 [&:nth-child(3)]:border-t-0 [&:nth-child(3)]:pt-0">
              <div className="section-platform-process__item-info flex flex-col gap-sm lg:gap-md">
                <p className="body-heading-xl w-full lg:max-w-[366px]">
                  Prioritize What Matters Most
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  VM consolidates findings from scanners and security tools, removes duplicates, enriches vulnerabilities with business context, and prioritizes remediation based on risk. Focus security and engineering efforts on the vulnerabilities that present the greatest potential impact to your organization.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Prioritize What Matters Most"
                    width="1404"
                    height="1068"
                    className="w-full"
                    src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprocess-image-1.44c7fcec.png&w=1920&q=75"
                  />
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
