import React from 'react';
import { Layers, ArrowRight, Check } from 'lucide-react';
import { Vehicle } from '../../types/ev';

interface ComparePresetsSectionProps {
  vehicles: Vehicle[];
  onComparePreset: (vehicleIds: string[]) => void;
}

export const ComparePresetsSection: React.FC<ComparePresetsSectionProps> = ({
  vehicles,
  onComparePreset
}) => {
  const presetComparisons = [
    {
      title: 'The Tata Electric Siblings',
      car1Id: 'tata-nexon-ev',
      car2Id: 'tata-curvv-ev',
      tag: 'Compact vs Midsize Coupe',
      why: 'Compare the classic 45 kWh Nexon EV against the sleek 55 kWh Curvv EV coupe.'
    },
    {
      title: 'MG Urban Showdown',
      car1Id: 'mg-windsor-ev',
      car2Id: 'mg-zs-ev',
      tag: 'Rear Lounge vs Standard SUV',
      why: 'Windsor EV 135° recline lounge vs the European-pedigree ZS EV with ADAS.'
    },
    {
      title: 'Next-Gen Midsize Battle',
      car1Id: 'hyundai-creta-electric',
      car2Id: 'mahindra-be-6e',
      tag: 'FWD Comfort vs 231 bhp RWD',
      why: 'Hyundai Creta Electric comfort vs Mahindras born-electric INGLO BE 6e.'
    },
    {
      title: 'Flagship 800V GT Showdown',
      car1Id: 'hyundai-ioniq-5',
      car2Id: 'kia-ev6',
      tag: 'Retro-Lounge vs Cyber GT',
      why: '350kW DC fast charging twins: Ioniq 5 lounge relaxation vs EV6 dual-motor AWD.'
    }
  ];

  return (
    <section className="py-16 border-b border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Layers className="h-3.5 w-3.5" />
            <span>Head-to-Head</span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Compare Popular EV Rivalries
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Pre-configured side-by-side matrices comparing India&apos;s most searched electric vehicles.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {presetComparisons.map((preset) => {
            const car1 = vehicles.find((v) => v.id === preset.car1Id);
            const car2 = vehicles.find((v) => v.id === preset.car2Id);
            if (!car1 || !car2) return null;

            return (
              <div
                key={preset.title}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-all hover:border-emerald-500/40 hover:bg-slate-900 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-bold text-slate-300">
                    {preset.tag}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">Head-to-Head</span>
                </div>

                <h3 className="mt-2 text-base font-bold text-white">{preset.title}</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{preset.why}</p>

                {/* Visual cars split */}
                <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-left">
                    <img
                      src={car1.heroImage}
                      alt={car1.name}
                      className="h-20 w-full rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <p className="mt-2 text-xs font-extrabold text-white truncate">{car1.brand} {car1.name}</p>
                    <p className="text-[11px] text-emerald-400 font-bold">₹{car1.startingPriceLakh}L</p>
                    <p className="text-[10px] text-slate-400">{car1.claimedRangeKm} km Claimed</p>
                  </div>

                  <div className="text-left border-l border-slate-800/80 pl-3">
                    <img
                      src={car2.heroImage}
                      alt={car2.name}
                      className="h-20 w-full rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <p className="mt-2 text-xs font-extrabold text-white truncate">{car2.brand} {car2.name}</p>
                    <p className="text-[11px] text-emerald-400 font-bold">₹{car2.startingPriceLakh}L</p>
                    <p className="text-[10px] text-slate-400">{car2.claimedRangeKm} km Claimed</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">Battery, Range, Charging, Dimensions</span>
                  <button
                    onClick={() => onComparePreset([car1.id, car2.id])}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
                  >
                    <span>Compare Head-to-Head</span>
                    <ArrowRight className="h-3.5 w-3.5" />
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
