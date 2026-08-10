'use client';

import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

interface ProductEcosystemProps {
    headline: string;
    tabs: { label: string; value: string }[];
    cards: { title: string; subtitle: string; color: string; icon: string }[];
}

const cardColors = [
    { bg: 'bg-teal',             text: 'text-lime',  sub: 'text-lime/70' },
    { bg: 'bg-[#1e4890]',        text: 'text-white', sub: 'text-white/70' },
    { bg: 'bg-stone border border-teal/15', text: 'text-teal', sub: 'text-teal/60' },
    { bg: 'bg-emerald-brand',    text: 'text-white', sub: 'text-white/80' },
    { bg: 'bg-lime',             text: 'text-teal',  sub: 'text-teal/70' },
];

export default function ProductEcosystem({ headline, tabs, cards }: ProductEcosystemProps) {
    return (
        <section className="py-20 sm:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <SlideUp className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight tracking-tight text-balance">
                        {headline}
                    </h2>
                </SlideUp>

                {/* Tab pills */}
                {tabs && tabs.length > 0 && (
                    <FadeIn delay={0.1}>
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {tabs.map((tab, i) => (
                                <div
                                    key={i}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                                        i === 0
                                            ? 'bg-teal text-lime shadow-teal'
                                            : 'bg-stone text-teal border border-teal/15'
                                    }`}
                                >
                                    {tab.label}
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                )}

                {/* Phone mockup + cards grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                    {/* Left cards */}
                    <div className="flex flex-col gap-5">
                        {cards.slice(0, Math.ceil(cards.length / 2)).map((card, i) => {
                            const c = cardColors[i % cardColors.length];
                            return (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <div className={`p-6 rounded-3xl shadow-lg hover:-translate-y-1 transition-transform ${c.bg}`}>
                                        <span className="text-3xl mb-3 block">{card.icon}</span>
                                        <h3 className={`font-extrabold text-lg leading-tight ${c.text}`}>{card.title}</h3>
                                        <p className={`text-sm mt-1 leading-snug ${c.sub}`}>{card.subtitle}</p>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>

                    {/* Centre — phone mockup */}
                    <FadeIn delay={0.15} className="flex justify-center">
                        <div className="relative">
                            {/* Ambient glow */}
                            <div
                                className="absolute -inset-10 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(ellipse at center, rgba(208,251,17,0.18) 0%, transparent 70%)',
                                    filter: 'blur(20px)',
                                }}
                            />
                            {/* Phone */}
                            <div className="relative w-[220px] sm:w-[260px] rounded-[2.5rem] bg-teal p-3 shadow-2xl">
                                <div className="w-full aspect-[9/19] rounded-[2rem] bg-gradient-to-b from-stone via-white to-stone flex flex-col items-center justify-center p-4 relative overflow-hidden">
                                    <div className="absolute top-0 w-24 h-5 bg-teal rounded-b-2xl" />
                                    <p className="text-[10px] text-teal/60 font-bold uppercase mt-4 tracking-widest">Dashboard</p>
                                    <p className="text-2xl font-black text-teal mt-1">₹2,45,000</p>
                                    <div className="w-full mt-3 space-y-2">
                                        <div className="bg-lime/25 rounded-lg p-2 text-[10px]">
                                            <span className="text-teal font-bold">▲ 14.2%</span>{' '}
                                            <span className="text-teal/60">returns</span>
                                        </div>
                                        <div className="bg-teal/[0.06] rounded-lg p-2 text-[10px]">
                                            <span className="text-teal font-bold">3 SIPs</span>{' '}
                                            <span className="text-teal/60">active</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto w-full py-2.5 rounded-full bg-lime text-teal text-center text-[11px] font-extrabold">
                                        Start SIP • ₹100/mo
                                    </div>
                                </div>
                            </div>

                            {/* Floating chips */}
                            <div className="hidden sm:flex absolute -left-8 top-8 items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-card animate-float">
                                <span className="w-2 h-2 rounded-full bg-emerald-brand animate-pulse" />
                                <span className="text-xs font-bold text-teal">Live</span>
                            </div>
                            <div className="hidden sm:flex absolute -right-8 bottom-16 items-center gap-2 bg-teal rounded-2xl px-3 py-2 shadow-teal animate-float" style={{ animationDelay: '1.2s' }}>
                                <span className="text-xs font-bold text-lime">+14.2%</span>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right cards */}
                    <div className="flex flex-col gap-5">
                        {cards.slice(Math.ceil(cards.length / 2)).map((card, i) => {
                            const colorIdx = Math.ceil(cards.length / 2) + i;
                            const c = cardColors[colorIdx % cardColors.length];
                            return (
                                <FadeIn key={i} delay={i * 0.1 + 0.2}>
                                    <div className={`p-6 rounded-3xl shadow-lg hover:-translate-y-1 transition-transform ${c.bg}`}>
                                        <span className="text-3xl mb-3 block">{card.icon}</span>
                                        <h3 className={`font-extrabold text-lg leading-tight ${c.text}`}>{card.title}</h3>
                                        <p className={`text-sm mt-1 leading-snug ${c.sub}`}>{card.subtitle}</p>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
