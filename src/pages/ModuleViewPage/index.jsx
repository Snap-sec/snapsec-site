import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

export default function ModuleViewPage() {
  const useCases = [
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
      title: 'Discover',
      text: 'Inventory every Non-Human Identity, AI agent, and secret across your environment. Each one mapped to its owner, its permissions, and what it connects to.'
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M2 10h20"></path><path d="M6 14h.01"></path><path d="M10 14h.01"></path><path d="M14 14h.01"></path></svg>,
      title: 'Govern',
      text: 'Manage the full lifecycle of identities, agents, and secrets. Ownership, access reviews, expiration, and accountability — in one place.'
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12A10 10 0 0 0 2 12"></path><path d="M12 12v8a2 2 0 0 0 4 0"></path><path d="M12 2v1"></path></svg>,
      title: 'Secure',
      text: 'Assess posture and reduce risk across identities, agents, and secrets. Prioritized by what each one can access and the damage a compromise would cause.'
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
      title: 'Detect',
      text: 'Identify suspicious behavior across identities and agents in real time. Investigate with full context and respond before damage spreads.'
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polygon points="12 14.5 9.64 16 10.33 13.25 8 11.41 10.93 11.2 12 8.5 13.07 11.2 16 11.41 13.67 13.25 14.36 16 12 14.5"></polygon></svg>,
      title: 'Protect',
      text: 'Apply Zero Trust controls to identities and migrate static credentials to short-lived alternatives. Enforce without disrupting production.'
    }
  ];

  return (
    <div className="mt-[120px] lg:mt-[140px]">
      
      {/* 1. Hero Module Section */}
      <section className="overflow-hidden">
        <div className="container">
          <div className="section-border section-border-top flex flex-col px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px">
            <FadeInBlock>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-[80px] items-center">
                <div className="flex flex-col gap-sm lg:gap-md">
                  <span className="label-text-m text-[#004DFF] tracking-widest uppercase">Platform Module</span>
                  <h1 className="heading-h1 text-black">
                    Vulnerability <br className="hidden lg:block"/> Management
                  </h1>
                  <p className="subtitle-m text-gray-900 max-w-[600px]">
                    Transform how you handle vulnerabilities. <strong className="text-black">Discover, prioritize, and remediate</strong> risks across your entire non-human identity ecosystem from a single, unified interface.
                  </p>
                  <div className="flex flex-wrap gap-sm mt-xs">
                     <a href="/demo" className="button-primary-m">Book a Demo</a>
                     <a href="/docs" className="button-ghost-m">View Documentation</a>
                  </div>
                </div>
                
                {/* Metric/Dash Illustration */}
                <div className="flex justify-center lg:justify-end mt-md lg:mt-0">
                   <div className="w-full max-w-[500px] bg-[#FAFAFA] border-[0.5px] border-black p-md lg:p-xl hover-lift transition-transform">
                      <div className="border-b-[0.5px] border-black pb-sm mb-sm flex justify-between items-center">
                         <span className="body-heading-m text-black">Module Health</span>
                         <span className="label-text-m text-[#059669] bg-[#D1FAE5] px-2 py-1 rounded">98% SLA</span>
                      </div>
                      <div className="grid grid-cols-2 gap-md lg:gap-lg">
                         <div className="flex flex-col gap-1">
                            <span className="label-text-m text-gray-800">OPEN FINDINGS</span>
                            <div className="heading-h2 text-black">247</div>
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="label-text-m text-gray-800">CRITICAL</span>
                            <div className="heading-h2 text-[#DC2626]">12</div>
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="label-text-m text-gray-800">AVG TIME TO REMEDIATE</span>
                            <div className="heading-h2 text-black">4.2d</div>
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="label-text-m text-gray-800">ASSETS SCANNED</span>
                            <div className="heading-h2 text-black">12.4k</div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* 2. Use Cases Grid */}
      <section className="overflow-hidden">
        <div className="container">
          <div className="section-border section-border-top flex flex-col gap-lg px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px">
            <FadeInBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((usecase, idx) => (
                  <div key={idx} className="flex flex-col border border-gray-200 rounded-[12px] p-6 lg:p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-black mb-8 lg:mb-10">
                      {usecase.icon}
                    </div>
                    <h3 className="heading-h4 text-black mb-3">{usecase.title}</h3>
                    <p className="body-text-m text-[#444444] leading-relaxed">{usecase.text}</p>
                  </div>
                ))}
                
                {/* 6th Card: Gradient CTA */}
                <div className="flex flex-col justify-center items-center text-center border border-gray-200 rounded-[12px] p-6 lg:p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-100 to-black"></div>
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{backgroundImage: 'url(/assets/noise.png)'}}></div>
                  <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-600 rounded-full blur-[50px] opacity-80 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <h3 className="heading-h4 text-black mb-8 transition-colors duration-500">
                      Every Identity.<br/>Every Agent. Every<br/>Secret. Secured.
                    </h3>
                    <a href="/demo" className="button-primary-m !bg-[#111111] !text-white border border-[#333333] px-6 hover:opacity-80">
                      Book a Demo &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* 3. Floating Logos CTA Section */}
      <section className="overflow-hidden mb-[120px]">
        <div className="container">
          <div className="section-border section-border-top flex flex-col items-center justify-center text-center px-sm py-[100px] lg:py-[140px] bg-white relative overflow-hidden">
            
            {/* Floating Icons Background */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
               {/* Left Side Icons */}
               <div className="absolute w-[70px] h-[70px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm left-[5%] bottom-[30%] animate-[float_6s_ease-in-out_infinite]">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="#666"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.958a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.52h2.52zM15.165 17.687a2.527 2.527 0 0 1-2.52-2.522 2.527 2.527 0 0 1 2.52-2.521h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z"/></svg>
               </div>
               <div className="absolute w-[90px] h-[90px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm left-[18%] bottom-[8%] animate-[float_8s_ease-in-out_infinite_1s]">
                 <svg width="45" height="45" viewBox="0 0 24 24" fill="#24292e"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               </div>
               <div className="absolute w-[50px] h-[50px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm left-[28%] bottom-[4%] animate-[float_7s_ease-in-out_infinite_2s]">
                 <span className="font-black text-[12px] tracking-tighter">SAP</span>
               </div>
               <div className="absolute w-[80px] h-[80px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm left-[12%] top-[20%] animate-[float_6s_ease-in-out_infinite_0.5s]">
                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>
               </div>
               <div className="absolute w-[45px] h-[45px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm left-[20%] top-[45%] animate-[float_5s_ease-in-out_infinite_1.2s]">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg>
               </div>
               
               {/* Right Side Icons */}
               <div className="absolute w-[100px] h-[100px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm right-[18%] bottom-[12%] animate-[float_7s_ease-in-out_infinite_1.5s]">
                 <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
               </div>
               <div className="absolute w-[110px] h-[110px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm right-[12%] top-[10%] animate-[float_9s_ease-in-out_infinite_0.2s]">
                 <span className="font-black text-[46px] font-['Space_Grotesk'] text-gray-700 tracking-tighter">A</span>
               </div>
               <div className="absolute w-[50px] h-[50px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm right-[28%] top-[35%] animate-[float_5s_ease-in-out_infinite_2.5s]">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
               </div>
               <div className="absolute w-[80px] h-[80px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm right-[4%] bottom-[25%] animate-[float_8s_ease-in-out_infinite_3s]">
                 <span className="font-bold text-xl text-gray-500 tracking-tighter">aws</span>
               </div>
               <div className="absolute w-[55px] h-[55px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm right-[30%] bottom-[5%] animate-[float_6s_ease-in-out_infinite_0.8s]">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
               </div>
            </div>

            <FadeInBlock>
              <div className="max-w-[700px] flex flex-col items-center gap-8 mx-auto relative z-10 py-10">
                <h2 className="text-[44px] lg:text-[54px] font-semibold text-black leading-[1.1] font-['Space_Grotesk'] tracking-tight">
                  Identity Security Beyond<br/>the Human Perimeter
                </h2>
                <p className="text-[18px] text-black font-medium mt-[-4px]">
                  See every identity, agent, and secret.<br/>Know what each one can do.
                </p>
                <div className="mt-2">
                  <a href="/demo" className="button-primary-m !bg-[#111111] !text-white px-8 h-[52px] text-[15px] hover:scale-105 transition-transform duration-300 shadow-xl border border-black">
                    See Clutch in Action &rarr;
                  </a>
                </div>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

    </div>
  );
}
