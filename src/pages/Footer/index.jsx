const footerLinks = {
  Modules: [
    { label: 'Vulnerability Management', href: 'https://docs.snapsec.co/products/vm/dashboard' },
    { label: 'Attack Surface Management', href: 'https://docs.snapsec.co/products/asm/dashboard' },
    { label: 'Asset Intelligence Management', href: 'https://docs.snapsec.co/products/aim/dashboard' },
    { label: 'Vulnerability Scanning', href: 'https://docs.snapsec.co/products/vs/dashboard' },
    { label: 'Web Application Scanner', href: 'https://docs.snapsec.co/products/was/dashboard' },
  ],
  'Use Cases': [
    { label: 'External Asset Discovery', href: 'https://docs.snapsec.co/usecases/introduction' },
    { label: 'Shadow IT Detection', href: 'https://docs.snapsec.co/usecases/introduction' },
    { label: 'Risk-Based Prioritization', href: 'https://docs.snapsec.co/usecases/introduction' },
    { label: 'Automated SLA Enforcement', href: 'https://docs.snapsec.co/usecases/introduction' },
    { label: 'Continuous API Fuzzing', href: 'https://docs.snapsec.co/usecases/introduction' },
  ],
  Resources: [
    { label: 'Documentation', href: 'https://docs.snapsec.co', external: true },
    { label: 'Blog', href: 'https://blog.snapsec.co', external: true },
    { label: 'Support Email', href: 'mailto:support@snapsec.co', external: true },
    { label: 'Live Demo', href: 'https://suite.snapsec.co/demo', external: true },
  ],
  Company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: 'mailto:support@snapsec.co' },
  ],
};

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const certifications = [
  { src: '/assets/aicpa_soc.svg', alt: 'SOC 2' },
  { src: '/assets/iso.svg', alt: 'ISO 27001' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container">
        <div className="px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px">
          {/* Top section */}
          <div className="flex flex-col gap-xxl lg:flex-row lg:justify-between">
            {/* Logo and info */}
            <div className="flex flex-col gap-lg lg:max-w-[280px]">
              <a href="/" className="inline-block">
                <img
                  src="/assets/logo-full-black.svg"
                  alt="Snapsec Suite"
                  className="w-[120px] invert"
                />
              </a>
              <p className="body-text-xs text-gray-500">
                A centralized AppSec platform unifying discovery, vulnerability management, 
                intelligence, and protection across your entire ecosystem.
              </p>

              {/* Certifications */}
              <div className="flex items-center gap-md">
                {certifications.map((cert) => (
                  <img
                    key={cert.alt}
                    src={cert.src}
                    alt={cert.alt}
                    className="h-xl w-auto opacity-60"
                  />
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-sm">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors hover:text-white"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-lg lg:grid-cols-4 lg:gap-xl">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col gap-sm">
                  <h4 className="body-heading-s text-white">{category}</h4>
                  <div className="flex flex-col gap-xs">
                    {links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="body-text-xxs text-gray-500 transition-colors hover:text-white flex items-center gap-xxs"
                        {...(link.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {link.label}
                        {link.external && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="opacity-50"
                          >
                            <path
                              d="M11 8V11.5C11 11.7652 10.8946 12.0196 10.7071 12.2071C10.5196 12.3946 10.2652 12.5 10 12.5H2.5C2.23478 12.5 1.98043 12.3946 1.79289 12.2071C1.60536 12.0196 1.5 11.7652 1.5 11.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H6"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 1.5H12.5V5"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.5 8.5L12.5 1.5"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-xxl flex flex-col gap-sm border-t border-gray-800 pt-lg lg:flex-row lg:items-center lg:justify-between">
            <p className="body-text-xxxs text-gray-500">
              © {new Date().getFullYear()} Snapsec. All rights
              reserved.
            </p>
            <div className="flex items-center gap-md">
              <a
                href="#"
                className="body-text-xxxs text-gray-500 transition-colors hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="body-text-xxxs text-gray-500 transition-colors hover:text-white"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="body-text-xxxs text-gray-500 transition-colors hover:text-white"
              >
                Trust Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
