import { getDictionary } from '@/lib/dictionary';
import CalculatorContainer from '@/components/calculators/CalculatorContainer';
import FinalCTA from '@/components/sections/FinalCTA';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggeredContainer } from '@/components/animations/StaggeredContainer';
import { TrendingUp, ShieldCheck, Repeat, Coins, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }): Promise<Metadata> {
  const { lang } = await params;
  const isNe = lang === 'ne';
  return {
    title: isNe
      ? 'SIP क्याल्कुलेटर | EazySIP — मासिक बचत अनुमान गर्नुहोस्'
      : 'SIP & Goal Calculator | Estimate Your Savings & Goals | EazySIP',
    description: isNe
      ? 'EazySIP को SIP क्याल्कुलेटरले तपाईंको मासिक लगानी र भविष्यको लक्ष्य रकम अनुमान गर्न मद्दत गर्छ।'
      : 'Calculate your SIP returns and estimate monthly savings required for your specific target financial goals with EazySIP.',
    alternates: {
      canonical: isNe ? 'https://eazysip.com/ne/sip-calculator' : 'https://eazysip.com/sip-calculator',
      languages: {
        'en-IN': 'https://eazysip.com/sip-calculator',
        'ne-IN': 'https://eazysip.com/ne/sip-calculator',
      },
    },
  };
}

export default async function SipCalculatorPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const page = dict.sipCalcPage;

  const benefits = [
    { icon: Repeat, title: page.b1Title, body: page.b1Body },
    { icon: TrendingUp, title: page.b2Title, body: page.b2Body },
    { icon: Coins, title: page.b3Title, body: page.b3Body },
    { icon: ShieldCheck, title: page.b4Title, body: page.b4Body },
  ];

  const faqs = [
    { q: page.q1, a: page.a1 },
    { q: page.q2, a: page.a2 },
    { q: page.q3, a: page.a3 },
    { q: page.q4, a: page.a4 },
    { q: page.q5, a: page.a5 },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{page.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-4 font-display">
              {page.heroHeadline}
            </h1>
          </SlideUp>
          <FadeIn delay={0.2}>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {page.heroSubtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Interactive Calculators Section with Cards Switcher */}
      <CalculatorContainer dict={dict} lang={lang} />

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 text-center">{page.whyEyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-12 text-center font-display">
              {page.whyHeadline}
            </h2>
          </SlideUp>
          <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all bg-white">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="text-primary w-5 h-5" />
                </div>
                <h3 className="font-bold text-dark mb-2 text-base group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-emerald-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 text-center">{page.faqEyebrow}</p>
            <h2 className="text-3xl font-extrabold text-dark mb-12 text-center font-display">
              {page.faqHeadline}
            </h2>
          </SlideUp>
          <StaggeredContainer className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} aria-label={faq.q} className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="text-base font-bold text-dark pr-4">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="px-6 pb-5" role="region">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* CTA */}
      <FinalCTA lang={lang} />
    </div>
  );
}
