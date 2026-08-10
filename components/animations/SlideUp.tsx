'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function SlideUp({ children, delay = 0, className = '' }: SlideUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationPlayState = 'running';
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        animationName: 'ezSlideUp',
        animationDuration: '0.6s',
        animationTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        animationFillMode: 'both',
        animationPlayState: 'paused',
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
