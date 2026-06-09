import React, { useState } from 'react';

const ContributionsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Define 59 companies with their domains and display names
  const contributions = [
    { name: "Lark Technologies", domain: "larksuite.com" },
    { name: "Box BB", domain: "box.com" },
    { name: "Agorapulse", domain: "agorapulse.com" },
    { name: "Zendesk Sell", domain: "zendesk.com" },
    { name: "Citrix Systems Private", domain: "citrix.com" },
    { name: "Lucid Software", domain: "lucid.co" },
    { name: "Amplitude, Inc.", domain: "amplitude.com" },
    { name: "Grammarly", domain: "grammarly.com" },
    { name: "PlanGrid", domain: "plangrid.com" },
    { name: "Zendesk", domain: "zendesk.com" },
    { name: "Snowflake", domain: "snowflake.com" },
    { name: "mixmax", domain: "mixmax.com" },
    { name: "Coinbase", domain: "coinbase.com" },
    { name: "8x8 Bounty", domain: "8x8.com" },
    { name: "CRITEO", domain: "criteo.com" },
    { name: "Miro", domain: "miro.com" },
    { name: "Chaturbate", domain: "chaturbate.com" },
    { name: "Clever", domain: "clever.com" },
    { name: "GSOFT", domain: "gsoft.co" },
    { name: "Campaign Monitor", domain: "campaignmonitor.com" },
    { name: "Atlassian", domain: "atlassian.com" },
    { name: "Sophos", domain: "sophos.com" },
    { name: "DocuSign", domain: "docusign.com" },
    { name: "Twilio", domain: "twilio.com" },
    { name: "waitwhile", domain: "waitwhile.com" },
    { name: "Workiva", domain: "workiva.com" },
    { name: "BetterHelp", domain: "betterhelp.com" },
    { name: "Frame.io", domain: "frame.io" },
    { name: "Mailchimp", domain: "mailchimp.com" },
    { name: "Brex", domain: "brex.com" },
    { name: "Conveyor", domain: "conveyor.com" },
    { name: "GoPro", domain: "gopro.com" },
    { name: "Dialpad VDP", domain: "dialpad.com" },
    { name: "Contentful", domain: "contentful.com" },
    { name: "HOVER", domain: "hover.to" },
    { name: "Kiwi.com", domain: "kiwi.com" },
    { name: "Schoology", domain: "schoology.com" },
    { name: "Officevibe", domain: "officevibe.com" },
    { name: "Statuspage", domain: "statuspage.io" },
    { name: "Mailgun", domain: "mailgun.com" },
    { name: "Home-Connect", domain: "home-connect.co.za" },
    { name: "Infobip", domain: "infobip.com" },
    { name: "7Geese", domain: "7geese.com" },
    { name: "Sailthru", domain: "sailthru.com" },
    { name: "SoundCloud", domain: "soundcloud.com" },
    { name: "Blue Jeans Network", domain: "bluejeans.com" },
    { name: "Opsgenie", domain: "opsgenie.com" },
    { name: "Vidio.com", domain: "vidio.com" },
    { name: "Peakon", domain: "peakon.com" },
    { name: "Kenna Security", domain: "kennasecurity.com" },
    { name: "Smartsheet", domain: "smartsheet.com" },
    { name: "Upwork", domain: "upwork.com" },
    { name: "doxo", domain: "doxo.com" },
    { name: "Dell Technologies", domain: "dell.com" },
    { name: "SEEK", domain: "seek.com.au" },
    { name: "Udacity", domain: "udacity.com" },
    { name: "Workable", domain: "workable.com" },
    { name: "Dialpad", domain: "dialpad.com" },
    { name: "Parsable", domain: "parsable.com" }
  ];

  const visibleCompanies = isExpanded ? contributions : contributions.slice(0, 24);

  return (
    <section className="section-contributions bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching other pages */}
        <div className="section-border flex flex-col gap-xl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px] bg-white">
          
          {/* Header */}
          <div className="flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Clients & Bug Bounty
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Organizations We've Helped Secure
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-900 font-normal max-w-[650px]">
              We actively research security vulnerabilities, engage in responsible disclosures, and contribute to hardening the products of leading enterprise and tech organizations.
            </p>
          </div>

          {/* Grid of Company Logos */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-sm md:gap-md mt-md">
              {visibleCompanies.map((company, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center justify-center aspect-[3/2] rounded-[6px] border border-gray-200 bg-white p-xs hover:border-black hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 group"
                  title={company.name}
                >
                  {/* Logo Image */}
                  <div className="flex items-center justify-center w-full h-full transition-transform duration-300 group-hover:-translate-y-1.5">
                    <img
                      src={`https://img.logo.dev/${company.domain}?token=pk_YDuXMfwrRe2kQtBuzc3Etg`}
                      alt={`${company.name} logo`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`;
                      }}
                      className="max-h-[38px] max-w-[90%] object-contain opacity-95 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300 rounded-[4px]"
                    />
                  </div>
                  {/* Text Label - visible only on hover */}
                  <span className="absolute bottom-[6px] text-[9px] font-semibold text-gray-900 select-none text-center truncate w-full px-xs leading-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Toggle Link */}
            <div className="flex justify-center mt-md">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-xxs text-[12px] font-medium text-gray-500 hover:text-black transition-colors"
              >
                <span>{isExpanded ? "Show Less" : "View All Companies"}</span>
                <svg 
                  width="10" 
                  height="10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContributionsSection;
