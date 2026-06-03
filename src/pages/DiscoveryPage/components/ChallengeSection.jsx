import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

const challengeData = {
  aim: {
    p1: "Security teams struggle to maintain an accurate inventory of assets, identities, secrets, and cloud resources. As environments grow, visibility gaps emerge, making it difficult to understand ownership, exposure, dependencies, and which assets introduce the greatest security risk.",
    p2: "Without rich metadata and relationship context, tracking down the owners of compromised services becomes a manual search. Security teams waste critical time during incidents trying to identify who is responsible for a resource and what it connects to."
  },
  vs: {
    p1: "Organizations need continuous visibility into vulnerabilities across internal infrastructure, cloud workloads, applications, and internet-facing assets. Traditional assessments are infrequent, creating delays between vulnerability introduction and detection, leaving exploitable weaknesses unnoticed for extended periods.",
    p2: "Without continuous, automated scanning, assets remain exposed between scheduled security reviews. Teams lack a real-time understanding of their internal security posture, making it difficult to prevent breaches before they occur."
  },
  asm: {
    p1: "New domains, cloud services, applications, and internet-facing resources are constantly being deployed. Security teams often discover exposed assets only after they become vulnerable, creating blind spots that increase organizational risk and expand the external attack surface.",
    p2: "Without continuous, automated discovery, critical exposures go undetected for weeks or months. Security teams need real-time visibility into what assets are exposed, where risks are concentrated, and which areas require immediate attention — before attackers exploit the gaps."
  },
  was: {
    p1: "Modern applications and APIs are released rapidly, making it difficult to identify security flaws before they reach production. Manual testing cannot scale with development velocity, increasing the likelihood of exploitable vulnerabilities reaching customers and critical systems.",
    p2: "Without automated testing integrated into development workflows, critical security flaws such as broken authentication and injection points slip through. Teams need dynamic coverage to ensure applications are continuously tested as code changes."
  },
  vm: {
    p1: "Security teams receive thousands of findings from scanners, cloud tools, code analysis platforms, and penetration tests. Duplicate findings, false positives, unclear ownership, and disconnected workflows create remediation bottlenecks that prevent teams from reducing risk efficiently.",
    p2: "Without a unified system to prioritize and route issues, engineers are overwhelmed by scanner noise and duplicate tickets. Teams struggle to track SLA targets, leading to delayed remediations and an ever-expanding backlog of open issues."
  }
};

export default function ChallengeSection({ moduleSlug }) {
  const slug = (moduleSlug || 'asm').toLowerCase();
  const data = challengeData[slug] || challengeData.asm;

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
                  {data.p1}
                </p>
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.2}>
              <div className="pb-lg lg:pb-88px lg:pl-96px">
                <p className="body-text-m w-full lg:max-w-[386px]">
                  {data.p2}
                </p>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
