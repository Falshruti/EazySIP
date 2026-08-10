'use client';

import { FadeIn } from '@/components/animations/FadeIn';

interface BoldStatementProps {
    line1: string;
    line2: string;
}

export default function BoldStatement({ line1, line2 }: BoldStatementProps) {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32 bg-teal">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,251,17,0.08),transparent_60%)] pointer-events-none" />

            <FadeIn className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-lime/70 mb-6">
                    Our Mission
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-balance">
                    <span className="text-lime">{line1}</span>
                    <br />
                    <span className="text-white">{line2}</span>
                </h2>
                <div className="mt-10 flex justify-center">
                    <div className="w-20 h-1 rounded-full bg-lime" />
                </div>
            </FadeIn>
        </section>
    );
}
