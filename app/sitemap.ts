import { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from '@/lib/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eazysip.com';

  const staticPages = [
    '',
    '/about',
    '/features',
    '/how-it-works',
    '/sip-calculator',
    '/learn',
    '/watch',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/risk-disclosure',
  ];

  const languages = ['', '/ne'];

  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for static pages in all languages
  for (const page of staticPages) {
    for (const lang of languages) {
      routes.push({
        url: `${baseUrl}${lang}${page}`,
        lastModified: new Date('2026-08-10'),
        changeFrequency: page === '' || page === '/learn' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/sip-calculator' ? 0.9 : 0.8,
      });
    }
  }

  // Generate routes for all 14 blog articles
  for (const article of BLOG_ARTICLES) {
    for (const lang of languages) {
      routes.push({
        url: `${baseUrl}${lang}/learn/${article.slug}`,
        lastModified: new Date('2026-08-10'),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return routes;
}
