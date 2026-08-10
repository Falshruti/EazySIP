'use client';

import { useState } from 'react';
import ContactModal from '@/components/layout/ContactModal';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { SlideUp } from '@/components/animations/SlideUp';

interface FinalCTAProps {
  lang?: string;
  dict?: any;
  whatsappText?: string;
  qrText?: string;
}

const content = {
  en: {
    headline: 'Ready to take the first step?',
    subtext: "We're here to help you start your investing journey.",
    btnText: 'Talk to an Advisor',
  },
  ne: {
    headline: 'पहिलो कदम चाल्न तयार हुनुहुन्छ?',
    subtext: 'हामी तपाईंको लगानी यात्रा सुरु गर्न मद्दत गर्न यहाँ छौं।',
    btnText: 'सल्लाहकारसँग कुरा गर्नुहोस्',
  },
};

export default function FinalCTA({ lang = 'en', dict, whatsappText, qrText }: FinalCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = lang === 'ne' ? content.ne : content.en;

  return (
    <>
      <section className="mt-16 sm:mt-20 pt-12 sm:pt-16 pb-12 sm:pb-16 border-t border-gray-100 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Banner Card */}
          <SlideUp delay={0.1}>
            <div className="bg-gradient-to-r from-[#00804d] via-[#1c7e4b] to-[#135735] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white font-heading">
                    {t.headline}
                  </h2>
                  <p className="text-sm text-white/90 mt-1 font-normal">
                    {t.subtext}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#135735] font-bold text-sm transition-all shadow-md shrink-0 cursor-pointer group"
              >
                <span>{t.btnText}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </SlideUp>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919134196221"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#135735] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform ring-4 ring-[#135735]/30 group"
          aria-label="Contact us on WhatsApp"
        >
          <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
        </a>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
