import React from 'react';
import { ArrowRight, Wallet } from 'lucide-react';

interface BudgetGridSectionProps {
  onSelectBudget: (min?: number, max?: number, label?: string) => void;
}

export const BudgetGridSection: React.FC<BudgetGridSectionProps> = ({ onSelectBudget }) => {
  const budgetTiers = [
    {
      label: 'Under ₹10 Lakh',
      range: 'Affordable Urban EVs',
      min: 0,
      max: 10,
      popularCars: 'Tata Tiago EV, Punch EV, MG Comet',
      count: '3 Models'
    },
    {
      label: '₹10 – 15 Lakh',
      range: 'Mass-Market EV SUVs',
      min: 10,
      max: 15,
      popularCars: 'Nexon EV, Windsor EV, Punch EV LR',
      count: '4 Models'
    },
    {
      label: '₹15 – 20 Lakh',
      range: 'Long Range Family Crossovers',
      min: 15,
      max: 20,
      popularCars: 'Curvv EV, Creta Electric, ZS EV, BE 6e',
      count: '5 Models'
    },
    {
      label: '₹20 – 30 Lakh',
      range: 'High-Tech Feature Loaded',
      min: 20,
      max: 30,
      popularCars: 'BE 6e Pack TWO, Atto 3, Curvv 55 kWh',
      count: '4 Models'
    },
    {
      label: '₹30 – 50 Lakh',
      range: 'Performance & 800V Architecture',
      min: 30,
      max: 50,
      popularCars: 'BYD Seal, Hyundai Ioniq 5, Atto 3 Superior',
      count: '3 Models'
    },
    {
      label: '₹50 Lakh+',
      range: 'Luxury & Grand Tourers',
      min: 50,
      max: 150,
      popularCars: 'Kia EV6, BMW i4, Mercedes-EQB',
      count: '4 Models'
    }
  ];

  return (
    <section className="py-16 border-b border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <Wallet className="h-3.5 w-3.5" />
              <span>Smart Price Segmentation</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Explore EVs by Budget
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Find electric vehicles matching your ex-showroom and on-road budget across India.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetTiers.map((tier) => (
            <button
              key={tier.label}
              onClick={() => onSelectBudget(tier.min, tier.max, tier.label)}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-left transition-all hover:border-orange-500 hover:bg-white hover:shadow-lg dark:border-slate-800/90 dark:bg-slate-900/60 dark:hover:border-orange-500/50 dark:hover:bg-slate-900 dark:hover:shadow-xl cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-slate-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 transition-colors">
                    {tier.label}
                  </span>
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700 border border-slate-300 group-hover:bg-orange-100 group-hover:text-orange-800 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60 dark:group-hover:bg-orange-500/20 dark:group-hover:text-orange-300 transition-colors">
                    {tier.count}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-orange-700 dark:text-orange-400/90">{tier.range}</p>
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">Popular:</strong> {tier.popularCars}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 pt-3 border-t border-slate-200 dark:border-slate-800/60">
                <span>View EV Cars</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-orange-600 dark:text-slate-400 dark:group-hover:text-orange-400 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
