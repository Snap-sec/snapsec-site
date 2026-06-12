import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    id: 'hala',
    domain: 'hala.com',
    logo: 'https://img.logo.dev/hala.com?token=pk_YDuXMfwrRe2kQtBuzc3Etg',
    companyName: 'Hala Payments',
    authorName: 'Ahmed Al Johani',
    authorRole: 'CISO | Hala Payments',
    authorAvatar: '/assets/ahmed-al-johani.png',
    quote: '"Snapsec transformed how our team collaborates—tasks are clear, deadlines are met, and updates flow seamlessly, creating structure and transparency across every project."',
  },
  {
    id: 'alif-bank',
    domain: 'alif.tj',
    logo: 'https://img.logo.dev/alif.tj?token=pk_YDuXMfwrRe2kQtBuzc3Etg',
    companyName: 'Alif Bank',
    authorName: 'Usmonjon Miraliev',
    authorRole: 'CEO | Alif Bank',
    authorAvatar: '/assets/usmonjon-miraliev.png',
    quote: '"Snapsec Suite, combined with their expert services, gave us a complete security solution—continuous visibility from the platform and hands-on support for rapid, effective remediation."',
  },
  {
    id: 'aila',
    domain: 'aila.sa',
    logo: 'https://img.logo.dev/aila.sa?token=pk_YDuXMfwrRe2kQtBuzc3Etg',
    companyName: 'Aila',
    authorName: 'Abdulaziz Bin Mugayel',
    authorRole: 'Founder | Aila',
    authorAvatar: '/assets/abdulaziz-bin-mugayel.png',
    quote: '"Snapsec Suite has completely modernized our penetration testing workflow. We’ve finally moved away from static, outdated PDF reports to a dynamic, real-time platform where findings are continuously updated, tracked, and remediated."',
  },
  {
    id: 'alif-uz',
    domain: 'alif.uz',
    logo: 'https://img.logo.dev/alif.uz?token=pk_YDuXMfwrRe2kQtBuzc3Etg',
    companyName: 'Alif Uzbekistan',
    authorName: 'Farzona',
    authorRole: 'Project Manager | Alif Uzbekistan',
    authorAvatar: '/assets/farzona.png',
    quote: '"Snapsec’s quick, transparent process and always-available support make issue resolution effortless. It’s a stress-free, reliable experience that builds real confidence in delivery."',
  },
];

export default function TestimonialSection() {
  const [activeTab, setActiveTab] = useState('hala');
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
          <div className="flex w-full border-b border-gray-200 bg-white overflow-x-auto scrollbar-none">
            {testimonials.map((t) => {
              const isActive = t.id === activeTab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex items-center justify-center gap-xs sm:gap-xs flex-1 min-w-[190px] h-[88px] border-r border-gray-200 last:border-r-0 cursor-pointer select-none transition-all duration-300 outline-none px-sm group ${
                    isActive ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <img
                    src={t.logo}
                    alt={`${t.companyName} logo`}
                    className={`h-[28px] w-[28px] object-contain rounded-md transition-all duration-300 ${
                      isActive 
                        ? 'opacity-100 grayscale-0 filter' 
                        : 'opacity-70 grayscale filter group-hover:opacity-100 group-hover:grayscale-0'
                    }`}
                  />
                  <span className={`text-[18px] sm:text-[22px] font-bold font-['Space_Grotesk'] tracking-tight transition-all duration-300 ${
                    isActive ? 'text-black' : 'text-gray-500 group-hover:text-black'
                  }`}>
                    {t.companyName}
                  </span>
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
