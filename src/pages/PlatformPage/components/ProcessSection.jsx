import React from 'react';

const ProcessSection = () => {
  return (
    <div className="section-platform-process">
      <div className="container bg-white">
        <div className="section-platform-process__wrapper flex flex-col gap-lg border-x-[0.5px] border-gray-600 px-sm pb-xxl pt-64px sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
          <h3 className="heading-h1">How Clutch Works</h3>
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
                  Connects to Your Entire Ecosystem
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  Clutch connects to your cloud providers, SaaS applications, code repositories, CI/CD pipelines, vaults, password managers, endpoints, and AI platforms. Every Non-Human Identity, AI agent, and secret is discovered and correlated — mapped to who owns it, where it lives, and what it can access.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Connects to Your Entire Ecosystem"
                    width="1404"
                    height="1068"
                    className="w-full"
                    src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprocess-image-1.44c7fcec.png&w=1920&q=75"
                  />
                </span>
              </div>
            </div>

            <div className="section-platform-process__item flex flex-col-reverse gap-sm border-t-[0.5px] border-gray-600 pt-xl lg:flex-row lg:items-center lg:justify-between lg:gap-md lg:border-t-0 lg:pt-0 [&:nth-child(3)]:border-t-0 [&:nth-child(3)]:pt-0">
              <div className="section-platform-process__item-info flex flex-col gap-sm lg:gap-md">
                <p className="body-heading-xl w-full lg:max-w-[366px]">
                  Full Context for Every Identity, Agent, and Secret
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  Every identity is mapped to its origin, the people connected to it, where it’s stored, what consumes it, and the resources it reaches. Every agent is traced from the person who deployed it through its tools, credentials, and the resources it can access. Every secret is tracked across every location where it exists.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Full Context for Every Identity, Agent, and Secret"
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
                  Efficiently Identifies Risks and Opportunities, and Empowers Remediation
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  Clutch assesses risk across identities, agents, and secrets — prioritized by what each one can access and the damage a compromise would cause. Overprivileged service accounts, agents with production credentials, secrets stored outside your vault. Each risk comes with remediation context, not just a severity label.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Efficiently Identifies Risks and Opportunities, and Empowers Remediation"
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
                  Detects Threats Across Identities and Agents in Real Time
                </p>
                <p className="body-text-s w-full lg:max-w-[340px]">
                  Clutch monitors behavior and access patterns across identities and AI agents. When activity deviates from established baselines — a service account accessing a new region, an agent reaching resources outside its scope — Clutch alerts your team with the full context needed to investigate and respond.
                </p>
              </div>
              <div className="section-platform-process__item-image w-full lg:max-w-[468px]">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Detects Threats Across Identities and Agents in Real Time"
                    width="1404"
                    height="912"
                    className="w-full"
                    src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprocess-image-4.02d698d4.png&w=1920&q=75"
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
