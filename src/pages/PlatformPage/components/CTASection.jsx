import React from 'react';

const CTASection = () => {
  return (
    <div className="section-platform-cta">
      <div className="container bg-white">
        <div className="section-platform-cta__wrapper relative flex flex-col gap-xxl overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm py-xxl text-center sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
          <div className="relative flex w-full flex-col items-center gap-lg lg:gap-lg">
            <div className="relative z-2 flex flex-col gap-sm lg:gap-lg">
              <h3 className="heading-h1 mx-auto w-full max-w-[650px]">
                Identity Security Beyond the Human Perimeter
              </h3>
              <p className="subtitle-m mx-auto w-full max-w-[360px]">
                See every identity, agent, and secret. Know what each one can do.
              </p>
            </div>
            <div className="relative z-2">
              <a
                className="group button-primary-m min-w-[198px]"
                href="https://www.clutch.security/book-demo"
              >
                <span className="block">
                  See Clutch in Action{' '}
                  <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">
                    -&gt;
                  </span>
                </span>
              </a>
            </div>
            <div className="section-platform-cta__image absolute bottom-0 left-1/2 hidden w-full -translate-x-1/2 lg:block">
              <span className="block" style={{ opacity: 1 }}>
                <img
                  alt="Non-Human Identity Security"
                  width="932"
                  height="191"
                  className="w-full"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplatform-cta-image.c41e7ed0.svg&w=1920&q=75"
                />
              </span>
            </div>
          </div>
          <div className="container bg-white">
            <div className="h-[0.5px] w-full bg-gray-600"></div>
          </div>
          <div className="section-icons-cards-big-3col__content grid grid-cols-1 gap-xl lg:grid-cols-3 lg:gap-md">
            <div className="section-icons-cards-big-3col__content-item flex flex-col items-center gap-sm lg:px-xs">
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Zero-Knowledge Architecture"
                  width="32"
                  height="32"
                  className="size-lg"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fknowledge-architecture.40a3993e.svg&w=64&q=75"
                />
              </span>
              <div className="flex flex-col gap-xs">
                <p className="body-heading-m">Zero-Knowledge Architecture</p>
                <p className="body-text-s mx-auto w-full max-w-[288px]">
                  Sensitive data never leaves your environment
                </p>
              </div>
            </div>
            <div className="section-icons-cards-big-3col__content-item flex flex-col items-center gap-sm lg:px-xs">
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Business Continuity"
                  width="32"
                  height="32"
                  className="size-lg"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbusiness-continuity.d1bf1ed4.svg&w=64&q=75"
                />
              </span>
              <div className="flex flex-col gap-xs">
                <p className="body-heading-m">Business Continuity</p>
                <p className="body-text-s mx-auto w-full max-w-[288px]">
                  Recommendations designed to avoid disruption to production systems
                </p>
              </div>
            </div>
            <div className="section-icons-cards-big-3col__content-item flex flex-col items-center gap-sm lg:px-xs">
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Limitless Scalability"
                  width="32"
                  height="32"
                  className="size-lg"
                  src="https://www.clutch.security/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fscalability.6d19dad2.svg&w=64&q=75"
                />
              </span>
              <div className="flex flex-col gap-xs">
                <p className="body-heading-m">Limitless Scalability</p>
                <p className="body-text-s mx-auto w-full max-w-[288px]">
                  Purpose-built to scale across cloud, SaaS, on-prem, and AI environments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
