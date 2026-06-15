import React from 'react';

const VulnerabilitiesSection = () => {
  const vulnerabilities = [
    { title: "Vulnerable to Log4shell on Box (CVE-2021-44228)", company: "Box", domain: "box.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Dec 2021" },
    { title: "Vulnerable to Log4shell Agorapulse (CVE-2021-44228)", company: "Agorapulse", domain: "agorapulse.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Dec 2021" },
    { title: "Broken Access Control Enabling Large-Scale Data Exposure", company: "Twilio", domain: "twilio.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Aug 2022" },
    { title: "Vulnerable to Log4shell on Box (CVE-2021-44228)", company: "Box", domain: "box.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Jan 2022" },
    { title: "Execution of Custom Database Scripts from Unauthorized Roles", company: "Auth0", domain: "auth0.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Sep 2023" },
    { title: "Execution of Custom Database Scripts on Non-Custom Databases or When Custom Database is Disabled", company: "Auth0", domain: "auth0.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Oct 2023" },
    { title: "Hibob Vulnerable to log4j RCE", company: "Hibob", domain: "hibob.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Jan 2022" },
    { title: "Log4j Java RCE [CVE-2021-44228] on gopro.com", company: "GoPro", domain: "gopro.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Dec 2021" },
    { title: "Unauthorized Multi-Tenant Access and Data Exposure on Larksuite", company: "Larksuite", domain: "larksuite.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Mar 2024" },
    { title: "Account Takeover and Personally Identifiable Information (PII) Exposure via Web Cache Deception", company: "Hayatt Hotels", domain: "hyatt.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "May 2023" },
    { title: "Grafana Arbitrary Read File Vulnerability on datafoundry", company: "datafoundry", domain: "datafoundry.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Dec 2021" },
    { title: "Grafana Arbitrary Read File Vulnerability on Spectrum.net", company: "Spectrum", domain: "spectrum.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Dec 2021" },
    { title: "IDOR leads to Full Organisation Takeover", company: "Samsara", domain: "samsara.com", severity: "Critical", severityClass: "bg-red-50 text-red-700 border-red-200", date: "Apr 2024" },
  ];

  return (
    <section className="section-vulnerabilities bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        <div className="section-border flex flex-col gap-xl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px]">
          
          {/* Header */}
          <div className="flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Hall of Fame
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              High-Impact Vulnerabilities Discovered
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-900 font-normal max-w-[800px]">
              Our offensive security researchers actively participate in bug bounty programs and responsible disclosures, identifying critical vulnerabilities in leading global technology platforms.
            </p>
          </div>

          {/* Vulnerabilities List */}
          <div className="flex flex-col mt-md">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b-2 border-black pb-sm mb-xs hidden lg:grid px-sm">
              <div className="col-span-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Vulnerability</div>
              <div className="col-span-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Company</div>
              <div className="col-span-1 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Severity</div>
              <div className="col-span-1 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Reported On</div>
              <div className="col-span-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Found By</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
              {vulnerabilities.map((vuln, idx) => (
                <div 
                  key={idx} 
                  className={`grid grid-cols-1 lg:grid-cols-12 items-center gap-xs lg:gap-0 px-sm py-[10px] transition-colors hover:bg-[#F9F9F9] rounded-md ${
                    idx !== vulnerabilities.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="col-span-1 lg:col-span-6 flex items-center pr-sm">
                    <span className="text-[13px] lg:text-[14px] font-medium text-gray-900 leading-tight">{vuln.title}</span>
                  </div>
                  
                  <div className="col-span-1 lg:col-span-2 flex items-center mt-xs lg:mt-0 gap-sm">
                    <span className="text-[12px] lg:hidden font-semibold text-gray-400 w-[80px] uppercase tracking-wider">Company</span>
                    <div className="flex items-center gap-xs">
                      <img 
                        src={`https://img.logo.dev/${vuln.domain}`}
                        alt={`${vuln.company} logo`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://www.google.com/s2/favicons?domain=${vuln.domain}&sz=64`;
                        }}
                        className="w-5 h-5 rounded-full object-contain border border-gray-200/60 bg-white p-[1px] flex-shrink-0"
                      />
                      <span className="text-[13px] lg:text-[14px] font-normal text-gray-700">{vuln.company}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1 lg:col-span-1 flex items-center mt-xs lg:mt-0">
                    <span className="text-[12px] lg:hidden font-semibold text-gray-400 w-[80px] uppercase tracking-wider">Severity</span>
                    <span className={`inline-flex items-center px-[6px] py-[2px] rounded-[3px] text-[10px] font-semibold tracking-wider uppercase border ${vuln.severityClass}`}>
                      {vuln.severity}
                    </span>
                  </div>

                  <div className="col-span-1 lg:col-span-1 flex items-center mt-xs lg:mt-0">
                    <span className="text-[12px] lg:hidden font-semibold text-gray-400 w-[80px] uppercase tracking-wider">Date</span>
                    <span className="text-[13px] lg:text-[14px] font-normal text-gray-500">{vuln.date}</span>
                  </div>

                  <div className="col-span-1 lg:col-span-2 flex items-center lg:justify-end mt-xs lg:mt-0">
                    <span className="text-[12px] lg:hidden font-semibold text-gray-400 w-[80px] uppercase tracking-wider">Finder</span>
                    <span className="inline-flex items-center gap-xs">
                      <span className="w-[4px] h-[4px] rounded-full bg-gray-500"></span>
                      <span className="text-[13px] font-medium text-gray-600 tracking-wide">Snapsec Team</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VulnerabilitiesSection;
