import React, { useState, useMemo } from 'react';
import { Vehicle } from '../../types/ev';
import { vehicleDataProvider } from '../../services/dataProvider';
import {
  Wallet,
  CheckCircle2,
  TrendingDown,
  Car,
  Zap,
  ArrowRight,
  ShieldCheck,
  Fuel,
  BatteryCharging,
  Info,
  Layers,
  Award,
  Calendar,
  IndianRupee,
  BadgeAlert
} from 'lucide-react';

interface SalaryAffordabilityCalculatorViewProps {
  vehicles: Vehicle[];
  selectedCity: string;
  onSelectVehicle?: (slug: string) => void;
  onCompareVehicles?: (vehicles: Vehicle[]) => void;
}

export const SalaryAffordabilityCalculatorView: React.FC<SalaryAffordabilityCalculatorViewProps> = ({
  vehicles,
  selectedCity,
  onSelectVehicle,
  onCompareVehicles
}) => {
  // Financial Inputs
  const [monthlySalary, setMonthlySalary] = useState<number>(120000); // Take-home salary in ₹
  const [downPayment, setDownPayment] = useState<number>(300000); // Down payment in ₹
  const [monthlyRunningKm, setMonthlyRunningKm] = useState<number>(1400); // 1,400 km / month
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5); // 3, 5, 7 years
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a. standard EV loan rate
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<'all' | 'safe' | 'optimal' | 'stretch'>('all');

  // Real-life operational cost parameters
  const homeElectricityRatePerKwh = 7.5; // ₹7.5 / unit average Indian residential slab
  const publicDcRatePerKwh = 21.0; // ₹21 / unit at Tata Power / Zeon / Jio-bp DC chargers
  const publicChargingShare = 0.15; // 15% highway/public fast charging, 85% home charging
  const petrolPricePerLitre = 102.0; // ₹102 / L in metro cities
  const petrolCarMileage = 13.5; // 13.5 km/L real city-highway average for equivalent petrol cars

  // Human Financial Rules (20/4/10 rule adapted for Indian EV purchases)
  // Rule 1: Safe EMI <= 15% of monthly take-home salary
  // Rule 2: Optimal EMI <= 20% of monthly take-home salary
  // Rule 3: Max Stretch EMI <= 25% of monthly take-home salary (EV justifies up to 25% because petrol savings of ₹8,000+ offset the extra EMI)
  const safeEmiCap = Math.round(monthlySalary * 0.15);
  const optimalEmiCap = Math.round(monthlySalary * 0.20);
  const stretchEmiCap = Math.round(monthlySalary * 0.26);

  // Helper to compute realistic On-Road price and exact monthly EMI for a vehicle
  const calculateCarAffordability = (car: Vehicle) => {
    // Determine target variant: starter or mid-trim
    const targetVariant = car.variants[0] || {
      id: car.id,
      name: 'Standard',
      exShowroomPriceLakh: car.startingPriceLakh
    };

    const priceDetails = vehicleDataProvider.calculateOnRoadPrice(car, targetVariant.id, selectedCity);
    const onRoadTotalRs = priceDetails.onRoadTotalLakh * 100000;

    // Actual loan needed
    const actualDownPayment = Math.min(downPayment, onRoadTotalRs * 0.5); // max 50% down payment
    const loanAmountRs = Math.max(0, onRoadTotalRs - actualDownPayment);

    // Standard reducing balance loan EMI formula
    const monthlyRate = interestRate / (12 * 100);
    const totalMonths = loanTenureYears * 12;
    const emiRs =
      loanAmountRs > 0
        ? Math.round(
            (loanAmountRs * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
              (Math.pow(1 + monthlyRate, totalMonths) - 1)
          )
        : 0;

    // Monthly Fuel & Energy Costs
    // EV Energy: Average 7.0 km per kWh
    const unitsRequiredPerMonth = monthlyRunningKm / 7.0;
    const homeUnits = unitsRequiredPerMonth * (1 - publicChargingShare);
    const publicUnits = unitsRequiredPerMonth * publicChargingShare;
    const monthlyElectricityCostRs = Math.round(
      homeUnits * homeElectricityRatePerKwh + publicUnits * publicDcRatePerKwh
    );
    const evCostPerKm = Number((monthlyElectricityCostRs / monthlyRunningKm).toFixed(2));

    // Petrol counterpart comparison
    const monthlyPetrolCostRs = Math.round((monthlyRunningKm / petrolCarMileage) * petrolPricePerLitre);
    const petrolCostPerKm = Number((monthlyPetrolCostRs / monthlyRunningKm).toFixed(2));
    const monthlyFuelSavingsRs = monthlyPetrolCostRs - monthlyElectricityCostRs;

    // Routine Service & Maintenance
    // Real-life EV service: ₹4,000/year (cabin filter, brake inspection, fluid top-up) = ~₹350/mo
    // Real-life Petrol service: ₹14,000/year (engine oil, filters, spark plugs, belts) = ~₹1,150/mo
    const monthlyEvMaintenanceRs = 400;
    const monthlyInsuranceEstimateRs = Math.round((onRoadTotalRs * 0.022) / 12); // ~2.2% annual zero-dep insurance

    // Total Monthly Out-of-Pocket Ownership Cost
    const totalMonthlyCarCostRs = emiRs + monthlyElectricityCostRs + monthlyEvMaintenanceRs + monthlyInsuranceEstimateRs;

    // Net Effective Out-of-Pocket Cost (Factor in money saved from petrol!)
    // If you were driving petrol, you'd spend monthlyPetrolCostRs anyway. So your incremental burden is:
    const netBurdenComparedToPetrolRs = totalMonthlyCarCostRs - monthlyPetrolCostRs;

    // Financial Classification
    let affordabilityTier: 'safe' | 'optimal' | 'stretch' | 'overbudget' = 'overbudget';
    let affordabilityBadge = 'Beyond Recommended Budget';
    let badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';

    if (emiRs <= safeEmiCap) {
      affordabilityTier = 'safe';
      affordabilityBadge = 'Financially Stress-Free (Safe)';
      badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    } else if (emiRs <= optimalEmiCap) {
      affordabilityTier = 'optimal';
      affordabilityBadge = 'Optimal Sweet Spot';
      badgeColor = 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    } else if (emiRs <= stretchEmiCap) {
      affordabilityTier = 'stretch';
      affordabilityBadge = 'Practical Stretch (Petrol Offset)';
      badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }

    const emiPercentageOfSalary = Number(((emiRs / monthlySalary) * 100).toFixed(1));
    const isAffordable = affordabilityTier !== 'overbudget';

    return {
      car,
      onRoadTotalRs,
      onRoadTotalLakh: priceDetails.onRoadTotalLakh,
      actualDownPayment,
      loanAmountRs,
      emiRs,
      emiPercentageOfSalary,
      monthlyElectricityCostRs,
      monthlyPetrolCostRs,
      monthlyFuelSavingsRs,
      fiveYearFuelSavingsRs: monthlyFuelSavingsRs * 60,
      monthlyEvMaintenanceRs,
      monthlyInsuranceEstimateRs,
      totalMonthlyCarCostRs,
      netBurdenComparedToPetrolRs,
      evCostPerKm,
      petrolCostPerKm,
      affordabilityTier,
      affordabilityBadge,
      badgeColor,
      isAffordable
    };
  };

  // Compute recommendations for all vehicles and sort by best fit
  const processedCars = useMemo(() => {
    return vehicles
      .map(calculateCarAffordability)
      .sort((a, b) => {
        // First prioritize affordable cars
        if (a.isAffordable && !b.isAffordable) return -1;
        if (!a.isAffordable && b.isAffordable) return 1;
        // Within affordable, show optimal and safe first
        const tierRank: Record<string, number> = { safe: 2, optimal: 1, stretch: 3, overbudget: 4 };
        if (tierRank[a.affordabilityTier] !== tierRank[b.affordabilityTier]) {
          return tierRank[a.affordabilityTier] - tierRank[b.affordabilityTier];
        }
        return a.emiRs - b.emiRs;
      });
  }, [vehicles, monthlySalary, downPayment, monthlyRunningKm, loanTenureYears, interestRate, selectedCity]);

  // Filter based on active tab
  const filteredCars = useMemo(() => {
    if (selectedBudgetTier === 'all') {
      return processedCars.filter(c => c.isAffordable);
    }
    return processedCars.filter(c => c.affordabilityTier === selectedBudgetTier);
  }, [processedCars, selectedBudgetTier]);

  // Top overall recommendation
  const topPick = useMemo(() => {
    return (
      filteredCars.find(c => c.affordabilityTier === 'optimal') ||
      filteredCars.find(c => c.affordabilityTier === 'safe') ||
      filteredCars[0]
    );
  }, [filteredCars]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Indian Tricolor Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-white p-6 sm:p-8 shadow-xs dark:border-orange-500/25 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">
        {/* Subtle top tricolor accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-sm shadow-orange-500/30">
                <Wallet className="h-3.5 w-3.5" />
                Salary &amp; TCO Affordability Advisor
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                Indian 20/4/10 Finance Model
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Which Electric Car Fits Your Monthly Take-Home Salary?
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Enter your real monthly salary and commute distance. We calculate your safe EMI, home charging costs,
              insurance, maintenance, and the huge ₹8,000+ monthly petrol savings in <span className="font-bold text-slate-900 dark:text-white">{selectedCity}</span>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-800/80">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Safe Monthly EMI Limit</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{optimalEmiCap.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              20% of your ₹{(monthlySalary / 1000).toFixed(0)}k salary
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Workstation */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Salary & Financial Inputs (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              Your Financial Parameters
            </h3>

            {/* 1. Monthly Take-Home Salary */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Monthly Take-Home Salary:
                </label>
                <span className="text-base font-black text-orange-600 dark:text-orange-400">
                  ₹{monthlySalary.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="35000"
                max="500000"
                step="5000"
                value={monthlySalary}
                onChange={e => setMonthlySalary(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              {/* Quick Salary Chips */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {[50000, 80000, 120000, 200000, 350000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setMonthlySalary(amt)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold border transition-all ${
                      monthlySalary === amt
                        ? 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-white'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    ₹{(amt / 1000).toFixed(0)}k/mo
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Down Payment Available */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Down Payment Available:
                </label>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  ₹{(downPayment / 100000).toFixed(1)} Lakh
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="50000"
                value={downPayment}
                onChange={e => setDownPayment(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                <span>₹50k (Min)</span>
                <span>₹3 Lakh (Typical)</span>
                <span>₹7 Lakh (Prime)</span>
                <span>₹15 Lakh+</span>
              </div>
            </div>

            {/* 3. Monthly Commute Distance (Fuel Savings Factor) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Fuel className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  Monthly Driving Distance:
                </label>
                <span className="text-base font-black text-amber-600 dark:text-amber-400">
                  {monthlyRunningKm.toLocaleString('en-IN')} km / mo
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="3500"
                step="100"
                value={monthlyRunningKm}
                onChange={e => setMonthlyRunningKm(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>~{Math.round(monthlyRunningKm / 30)} km/day</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Saves ~₹{Math.round((monthlyRunningKm / petrolCarMileage) * petrolPricePerLitre - (monthlyRunningKm / 7) * homeElectricityRatePerKwh).toLocaleString('en-IN')}/mo in petrol
                </span>
              </div>
            </div>

            {/* 4. Loan Tenure & Interest Rate */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  Loan Tenure:
                </label>
                <div className="flex gap-1.5">
                  {[3, 5, 7].map(yrs => (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setLoanTenureYears(yrs)}
                      className={`flex-1 rounded-xl py-2 text-center text-xs font-bold border transition-all ${
                        loanTenureYears === yrs
                          ? 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-white'
                          : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {yrs} Yrs
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  EV Loan Interest:
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                  <span>8.5% p.a. (Green Loan)</span>
                </div>
              </div>
            </div>

            {/* Financial Reality Checkbox / Rule Summary */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-slate-700 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-400">
                <Info className="h-4 w-4" />
                <span>The Golden Rule for Indian EV Buyers</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                Unlike a petrol car, an EV saves <strong className="text-slate-900 dark:text-white">₹6,000 to ₹15,000 every single month</strong> on fuel.
                This allows you to comfortably afford a slightly higher EMI tier without increasing your total household out-of-pocket transportation expense.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Matched Cars & Detailed Cost Breakdown (7 Cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Top Featured Match Banner (If Available) */}
          {topPick && (
            <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white p-6 shadow-xs dark:border-emerald-500/40 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 dark:shadow-xl">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  <Award className="h-3.5 w-3.5" /> Best Overall Match For Your Salary
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  EMI is {topPick.emiPercentageOfSalary}% of your salary
                </span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={topPick.car.heroImage}
                    alt={topPick.car.name}
                    className="h-16 w-24 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {topPick.car.brand} {topPick.car.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Est. On-Road ({selectedCity}): <strong className="text-slate-900 dark:text-slate-200">₹{topPick.onRoadTotalLakh} Lakh</strong>
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-bold text-slate-700 dark:text-slate-300">
                        {topPick.car.realWorldRangeKm} km Real Range
                      </span>
                      <span className="rounded bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-800 dark:text-emerald-400">
                        ₹{topPick.evCostPerKm}/km running cost
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/30 dark:bg-slate-950/80 p-3.5 text-right w-full sm:w-auto">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Estimated Monthly EMI</span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{topPick.emiRs.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Saves ₹{topPick.monthlyFuelSavingsRs.toLocaleString('en-IN')}/mo in petrol
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  Net Effective Monthly Cost after Petrol Savings: <strong className="text-slate-900 dark:text-white">₹{Math.max(0, topPick.netBurdenComparedToPetrolRs).toLocaleString('en-IN')}/mo</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onSelectVehicle && onSelectVehicle(topPick.car.slug)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
                >
                  <span>View Car Details</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Affordability Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Car className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span>Recommended Cars For You ({filteredCars.length})</span>
            </h3>

            <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              {[
                { id: 'all', label: 'All Affordable' },
                { id: 'safe', label: 'Safe (<15%)' },
                { id: 'optimal', label: 'Sweet Spot (15-20%)' },
                { id: 'stretch', label: 'Stretch (20-25%)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedBudgetTier(tab.id as any)}
                  className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                    selectedBudgetTier === tab.id
                      ? 'bg-orange-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Recommended Cars */}
          <div className="space-y-4">
            {filteredCars.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900/60">
                <BadgeAlert className="mx-auto h-8 w-8 text-amber-500" />
                <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">No cars found in this specific tier</h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Try adjusting your monthly salary, down payment, or selecting the &quot;All Affordable&quot; tab to explore electric cars that fit your budget.
                </p>
              </div>
            ) : (
              filteredCars.map(item => (
                <div
                  key={item.car.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-orange-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-orange-500/50 dark:hover:bg-slate-900"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Car Image + Details */}
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.car.heroImage}
                        alt={item.car.name}
                        className="h-16 w-24 rounded-xl object-cover border border-slate-200 dark:border-slate-800 flex-shrink-0 cursor-pointer"
                        onClick={() => onSelectVehicle && onSelectVehicle(item.car.slug)}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            onClick={() => onSelectVehicle && onSelectVehicle(item.car.slug)}
                            className="text-base font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer dark:text-white dark:hover:text-orange-400"
                          >
                            {item.car.brand} {item.car.name}
                          </span>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                            {item.affordabilityBadge}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>On-Road: ₹{item.onRoadTotalLakh} Lakh ({selectedCity})</span>
                          <span>•</span>
                          <span>Real Range: {item.car.realWorldRangeKm} km</span>
                          <span>•</span>
                          <span>Battery: {item.car.batteryCapacityKwh} kWh</span>
                        </div>
                      </div>
                    </div>

                    {/* EMI & Financial Breakdown */}
                    <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-2 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Monthly EMI</span>
                        <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                          ₹{item.emiRs.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {item.emiPercentageOfSalary}% of net salary
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Cost Deep Dive Chips */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100 text-center dark:bg-slate-950/70 dark:border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Electricity / Mo</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">₹{item.monthlyElectricityCostRs.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] text-slate-400 block">₹{item.evCostPerKm}/km</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Petrol Equivalent</span>
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400">₹{item.monthlyPetrolCostRs.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] text-slate-400 block">₹{item.petrolCostPerKm}/km</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Monthly Fuel Saved</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">₹{item.monthlyFuelSavingsRs.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-500 block">In your pocket</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">5-Yr Total Savings</span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">₹{(item.fiveYearFuelSavingsRs / 100000).toFixed(1)} Lakh</span>
                      <span className="text-[9px] text-slate-400 block">vs petrol ICE</span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-3 flex items-center justify-between text-xs pt-2">
                    <span className="text-slate-600 dark:text-slate-400">
                      Down Payment Needed: <strong className="text-slate-900 dark:text-white">₹{(item.actualDownPayment / 100000).toFixed(2)} Lakh</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectVehicle && onSelectVehicle(item.car.slug)}
                        className="font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect Specs &amp; Variants</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
