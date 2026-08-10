'use client';

import { useState, useEffect } from 'react';
import { calculateSIP } from '@/lib/sip-calc';
import { SlideUp } from '@/components/animations/SlideUp';
import { ScrollSlide } from '@/components/animations/ScrollSlide';

interface SipCalculatorProps {
  dict: any;
  panel: any;
}

export default function SipCalculator({ dict, panel }: SipCalculatorProps) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  // Raw string values for controlled text inputs
  const [investmentInput, setInvestmentInput] = useState('5000');
  const [yearsInput, setYearsInput] = useState('10');
  const [rateInput, setRateInput] = useState('12');

  const [results, setResults] = useState({
    totalInvested: 600000,
    estimatedReturns: 561695,
    totalValue: 1161695
  });

  useEffect(() => {
    setResults(calculateSIP(monthlyInvestment, years, rate));
  }, [monthlyInvestment, years, rate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Generate yearly data for bar chart
  const generateYearlyData = () => {
    const data = [];
    for (let y = 1; y <= years; y++) {
      const monthlyRate = rate / 12 / 100;
      const totalMonths = y * 12;
      const invested = monthlyInvestment * totalMonths;
      const fv = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      data.push({ year: y, invested, returns: fv - invested, total: fv });
    }
    return data;
  };

  const yearlyData = generateYearlyData();
  const maxValue = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].total : 1;

  // Show at most 10 bars (sample evenly if years > 10)
  const displayData = (() => {
    if (yearlyData.length <= 10) return yearlyData;
    const step = Math.ceil(yearlyData.length / 10);
    const sampled = [];
    for (let i = 0; i < yearlyData.length; i += step) {
      sampled.push(yearlyData[i]);
    }
    if (sampled[sampled.length - 1] !== yearlyData[yearlyData.length - 1]) {
      sampled.push(yearlyData[yearlyData.length - 1]);
    }
    return sampled;
  })();

  return (
    <section className="py-20 sm:py-28 bg-calc-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <p className="text-lime font-extrabold text-[11px] uppercase tracking-[0.3em] mb-4">{panel.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white mb-4 leading-[1.12] tracking-tight text-balance">
            {dict.calcTitle}
          </h2>
          <p className="text-white/60 mb-12 max-w-lg">{panel.subTagline}</p>
        </SlideUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Controls */}
          <ScrollSlide direction="left" className="space-y-8">
            {/* Monthly Investment */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-white/80 text-sm uppercase tracking-wider font-body">{dict.calcMonthly}</label>
                <div className="bg-dark-section rounded-lg px-3 py-1.5 flex items-center gap-1">
                  <span className="text-lime font-bold text-lg">₹</span>
                  <input
                    type="number"
                    min="100"
                    max="100000"
                    value={investmentInput}
                    onChange={(e) => {
                      setInvestmentInput(e.target.value);
                      const v = Number(e.target.value);
                      if (!isNaN(v) && v >= 100 && v <= 100000) setMonthlyInvestment(v);
                    }}
                    onBlur={() => {
                      const clamped = Math.min(100000, Math.max(100, monthlyInvestment));
                      setMonthlyInvestment(clamped);
                      setInvestmentInput(String(clamped));
                    }}
                    className="bg-transparent w-20 text-right font-bold text-lime text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="100"
                max="100000"
                step="100"
                value={monthlyInvestment}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setMonthlyInvestment(v);
                  setInvestmentInput(String(v));
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/30 mt-1 font-body">
                <span>₹100</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Time Period */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-white/80 text-sm uppercase tracking-wider font-body">{dict.calcPeriod}</label>
                <div className="bg-dark-section rounded-lg px-3 py-1.5 flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={yearsInput}
                    onChange={(e) => {
                      setYearsInput(e.target.value);
                      const v = Number(e.target.value);
                      if (!isNaN(v) && v >= 1 && v <= 30) setYears(v);
                    }}
                    onBlur={() => {
                      const clamped = Math.min(30, Math.max(1, years));
                      setYears(clamped);
                      setYearsInput(String(clamped));
                    }}
                    className="bg-transparent w-10 text-right font-bold text-lime text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="font-bold text-lime text-lg">{panel.yrAbbr}</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={years}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setYears(v);
                  setYearsInput(String(v));
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/30 mt-1 font-body">
                <span>{panel.oneYr}</span>
                <span>{panel.thirtyYr}</span>
              </div>
            </div>

            {/* Expected Return Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-white/80 text-sm uppercase tracking-wider font-body">{dict.calcRate}</label>
                <div className="bg-dark-section rounded-lg px-3 py-1.5 flex items-center gap-0.5">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={rateInput}
                    onChange={(e) => {
                      setRateInput(e.target.value);
                      const v = Number(e.target.value);
                      if (!isNaN(v) && v >= 1 && v <= 30) setRate(v);
                    }}
                    onBlur={() => {
                      const clamped = Math.min(30, Math.max(1, rate));
                      setRate(clamped);
                      setRateInput(String(clamped));
                    }}
                    className="bg-transparent w-10 text-right font-bold text-lime text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="font-bold text-lime text-lg">%</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={rate}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setRate(v);
                  setRateInput(String(v));
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/30 mt-1 font-body">
                <span>{panel.onePct}</span>
                <span>{panel.thirtyPct}</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#download"
              className="group inline-flex items-center justify-center gap-2 w-full px-8 py-4 text-base font-extrabold rounded-full text-teal bg-lime transition-all hover:-translate-y-0.5 shadow-lime"
            >
              {dict.calcCta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </ScrollSlide>

          {/* Results */}
          <ScrollSlide direction="right" className="flex flex-col">
            {/* Big Number */}
            <div className="mb-8">
              <p className="text-white/50 text-xs uppercase tracking-[0.25em] font-semibold mb-2">{panel.futureBalance}</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-lime tracking-tight">
                {formatCurrency(results.totalValue)}
              </p>
            </div>

            {/* Bar Chart */}
            <div className="flex-1 min-h-[200px] flex items-end gap-1 sm:gap-2">
              {displayData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: '180px' }}>
                    {/* Returns portion */}
                    <div
                      className="w-full bg-lime/90 rounded-t-sm transition-all duration-500"
                      style={{ height: `${Math.round(((d.returns) / maxValue) * 10000) / 100}%` }}
                    />
                    {/* Invested portion */}
                    <div
                      className="w-full bg-lime/40 transition-all duration-500"
                      style={{ height: `${Math.round((d.invested / maxValue) * 10000) / 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/30 font-body">{d.year}y</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-lime/40" />
                <span className="text-xs text-white/50">{dict.calcTotalInvested}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-lime/90" />
                <span className="text-xs text-white/50">{dict.calcEstReturns}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-1">{dict.calcTotalInvested}</p>
                <p className="text-lg font-extrabold text-white">{formatCurrency(results.totalInvested)}</p>
              </div>
              <div className="bg-white/5 border border-lime/20 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-1">{dict.calcEstReturns}</p>
                <p className="text-lg font-extrabold text-lime">{formatCurrency(results.estimatedReturns)}</p>
              </div>
            </div>

            <p className="text-[10px] text-white/20 mt-6 font-body leading-relaxed">
              {dict.calcDisclaimer}
            </p>
          </ScrollSlide>
        </div>
      </div>
    </section>
  );
}
