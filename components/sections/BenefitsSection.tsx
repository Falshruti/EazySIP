'use client';

import { FadeIn } from '@/components/animations/FadeIn';

interface BenefitsSectionProps {
  dict: any;
}

export default function BenefitsSection({ dict }: BenefitsSectionProps) {
  const benefits = dict.benefits as Array<{ icon: string; title: string; desc: string }>;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal mb-4">
            {dict.label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-navy leading-[1.1] text-balance">
            {dict.headline}
          </h2>
        </FadeIn>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <div className="flex gap-5 p-6 rounded-2xl border border-teal/[0.1] hover:border-teal/[0.25] hover:bg-teal/[0.02] transition-all h-full">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-teal/[0.07] flex items-center justify-center text-2xl">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-navy mb-1.5">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
