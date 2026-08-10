'use client';

import { useState, useEffect } from 'react';
import { calculateGoalSIP } from '@/lib/sip-calc';
import { Target, GraduationCap, Home, Car, Palmtree, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';
import { SlideUp } from '@/components/animations/SlideUp';
import { ScrollSlide } from '@/components/animations/ScrollSlide';

interface GoalCalculatorProps {
  lang?: string;
  dict?: any;
}

const goalPresets = [
  { id: 'education', icon: GraduationCap, labelEn: "Child's Education", labelNe: 'छोराछोरीको शिक्षा', amount: 1000000, years: 10 },
  { id: 'home', icon: Home, labelEn: 'Dream House', labelNe: 'सपनाको घर', amount: 2500000, years: 15 },
  { id: 'vehicle', icon: Car, labelEn: 'New Vehicle', labelNe: 'नयाँ गाडी', amount: 500000, years: 5 },
  { id: 'retirement', icon: Palmtree, labelEn: 'Retirement Corpus', labelNe: 'अवकाश कोष', amount: 5000000, years: 20 },
  { id: 'custom', icon: Target, labelEn: 'Custom Goal', labelNe: 'कस्टम लक्ष्य', amount: 100000, years: 10 },
];

export default function GoalCalculator({ lang = 'en', dict }: GoalCalculatorProps) {
  const isNe = lang === 'ne';

  // Calculator State
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  const [goalAmount, setGoalAmount] = useState(100000);
  const [lumpSum, setLumpSum] = useState(0);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  // Controlled String Inputs
  const [goalInput, setGoalInput] = useState('100000');
  const [lumpSumInput, setLumpSumInput] = useState('0');
  const [yearsInput, setYearsInput] = useState('10');
  const [rateInput, setRateInput] = useState('12');

  const [results, setResults] = useState({
    requiredMonthlySIP: 417,
    lumpSumInvestment: 0,
    lumpSumFV: 0,
    totalSipInvested: 50040,
    totalInvested: 50040,
    achievedValue: 100000,
    estimatedReturns: 49960,
  });

  useEffect(() => {
    setResults(calculateGoalSIP(goalAmount, lumpSum, years, rate));
  }, [goalAmount, lumpSum, years, rate]);

  const handleSelectPreset = (preset: typeof goalPresets[0]) => {
    setSelectedPreset(preset.id);
    if (preset.id !== 'custom') {
      setGoalAmount(preset.amount);
      setGoalInput(String(preset.amount));
      setYears(preset.years);
      setYearsInput(String(preset.years));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Generate chart data over target years
  const generateYearlyData = () => {
    const data = [];
    const monthlyRate = rate / 12 / 100;

    for (let y = 1; y <= years; y++) {
      const totalMonths = y * 12;
      const lumpFV = lumpSum * Math.pow(1 + monthlyRate, totalMonths);
      const sipFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      const sipInvested = results.requiredMonthlySIP * totalMonths;
      const totalInvest = lumpSum + sipInvested;
      const totalVal = lumpFV + (results.requiredMonthlySIP * sipFactor);
      const returns = Math.max(0, totalVal - totalInvest);

      data.push({
        year: y,
        lumpSumPortion: Math.round(lumpSum),
        sipPortion: Math.round(sipInvested),
        returnsPortion: Math.round(returns),
        total: Math.round(totalVal),
      });
    }
    return data;
  };

  const yearlyData = generateYearlyData();
  const maxValue = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].total : 1;

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
    <section className="py-20 sm:py-28 bg-[#001f3e] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SlideUp>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d0fb11]/15 text-[#d0fb11] font-bold text-xs mb-4 uppercase tracking-wider">
            <Calculator size={14} />
            <span>{isNe ? 'लक्ष्य योजना क्याल्कुलेटर' : 'Target Goal Calculator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white mb-4 leading-[1.12] tracking-tight text-balance font-heading">
            {isNe ? 'आफ्नो भविष्यका लक्ष्यहरू योजना बनाउनुहोस्' : 'Calculate Monthly Savings for Your Target Goal'}
          </h2>
          <p className="text-white/60 mb-10 max-w-2xl text-base">
            {isNe
              ? 'आफ्नो लक्ष्य रकम र समय अवधि प्रविष्ट गर्नुहोस् र लक्ष्य हासिल गर्न आवश्यक सटीक मासिक SIP रकम हेर्नुहोस्।'
              : 'Enter your targeted corpus amount, initial lump sum (if any), and time period to calculate exact required monthly SIP savings.'}
          </p>
        </SlideUp>

        {/* Goal Presets Selection */}
        <SlideUp delay={0.1} className="mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#d0fb11] mb-3 font-heading">
            {isNe ? 'आफ्नो वित्तीय लक्ष्य छान्नुहोस्' : 'Select a Financial Goal'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {goalPresets.map((preset) => {
              const Icon = preset.icon;
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#d0fb11] border-[#d0fb11] text-[#004242] shadow-xl scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#004242] text-[#d0fb11]' : 'bg-white/10 text-white'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    {isSelected && <CheckCircle2 size={18} className="text-[#004242]" />}
                  </div>
                  <span className="text-sm font-bold font-heading line-clamp-1">
                    {isNe ? preset.labelNe : preset.labelEn}
                  </span>
                  {preset.id !== 'custom' && (
                    <span className={`text-xs ${isSelected ? 'text-[#004242]/80 font-medium' : 'text-white/40'}`}>
                      ₹{(preset.amount / 100000).toFixed(preset.amount % 100000 === 0 ? 0 : 1)} Lakhs
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Controls Column */}
          <ScrollSlide direction="left" className="space-y-8">
            {/* Target Goal Amount */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-white/80 text-sm uppercase tracking-wider font-body">
                  {isNe ? 'लक्ष्य रकम (Target Goal Amount)' : 'How much are you aiming to save?'}
                </label>
                <div className="bg-[#002e2e] rounded-lg px-3 py-1.5 flex items-center gap-1 border border-white/10">
                  <span className="text-[#d0fb11] font-bold text-lg">₹</span>
                  <input
                    type="number"
                    min="10000"
                    max="100000000"
                    step="5000"
                    value={goalInput}
                    onChange={(e) => {
                      setGoalInput(e.target.value);
                      const v = Number(e.target.value);
                      if (!isNaN(v) && v >= 10000) setGoalAmount(v);
                    }}
                    onBlur={() => {
                      const clamped = Math.max(10000, goalAmount);
                      setGoalAmount(clamped);
                      setGoalInput(String(clamped));
                    }}
                    className="bg-transparent w-28 text-right font-bold text-[#d0fb11] text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={goalAmount}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setGoalAmount(v);
                  setGoalInput(String(v));
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer accent-[#d0fb11]"
              />
              <div className="flex justify-between items-center text-xs text-white/40 mt-2 font-body">
                <span>₹10,000</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setGoalAmount(500000); setGoalInput('500000'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹5L
                  </button>
                  <button
                    type="button"
                    onClick={() => { setGoalAmount(1000000); setGoalInput('1000000'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹10L
                  </button>
                  <button
                    type="button"
                    onClick={() => { setGoalAmount(2500000); setGoalInput('2500000'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹25L
                  </button>
                  <button
                    type="button"
                    onClick={() => { setGoalAmount(5000000); setGoalInput('5000000'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹50L
                  </button>
                </div>
                <span>₹1 Crore</span>
              </div>
            </div>

            {/* Upfront Lump Sum Amount */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-white/80 text-sm uppercase tracking-wider font-body">
                  {isNe ? 'हाल उपलब्ध रकम (Initial Lump Sum Amount)' : 'Do you have a lump sum amount?'}
                </label>
                <div className="bg-[#002e2e] rounded-lg px-3 py-1.5 flex items-center gap-1 border border-white/10">
                  <span className="text-[#d0fb11] font-bold text-lg">₹</span>
                  <input
                    type="number"
                    min="0"
                    max="10000000"
                    step="1000"
                    value={lumpSumInput}
                    onChange={(e) => {
                      setLumpSumInput(e.target.value);
                      const v = Number(e.target.value);
                      if (!isNaN(v) && v >= 0) setLumpSum(v);
                    }}
                    onBlur={() => {
                      const clamped = Math.max(0, lumpSum);
                      setLumpSum(clamped);
                      setLumpSumInput(String(clamped));
                    }}
                    className="bg-transparent w-24 text-right font-bold text-[#d0fb11] text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="5000"
                value={lumpSum}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setLumpSum(v);
                  setLumpSumInput(String(v));
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer accent-[#d0fb11]"
              />
              <div className="flex justify-between items-center text-xs text-white/40 mt-2 font-body">
                <span>₹0</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setLumpSum(0); setLumpSumInput('0'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹0
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLumpSum(10000); setLumpSumInput('10000'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹10K
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLumpSum(50000); setLumpSumInput('50000'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹50K
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLumpSum(100000); setLumpSumInput('100000'); }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                  >
                    ₹1L
                  </button>
                </div>
                <span>₹10 Lakhs</span>
              </div>
            </div>

            {/* Time Horizon */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-white/80 text-sm uppercase tracking-wider font-body">
                  {isNe ? 'समय अवधि (Years)' : 'Target Time Period'}
                </label>
                <div className="bg-[#002e2e] rounded-lg px-3 py-1.5 flex items-center gap-1 border border-white/10">
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
                    className="bg-transparent w-10 text-right font-bold text-[#d0fb11] text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="font-bold text-[#d0fb11] text-lg">{isNe ? 'वर्ष' : 'Years'}</span>
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
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer accent-[#d0fb11]"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1 font-body">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Expected Return Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-white/80 text-sm uppercase tracking-wider font-body">
                  {isNe ? 'अपेक्षित प्रतिफल दर (%)' : 'Expected Return Rate (%)'}
                </label>
                <div className="bg-[#002e2e] rounded-lg px-3 py-1.5 flex items-center gap-0.5 border border-white/10">
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
                    className="bg-transparent w-10 text-right font-bold text-[#d0fb11] text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="font-bold text-[#d0fb11] text-lg">%</span>
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
                className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer accent-[#d0fb11]"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1 font-body">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#download"
              className="group inline-flex items-center justify-center gap-2 w-full px-8 py-4 text-base font-extrabold rounded-full text-[#004242] bg-[#d0fb11] transition-all hover:-translate-y-0.5 shadow-lime cursor-pointer"
            >
              <span>{isNe ? 'यो लक्ष्य SIP सुरु गर्नुहोस्' : 'Start This Goal SIP in App'}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </ScrollSlide>

          {/* Results Output Column */}
          <ScrollSlide direction="right" className="flex flex-col justify-between">
            {/* Main Calculation Highlight Card */}
            <div className="bg-gradient-to-br from-[#004242] to-[#002e2e] border border-[#d0fb11]/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d0fb11]/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-[#d0fb11] text-xs font-bold uppercase tracking-[0.25em] mb-2 font-heading">
                {isNe ? 'आवश्यक मासिक SIP बचत' : 'Required Monthly Savings'}
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#d0fb11] tracking-tight">
                  {formatCurrency(results.requiredMonthlySIP)}
                </span>
                <span className="text-white/70 text-sm font-semibold">/ {isNe ? 'महिना' : 'month'}</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                {isNe
                  ? `${years} वर्षमा ${formatCurrency(goalAmount)} को लक्ष्य पूरा गर्न तपाईंले हरेक महिना ${formatCurrency(results.requiredMonthlySIP)} बचत गर्नुपर्छ।`
                  : `To reach your target goal of ${formatCurrency(goalAmount)} in ${years} years, save ${formatCurrency(results.requiredMonthlySIP)} every month.`}
              </p>
            </div>

            {/* Bar Chart Visualization */}
            <div className="flex-1 min-h-[220px] flex items-end gap-1 sm:gap-2 mb-6">
              {displayData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: '190px' }}>
                    {/* Returns Portion */}
                    <div
                      className="w-full bg-[#d0fb11] rounded-t-sm transition-all duration-500"
                      style={{ height: `${Math.round((d.returnsPortion / maxValue) * 10000) / 100}%` }}
                      title={`Returns: ${formatCurrency(d.returnsPortion)}`}
                    />
                    {/* Monthly SIP Portion */}
                    <div
                      className="w-full bg-[#00804d] transition-all duration-500"
                      style={{ height: `${Math.round((d.sipPortion / maxValue) * 10000) / 100}%` }}
                      title={`SIP Invested: ${formatCurrency(d.sipPortion)}`}
                    />
                    {/* Lump Sum Portion */}
                    {lumpSum > 0 && (
                      <div
                        className="w-full bg-white/40 transition-all duration-500"
                        style={{ height: `${Math.round((d.lumpSumPortion / maxValue) * 10000) / 100}%` }}
                        title={`Lump Sum: ${formatCurrency(d.lumpSumPortion)}`}
                      />
                    )}
                  </div>
                  <span className="text-[10px] text-white/40 font-body">{d.year}y</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-white/60">
              {lumpSum > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-white/40" />
                  <span>{isNe ? 'एकमुष्ट लगानी' : 'Lump Sum'}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#00804d]" />
                <span>{isNe ? 'मासिक SIP लगानी' : 'Total Monthly SIPs'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#d0fb11]" />
                <span>{isNe ? 'चक्रवृद्धि प्रतिफल (Gains)' : 'Compound Returns'}</span>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-1">
                  {isNe ? 'लक्ष्य रकम' : 'Target Goal'}
                </p>
                <p className="text-base font-extrabold text-white">{formatCurrency(goalAmount)}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-1">
                  {isNe ? 'जम्मा लगानी' : 'Total Invested'}
                </p>
                <p className="text-base font-extrabold text-white">{formatCurrency(results.totalInvested)}</p>
              </div>
              <div className="bg-white/5 border border-[#d0fb11]/20 rounded-xl p-3.5 col-span-2 sm:col-span-1">
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-1">
                  {isNe ? 'अनुमानित प्रतिफल' : 'Estimated Growth'}
                </p>
                <p className="text-base font-extrabold text-[#d0fb11]">{formatCurrency(results.estimatedReturns)}</p>
              </div>
            </div>

            <p className="text-[10px] text-white/30 mt-4 font-body leading-relaxed">
              * {isNe ? 'गणनाहरू १२% को सामान्य बजार प्रतिफल दरमा आधारित छन्। म्युचुअल फन्ड लगानी बजार जोखिमहरूको अधीनमा हुन्छन्।' : 'Calculations assume compounding returns over the selected duration. Mutual fund investments are subject to market risks.'}
            </p>
          </ScrollSlide>
        </div>
      </div>
    </section>
  );
}
