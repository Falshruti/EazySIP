'use client';

import { useEffect, useRef, ReactNode, Children } from 'react';

interface StaggeredContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  delayChildren?: number;
}

export function StaggeredContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className = '',
}: StaggeredContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          Array.from(el.children).forEach((child) => {
            (child as HTMLElement).style.animationPlayState = 'running';
          });
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          style={{
            animationName: 'ezSlideUp',
            animationDuration: '0.55s',
            animationTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
            animationFillMode: 'both',
            animationPlayState: 'paused',
            animationDelay: `${delayChildren + i * staggerDelay}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
