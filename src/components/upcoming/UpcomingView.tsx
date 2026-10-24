import React, { useState } from 'react';
import { UpcomingVehicle } from '../../types/ev';
import { Sparkles, Calendar, Zap, Bell, CheckCircle2, ArrowRight } from 'lucide-react';

interface UpcomingViewProps {
  upcomingVehicles: UpcomingVehicle[];
  onOpenPriceAlert?: (name: string) => void;
}

export const UpcomingView: React.FC<UpcomingViewProps> = ({ upcomingVehicles }) => {
  const [notifiedCars, setNotifiedCars] = useState<string[]>([]);
  const [filterQuarter, setFilterQuarter] = useState<string>('all');

  const quarters = ['all', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];

  const filtered = upcomingVehicles.filter(car => {
    if (filterQuarter === 'all') return true;
    return car.expectedLaunchDate.toLowerCase().includes(filterQuarter.toLowerCase());
  });

  const toggleNotify = (id: string, name: string) => {
    if (notifiedCars.includes(id)) {
      setNotifiedCars(prev => prev.filter(c => c !== id));
    } else {
      setNotifiedCars(prev => [...prev, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Future Roadmap</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Upcoming Electric Cars in India (2026)
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Confirmed EV launches, spy shot telemetry, expected price ranges, and battery architectures.
          </p>

          {/* Quarter filter pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {quarters.map(q => (
              <button
                key={q}
                onClick={() => setFilterQuarter(q)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                  filterQuarter === q
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                {q === 'all' ? 'All Upcoming Launches' : q}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(car => {
            const isNotified = notifiedCars.includes(car.id);
            return (
              <div
                key={car.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-cyan-500/40 hover:bg-slate-900 shadow-lg"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
                    <img
                      src={car.heroImage}
                      alt={car.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md border border-slate-700">
                        {car.brand}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-full bg-cyan-500/20 px-3 py-0.5 text-xs font-bold text-cyan-300 border border-cyan-500/30 backdrop-blur-md flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {car.expectedLaunchDate}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold text-white">
                    {car.brand} {car.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{car.bodyType}</p>

                  <div className="mt-2 text-base font-extrabold text-cyan-400">
                    Est. ₹{car.expectedPriceLakhMin} – ₹{car.expectedPriceLakhMax} Lakh
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {car.keyHighlight}
                  </p>

                  {/* Spec pills */}
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Est. Range</span>
                      <p className="font-bold text-white">{car.expectedRangeKm} km</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Est. Battery</span>
                      <p className="font-bold text-white">{car.expectedBatteryKwh} kWh</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Launch Alerts</span>
                  <button
                    onClick={() => toggleNotify(car.id, car.name)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      isNotified
                        ? 'border border-cyan-500/40 bg-cyan-500/10 text-cyan-400'
                        : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
                    }`}
                  >
                    <Bell className="h-3.5 w-3.5" />
                    <span>{isNotified ? 'Subscribed' : 'Notify on Launch'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
