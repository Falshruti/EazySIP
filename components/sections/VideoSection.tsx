'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';

interface VideoSectionProps {
    headline: string;
    subheadline: string;
}

export default function VideoSection({ headline, subheadline }: VideoSectionProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <SlideUp>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4 font-body">See it in action</p>
                    <h2 className="text-3xl md:text-5xl font-heading text-dark mb-6 tracking-tight leading-tight">
                        {headline}
                    </h2>
                    <p className="text-lg text-text-gray mb-12 max-w-2xl mx-auto font-body">
                        {subheadline}
                    </p>
                </SlideUp>

                <FadeIn delay={0.2} className="relative max-w-5xl mx-auto group cursor-pointer">
                    <div
                        onClick={() => setIsPlaying(true)}
                        className="w-full aspect-video rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden relative group-hover:scale-[1.01] transition-transform duration-500"
                    >
                        {/* Thumbnail Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-dark-section via-[#1a3a1a] to-dark-section">
                            {/* Nature elements */}
                            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/20 to-transparent" />
                            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/5 blur-xl" />
                            <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-primary/10 blur-lg" />
                        </div>

                        {/* Red Panda + Phone Composition */}
                        <div className="absolute inset-0 flex items-center justify-center gap-6 z-10">
                            {/* Bamboo branch decoration */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/30 to-transparent" />

                            {/* Red Panda placeholder */}
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-amber-600 via-orange-500 to-red-600 flex items-center justify-center shadow-2xl border-4 border-white/20 relative z-10">
                                <span className="text-5xl sm:text-6xl">🐼</span>
                            </div>

                            {/* Phone next to panda */}
                            <div className="hidden sm:block w-28 h-56 rounded-2xl bg-dark p-1.5 shadow-2xl relative z-10">
                                <div className="w-full h-full rounded-xl bg-gradient-to-b from-primary-100 to-white flex flex-col items-center justify-center p-3">
                                    <p className="text-[8px] text-text-gray font-bold uppercase font-body">Portfolio</p>
                                    <p className="text-lg font-black text-primary font-body">₹4.2L</p>
                                    <div className="w-full h-8 mt-2 rounded bg-primary/10 flex items-end px-1 pb-1 gap-0.5">
                                        {[3, 5, 4, 7, 6, 8, 9, 7, 10, 8, 11, 12].map((h, i) => (
                                            <div key={i} className="flex-1 bg-primary/60 rounded-t" style={{ height: `${h * 6}%` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cloud effects */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/20">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-primary pl-1">
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <p className="text-xs text-text-gray mt-6 font-body">Video content coming soon. Check back for the full eazySIP experience walkthrough.</p>
            </div>

            {/* Video Overlay Modal */}
            {isPlaying && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="w-full max-w-4xl aspect-video bg-dark-section rounded-2xl flex items-center justify-center">
                        <p className="text-white/60 text-lg font-body">Video player placeholder</p>
                    </div>
                </div>
            )}
        </section>
    );
}
