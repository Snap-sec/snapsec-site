import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function QuoteSection() {
  return (
    <section className="section-visibility-quote">
      <div className="container">
        <div className="section-border section-border-top relative overflow-hidden px-sm py-xxl text-center sm:px-xl lg:px-80px lg:py-88px">
          <FadeInBlock>
            <p className="large-paragraph-m mx-auto w-full ">
              Clutch provides end-to-end visibility for all Non-Human Identities across your entire tech stack.
            </p>
          </FadeInBlock>
        </div>
      </div>
    </section>
  );
}
