import { getDictionary } from '@/lib/dictionary';
import HeroSection from '@/components/sections/HeroSection';
import QuickActionCards from '@/components/sections/QuickActionCards';
import InvestTodaySection from '@/components/sections/InvestTodaySection';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import LatestBlogSection from '@/components/sections/LatestBlogSection';
import FAQSection from '@/components/sections/FAQSection';
import FinalCTA from '@/components/sections/FinalCTA';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }): Promise<Metadata> {
  const { lang } = await params;
  const isNe = lang === 'ne';

  return {
    title: isNe
      ? 'EazySIP | सिक्किममा ₹१०० बाट एसआईपी (SIP) लगानी सुरु गर्नुहोस्'
      : 'EazySIP | Start SIP Investments from ₹100 in Sikkim',
    description: isNe
      ? 'इजीएसआईपी (EazySIP) मार्फत आफ्नो लगानी यात्रा सुरु गर्नुहोस्। सिक्किमका नागरिकहरूका लागि विशेष रूपमा तयार पारिएको सरल तथा सहज प्लेटफर्म।'
      : 'Start your investment journey with EazySIP. Invest from just ₹100 through a simple, beginner-friendly platform designed for people in Sikkim.',
    openGraph: {
      title: isNe
        ? 'EazySIP मार्फत ₹१०० बाट लगानी सुरु गर्नुहोस्'
        : 'Start Investing from ₹100 with EazySIP',
      description: isNe
        ? 'सिक्किमका परिवारहरूलाई राम्रो वित्तीय भविष्य निर्माण गर्न मद्दत गर्ने सरल, सहज लगानी प्लेटफर्म।'
        : 'A simple, beginner-friendly investment platform helping families in Sikkim build a better financial future.',
      url: isNe ? 'https://eazysip.com/ne' : 'https://eazysip.com',
      siteName: 'EazySIP',
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero section */}
      <HeroSection dict={dict.heroSection} lang={lang} />

      {/* 3 Quick Action cards below hero */}
      <QuickActionCards lang={lang} />

      {/* "Easy Savings App" section */}
      <InvestTodaySection lang={lang} />

      {/* "What our investors say" Testimonials section */}
      <TestimonialCarousel lang={lang} />

      {/* "Latest from our blog" section */}
      <LatestBlogSection lang={lang} />

      {/* FAQ Section */}
      <FAQSection lang={lang} />

      {/* "Ready to take the first step?" CTA banner & Floating WhatsApp */}
      <FinalCTA lang={lang} />
    </main>
  );
}
