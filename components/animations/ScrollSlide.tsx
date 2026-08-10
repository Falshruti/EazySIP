'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

interface ScrollSlideProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
  duration?: number;
  distance?: number;
  style?: CSSProperties;
}

export function ScrollSlide({
  children,
  direction = 'left',
  delay = 0,
  className = '',
  duration = 0.65,
  distance = 50,
  style,
}: ScrollSlideProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      case 'down':
        return { x: 0, y: -distance };
      case 'up':
      default:
        return { x: 0, y: distance };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
