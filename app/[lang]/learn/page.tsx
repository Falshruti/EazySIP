import LearnClient from '@/components/client/LearnClient';
import { getDictionary } from '@/lib/dictionary';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Investment Guides & Financial Tips | EazySIP Learning Centre',
    description: 'Explore beginner-friendly articles on SIPs, mutual funds, financial planning, budgeting, and long-term investing.',
  };
}

export default async function LearnPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <LearnClient lang={lang} dict={dict.learn} />;
}
