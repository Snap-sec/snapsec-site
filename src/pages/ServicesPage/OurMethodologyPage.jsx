import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const STEPS = [
  {
    step: 1,
    name: "Recon",
    description: [
      "Reconnaissance forms the bedrock of our entire security assessment. During this initial phase, our expert team acts as a sophisticated adversary, employing both passive and active intelligence gathering to map your organization's digital footprint. We meticulously comb through public records, DNS registries, and open-source intelligence (OSINT) to identify forgotten domains, exposed employee credentials, and shadow IT assets that might otherwise go unnoticed.",
      "Beyond passive gathering, we initiate active discovery to probe network perimeters and uncover hidden entry points. This involves comprehensive port scanning, service enumeration, and sub-domain brute-forcing to reveal exactly what services are facing the public internet. We analyze web application architectures, cloud storage misconfigurations, and external-facing API endpoints to build a precise attack surface map.",
      "The intelligence compiled in this phase directly dictates the strategy for the rest of the engagement. By understanding the technologies in use, the network topology, and the potential weak links, we craft a highly targeted approach. This ensures that subsequent testing phases are not just generic scans, but calculated, context-aware attacks designed to exploit the specific nuances of your infrastructure."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    )
  },
  {
    step: 2,
    name: "Checklist Approach",
    description: [
      "Security is as much about discipline as it is about creativity. In the Checklist Approach phase, our team rigorously applies industry-standard methodologies to ensure no basic vulnerability is overlooked. We lean on established frameworks such as the OWASP Top 10, ASVS, and CIS Controls, mapping our testing procedures against recognized best practices. This methodical baseline guarantees a comprehensive audit of common security pitfalls.",
      "During this structured evaluation, we systematically verify the presence of fundamental security headers, secure cookie flags, and proper CORS configurations. We run through exhaustive lists of known vulnerabilities, checking for outdated dependencies, default credentials, and common misconfigurations in web servers and frameworks. This phase acts as a vital safety net, catching low-hanging fruit before moving into more complex exploitation scenarios.",
      "While automated tools can check some of these boxes, our human-driven checklist approach ensures nuanced context is applied. An automated tool might see a missing header, but an analyst understands if the architecture genuinely requires it or if compensating controls exist. This meticulous, manual validation provides assurance that the foundational security posture of the application is solid."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    )
  },
  {
    step: 3,
    name: "Dynamic Security Testing",
    description: [
      "Dynamic Security Testing (DAST) marks the transition from static analysis to active engagement with the running application. Here, our engineers interact with the target environment just as a legitimate user—or a malicious actor—would. We monitor the application's behavior in real-time, observing how it handles unexpected inputs, malformed data, and edge-case user workflows.",
      "This phase goes far beyond automated crawling. We intercept and manipulate HTTP traffic, tampering with parameters, headers, and cookies to observe the backend responses. By injecting malicious payloads—such as Cross-Site Scripting (XSS) vectors or SQL injection queries—we test the application's input validation and output encoding mechanisms in a live context, identifying vulnerabilities that only manifest during active runtime execution.",
      "The dynamic approach allows us to discover complex logic flaws that automated tools inherently miss. We chain together seemingly benign actions to create multi-step attack scenarios, proving the real-world impact of chained vulnerabilities. This phase is critical for understanding the true resilience of the application when subjected to targeted, intelligent probing."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M12 9l-2 2h4l-2 2" />
      </svg>
    )
  },
  {
    step: 4,
    name: "Automated Security Testing",
    description: [
      "Automation plays a crucial role in scaling our testing efforts and achieving broad coverage efficiently. In this phase, we deploy a suite of enterprise-grade and proprietary automated scanning tools designed to rapidly assess the target infrastructure. These tools are configured with custom rulesets and authenticated access to crawl applications deeply and thoroughly.",
      "Our automated scanners bombard the application with thousands of known payloads, looking for well-documented vulnerabilities such as injection flaws, cross-site scripting, and known vulnerable software components. This brute-force approach is highly effective at identifying regressions, missing patches, and widespread configuration errors across large attack surfaces in a short amount of time.",
      "However, automation is only as good as the experts operating it. Our team meticulously reviews the output of these scanners to filter out false positives and contextualize the findings. We use the results of automated testing not as a final report, but as a triage mechanism—highlighting areas of interest that require deeper, manual investigation in the subsequent phases of the methodology."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    step: 5,
    name: "Attacking Access Control Models",
    description: [
      "Access control is the cornerstone of application security, and its failure is often catastrophic. During this highly specialized phase, our engineers focus exclusively on breaking the mechanisms that dictate \"who can do what.\" We meticulously analyze role-based access control (RBAC), attribute-based access control (ABAC), and custom permission models to identify logical gaps and horizontal or vertical privilege escalation vectors.",
      "We attempt to access resources belonging to other users (Insecure Direct Object References - IDOR) by manipulating IDs, tokens, and predictable identifiers. Furthermore, we test if lower-privileged users can execute administrative functions or access restricted data by tampering with session state, forced browsing, or exploiting missing authorization checks at the API layer.",
      "Because access control logic is unique to every application, this phase relies heavily on manual, creative exploitation. Automated tools cannot understand the business context of a \"manager\" versus an \"employee.\" Our team maps out complex multi-tenant architectures and business workflows to ensure that data isolation is absolute and that users cannot step outside their designated boundaries."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    step: 6,
    name: "Component Security Testing",
    description: [
      "Modern applications are built from complex ecosystems of interconnected components, APIs, and third-party libraries. In this phase, we dissect the application architecture to assess the security of each individual component in isolation. We look at microservices, message queues, authentication gateways, and serverless functions, ensuring that the trust boundaries between them are secure.",
      "We rigorously test the authentication and session management components, looking for weaknesses in password policies, MFA bypasses, session fixation, and token lifecycle management. We also scrutinize cryptographic implementations, ensuring sensitive data in transit and at rest is protected using strong, modern algorithms rather than deprecated standards.",
      "Furthermore, we analyze external dependencies and third-party integrations. A vulnerability in a trusted third-party component can easily compromise the entire system. We assess API integrations, webhook handlers, and supply chain dependencies to ensure that external data is handled securely and that the application fails safely when interacting with untrusted elements."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  {
    step: 7,
    name: "Report Writing",
    description: [
      "The true value of a penetration test lies in how effectively the findings are communicated. During the Report Writing phase, our engineers consolidate their notes, evidence, and proof-of-concept (PoC) exploits into a comprehensive, actionable document. We prioritize clarity and precision, ensuring that both technical teams and executive stakeholders can easily grasp the security posture of the application.",
      "Each identified vulnerability is meticulously documented with a detailed description, step-by-step reproduction instructions, and the precise HTTP requests and responses required to trigger the issue. We assign realistic severity scores (such as CVSS) based on the actual business impact and the likelihood of exploitation, removing theoretical noise and focusing on genuine risk.",
      "Crucially, our reports provide clear, actionable remediation advice. We don't just point out the problems; we provide code-level recommendations, architectural guidance, and configuration best practices to help your developers fix the root cause. This ensures that the report serves as a practical roadmap for improving security, rather than just a list of flaws."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  {
    step: 8,
    name: "Remediation",
    description: [
      "Discovering vulnerabilities is only half the battle; fixing them is where real security is achieved. In the Remediation phase, SnapSec transitions from an offensive role to a collaborative partnership with your engineering and development teams. We provide ongoing support and expert consultation to ensure that the recommended fixes are implemented correctly and efficiently.",
      "We understand that patching vulnerabilities in production environments can be complex. Our team is available to discuss the nuances of specific findings, clarify reproduction steps, and brainstorm alternative remediation strategies if the ideal fix is technically unfeasible. We help prioritize the backlog, tackling critical issues first while managing technical debt.",
      "This collaborative approach bridges the gap between security and development. By working directly with your team, we not only ensure the current vulnerabilities are resolved but also help educate developers on secure coding practices. This proactive knowledge transfer empowers your team to write safer code in the future, ultimately raising the baseline security of your entire organization."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    step: 9,
    name: "Retest",
    description: [
      "Security fixes can sometimes be incomplete, or they might inadvertently introduce new vulnerabilities. The Retest phase is a critical quality assurance step where our engineers return to the application to rigorously validate the applied patches. We do not simply take the development team's word that an issue is resolved; we demand technical proof.",
      "Using the original proof-of-concept exploits developed during the initial assessment, we attempt to re-trigger the vulnerabilities. We also attempt to bypass the implemented fixes, testing edge cases and variations of the original attack payload to ensure the patch is robust and not just a superficial band-aid.",
      "If a vulnerability is found to be partially fixed or easily bypassed, we immediately communicate this to the development team with detailed feedback on why the fix failed. This iterative process continues until we can definitively confirm that the root cause has been addressed and the application is genuinely secure against the identified threats."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    )
  },
  {
    step: 10,
    name: "Retest Report",
    description: [
      "The final phase of our engagement is the delivery of the Retest Report. This document provides a definitive update on the security posture of the application following the remediation efforts. It serves as formal documentation of the progress made and the residual risk that remains.",
      "The Retest Report clearly outlines the status of every vulnerability identified in the initial assessment, marking them as 'Resolved', 'Partially Resolved', or 'Unresolved'. For issues that have been successfully patched, we provide updated evidence demonstrating the failure of the original exploits. For issues that remain, we reiterate the risk and provide updated guidance.",
      "This final deliverable is crucial for compliance, auditing, and executive peace of mind. It provides tangible proof of your organization's commitment to security and demonstrates a proactive approach to vulnerability management. The engagement concludes with a debriefing session to discuss the overall findings, the success of the remediation efforts, and strategic recommendations for long-term security improvements."
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    )
  }
];

const REPORT_STEPS = [
  {
    step: 1,
    name: "Title",
    description: "The name and core identifier of the vulnerability, establishing clear context for the issue.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    )
  },
  {
    step: 2,
    name: "Scoring and Rating",
    description: "Objective evaluation of the vulnerability using CVSS scoring to determine its severity (Critical, High, Medium, Low).",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    )
  },
  {
    step: 3,
    name: "Executive Summary",
    description: "A high-level, business-focused overview of the vulnerability's context and why it matters to the organization.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    )
  },
  {
    step: 4,
    name: "Description",
    description: "Deep technical breakdown detailing exactly what the vulnerability is, where it resides, and the root cause.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
    )
  },
  {
    step: 5,
    name: "Impact",
    description: "Explanation of what an attacker could achieve by exploiting the flaw, including data loss or system compromise.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    )
  },
  {
    step: 6,
    name: "Step to reproduce",
    description: "Step-by-step reproduction instructions and code snippets demonstrating exactly how the vulnerability can be exploited.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    )
  },
  {
    step: 7,
    name: "Recommended Fix",
    description: "Actionable, code-level recommendations and architectural advice to permanently resolve the identified security flaws.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    )
  }
];

function ReportStepIllustration({ step }) {
  if (step === 1) {
    return (
      <div className="bg-white border border-gray-200 rounded-[8px] p-md shadow-sm w-full font-sans">
         <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-xs">Vulnerability Title</div>
         <div className="text-[20px] font-bold text-black border-l-4 border-red-500 pl-sm">
           Broken Access Control: Admin Settings Bypass
         </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="bg-white border border-gray-200 rounded-[8px] p-md shadow-sm w-full font-sans">
         <div className="flex gap-md">
            <div className="bg-[#FAFAFA] border border-gray-200 p-sm rounded-[6px] flex flex-col items-center justify-center flex-1">
               <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-xs">Severity</div>
               <div className="text-[24px] font-bold text-red-600 leading-none">Critical</div>
            </div>
            <div className="bg-[#FAFAFA] border border-gray-200 p-sm rounded-[6px] flex flex-col items-center justify-center flex-1">
               <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-xs">CVSS Base Score</div>
               <div className="text-[24px] font-bold text-black leading-none">9.8</div>
            </div>
         </div>
         <div className="mt-sm bg-gray-100 rounded-[4px] p-xs text-center text-[11px] text-gray-600 font-mono">
            CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
         </div>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div className="bg-white border border-gray-200 rounded-[8px] p-md shadow-sm w-full font-sans">
         <div className="text-[14px] font-bold mb-sm text-gray-800">Executive Overview</div>
         <div className="text-[13px] text-gray-600 leading-[1.6]">
           During the assessment, our team identified a critical broken access control vulnerability in the core API gateway. This flaw allows any unauthenticated external user to elevate their privileges and access administrative functions. Immediate remediation is required to prevent widespread data compromise.
         </div>
      </div>
    );
  }
  if (step === 4) {
    return (
      <div className="bg-[#1E1E1E] text-gray-300 border border-gray-700 rounded-[8px] p-md shadow-lg font-mono text-[13px] leading-[1.6] w-full relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
         <div className="text-white font-bold mb-xs text-[15px]">## Technical Description</div>
         <div className="mt-sm text-gray-400 text-[12px]">
           The application endpoint <code className="bg-gray-800 text-green-300 px-xs py-[2px] rounded">PUT /api/v1/users/admin/settings</code> fails to properly validate the role of the user requesting the settings change. The backend controller relies on a client-supplied "role" parameter in the JSON payload rather than verifying the cryptographic signature of the session token. By intercepting the request and modifying the payload, an attacker can overwrite administrative configurations.
         </div>
      </div>
    );
  }
  if (step === 5) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-[8px] p-md shadow-sm w-full font-sans">
         <div className="text-[14px] font-bold mb-sm text-red-800 flex items-center gap-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Vulnerability Impact
         </div>
         <ul className="list-disc pl-md text-[13px] text-red-900 space-y-xs font-medium">
           <li>Full compromise of the application backend.</li>
           <li>Unauthorized extraction of all PII and sensitive user records.</li>
           <li>Ability to delete or alter data, leading to a complete loss of integrity and availability.</li>
         </ul>
      </div>
    );
  }
  if (step === 6) {
    return (
       <div className="bg-[#1E1E1E] text-gray-300 border border-gray-700 rounded-[8px] p-md shadow-lg font-mono text-[13px] leading-[1.6] w-full">
         <div className="flex items-center gap-xs mb-sm pb-xs border-b border-gray-700">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
           <span className="text-gray-400 text-[12px]">reproduction_steps.md</span>
         </div>
         <div className="text-white font-bold mb-xs text-[15px]">## Steps to Reproduce</div>
         <div className="mt-sm text-gray-400 space-y-xs">
           <p>1. <span className="text-blue-300">Login to Application</span> as a standard low-privileged user.</p>
           <p>2. Navigate to the <span className="text-blue-300">Settings page</span> and intercept the outgoing traffic using an intercepting proxy (e.g., Burp Suite).</p>
           <p>3. Update your profile and capture the <code className="bg-gray-800 text-green-300 px-xs py-[2px] rounded">PUT /api/v1/users/settings</code> request.</p>
           <p>4. In the JSON payload, inject the unauthorized parameter: <code className="bg-gray-800 text-green-300 px-xs py-[2px] rounded">"role": "SUPER_ADMIN"</code>.</p>
           <p>5. Forward the modified request to the server.</p>
           <p>6. Observe the <code className="bg-gray-800 text-yellow-300 px-xs py-[2px] rounded">200 OK</code> response, confirming the privilege escalation was successful.</p>
         </div>
       </div>
    );
  }
  if (step === 7) {
    return (
      <div className="bg-white border border-gray-200 rounded-[8px] p-md shadow-sm w-full">
         <div className="text-[14px] font-bold mb-sm text-green-700 flex items-center gap-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Recommended Fix
         </div>
         <ul className="list-decimal pl-md text-[13px] text-gray-700 space-y-xs font-medium">
           <li>Ensure that role validation occurs on the server-side against the authoritative database.</li>
           <li>Implement strict schema validation for all incoming requests, dropping unexpected fields like "role".</li>
         </ul>
         <div className="mt-md p-sm bg-blue-50 border border-blue-200 rounded-[6px] text-blue-900 text-[12px] leading-[1.5]">
            <strong className="block mb-[4px] text-blue-700">Developer Note:</strong> 
            Update the auth middleware (\`src/middleware/auth.ts\`) to reference the central RBAC policies and strip context-sensitive fields.
         </div>
      </div>
    );
  }
  return null;
}

const OurMethodologyPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [activeReportStep, setActiveReportStep] = useState(1);

  return (
    <main className="content z-1 relative flex flex-col bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO SECTION ── */}
      <section className="section-methodology-hero mt-[100px] lg:mt-[120px] bg-white">
        <div className="container">
          <div className="section-border section-border-top flex flex-col border-b border-gray-600 border-x-[0.5px]">
            <div className="flex flex-col items-center justify-center px-sm sm:px-xl lg:px-80px py-lg lg:py-[100px] gap-lg text-center">
              <div className="flex flex-col items-center gap-sm w-full">
                {/* Badge */}
                <span className="inline-flex items-center rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold tracking-[0.16em] uppercase bg-[#F5F5F5] text-black border border-gray-300">
                  Security Methodology
                </span>
                {/* Heading */}
                <h1 className="text-[36px] sm:text-[48px] font-semibold leading-[1.15] text-black tracking-tight mt-xs w-full max-w-[900px]">
                  Pentest Methodology
                </h1>
                {/* Description */}
                <p className="text-[15px] sm:text-[17px] text-gray-900 leading-[1.5] mt-sm max-w-[620px]">
                  Our rigorous, 10-phase approach combines comprehensive reconnaissance, manual exploit testing, access control modeling, and continuous validation to secure your critical applications.
                </p>
              </div>

              {/* Grid overview highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md mt-md pt-lg border-t border-gray-200 w-full max-w-[720px]">
                <div className="flex flex-col gap-[2px] items-center">
                  <span className="text-[18px] sm:text-[22px] font-bold text-black leading-none">10 Phases</span>
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">End-to-End audit</span>
                </div>
                <div className="flex flex-col gap-[2px] items-center">
                  <span className="text-[18px] sm:text-[22px] font-bold text-black leading-none">Manual</span>
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Adversarial focus</span>
                </div>
                <div className="flex flex-col gap-[2px] items-center">
                  <span className="text-[18px] sm:text-[22px] font-bold text-black leading-none">Unlimited</span>
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Retests Included</span>
                </div>
                <div className="flex flex-col gap-[2px] items-center">
                  <span className="text-[18px] sm:text-[22px] font-bold text-black leading-none">Real-Time</span>
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Reporting System</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS TRACKER WIDGET (INTERACTIVE EXPERIENCE) ── */}
      <section className="section-methodology-tracker bg-white">
        <div className="container">
          <div className="section-border grid grid-cols-1 lg:grid-cols-12 border-b border-gray-600 border-x-[0.5px]">

            {/* Left Column: Interactive Stepper (Span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 gap-md">
              <div className="flex flex-col gap-sm">

                <h2 className="text-[26px] sm:text-[30px] font-semibold leading-[1.2] text-black tracking-tight">
                  Our Methodology
                </h2>
                <p className="text-[13px] sm:text-[14px] text-gray-700 leading-[1.5]">
                  Select a testing phase to see how our ethical hacking team systematically reviews and hardens your systems.
                </p>
              </div>

              {/* Step Navigation Lists */}
              <div className="flex flex-col gap-[4px] mt-sm pt-md border-t border-gray-200">
                {STEPS.map((stepItem) => (
                  <button
                    key={stepItem.step}
                    onClick={() => setActiveStep(stepItem.step)}
                    className={`flex items-center gap-xs px-xs py-[6px] rounded-[4px] text-left border transition-all duration-200 ${activeStep === stepItem.step
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300 hover:bg-[#FAFAFA]'
                      }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border transition-colors shrink-0 ${activeStep === stepItem.step
                      ? 'bg-white text-black border-white'
                      : 'bg-[#F5F5F5] text-gray-900 border-gray-300'
                      }`}>
                      {stepItem.step}
                    </span>
                    <span className="text-[12px] font-semibold tracking-tight leading-none">{stepItem.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Detailed View (Span 8) */}
            <div className="lg:col-span-8 px-sm sm:px-xl lg:px-80px py-lg lg:py-88px bg-[#FAFAFA] flex flex-col justify-between relative min-h-[400px]">
              {/* Decorative backdrop noise */}
              <div className="noise absolute inset-0 z-0 opacity-[0.25]"></div>

              <div className="relative z-1 flex flex-col gap-md">
                {/* Active Step Indicator */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-sm w-full">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 bg-black text-white rounded-[8px] flex items-center justify-center">
                      {STEPS[activeStep - 1].icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phase {STEPS[activeStep - 1].step} of 10</span>
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-black leading-none mt-[2px]">{STEPS[activeStep - 1].name}</h3>
                    </div>
                  </div>
                </div>

                {/* Step Details */}
                <div className="flex flex-col gap-sm">
                  {STEPS[activeStep - 1].description.map((paragraph, index) => (
                    <p key={index} className="text-[15px] sm:text-[16px] text-gray-900 leading-[1.6] font-normal">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── REPORT SHOWCASE WIDGET ── */}
      <section className="section-report-showcase bg-white border-t border-gray-200">
        <div className="container">
          <div className="section-border grid grid-cols-1 lg:grid-cols-12 border-b border-gray-600 border-x-[0.5px]">

            {/* Left Column: Interactive Stepper (Span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 gap-md bg-white">
              <div className="flex flex-col gap-sm">
                <span className="text-[11px] font-bold text-gray-500 tracking-[0.16em] uppercase">
                  Actionable Deliverables
                </span>
                <h2 className="text-[26px] sm:text-[30px] font-semibold leading-[1.2] text-black tracking-tight">
                  The Pentest Report
                </h2>
                <p className="text-[13px] sm:text-[14px] text-gray-700 leading-[1.5]">
                  Our reports go beyond generic scanner output. We provide deep technical context, custom proof-of-concepts, and developer-friendly remediation guidance.
                </p>
              </div>

              {/* Step Navigation Lists */}
              <div className="flex flex-col gap-[4px] mt-sm pt-md border-t border-gray-200">
                {REPORT_STEPS.map((stepItem) => (
                  <button
                    key={stepItem.step}
                    onClick={() => setActiveReportStep(stepItem.step)}
                    className={`flex items-center gap-xs px-xs py-[6px] rounded-[4px] text-left border transition-all duration-200 ${activeReportStep === stepItem.step
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300 hover:bg-[#FAFAFA]'
                      }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border transition-colors shrink-0 ${activeReportStep === stepItem.step
                      ? 'bg-white text-black border-white'
                      : 'bg-[#F5F5F5] text-gray-900 border-gray-300'
                      }`}>
                      {stepItem.step}
                    </span>
                    <span className="text-[12px] font-semibold tracking-tight leading-none">{stepItem.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Detailed View & Illustration (Span 8) */}
            <div className="lg:col-span-8 px-sm sm:px-xl lg:px-80px py-lg lg:py-88px bg-[#FAFAFA] flex flex-col justify-center relative min-h-[400px]">
              <div className="noise absolute inset-0 z-0 opacity-[0.25]"></div>

              <div className="relative z-1 flex flex-col gap-lg lg:gap-xl w-full">
                {/* Text Description */}
                <div className="flex flex-col gap-sm w-full">
                  <div className="flex items-center gap-sm mb-xs">
                    <div className="w-8 h-8 bg-black text-white rounded-[6px] flex items-center justify-center">
                      {REPORT_STEPS[activeReportStep - 1].icon}
                    </div>
                    <h3 className="text-[18px] font-bold text-black leading-none">{REPORT_STEPS[activeReportStep - 1].name}</h3>
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6] font-normal">
                    {REPORT_STEPS[activeReportStep - 1].description}
                  </p>
                </div>

                {/* Markdown / Editor Illustration */}
                <div className="w-full flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-blue-500 opacity-5 blur-2xl rounded-full transform scale-150 z-0"></div>
                   <div className="relative z-1 w-full flex items-center justify-center">
                     <ReportStepIllustration step={activeReportStep} />
                   </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── VM MODULE REPORTING (MODERNIZING PENTEST REPORTING) ── */}
      <section className="section-vm-dashboard bg-white border-t border-gray-250">
        <div className="container">
          <div className="section-border flex flex-col gap-lg px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px]">
            <div className="flex flex-col items-center text-center gap-sm max-w-[800px] mx-auto">
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.16em] uppercase">
                Continuous Governance
              </span>
              <h2 className="text-[30px] sm:text-[36px] font-semibold text-black tracking-tight mt-xxs">
                Modernizing Pentest Reporting
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.6] max-w-[660px]">
                Discover how our Vulnerability Management (VM) module replaces static PDF reports with real-time streaming, automated workflows, and structured triage.
              </p>
            </div>

            <div className="w-full mt-md bg-white rounded-[12px] border border-gray-200 shadow-sm p-sm md:p-md overflow-hidden">
              <VMDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ── SLEEK CTA SECTION ── */}
      <section className="section-methodology-cta bg-white">
        <div className="container">
          <div className="section-border flex flex-col md:flex-row items-center justify-between gap-md px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px] bg-white">
            <div className="flex flex-col gap-xxs max-w-[620px]">
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.16em] uppercase">
                Secure Your Assets
              </span>
              <h2 className="text-[24px] sm:text-[30px] font-semibold text-black tracking-tight mt-xxs">
                Ready to Secure Your Organization?
              </h2>
              <p className="text-[14px] text-gray-900 leading-[1.5] mt-xxs">
                Get in touch with our experts to schedule a penetration test tailored to your business needs and infrastructure.
              </p>
            </div>

            <div className="flex items-center gap-sm shrink-0 mt-sm md:mt-0 w-full md:w-auto">
              <a
                href="/contact"
                className="button-primary-m flex items-center justify-center gap-xs px-lg py-sm rounded-[6px] text-[13px] font-bold uppercase tracking-wider text-center w-full md:w-auto shrink-0"
              >
                <span>Contact Us &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

// ─── VM Dashboard ────────────────────────────────────────
function VMDashboard() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  const metrics = [
    { value: '58', label: 'Target Scope Assets', change: 'Web, API, Mobile', up: true },
    { value: '142', label: 'Total Findings', change: 'Manual Verified', up: true },
    { value: '12', label: 'Critical & High', change: 'Immediate Action', up: false },
    { value: '94.2%', label: 'Retest Pass Rate', change: 'Verified Resolved', up: true },
  ];

  const pentestTargets = [
    { name: 'Core Web Application', type: 'app.snapsec.co (Web Frontend)', status: 'Audited', code: 'APP', color: '#004DFF' },
    { name: 'GraphQL Gateway API', type: 'api.snapsec.co/graphql (API)', status: 'Audited', code: 'GQL', color: '#059669' },
    { name: 'Internal Auth Service', type: 'Microservice OAuth Scope', status: 'Audited', code: 'ATH', color: '#4F46E5' },
    { name: 'iOS & Android Client', type: 'Mobile Application Binary', status: 'Audited', code: 'MBL', color: '#CA8A04' },
  ];

  const severityStatus = [
    { severity: 'Critical', open: 3, closed: 9, color: '#DC2626' },
    { severity: 'High', open: 9, closed: 27, color: '#EA580C' },
    { severity: 'Medium', open: 24, closed: 46, color: '#CA8A04' },
    { severity: 'Low', open: 11, closed: 13, color: '#2563EB' },
  ];

  const remediationStatus = [
    { label: 'Verified Fixed', pct: 94, color: '#059669', offset: 25 },
    { label: 'In Remediation', pct: 4, color: '#CA8A04', offset: 31 },
    { label: 'Pending Fix', pct: 2, color: '#DC2626', offset: 27 },
  ];

  const criticalSla = [
    { name: 'Critical Findings Fixed', comp: 100, breach: 0 },
    { name: 'High Findings Fixed', comp: 96, breach: 4 },
    { name: 'Medium Findings Fixed', comp: 95, breach: 5 },
  ];

  const pentestFindings = [
    { title: 'Broken Access Control: Admin settings bypass', method: 'Manual Exploitation', score: '9.8 (Critical)', status: 'Verified Fixed' },
    { title: 'SQL Injection: User search parameter endpoint', method: 'Manual Exploitation', score: '8.8 (High)', status: 'In Remediation' },
    { title: 'Stored Cross-Site Scripting (XSS) on /profile', method: 'Dynamic Security', score: '6.1 (Medium)', status: 'Verified Fixed' },
  ];

  const T_VM = {
    bg: '#FFFFFF', panel: '#F9FAFB', border: '#E5E7EB', borderLight: '#F3F4F6',
    text: '#111827', textSec: '#6B7280', textMuted: '#9CA3AF',
    accent: '#004DFF', critical: '#DC2626', high: '#EA580C',
    medium: '#CA8A04', low: '#2563EB', success: '#059669',
  };

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: T_VM.bg, borderRadius: '12px', border: `1px solid ${T_VM.border}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T_VM.border}`, padding: '0 24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex' }}>
            {['Pentest Scope', 'All Vulnerabilities', 'Reporting', 'Executive Summary'].map((tab, i) => (
              <div key={tab} style={{
                padding: '13px 14px 11px', fontSize: '13px',
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? T_VM.text : T_VM.textSec,
                borderBottom: i === 0 ? `2px solid ${T_VM.text}` : '2px solid transparent',
                marginBottom: '-1px', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>{tab}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T_VM.success, boxShadow: `0 0 0 3px #D1FAE5` }} />
            <span style={{ fontSize: 11, color: T_VM.textSec, fontWeight: 500 }}>Live · Pentest Engagement Active</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '14px 20px' }}>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '10px', marginBottom: '14px' }}>
            {metrics.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: T_VM.textSec, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: T_VM.text, fontFamily: "'Inter', sans-serif", lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: m.label.includes('Critical') ? T_VM.critical : T_VM.success }}>
                    {m.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Three-column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '10px', marginBottom: '14px' }}>

            {/* Column 1: Scoped Targets */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VM.text, marginBottom: '4px' }}>Pentest Targets</div>
              <div style={{ fontSize: '11px', color: T_VM.textMuted, marginBottom: '12px' }}>Scoped assets & application endpoints</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {pentestTargets.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 10px', borderRadius: '6px', border: `1px solid ${T_VM.borderLight}`, background: '#FFFFFF'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>{item.name}</span>
                      <span style={{ fontSize: '9px', color: T_VM.textMuted }}>{item.type}</span>
                    </div>
                    <span style={{
                      fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                      backgroundColor: item.status === 'Audited' ? '#F0FDF4' : '#FEF3C7',
                      color: item.status === 'Audited' ? T_VM.success : T_VM.medium
                    }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Remediation Progress Donut Chart */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VM.text, marginBottom: '4px' }}>Remediation Progress</div>
              <div style={{ fontSize: '11px', color: T_VM.textMuted, marginBottom: '16px' }}>Vulnerabilities fixed & retested</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg width="130" height="130" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="#E5E7EB" strokeWidth="4.5" />
                    {remediationStatus.map((item, idx) => (
                      <circle
                        key={idx}
                        cx="20"
                        cy="20"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="4.5"
                        strokeDasharray={`${item.pct} ${100 - item.pct}`}
                        strokeDashoffset={item.offset}
                      />
                    ))}
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif"
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: T_VM.text, lineHeight: 1 }}>94.2%</span>
                    <span style={{ fontSize: '9px', color: T_VM.textSec, fontWeight: 500, marginTop: '2px' }}>Resolved</span>
                  </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                  {remediationStatus.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '9px', color: T_VM.textSec, whiteSpace: 'nowrap' }}>{item.label} ({item.pct}%)</span>
                    </div>
                  ))}
                </div>
                <div style={{ width: '100%', borderTop: `1px solid ${T_VM.borderLight}`, paddingTop: '10px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {criticalSla.map((d, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>{d.name}</span>
                      <span style={{ color: T_VM.success, fontWeight: 600, fontSize: '10px' }}>{d.comp}% Fixed</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column 3: Severity Breakdown */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
              style={{ padding: '13px', borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, background: T_VM.panel }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: T_VM.text, marginBottom: '4px' }}>Pentest Findings</div>
              <div style={{ fontSize: '11px', color: T_VM.textMuted, marginBottom: '12px' }}>Open vs resolved by severity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {severityStatus.map((item, i) => {
                  const total = item.open + item.closed;
                  const openPct = Math.round((item.open / total) * 100);
                  const closedPct = 100 - openPct;
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>{item.severity}</span>
                        <span style={{ fontSize: '9px', color: T_VM.textSec }}>
                          <strong style={{ color: item.color }}>{item.open} open</strong> / {item.closed} res
                        </span>
                      </div>
                      <div style={{ height: '6px', background: T_VM.borderLight, borderRadius: 99, display: 'flex', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }} animate={inView ? { width: `${openPct}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
                          style={{ height: '100%', background: item.color }} />
                        <motion.div
                          initial={{ width: 0 }} animate={inView ? { width: `${closedPct}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.65 + i * 0.05 }}
                          style={{ height: '100%', background: '#10B981', opacity: 0.4 }} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ borderTop: `1px solid ${T_VM.borderLight}`, paddingTop: '10px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: T_VM.text }}>Manual Exploit Verification</span>
                    <span style={{ fontSize: '9px', color: T_VM.success, fontWeight: 600, background: '#E6F4EA', padding: '1px 5px', borderRadius: '3px' }}>100% Verified</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '9px', color: T_VM.textSec }}>
                    <span>• <strong>142</strong> findings manually tested and documented</span>
                    <span>• <strong>Zero</strong> false positives guaranteed by security team</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Inbox Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ borderRadius: '8px', border: `1px solid ${T_VM.borderLight}`, overflowX: 'auto' }}>
            <div style={{ minWidth: '700px' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '9px 20px', background: T_VM.panel, borderBottom: `1px solid ${T_VM.borderLight}`,
            }}>
              {['FINDING & CVE TITLE', 'TEST METHOD', 'SEVERITY SCORE', 'RETEST STATUS'].map(h => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: T_VM.textMuted, letterSpacing: '0.06em' }}>{h}</span>
              ))}
            </div>
            {pentestFindings.map((vul, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.82 + i * 0.06 }}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  padding: '10px 20px', background: '#fff', alignItems: 'center',
                  borderBottom: i < pentestFindings.length - 1 ? `1px solid ${T_VM.borderLight}` : 'none',
                }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: T_VM.text, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}>
                  {vul.title}
                </span>
                <span style={{ fontSize: '11px', color: T_VM.textSec }}>{vul.method}</span>
                <span style={{ fontSize: '11px', color: vul.score.includes('Critical') || vul.score.includes('High') ? T_VM.critical : T_VM.medium, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{vul.score}</span>
                <span style={{
                  fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '4px', display: 'inline-block', width: 'fit-content',
                  background: vul.status === 'Verified Fixed' ? '#F0FDF4' : '#FFFBEB',
                  color: vul.status === 'Verified Fixed' ? T_VM.success : T_VM.medium
                }}>
                  {vul.status}
                </span>
              </motion.div>
            ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

export default OurMethodologyPage;
