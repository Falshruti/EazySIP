'use client';

import { FadeIn } from '@/components/animations/FadeIn';

interface TrustSectionProps {
  dict: any;
}

export default function TrustSection({ dict }: TrustSectionProps) {
  const trustPoints = [
    { icon: '🏛️', title: dict.p1Title, desc: dict.p1Desc },
    { icon: '💸', title: dict.p2Title, desc: dict.p2Desc },
    { icon: '🔐', title: dict.p3Title, desc: dict.p3Desc },
    { icon: '💳', title: dict.p4Title, desc: dict.p4Desc },
    { icon: '👥', title: dict.p5Title, desc: dict.p5Desc },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-brand-gradient-deep">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{
            background: 'rgba(208,251,17,0.04)',
            transform: 'translate(-33%, 33%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-lime mb-4">
            {dict.safetyFirst}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-white leading-[1.1] text-balance max-w-2xl">
            {dict.headline}
          </h2>
        </FadeIn>

        {/* Trust points grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPoints.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.09}>
              <div
                className={`flex gap-4 p-6 rounded-2xl border border-white/[0.1] bg-white/[0.06] h-full ${
                  i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex-shrink-0 text-3xl mt-0.5">{t.icon}</div>
                <div>
                  <h3 className="text-base font-extrabold text-white mb-1.5">{t.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
