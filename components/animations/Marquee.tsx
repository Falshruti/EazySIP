'use client';

import React, { useEffect, useRef } from 'react';

interface MarqueeProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
}

export function Marquee({
    children,
    speed = 40,
    className = '',
    direction = 'left',
    pauseOnHover = false
}: MarqueeProps) {
    // Measure the exact pixel width of one copy so we can use a concrete
    // translateX value in the keyframe. Safari/iOS WebKit misresolves
    // translateX(-100%) on intrinsically-sized flex children (w-max),
    // causing the strip to disappear mid-scroll and reappear.
    const firstRef = useRef<HTMLDivElement>(null);
    const railRef  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rail  = railRef.current;
        const first = firstRef.current;
        if (!rail || !first) return;

        const measure = () => {
            const w = first.offsetWidth;
            if (w > 0) {
                // Set the exact pixel offset Safari must translate by
                rail.style.setProperty('--marquee-offset', `-${w}px`);
            }
        };

        measure();

        // Re-measure on window resize (font load, etc.)
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const animClass = direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee';
    const hoverClass = pauseOnHover ? 'hover:[animation-play-state:paused]' : '';

    return (
        <div
            ref={railRef}
            className={`flex w-full overflow-hidden ${className}`}
        >
            <div
                ref={firstRef}
                className={`flex shrink-0 ${animClass} ${hoverClass}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
            </div>
            <div
                className={`flex shrink-0 ${animClass} ${hoverClass}`}
                style={{ animationDuration: `${speed}s` }}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}
