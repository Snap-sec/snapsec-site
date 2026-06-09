import React from 'react';

const DemoReportSection = () => {
  return (
    <section className="section-demo-report bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Side-by-side grid layout matching the "Our Impact" (MissionSection) design */}
        <div className="section-border grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xxl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px] bg-white">
          
          {/* Left Column: Heading (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Sample Deliverables
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Actionable Documentation. Vetted Proof of Concepts.
            </h2>
          </div>

          {/* Right Column: Text & CTA (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-md">
            <p className="text-[16px] sm:text-[18px] text-gray-900 leading-[1.5] font-normal">
              We don't just find vulnerabilities—we document them with high-fidelity precision. Our deliverables provide clear, step-by-step reproduction scripts, request/response headers, and exact proof-of-concepts so your development team can validate and remediate the risk immediately.
            </p>
            <p className="text-[16px] sm:text-[18px] text-gray-900 leading-[1.5] font-normal">
              Our redacted sample penetration testing report demonstrates this level of detail, showcasing how we map CVSS severity, outline business logic attack paths, and deliver tailor-made remediation recommendations for each finding.
            </p>

            {/* Downloader CTA Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mt-md pt-lg border-t border-gray-200">
              <div className="flex flex-col text-left">
                <span className="text-[14px] font-semibold text-black">Snapsec_Sample_Pentest_Report.pdf</span>
                <span className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider">PDF Document • 4.2 MB</span>
              </div>
              <a 
                href="/assets/snapsec_sample_pentest_report.pdf" 
                download
                className="button-primary-m flex items-center justify-center gap-xs px-md py-sm rounded-[6px] text-[12px] font-bold uppercase tracking-wider text-center w-full sm:w-auto shrink-0"
              >
                <span>Download Sample Report</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DemoReportSection;
