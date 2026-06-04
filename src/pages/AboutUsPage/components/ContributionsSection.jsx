import React from 'react';

const ContributionsSection = () => {
  // Define 24 companies with their domains and display names
  const contributions = [
    { name: "Google", domain: "google.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "OpenAI", domain: "openai.com" },
    { name: "AWS", domain: "aws.amazon.com" },
    { name: "Okta", domain: "okta.com" },
    { name: "GitHub", domain: "github.com" },
    { name: "GitLab", domain: "gitlab.com" },
    { name: "Slack", domain: "slack.com" },
    { name: "Datadog", domain: "datadoghq.com" },
    { name: "Kubernetes", domain: "kubernetes.io" },
    { name: "Terraform", domain: "terraform.io" },
    { name: "CrowdStrike", domain: "crowdstrike.com" },
    { name: "Bitbucket", domain: "bitbucket.org" },
    { name: "CircleCI", domain: "circleci.com" },
    { name: "Databricks", domain: "databricks.com" },
    { name: "Salesforce", domain: "salesforce.com" },
    { name: "Splunk", domain: "splunk.com" },
    { name: "Workday", domain: "workday.com" },
    { name: "PostgreSQL", domain: "postgresql.org" },
    { name: "Cloudflare", domain: "cloudflare.com" },
    { name: "Stripe", domain: "stripe.com" },
    { name: "Zoom", domain: "zoom.us" },
    { name: "Atlassian", domain: "atlassian.com" },
    { name: "HashiCorp", domain: "hashicorp.com" }
  ];

  return (
    <section className="section-contributions bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching other pages */}
        <div className="section-border flex flex-col gap-xl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px] bg-white">
          
          {/* Header */}
          <div className="flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              Responsible Disclosures & Bug Bounty
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Organizations We've Helped Secure
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-900 font-normal max-w-[650px]">
              We actively research security vulnerabilities, engage in responsible disclosures, and contribute to hardening the products of leading enterprise and tech organizations.
            </p>
          </div>

          {/* Grid of Company Logos (24 Cards: 3 Rows of 8) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-sm md:gap-md mt-md">
            {contributions.map((company, idx) => (
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

        </div>
      </div>
    </section>
  );
};

export default ContributionsSection;
