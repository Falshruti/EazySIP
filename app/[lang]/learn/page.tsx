import LearnClient from '@/components/client/LearnClient';
import { getDictionary } from '@/lib/dictionary';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }): Promise<Metadata> {
  const { lang } = await params;
  const isNe = lang === 'ne';
  return {
    title: isNe
      ? 'लगानी मार्गदर्शन र वित्तीय सलाह | EazySIP सिकाइ केन्द्र'
      : 'Investment Guides & Financial Tips | EazySIP Learning Centre',
    description: isNe
      ? 'SIP, म्युचुअल फन्ड, आपतकालीन कोष, र दीर्घकालीन लगानीबारे सरल र सजिलो लेखहरू अन्वेषण गर्नुहोस्।'
      : 'Explore beginner-friendly articles on SIPs, mutual funds, financial planning, budgeting, and long-term investing.',
    alternates: {
      canonical: isNe ? 'https://eazysip.com/ne/learn' : 'https://eazysip.com/learn',
      languages: {
        'en-IN': 'https://eazysip.com/learn',
        'ne-IN': 'https://eazysip.com/ne/learn',
      },
    },
  };
}

export default async function LearnPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <LearnClient lang={lang} dict={dict.learn} />;
}
