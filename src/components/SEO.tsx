import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, type = 'website' }) => {
  const siteUrl = 'https://om-tent-house.example.com'; // Placeholder base URL - needs to be updated to actual
  const fullTitle = `${title} | Om Tent House And Caterers`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Om Tent House And Caterers',
    description: description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Anpara',
      addressRegion: 'Sonbhadra',
      addressCountry: 'IN',
    },
    founder: [
      { '@type': 'Person', name: 'Pawan Kumar' },
      { '@type': 'Person', name: 'Gopal Kumar' },
    ],
    url: siteUrl,
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`${siteUrl}${canonical || ''}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
