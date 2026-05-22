import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const awards = [
  { src: '/assets/home-award-1.svg', alt: 'Award 1' },
  { src: '/assets/home-award-2.svg', alt: 'Award 2' },
  { src: '/assets/home-award-3.svg', alt: 'Award 3' },
  { src: '/assets/home-award-4.svg', alt: 'Award 4' },
  { src: '/assets/home-award-5.svg', alt: 'Award 5' },
  { src: '/assets/home-award-6.svg', alt: 'Award 6' },
  { src: '/assets/home-award-7.svg', alt: 'Award 7' },
];

export default function AwardsSection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="overflow-hidden">
      <div className="container">
        <div
          ref={ref}
          className="section-border section-border-top flex flex-col items-center gap-xl px-sm py-xxl sm:px-xl lg:gap-xxl lg:px-80px lg:py-88px"
        >
          {/* Heading */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="heading-h4 mx-auto max-w-[600px]">
              Recognized by Industry Leaders
            </h3>
          </motion.div>

          {/* Awards grid */}
          <div className="flex flex-wrap items-center justify-center gap-xl lg:gap-xxl">
            {awards.map((award, i) => (
              <motion.div
                key={award.alt}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <img
                  src={award.src}
                  alt={award.alt}
                  className="h-[60px] lg:h-[80px] w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
