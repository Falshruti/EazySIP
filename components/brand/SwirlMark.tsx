import { memo } from 'react';

interface SwirlMarkProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
}

/**
 * EazySIP swirl motif — derived from the logo's counting-bundle spiral.
 * Use as decorative background on dark or light surfaces.
 */
function SwirlMark({
  className,
  color = '#d0fb11',
  strokeWidth = 14,
  opacity = 1,
}: SwirlMarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ opacity }}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
        <path d="M100 30 C 150 30, 170 70, 170 100" />
        <path d="M100 50 C 140 50, 155 80, 155 105" opacity="0.9" />
        <path d="M100 70 C 130 70, 140 90, 138 110" opacity="0.8" />
        <path d="M100 90 C 120 90, 125 100, 122 115" opacity="0.7" />
        <path d="M30 100 C 30 70, 60 40, 100 40" opacity="0.95" />
        <path d="M45 115 C 50 85, 75 60, 105 60" opacity="0.85" />
        <path d="M60 130 C 65 100, 85 80, 110 80" opacity="0.75" />
        <path d="M75 145 C 78 120, 92 105, 112 100" opacity="0.65" />
      </g>
      <circle cx="100" cy="100" r="10" fill={color} opacity={0.9} />
    </svg>
  );
}

export default memo(SwirlMark);
