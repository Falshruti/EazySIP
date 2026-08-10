'use client';

import { Shield, Building2, CheckCircle, Lock } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

interface Badge {
    icon: 'shield' | 'building' | 'check' | 'lock';
    title: string;
    subtitle: string;
}

interface TrustBarProps {
    badges: Badge[];
}

const iconMap = {
    shield: Shield,
    building: Building2,
    check: CheckCircle,
    lock: Lock,
};

export default function TrustBar({ badges }: TrustBarProps) {
    return (
        <section className="relative py-12 sm:py-16 bg-brand-gradient-deep overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(208,251,17,0.06),transparent_70%)] pointer-events-none" />
            <FadeIn className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
                    {badges.map((badge, i) => {
                        const Icon = iconMap[badge.icon];
                        return (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-lime/15 border border-lime/20 transition-all group-hover:scale-110 group-hover:bg-lime/25">
                                    <Icon className="w-7 h-7 text-lime" strokeWidth={2.2} />
                                </div>
                                <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">
                                    {badge.title}
                                </h3>
                                <p className="text-xs mt-1 text-white/60">
                                    {badge.subtitle}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </FadeIn>
        </section>
    );
}
