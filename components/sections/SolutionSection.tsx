'use client';

import { FadeIn } from '@/components/animations/FadeIn';

interface SolutionSectionProps {
  dict: any;
}

export default function SolutionSection({ dict }: SolutionSectionProps) {
  const cards = [
    { icon: '🗑️', title: dict.c1Title, desc: dict.c1Desc },
    { icon: '🧠', title: dict.c2Title, desc: dict.c2Desc },
    { icon: '✅', title: dict.c3Title, desc: dict.c3Desc },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-brand-gradient-deep">
      {/* Background motifs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[440px] h-[440px] rounded-full translate-x-1/3 -translate-y-1/3"
          style={{ background: 'rgba(208,251,17,0.04)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-lime mb-4">
            {dict.solutionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight text-balance mb-6">
            {dict.headline}
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {dict.subHeadline}
          </p>
        </FadeIn>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5 mt-14">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.1}>
              <div className="bg-white/[0.08] border border-white/[0.14] rounded-3xl p-7 text-left hover:bg-white/[0.13] transition-colors h-full">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-extrabold text-white mb-3">{card.title}</h3>
                <p className="text-white/70 leading-relaxed text-base">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.35}>
          <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lime/[0.12] border border-lime/[0.22] text-lime font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            {dict.pillText}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
