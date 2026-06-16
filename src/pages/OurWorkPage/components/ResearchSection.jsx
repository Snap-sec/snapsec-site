import React from 'react';

const ResearchSection = () => {
  const blogs = [
    {
      title: "How We Identified Multiple Issues in Zendesk",
      description: "A deep dive into multiple access control weaknesses and business logic vulnerabilities identified in Zendesk.",
      date: "April 08, 2026",
      link: "https://blog.snapsec.co/zendesk-multiple-vulnerabilities/"
    },
    {
      title: "How did we Found Log4shell on Agorapulse",
      description: "A technical write-up detailing the discovery and execution of the Log4j RCE vulnerability on Agorapulse.",
      date: "March 25, 2026",
      link: "https://blog.snapsec.co/log4shell-on-agorapulse/"
    },
    {
      title: "We Hacked Larksuite For 1 month and Here is what we found",
      description: "A month of research on Larksuite yielding multiple critical privilege escalations and access control bypasses.",
      date: "October 22, 2025",
      link: "https://blog.snapsec.co/hacking-larksuite/"
    },
    {
      title: "Access to private files of helpdesk",
      description: "Broken access control in Larksuite allowed team administrators to view ticket attachments and private files of separate helpdesks.",
      date: "February 28, 2020",
      link: "https://hackerone.com/reports/804534"
    },
    {
      title: "Unauthorized Tenant Join on Larksuite",
      description: "Critical privilege escalation flaw in Larksuite allowed unauthorized external users to join any tenant and view shared files and chats.",
      date: "October 07, 2021",
      link: "https://hackerone.com/reports/1363185"
    },
    {
      title: "App Approval Privilege Escalation on Larksuite",
      description: "Improper authorization checks enabled non-privileged Lark suite users to bypass admin app approvals, leading to privilege escalation.",
      date: "April 19, 2021",
      link: "https://hackerone.com/reports/1168475"
    }
  ];

  return (
    <section className="section-research bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        <div className="section-border flex flex-col gap-xl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px]">
          
          {/* Header */}
          <div className="flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Security Research
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Our Blogs & Research
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-900 font-normal">
              Insights, vulnerability write-ups, and threat analysis from our offensive security researchers.
            </p>
          </div>

          {/* Grid of Blogs */}
          <div className="section-platform-benefits__cards grid grid-cols-1 gap-xs md:grid-cols-2 lg:grid-cols-3 mt-sm">
            {blogs.map((blog, idx) => (
              <a
                key={idx}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group section-platform-benefits__card flex cursor-pointer flex-col items-start gap-md rounded-10 border-[0.5px] border-gray-600 p-md text-left transition-all lg:gap-64px lg:hover:border-gray-700 lg:hover:bg-[#F9F9F980]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FAFBFB] text-[#555] border border-gray-200/60 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span className="section-platform-benefits__card-info flex flex-col gap-xs">
                  <span className="body-heading-m cursor-pointer">{blog.title}</span>
                  <p className="body-text-s cursor-pointer">{blog.description}</p>
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
