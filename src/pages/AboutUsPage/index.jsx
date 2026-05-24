import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import heroImg from '../../assets/hero.png';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function AboutUsPage() {
  const leaders = [
    { name: "Ofir Har-Chen", role: "Co-founder, CEO" },
    { name: "Sagi Haas", role: "Co-founder, CTO" },
    { name: "Tal Kimhi", role: "Co-founder, VP R&D" },
    { name: "Andrew Luhrmann", role: "VP Sales" },
    { name: "Erez Cohen", role: "VP Product" },
    { name: "Allan Kristensen", role: "VP Sales Engineering" }
  ];

  const investors = [
    { name: "Nir Polak", role: "Clutch Founding Investor", logos: ["Nir Polak"] },
    { name: "Guru Chahal", role: "Partner, LightSpeed", logos: ["LightSpeed"] },
    { name: "Jonathan Lim", role: "Partner, SignalFire", logos: ["SignalFire"] }
  ];

  const experts = [
    { 
      name: "Shlomo Kramer", 
      role: <>Co-founder of Check Point and Imperva,<br/>Co-founder & CEO at Cato Networks</>,
      logos: ["CHECK POINT", "CATO", "imperva"]
    },
    { 
      name: "Armon Dadgar", 
      role: "Co-founder & CTO at HashiCorp",
      logos: ["HashiCorp"]
    }
  ];

  return (
    <div className="mt-120px lg:mt-140px">
      
      {/* 1. Hero Section */}
      <section className="overflow-hidden">
        <div className="container">
          <div className="section-border section-border-top flex flex-col px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px">
            <FadeInBlock>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-80px items-center">
                <div className="flex flex-col gap-sm lg:gap-md">
                  <h1 className="heading-h1">
                    Taking the Lead in <br className="hidden md:block"/> Non-Human Identity <br className="hidden md:block"/> Security
                  </h1>
                  <p className="subtitle-m text-gray-900 max-w-[600px]">
                    We are on a mission to <strong className="text-black">secure all Non-Human Identities. Everywhere.</strong> We provide security teams with comprehensive, clear, and actionable tools for Non-Human Identity security, encompassing visibility, governance, posture and risk management, detection and response and proactive Zero Trust-based protection.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-[400px] aspect-square rounded-full flex items-center justify-center relative bg-gray-100">
                    <img src={heroImg} alt="Hero Graphic" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                </div>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* 2. Leadership Section */}
      <section className="overflow-hidden">
        <div className="container">
          <div className="section-border section-border-top flex flex-col gap-lg px-sm py-xxl sm:px-xl lg:gap-72px lg:px-80px lg:py-88px">
            <FadeInBlock>
              <div className="mb-xl lg:mb-72px text-center lg:text-left">
                <h2 className="heading-h1">Leadership</h2>
              </div>
              
              {/* Leaders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl lg:gap-y-80px lg:gap-x-xl mb-xxl lg:mb-120px">
                {leaders.map((leader, idx) => (
                  <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group hover-lift transition-transform">
                    <div className="flex w-full justify-between items-start mb-sm">
                      <div className="w-[120px] h-[120px] rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mx-auto lg:mx-0">
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center mb-xs">
                      <h3 className="body-heading-l text-black">{leader.name}</h3>
                      <a href="#" className="text-black font-bold text-xl hover:text-primary transition-colors">in</a>
                    </div>
                    <p className="body-text-m text-gray-800">{leader.role}</p>
                  </div>
                ))}
              </div>

              {/* Story */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl border-t-[0.5px] border-black pt-xl lg:pt-80px relative">
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-black"></div>
                <div className="lg:pr-xl">
                  <p className="body-text-l text-gray-1000">
                    We spent decades as defenders and builders of large-scale enterprise security platforms. At the forefront of creating disruptive cyber solutions and empowering security teams to manage their operations and attack surfaces, <strong className="font-semibold text-black">we witnessed the significant impact of Non-Human Identity-based attacks firsthand</strong>.
                  </p>
                </div>
                <div className="lg:pl-xl flex flex-col gap-md">
                  <p className="body-text-l text-gray-1000">
                    We observed that organizations struggle to know, understand, control, and secure their Non-Human Identity landscape. They often lack visibility into what Non-Human Identities they have, how they are managed, the risks they pose, how these risks can be mitigated, and how to detect and respond to Non-Human Identity-based attacks.
                  </p>
                  <p className="body-text-l text-gray-1000">
                    At Clutch, we leverage our deep domain expertise to empower security teams with the tools they need to clearly, easily, and effectively secure Non-Human Identities across their entire organization.
                  </p>
                </div>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* 3. Investors Section */}
      <section className="overflow-hidden">
        <div className="container">
          <div className="section-border section-border-top flex flex-col gap-lg px-sm py-xxl sm:px-xl lg:gap-72px lg:px-80px lg:py-88px">
            <FadeInBlock>
              <h2 className="heading-h2 text-black mb-xl lg:mb-72px max-w-[800px]">
                Our vision is backed by leading venture capital firms
              </h2>
              
              <div className="flex flex-col">
                {investors.map((inv, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row lg:items-center justify-between border-b-[0.5px] border-black py-md lg:py-lg gap-md lg:gap-0 hover-lift bg-white px-xs -mx-xs transition-transform">
                    <div className="flex flex-col gap-xxs">
                      <div className="flex items-center gap-sm">
                        <h3 className="body-heading-xl text-black">{inv.name}</h3>
                        <a href="#" className="text-black font-bold text-xl hover:text-primary transition-colors">in</a>
                      </div>
                      <p className="body-text-m text-gray-800">{inv.role}</p>
                    </div>
                    <div className="flex flex-wrap gap-md items-center lg:justify-end">
                      {inv.logos.map((logo, lidx) => (
                        <span key={lidx} className="font-bold text-xl tracking-tight text-black">{logo}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* 4. Experts Section */}
      <section className="overflow-hidden">
        <div className="container">
          <div className="section-border section-border-top flex flex-col gap-lg px-sm py-xxl sm:px-xl lg:gap-72px lg:px-80px lg:py-88px">
            <FadeInBlock>
              <h2 className="heading-h2 text-black mb-xl lg:mb-72px max-w-[800px]">
                And by some of the most notable security industry experts
              </h2>
              
              <div className="flex flex-col">
                {experts.map((exp, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row lg:items-center justify-between border-b-[0.5px] border-black py-md lg:py-lg gap-md lg:gap-0 hover-lift bg-white px-xs -mx-xs transition-transform">
                    <div className="flex flex-col gap-xxs">
                      <div className="flex items-center gap-sm">
                        <h3 className="body-heading-xl text-black">{exp.name}</h3>
                        <a href="#" className="text-black font-bold text-xl hover:text-primary transition-colors">in</a>
                      </div>
                      <p className="body-text-m text-gray-800">{exp.role}</p>
                    </div>
                    <div className="flex flex-wrap gap-md items-center lg:justify-end">
                      {exp.logos.map((logo, lidx) => (
                        <span key={lidx} className="font-bold text-xl tracking-tight text-black">{logo}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* 5. Careers / Join Section */}
      <section className="overflow-hidden">
        <div className="container">
          <div className="section-border section-border-top flex flex-col lg:flex-row justify-between items-start lg:items-center gap-lg px-sm py-xxl sm:px-xl lg:gap-72px lg:px-80px lg:py-88px bg-gray-50">
            <FadeInBlock>
               <h2 className="heading-h2 text-black max-w-[700px] mb-md lg:mb-0">
                 We're looking for sharp-minded, passionate, and talented individuals to join us on this exciting journey.
               </h2>
               <div className="mt-md">
                 <a href="/join" className="button-primary-m">
                   Open Positions &rarr;
                 </a>
               </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* 6. CTA / Footer-like Section */}
      <section className="overflow-hidden mb-120px">
        <div className="container">
          <div className="section-border section-border-top flex flex-col gap-lg px-sm py-xxl sm:px-xl lg:gap-72px lg:px-80px lg:py-88px">
            <FadeInBlock>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-120px">
                
                {/* Left Side */}
                <div className="flex flex-col items-start gap-md">
                  <div className="flex items-center gap-xs">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM22.5 16C22.5 19.5899 19.5899 22.5 16 22.5C12.4101 22.5 9.5 19.5899 9.5 16C9.5 12.4101 12.4101 9.5 16 9.5C19.5899 9.5 22.5 12.4101 22.5 16Z" fill="#000000"/>
                    </svg>
                    <span className="heading-h3 tracking-tighter text-black">clutch</span>
                  </div>
                  <p className="subtitle-m text-black">
                    Securing Everything<br/>
                    That Isn't a Person
                  </p>
                  
                  <a href="/demo" className="button-ghost-m mt-xs">
                    Book a Demo &rarr;
                  </a>

                  <div className="flex gap-sm mt-xs">
                    <a href="#" className="text-black hover:text-gray-600 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="#" className="text-black hover:text-gray-600 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="#" className="text-black hover:text-gray-600 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col gap-md">
                  <h3 className="heading-h3 text-black">Sign Up for Updates</h3>
                  <form className="flex flex-col gap-sm">
                    <div className="relative border-b-[0.5px] border-black pb-xs flex justify-between items-center group">
                      <input 
                        type="email" 
                        placeholder="Enter email" 
                        className="w-full bg-transparent outline-none body-text-l text-black placeholder-gray-500"
                        required
                      />
                      <button type="submit" className="text-gray-800 whitespace-nowrap hover:text-black transition-colors body-text-m font-medium">
                        Sign up &rarr;
                      </button>
                    </div>
                    
                    <label className="flex items-start gap-sm cursor-pointer group mt-xs">
                      <div className="relative flex items-center justify-center pt-1">
                        <input type="checkbox" className="w-[14px] h-[14px] rounded-sm border-gray-600 text-black focus:ring-black cursor-pointer accent-black" required />
                      </div>
                      <span className="body-text-xs text-gray-900 leading-relaxed">
                        I confirm that I have read the <a href="/privacy-policy" className="underline hover:text-black">privacy policy</a> and that my name and email address will be collected and used by Clutch for the purposes of sending marketing communication, promotions and updates. You can withdraw your consent at any time by unsubscribing or contacting us via <a href="mailto:privacy@clutch.security" className="underline hover:text-black">privacy@clutch.security</a>.
                      </span>
                    </label>
                  </form>
                </div>
                
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

    </div>
  );
}
