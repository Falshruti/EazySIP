'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { SlideUp } from '@/components/animations/SlideUp';

interface FAQSectionProps {
  lang?: string;
  dict?: any;
}

const faqData = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about starting your SIP with eazySIP.',
    items: [
      {
        q: 'Is EazySip safe?',
        a: "Yes. EazySip is owned and operated by Dzambala Financial Services LLP (AMFI-registered MFD ARN-313834). Your money never sits with us; it moves directly from your bank account to the mutual fund company. We earn trail commission from AMCs as disclosed per SEBI guidelines.",
      },
      {
        q: 'Are there hidden charges?',
        a: 'No upfront platform fees or hidden charges. The mutual fund scheme charges its standard expense ratio (typically 0.3–0.8% per year) as stated in the scheme Information Document (SID).',
      },
      {
        q: 'What if I want to stop my SIP?',
        a: "Pause or stop your SIP anytime without penalty. No lock-ins for open-ended schemes. Restart whenever you're ready. Your past accumulated units continue to earn compounding growth.",
      },
      {
        q: 'Do I need to be tech-savvy?',
        a: 'Not at all. If you can send a message on WhatsApp, you can easily use eazySIP. We offer voice assistance in Nepali and dedicated Sahayogis to assist you.',
      },
      {
        q: 'How is this different from a Fixed Deposit (FD)?',
        a: 'An FD typically offers 6–7% interest before tax, which barely keeps up with inflation. Equity mutual fund SIPs held over 10+ years have historically averaged around 12% returns through rupee-cost averaging and compounding.',
      },
      {
        q: 'Can I withdraw money during an emergency?',
        a: 'Yes, anytime for open-ended mutual fund schemes. Redemptions are processed directly into your registered bank account, usually within 1 to 3 working days.',
      },
    ],
    stillQuestions: 'Still have questions?',
    chatWithUs: 'Chat with a Sahayogi',
  },
  ne: {
    title: 'प्रायः सोधिने प्रश्नहरू',
    subtitle: 'eazySIP सँग SIP सुरु गर्नेसम्बन्धी सबै जानकारी।',
    items: [
      {
        q: 'के EazySip सुरक्षित छ?',
        a: 'हो। EazySip जाम्बला फाइनान्सियल सर्भिसेज LLP (AMFI-दर्ता MFD ARN-313834) द्वारा सञ्चालित छ। तपाईंको रकम सीधै म्युचुअल फन्ड कम्पनीमा जान्छ।',
      },
      {
        q: 'के कुनै लुकेका शुल्कहरू छन्?',
        a: 'कुनै अग्रिम वा लुकेका शुल्कहरू छैनन्। SEBI नियम अनुसार केवल योजनाको मानक खर्च अनुपात (Expense Ratio) लागू हुन्छ।',
      },
      {
        q: 'यदि म मेरो SIP रोक्न चाहन्छु भने के गर्ने?',
        a: 'जुनसुकै बेला बिना कुनै जरिवाना रोक्नुहोस् वा स्थगन गर्नुहोस्। पहिले लगानी गरिएका युनिटहरू बढिरहन्छन्।',
      },
      {
        q: 'के म प्राविधिक रूपमा निपुण हुनु आवश्यक छ?',
        a: 'अत्तिनै सरल छ। यदि तपाईं WhatsApp चलाउन सक्नुहुन्छ भने, eazySIP सजिलै प्रयोग गर्न सक्नुहुन्छ।',
      },
      {
        q: 'यो FD भन्दा कसरी फरक छ?',
        a: 'FD ले ६-७% ब्याज दिन्छ। १०+ वर्षको दीर्घकालीन इक्विटी SIP ले चक्रवृद्धिका कारण उच्च वृद्धि हासिल गर्न मद्दत गर्छ।',
      },
      {
        q: 'आपतकालीन अवस्थामा रकम झिक्न सकिन्छ?',
        a: 'हो, जुनसुकै बेला। रकम १-३ कार्यदिनमा सीधै तपाईंको बैंक खातामा जम्मा हुन्छ।',
      },
    ],
    stillQuestions: 'अझै केही प्रश्नहरू छन्?',
    chatWithUs: 'सहायोगीसँग कुरा गर्नुहोस्',
  },
};

export default function FAQSection({ lang = 'en' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const data = lang === 'ne' ? faqData.ne : faqData.en;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-50/60 border-t border-stone-200/60 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <SlideUp delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-heading">
                {data.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-3 font-normal max-w-xl mx-auto">
                {data.subtitle}
              </p>
            </div>
          </SlideUp>

          {/* Accordion List */}
          <div className="space-y-4">
            {data.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <SlideUp key={idx} delay={0.08 * (idx + 1)}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-[#1c7e4b]/40 shadow-md ring-1 ring-[#1c7e4b]/10'
                        : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => toggle(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-gray-900 leading-snug font-heading">
                        {item.q}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? 'bg-[#1c7e4b] text-white rotate-180' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed font-normal border-t border-gray-100 mt-1">
                        <p className="pt-3">{item.a}</p>
                      </div>
                    )}
                  </div>
                </SlideUp>
              );
            })}
          </div>

          {/* Bottom Contact Prompt */}
          <SlideUp delay={0.4}>
            <div className="mt-12 text-center bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="text-center sm:text-left">
                <h3 className="text-base font-bold text-gray-900 font-heading">{data.stillQuestions}</h3>
                <p className="text-xs text-gray-500 mt-0.5">We are here to help you every step of the way.</p>
              </div>
              <a
                href="https://wa.me/919134196221"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1c7e4b] hover:bg-[#15633a] text-white text-xs font-bold transition-all shadow-sm shrink-0"
              >
                <MessageCircle size={15} />
                <span>{data.chatWithUs}</span>
              </a>
            </div>
          </SlideUp>

        </div>
      </div>
    </section>
  );
}
