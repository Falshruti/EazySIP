'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

interface ScrollScaleProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  initialScale?: number;
  style?: CSSProperties;
}

export function ScrollScale({
  children,
  delay = 0,
  className = '',
  duration = 0.65,
  initialScale = 0.92,
  style,
}: ScrollScaleProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
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
