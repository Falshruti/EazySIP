'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';

interface ProblemSectionProps {
  dict: any;
}

export default function ProblemSection({ dict }: ProblemSectionProps) {
  const solutions = [dict.s1, dict.s2, dict.s3];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal mb-4">
            {dict.honestTruth}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-navy leading-[1.1] text-balance mb-6">
            {dict.headline}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-xl sm:text-2xl text-navy/50 font-semibold italic mb-8 leading-snug">
            &ldquo;{dict.quote}&rdquo;
          </p>
        </FadeIn>



        <FadeIn delay={0.2}>
          <p className="text-lg sm:text-xl text-muted leading-relaxed mb-4">
            {dict.p1}
          </p>
          <p className="text-lg sm:text-xl text-muted leading-relaxed">
            {dict.p2}
          </p>
        </FadeIn>

        <SlideUp delay={0.3}>
          <div className="mt-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-teal/[0.05] to-lime/[0.05] border border-teal/15">
            <p className="text-2xl sm:text-3xl font-extrabold text-navy mb-6">
              {dict.notProblem}
            </p>
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-teal flex items-center justify-center text-lime text-xs font-bold">
                    →
                  </span>
                  <span className="text-base sm:text-lg text-navy/80">{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-xl font-extrabold text-teal">
              {dict.whatWeAreHereFor}
            </p>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
