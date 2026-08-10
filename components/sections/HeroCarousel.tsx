'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  headline: string;
  subheadline: string;
  cta: string;
  ctaHref: string;
  image: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, slides.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pb-28 min-h-[640px] lg:min-h-[720px] bg-stone">
      {/* Layered background — soft blooms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[720px] h-[720px] rounded-full bg-teal/[0.04] blur-3xl" />
        <div className="absolute bottom-[-140px] left-[-80px] w-[520px] h-[520px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(208, 251, 17, 0.18)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Side */}
          <div className="relative">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`transition-all duration-600 ${
                  i === current
                    ? 'opacity-100 translate-y-0 relative'
                    : 'opacity-0 translate-y-4 absolute inset-0'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-6 tracking-[0.18em] uppercase bg-teal/[0.08] text-teal">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  {i === 0 ? "India's First Nepali-Language MF App" : i === 1 ? 'SIP on Autopilot' : 'Goal-Based Investing'}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold leading-[1.05] tracking-tight text-navy text-balance">
                  {slide.headline}
                </h1>

                <p className="mt-6 text-lg sm:text-xl max-w-xl leading-relaxed text-muted">
                  {slide.subheadline}
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-3">
                  <a
                    href={slide.ctaHref}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-full bg-teal text-lime transition-all hover:-translate-y-0.5 hover:shadow-teal shadow-[0_8px_24px_rgba(0,66,66,0.28)]"
                  >
                    {slide.cta}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                  <a
                    href="https://wa.me/919134196221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full border-2 border-teal text-teal bg-transparent transition-all hover:bg-teal hover:text-lime"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="mt-9 flex flex-wrap gap-2.5">
                  {['SEBI Compliant', 'BSE StAR MF', 'AMFI Registered'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-teal border border-teal/15 shadow-card"
                    >
                      <span className="text-emerald-brand">✓</span> {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Side — App Phone Mockup */}
          <div className="mt-14 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]">

              {/* Ambient lime bloom */}
              <div
                className="absolute -inset-14 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 55% 40%, rgba(208,251,17,0.22) 0%, rgba(0,66,66,0.10) 55%, transparent 75%)',
                  filter: 'blur(24px)',
                }}
              />
              {/* Ambient teal bloom */}
              <div
                className="absolute -inset-6 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 45% 65%, rgba(0,66,66,0.22) 0%, transparent 65%)',
                  filter: 'blur(16px)',
                }}
              />

              {/* Glowing gradient border ring */}
              <div
                className="absolute -inset-[2px] rounded-[40px] pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(208,251,17,0.55) 0%, rgba(0,66,66,0.25) 45%, rgba(0,128,77,0.45) 100%)',
                  filter: 'blur(1.5px)',
                }}
              />

              {/* Pulse ring */}
              <div className="absolute -inset-3 rounded-[44px] border border-lime/25 animate-pulse-ring pointer-events-none" />

              {/* Phone mockup */}
              <div
                className="relative rounded-[36px] overflow-hidden bg-teal"
                style={{
                  boxShadow: '0 40px 100px rgba(0,66,66,0.32), 0 10px 36px rgba(0,66,66,0.16), 0 0 0 1px rgba(208,251,17,0.18)',
                }}
              >
                {/* Top glass shimmer */}
                <div
                  className="absolute top-0 left-[8%] right-[8%] h-px z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(208,251,17,0.75), transparent)' }}
                />

                {/* Notch */}
                <div className="relative z-10 flex justify-center pt-3 pb-1">
                  <div className="w-20 h-5 rounded-full bg-navy/80" />
                </div>

                {/* Portfolio header */}
                <div className="px-5 pt-2 pb-1 relative z-10">
                  <p className="text-[9px] uppercase tracking-widest text-lime/60 font-bold">Portfolio</p>
                  <p className="text-2xl font-extrabold text-white leading-tight">₹2,45,000</p>
                  <div className="flex items-center gap-1 text-lime text-[11px] font-bold mt-0.5">
                    <span>▲</span><span>14.2% YoY</span>
                  </div>
                </div>

                {/* Growth chart */}
                <div className="mx-4 mt-2 p-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] relative z-10">
                  <div className="flex items-end gap-1 h-14">
                    {[35, 42, 38, 58, 50, 68, 75, 70, 88, 82, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-lime"
                        style={{ height: `${h}%`, opacity: 0.3 + (i * 0.065) }}
                      />
                    ))}
                  </div>
                </div>

                {/* Active SIPs */}
                <div className="px-4 mt-3 space-y-1.5 relative z-10">
                  {[
                    { name: 'Axis Bluechip', amt: '₹100/mo', pct: '+12.4%' },
                    { name: 'SBI Small Cap', amt: '₹300/mo', pct: '+18.9%' },
                    { name: 'HDFC Balanced', amt: '₹200/mo', pct: '+9.6%' },
                  ].map((f) => (
                    <div key={f.name} className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.05] border border-white/[0.07]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-lime/15 flex items-center justify-center shrink-0">
                          <span className="text-lime text-[10px] font-black">₹</span>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/90 font-semibold leading-none">{f.name}</p>
                          <p className="text-[9px] text-white/45 mt-0.5">{f.amt}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-lime">{f.pct}</span>
                    </div>
                  ))}
                </div>

                {/* Start SIP CTA pill */}
                <div className="px-4 pt-3 pb-5 relative z-10">
                  <div className="w-full py-2.5 rounded-full bg-lime text-teal text-center text-[11px] font-extrabold tracking-wide shadow-lime">
                    Start SIP • ₹100/mo
                  </div>
                </div>
              </div>

              {/* Floating stat card — Min SIP */}
              <div className="hidden sm:flex absolute -left-6 bottom-14 z-20 items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-card animate-float">
                <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center text-teal font-black text-lg">₹</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted font-semibold">Min SIP</p>
                  <p className="text-lg font-extrabold text-navy leading-none">₹100/mo</p>
                </div>
              </div>

              {/* Floating stat card — Returns */}
              <div className="hidden sm:flex absolute -right-3 top-10 z-20 items-center gap-3 bg-teal rounded-2xl px-4 py-3 shadow-teal animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-lime font-semibold">Returns</p>
                  <p className="text-base font-extrabold text-white leading-none">+14.2% YoY</p>
                </div>
              </div>

              {/* Growth badge */}
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 -bottom-5 z-20 items-center gap-2 bg-white border border-lime/30 rounded-full px-4 py-2 shadow-card whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-brand animate-pulse" />
                <span className="text-[11px] font-bold tracking-wide text-teal">Your ₹100 is growing</span>
              </div>

            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center lg:justify-start gap-6 mt-14">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border-2 border-teal text-teal flex items-center justify-center transition-all hover:bg-teal hover:text-lime"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? '2.25rem' : '0.75rem',
                  height: '0.75rem',
                  backgroundColor: i === current ? '#004242' : 'rgba(0,66,66,0.22)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border-2 border-teal text-teal flex items-center justify-center transition-all hover:bg-teal hover:text-lime"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
