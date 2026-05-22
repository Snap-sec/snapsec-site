import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CTASection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="overflow-hidden">
      <div className="container">
        <div
          ref={ref}
          className="section-border section-border-top flex flex-col items-center gap-lg px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px"
        >
          <motion.div
            className="mx-auto flex max-w-[700px] flex-col items-center gap-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="heading-h2">
              Ready to Secure Your Entire Application Ecosystem?
            </h3>
            <p className="subtitle-m text-gray-900 max-w-[520px]">
              See how Snapsec Suite discovers, scans, and remediates security
              risks across your environment.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="https://suite.snapsec.co/demo" target="_blank" rel="noopener noreferrer" className="button-primary-m">
                <span>Launch Live Demo</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M5 3L9 7L5 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="mailto:support@snapsec.co" className="button-ghost-m">
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
