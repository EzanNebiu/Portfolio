import { useEffect } from 'react';
import { SEO_CONFIG, SITE_CONFIG } from '@/constants/config';

export function StructuredData() {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ezan M. Nebija',
      jobTitle: 'Full-Stack Developer',
      description: SEO_CONFIG.description,
      url: SEO_CONFIG.siteUrl,
      email: SITE_CONFIG.email,
      sameAs: [
        SITE_CONFIG.linkedInUrl,
        SITE_CONFIG.gitHubUrl,
      ],
      knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'JavaScript',
        'Full-Stack Development',
        'Web Development',
        'Software Engineering',
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
