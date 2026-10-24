import React from 'react';
import { Vehicle } from '../../types/ev';
import { Layers, X, Trash2, ArrowRight } from 'lucide-react';

interface CompareFloatingBarProps {
  selectedVehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onClearAll: () => void;
  onCompareNow: () => void;
}

export const CompareFloatingBar: React.FC<CompareFloatingBarProps> = ({
  selectedVehicles,
  onRemoveVehicle,
  onClearAll,
  onCompareNow
}) => {
  if (selectedVehicles.length === 0) return null;

  return (
    <div
      id="compare-floating-tray"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-orange-500/30 bg-slate-950/95 px-4 py-3 shadow-2xl backdrop-blur-lg transition-transform"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Compare Electric Cars</span>
              <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2 py-0.5 text-xs font-black text-white shadow-sm shadow-orange-500/25">
                {selectedVehicles.length} of 4 selected
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {selectedVehicles.length < 2
                ? 'Select at least 1 more car to compare head-to-head'
                : 'Ready to compare specs, range, pricing, and features'}
            </p>
          </div>
        </div>

        {/* Selected vehicle chips */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedVehicles.map(car => (
            <div
              key={car.id}
              className="group flex items-center gap-2 rounded-xl border border-slate-750 bg-slate-900/90 py-1.5 pl-2 pr-2.5 shadow-sm transition-all hover:border-orange-500/50"
            >
              <img
                src={car.heroImage}
                alt={car.name}
                className="h-8 w-12 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-white line-clamp-1">
                  {car.brand} {car.name}
                </p>
                <p className="text-[11px] font-bold text-orange-400">
                  ₹{car.startingPriceLakh}L
                </p>
              </div>
              <button
                onClick={() => onRemoveVehicle(car.id)}
                className="ml-1 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-400"
                title={`Remove ${car.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Placeholders for remaining slots up to 4 */}
          {Array.from({ length: Math.max(0, 4 - selectedVehicles.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="hidden sm:flex h-11 w-32 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-xs text-slate-400"
            >
              + Add EV
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-400 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-rose-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-white">Clear</span>
          </button>

          <button
            onClick={onCompareNow}
            disabled={selectedVehicles.length < 2}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
              selectedVehicles.length >= 2
                ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:from-orange-400 hover:to-amber-400 hover:scale-[1.02] active:scale-95 border border-orange-400/30 font-black'
                : 'cursor-not-allowed bg-slate-800 text-slate-400'
            }`}
          >
            <span className="text-white">Compare ({selectedVehicles.length})</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
