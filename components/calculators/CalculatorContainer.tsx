'use client';

import { useState } from 'react';
import SipCalculator from './SipCalculator';
import GoalCalculator from './GoalCalculator';
import { TrendingUp, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { SlideUp } from '@/components/animations/SlideUp';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorContainerProps {
  dict: any;
  lang?: string;
}

export default function CalculatorContainer({ dict, lang = 'en' }: CalculatorContainerProps) {
  const [activeCalc, setActiveCalc] = useState<'sip' | 'goal'>('sip');
  const isNe = lang === 'ne';

  return (
    <section className="py-12 bg-gray-950 text-white min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Calculator Selection Cards */}
        <SlideUp className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[#d0fb11] font-bold text-xs uppercase tracking-widest bg-[#d0fb11]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#d0fb11]/20">
              {isNe ? 'आफ्नो क्याल्कुलेटर छान्नुहोस्' : 'Select Your Calculator'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {isNe ? 'वित्तीय योजना औजारहरू' : 'Choose What You Want to Calculate'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1: SIP Calculator */}
            <button
              type="button"
              onClick={() => setActiveCalc('sip')}
              className={`relative p-6 sm:p-8 rounded-3xl border-2 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                activeCalc === 'sip'
                  ? 'bg-gradient-to-br from-[#004242] to-[#002e2e] border-[#d0fb11] shadow-2xl shadow-[#d0fb11]/20 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-white/70'
              }`}
            >
              {activeCalc === 'sip' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d0fb11]/15 rounded-full blur-2xl pointer-events-none" />
              )}
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      activeCalc === 'sip' ? 'bg-[#d0fb11] text-[#004242] shadow-lg' : 'bg-white/10 text-white'
                    }`}
                  >
                    <TrendingUp size={28} />
                  </div>
                  {activeCalc === 'sip' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d0fb11] text-[#004242] font-bold text-xs shadow-sm">
                      <CheckCircle2 size={14} />
                      <span>{isNe ? 'सक्रिय छ' : 'Active'}</span>
                    </span>
                  ) : (
                    <span className="text-white/40 group-hover:text-white/80 transition-colors">
                      <ArrowRight size={20} />
                    </span>
                  )}
                </div>

                <h3
                  className={`text-xl sm:text-2xl font-extrabold mb-2 font-heading ${
                    activeCalc === 'sip' ? 'text-white' : 'text-white/90'
                  }`}
                >
                  {isNe ? 'SIP वृद्धि क्याल्कुलेटर' : 'SIP Calculator'}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {isNe
                    ? 'तपाईंको मासिक लगानीले भविष्यमा कति रकम कमाउँछ भन्ने कुरा गणना गर्नुहोस्।'
                    : 'Calculate how much your monthly SIP investment will grow into over time with compound interest.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#d0fb11]">
                <span>{isNe ? 'मासिक लगानी → भविष्यको रकम' : 'Monthly SIP → Future Corpus'}</span>
                <span className="underline">{isNe ? 'खोल्नुहोस्' : 'Calculate SIP'}</span>
              </div>
            </button>

            {/* Card 2: Goal Calculator */}
            <button
              type="button"
              onClick={() => setActiveCalc('goal')}
              className={`relative p-6 sm:p-8 rounded-3xl border-2 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                activeCalc === 'goal'
                  ? 'bg-gradient-to-br from-[#004242] to-[#002e2e] border-[#d0fb11] shadow-2xl shadow-[#d0fb11]/20 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-white/70'
              }`}
            >
              {activeCalc === 'goal' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d0fb11]/15 rounded-full blur-2xl pointer-events-none" />
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      activeCalc === 'goal' ? 'bg-[#d0fb11] text-[#004242] shadow-lg' : 'bg-white/10 text-white'
                    }`}
                  >
                    <Target size={28} />
                  </div>
                  {activeCalc === 'goal' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d0fb11] text-[#004242] font-bold text-xs shadow-sm">
                      <CheckCircle2 size={14} />
                      <span>{isNe ? 'सक्रिय छ' : 'Active'}</span>
                    </span>
                  ) : (
                    <span className="text-white/40 group-hover:text-white/80 transition-colors">
                      <ArrowRight size={20} />
                    </span>
                  )}
                </div>

                <h3
                  className={`text-xl sm:text-2xl font-extrabold mb-2 font-heading ${
                    activeCalc === 'goal' ? 'text-white' : 'text-white/90'
                  }`}
                >
                  {isNe ? 'लक्ष्य योजना क्याल्कुलेटर' : 'Goal Calculator'}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {isNe
                    ? 'आफ्नो विशिष्ट लक्ष्य (जस्तै घर, शिक्षा) हासिल गर्न चाहिने आवश्यक मासिक बचत रकम गणना गर्नुहोस्।'
                    : 'Calculate the exact monthly SIP savings required to achieve your specific target goal amount.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#d0fb11]">
                <span>{isNe ? 'लक्ष्य रकम → आवश्यक मासिक बचत' : 'Target Goal → Monthly Savings'}</span>
                <span className="underline">{isNe ? 'खोल्नुहोस्' : 'Calculate Goal'}</span>
              </div>
            </button>
          </div>
        </SlideUp>

        {/* Selected Calculator Content View */}
        <AnimatePresence mode="wait">
          {activeCalc === 'sip' ? (
            <motion.div
              key="sip-calc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <SipCalculator dict={dict.home} panel={dict.sipCalculatorPanel} />
            </motion.div>
          ) : (
            <motion.div
              key="goal-calc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <GoalCalculator lang={lang} dict={dict.home} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
