import React, { useState } from 'react';
import { AdvisorInputs, Vehicle } from '../../types/ev';
import { getRecommendations } from '../../services/recommendationEngine';
import {
  Sparkles,
  X,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  allVehicles: Vehicle[];
  onSelectVehicle: (slug: string) => void;
  onCompareVehicles: (vehicleIds: string[]) => void;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  allVehicles,
  onSelectVehicle,
  onCompareVehicles
}) => {
  const [step, setStep] = useState<number>(1);
  const [inputs, setInputs] = useState<AdvisorInputs>({
    budgetMaxLakh: 20,
    dailyDrivingKm: 40,
    primaryUse: 'family',
    homeChargingAvailable: true,
    preferredBodyType: undefined
  });

  const [recommendations, setRecommendations] = useState<ReturnType<typeof getRecommendations>>([]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    const results = getRecommendations(allVehicles, inputs);
    setRecommendations(results);
    setStep(5); // Results step
  };

  const handleReset = () => {
    setStep(1);
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white text-slate-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh] dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30">
              <Sparkles className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">EV Matchmaker &amp; Smart Advisor</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">Personalized EV recommendation engine for Indian roads</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 5 && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="font-semibold text-slate-900 dark:text-white">Step {step} of 4</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`h-1.5 w-8 rounded-full transition-all ${
                    s <= step ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Budget */}
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              1. What is your maximum ex-showroom budget?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Under ₹10 Lakh', val: 10, note: 'Tiago EV, Comet, Punch EV' },
                { label: 'Under ₹15 Lakh', val: 15, note: 'Nexon EV, Windsor EV' },
                { label: 'Under ₹20 Lakh', val: 20, note: 'Curvv EV, Creta Electric, ZS EV' },
                { label: 'Under ₹30 Lakh', val: 30, note: 'BE 6e, Atto 3, Curvv 55 kWh' },
                { label: 'Under ₹50 Lakh', val: 50, note: 'BYD Seal, Ioniq 5' },
                { label: 'Above ₹50 Lakh', val: 100, note: 'Kia EV6, Luxury GTs' }
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => setInputs(prev => ({ ...prev, budgetMaxLakh: item.val }))}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    inputs.budgetMaxLakh === item.val
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs dark:bg-emerald-500/15 dark:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.note}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                <span>Next: Daily Commute</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Daily Commute */}
        {step === 2 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              2. How many kilometres do you travel daily?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Under 25 km / day', val: 20, note: 'City errands & short office trips' },
                { label: '25 – 50 km / day', val: 40, note: 'Standard metro commute' },
                { label: '50 – 90 km / day', val: 70, note: 'Inter-city / NCR / MMR ring road' },
                { label: '100+ km / day', val: 120, note: 'High mileage & frequent highway' }
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => setInputs(prev => ({ ...prev, dailyDrivingKm: item.val }))}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    inputs.dailyDrivingKm === item.val
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs dark:bg-emerald-500/15 dark:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.note}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                <span>Next: Driving Style</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Primary Use Case */}
        {step === 3 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              3. What is your primary driving priority?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Family Safety & Comfort', val: 'family' as const, note: '5-star NCAP, spacious boot, comfort' },
                { label: 'City Agility & Parking', val: 'city' as const, note: 'Compact dimensions & high efficiency' },
                { label: 'Highway Road Trips', val: 'highway' as const, note: 'Maximum range & fast DC charging' },
                { label: 'Performance & Tech', val: 'performance' as const, note: 'Rapid acceleration & dual-motor AWD' }
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => setInputs(prev => ({ ...prev, primaryUse: item.val }))}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    inputs.primaryUse === item.val
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs dark:bg-emerald-500/15 dark:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.note}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                <span>Next: Charging Setup</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Home Charging & Final Options */}
        {step === 4 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              4. Can you install a home AC charger?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInputs(prev => ({ ...prev, homeChargingAvailable: true }))}
                className={`rounded-xl border p-3.5 text-left transition-all ${
                  inputs.homeChargingAvailable
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs dark:bg-emerald-500/15 dark:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300'
                }`}
              >
                <p className="text-sm font-bold">Yes (Dedicated Parking)</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">7.2 kW Wallbox or 15A socket in apartment/villa</p>
              </button>

              <button
                onClick={() => setInputs(prev => ({ ...prev, homeChargingAvailable: false }))}
                className={`rounded-xl border p-3.5 text-left transition-all ${
                  !inputs.homeChargingAvailable
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs dark:bg-emerald-500/15 dark:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300'
                }`}
              >
                <p className="text-sm font-bold">No (Public / Office)</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Relies on fast DC chargers &amp; high charging speed</p>
              </button>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-6 py-2.5 text-xs font-bold text-white hover:from-orange-400 hover:to-amber-500 shadow-md shadow-orange-500/25 transition-all"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span>Show My Matched EVs</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Recommendations Results */}
        {step === 5 && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  Top Recommended EV Matches
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Sorted by compatibility score based on your commute and budget
                </p>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                <RotateCcw className="h-3 w-3 text-orange-500 dark:text-orange-400" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec) => {
                const car = rec.vehicle;
                return (
                  <div
                    key={car.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-orange-500/40 shadow-xs dark:border-slate-800 dark:bg-slate-950/80"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={car.heroImage}
                          alt={car.name}
                          className="h-16 w-24 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                              {car.brand} {car.name}
                            </h4>
                            <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2 py-0.5 text-xs font-black text-white shadow-xs">
                              {rec.matchPercentage}% Match
                            </span>
                          </div>
                          <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">
                            ₹{car.startingPriceLakh} – ₹{car.endingPriceLakh} Lakh
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">
                            {car.claimedRangeKm} km claimed • {car.batteryCapacityKwh} kWh • {car.chargingTimeDcMin10To80}m DC
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onSelectVehicle(car.slug);
                          onClose();
                        }}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:border-slate-700/80 dark:bg-slate-800 dark:text-white dark:hover:bg-gradient-to-r dark:hover:from-orange-500 dark:hover:to-amber-500 transition-all shrink-0"
                      >
                        View Specs
                      </button>
                    </div>

                    {/* Reasons list */}
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
                      {rec.matchReasons.map((reason, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                          <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {recommendations.length >= 2 && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-600 dark:text-slate-300">Want to see these top matches side-by-side?</span>
                <button
                  onClick={() => {
                    onCompareVehicles(recommendations.slice(0, 3).map(r => r.vehicle.id));
                    onClose();
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-4 py-2 text-xs font-bold text-white hover:from-orange-400 hover:to-amber-400 shadow-md shadow-orange-500/25"
                >
                  <Layers className="h-3.5 w-3.5 text-white" />
                  <span>Compare Top Matches</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
