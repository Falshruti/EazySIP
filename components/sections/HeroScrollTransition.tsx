'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { Shield, Building2, CheckCircle, Lock } from 'lucide-react';
import { Marquee } from '@/components/animations/Marquee';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface HeroScrollTransitionProps {
  lang: 'en' | 'ne';
}

// ---------------------------------------------------------------------------
// AMC Ticker content (moved from page.tsx)
// ---------------------------------------------------------------------------
const AMC_ITEMS = [
  { abbr: 'SBI', label: 'SBI Mutual Fund',       bg: '#22409A' },
  { abbr: 'ICI', label: 'ICICI Prudential',       bg: '#E5501E' },
  { abbr: 'HDF', label: 'HDFC Mutual Fund',       bg: '#C1272D' },
  { abbr: 'NIP', label: 'Nippon India MF',        bg: '#D02128' },
  { abbr: 'KOT', label: 'Kotak Mahindra MF',     bg: '#ED1C24' },
  { abbr: 'AXS', label: 'Axis Mutual Fund',       bg: '#97144D' },
  { abbr: 'ABS', label: 'Aditya Birla Sun Life',  bg: '#E87722' },
  { abbr: 'MIR', label: 'Mirae Asset MF',         bg: '#003087' },
  { abbr: 'DSP', label: 'DSP Mutual Fund',        bg: '#005B8E' },
  { abbr: 'MOT', label: 'Motilal Oswal AMC',      bg: '#E07B00' },
  { abbr: 'PPF', label: 'Parag Parikh',           bg: '#1B3A5C' },
  { abbr: 'EDL', label: 'Edelweiss MF',           bg: '#0047AB' },
];

// ---------------------------------------------------------------------------
// Trust badge content (moved from page.tsx)
// ---------------------------------------------------------------------------
const trustBadges = (lang: 'en' | 'ne') => [
  {
    Icon: Shield,
    title: lang === 'en' ? 'SEBI Compliant'     : 'SEBI अनुरूप',
    sub:   lang === 'en' ? 'Fully regulated'     : 'पूर्ण रूपमा विनियमित',
  },
  {
    Icon: Building2,
    title: lang === 'en' ? 'BSE StAR MF'        : 'BSE StAR MF',
    sub:   lang === 'en' ? 'Exchange partner'    : 'एक्सचेन्ज साझेदार',
  },
  {
    Icon: CheckCircle,
    title: lang === 'en' ? 'AMFI Registered'    : 'AMFI दर्ता',
    sub:   lang === 'en' ? 'Authorized distributor' : 'अधिकृत वितरक',
  },
  {
    Icon: Lock,
    title: lang === 'en' ? '256-bit Encrypted'  : '२५६-बिट एन्क्रिप्टेड',
    sub:   lang === 'en' ? 'Bank-grade security' : 'बैंक-ग्रेड सुरक्षा',
  },
];

// ---------------------------------------------------------------------------
// Goal cards — the pre-expansion visuals orbiting the circle
// ---------------------------------------------------------------------------
const GOALS = [
  {
    emoji: '💍',
    label: 'Wedding',
    labelNe: 'विवाह',
    amount: '₹2,000/mo',
    top:  'calc(50% - 195px)',
    left: 'calc(50% + 90px)',
    rotate: '6deg',
  },
  {
    emoji: '🎓',
    label: "Child's Education",
    labelNe: 'शिक्षा',
    amount: '₹1,500/mo',
    top:  'calc(50% - 100px)',
    left: 'calc(50% - 260px)',
    rotate: '-5deg',
  },
  {
    emoji: '🏠',
    label: 'Own a Home',
    labelNe: 'घर',
    amount: '₹3,000/mo',
    top:  'calc(50% + 110px)',
    left: 'calc(50% + 120px)',
    rotate: '4deg',
  },
  {
    emoji: '🌴',
    label: 'Retirement',
    labelNe: 'सेवानिवृत्ति',
    amount: '₹100/mo',
    top:  'calc(50% + 80px)',
    left: 'calc(50% - 270px)',
    rotate: '-4deg',
  },
  {
    emoji: '✈️',
    label: 'Dream Trip',
    labelNe: 'यात्रा',
    amount: '₹800/mo',
    top:  'calc(50% - 210px)',
    left: 'calc(50% - 180px)',
    rotate: '-7deg',
  },
];

// ---------------------------------------------------------------------------
// Small helper: smooth a raw MotionValue with a spring
// ---------------------------------------------------------------------------
function useSmoothed(raw: MotionValue<number>, stiffness = 80, damping = 20) {
  return useSpring(raw, { stiffness, damping, restDelta: 0.001 });
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function HeroScrollTransition({ lang }: HeroScrollTransitionProps) {
  // The tall outer wrapper gives us scroll distance to read from.
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track how far through the scroll-capture zone we've scrolled (0 → 1).
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start center', 'end end'],
  });

  // Spring-smooth the raw progress so every derived value feels silky.
  const progress = useSmoothed(scrollYProgress, 70, 22);

  // ── Goals pre-circle (all fade out + float up before circle fills screen) ──
  const goalsOpacity = useTransform(progress, [0, 0.30], [1, 0]);
  const goalsY       = useTransform(progress, [0, 0.30], [0, -45]);

  // ── Center label inside circle (fades with goals) ─────────────────────────
  const centerOpacity = useTransform(progress, [0, 0.22], [1, 0]);
  const centerY       = useTransform(progress, [0, 0.22], [0, -20]);

  // ── Circle (scale from 1 → 8) ─────────────────────────────────────────────
  // We use scale(8) — at w-72 (288px), that's ~2304px diameter, covering any viewport.
  const circleScale    = useTransform(progress, [0.1, 0.85], [1, 8]);
  const circleBgAlpha  = useTransform(progress, [0, 0.3],   [1, 1]); // stays 1

  // ── Glow halo (fades out as circle expands) ───────────────────────────────
  const haloOpacity    = useTransform(progress, [0, 0.25], [1, 0]);

  // ── Revealed content (fades in, slides up) ────────────────────────────────
  const revealOpacity  = useTransform(progress, [0.62, 0.92], [0, 1]);
  const revealY        = useTransform(progress, [0.62, 0.92], [32, 0]);

  const en = lang === 'en';
  const badges = trustBadges(lang);

  return (
    /**
     * OUTER WRAPPER — 300vh tall so the browser gives us plenty of scroll
     * distance to drive the animation. On mobile we use 240vh.
     */
    <div
      ref={scrollRef}
      className="relative h-[240vh] sm:h-[300vh] w-full"
      aria-hidden="false"
    >
      {/*
       * STICKY SHELL — locks to the viewport while we scroll through the
       * outer wrapper. Everything visual lives inside here.
       * z-index 10 keeps it below the header (z-50).
       */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-10">

        {/*
         * ── EXPANDING CIRCLE ────────────────────────────────────────────────
         * transform: scale() is GPU-composited. will-change ensures the
         * browser pre-promotes it to its own compositor layer.
         * The circle is bg-teal so the "fill" matches the trust section feel.
         */}
        <motion.div
          className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-teal flex items-center justify-center"
          style={{
            scale: circleScale,
            willChange: 'transform',
            // Subtle inner shadow to make the circle look dimensional before expanding
            boxShadow: '0 20px 80px rgba(0,66,66,0.22), 0 0 0 1px rgba(208,251,17,0.18)',
          }}
          aria-hidden="true"
        />

        {/*
         * ── GLOW HALO (behind circle, fades out) ────────────────────────────
         */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: haloOpacity }}
        >
          <div
            className="w-[420px] h-[420px] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(208,251,17,0.20) 0%, transparent 68%)',
              filter: 'blur(20px)',
            }}
          />
        </motion.div>

        {/*
         * ── CENTER LABEL (sits inside the circle, fades first) ──────────────
         * z-30 so it floats above the scaling circle.
         */}
        <motion.div
          className="absolute flex flex-col items-center z-30 pointer-events-none text-center"
          style={{ opacity: centerOpacity, y: centerY }}
        >
          <div className="text-5xl mb-2 select-none">🎯</div>
          <p className="text-lg font-extrabold text-white tracking-wide leading-tight">
            {en ? 'Goal-Based SIP' : 'लक्ष्य-आधारित SIP'}
          </p>
          <p className="text-xs text-lime/80 mt-1 font-semibold">
            {en ? 'Start from ₹100/month' : '₹१०० बाट सुरु गर्नुहोस्'}
          </p>
        </motion.div>

        {/*
         * ── FLOATING GOAL CARDS (orbit the circle, all fade + drift up) ──────
         * Each card is absolutely positioned relative to the sticky container
         * center using calc(50% ± offset). They all share one opacity/Y motion
         * value so they exit together as a cohesive group.
         */}
        {GOALS.map((goal) => (
          <motion.div
            key={goal.label}
            className="absolute z-30 pointer-events-none"
            style={{
              opacity: goalsOpacity,
              y: goalsY,
              top: goal.top,
              left: goal.left,
              rotate: goal.rotate,
            }}
          >
            <div
              className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-2.5 shadow-lg"
              style={{ boxShadow: '0 8px 24px rgba(0,66,66,0.14), 0 0 0 1px rgba(208,251,17,0.18)' }}
            >
              <span className="text-2xl leading-none">{goal.emoji}</span>
              <div>
                <p className="text-sm font-extrabold text-teal leading-tight whitespace-nowrap">
                  {en ? goal.label : goal.labelNe}
                </p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">{goal.amount}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/*
         * ── REVEALED CONTENT LAYER ──────────────────────────────────────────
         * Absolutely covers the full sticky viewport.
         * z-20 sits above the circle (z-10) but below the panda (z-30).
         * Uses pointer-events-none until fully visible so it doesn't block
         * scrolling prematurely.
         *
         * ⚡ DROP YOUR AMC TICKER MARQUEE AND TRUST BADGE GRID BELOW ⚡
         */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4"
          style={{
            opacity: revealOpacity,
            y: revealY,
            pointerEvents: 'none', // always non-interactive (it's a transition layer)
          }}
          aria-hidden="true"
        >
          {/* ── Label ─────────────────────────────────────────────────────── */}
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-lime mb-6">
            {en ? 'Trusted & Regulated' : 'भरोसेमन्द र नियमित'}
          </p>

          {/* ── Headline ──────────────────────────────────────────────────── */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center mb-10 max-w-xl leading-tight">
            {en
              ? "Your money moves through India\u2019s most trusted platforms"
              : 'तपाईंको पैसा भारतका सबैभन्दा भरोसेमन्द प्लेटफर्महरू मार्फत जान्छ'}
          </h2>

          {/*
           * ── TRUST BADGE GRID ──────────────────────────────────────────────
           * ✅ DROP-IN SLOT: Your TrustBar badges live here.
           */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
            {badges.map(({ Icon, title, sub }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-lime/15 border border-lime/20 transition-all group-hover:scale-110 group-hover:bg-lime/25">
                  <Icon className="w-6 h-6 text-lime" strokeWidth={2.2} />
                </div>
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-white">
                  {title}
                </h3>
                <p className="text-[11px] mt-1 text-white/55">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>{/* /sticky shell */}
    </div>/* /scroll-capture wrapper */
  );
}
