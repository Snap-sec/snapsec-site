import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function ChallengeSection() {
  return (
    <section className="section-platform-challenge">
      <div className="container">
        <div className="section-border relative flex flex-col gap-lg overflow-hidden px-sm pt-xxl sm:px-xl lg:gap-88px lg:px-80px lg:pt-88px">
          <FadeInBlock>
            <h2 className="heading-h2 mx-auto w-full text-center pt-xxl lg:pt-88px">
              The Challenge
            </h2>
          </FadeInBlock>

          <div className="grid grid-cols-1 gap-md pb-xxl lg:pb-88px lg:grid-cols-2 lg:gap-0 lg:divide-x-[0.5px] lg:divide-gray-600">
            <FadeInBlock delay={0.1}>
              <div className="border-b-[0.5px] border-gray-600 pb-md lg:border-b-0 lg:pb-88px lg:pr-96px">
                <p className="body-text-m w-full lg:max-w-[386px]">
                  The proliferation of Non-Human Identities across the entire enterprise, combined with their dynamic nature and decentralization, poses a major challenge for organizations seeking centralized and comprehensive visibility.
                </p>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.2}>
              <div className="pb-lg lg:pb-88px lg:pl-96px">
                <p className="body-text-m w-full lg:max-w-[386px]">
                  There is a critical need for a context-based inventory that allows security teams to understand which Non-Human Identities exist, their business context, where they are stored, who has access to them, their owners, and their level of privilege.
                </p>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
