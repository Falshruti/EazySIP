import { getDictionary } from '@/lib/dictionary';
import FinalCTA from '@/components/sections/FinalCTA';
import { ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About EazySIP | Sikkim's Beginner-Friendly Investment Platform",
    description: "Learn about EazySIP's mission to make investing simple, accessible, and easy to understand for first-time investors across Sikkim.",
  };
}

const aboutContent = {
  en: {
    title: 'Investing Made Simple for Sikkim',
    subhead: "Sikkim's first beginner-friendly investment platform.",
    body1: 'EazySIP was created to make investing simple, accessible, and easy to understand. Built for first-time investors, the platform removes language barriers and financial jargon, helping individuals and families invest confidently towards their future goals. Starting from just ₹100, EazySIP empowers every small step towards long-term financial well-being.',
    founderTitle: 'Meet the Founder',
    founderBody: 'Founded by Navneet Pradhan, EazySIP was born from a vision to make investing accessible to every household in Sikkim. By introducing the region\'s first Nepali-first investment platform, he aims to help more people build healthy financial habits and confidently work towards their life goals.',
  },
  ne: {
    title: 'सिक्किमको लागि लगानीलाई सरल बनाइँदै',
    subhead: 'सिक्किमको पहिलो नेपाली-प्रथम लगानी प्लेटफर्म।',
    body1: 'EazySIP लगानीलाई सरल, सुलभ र सजिलै बुझ्न सकिने बनाउन सिर्जना गरिएको हो। पहिलो पटक लगानी गर्नेहरूका लागि बनाइएको यो प्लेटफर्मले भाषाको बाधा र जटिल वित्तीय शब्दहरू हटाउँदै, व्यक्ति र परिवारलाई उनीहरूको भविष्यका लक्ष्यहरूतर्फ आत्मविश्वासका साथ लगानी गर्न मद्दत गर्छ। मात्र ₹100 बाट सुरु गर्दै, EazySIP ले दीर्घकालीन वित्तीय समृद्धितर्फका हरेक साना कदमलाई सशक्त बनाउँछ।',
    founderTitle: 'संस्थापकलाई भेट्नुहोस्',
    founderBody: 'नवनीत प्रधानद्वारा स्थापित, EazySIP सिक्किमका हरेक घरपरिवारमा लगानीलाई सुलभ बनाउने दृष्टिकोणबाट जन्मिएको हो। यस क्षेत्रको पहिलो नेपाली-प्रथम लगानी प्लेटफर्म प्रस्तुत गरेर, उहाँको लक्ष्य धेरै मानिसहरूलाई स्वस्थ वित्तीय बानीहरू बसाल्न र उनीहरूको जीवनका लक्ष्यहरूतर्फ आत्मविश्वासका साथ काम गर्न मद्दत गर्नु हो।',
  },
};

export default async function AboutPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const content = lang === 'ne' ? aboutContent.ne : aboutContent.en;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      {/* Hero Section */}
      <div style={{ backgroundColor: '#fffeee' }} className="py-16 sm:py-20 mb-16 border-y border-amber-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c7e4b]/10 text-[#1c7e4b] font-bold text-xs sm:text-sm mb-6">
            <Sparkles size={16} />
            <span>{content.subhead}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 font-heading">
            {content.title}
          </h1>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-normal">
            {content.body1}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#download"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1c7e4b] hover:bg-[#15633a] text-white rounded-full font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <span>{lang === 'ne' ? 'एप डाउनलोड गर्नुहोस्' : 'Download App'}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Meet the Founder Section */}
        <section className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200/70 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-[#1c7e4b] to-[#004242] text-white flex flex-col items-center justify-center shrink-0 shadow-lg p-4 text-center">
            <UserCheck size={48} className="mb-2 opacity-90" />
            <span className="text-xs font-bold tracking-wider uppercase">Navneet Pradhan</span>
            <span className="text-[10px] text-white/80">Founder</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 font-heading">
              {content.founderTitle}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              {content.founderBody}
            </p>
          </div>
        </section>

        {/* Regulatory Credentials */}
        <section className="text-center pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2.5">
            <ShieldCheck className="text-[#1c7e4b] w-7 h-7" />
            <span>{dict.about?.credentialsTitle || 'Regulatory Compliance'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-2">{dict.common.amfiRegistered}</h3>
              <p className="text-xs text-gray-500">{dict.about?.amfiCredDesc || 'SEBI Registered Mutual Fund Distributor (ARN: 313834)'}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-2">{dict.common.bseStarMf}</h3>
              <p className="text-xs text-gray-500">{dict.about?.bseCredDesc || 'Official BSE StAR MF Partner'}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-2">{dict.about?.sebiCredTitle || 'Bank-Grade Security'}</h3>
              <p className="text-xs text-gray-500">{dict.about?.sebiCredDesc || '256-bit encryption for safe transactions'}</p>
            </div>
          </div>
        </section>
      </div>

      <FinalCTA lang={lang} />
    </div>
  );
}
