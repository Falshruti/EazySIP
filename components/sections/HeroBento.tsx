'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useTransform,
} from 'framer-motion';
import {
  Heart,
  GraduationCap,
  Plane,
  Home,
  TreePalm,
  TrendingUp,
  ArrowUpRight,
  Shield,
  Building2,
  CheckCircle,
  Lock,
} from 'lucide-react';

// ─── Animated number counter ──────────────────────────────────────────────────
function Counter({ to, prefix = '₹', duration = 2.4 }: {
  to: number;
  prefix?: string;
  duration?: number;
}) {
  const mv = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, to, {
      duration,
      ease: 'easeOut',
    });
    return ctrl.stop;
  }, [inView, mv, to, duration]);

  const display = useTransform(mv, (v) =>
    `${prefix}${Math.round(v).toLocaleString('en-IN')}`
  );

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── Animated bar chart (growth visualization) ───────────────────────────────
const BARS = [12, 20, 31, 44, 58, 74, 92, 100];

function MiniBarChart({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[5px] h-14" aria-hidden="true">
      {BARS.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t bg-lime/50"
          initial={{ scaleY: 0 }}
          animate={active ? { scaleY: 1 } : {}}
          transition={{
            delay: 0.55 + i * 0.055,
            duration: 0.38,
            ease: 'easeOut',
          }}
          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
}

// ─── Goal card data ───────────────────────────────────────────────────────────
type GoalCard = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
  en: string;
  ne: string;
  amount: string;
  iconColor: string;
  iconBg: string;
  cardBorder: string;
  wideOnMobile?: boolean;
};

const GOALS: GoalCard[] = [
  {
    Icon: Heart,
    en: 'Wedding Fund',
    ne: 'विवाह कोष',
    amount: '₹2,000/mo',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-50',
    cardBorder: 'border-rose-100',
  },
  {
    Icon: GraduationCap,
    en: "Child's Education",
    ne: 'शिक्षा कोष',
    amount: '₹1,500/mo',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    cardBorder: 'border-blue-100',
  },
  {
    Icon: Plane,
    en: 'Dream Trip',
    ne: 'सपनाको यात्रा',
    amount: '₹800/mo',
    iconColor: 'text-emerald',
    iconBg: 'bg-emerald-50',
    cardBorder: 'border-emerald-100',
  },
  {
    Icon: Home,
    en: 'Own a Home',
    ne: 'आफ्नो घर',
    amount: '₹3,000/mo',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    cardBorder: 'border-amber-100',
  },
  {
    Icon: TreePalm,
    en: 'Retirement',
    ne: 'सेवानिवृत्ति',
    amount: '₹500/mo',
    iconColor: 'text-teal',
    iconBg: 'bg-teal/10',
    cardBorder: 'border-teal/10',
    wideOnMobile: true,
  },
];

// ─── Trust badges ─────────────────────────────────────────────────────────────
const TRUST = [
  { Icon: Shield,      en: 'SEBI Compliant',   ne: 'SEBI अनुरूप'   },
  { Icon: Building2,   en: 'BSE StAR MF',      ne: 'BSE StAR MF'   },
  { Icon: CheckCircle, en: 'AMFI Registered',  ne: 'AMFI दर्ता'    },
  { Icon: Lock,        en: '256-bit Encrypted',ne: 'एन्क्रिप्टेड' },
] as const;

// ─── Framer Motion variants ───────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: 'easeOut' as const },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroBento({ lang }: { lang: 'en' | 'ne' }) {
  const en = lang === 'en';
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: '-4% 0px' });

  return (
    <motion.div
      ref={wrapRef}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full"
    >
      {/* ── 1. Counter card — 2×2, teal ──────────────────────────────────── */}
      <motion.div
        variants={card}
        className="col-span-2 row-span-2 lg:col-span-2 lg:row-span-2
          relative overflow-hidden rounded-3xl bg-teal
          p-6 sm:p-7 lg:p-8
          flex flex-col justify-between
          min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]"
      >
        {/* decorative circles */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/[0.04]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full"
          style={{ background: 'rgba(208,251,17,0.07)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-lime/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-lime">
            <TrendingUp className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
            {en ? 'Goal-Based SIP' : 'लक्ष्य-आधारित SIP'}
          </div>
          <p className="text-sm font-medium text-white/55">
            {en ? '₹500/mo × 10 years' : '₹५०० × १० वर्ष'}
          </p>
          <p
            className="text-[2.6rem] sm:text-5xl font-black leading-none text-lime tabular-nums"
            aria-label={en ? 'Estimated return 1,23,453 rupees' : 'अनुमानित प्रतिफल ₹१,२३,४५३'}
          >
            <Counter to={123453} />
          </p>
          <p className="text-xs font-medium text-white/45">
            {en ? 'estimated @ 12% annual returns' : '१२% वार्षिक प्रतिफलमा अनुमानित'}
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          <MiniBarChart active={inView} />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white/65">
              {en ? 'Start from ₹100/month' : '₹१०० बाट सुरु'}
            </span>
            <a
              href="#calculator"
              className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-end gap-1 text-sm font-bold text-lime transition-all hover:gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 rounded"
            >
              {en ? 'Calculate' : 'हिसाब'}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── 2–5. Goal cards ──────────────────────────────────────────────── */}
      {GOALS.map((g, i) => (
        <motion.div
          key={g.en}
          variants={card}
          className={[
            'rounded-3xl border bg-white p-5 sm:p-6',
            'flex flex-col justify-between',
            'min-h-[130px] sm:min-h-[150px]',
            'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
            g.cardBorder,
            // Retirement spans full width on mobile only
            g.wideOnMobile ? 'col-span-2 lg:col-span-1' : 'col-span-1',
          ].join(' ')}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${g.iconBg}`}
          >
            <g.Icon
              className={`h-5 w-5 ${g.iconColor}`}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight text-navy">
              {en ? g.en : g.ne}
            </p>
            <p className="mt-0.5 text-lg font-extrabold tabular-nums text-teal">
              {g.amount}
            </p>
          </div>
        </motion.div>
      ))}

      {/* ── 6. Trust strip — full width ───────────────────────────────────── */}
      <motion.div
        variants={card}
        className="col-span-2 lg:col-span-3 rounded-3xl border border-teal/[0.09]
          bg-teal/[0.045] px-5 py-4 sm:px-7 sm:py-5
          flex flex-wrap items-center justify-between gap-3"
      >
        <p className="text-sm font-bold text-navy">
          {en ? 'Your money is fully protected' : 'तपाईंको पैसा पूर्ण सुरक्षित छ'}
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {TRUST.map(({ Icon, en: label, ne: labelNe }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-xs font-semibold text-teal/80"
            >
              <Icon
                className="h-3.5 w-3.5 text-emerald"
                strokeWidth={2}
                aria-hidden="true"
              />
              {en ? label : labelNe}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
