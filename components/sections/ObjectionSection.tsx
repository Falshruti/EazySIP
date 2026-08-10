'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

interface ObjectionSectionProps {
  dict: any;
}

export default function ObjectionSection({ dict }: ObjectionSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  const objections = [
    { q: dict.q1, a: dict.a1 },
    { q: dict.q2, a: dict.a2 },
    { q: dict.q3, a: dict.a3 },
    { q: dict.q4, a: dict.a4 },
    { q: dict.q5, a: dict.a5 },
    { q: dict.q6, a: dict.a6 },
  ];

  return (
    <section className="py-20 sm:py-28 bg-stone">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal mb-4">
            {dict.label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-navy leading-[1.1] text-balance">
            {dict.headline}
          </h2>
        </FadeIn>

        {/* Accordion */}
        <div className="space-y-3">
          {objections.map((obj, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="rounded-2xl border border-teal/[0.12] bg-white overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-teal/[0.02] transition-colors"
                  aria-expanded={open === i}
                >
                  <span className="text-base sm:text-lg font-bold text-navy">{obj.q}</span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-teal transition-transform duration-300 ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {/* Smooth height transition via CSS grid trick */}
                <div className={`accordion-body${open === i ? ' open' : ''}`}>
                  <div>
                    <div className="px-5 sm:px-6 pb-6">
                      <p className="text-base text-navy/75 leading-relaxed border-t border-teal/[0.1] pt-4">
                        {obj.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
