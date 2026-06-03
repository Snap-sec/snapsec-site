import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

const quoteData = {
  aim: "Snapsec Asset Inventory Management gives teams complete visibility across assets, identities, secrets, and cloud resources—creating a trusted inventory that powers every security decision.",
  vs: "Snapsec Vulnerability Scanner continuously identifies vulnerabilities across infrastructure, applications, and cloud environments—helping teams uncover risks early and maintain a strong security posture.",
  asm: "Snapsec Attack Surface Management continuously discovers internet-facing assets and exposures—giving teams real-time visibility into what attackers can see and where risk exists.",
  was: "Snapsec Web Application Security continuously tests applications and APIs for exploitable weaknesses—helping teams ship faster without sacrificing security.",
  vm: "Snapsec Vulnerability Management transforms fragmented security findings into prioritized remediation actions—reducing noise, eliminating false positives, and helping teams fix what matters most."
};

export default function QuoteSection({ moduleSlug }) {
  const slug = (moduleSlug || 'asm').toLowerCase();
  const quote = quoteData[slug] || quoteData.asm;

  return (
    <section className="section-visibility-quote">
      <div className="container">
        <div className="section-border section-border-top relative overflow-hidden px-sm py-xxl text-center sm:px-xl lg:px-80px lg:py-88px">
          <FadeInBlock>
            <p className="large-paragraph-m mx-auto w-full">
              {quote}
            </p>
          </FadeInBlock>
        </div>
      </div>
    </section>
  );
}
