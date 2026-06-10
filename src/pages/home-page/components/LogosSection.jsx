import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const logos = [
  { src: '/assets/ntt-data.svg', alt: 'NTT Data', id: 1 },
  { src: '/assets/fluidra.svg', alt: 'Fluidra', id: 2 },
  { src: '/assets/openweb.svg', alt: 'OpenWeb', id: 3 },
  { src: '/assets/cedar.svg', alt: 'Cedar', id: 4 },
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
          <div className="grid grid-cols-2 gap-md lg:gap-xxl lg:flex lg:flex-wrap lg:justify-between">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.id}
                className="flex h-lg justify-center lg:h-xl"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-lg object-contain lg:h-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
