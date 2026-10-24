import React, { useState, useMemo } from 'react';
import { ChargingStation, Vehicle } from '../../types/ev';
import {
  BatteryCharging,
  Zap,
  MapPin,
  Coffee,
  Search,
} from 'lucide-react';

interface ChargingNetworkViewProps {
  stations: ChargingStation[];
  vehicles: Vehicle[];
}

export const ChargingNetworkView: React.FC<ChargingNetworkViewProps> = ({ stations, vehicles }) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedConnector, setSelectedConnector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Charging session calculator state
  const [calcCarId, setCalcCarId] = useState<string>(vehicles[0]?.id || '');
  const [startPercent, setStartPercent] = useState<number>(15);
  const [targetPercent, setTargetPercent] = useState<number>(80);
  const [stationCostPerKwh, setStationCostPerKwh] = useState<number>(21.0); // ₹21 / unit

  const selectedVehicle = useMemo(() => {
    return vehicles.find(v => v.id === calcCarId) || vehicles[0];
  }, [vehicles, calcCarId]);

  // Session cost and time calculation
  const sessionCalculation = useMemo(() => {
    if (!selectedVehicle) return { kwhAdded: 0, cost: 0, timeMin: 0 };

    const percentageDelta = Math.max(0, targetPercent - startPercent);
    const kwhAdded = (selectedVehicle.batteryCapacityKwh * percentageDelta) / 100;
    const cost = Math.round(kwhAdded * stationCostPerKwh);

    // Approximate DC time: average charging speed ~ 60 kW
    const effectiveSpeedKw = Math.min(selectedVehicle.dcChargingSpeedKw, 90);
    const timeHours = kwhAdded / effectiveSpeedKw;
    const timeMin = Math.round(timeHours * 60);

    return {
      kwhAdded: Number(kwhAdded.toFixed(1)),
      cost,
      timeMin: Math.max(12, timeMin)
    };
  }, [selectedVehicle, startPercent, targetPercent, stationCostPerKwh]);

  // Filtered stations
  const filteredStations = useMemo(() => {
    return stations.filter(s => {
      if (selectedCity !== 'all' && s.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (selectedConnector !== 'all' && !s.connectors.some(c => c.type === selectedConnector)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.operator.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [stations, selectedCity, selectedConnector, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 py-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <BatteryCharging className="h-3.5 w-3.5" />
            <span>Public Charging Infrastructure</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            EV Charging Hubs &amp; Fast Corridors
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Discover verified DC fast chargers across major Indian expressways, metro hubs, and city clusters.
          </p>
        </div>

        {/* Section 1: Fast Charging Session Cost & Time Calculator */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/90 p-6 shadow-xl">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Public DC Charging Session Calculator</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Estimate charging time and invoice cost for your specific EV at commercial fast chargers
          </p>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Form controls (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Select Your EV Model
                </label>
                <select
                  value={calcCarId}
                  onChange={e => setCalcCarId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.name} ({v.batteryCapacityKwh} kWh • Max {v.dcChargingSpeedKw} kW DC)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Starting Battery:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{startPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={startPercent}
                    onChange={e => setStartPercent(Number(e.target.value))}
                    className="mt-2 w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Target Battery:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{targetPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="100"
                    step="5"
                    value={targetPercent}
                    onChange={e => setTargetPercent(Number(e.target.value))}
                    className="mt-2 w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Station Tariff (₹ / kWh)</label>
                <div className="mt-1.5 flex items-center gap-3">
                  {[18, 21, 24].map(rate => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setStationCostPerKwh(rate)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                        stationCostPerKwh === rate
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                      }`}
                    >
                      ₹{rate}/kWh
                    </button>
                  ))}
                  <input
                    type="number"
                    value={stationCostPerKwh}
                    onChange={e => setStationCostPerKwh(Number(e.target.value))}
                    className="w-24 rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Results Display (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between space-y-4 dark:border-slate-800 dark:bg-slate-950">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Estimated Session Charge Cost
                </span>
                <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  ₹{sessionCalculation.cost.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Added ~{sessionCalculation.kwhAdded} kWh ({targetPercent - startPercent}% SoC)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-200 dark:border-slate-800 pt-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Estimated Time</span>
                  <p className="font-extrabold text-slate-900 dark:text-white text-base mt-0.5">{sessionCalculation.timeMin} Mins</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Range Restored</span>
                  <p className="font-extrabold text-slate-900 dark:text-white text-base mt-0.5">
                    ~{Math.round((selectedVehicle.claimedRangeKm * (targetPercent - startPercent)) / 100)} km
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Stations Directory */}
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Verified Public Fast Chargers</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Live operational status and connector availability</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search hub or highway..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                />
              </div>

              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="all">All Cities</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
              </select>

              <select
                value={selectedConnector}
                onChange={e => setSelectedConnector(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="all">All Connectors</option>
                <option value="CCS2">CCS2 (Standard)</option>
                <option value="Type 2 AC">Type 2 AC</option>
                <option value="GB/T">GB/T</option>
              </select>
            </div>
          </div>

          {/* Stations List */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStations.map(station => (
              <div
                key={station.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {station.operator}
                    </span>
                    <h3 className="mt-1.5 text-base font-extrabold text-slate-900 dark:text-white">{station.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {station.location} ({station.city})
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                    Active
                  </span>
                </div>

                {/* Connectors info */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Available Fast Plugs
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {station.connectors.map((c, i) => (
                      <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-800 dark:bg-slate-950">
                        <p className="font-bold text-slate-900 dark:text-white">{c.type}</p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{c.powerKw} kW DC</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{c.availableCount} of {c.count} Available</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Amenities */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px]">Commercial Tariff:</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">₹{station.pricePerKwh} / kWh</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                    <Coffee className="h-3.5 w-3.5 text-slate-400" />
                    <span>{station.amenities.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
