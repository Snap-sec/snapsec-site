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

export default function CTABannerSection({ moduleSlug }) {
  const isVS = moduleSlug === 'vs';

  return (
    <section className="cta-banner-small">
      <div className="container">
        <FadeInBlock>
          <div className="relative overflow-hidden section-border section-border-top px-md py-64px md:px-100px lg:px-80px lg:py-88px lg:py-[115px]"
            style={{ background: 'linear-gradient(0deg, #FCFCFC, #FCFCFC)' }}>
            {/* Decorative conic gradient overlay */}
            <div className="absolute inset-0 z-1 hidden lg:block" style={{
              background: 'conic-gradient(from 92.06deg at 48.62% 114.48%, rgba(255,255,255,0) -135.77deg, rgba(255,255,255,0) 183.44deg, #7C3AED 187.2deg, #FFFFFF 190.98deg, #7C3AED 197.74deg, #000000 205.59deg, rgba(255,255,255,0) 224.23deg, rgba(255,255,255,0) 543.44deg)',
              maskImage: 'conic-gradient(from 92.06deg at 48.62% 114.48%, rgba(255,255,255,0) -135.77deg, rgba(255,255,255,0) 183.44deg, #7C3AED 187.2deg, #FFFFFF 190.98deg, #7C3AED 197.74deg, #000000 205.59deg, rgba(255,255,255,0) 224.23deg, rgba(255,255,255,0) 543.44deg)',
              transform: 'scaleX(-1)', pointerEvents: 'none',
            }} />
            {/* Decorative lines */}
            <div className="lines pointer-events-none absolute bottom-0 left-0 z-3 hidden h-full w-[673px] select-none lg:block">
              <div className="absolute bottom-[-198px] left-[165px] z-5 h-[753px] w-[1px] bg-black" style={{ rotate: '-58.7deg' }} />
              <div className="absolute bottom-[-232px] left-[165px] z-5 h-[710px] w-[4px] bg-black" style={{ rotate: '-65.5deg' }} />
              <div className="absolute bottom-[-274px] left-[165px] z-5 h-[680px] w-[10px] bg-black" style={{ rotate: '-73deg' }} />
            </div>
            {/* Noise overlay */}
            <div className="noise absolute inset-0 z-2" />
            {/* Content */}
            <div className="relative z-5 mx-auto flex w-full flex-col gap-lg text-center max-w-[800px]">
              <h3 className="heading-h1">
                <span>
                  {isVS ? "Know Your Vulnerability Risks Before Attackers Do" : "Know Your Attack Surface Before Attackers Do"}
                </span>
              </h3>
              <div>
                <a className="group button-primary-m" href="https://suite.snapsec.co/demo" target="_blank" rel="noopener noreferrer">
                  <span className="block">
                    {isVS ? "Explore VS Live" : "Explore ASM Live"}{' '}
                    <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">→</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </FadeInBlock>
      </div>
    </section>
  );
}
