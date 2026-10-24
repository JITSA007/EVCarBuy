import React from 'react';
import { CityPricing } from '../../types/ev';
import { MapPin, X, Check, ShieldCheck, Tag, Info } from 'lucide-react';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: CityPricing[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  cities,
  selectedCity,
  onSelectCity
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Select Your City for On-Road Pricing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Road tax policies and EV state subsidies vary across India</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* City Grid */}
        <div className="mt-4 max-h-96 overflow-y-auto pr-1 space-y-2">
          {cities.map(c => {
            const isSelected = c.city.toLowerCase() === selectedCity.toLowerCase();
            return (
              <button
                key={c.city}
                onClick={() => {
                  onSelectCity(c.city);
                  onClose();
                }}
                className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 text-slate-900 dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{c.city}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">({c.state})</span>
                    {isSelected && (
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      {c.rtoPercent === 0 ? '0% EV Road Tax' : `${c.rtoPercent}% Road Tax`}
                    </span>
                    {c.evSubsidyLakh > 0 && (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-emerald-800 border border-emerald-200 font-medium dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40">
                        <Tag className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        ₹{(c.evSubsidyLakh * 100000).toLocaleString('en-IN')} EV Subsidy
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800">
                  {isSelected ? (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Info footer */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400 flex items-start gap-2">
          <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Several states such as Delhi, Maharashtra, Telangana, and Tamil Nadu currently offer a 100% waiver on EV road tax.
            On-road prices adjust immediately upon city selection.
          </span>
        </div>
      </div>
    </div>
  );
};
