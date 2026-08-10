'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { TrendingUp, Target, LineChart, BookOpen, ShieldCheck } from 'lucide-react';

interface Section {
  title: string;
  description: string;
  imagePosition: 'left' | 'right';
  bgColor: string;
  emoji: string;
}

interface AlternatingSectionsProps {
  sections: Section[];
}

type Variant = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  surface: string;
  swirl: string;
  accentText: string;
  cardShadow: string;
};

const variants: Variant[] = [
  { icon: TrendingUp, surface: 'bg-teal',     swirl: '#d0fb11', accentText: 'text-lime',   cardShadow: 'shadow-teal' },
  { icon: Target,     surface: 'bg-lime',     swirl: '#004242', accentText: 'text-teal',   cardShadow: 'shadow-lime' },
  { icon: LineChart,  surface: 'bg-stone',    swirl: '#00804d', accentText: 'text-teal',   cardShadow: 'shadow-card' },
  { icon: BookOpen,   surface: 'bg-emerald-brand', swirl: '#d0fb11', accentText: 'text-lime',  cardShadow: 'shadow-teal' },
  { icon: ShieldCheck,surface: 'bg-navy',     swirl: '#d0fb11', accentText: 'text-lime',   cardShadow: 'shadow-teal' },
];

export default function AlternatingSections({ sections }: AlternatingSectionsProps) {
  return (
    <div className="bg-white">
      {sections.map((section, i) => {
        const v = variants[i % variants.length];
        const Icon = v.icon;
        const flip = section.imagePosition === 'right';
        return (
          <section key={i} className={`relative py-20 sm:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-stone'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`lg:grid lg:grid-cols-2 lg:gap-20 items-center`}>
                {/* Visual */}
                <FadeIn className={`flex justify-center mb-12 lg:mb-0 ${flip ? 'lg:order-2' : ''}`}>
                  <div className="relative">
                    {/* Giant brand card */}
                    <div className={`relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-[40px] ${v.surface} ${v.cardShadow} overflow-hidden flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_65%)] pointer-events-none" />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className={`w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ${v.accentText}`}>
                          <Icon className="w-10 h-10" strokeWidth={2.2} />
                        </div>
                        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${v.accentText}`}>
                          0{i + 1} / 0{sections.length}
                        </p>
                      </div>
                    </div>

                    {/* Floating chip — hidden on mobile to prevent bleed */}
                    <div className="hidden sm:block absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-card border border-teal/10">
                      <p className="text-[10px] uppercase tracking-widest text-muted font-semibold">Feature</p>
                      <p className="text-sm font-extrabold text-navy">{i + 1} of {sections.length}</p>
                    </div>
                    <div className="hidden sm:flex absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-lime items-center justify-center shadow-lime">
                      <div className="w-6 h-6 rounded-full bg-teal" />
                    </div>
                  </div>
                </FadeIn>

                {/* Copy */}
                <FadeIn delay={0.15} className={flip ? 'lg:order-1' : ''}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-brand mb-4">
                    Chapter {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] tracking-tight mb-6 text-navy text-balance">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed mb-8 text-muted text-pretty">
                    {section.description}
                  </p>
                  <a
                    href="#download"
                    className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-teal text-teal rounded-full font-semibold transition-all hover:bg-teal hover:text-lime"
                  >
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
