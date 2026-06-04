import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { VSDiscoveryWidget, VSScanningWidget, VSReportingWidget, ASMDiscoveryWidget, ASMClassificationWidget, ASMRemediationWidget } from '../../home-page/components/DashboardIllustrations';

function FadeInBlock({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} className="w-full"
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

// Asset Catalog mockup showing real columns
function AssetCatalogMockup({ slug }) {
  const assets = [
    { host: 'api.acme.com', type: 'Subdomain', waf: 'Cloudflare', ports: '443, 80', exposed: true, signals: 4 },
    { host: '104.21.48.10', type: 'IP Address', waf: 'AWS', ports: '443', exposed: true, signals: 2 },
    { host: 'dev-portal.acme.net', type: 'Subdomain', waf: '—', ports: '22, 3000', exposed: true, signals: 7 },
    { host: 'mail.acme.com', type: 'Subdomain', waf: '—', ports: '25, 587', exposed: false, signals: 1 },
    { host: 'cdn.assets.acme.io', type: 'Web Server', waf: 'Fastly', ports: '443', exposed: false, signals: 0 },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: '8px', border: '0.5px solid #D9D9D9', boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      {/* Browser bar */}
      <div style={{ display: 'flex', alignItems: 'center', height: '32px', padding: '0 12px', borderBottom: '0.5px solid #D9D9D9', background: '#FAFAFA', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['#D9D9D9', '#D9D9D9', '#D9D9D9'].map((c, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none"><circle cx="5.5" cy="6" r="5" stroke="#6E6E6E" strokeWidth="1" /><path d="M5.5 2V6L7.5 8" stroke="#6E6E6E" strokeWidth="1" strokeLinecap="round" /></svg>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>suite.snapsec.co / {slug} / assets</span>
        </div>
      </div>
      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr', padding: '9px 16px', background: '#FAFAFA', borderBottom: '0.5px solid #EEEEEE' }}>
        {['HOST', 'TYPE', 'WAF', 'OPEN PORTS', 'EXPOSED', 'SIGNALS'].map(h => (
          <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em' }}>{h}</span>
        ))}
      </div>
      {assets.map((a, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.07 }}
          style={{ display: 'grid', gridTemplateColumns: '2fr 0.8fr 0.7fr 1fr 0.6fr 0.5fr', padding: '10px 16px', borderBottom: i < assets.length - 1 ? '0.5px solid #F5F5F5' : 'none', alignItems: 'center', background: '#fff' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827', fontFamily: "'SF Mono','Fira Code',monospace", letterSpacing: '-0.01em' }}>{a.host}</span>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>{a.type}</span>
          <span style={{ fontSize: '11px', color: '#6E6E6E' }}>{a.waf}</span>
          <span style={{ fontSize: '11px', color: '#6E6E6E', fontFamily: 'monospace' }}>{a.ports}</span>
          <span style={{ fontSize: '10px', fontWeight: 500, padding: '2px 6px', borderRadius: '4px', background: a.exposed ? '#FEF2F2' : '#F0FDF4', color: a.exposed ? '#DC2626' : '#059669', display: 'inline-block', width: 'fit-content' }}>{a.exposed ? 'Yes' : 'No'}</span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: a.signals > 3 ? '#DC2626' : a.signals > 0 ? '#CA8A04' : '#9CA3AF', fontFamily: "'Space Grotesk',sans-serif" }}>{a.signals}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── VS-specific 3-step process mockup (ExistSection style) ─────────────────
const VS_ITEMS = [
  { title: 'Discovery',  sub: 'HOSTS & CLOUD ASSETS',    stepText: 'flows to',   Widget: VSDiscoveryWidget  },
  { title: 'Scanning',   sub: 'CVEs & MISCONFIGURATIONS', stepText: 'syncs to',   Widget: VSScanningWidget   },
  { title: 'Reporting',  sub: 'SEVERITY & REMEDIATION',  stepText: '',           Widget: VSReportingWidget  },
];

function VSCard({ item, index, isLast }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });
  const delay = 0.25 * index;

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
          <motion.div
            animate={controls}
            initial="hidden"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="bg-white px-xs lg:px-0 lg:py-xs"
          >
            <div className="mx-auto flex h-lg w-max shrink-0 items-center justify-center gap-[6px] rounded-[80px] border-[0.5px] border-black bg-white px-[10px]">
              <span className="subtitle-xs">{item.stepText}</span>
              <img src="/assets/vector-arrow-right.svg" alt="→" className="w-[5px] rotate-90 lg:rotate-0" />
            </div>
          </motion.div>
          <div className="h-[0.5px] w-full grow bg-gray-600 lg:h-full lg:w-[0.5px]" />
        </div>
      )}

      {/* Widget */}
      <div className="flex flex-col items-center gap-midsm text-center lg:gap-sm">
        <motion.div
          animate={controls}
          initial="hidden"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, delay }}
          className="shrink-0"
        >
          <item.Widget inView={inView} />
        </motion.div>
        <motion.div
          animate={controls}
          initial="hidden"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5, delay }}
        >
          <p className="body-heading-m">{item.title}</p>
        </motion.div>
      </div>

      {/* Bottom tag */}
      <motion.div
        animate={controls}
        initial="hidden"
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, delay }}
        className="w-full"
      >
        <div className="mb-lg flex min-h-md w-full select-none items-center justify-center rounded-[5px] bg-gray-300 px-sm py-[10px] last:mb-0 lg:mb-0">
          <span className="label-text-m text-center text-black">{item.sub}</span>
        </div>
      </motion.div>
    </div>
  );
}

function VSProcessMockup() {
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-lg lg:grid-cols-3 lg:gap-0">
        {VS_ITEMS.map((item, i) => (
          <VSCard key={item.title} item={item} index={i} isLast={i === VS_ITEMS.length - 1} />
        ))}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── ASM-specific 3-step process mockup ──────────────────────────────────────
const ASM_ITEMS = [
  { title: 'Discovery',     sub: 'OSINT & DNS INTELLIGENCE',   stepText: 'flows to', Widget: ASMDiscoveryWidget     },
  { title: 'Classification', sub: 'RISK & SHADOW IT MAPPING',  stepText: 'drives',   Widget: ASMClassificationWidget },
  { title: 'Remediation',   sub: 'OWNERSHIP & RETEST TRACKING', stepText: '',         Widget: ASMRemediationWidget    },
];

function ASMCard({ item, index, isLast }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });
  const delay = 0.25 * index;

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <div ref={ref} className="group relative flex flex-col items-center justify-between gap-md px-xs pb-md pt-sm last:pb-0 lg:px-md lg:pb-xs lg:last:pb-xs">
      {!isLast && (
        <div className="pointer-events-none absolute bottom-[-16px] left-1/2 z-[2] flex w-full -translate-x-1/2 items-center lg:bottom-1/2 lg:left-auto lg:right-[-54px] lg:h-full lg:w-[108px] lg:translate-x-0 lg:translate-y-1/2 lg:flex-col lg:py-0">
          <div className="h-[0.5px] w-full grow bg-gray-600 lg:h-full lg:w-[0.5px]" />
          <motion.div animate={controls} initial="hidden" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.5, delay: delay + 0.2 }} className="bg-white px-xs lg:px-0 lg:py-xs">
            <div className="mx-auto flex h-lg w-max shrink-0 items-center justify-center gap-[6px] rounded-[80px] border-[0.5px] border-black bg-white px-[10px]">
              <span className="subtitle-xs">{item.stepText}</span>
              <img src="/assets/vector-arrow-right.svg" alt="→" className="w-[5px] rotate-90 lg:rotate-0" />
            </div>
          </motion.div>
          <div className="h-[0.5px] w-full grow bg-gray-600 lg:h-full lg:w-[0.5px]" />
        </div>
      )}
      <div className="flex flex-col items-center gap-midsm text-center lg:gap-sm">
        <motion.div animate={controls} initial="hidden" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, delay }} className="shrink-0">
          <item.Widget inView={inView} />
        </motion.div>
        <motion.div animate={controls} initial="hidden" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.5, delay }}>
          <p className="body-heading-m">{item.title}</p>
        </motion.div>
      </div>
      <motion.div animate={controls} initial="hidden" variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, delay }} className="w-full">
        <div className="mb-lg flex min-h-md w-full select-none items-center justify-center rounded-[5px] bg-gray-300 px-sm py-[10px] last:mb-0 lg:mb-0">
          <span className="label-text-m text-center text-black">{item.sub}</span>
        </div>
      </motion.div>
    </div>
  );
}

function ASMProcessMockup() {
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-lg lg:grid-cols-3 lg:gap-0">
        {ASM_ITEMS.map((item, i) => (
          <ASMCard key={item.title} item={item} index={i} isLast={i === ASM_ITEMS.length - 1} />
        ))}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const solutionData = {
  aim: {
    title: 'How Snapsec AIM works',
    desc: 'AIM continuously discovers assets, identities, secrets, applications, and infrastructure across your environment. It builds a centralized inventory enriched with ownership, relationships, and context, giving security teams complete visibility into what exists, who owns it, and how it connects.',
    btnText: 'Explore AIM Live',
    cards: [
      {
        "title": "Discovery",
        "text": "Connect cloud providers, repositories, identity platforms, infrastructure, and security tools to continuously discover assets, identities, applications, secrets, and services."
      },
      {
        "title": "Inventory",
        "text": "Normalize and classify discovered resources into a centralized inventory with ownership, criticality, business context, and security metadata."
      },
      {
        "title": "Mapping",
        "text": "Build a dynamic relationship graph that maps assets, identities, secrets, permissions, and dependencies to provide complete visibility across the environment."
      }
    ]
  },
  vs: {
    title: 'The Snapsec VS Solution',
    desc: 'VS continuously scans infrastructure, cloud resources, applications, and external assets to identify vulnerabilities and security weaknesses. Automated assessments help teams detect issues quickly, maintain ongoing visibility, and reduce the time between vulnerability introduction and discovery.',
    btnText: 'Explore VS Live',
    cards: [
      {
        "title": "Discovery",
        "text": "Automatically discover hosts, applications, cloud resources, containers, network services, and external assets that require continuous vulnerability assessment."
      },
      {
        "title": "Scanning",
        "text": "Perform continuous vulnerability scans across discovered assets to identify known vulnerabilities, missing patches, insecure configurations, and exploitable weaknesses."
      },
      {
        "title": "Reporting",
        "text": "Generate actionable reports with severity ratings, affected assets, remediation guidance, and trend analysis to help teams understand and address security risks."
      }
    ]
  },
  asm: {
    title: 'The Snapsec ASM Solution',
    desc: 'ASM continuously discovers, inventories, and monitors internet-facing assets across your organization. It identifies exposed services, shadow IT, unknown assets, and security risks, helping teams understand and secure their entire external attack surface before attackers find it.',
    btnText: 'Explore ASM Live',
    cards: [
      {
        "title": "Discovery",
        "text": "Leverage OSINT, DNS intelligence, certificate transparency logs, cloud integrations, and active scanning techniques to continuously discover domains, subdomains, applications, APIs, IPs, and internet-facing assets."
      },
      {
        "title": "Classification",
        "text": "Classify discovered assets, identify shadow IT, detect vulnerabilities and misconfigurations, and prioritize exposures based on severity, exploitability, business impact, and internet accessibility."
      },
      {
        "title": "Remediation",
        "text": "Assign ownership, create remediation workflows, track fixes through integrations, and continuously retest assets to verify exposures have been eliminated and risks remain under control."
      }
    ]
  },
  was: {
    title: 'The Snapsec WAS Solution',
    desc: 'WAS performs continuous security testing of web applications and APIs, uncovering vulnerabilities such as authentication flaws, injection issues, and business logic weaknesses. Security and development teams receive validated findings with actionable guidance to strengthen application security.',
    btnText: 'Explore WAS Live',
    cards: [
      {
        "title": "Configure",
        "text": "Perform a one-time setup by defining application scope, authentication methods, user roles, API specifications, and crawling preferences to ensure accurate testing coverage."
      },
      {
        "title": "Crawling",
        "text": "AI-powered crawling automatically explores applications, APIs, workflows, forms, and authenticated areas to discover features, endpoints, and attack surfaces that require testing."
      },
      {
        "title": "Scanning",
        "text": "Every discovered request, endpoint, and application feature is automatically tested for vulnerabilities, misconfigurations, authentication weaknesses, and security flaws with continuous validation."
      }
    ]
  },
  vm: {
    title: 'The Snapsec VM Solution',
    desc: 'VM aggregates vulnerability data from all security tools into a single platform, eliminates noise through deduplication and false-positive analysis, identifies root causes, prioritizes true risk, and orchestrates remediation workflows so security and engineering teams can resolve issues faster.',
    btnText: 'Explore VM Live',
    cards: [
      {
        "title": "Aggregate",
        "text": "Collect vulnerability findings from scanners, cloud security tools, code analysis platforms, penetration tests, and third-party security solutions into a single platform."
      },
      {
        "title": "Prioritize",
        "text": "Eliminate duplicates, identify false positives, correlate related findings, and prioritize vulnerabilities based on true risk, exploitability, asset criticality, and business impact."
      },
      {
        "title": "Remediate",
        "text": "Assign ownership, create tickets, track remediation progress, monitor SLAs, and validate fixes to ensure vulnerabilities are resolved efficiently across teams."
      }
    ]
  }
};

const cardIcons = [
  // Icon 1
  (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
      <circle cx="24" cy="24" r="8" fill="none" stroke="#000" strokeWidth="1.5" />
      <line x1="24" y1="8" x2="24" y2="16" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="32" x2="24" y2="40" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="24" x2="16" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="24" x2="40" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // Icon 2
  (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
      <rect x="12" y="14" width="24" height="20" rx="2" stroke="#000" strokeWidth="1.5" />
      <line x1="16" y1="20" x2="32" y2="20" stroke="#000" strokeWidth="1" />
      <line x1="16" y1="24" x2="28" y2="24" stroke="#000" strokeWidth="1" />
      <line x1="16" y1="28" x2="24" y2="28" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  // Icon 3
  (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="#D9D9D9" strokeWidth="1" />
      <path d="M16 20L24 28L32 20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="16" r="3" stroke="#000" strokeWidth="1.5" />
    </svg>
  )
];

export default function SolutionSection({ moduleSlug }) {
  const slug = (moduleSlug || 'asm').toLowerCase();
  const data = solutionData[slug] || solutionData.asm;

  return (
    <section className="section-solution">
      <div className="container">
        <div className="section-border section-border-top relative flex flex-col gap-xxl overflow-hidden px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">

          <FadeInBlock>
            <div className="mx-auto flex w-full max-w-[734px] flex-col gap-sm text-center items-center">
              <h3 className="heading-h1 text-center">{data.title}</h3>
              <p className="body-text-m mx-auto w-full max-w-[620px] text-gray-900 text-center" style={{ marginTop: '12px', lineHeight: '1.6' }}>
                {data.desc}
              </p>
            </div>
          </FadeInBlock>

          <div className="flex flex-col gap-xxl">
            <div className="grid grid-cols-1 gap-lg lg:gap-md lg:grid-cols-3">
              {data.cards.map((card, i) => (
                <FadeInBlock key={i} delay={i * 0.1}>
                  <div className="flex gap-midmd lg:flex-col lg:gap-sm">
                    <span className="block shrink-0">{cardIcons[i] || cardIcons[0]}</span>
                    <div className="flex flex-col gap-xxs lg:gap-xs">
                      <p className="body-heading-m">{card.title}</p>
                      <p className="body-text-s text-gray-900">{card.text}</p>
                    </div>
                  </div>
                </FadeInBlock>
              ))}
            </div>

            <FadeInBlock delay={0.2}>
              {slug === 'vs' ? <VSProcessMockup /> : slug === 'asm' ? <ASMProcessMockup /> : <AssetCatalogMockup slug={slug} />}
            </FadeInBlock>

            <FadeInBlock delay={0.3}>
              <div className="flex justify-center">
                <a className="button-primary-m" href="https://suite.snapsec.co/demo" target="_blank" rel="noopener noreferrer">
                  <span className="block">{data.btnText} <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">→</span></span>
                </a>
              </div>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}
