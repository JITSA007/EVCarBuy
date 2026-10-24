import React from 'react';
import { Compass, Users, MapPin, Award, Zap, DollarSign, ArrowRight, Building } from 'lucide-react';

interface UseCaseSectionProps {
  onSelectVehicle: (slug: string) => void;
  onFilterUseCase: (label: string) => void;
}

export const UseCaseSection: React.FC<UseCaseSectionProps> = ({
  onSelectVehicle,
}) => {
  const useCases = [
    {
      title: 'Best City Commuter',
      evName: 'Tata Tiago EV',
      slug: 'tata-tiago-ev',
      price: '₹7.99 – ₹11.89 L',
      highlight: 'Sub-₹1/km running cost, compact parking footprint, and responsive city torque.',
      icon: Building,
      tag: 'Urban Agility'
    },
    {
      title: 'Best Family EV SUV',
      evName: 'Tata Nexon EV',
      slug: 'tata-nexon-ev',
      price: '₹12.49 – ₹16.99 L',
      highlight: '5-Star Bharat NCAP safety, 465 km range, 205mm ground clearance, and V2L power.',
      icon: Users,
      tag: 'Family Benchmark'
    },
    {
      title: 'Best Long-Range Tourer',
      evName: 'Tata Curvv EV',
      slug: 'tata-curvv-ev',
      price: '₹17.49 – ₹21.99 L',
      highlight: '585 km claimed range (425 km real-world), 55 kWh pack, aerodynamic coupe styling.',
      icon: MapPin,
      tag: 'Highway Master'
    },
    {
      title: 'Best Performance EV',
      evName: 'BYD Seal',
      slug: 'byd-seal',
      price: '₹41.00 – ₹53.00 L',
      highlight: '0-100 km/h in 3.8s, 530 bhp dual-motor AWD, CTB chassis, and 650 km range.',
      icon: Zap,
      tag: '3.8s Supercar Pace'
    },
    {
      title: 'Best Executive Luxury',
      evName: 'Hyundai Ioniq 5',
      slug: 'hyundai-ioniq-5',
      price: '₹46.05 – ₹47.95 L',
      highlight: 'Ultra-fast 800V charging (10-80% in 18 min), lounge relax seats, 3000mm wheelbase.',
      icon: Award,
      tag: '800V Architecture'
    },
    {
      title: 'Best Rear Lounge Value',
      evName: 'MG Windsor EV',
      slug: 'mg-windsor-ev',
      price: '₹9.99 – ₹15.50 L',
      highlight: 'First-class 135-degree recline lounge seats, 604L boot, and 15.6-inch grand display.',
      icon: DollarSign,
      tag: 'Chauffeur Lounge'
    }
  ];

  return (
    <section className="py-16 border-b border-slate-200 bg-slate-50/50 dark:border-slate-800/80 dark:bg-slate-900/30 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Compass className="h-3.5 w-3.5" />
            <span>Curated Recommendations</span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Best Electric Cars by Use Case
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Engineered recommendations tailored for distinct driving lifestyles across India.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-emerald-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-emerald-500/50 dark:hover:bg-slate-900 dark:hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                      {uc.tag}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-700 dark:text-slate-200">
                    {uc.title}
                  </h3>

                  <p className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
                    {uc.evName}
                  </p>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{uc.price}</p>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {uc.highlight}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onSelectVehicle(uc.slug)}
                    className="flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
