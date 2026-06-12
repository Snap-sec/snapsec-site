import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const logos = [
  { domain: 'hala.com', name: 'Hala Payments', id: 1 },
  { domain: 'jisr.net', name: 'JISR', id: 2 },
  { domain: 'larksuite.com', name: 'Larksuite', id: 3 },
  { domain: 'tiktok.com', name: 'Tiktok', id: 4 },
  { domain: 'ayan.co.uk', name: 'Ayan Capital', id: 5 },
  { domain: 'alif.tj', name: 'Alif Bank', id: 6 },
  { domain: 'alif.uz', name: 'Alif Uzbekistan', id: 7 },
  { domain: 'dgda.gov.sa', name: 'Diriyah Gate Development Authority', id: 8 },
];

export default function LogosSection() {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div className="section-home-logos">
      <div className="container">
        <div
          ref={ref}
          className="section-border section-border-top relative flex flex-col gap-xl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-lg lg:px-80px lg:pb-72px lg:pt-56px"
        >
          {/* Heading */}
          <div className="mx-auto flex max-w-[512px] flex-col gap-sm text-center">
            <motion.p
              className="subtitle-l text-gray-1000"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Securing modern applications at scale
            </motion.p>
          </div>

          {/* Logos */}
          <div className="grid grid-cols-1 gap-y-[40px] sm:grid-cols-2 sm:gap-x-[48px] lg:flex lg:flex-wrap lg:justify-center lg:gap-[100px] items-center mt-xl">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.id}
                className="flex items-center justify-center gap-[12px] group cursor-pointer"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <img
                  src={`https://img.logo.dev/${logo.domain}?token=pk_YDuXMfwrRe2kQtBuzc3Etg`}
                  alt={logo.name}
                  className="w-[48px] h-[48px] object-contain rounded-md filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
                <span className="text-[22px] sm:text-[28px] font-bold text-gray-800 group-hover:text-black transition-colors font-['Space_Grotesk'] tracking-tight">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
