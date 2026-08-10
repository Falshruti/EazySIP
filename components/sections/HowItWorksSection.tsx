'use client';

import { FadeIn } from '@/components/animations/FadeIn';

interface HowItWorksSectionProps {
  dict: any;
}

export default function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  const steps = dict.steps as Array<{ num: string; icon: string; title: string; desc: string }>;

  return (
    <section className="py-20 sm:py-28 bg-stone">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal mb-4">
            {dict.label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-navy leading-[1.1] text-balance">
            {dict.headline}
          </h2>
        </FadeIn>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="relative flex flex-col p-7 rounded-3xl bg-white border border-teal/[0.1] shadow-card hover:-translate-y-1 transition-transform h-full">
                {/* Step number */}
                <div className="text-6xl font-black text-teal/[0.08] leading-none mb-4 select-none">
                  {step.num}
                </div>
                {/* Icon */}
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-base font-extrabold text-navy mb-2 leading-snug">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-grow">{step.desc}</p>

                {/* Connector line (desktop only, not on last card) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-teal/[0.18] z-10" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.45} className="mt-12 text-center">
          <a
            href="#download"
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full bg-teal text-lime shadow-[0_8px_24px_rgba(0,66,66,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-teal"
          >
            {dict.cta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
