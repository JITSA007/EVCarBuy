import React, { useState, useMemo } from 'react';
import { Vehicle } from '../../types/ev';
import { Calculator, Zap, DollarSign, TrendingDown, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface RunningCostCalculatorViewProps {
  vehicles: Vehicle[];
}

export const RunningCostCalculatorView: React.FC<RunningCostCalculatorViewProps> = ({ vehicles }) => {
  const [selectedEvId, setSelectedEvId] = useState<string>(vehicles[0]?.id || '');
  const [dailyKm, setDailyKm] = useState<number>(45);
  const [homeChargingRatio, setHomeChargingRatio] = useState<number>(80); // 80% home, 20% public
  const [homeElectricityTariff, setHomeElectricityTariff] = useState<number>(7.5);
  const [publicElectricityTariff, setPublicElectricityTariff] = useState<number>(20.0);
  const [petrolPrice, setPetrolPrice] = useState<number>(98.0);
  const [petrolMileage, setPetrolMileage] = useState<number>(14.0); // 14 km/L
  const [dieselPrice, setDieselPrice] = useState<number>(89.0);
  const [dieselMileage, setDieselMileage] = useState<number>(18.0); // 18 km/L

  const selectedVehicle = useMemo(() => {
    return vehicles.find(v => v.id === selectedEvId) || vehicles[0];
  }, [vehicles, selectedEvId]);

  // Calculations
  const tcoData = useMemo(() => {
    const annualKm = dailyKm * 365;

    // EV blended electricity rate per kWh
    const blendedRate =
      (homeElectricityTariff * homeChargingRatio) / 100 +
      (publicElectricityTariff * (100 - homeChargingRatio)) / 100;

    // EV energy: based on efficiency Wh/km
    const evKwhPerKm = (selectedVehicle?.efficiencyWhPerKm || 135) / 1000;
    const evAnnualEnergyKwh = annualKm * evKwhPerKm;
    const evAnnualFuelCost = evAnnualEnergyKwh * blendedRate;
    const evAnnualServiceCost = 4500; // Minimal mechanical service

    // Petrol car
    const petrolAnnualLitres = annualKm / petrolMileage;
    const petrolAnnualFuelCost = petrolAnnualLitres * petrolPrice;
    const petrolAnnualServiceCost = 12000; // Oil, filters, fluids

    // Diesel car
    const dieselAnnualLitres = annualKm / dieselMileage;
    const dieselAnnualFuelCost = dieselAnnualLitres * dieselPrice;
    const dieselAnnualServiceCost = 15000; // DPF, turbo, injectors, oil

    // Totals
    const evTotalAnnual = evAnnualFuelCost + evAnnualServiceCost;
    const petrolTotalAnnual = petrolAnnualFuelCost + petrolAnnualServiceCost;
    const dieselTotalAnnual = dieselAnnualFuelCost + dieselAnnualServiceCost;

    const fiveYearEv = evTotalAnnual * 5;
    const fiveYearPetrol = petrolTotalAnnual * 5;
    const fiveYearDiesel = dieselTotalAnnual * 5;

    const fiveYearSavingsVsPetrol = fiveYearPetrol - fiveYearEv;
    const fiveYearSavingsVsDiesel = fiveYearDiesel - fiveYearEv;

    return {
      annualKm: Math.round(annualKm),
      monthlyKm: Math.round(annualKm / 12),
      evMonthly: Math.round(evTotalAnnual / 12),
      petrolMonthly: Math.round(petrolTotalAnnual / 12),
      dieselMonthly: Math.round(dieselTotalAnnual / 12),
      evCostPerKm: (evTotalAnnual / annualKm).toFixed(2),
      petrolCostPerKm: (petrolTotalAnnual / annualKm).toFixed(2),
      dieselCostPerKm: (dieselTotalAnnual / annualKm).toFixed(2),
      fiveYearEv: Math.round(fiveYearEv),
      fiveYearPetrol: Math.round(fiveYearPetrol),
      fiveYearDiesel: Math.round(fiveYearDiesel),
      fiveYearSavingsVsPetrol: Math.round(fiveYearSavingsVsPetrol),
      fiveYearSavingsVsDiesel: Math.round(fiveYearSavingsVsDiesel)
    };
  }, [
    dailyKm,
    homeChargingRatio,
    homeElectricityTariff,
    publicElectricityTariff,
    petrolPrice,
    petrolMileage,
    dieselPrice,
    dieselMileage,
    selectedVehicle
  ]);

  return (
    <div className="min-h-screen bg-slate-950 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Calculator className="h-3.5 w-3.5" />
            <span>Total Cost of Ownership (TCO)</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            EV vs Petrol &amp; Diesel Savings Calculator
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Compare long-term running expenses, maintenance savings, and per-kilometre operating costs in India.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose Electric Car
              </label>
              <select
                value={selectedEvId}
                onChange={e => setSelectedEvId(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
              >
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.name} ({v.efficiencyWhPerKm} Wh/km)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Daily Driving Distance:</span>
                <span className="text-emerald-400">{dailyKm} km / day</span>
              </div>
              <input
                type="range"
                min="10"
                max="160"
                step="5"
                value={dailyKm}
                onChange={e => setDailyKm(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-500"
              />
              <span className="text-[11px] text-slate-400">~{tcoData.annualKm.toLocaleString('en-IN')} km annually</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Home vs Public Charging:</span>
                <span className="text-emerald-400">{homeChargingRatio}% Home / {100 - homeChargingRatio}% Public</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="10"
                value={homeChargingRatio}
                onChange={e => setHomeChargingRatio(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400">Home Tariff (₹/kWh)</label>
                <input
                  type="number"
                  step="0.5"
                  value={homeElectricityTariff}
                  onChange={e => setHomeElectricityTariff(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Public Tariff (₹/kWh)</label>
                <input
                  type="number"
                  step="1"
                  value={publicElectricityTariff}
                  onChange={e => setPublicElectricityTariff(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ICE Benchmark Rates
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Petrol Price (₹/L)</label>
                  <input
                    type="number"
                    value={petrolPrice}
                    onChange={e => setPetrolPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Petrol Mileage (km/L)</label>
                  <input
                    type="number"
                    value={petrolMileage}
                    onChange={e => setPetrolMileage(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Diesel Price (₹/L)</label>
                  <input
                    type="number"
                    value={dieselPrice}
                    onChange={e => setDieselPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Diesel Mileage (km/L)</label>
                  <input
                    type="number"
                    value={dieselMileage}
                    onChange={e => setDieselMileage(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Net Savings Hero Card */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Estimated 5-Year Total Net Savings
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                  Fuel + Maintenance
                </span>
              </div>

              <div className="mt-4">
                <p className="text-4xl sm:text-5xl font-extrabold text-white">
                  ₹{tcoData.fiveYearSavingsVsPetrol.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  Saved over 5 years ({tcoData.annualKm * 5} km driven) compared to a equivalent petrol car.
                </p>
                <p className="text-xs text-emerald-400 mt-0.5">
                  (Or ₹{tcoData.fiveYearSavingsVsDiesel.toLocaleString('en-IN')} saved vs diesel)
                </p>
              </div>
            </div>

            {/* Monthly Cost Comparison 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-emerald-500/40 bg-slate-900/90 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {selectedVehicle.name} (EV)
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">₹{tcoData.evMonthly.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-400">per month (₹{tcoData.evCostPerKm} / km)</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  Petrol Equivalent
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">₹{tcoData.petrolMonthly.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-400">per month (₹{tcoData.petrolCostPerKm} / km)</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Diesel Equivalent
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">₹{tcoData.dieselMonthly.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-400">per month (₹{tcoData.dieselCostPerKm} / km)</p>
              </div>
            </div>

            {/* 5-Year Cumulative Bar Visual */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                5-Year Cumulative Running Costs
              </h3>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-emerald-400">{selectedVehicle.name} (EV):</span>
                    <span className="text-white">₹{tcoData.fiveYearEv.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(tcoData.fiveYearEv / tcoData.fiveYearPetrol) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-rose-400">Petrol Car (14 km/L):</span>
                    <span className="text-white">₹{tcoData.fiveYearPetrol.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-amber-400">Diesel Car (18 km/L):</span>
                    <span className="text-white">₹{tcoData.fiveYearDiesel.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(tcoData.fiveYearDiesel / tcoData.fiveYearPetrol) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 border-t border-slate-800 pt-3">
                Includes annual preventive maintenance costs (oil change, filters, brake pads) in addition to direct fuel/energy expenditure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
