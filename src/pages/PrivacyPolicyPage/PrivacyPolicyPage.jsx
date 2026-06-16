import React from 'react';
import SEOHead from '../../components/SEOHead';
import { BreadcrumbSchema } from '../../components/StructuredData';

const PrivacyPolicyPage = () => {
  const sections = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'information-we-collect', label: '2. Information We Collect' },
    { id: 'how-we-use-information', label: '3. How We Use Information' },
    { id: 'data-sharing-and-security', label: '4. Data Sharing & Security' },
    { id: 'cookies-and-tracking', label: '5. Cookies & Tracking' },
    { id: 'your-rights', label: '6. Your Rights & choices' },
    { id: 'contact-us', label: '7. Contact Us' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // accounting for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="content z-1 relative flex flex-col bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SEOHead
        title="Privacy Policy | Snapsec"
        description="Read Snapsec's Privacy Policy to understand how we collect, process, and protect your personal and organizational data."
        canonicalUrl="https://snapsec.co/privacy-policy"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Privacy Policy', url: 'https://snapsec.co/privacy-policy' },
      ]} />

      {/* Hero Header */}
      <section className="section-privacy-hero mt-[100px] lg:mt-[120px] bg-white border-b border-gray-600 border-x-[0.5px] mx-auto w-full max-w-[1440px] px-sm sm:px-xl lg:px-80px">
        <div className="py-lg lg:py-88px flex flex-col gap-sm max-w-[800px]">
          <span className="inline-flex items-center rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold tracking-[0.16em] uppercase bg-[#F5F5F5] text-black border border-gray-300 w-fit">
            Legal & Compliance
          </span>
          <h1 className="text-[36px] sm:text-[48px] font-semibold leading-[1.15] text-black tracking-tight mt-xs">
            Privacy Policy
          </h1>
          <p className="text-[15px] sm:text-[16px] text-gray-900 leading-[1.5] mt-xs">
            Last Updated: June 16, 2026. This Privacy Policy describes how Snapsec collects, uses, processes, and protects your information when you visit our website or use our AppSec management platform.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section-privacy-body bg-white border-b border-gray-600 border-x-[0.5px] mx-auto w-full max-w-[1440px] px-sm sm:px-xl lg:px-80px py-xl lg:py-88px">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          
          {/* Left Sidebar Table of Contents */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-[140px] flex flex-col gap-xs pr-lg border-r border-gray-200">
              <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-sm">
                On This Page
              </span>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="text-left py-xs text-[13px] font-medium text-gray-500 hover:text-black transition-colors border-l-2 border-transparent hover:border-black pl-sm cursor-pointer"
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Right Main Policy Text Content */}
          <div className="lg:col-span-8 flex flex-col gap-xl text-left max-w-[720px]">
            
            {/* Section 1 */}
            <div id="introduction" className="flex flex-col gap-sm">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-black tracking-tight">
                1. Introduction
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                Welcome to Snapsec. We respect your privacy and are committed to protecting your personal and corporate data. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of data through our services, unified application security dashboard, and websites.
              </p>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not access or use our services.
              </p>
            </div>

            {/* Section 2 */}
            <div id="information-we-collect" className="flex flex-col gap-sm pt-sm border-t border-gray-100">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-black tracking-tight">
                2. Information We Collect
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                We collect several types of information to provide and improve our security platform:
              </p>
              <ul className="list-disc pl-sm flex flex-col gap-xs text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                <li>
                  <strong className="text-black font-semibold">Account & Contact Information:</strong> Name, professional email address, company name, phone number, and password when you register for a demo or create an account.
                </li>
                <li>
                  <strong className="text-black font-semibold">Service and Scanning Data:</strong> Domain names, IP addresses, APIs, and cloud infrastructure metadata you authorize us to scan as part of our External Asset Discovery and Attack Surface Management services.
                </li>
                <li>
                  <strong className="text-black font-semibold">Usage & Diagnostic Logs:</strong> Details of your interactions with our platform, such as access dates/times, pages viewed, API queries, and diagnostic error reports.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="how-we-use-information" className="flex flex-col gap-sm pt-sm border-t border-gray-100">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-black tracking-tight">
                3. How We Use Information
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                Snapsec processes your data for the following essential business purposes:
              </p>
              <ul className="list-disc pl-sm flex flex-col gap-xs text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                <li>To provide, operate, maintain, and support our unified AppSec management platform.</li>
                <li>To perform external asset discovery, vulnerability scans, and API fuzzing as requested by your organization.</li>
                <li>To monitor system performance, fix bugs, and enhance user experience.</li>
                <li>To send platform updates, security alerts, and customer support notifications.</li>
                <li>To comply with regulatory obligations and enforce our terms of service.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="data-sharing-and-security" className="flex flex-col gap-sm pt-sm border-t border-gray-100">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-black tracking-tight">
                4. Data Sharing & Security
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                We do not sell, rent, or trade your personal or organizational data to third parties. We only share information with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements.
              </p>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                To safeguard your data, we apply enterprise-grade security measures:
              </p>
              <ul className="list-disc pl-sm flex flex-col gap-xs text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                <li>Encryption of all data in transit (using TLS 1.3) and at rest (using AES-256).</li>
                <li>Strict Role-Based Access Controls (RBAC) to limit internal access to customer data.</li>
                <li>Continuous vulnerability assessments and penetration testing of our own systems.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div id="cookies-and-tracking" className="flex flex-col gap-sm pt-sm border-t border-gray-100">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-black tracking-tight">
                5. Cookies & Tracking
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                We use cookies and similar tracking technologies to improve navigation, analyze platform traffic, and personalize settings. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent, though some parts of the service may not function correctly without them.
              </p>
            </div>

            {/* Section 6 */}
            <div id="your-rights" className="flex flex-col gap-sm pt-sm border-t border-gray-100">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-black tracking-tight">
                6. Your Rights & Choices
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                Depending on your location, you may have the following data protection rights under applicable laws (such as GDPR, CCPA, or PDPL):
              </p>
              <ul className="list-disc pl-sm flex flex-col gap-xs text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                <li>The right to access, correct, or delete your personal data.</li>
                <li>The right to object to or restrict processing of your data.</li>
                <li>The right to withdraw consent at any time for direct marketing communications.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div id="contact-us" className="flex flex-col gap-sm pt-sm border-t border-gray-100">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-black tracking-tight">
                7. Contact Us
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6]">
                If you have any questions or concerns about this Privacy Policy or our security practices, please get in touch with our security team:
              </p>
              <div className="flex flex-col gap-xxs mt-xs">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </span>
                <a
                  href="mailto:support@snapsec.co"
                  className="text-[16px] font-semibold text-black hover:text-primary transition-colors underline"
                >
                  support@snapsec.co
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
