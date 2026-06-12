import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { DiscoveryWidget, ScanningWidget, RemediationWidget } from './DashboardIllustrations';

const items = [
  {
    title: 'Continuous <br/> Discovery',
    text: 'ATTACK SURFACE & ASSETS',
    stepText: 'flows to',
    Widget: DiscoveryWidget,
  },
  {
    title: 'Automated <br/> Scanning',
    text: 'VULNERABILITIES & APIS',
    stepText: 'syncs to',
    Widget: ScanningWidget,
  },
  {
    title: 'Unified <br/> Remediation',
    text: 'WORKFLOWS & SLAS',
    stepText: '',
    Widget: RemediationWidget,
  },
];

function ExistCard({ item, index, isLast }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const delay = 0.3 * index;

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center justify-between gap-md px-xs pb-md pt-sm last:pb-0 lg:px-md lg:pb-xs lg:last:pb-xs"
    >
      {/* Step connector */}
      {!isLast && (
        <div className="pointer-events-none absolute bottom-[-16px] left-1/2 z-[2] flex w-full -translate-x-1/2 items-center lg:bottom-1/2 lg:left-auto lg:right-[-54px] lg:h-full lg:w-[108px] lg:translate-x-0 lg:translate-y-1/2 lg:flex-col lg:py-0">
          <div className="h-[0.5px] w-full grow bg-gray-600 lg:h-full lg:w-[0.5px]" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col items-center gap-midsm text-center lg:gap-sm">
        <motion.div
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay }}
          className="shrink-0"
        >
          <item.Widget inView={inView} />
        </motion.div>

        <motion.div
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.5, delay }}
        >
          <p
            className="body-heading-m"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
        </motion.div>
      </div>

      {/* Bottom tag */}
      <motion.div
        animate={controls}
        initial="hidden"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, delay }}
        className="w-full"
      >
        <div className="mb-lg flex min-h-md w-full select-none items-center justify-center rounded-[5px] bg-gray-300 px-sm py-[10px] last:mb-0 lg:mb-0">
          <span className="label-text-m text-center text-black">{item.text}</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExistSection() {
  return (
    <section className="overflow-hidden">
      <div className="container">
        <div className="section-border section-border-top flex flex-col gap-lg overflow-hidden px-sm py-xxl sm:px-xl lg:gap-72px lg:px-80px lg:py-88px">
          {/* Heading */}
          <div className="mx-auto max-w-[690px] text-center">
            <h2 className="heading-h1">
              A Single, Connected AppSec Workflow
            </h2>
          </div>

          {/* Cards */}
          <div className="flex w-full flex-col items-center gap-sm">
            <div className="grid w-full grid-cols-1 gap-lg lg:grid-cols-3 lg:gap-0">
              {items.map((item, i) => (
                <ExistCard
                  key={item.title}
                  item={item}
                  index={i}
                  isLast={i === items.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
