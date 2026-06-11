import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    id: 'solaris',
    logo: '/assets/solaris.svg',
    authorName: 'Sarah Jenkins',
    authorRole: 'VP of Infrastructure Security',
    authorAvatar: '/assets/solaris-author.png',
    quote: '"Before Snapsec, we had no clear visibility into our shadow IT and external exposures. Their continuous discovery and automated scanning identified critical perimeter vulnerabilities that traditional scanners missed."',
  },
  {
    id: 'bankunited',
    logo: '/assets/bank-united.svg',
    authorName: 'David Stender',
    authorRole: 'EVP, Enterprise Risk Officer & CISO',
    authorAvatar: '/assets/david-stender.png',
    quote: '"Understanding Non-Human Identities is crucial in cybersecurity, especially for enterprises operating in multi-environment or heavily cloud-based settings like ours. Snapsec fortifies companies by protecting these digital assets with clear visibility and full context."',
  },
  {
    id: 'dexcom',
    logo: '/assets/dexcom.svg',
    authorName: 'Marcus Chen',
    authorRole: 'Director of Application Security',
    authorAvatar: '/assets/dexcom-author.png',
    quote: '"The Dynamic Application Security Testing (DAST) in Snapsec\'s WAS module is exceptionally accurate. We integrated it directly into our CI/CD pipelines to catch vulnerabilities before they reach production."',
  },
  {
    id: 'fluidra',
    logo: '/assets/fluidra.svg',
    authorName: 'Elena Rostova',
    authorRole: 'Head of Cyber Operations',
    authorAvatar: '/assets/fluidra-author.png',
    quote: '"Managing asset inventory at scale was a nightmare. Snapsec\'s automated classification and team ownership mapping allowed us to assign and remediate vulnerabilities 3x faster than before."',
  },
];

export default function TestimonialSection() {
  const [activeTab, setActiveTab] = useState('bankunited');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const currentTestimonial = testimonials.find((t) => t.id === activeTab);

  return (
    <section className="overflow-hidden">
      <div className="container">
        <div
          ref={ref}
          className="section-border section-border-top flex flex-col w-full"
        >
          {/* Tabs Row */}
          <div className="flex w-full border-b border-gray-200 bg-white">
            {testimonials.map((t) => {
              const isActive = t.id === activeTab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className="relative flex items-center justify-center flex-1 h-[88px] border-r border-gray-200 last:border-r-0 cursor-pointer select-none transition-all duration-200 outline-none"
                >
                  <img
                    src={t.logo}
                    alt={`${t.id} logo`}
                    className={`h-[28px] max-w-[140px] object-contain transition-all duration-300 ${
                      isActive 
                        ? 'opacity-100 grayscale-0 filter brightness-0' 
                        : 'opacity-40 grayscale filter contrast-50 hover:opacity-80'
                    }`}
                  />
                  {/* Active bottom line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Testimonial Content Panel */}
          <div className="px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px bg-white">
            <div className="min-h-[220px] md:min-h-[160px] lg:min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-lg md:gap-xl items-start"
                >
                  {/* Author Column */}
                  <div className="flex items-center md:items-start gap-md md:flex-col text-left">
                    <img
                      src={currentTestimonial.authorAvatar}
                      alt={currentTestimonial.authorName}
                      className="w-xxl h-xxl md:w-[88px] md:h-[88px] rounded-full object-cover border border-gray-100 shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="body-text-m font-semibold text-black leading-tight">
                        {currentTestimonial.authorName}
                      </span>
                      <span className="body-text-xs text-gray-500 leading-normal mt-[4px] whitespace-pre-line">
                        {currentTestimonial.authorRole}
                      </span>
                    </div>
                  </div>

                  {/* Quote Column */}
                  <div className="relative text-left">
                    <blockquote className="heading-h5 text-gray-1000 leading-[1.6] font-normal">
                      {currentTestimonial.quote}
                    </blockquote>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
