'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PhoneCall, BookOpen, Calculator, ArrowRight } from 'lucide-react';
import ContactModal from '@/components/layout/ContactModal';
import { SlideUp } from '@/components/animations/SlideUp';

interface QuickActionCardsProps {
  lang?: string;
}

const content = {
  en: {
    card1Title: 'Talk to a Sahayogi',
    card1Sub: 'Talk to our team',
    card2Title: 'Who We Are',
    card2Sub: 'Explore & grow',
    card3Title: 'Goal Calculator',
    card3Sub: 'Plan your future',
  },
  ne: {
    card1Title: 'सहायोगीसँग कुरा गर्नुहोस्',
    card1Sub: 'हाम्रो टोलीसँग कुरा गर्नुहोस्',
    card2Title: 'हामी को हौं',
    card2Sub: 'अन्वेषण गर्नुहोस् र बढ्नुहोस्',
    card3Title: 'लक्ष्य क्याल्कुलेटर',
    card3Sub: 'आफ्नो भविष्य योजना बनाउनुहोस्',
  },
};

export default function QuickActionCards({ lang = 'en' }: QuickActionCardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = lang === 'ne' ? content.ne : content.en;

  return (
    <>
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* Card 1: Talk to a Sahayogi */}
            <SlideUp delay={0.1}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-between p-6 rounded-3xl border bg-[#edf7ee] border-[#d2edd6] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group text-left w-full cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full flex items-center justify-center bg-[#d8f2dc] text-[#1c7e4b] shrink-0 group-hover:scale-110 transition-transform">
                    <PhoneCall size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight font-heading">
                      {t.card1Title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 font-medium">
                      {t.card1Sub}
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1c7e4b] text-white hover:bg-[#15633a] transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight size={16} />
                </div>
              </button>
            </SlideUp>

            {/* Card 2: Who We Are */}
            <SlideUp delay={0.2}>
              <Link
                href={lang === 'ne' ? '/ne/about' : '/about'}
                className="flex items-center justify-between p-6 rounded-3xl border bg-[#eef3fb] border-[#d4e1f7] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full flex items-center justify-center bg-[#d7e5fa] text-[#255fb3] shrink-0 group-hover:scale-110 transition-transform">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight font-heading">
                      {t.card2Title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 font-medium">
                      {t.card2Sub}
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#255fb3] text-white hover:bg-[#1c4b8e] transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </SlideUp>

            {/* Card 3: Goal Calculator */}
            <SlideUp delay={0.3}>
              <Link
                href={lang === 'ne' ? '/ne/sip-calculator' : '/sip-calculator'}
                className="flex items-center justify-between p-6 rounded-3xl border bg-[#fff9eb] border-[#fce9be] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full flex items-center justify-center bg-[#fdeaa4] text-[#d68a00] shrink-0 group-hover:scale-110 transition-transform">
                    <Calculator size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight font-heading">
                      {t.card3Title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 font-medium">
                      {t.card3Sub}
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#e59400] text-white hover:bg-[#c47f00] transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </SlideUp>

          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
