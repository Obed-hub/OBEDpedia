import React, { useState } from 'react';
import {
  Calculator,
  Activity,
  Percent,
  Calendar,
  Sparkles,
  GitCompare,
  ArrowRight,
  Check,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { COMPARE_DATA } from '../data/compareData';

export const LiveCalculatorsSuite: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'bmi' | 'percentage' | 'age' | 'compare'>('bmi');

  // BMI State
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [weightLbs, setWeightLbs] = useState('155');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  // Percentage State
  const [pctMode, setPctMode] = useState<'what_is' | 'is_what' | 'increase_decrease'>('what_is');
  const [pctA, setPctA] = useState('15');
  const [pctB, setPctB] = useState('250');

  // Age State
  const [birthDate, setBirthDate] = useState('1998-06-15');

  // Compare State
  const [selectedCompareId, setSelectedCompareId] = useState('cmp-1');

  // BMI Math
  const computeBMI = () => {
    let w = parseFloat(weightKg);
    let h = parseFloat(heightCm) / 100;
    if (unit === 'imperial') {
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || '0');
      h = totalInches * 0.0254;
      w = parseFloat(weightLbs) * 0.45359237;
    }
    if (!w || !h || h <= 0) return { bmi: 0, category: 'N/A', color: 'text-slate-400', minHealthy: 0, maxHealthy: 0 };
    const bmi = +(w / (h * h)).toFixed(1);
    let category = 'Normal weight';
    let color = 'text-emerald-400';
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-amber-400';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-amber-400';
    } else if (bmi >= 30) {
      category = 'Obese';
      color = 'text-red-400';
    }
    const minHealthy = +(18.5 * h * h * (unit === 'imperial' ? 2.20462 : 1)).toFixed(1);
    const maxHealthy = +(24.9 * h * h * (unit === 'imperial' ? 2.20462 : 1)).toFixed(1);
    return { bmi, category, color, minHealthy, maxHealthy };
  };

  // Percentage Math
  const computePercentage = () => {
    const a = parseFloat(pctA) || 0;
    const b = parseFloat(pctB) || 0;
    if (pctMode === 'what_is') {
      const result = +((a / 100) * b).toFixed(2);
      return { result: result.toString(), formula: `${a}% of ${b} = (${a} ÷ 100) × ${b}` };
    } else if (pctMode === 'is_what') {
      if (b === 0) return { result: '0%', formula: 'Cannot divide by 0' };
      const result = +((a / b) * 100).toFixed(2);
      return { result: `${result}%`, formula: `${a} is (${a} ÷ ${b}) × 100%` };
    } else {
      if (a === 0) return { result: '0%', formula: 'Base value is 0' };
      const diff = b - a;
      const pctChange = +((diff / a) * 100).toFixed(2);
      const isPositive = pctChange >= 0;
      return {
        result: `${isPositive ? '+' : ''}${pctChange}%`,
        formula: `((${b} - ${a}) ÷ ${a}) × 100% = ${isPositive ? 'Increase' : 'Decrease'} of ${Math.abs(pctChange)}%`,
      };
    }
  };

  // Age Math
  const computeAge = () => {
    const b = new Date(birthDate);
    const now = new Date();
    if (isNaN(b.getTime())) return { years: 0, months: 0, days: 0, totalDays: 0, nextDays: 0 };

    let years = now.getFullYear() - b.getFullYear();
    let months = now.getMonth() - b.getMonth();
    let days = now.getDate() - b.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = Math.abs(now.getTime() - b.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Next birthday
    const nextBirthday = new Date(now.getFullYear(), b.getMonth(), b.getDate());
    if (nextBirthday.getTime() < now.getTime()) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const nextDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, nextDays };
  };

  const bmiResult = computeBMI();
  const pctResult = computePercentage();
  const ageResult = computeAge();
  const activeCompare = COMPARE_DATA.find((c) => c.id === selectedCompareId) || COMPARE_DATA[0];

  return (
    <section id="interactive-calculators" className="py-16 bg-[#080D18] border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Calculator className="h-3.5 w-3.5" />
              <span>Runnable Interactive Calculators & Comparators</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
              Instant Client-Side Tools & Software VS Engines
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Execute live health calculators, percentage math, chronological age horizons, and side-by-side software comparison matrices directly in your browser.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-slate-900/90 p-1">
            <button
              onClick={() => setActiveTool('bmi')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTool === 'bmi'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>BMI Calculator</span>
            </button>
            <button
              onClick={() => setActiveTool('percentage')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTool === 'percentage'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Percent className="h-3.5 w-3.5" />
              <span>Percentage Calculator</span>
            </button>
            <button
              onClick={() => setActiveTool('age')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTool === 'age'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Age Calculator</span>
            </button>
            <button
              onClick={() => setActiveTool('compare')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTool === 'compare'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GitCompare className="h-3.5 w-3.5" />
              <span>A vs B Comparer</span>
            </button>
          </div>
        </div>

        {/* Tab 1: BMI Calculator */}
        {activeTool === 'bmi' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold text-slate-200">Body Mass Index Parameters</span>
                <div className="flex items-center rounded-lg bg-slate-800 p-0.5">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-2.5 py-1 text-[11px] rounded ${
                      unit === 'metric' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    Metric (kg/cm)
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-2.5 py-1 text-[11px] rounded ${
                      unit === 'imperial' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    Imperial (lbs/ft)
                  </button>
                </div>
              </div>

              {unit === 'metric' ? (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Weight (lbs)</label>
                    <input
                      type="number"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Height (Feet)</label>
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Inches</label>
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-2 text-xs text-slate-400">
                Route: <code className="font-mono text-cyan-300">/tools/calculators/bmi-calculator</code>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/90 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs text-slate-400">Computed BMI Score</div>
                  <div className="font-mono text-4xl font-bold text-white tabular-nums mt-1">
                    {bmiResult.bmi} <span className="text-xs font-normal text-slate-400">kg/m²</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Classification</div>
                  <div className={`font-display text-lg font-bold ${bmiResult.color} mt-0.5`}>
                    {bmiResult.category}
                  </div>
                </div>
              </div>

              {/* Visual Meter */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Underweight (&lt;18.5)</span>
                  <span className="text-emerald-400 font-bold">Normal (18.5 - 24.9)</span>
                  <span>Overweight (25 - 29.9)</span>
                  <span>Obese (≥30)</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="w-[25%] bg-amber-400/80" />
                  <div className="w-[30%] bg-emerald-400" />
                  <div className="w-[20%] bg-amber-400/80" />
                  <div className="w-[25%] bg-red-400" />
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-800/50 p-4 border border-white/5 space-y-1 text-xs text-slate-300">
                <div className="font-semibold text-white">Target Healthy Weight Range for your height:</div>
                <p className="text-slate-400">
                  Between <strong className="text-emerald-300">{bmiResult.minHealthy} {unit === 'metric' ? 'kg' : 'lbs'}</strong> and{' '}
                  <strong className="text-emerald-300">{bmiResult.maxHealthy} {unit === 'metric' ? 'kg' : 'lbs'}</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Percentage Calculator */}
        {activeTool === 'percentage' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-semibold text-slate-200">
                <span>Select Percentage Mode</span>
                <span className="font-mono text-cyan-400">Instant Evaluation</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setPctMode('what_is')}
                  className={`rounded-lg px-3 py-2 text-xs font-medium text-left border transition-all ${
                    pctMode === 'what_is'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/5 bg-slate-800/40 text-slate-300'
                  }`}
                >
                  1. What is X% of Y? (e.g. 15% tip on $250)
                </button>
                <button
                  onClick={() => setPctMode('is_what')}
                  className={`rounded-lg px-3 py-2 text-xs font-medium text-left border transition-all ${
                    pctMode === 'is_what'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/5 bg-slate-800/40 text-slate-300'
                  }`}
                >
                  2. X is what percent of Y? (e.g. 45 out of 180)
                </button>
                <button
                  onClick={() => setPctMode('increase_decrease')}
                  className={`rounded-lg px-3 py-2 text-xs font-medium text-left border transition-all ${
                    pctMode === 'increase_decrease'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/5 bg-slate-800/40 text-slate-300'
                  }`}
                >
                  3. % Increase or Decrease from X to Y
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Value X</label>
                  <input
                    type="number"
                    value={pctA}
                    onChange={(e) => setPctA(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Value Y</label>
                  <input
                    type="number"
                    value={pctB}
                    onChange={(e) => setPctB(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                Route: <code className="font-mono text-cyan-300">/tools/calculators/percentage-calculator</code>
              </div>
            </div>

            {/* Right Output */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/90 p-6">
              <div className="text-xs text-slate-400">Calculated Percentage Outcome</div>
              <div className="font-mono text-4xl font-bold text-cyan-400 tabular-nums mt-1">
                {pctResult.result}
              </div>

              <div className="mt-6 rounded-xl bg-slate-800/50 p-4 border border-white/5 space-y-2 text-xs">
                <div className="font-semibold text-white">Mathematical Step-by-Step Formula:</div>
                <div className="font-mono text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-white/5">
                  {pctResult.formula}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Age Calculator */}
        {activeTool === 'age' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-semibold text-slate-200">
                <span>Enter Birth Date</span>
                <span className="font-mono text-cyan-400">Gregorian Calendar</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 text-xs text-slate-400">
                Route: <code className="font-mono text-cyan-300">/tools/calculators/age-calculator</code>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/90 p-6 space-y-5">
              <div>
                <div className="text-xs text-slate-400">Chronological Age</div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-white tabular-nums mt-1">
                  {ageResult.years} <span className="text-sm font-normal text-slate-400">years</span> {ageResult.months}{' '}
                  <span className="text-sm font-normal text-slate-400">months</span> {ageResult.days}{' '}
                  <span className="text-sm font-normal text-slate-400">days</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-800/50 p-3.5 border border-white/5">
                  <div className="text-xs text-slate-400">Total Days Lived</div>
                  <div className="font-mono text-xl font-bold text-emerald-400 mt-1">
                    {ageResult.totalDays.toLocaleString()} days
                  </div>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-3.5 border border-white/5">
                  <div className="text-xs text-slate-400">Next Birthday Countdown</div>
                  <div className="font-mono text-xl font-bold text-cyan-400 mt-1">
                    in {ageResult.nextDays} days
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Compare Matrix Engine */}
        {activeTool === 'compare' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {COMPARE_DATA.map((cmp) => (
                <button
                  key={cmp.id}
                  onClick={() => setSelectedCompareId(cmp.id)}
                  className={`rounded-lg px-3 py-1.5 font-medium whitespace-nowrap transition-colors ${
                    selectedCompareId === cmp.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800/70 text-slate-300 hover:text-white'
                  }`}
                >
                  {cmp.title.split(':')[0]}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400">{activeCompare.canonicalPath}</span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">{activeCompare.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {activeCompare.searchVolume.toLocaleString()} searches/mo
                </span>
              </div>

              {/* Side by side comparison */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Item A */}
                <div className="rounded-xl bg-slate-800/40 p-4 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-base">{activeCompare.itemA.name}</span>
                    <span className="font-mono text-xs text-emerald-400 font-semibold">{activeCompare.itemA.pricing}</span>
                  </div>
                  <div className="text-xs text-slate-400">{activeCompare.itemA.type}</div>
                  <div className="space-y-1.5 text-xs text-slate-300 pt-2">
                    {activeCompare.itemA.pros.map((pro, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Item B */}
                <div className="rounded-xl bg-slate-800/40 p-4 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-base">{activeCompare.itemB.name}</span>
                    <span className="font-mono text-xs text-amber-400 font-semibold">{activeCompare.itemB.pricing}</span>
                  </div>
                  <div className="text-xs text-slate-400">{activeCompare.itemB.type}</div>
                  <div className="space-y-1.5 text-xs text-slate-300 pt-2">
                    {activeCompare.itemB.pros.map((pro, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verdict */}
              <div className="mt-6 rounded-xl bg-cyan-950/20 border border-cyan-500/30 p-4 text-xs">
                <span className="font-bold text-cyan-300">OmniIndex Analysis Verdict: </span>
                <span className="text-slate-200">{activeCompare.verdict}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
