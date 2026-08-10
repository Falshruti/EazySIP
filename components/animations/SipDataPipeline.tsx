'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Smartphone, Server, RefreshCcw, Landmark, ShieldCheck } from 'lucide-react';

interface SipDataPipelineProps {
  dict: any;
}

export default function SipDataPipeline({ dict }: SipDataPipelineProps) {
  const GOALS = [dict.g1, dict.g2, dict.g3, dict.g4, dict.g5, dict.g6, dict.g7];

  const [goalIndex, setGoalIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGoalIndex((prev) => (prev + 1) % GOALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [GOALS.length]);

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden bg-navy-deep border border-teal/40 shadow-[0_0_50px_rgba(0,66,66,0.5)] flex items-center justify-center p-4 sm:p-8 font-mono">

      {/* ── Background Grid ── */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />

      {/* ── Ambient Glows ── */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-lime/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-teal/30 rounded-full blur-3xl" />

      {/* ── The Architecture SVG ── */}
      <div className="relative z-10 w-full h-full">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="glow-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004242" />
              <stop offset="50%" stopColor="#d0fb11" />
              <stop offset="100%" stopColor="#00804d" />
            </linearGradient>

            {/* Marching ants path effect */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Lines connecting nodes */}
          {/* User to Hub */}
          <path d="M 60 60 Q 60 200 200 200" fill="none" stroke="#004242" strokeWidth="2" strokeDasharray="4 4" />
          <motion.path
            d="M 60 60 Q 60 200 200 200"
            fill="none"
            stroke="url(#glow-line)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            filter="url(#glow)"
          />

          {/* Hub to AMC 1 */}
          <path d="M 200 200 L 320 60" fill="none" stroke="#004242" strokeWidth="2" />
          <motion.path
            d="M 200 200 L 320 60"
            fill="none"
            stroke="#d0fb11"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            style={{ opacity: 0.6 }}
          />

          {/* Hub to AMC 2 */}
          <path d="M 200 200 L 360 180" fill="none" stroke="#004242" strokeWidth="2" />
          <motion.path
            d="M 200 200 L 360 180"
            fill="none"
            stroke="#d0fb11"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            style={{ opacity: 0.6 }}
          />

          {/* Hub to AMC 3 */}
          <path d="M 200 200 L 320 300" fill="none" stroke="#004242" strokeWidth="2" />
          <motion.path
            d="M 200 200 L 320 300"
            fill="none"
            stroke="#d0fb11"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.4, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            style={{ opacity: 0.6 }}
          />

          {/* AMCs to Loop/Goal */}
          <path d="M 320 60 Q 380 60 380 210 Q 380 360 140 360" fill="none" stroke="#004242" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 360 180 Q 380 180 380 270 Q 380 360 140 360" fill="none" stroke="#004242" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 320 300 Q 380 360 140 360" fill="none" stroke="#004242" strokeWidth="2" strokeDasharray="4 4" />

          {/* Animated packets from AMCs to Goal */}
          <motion.circle cx="0" cy="0" r="4" fill="#d0fb11" filter="url(#glow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 320 60 Q 380 60 380 210 Q 380 360 140 360" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="4" fill="#00804d" filter="url(#glow)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 360 180 Q 380 180 380 270 Q 380 360 140 360" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="4" fill="#004242" filter="url(#glow)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 320 300 Q 380 360 140 360" />
          </motion.circle>
        </svg>

        {/* ── Node 1: Input (You) ── */}
        <div className="absolute top-[15%] left-[15%] transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 rounded-xl bg-teal/20 border border-teal/50 flex items-center justify-center backdrop-blur-md relative">
              <Smartphone className="w-6 h-6 text-lime" />
              <motion.div
                className="absolute inset-0 rounded-xl border border-lime"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] text-teal-light uppercase tracking-widest">{dict.youText}</p>
              <p className="text-sm font-bold text-white">₹100/day</p>
            </div>
          </motion.div>
        </div>

        {/* ── Node 2: The Hub (EazySIP Engine) ── */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-teal/30 border border-lime/40 flex items-center justify-center shadow-[0_0_20px_rgba(208,251,17,0.2)] backdrop-blur-md z-10 relative overflow-hidden">
              <Server className="w-8 h-8 text-lime z-10" />
              {/* Spinning background effect inside hub */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-teal via-transparent to-emerald opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="text-center bg-navy/80 px-2 py-1 rounded-md border border-teal/30 backdrop-blur-sm">
              <p className="text-[10px] text-lime font-semibold uppercase tracking-wider">EazySIP Engine</p>
              <p className="text-[9px] text-white/50">{dict.smartRouting}</p>
            </div>
          </motion.div>
        </div>

        {/* ── Node 3: Market Funds (AMCs) ── */}
        {/* Top AMC */}
        <div className="absolute top-[15%] left-[80%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-navy border border-teal/40 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white/70" />
            </div>
            <p className="text-[9px] text-white/40 mt-1">SBI</p>
          </div>
        </div>
        {/* Middle AMC */}
        <div className="absolute top-[45%] left-[90%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-navy border border-teal/40 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white/70" />
            </div>
            <p className="text-[9px] text-white/40 mt-1">HDFC</p>
          </div>
        </div>
        {/* Bottom AMC */}
        <div className="absolute top-[75%] left-[80%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-navy border border-teal/40 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white/70" />
            </div>
            <p className="text-[9px] text-white/40 mt-1">NIPPON</p>
          </div>
        </div>

        {/* ── Node 4: Output / Goal (Bottom Left/Center) ── */}
        <div className="absolute top-[90%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[220px]">
          <motion.div
            className="flex flex-col items-center gap-2 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-full bg-teal-dark border border-teal rounded-xl p-3 shadow-lg relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-1 h-full bg-lime" />

              <div className="flex justify-between items-center mb-1 pl-2">
                <span className="text-[10px] text-teal-light uppercase flex items-center gap-1">
                  <RefreshCcw className="w-3 h-3 animate-spin-slow text-lime/70" />
                  {dict.compounding}
                </span>
                <ShieldCheck className="w-3 h-3 text-emerald" />
              </div>

              <div className="pl-2">
                <motion.div
                  key={goalIndex}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 5 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(4px)", y: -5 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm font-bold text-white tracking-wide"
                >
                  [{GOALS[goalIndex]}]
                </motion.div>
                <div className="mt-1 h-1 w-full bg-navy rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-lime"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
