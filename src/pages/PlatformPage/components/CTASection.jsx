import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = ({ isServicesPage }) => {
  return (
    <div className="section-platform-cta">
      <div className="container bg-white">
        <div className="section-platform-cta__wrapper relative flex flex-col gap-xxl overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm pt-[100px] pb-xxl text-center sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
          <div className="relative flex w-full flex-col items-center gap-lg lg:gap-lg">
            <div className="relative z-2 flex flex-col gap-sm lg:gap-lg">
              <h3 className="heading-h1 mx-auto w-full max-w-[650px]">
                {isServicesPage
                  ? "Request for Services"
                  : "One Platform to Replace your fragmental toolset"}
              </h3>
              <p
                className="subtitle-m mx-auto w-full max-w-[480px]"
                style={{ textAlign: 'center' }}
              >
                {isServicesPage
                  ? "Get in touch with our experts to secure your applications, infrastructure, and cloud environments."
                  : "Discover, detect, prioritize, and remediate — all from a single unified security platform built for modern enterprises."}
              </p>
            </div>
            <div className="relative z-2">
              <Link
                className="group button-primary-m min-w-[198px]"
                to="/contact-us"
              >
                <span className="block">
                  {isServicesPage ? "Contact Us" : "See Snapsec in Action"}{' '}
                  <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">
                    -&gt;
                  </span>
                </span>
              </Link>
            </div>
            {!isServicesPage && (
              <div className="section-platform-cta__image absolute bottom-0 left-1/2 hidden w-full -translate-x-1/2 lg:block">
                <span className="block" style={{ opacity: 1 }}>
                  <img
                    alt="Non-Human Identity Security"
                    width="932"
                    height="191"
                    className="w-full"
                    src="/images/platform/cta-background.svg"
                  />
                </span>
              </div>
            )}
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
                  src="/assets/knowledge-architecture.svg"
                />
              </span>
              <div className="flex flex-col gap-xs">
                <p className="body-heading-m">
                  {isServicesPage ? "Elite Security Experts" : "Zero-Knowledge Architecture"}
                </p>
                <p className="body-text-s mx-auto w-full max-w-[288px]">
                  {isServicesPage
                    ? "Our seasoned ethical hackers bring deep offensive security experience to uncover your most complex vulnerabilities."
                    : "Sensitive data never leaves your environment"}
                </p>
              </div>
            </div>
            <div className="section-icons-cards-big-3col__content-item flex flex-col items-center gap-sm lg:px-xs">
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="On Prem Instance Support"
                  width="32"
                  height="32"
                  className="size-lg"
                  src="/assets/business-continuity.svg"
                />
              </span>
              <div className="flex flex-col gap-xs">
                <p className="body-heading-m">
                  {isServicesPage ? "Actionable Reporting" : "On Prem Instance Support"}
                </p>
                <p className="body-text-s mx-auto w-full max-w-[288px]">
                  {isServicesPage
                    ? "Receive clear, prioritized reports with step-by-step remediation guidance tailored specifically to your technology stack."
                    : "Deploy Snapsec on-premise for full data sovereignty and air-gapped environment support"}
                </p>
              </div>
            </div>
            <div className="section-icons-cards-big-3col__content-item flex flex-col items-center gap-sm lg:px-xs">
              <span className="block shrink-0" style={{ opacity: 1 }}>
                <img
                  alt="Solution Agnostic"
                  width="32"
                  height="32"
                  className="size-lg"
                  src="/assets/scalability.svg"
                />
              </span>
              <div className="flex flex-col gap-xs">
                <p className="body-heading-m">
                  {isServicesPage ? "Continuous Support" : "Solution Agnostic"}
                </p>
                <p className="body-text-s mx-auto w-full max-w-[288px]">
                  {isServicesPage
                    ? "We work closely alongside your engineering teams to validate fixes and ensure complete, lasting remediation."
                    : "We connect with any solution — integrating with your existing scanners, tools, and workflows out of the box"}
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
