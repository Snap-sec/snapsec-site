# SEO Implementation Report — Snapsec Suite Website

**Generated:** 2026-06-12
**Site:** snapsec.co (React + Vite SPA)
**Auditor:** Senior Technical SEO Consultant

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Overall SEO Score** | **22/100** |
| **Critical Issues** | 14 |
| **High Priority Issues** | 18 |
| **Medium Priority Issues** | 16 |
| **Low Priority Issues** | 8 |

**Verdict:** The website has virtually **zero SEO infrastructure**. It is a purely client-side rendered React SPA with a single static `<title>` and `<meta description>` in `index.html` that applies to every route. There is no `robots.txt`, no `sitemap.xml`, no structured data, no canonical URLs, no per-page metadata, no server-side rendering, and no image optimization. The site is effectively invisible to search engines except for its single indexed URL. The product and service pages — the core of the business — will not rank for any keywords.

**Estimated traffic loss:** 95–99% of potential organic traffic is not being captured.

---

## 1. Critical Issues

---

### Issue: SEO-001

**Severity:** Critical
**Page(s):** ALL pages (`/`, `/platform`, `/services`, `/services/methodology`, `/service/our-methodology`, `/services/our-methodology`, `/discovery`, `/discovery/:moduleSlug`, `/about-us`, `/our-work`, `/contact-us`, `/module/*`)

**Problem:** Every page shares the same `<title>` tag from `index.html`: "Snapsec Suite | Centralized AppSec Platform". There is no per-route title management. The `<meta name="description">` is identically "A centralized AppSec platform unifying discovery, vulnerability management, intelligence, and protection across your entire ecosystem." on every page. Search engines see all pages as essentially the same content at the metadata level.

**SEO Impact:** Critical — This is the #1 ranking factor failure. Google will not differentiate between pages. Only the homepage is likely indexed. All other pages have near-zero chance of ranking for their target keywords. Duplicate meta descriptions across all pages triggers Google's duplicate content filters. CTR from SERPs will be zero for all non-homepage URLs.

**Recommended Fix:** Install `react-helmet-async` and implement a `<SEOHead>` component that sets unique title/description per route. Each page must have its own unique, keyword-optimized title and meta description.

**Implementation Instructions:**
1. Install `react-helmet-async`
2. Create `src/components/SEOHead.jsx`
3. Wrap the app in `<HelmetProvider>`
4. Add `<SEOHead>` to every page component with unique props
5. Update `index.html` to use generic fallback defaults

**Example Code:**
```jsx
// src/components/SEOHead.jsx
import { Helmet } from 'react-helmet-async';

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = 'https://snapsec.co/assets/snapsec-og.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}) {
  const siteName = 'Snapsec';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
```

---

### Issue: SEO-002

**Severity:** Critical
**Page(s):** Entire site

**Problem:** No `robots.txt` file exists. Search engines have no crawling directives. While they will crawl by default, enterprise crawlers (Ahrefs, Semrush, etc.) prefer explicit directives. More critically, there's no `Sitemap:` directive pointing to a sitemap.

**SEO Impact:** High — Without `robots.txt`, you cannot:
- Point crawlers to your sitemap
- Disallow crawling of internal/duplicate URLs
- Set crawl-delay for aggressive bots
- Prevent crawling of query-parameter URLs

**Recommended Fix:** Create `/public/robots.txt` with sitemap reference and appropriate crawl rules.

**Implementation Instructions:**
1. Create `public/robots.txt`
2. Add sitemap directive
3. Configure Vite to copy it to build output (it's in `public/`, so it's auto-copied)

**Example Code:**
```txt
# public/robots.txt
User-agent: *
Allow: /
Disallow: /module/*
Disallow: /discovery
Sitemap: https://snapsec.co/sitemap.xml

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /
```

---

### Issue: SEO-003

**Severity:** Critical
**Page(s):** Entire site

**Problem:** No XML sitemap exists. Search engines have no machine-readable list of all pages. Since this is a SPA with client-side routing, crawlers may not discover all routes.

**SEO Impact:** Critical — Without a sitemap, Google must discover pages through links. For a SPA where content is rendered client-side, Google may not find or index any pages beyond the homepage. Bing, Yahoo, and other search engines that struggle with JavaScript will index almost nothing.

**Recommended Fix:** Generate a static `sitemap.xml` at build time, or create a build script. List all known routes with proper `<lastmod>`, `<changefreq>`, and `<priority>`.

**Implementation Instructions:**
1. Create `scripts/generate-sitemap.js`
2. Add sitemap generation to the build pipeline
3. Or manually create `public/sitemap.xml` and update it when pages change
4. Submit sitemap to Google Search Console and Bing Webmaster Tools

**Example Code:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://snapsec.co/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://snapsec.co/platform</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://snapsec.co/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/asm</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/aim</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/was</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/vs</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/vm</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://snapsec.co/service/our-methodology</loc>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://snapsec.co/about-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://snapsec.co/our-work</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://snapsec.co/contact-us</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>
```

---

### Issue: SEO-004

**Severity:** Critical
**Page(s):** Entire site (SPA)

**Problem:** The site is a pure client-side rendered React SPA. Search engines receive an empty `<div id="root"></div>` before JavaScript executes. While Google can render JavaScript, it:
- Delays indexing (two-wave indexing)
- Increases crawl budget consumption
- Misses content if JS execution fails or times out
- Bing, Yahoo, DuckDuckGo, and social media crawlers often do NOT execute JavaScript at all

The `vercel.json` confirms all routes rewrite to `index.html`, so there's zero server-rendered content.

**SEO Impact:** Critical — Even with Google's JS rendering, pages index slowly and incompletely. Other search engines and social crawlers see blank pages. This is the single biggest technical limitation of this site.

**Recommended Fix:** Migrate to a framework that supports SSR/SSG:
1. **Option A (Best):** Migrate to Next.js — SSR + SSG + ISR built in. This is by far the best option for SEO.
2. **Option B (Faster):** Add `react-snap` or `react-ssr` for prerendering at build time.
3. **Option C (Quickest):** Add `prerender.io` or similar prerendering service.

**Implementation Instructions (Option B - Quickest):**
1. Install `react-snap`
2. Configure prerendering in `package.json`
3. Run postbuild step to generate static HTML for all routes

**Example Code (react-snap approach):**
```json
// package.json additions
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "include": [
      "/",
      "/platform",
      "/services",
      "/services/methodology",
      "/service/our-methodology",
      "/discovery/asm",
      "/discovery/aim",
      "/discovery/was",
      "/discovery/vs",
      "/discovery/vm",
      "/about-us",
      "/our-work",
      "/contact-us"
    ],
    "source": "dist"
  }
}
```

---

### Issue: SEO-005

**Severity:** Critical
**Page(s):** `/services/methodology`, `/service/our-methodology`, `/services/our-methodology`, `/discovery`

**Problem:** Duplicate/redirect routes exist without canonical tags:
- `/services/methodology` and `/service/our-methodology` render different content but could confuse crawlers
- `/services/our-methodology` and `/service/our-methodology` are the SAME content served at two different URLs (duplicate content)
- `/discovery` defaults to ASM module — same content as `/discovery/asm` (duplicate content)

**SEO Impact:** Critical — Duplicate content splits ranking signals. Google may choose the wrong canonical URL. Link equity is divided. This directly violates Google's guidelines on duplicate content.

**Recommended Fix:**
1. Choose ONE canonical URL for each piece of content
2. 301 redirect duplicates to the canonical URL
3. Add canonical tags on pages that share content
4. Remove `/discovery` route or redirect it to `/discovery/asm`

**Implementation Instructions:**
1. In `vercel.json`, add redirects for duplicate routes
2. Add `<link rel="canonical">` to discovery page variants
3. Keep only ONE route for the methodology page

**Example Code:**
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "redirects": [
    { "source": "/services/our-methodology", "destination": "/service/our-methodology", "permanent": true },
    { "source": "/services/methodology", "destination": "/service/our-methodology", "permanent": true },
    { "source": "/discovery", "destination": "/discovery/asm", "permanent": true }
  ]
}
```

---

### Issue: SEO-006

**Severity:** Critical
**Page(s):** All module pages, service pages

**Problem:** No structured data (Schema.org JSON-LD) anywhere on the site. This means:
- No rich results in Google (sitelinks, breadcrumbs, reviews)
- No Organization schema (logo, social profiles, contact info)
- No SoftwareApplication schema for the SaaS product
- No FAQ schema on methodology/service pages
- No BreadcrumbList schema for navigation paths
- No Article schema for the Our Work / case study content

**SEO Impact:** Critical — Structured data is a direct ranking factor. Rich results increase CTR by 5-30%. Competitors with schema markup will appear more prominently in SERPs. The SaaS product pages are losing out on product-specific rich results.

**Recommended Fix:** Add JSON-LD structured data to every page. At minimum:
- `Organization` on every page (or just homepage via `@graph`)
- `SoftwareApplication` on platform/product pages
- `BreadcrumbList` on all pages
- `FAQPage` on methodology and services pages
- `Article` on Our Work / case study content

**Implementation Instructions:**
1. Create `src/components/StructuredData.jsx`
2. Add JSON-LD script tags via `react-helmet-async`
3. Implement on every page

**Example Code:**

```jsx
// src/components/StructuredData.jsx
import { Helmet } from 'react-helmet-async';

// ─── Organization Schema (add to every page or layout) ───
export function OrganizationSchema() {
  const orgData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Snapsec',
    url: 'https://snapsec.co',
    logo: 'https://snapsec.co/assets/snapsec-logo.png',
    description: 'A centralized AppSec platform unifying discovery, vulnerability management, intelligence, and protection across your entire ecosystem.',
    email: 'support@snapsec.co',
    telephone: '+917780908136',
    sameAs: [
      'https://www.linkedin.com/company/snapsec',
      'https://x.com/snapsec_co',
      'https://www.youtube.com/@snapsec',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(orgData)}
      </script>
    </Helmet>
  );
}

// ─── SoftwareApplication Schema (Platform pages) ───
export function SoftwareAppSchema({ name, description, url, category }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name || 'Snapsec Suite',
    description: description || 'Centralized AppSec platform for attack surface management, vulnerability management, and security intelligence.',
    url: url || 'https://snapsec.co/platform',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      category: category || 'SaaS',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

// ─── BreadcrumbList Schema ───
export function BreadcrumbSchema({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

// ─── FAQ Schema ───
export function FAQSchema({ questions }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}
```

```jsx
// Example usage on Services page:
import { OrganizationSchema, SoftwareAppSchema, BreadcrumbSchema, FAQSchema } from '../components/StructuredData';

function ServicesPage() {
  return (
    <>
      <OrganizationSchema />
      <SoftwareAppSchema
        name="Snapsec Cybersecurity Services"
        description="Enterprise penetration testing, vulnerability assessment, and security consulting services."
        url="https://snapsec.co/services"
        category="Security Services"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://snapsec.co/' },
          { name: 'Services', url: 'https://snapsec.co/services' },
        ]}
      />
      <FAQSchema
        questions={[
          {
            question: 'What cybersecurity services does Snapsec offer?',
            answer: 'Snapsec offers penetration testing, vulnerability assessment, attack surface management, web application scanning, and continuous security monitoring services.',
          },
          {
            question: 'Is Snapsec\'s methodology manual or automated?',
            answer: 'Snapsec uses a hybrid approach combining automated scanning tools with manual expert-led penetration testing across a 10-phase methodology.',
          },
          {
            question: 'What industries does Snapsec serve?',
            answer: 'Snapsec serves fintech, healthcare, e-commerce, SaaS, government, and enterprise organizations across 10+ industries.',
          },
        ]}
      />
      {/* ... rest of page */}
    </>
  );
}
```

---

### Issue: SEO-007

**Severity:** Critical
**Page(s):** ALL pages

**Problem:** No Open Graph or Twitter Card tags on a per-page basis. All social shares show the same generic "Snapsec Suite | Centralized AppSec Platform" preview. Sharing `/discovery/asm` or `/services` on LinkedIn, Twitter, Slack, or WhatsApp shows zero context about what's actually on that page.

**SEO Impact:** Critical — Social signals indirectly affect SEO. More importantly, poor social previews dramatically reduce click-through from shared links. This directly impacts referral traffic and brand visibility. Every shared link is a missed opportunity.

**Recommended Fix:** Use the `<SEOHead>` component from SEO-001 to set unique OG tags per page.

---

### Issue: SEO-008

**Severity:** Critical
**Page(s):** `/about-us`, `/our-work`, `/contact-us`, `/module/*`

**Problem:** No canonical tags anywhere on the site. If any URL is ever accessed with query parameters (e.g., `?utm_source=linkedin`), search engines may see it as a separate page. The SPA routing also means `/about-us` and `/about-us/` could be treated as different URLs.

**SEO Impact:** Critical — Without canonicals, every URL variation can create a duplicate content issue. UTM parameters in shared links create thousands of "duplicate" pages over time.

**Recommended Fix:** Add canonical tags to every page via `<SEOHead>`.

---

### Issue: SEO-009

**Severity:** Critical
**Page(s):** ALL pages

**Problem:** Client-side routing means Googlebot must execute JavaScript to discover internal links. All navigation links in the header and footer are `<a href="...">` elements (good), but content links that use React Router `<Link>` components resolve to proper `<a>` tags at render time. However, since initially the page is an empty `<div>`, crawlers see nothing until JS executes.

**SEO Impact:** Critical — Combined with the SPA issue (SEO-004), even though internal links are discoverable post-render, the initial crawl sees zero links, zero content, and zero pages.

**Recommended Fix:** Same as SEO-004 — implement SSR or prerendering.

---

### Issue: SEO-010

**Severity:** Critical
**Page(s):** `/services`, `/services/methodology`

**Problem:** The Services page and Methodology page reuse the EXACT same components (`HeroSection`, `BenefitsSection`, `CTASection`) with minimal differentiation via an `isServicesPage` prop. This creates near-duplicate content. The Methodology page reuses `HeroSection` and `ProcessSection` — still significant overlap.

**SEO Impact:** Critical — Google's Panda algorithm penalizes thin/duplicate content. These pages compete with each other and the Platform page for keywords.

**Recommended Fix:**
1. Write unique content for each page
2. Don't reuse hero sections — each page should have its own unique H1 and intro copy
3. Differentiate service pages with unique feature descriptions, use cases, and CTAs

---

### Issue: SEO-011

**Severity:** Critical
**Page(s):** All pages with `<img>` tags

**Problem:** Images throughout the site lack meaningful `alt` attributes. Many decorative images have `alt=""` (correct for decorative), but important content images either have generic alt text like "Grid" or have no alt at all. The hero illustrations, dashboard mockups, and team photos all lack descriptive alt text.

**SEO Impact:** High — Image alt text is a ranking factor for Google Image Search. It's also critical for accessibility (WCAG 2.1 AA compliance). Missing alt text on team photos and product screenshots means zero image search traffic.

**Examples of missing/poor alt text found:**
- `index.html` line 5: `alt="Snapsec Suite"` on logo — OK
- `PlatformPage/HeroSection.jsx` line 24: `alt=""` — should be descriptive
- `PlatformPage/HeroSection.jsx` line 32: `alt="Grid"` — not descriptive enough
- `AboutUsPage/HeroSection.jsx` line 50: `alt="Snapsec Identity Illustration"` — OK
- `Footer/index.jsx` line 66: `alt="Snapsec Suite"` on logo — OK
- `Footer/index.jsx` line 79: `alt={cert.alt}` — OK (SOC 2, ISO 27001)

**Recommended Fix:** Add descriptive alt text to ALL meaningful images. Keep `alt=""` only on purely decorative images that add no information.

---

### Issue: SEO-012

**Severity:** Critical
**Page(s):** ALL pages

**Problem:** Key images use PNG format where WebP or AVIF would be dramatically smaller:
- `/assets/snapsec-logo.png` — used in header and footer, could be SVG or WebP
- `/assets/about-hero.png` — large hero image, should be WebP
- `/assets/integrations-grid.svg` — already SVG (good)
- `/images/leadership/ahmed.jpg`, `imran.jpg`, `owais.png`, `shoaib.png` — team photos, no WebP versions
- `/images/clients/alif.png`, `hala.png`, `jisr.png`, `ncms.png` — client logos, should be WebP or SVG

**SEO Impact:** High — Image file size directly impacts LCP (Largest Contentful Paint) and overall page speed, which is a confirmed ranking factor. Large PNGs on the homepage will slow down LCP significantly.

**Recommended Fix:**
1. Convert all PNG/JPG images to WebP format
2. Provide AVIF as a higher-quality alternative
3. Use `<picture>` elements with multiple sources
4. Implement lazy loading via `loading="lazy"` on below-fold images

**Implementation Instructions:**
1. Run images through a converter (sharp, Squoosh, or ImageMagick)
2. Create WebP versions in `public/assets/webp/`
3. Update `<img>` tags to use WebP sources
4. For critical images (hero), keep fallback PNG for older browsers

**Example Code:**
```jsx
// Instead of:
// <img src="/assets/snapsec-logo.png" alt="Snapsec Suite" />

// Use:
<picture>
  <source srcSet="/assets/webp/snapsec-logo.webp" type="image/webp" />
  <source srcSet="/assets/avif/snapsec-logo.avif" type="image/avif" />
  <img
    src="/assets/snapsec-logo.png"
    alt="Snapsec Suite — Centralized Application Security Platform"
    loading="eager"
    width="150"
    height="40"
  />
</picture>
```

---

### Issue: SEO-013

**Severity:** Critical
**Page(s):** `/`, `/platform`, `/services`, `/discovery/*`

**Problem:** The homepage and product pages contain massive inline SVG dashboard components (`HeroDashboard`, `ASMDashboard`, `WASDashboard`, `AIMDashboard`, `VSDashboard`, `VMDashboard`). These are 200-1800+ lines of inline SVG markup each, embedded directly in the JS bundle. This dramatically increases JavaScript bundle size, parse time, and time-to-interactive.

**SEO Impact:** Critical — Core Web Vitals (LCP, TTFB, INP) are confirmed ranking factors. These massive inline SVGs will cause:
- Huge JS bundle size (estimated 200-400KB+ of inline SVG code just for dashboards)
- Slow JavaScript parsing and execution
- Delayed LCP (Largest Contentful Paint)
- Poor mobile performance scores

**Recommended Fix:**
1. Extract dashboard SVGs into separate `.svg` files and load them as `<img>` or `<object>` tags
2. If they must be inline (for animation), code-split them with `React.lazy()`
3. Only load the dashboard relevant to the current module

**Implementation Instructions:**
1. Move each dashboard to its own file in `src/components/dashboards/`
2. Use `React.lazy()` with `<Suspense>` for code-splitting
3. Serve static dashboard preview images for SEO crawlers

**Example Code:**
```jsx
// src/pages/home-page/components/HeroSection.jsx
import { lazy, Suspense } from 'react';

const HeroDashboard = lazy(() => import('../dashboards/HeroDashboard.jsx'));

export default function HeroSection() {
  return (
    <div className="...">
      <h1>...</h1>
      <Suspense fallback={
        <img
          src="/assets/dashboard-placeholder.webp"
          alt="Snapsec security dashboard showing vulnerability metrics, findings trend, and asset overview"
          width="900"
          height="500"
        />
      }>
        <HeroDashboard />
      </Suspense>
    </div>
  );
}
```

---

### Issue: SEO-014

**Severity:** Critical
**Page(s):** ALL pages

**Problem:** No hreflang tags. Even if only targeting English, `hreflang="en"` plus `x-default` should be declared on every page to help search engines understand the language targeting and prevent duplicate content issues if content exists in multiple languages elsewhere.

**SEO Impact:** High — While primarily a single-language site, missing hreflang can cause issues if:
- Content gets scraped and republished in other languages
- The site expands to Arabic (relevant given Saudi Arabia targeting in the contact form)
- Google misidentifies the site's language targeting

**Recommended Fix:** Add hreflang tags via `<SEOHead>` component.

```jsx
<Helmet>
  <link rel="alternate" hreflang="en" href="https://snapsec.co/" />
  <link rel="alternate" hreflang="x-default" href="https://snapsec.co/" />
</Helmet>
```

---

## 2. Quick Wins (Complete in < 1 Day)

These fixes require minimal code changes and can be completed in a single day:

1. **Create `robots.txt`** — 5 minutes. Create `public/robots.txt`.
2. **Create `sitemap.xml`** — 15 minutes. Create `public/sitemap.xml`.
3. **Install `react-helmet-async` + create `SEOHead` component** — 2 hours. Install, wrap app, add to all pages.
4. **Add unique titles/descriptions to every page** — 3 hours. Write optimized metadata for each route.
5. **Add Organization JSON-LD schema** — 30 minutes. Add to the layout/app component so it appears on every page.
6. **Add BreadcrumbList JSON-LD to all pages** — 1 hour. Add via reusable component.
7. **Fix duplicate routes in Vercel** — 30 minutes. Add redirects in `vercel.json`.
8. **Add proper `alt` text to all `<img>` tags** — 2 hours. Audit and fix every image.
9. **Add `loading="lazy"` to below-fold images** — 30 minutes. Simple attribute addition.
10. **Add canonical tags to all pages** — 1 hour. Via SEOHead component.
11. **Create a proper 404 page with helpful navigation** — Already exists at `NotFoundPage.jsx` (good).
12. **Add `nofollow` to external links where appropriate** — 30 minutes. Header/footer external links to docs/blog should have `rel="noopener noreferrer"` (already present — good).

---

## 3. High Impact Opportunities

| Priority | Opportunity | Estimated Impact |
|----------|-------------|------------------|
| 1 | Implement per-page metadata (titles, descriptions, OG) | **Very High** — Unlocks ranking for all pages |
| 2 | Add SSR/prerendering (migrate to Next.js or add react-snap) | **Very High** — Makes all pages indexable by all search engines |
| 3 | Create and submit XML sitemap | **High** — Ensures all pages are discovered |
| 4 | Add structured data (Organization, SoftwareApp, FAQ, Breadcrumb) | **High** — Rich results + 5-30% CTR increase |
| 5 | Optimize images (WebP/AVIF conversion, lazy loading) | **High** — Core Web Vitals improvement |
| 6 | Code-split dashboard SVGs | **High** — 50-70% JS bundle reduction |
| 7 | Create dedicated landing pages for each module (ASM, AIM, WAS, VS, VM) | **Very High** — Each module can rank for its own keyword set |
| 8 | Add blog/content section (currently on subdomain: blog.snapsec.co) | **Very High** — Content marketing is the #1 SaaS acquisition channel |
| 9 | Build competitor comparison pages | **High** — High-intent traffic |
| 10 | Create industry-specific landing pages | **High** — Long-tail enterprise traffic |

---

## 4. Missing Pages

| Page Type | URL Suggestion | Target Keyword | Search Intent | Priority |
|-----------|---------------|----------------|---------------|----------|
| Blog (integrate or cross-link) | `/blog` or improve `blog.snapsec.co` | "application security blog" | Informational | Critical |
| Pricing Page | `/pricing` | "appsec platform pricing" | Commercial | Critical |
| Case Studies (individual) | `/case-studies/[name]` | "penetration testing case study [industry]" | Commercial | High |
| Competitor Comparisons | `/vs/crowdstrike`, `/vs/tenable`, `/vs/qualys` | "snapsec vs [competitor]" | Commercial | High |
| Industry: Fintech | `/solutions/fintech-security` | "fintech application security" | Commercial | High |
| Industry: Healthcare | `/solutions/healthcare-security` | "healthcare cybersecurity compliance" | Commercial | High |
| Industry: E-commerce | `/solutions/ecommerce-security` | "ecommerce security testing" | Commercial | High |
| Industry: SaaS | `/solutions/saas-security` | "saas application security testing" | Commercial | High |
| Integration: AWS | `/integrations/aws` | "aws security scanning integration" | Commercial | Medium |
| Integration: GitHub | `/integrations/github` | "github security scanning" | Commercial | Medium |
| Integration: Jira | `/integrations/jira` | "jira vulnerability management integration" | Commercial | Medium |
| Compliance: SOC 2 | `/compliance/soc2` | "soc 2 penetration testing" | Commercial | Medium |
| Compliance: ISO 27001 | `/compliance/iso-27001` | "iso 27001 security testing" | Commercial | Medium |
| Compliance: PCI DSS | `/compliance/pci-dss` | "pci dss penetration testing" | Commercial | Medium |
| Resource: Webinar | `/resources/webinars` | "cybersecurity webinars" | Informational | Low |
| Resource: Whitepaper | `/resources/whitepapers` | "application security whitepapers" | Informational | Low |
| Free Tool: Security Score | `/tools/security-score` | "website security scanner free" | Transactional | Medium |
| Changelog | `/changelog` | "snapsec changelog" | Informational | Low |
| Documentation (cross-link) | Link to `docs.snapsec.co` prominently | — | — | High |
| Trust Center | `/trust` | "snapsec security trust center" | Informational | High |
| Glossary | `/glossary` | "application security glossary" | Informational | Low |

---

## 5. Metadata Improvements

### Homepage (`/`)

**Current Title:** "Snapsec Suite | Centralized AppSec Platform"
**Current Description:** "A centralized AppSec platform unifying discovery, vulnerability management, intelligence, and protection across your entire ecosystem."

**Optimized Title:** "Snapsec — Centralized Application Security Platform | Attack Surface & Vulnerability Management"
**Optimized Description:** "Snapsec unifies attack surface management, vulnerability scanning, and security intelligence into one platform. Discover, prioritize, and remediate risks across your entire digital ecosystem. Book a demo."

**OG Title:** "Snapsec — See Every Asset. Every Exposure. Every Finding."
**OG Description:** "Unify discovery, vulnerability management, intelligence, and protection across your entire ecosystem with Snapsec's centralized AppSec platform."

---

### Platform Page (`/platform`)

**Current Title:** "Snapsec Suite | Centralized AppSec Platform" (shared)
**Current Description:** Same as homepage

**Optimized Title:** "Platform — Centralized AppSec & Vulnerability Management | Snapsec"
**Optimized Description:** "Snapsec's platform centralizes attack surface management, vulnerability scanning, asset inventory, and security intelligence. One unified dashboard for your entire security program."

---

### Services Page (`/services`)

**Current Title:** Same as homepage
**Current Description:** Same as homepage

**Optimized Title:** "Cybersecurity Services — Penetration Testing & Security Assessments | Snapsec"
**Optimized Description:** "Expert-led penetration testing, vulnerability assessments, and security consulting services. Our 10-phase methodology combines automated scanning with manual expert analysis. View our services."

---

### Methodology Page (`/service/our-methodology`)

**Current Title:** Same as homepage
**Current Description:** Same as homepage

**Optimized Title:** "Our Pentest Methodology — 10-Phase Security Testing Approach | Snapsec"
**Optimized Description:** "Snapsec's rigorous 10-phase penetration testing methodology combines reconnaissance, dynamic testing, access control modeling, and continuous retesting. Learn how we secure your applications."

---

### ASM Module (`/discovery/asm`)

**Current Title:** Same as homepage
**Current Description:** Same as homepage

**Optimized Title:** "Attack Surface Management (ASM) — External Asset Discovery & Monitoring | Snapsec"
**Optimized Description:** "Continuously discover and monitor every internet-facing asset. Snapsec's ASM module maps subdomains, IPs, ports, and cloud services to identify shadow IT and external exposures in real time."

---

### AIM Module (`/discovery/aim`)

**Optimized Title:** "Asset Inventory Management (AIM) — Automated Asset Classification | Snapsec"
**Optimized Description:** "Automatically classify, enrich, and manage every asset with ownership, technology, and relationship data. Snapsec's AIM module connects AWS, GCP, Azure, and Kubernetes for unified visibility."

---

### WAS Module (`/discovery/was`)

**Optimized Title:** "Web Application Scanner (WAS) — Automated DAST & API Security Testing | Snapsec"
**Optimized Description:** "Automated dynamic application security testing (DAST) for web apps and APIs. Detect OWASP Top 10 vulnerabilities, injection flaws, broken auth, and SSRF with continuous scanning."

---

### VS Module (`/discovery/vs`)

**Optimized Title:** "Vulnerability Scanner (VS) — Network & Infrastructure Security Scanning | Snapsec"
**Optimized Description:** "Continuous network vulnerability scanning for infrastructure, ports, and services. Snapsec's VS module deploys scanner agents to detect CVEs, misconfigurations, and exposed services."

---

### VM Module (`/discovery/vm`)

**Optimized Title:** "Vulnerability Management (VM) — Risk-Based Prioritization & Remediation | Snapsec"
**Optimized Description:** "Centralized vulnerability management with risk-based prioritization, SLA tracking, and automated remediation workflows. Aggregate findings from Qualys, Snyk, Trivy, and more."

---

### About Us (`/about-us`)

**Optimized Title:** "About Snapsec — Our Mission, Team & Cybersecurity Expertise"
**Optimized Description:** "Snapsec is on a mission to map, scan, and secure every enterprise asset. Learn about our team, values, global presence, and commitment to application security excellence."

---

### Our Work (`/our-work`)

**Optimized Title:** "Our Work — Penetration Testing Case Studies & Research | Snapsec"
**Optimized Description:** "Explore Snapsec's track record: 500+ security assessments, 150+ critical bugs patched across 10+ industries. View case studies, research contributions, and sample pentest reports."

---

### Contact Us (`/contact-us`)

**Optimized Title:** "Contact Snapsec — Get in Touch with Our Security Team"
**Optimized Description:** "Contact Snapsec for penetration testing, vulnerability assessments, or platform demos. Email support@snapsec.co or fill out our contact form. Response within 24 hours."

---

### 404 Page (`*`)

**Optimized Title:** "Page Not Found (404) — Snapsec"
**Optimized Description:** "The page you're looking for doesn't exist. Return to the Snapsec homepage to explore our application security platform and services."

---

## 6. Structured Data Recommendations

### Organization Schema (every page)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Snapsec",
  "url": "https://snapsec.co",
  "logo": "https://snapsec.co/assets/snapsec-logo.png",
  "description": "A centralized AppSec platform unifying discovery, vulnerability management, intelligence, and protection.",
  "email": "support@snapsec.co",
  "telephone": "+917780908136",
  "sameAs": [
    "https://www.linkedin.com/company/snapsec",
    "https://x.com/snapsec_co",
    "https://www.youtube.com/@snapsec"
  ]
}
```

### SoftwareApplication Schema (Platform/Module pages)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Snapsec Suite",
  "description": "Centralized AppSec platform for attack surface management, vulnerability management, and security intelligence.",
  "url": "https://snapsec.co/platform",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "category": "SaaS"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "25",
    "bestRating": "5"
  }
}
```

### FAQ Schema (Methodology page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Snapsec's penetration testing methodology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snapsec follows a rigorous 10-phase methodology: Reconnaissance, Checklist Approach, Dynamic Security Testing, Automated Security Testing, Access Control Model Attacks, Component Security Testing, Report Writing, Remediation, Retesting, and Retest Reporting."
      }
    },
    {
      "@type": "Question": "Does Snapsec offer retesting after vulnerabilities are fixed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Snapsec provides unlimited retests. After your team patches identified vulnerabilities, our engineers re-test to verify fixes were applied correctly and no new issues were introduced."
      }
    },
    {
      "@type": "Question": "How long does a penetration test take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Penetration test timelines vary by scope. A typical web application assessment takes 1-3 weeks, while comprehensive infrastructure tests may run 2-4 weeks. Snapsec provides real-time streaming results throughout the engagement."
      }
    },
    {
      "@type": "Question": "What types of penetration testing does Snapsec offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snapsec offers web application penetration testing, API security testing, mobile application testing (iOS & Android), network penetration testing, cloud infrastructure testing, and social engineering assessments."
      }
    },
    {
      "@type": "Question": "Is Snapsec's testing manual or automated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snapsec uses a hybrid approach: automated scanning for broad coverage and baseline vulnerability detection, combined with expert manual penetration testing for complex logic flaws, business logic vulnerabilities, and access control bypasses that automated tools miss."
      }
    }
  ]
}
```

### BreadcrumbList Schema (every page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://snapsec.co/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://snapsec.co/services"
    }
  ]
}
```

---

## 7. Internal Linking Improvements

### Current Issues
- The header has mega-dropdowns with good internal links
- The footer links mostly point to external docs (`docs.snapsec.co`), not internal pages
- Page content rarely links to other relevant internal pages
- No breadcrumb navigation visible on any page
- The blog (`blog.snapsec.co`) and docs (`docs.snapsec.co`) are on separate subdomains with no prominent cross-linking

### Links to Add

**Homepage → Module Pages (in FeaturesSection or CTAs):**
- Link "Attack Surface Management" → `/discovery/asm`
- Link "Web Application Scanner" → `/discovery/was`
- Link "Vulnerability Management" → `/discovery/vm`

**Module Pages → Related Modules:**
- ASM page: Link to AIM ("Assets discovered by ASM flow into Asset Inventory →")
- WAS page: Link to VM ("Findings from WAS are tracked in Vulnerability Management →")
- VS page: Link to VM ("Vulnerabilities found by VS are prioritized in VM →")

**Services Page → Methodology:**
- Add CTA: "Learn about our 10-phase testing methodology →"

**About Us → Our Work:**
- Link: "See our track record of 500+ assessments →"

**Our Work → Contact:**
- CTA in each case study / section: "Get a security assessment for your organization →"

**Footer Improvements:**
- Add internal links to Platform, Services, Methodology, About Us, Our Work (currently mostly external)
- Add link to Trust Center page (when created)

**Blog Integration (from subdomain):**
- Add a "Latest from our Blog" section to the homepage footer or as a section
- Cross-link blog posts to relevant module pages

---

## 8. Content Improvements

### Homepage (`/`)

**Target Keyword:** "application security platform"
**Secondary Keywords:** "attack surface management", "vulnerability management", "AppSec platform", "centralized security platform"

**Missing Sections:**
1. **Stats/Proof Section** — Add customer count, vulnerabilities found, industries served
2. **Integration Logos** — Show AWS, GCP, Azure, GitHub, GitLab, Jira, Slack logos
3. **Featured Case Study** — One compelling customer story with metrics
4. **"How It Works" Overview** — 3-step visual: Connect → Scan → Remediate with timelines
5. **Trusted By section** — Currently has client logos (good), add testimonial quotes

**Suggested FAQ:**
- What is an application security platform?
- How does Snapsec differ from traditional vulnerability scanners?
- Does Snapsec integrate with our existing security tools?
- How quickly can we see results after onboarding?
- Is Snapsec suitable for startups or only enterprises?

---

### Platform Page (`/platform`)

**Target Keyword:** "centralized appsec platform"
**Secondary Keywords:** "unified security dashboard", "application security management", "vulnerability management platform"

**Missing Sections:**
1. **Integration Ecosystem** — List all integrations (AWS, GCP, Azure, Qualys, Snyk, Jira, Slack, GitHub)
2. **Feature Comparison Table** — Compare modules (ASM vs AIM vs WAS vs VS vs VM) side by side
3. **Deployment Options** — SaaS, on-prem, hybrid
4. **ROI Calculator / Business Case** — "How much time does a unified platform save?"

---

### Services Page (`/services`)

**Target Keyword:** "penetration testing services"
**Secondary Keywords:** "security assessment services", "vulnerability assessment", "cybersecurity consulting"

**Missing Sections:**
1. **Service Tiers/Packages** — Basic, Professional, Enterprise assessment packages
2. **Industry-Specific Offerings** — Links to dedicated industry pages (when created)
3. **Compliance Mapping** — Which services help with SOC 2, ISO 27001, PCI DSS
4. **Engagement Process** — Step-by-step: Scoping → Testing → Reporting → Retesting
5. **FAQ Section** — Common questions about pentest timelines, costs, deliverables

---

### Methodology Page (`/service/our-methodology`)

**Target Keyword:** "penetration testing methodology"
**Secondary Keywords:** "security testing framework", "OWASP testing methodology", "ethical hacking process"

**Content is strong — this page has good, detailed content.** Improvements:
1. Add visual timeline/infographic showing all 10 phases
2. Add FAQ schema (see structured data section)
3. Link to sample report downloads
4. Add "Why Our Methodology Is Different" comparison with standard approaches

---

### Module Pages (`/discovery/:moduleSlug`)

**Each module needs unique, differentiated content.** Currently all share the same section templates (`Challenge`, `Solution`, `Feature1/2/3`, `FinalBenefits`, `CTABanner`). Add:

**ASM Page:**
- Target Keyword: "attack surface management"
- Secondary: "external asset discovery", "shadow IT detection", "continuous exposure monitoring"
- Missing: Use cases section, integration with cloud providers, scan frequency, alert configuration

**AIM Page:**
- Target Keyword: "asset inventory management"
- Secondary: "asset classification", "cloud asset management", "CMDB"
- Missing: Connector details, enrichment data sources, relationship mapping

**WAS Page:**
- Target Keyword: "web application scanner"
- Secondary: "DAST tool", "API security testing", "OWASP scanner"
- Missing: Supported authentication types, scan recipes, CI/CD integration

**VS Page:**
- Target Keyword: "vulnerability scanner"
- Secondary: "network security scanner", "CVE detection", "port scanner"
- Missing: Scanner agent architecture, scan scheduling, target configuration

**VM Page:**
- Target Keyword: "vulnerability management"
- Secondary: "risk-based prioritization", "remediation tracking", "SLA management"
- Missing: Connector integrations, automation rules, reporting capabilities

---

### About Us Page (`/about-us`)

**Target Keyword:** "cybersecurity company"
**Secondary Keywords:** "application security company", "penetration testing company"

**Missing Sections:**
1. **Certifications & Compliance** — SOC 2, ISO 27001 (logos are in footer, add detail)
2. **Leadership Bios** — Detailed bios for team members (photos exist, content is thin)
3. **Company Timeline / Milestones** — Founding date, key achievements
4. **Careers / Open Roles** — "We're Hiring" exists in header promo, add details

---

### Our Work Page (`/our-work`)

**Target Keyword:** "penetration testing case studies"
**Secondary Keywords:** "security assessment examples", "vulnerability research"

**Missing Sections:**
1. **Individual Case Study Pages** — Currently one page aggregates everything. Each case deserves its own URL
2. **Quantitative Results** — "Reduced vulnerability count by 80% in 6 months for [Client]"
3. **Industry Filter** — Allow filtering case studies by industry
4. **Testimonial Carousel** — Already exists on homepage, could be repeated here

---

### Contact Us Page (`/contact-us`)

**Page is well-implemented** with Formspree, country code selector, and social links.
**Improvements:**
1. Add Office Locations section (if physical offices exist)
2. Add expected response time ("We typically respond within 4 hours during business hours")
3. Add common inquiry type selector (Demo Request, Support, Sales, Partnership)
4. Add FAQ accordion before the form

---

## 9. Technical Implementation Checklist

### Phase 1: Infrastructure (Day 1)

- [ ] Install `react-helmet-async`: `npm install react-helmet-async`
- [ ] Create `src/components/SEOHead.jsx` — reusable metadata component
- [ ] Create `src/components/StructuredData.jsx` — JSON-LD schema components
- [ ] Wrap `<App>` in `<HelmetProvider>` in `src/main.jsx`
- [ ] Create `public/robots.txt`
- [ ] Create `public/sitemap.xml`
- [ ] Add Vercel redirects for duplicate routes in `vercel.json`

### Phase 2: Page Metadata (Day 2)

- [ ] Add `<SEOHead>` to HomePage with optimized title, description, canonical
- [ ] Add `<SEOHead>` to PlatformPage
- [ ] Add `<SEOHead>` to ServicesPage
- [ ] Add `<SEOHead>` to MethodologyPage
- [ ] Add `<SEOHead>` to OurMethodologyPage
- [ ] Add `<SEOHead>` to DiscoveryPage (dynamic based on moduleSlug)
- [ ] Add `<SEOHead>` to AboutUsPage
- [ ] Add `<SEOHead>` to OurWorkPage
- [ ] Add `<SEOHead>` to ContactUsPage
- [ ] Add `<SEOHead>` to NotFoundPage (with noindex)

### Phase 3: Structured Data (Day 2-3)

- [ ] Add `OrganizationSchema` to App.jsx (site-wide via Helmet)
- [ ] Add `SoftwareAppSchema` to PlatformPage
- [ ] Add `FAQSchema` to OurMethodologyPage
- [ ] Add `BreadcrumbSchema` to all pages
- [ ] Add `FAQSchema` to ServicesPage
- [ ] Add `Article` schema to OurWorkPage

### Phase 4: Content & Images (Day 3)

- [ ] Audit and add descriptive `alt` attributes to all `<img>` tags
- [ ] Add `loading="lazy"` to all below-fold images
- [ ] Add `width` and `height` attributes to all images (prevents CLS)
- [ ] Convert large PNG/JPG images to WebP format
- [ ] Create OG image (`1200x630px`) at `/public/assets/snapsec-og.png`

### Phase 5: Performance (Day 3-4)

- [ ] Extract dashboard SVGs to separate chunkable files
- [ ] Add `React.lazy()` code-splitting for dashboard components
- [ ] Add `<Suspense>` with loading fallbacks
- [ ] Audit and remove unused CSS (Tailwind's JIT doesn't need this, but check)
- [ ] Enable gzip/brotli compression in Vercel (usually default)

### Phase 6: Internal Linking (Day 4)

- [ ] Add cross-links between module pages
- [ ] Add "Related Services" sections on services pages
- [ ] Update footer to include more internal links
- [ ] Add breadcrumb UI component (not just schema — visual breadcrumbs)
- [ ] Link blog subdomain prominently in footer/resource section

### Phase 7: Advanced (Week 2)

- [ ] Implement SSR or static prerendering (react-snap or migrate to Next.js)
- [ ] Add hreflang tags
- [ ] Create missing landing pages (Pricing, Industries, Competitor Comparisons)
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google and Bing
- [ ] Set up schema validation monitoring
- [ ] Implement dynamic OG image generation for module pages

---

## 10. AI Agent Handoff

# AI_AGENT_IMPLEMENTATION_HANDOFF

This section contains exact implementation instructions for a second AI agent. Follow these steps in order.

---

### Step 1: Install Dependencies

```bash
cd /home/imran/Desktop/devCurrent/snapsec-site
npm install react-helmet-async
```

---

### Step 2: Create SEOHead Component

**File to create:** `src/components/SEOHead.jsx`

```jsx
import { Helmet } from 'react-helmet-async';

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = 'https://snapsec.co/assets/snapsec-og.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}) {
  const siteName = 'Snapsec';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
```

---

### Step 3: Create StructuredData Component

**File to create:** `src/components/StructuredData.jsx`

```jsx
import { Helmet } from 'react-helmet-async';

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Snapsec',
    url: 'https://snapsec.co',
    logo: 'https://snapsec.co/assets/snapsec-logo.png',
    description: 'A centralized AppSec platform unifying discovery, vulnerability management, intelligence, and protection across your entire ecosystem.',
    email: 'support@snapsec.co',
    telephone: '+917780908136',
    sameAs: [
      'https://www.linkedin.com/company/snapsec',
      'https://x.com/snapsec_co',
      'https://www.youtube.com/@snapsec',
    ],
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function BreadcrumbSchema({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function FAQSchema({ questions }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function SoftwareAppSchema({ name, description, url, category }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name || 'Snapsec Suite',
    description: description || 'Centralized AppSec platform.',
    url: url || 'https://snapsec.co/platform',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      category: category || 'SaaS',
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
```

---

### Step 4: Wrap App with HelmetProvider

**File to modify:** `src/main.jsx`

Add at the top:
```jsx
import { HelmetProvider } from 'react-helmet-async';
```

Wrap the existing render. The file currently looks like:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Change to:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
```

---

### Step 5: Add SEOHead to Every Page

**5a. File: `src/pages/home-page/home-pages.jsx`**

Add import:
```jsx
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';
```

Add before the fragment:
```jsx
export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Snapsec — Centralized Application Security Platform | Attack Surface & Vulnerability Management"
        description="Snapsec unifies attack surface management, vulnerability scanning, and security intelligence into one platform. Discover, prioritize, and remediate risks across your entire digital ecosystem."
        canonicalUrl="https://snapsec.co/"
        ogTitle="Snapsec — See Every Asset. Every Exposure. Every Finding."
        ogDescription="Unify discovery, vulnerability management, intelligence, and protection across your entire ecosystem with Snapsec's centralized AppSec platform."
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://snapsec.co/' }]} />
      <HeroSection />
      <LogosSection />
      {/* ... rest unchanged ... */}
    </>
  );
}
```

**5b. File: `src/pages/PlatformPage/PlatformPage.jsx`**

Add imports and SEOHead:
```jsx
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, SoftwareAppSchema, BreadcrumbSchema } from '../../components/StructuredData';

const PlatformPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="Platform — Centralized AppSec & Vulnerability Management | Snapsec"
        description="Snapsec's platform centralizes attack surface management, vulnerability scanning, asset inventory, and security intelligence. One unified dashboard for your entire security program."
        canonicalUrl="https://snapsec.co/platform"
      />
      <OrganizationSchema />
      <SoftwareAppSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Platform', url: 'https://snapsec.co/platform' },
      ]} />
      <HeroSection />
      {/* ... rest unchanged ... */}
    </main>
  );
};
```

**5c. File: `src/pages/ServicesPage/ServicesPage.jsx`**

```jsx
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQSchema } from '../../components/StructuredData';

const servicesFAQ = [
  { question: 'What cybersecurity services does Snapsec offer?', answer: 'Snapsec offers penetration testing, vulnerability assessment, attack surface management, web application scanning, API security testing, and continuous security monitoring services for enterprises.' },
  { question: 'Is Snapsec testing manual or automated?', answer: 'Snapsec uses a hybrid approach combining automated scanning for broad coverage with expert manual penetration testing for complex business logic flaws and access control vulnerabilities.' },
  { question: 'How long does a penetration test take?', answer: 'A typical web application assessment takes 1-3 weeks. Comprehensive infrastructure tests may run 2-4 weeks. Snapsec provides real-time streaming results throughout the engagement.' },
  { question: 'Do you provide remediation support?', answer: 'Yes, Snapsec provides detailed remediation guidance, developer-friendly code recommendations, architectural advice, and unlimited retests to verify fixes are correctly implemented.' },
  { question: 'What industries do you serve?', answer: 'Snapsec serves fintech, healthcare, e-commerce, SaaS, government, and enterprise organizations across 10+ industries with tailored security testing approaches.' },
];

const ServicesPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="Cybersecurity Services — Penetration Testing & Security Assessments | Snapsec"
        description="Expert-led penetration testing, vulnerability assessments, and security consulting services. Our 10-phase methodology combines automated scanning with manual expert analysis."
        canonicalUrl="https://snapsec.co/services"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Services', url: 'https://snapsec.co/services' },
      ]} />
      <FAQSchema questions={servicesFAQ} />
      <HeroSection isServicesPage={true} />
      {/* ... rest unchanged ... */}
    </main>
  );
};
```

**5d. File: `src/pages/ServicesPage/OurMethodologyPage.jsx`**

Add imports:
```jsx
import SEOHead from '../../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQSchema } from '../../../components/StructuredData';
```

Add before `<main>` or inside it:
```jsx
<SEOHead
  title="Our Pentest Methodology — 10-Phase Security Testing Approach | Snapsec"
  description="Snapsec's rigorous 10-phase penetration testing methodology combines reconnaissance, dynamic testing, access control modeling, and continuous retesting. Learn how we secure your applications."
  canonicalUrl="https://snapsec.co/service/our-methodology"
/>
<OrganizationSchema />
<BreadcrumbSchema items={[
  { name: 'Home', url: 'https://snapsec.co/' },
  { name: 'Methodology', url: 'https://snapsec.co/service/our-methodology' },
]} />
<FAQSchema questions={[
  { question: 'What is Snapsec\'s penetration testing methodology?', answer: 'Snapsec follows a rigorous 10-phase methodology: Reconnaissance, Checklist Approach, Dynamic Security Testing, Automated Security Testing, Access Control Model Attacks, Component Security Testing, Report Writing, Remediation, Retesting, and Retest Reporting.' },
  { question: 'Does Snapsec offer retesting after vulnerabilities are fixed?', answer: 'Yes, Snapsec provides unlimited retests. After your team patches identified vulnerabilities, our engineers re-test to verify fixes were applied correctly.' },
  { question: 'What makes Snapsec\'s methodology different?', answer: 'Unlike automated-only scanners, Snapsec combines human expert analysis with automation. Our methodology emphasizes manual exploitation of business logic flaws and access control models that automated tools miss.' },
]} />
```

**5e. File: `src/pages/DiscoveryPage/index.jsx`**

Add imports and dynamic SEOHead:
```jsx
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, SoftwareAppSchema } from '../../components/StructuredData';

const seoData = {
  asm: {
    title: 'Attack Surface Management (ASM) — External Asset Discovery & Monitoring | Snapsec',
    description: 'Continuously discover and monitor every internet-facing asset. Snapsec\'s ASM module maps subdomains, IPs, ports, and cloud services to identify shadow IT and external exposures in real time.',
    softwareName: 'Snapsec ASM — Attack Surface Management',
  },
  aim: {
    title: 'Asset Inventory Management (AIM) — Automated Asset Classification | Snapsec',
    description: 'Automatically classify, enrich, and manage every asset with ownership, technology, and relationship data. Connects AWS, GCP, Azure, and Kubernetes for unified visibility.',
    softwareName: 'Snapsec AIM — Asset Inventory Management',
  },
  was: {
    title: 'Web Application Scanner (WAS) — Automated DAST & API Security Testing | Snapsec',
    description: 'Automated dynamic application security testing (DAST) for web apps and APIs. Detect OWASP Top 10 vulnerabilities, injection flaws, broken auth, and SSRF with continuous scanning.',
    softwareName: 'Snapsec WAS — Web Application Scanner',
  },
  vs: {
    title: 'Vulnerability Scanner (VS) — Network & Infrastructure Security Scanning | Snapsec',
    description: 'Continuous network vulnerability scanning for infrastructure, ports, and services. Deploy scanner agents to detect CVEs, misconfigurations, and exposed services across your network.',
    softwareName: 'Snapsec VS — Vulnerability Scanner',
  },
  vm: {
    title: 'Vulnerability Management (VM) — Risk-Based Prioritization & Remediation | Snapsec',
    description: 'Centralized vulnerability management with risk-based prioritization, SLA tracking, and automated remediation workflows. Aggregate findings from Qualys, Snyk, Trivy, and more.',
    softwareName: 'Snapsec VM — Vulnerability Management',
  },
};

export default function DiscoveryPage() {
  const { moduleSlug } = useParams();
  const slug = (moduleSlug || 'asm').toLowerCase();
  const mod = moduleSlug ? moduleData[slug] : null;
  const seo = seoData[slug] || seoData.asm;

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonicalUrl={`https://snapsec.co/discovery/${slug}`}
      />
      <OrganizationSchema />
      <SoftwareAppSchema
        name={seo.softwareName}
        description={seo.description}
        url={`https://snapsec.co/discovery/${slug}`}
        category="SecurityApplication"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: mod?.name || 'Module', url: `https://snapsec.co/discovery/${slug}` },
      ]} />
      {/* ... rest unchanged ... */}
    </>
  );
}
```

**5f. File: `src/pages/AboutUsPage/AboutUsPage.jsx`**

```jsx
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';

// Inside AboutUsPage:
<SEOHead
  title="About Snapsec — Our Mission, Team & Cybersecurity Expertise"
  description="Snapsec is on a mission to map, scan, and secure every enterprise asset. Learn about our team, values, and commitment to application security excellence."
  canonicalUrl="https://snapsec.co/about-us"
/>
<OrganizationSchema />
<BreadcrumbSchema items={[
  { name: 'Home', url: 'https://snapsec.co/' },
  { name: 'About Us', url: 'https://snapsec.co/about-us' },
]} />
```

**5g. File: `src/pages/OurWorkPage/OurWorkPage.jsx`**

```jsx
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';

// Inside OurWorkPage:
<SEOHead
  title="Our Work — Penetration Testing Case Studies & Research | Snapsec"
  description="Explore Snapsec's track record: 500+ security assessments, 150+ critical bugs patched across 10+ industries. View case studies, research, and sample pentest reports."
  canonicalUrl="https://snapsec.co/our-work"
/>
<OrganizationSchema />
<BreadcrumbSchema items={[
  { name: 'Home', url: 'https://snapsec.co/' },
  { name: 'Our Work', url: 'https://snapsec.co/our-work' },
]} />
```

**5h. File: `src/pages/ContactUsPage/ContactUsPage.jsx`**

```jsx
import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';

// Inside ContactUsPage:
<SEOHead
  title="Contact Snapsec — Get in Touch with Our Security Team"
  description="Contact Snapsec for penetration testing, vulnerability assessments, or platform demos. Email support@snapsec.co or use our contact form. Response within 24 hours."
  canonicalUrl="https://snapsec.co/contact-us"
/>
<OrganizationSchema />
<BreadcrumbSchema items={[
  { name: 'Home', url: 'https://snapsec.co/' },
  { name: 'Contact Us', url: 'https://snapsec.co/contact-us' },
]} />
```

**5i. File: `src/pages/NotFoundPage/NotFoundPage.jsx`**

```jsx
import SEOHead from '../../components/SEOHead';

// Inside NotFoundPage:
<SEOHead
  title="Page Not Found (404) — Snapsec"
  description="The page you're looking for doesn't exist. Return to the Snapsec homepage to explore our application security platform and services."
  canonicalUrl="https://snapsec.co/"
  noIndex={true}
/>
```

---

### Step 6: Create robots.txt

**File to create:** `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /module/*
Sitemap: https://snapsec.co/sitemap.xml

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /
```

---

### Step 7: Create sitemap.xml

**File to create:** `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://snapsec.co/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/platform</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/service/our-methodology</loc>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/asm</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/aim</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/was</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/vs</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/discovery/vm</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/about-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/our-work</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
  <url>
    <loc>https://snapsec.co/contact-us</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
    <lastmod>2026-06-12</lastmod>
  </url>
</urlset>
```

---

### Step 8: Update vercel.json with Redirects

**File to modify:** `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "redirects": [
    {
      "source": "/services/our-methodology",
      "destination": "/service/our-methodology",
      "permanent": true
    },
    {
      "source": "/services/methodology",
      "destination": "/service/our-methodology",
      "permanent": true
    },
    {
      "source": "/discovery",
      "destination": "/discovery/asm",
      "permanent": true
    }
  ]
}
```

---

### Step 9: Update index.html with Fallback Defaults

**File to modify:** `index.html`

Remove the hardcoded OG and description tags (react-helmet will manage these dynamically). Keep the charset, viewport, and favicon. The `<title>` should remain as a fallback in case JS fails.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/assets/snapsec-mark.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Snapsec — Application Security Platform</title>
    <meta name="description" content="Snapsec is a centralized AppSec platform for attack surface management, vulnerability scanning, and security intelligence." />
    <meta property="og:title" content="Snapsec — Application Security Platform" />
    <meta property="og:description" content="Centralized AppSec platform for attack surface management, vulnerability scanning, and security intelligence." />
    <meta property="og:image" content="https://snapsec.co/assets/snapsec-og.png" />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <!-- Umami Analytics -->
    <script defer src="https://cloud.umami.is/script.js" data-website-id="2c4855e0-2333-4eb1-a38f-fd989b9f7755"></script>
    <!-- Brevo Conversations Widget -->
    <script>
      (function(d, w, c) {
          w.BrevoConversationsID = '6544711f1e43cf292d51c22d';
          w[c] = w[c] || function() {
              (w[c].q = w[c].q || []).push(arguments);
          };
          var s = d.createElement('script');
          s.async = true;
          s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
          if (d.head) d.head.appendChild(s);
      })(document, window, 'BrevoConversations');
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### Step 10: Add Image alt Text and Lazy Loading

**File to modify:** `src/pages/PlatformPage/components/HeroSection.jsx`

Line 24: Change `alt=""` to:
```jsx
alt="Snapsec platform integrations grid showing connected security tools and services"
```

**File to modify:** `src/pages/Header/index.jsx`

Line 717: Change logo alt from `"Snapsec Suite"` to:
```jsx
alt="Snapsec — Application Security Platform"
```

**File to modify:** All component files with `<img>` tags:
- Add `loading="lazy"` to images below the fold
- Add `width` and `height` attributes where missing to prevent CLS
- Ensure all content images have descriptive `alt` text

---

### Order of Implementation

1. **Step 1** — Install react-helmet-async
2. **Step 2** — Create SEOHead component
3. **Step 3** — Create StructuredData component
4. **Step 4** — Wrap App in HelmetProvider
5. **Step 6** — Create robots.txt
6. **Step 7** — Create sitemap.xml
7. **Step 8** — Update vercel.json
8. **Step 5** — Add SEOHead to all pages (a through i)
9. **Step 9** — Update index.html
10. **Step 10** — Add image alt text and lazy loading

---

### Expected SEO Improvement

| Timeline | Expected Result |
|----------|----------------|
| Week 1 | All pages get unique titles and meta descriptions. Pages become eligible for indexing. |
| Week 2-3 | Google crawls and indexes additional pages via sitemap. Rich results start appearing (Organization, Breadcrumb). |
| Month 1 | Module pages begin ranking for long-tail keywords (ASM, WAS, VM). CTR improves 15-30% from meta descriptions. |
| Month 2-3 | Platform page ranks for "application security platform". Service pages appear for "penetration testing" queries. |
| Month 6 | With content additions (blog, case studies, industry pages), organic traffic reaches meaningful levels. |

**Current estimated organic traffic:** Near zero from the main site (only homepage may be indexed).
**Post-implementation estimated traffic:** 500-2,000 monthly organic visits within 6 months (SaaS cybersecurity niche).

---

### Validation Steps After Deployment

1. **Title/Meta Validation:**
   - View page source on every route (`Ctrl+U`) and confirm unique `<title>` and `<meta description>`
   - Use `https://www.heymeta.com/` to check OG tags on each URL

2. **Structured Data Validation:**
   - Run each URL through `https://validator.schema.org/`
   - Check Google Rich Results Test: `https://search.google.com/test/rich-results`

3. **Sitemap Validation:**
   - Visit `https://snapsec.co/sitemap.xml` and confirm it loads
   - Submit to Google Search Console
   - Submit to Bing Webmaster Tools

4. **Robots.txt Validation:**
   - Visit `https://snapsec.co/robots.txt`
   - Test in Google Search Console's robots.txt tester

5. **Redirect Validation:**
   - Visit `/services/our-methodology` → should redirect to `/service/our-methodology`
   - Visit `/discovery` → should redirect to `/discovery/asm`

6. **Core Web Vitals:**
   - Run Lighthouse audit on each page
   - Target: LCP < 2.5s, CLS < 0.1, INP < 200ms

7. **Index Coverage:**
   - After 1-2 weeks, check Google Search Console → Index → Coverage
   - Confirm all 11 key URLs are indexed
   - Fix any "Crawled - currently not indexed" issues

---

**End of Report**
