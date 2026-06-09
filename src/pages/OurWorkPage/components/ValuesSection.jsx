import React from 'react';

const ValuesSection = () => {
  const values = [
    {
      title: "FinTech Platform Security",
      description: "Uncovered critical API logic flaws allowing account takeovers, securing $5B+ in daily transaction volume."
    },
    {
      title: "Cloud Infrastructure Audit",
      description: "Identified AWS IAM privilege escalations and misconfigured S3 buckets, preventing catastrophic data exposure."
    },
    {
      title: "Healthcare SaaS Pentest",
      description: "Successfully bypassed WAF controls to demonstrate patient record access, leading to a complete security overhaul."
    }
  ];

  return (
    <section className="section-values bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching other pages */}
        <div className="section-border flex flex-col gap-xl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px] bg-white">
          
          {/* Header */}
          <div className="flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Case Studies
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Featured Pentest Engagements
            </h2>
          </div>

          {/* Grid Layout with vertical separators on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-lg md:gap-y-0 md:divide-x md:divide-gray-300 mt-md pt-lg border-t border-gray-200">
            {values.map((value, idx) => (
              <div key={idx} className="flex flex-col gap-sm md:px-lg first:pl-0 last:pr-0">
                <div className="flex items-center gap-xs">
                  <span className="text-[12px] font-bold text-gray-900 bg-[#F5F5F5] rounded-full w-6 h-6 flex items-center justify-center border border-gray-300">
                    {idx + 1}
                  </span>
                  <h3 className="text-[18px] sm:text-[20px] font-semibold text-black leading-none">
                    {value.title}
                  </h3>
                </div>
                <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] font-normal mt-xxs">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
