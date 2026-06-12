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
