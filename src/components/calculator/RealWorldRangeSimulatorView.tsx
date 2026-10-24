import React, { useState, useMemo } from 'react';
import { Vehicle } from '../../types/ev';
import { 
  Wind, Users, CheckCircle2, 
  MapPin, BatteryCharging, Sliders, ThermometerSun
} from 'lucide-react';

interface RealWorldRangeSimulatorViewProps {
  vehicles: Vehicle[];
  onSelectVehicle?: (slug: string) => void;
}

export const RealWorldRangeSimulatorView: React.FC<RealWorldRangeSimulatorViewProps> = ({
  vehicles
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    vehicles.find(v => v.id === 'mg-tomahawk-ev')?.id || vehicles[0]?.id || ''
  );
  const [speedKmh, setSpeedKmh] = useState<number>(65); // 20 to 120 km/h
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(36); // 10 to 45 deg C
  const [acLevel, setAcLevel] = useState<'off' | 'comfort' | 'chilled'>('comfort');
  const [passengerCount, setPassengerCount] = useState<number>(2); // 1 to 5
  const [drivingMode, setDrivingMode] = useState<'eco' | 'normal' | 'sport'>('normal');

  const selectedVehicle = useMemo(() => {
    return vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];
  }, [vehicles, selectedVehicleId]);

  // Dynamic range calculation physics
  const simulationResult = useMemo(() => {
    if (!selectedVehicle) {
      return {
        estimatedRangeKm: 300,
        consumptionWhPerKm: 140,
        efficiencyPercent: 80,
        tripAssessments: []
      };
    }

    const batteryCapacity = selectedVehicle.batteryCapacityKwh; // in kWh
    const baseWhPerKm = selectedVehicle.efficiencyWhPerKm || (batteryCapacity * 1000) / (selectedVehicle.realWorldRangeKm || 320);

    // 1. Aerodynamic drag penalty: Drag rises with the square of speed
    let speedFactor = 1.0;
    if (speedKmh <= 40) {
      speedFactor = 0.88;
    } else if (speedKmh <= 60) {
      speedFactor = 0.95;
    } else if (speedKmh <= 80) {
      speedFactor = 1.08;
    } else if (speedKmh <= 100) {
      speedFactor = 1.25;
    } else {
      speedFactor = 1.42;
    }

    // 2. Climate & AC consumption
    let acKw = 0;
    if (acLevel === 'comfort') {
      acKw = temperatureCelsius > 35 ? 1.5 : 1.0;
    } else if (acLevel === 'chilled') {
      acKw = 2.4;
    } else {
      acKw = 0.2; // blower only
    }

    const acWhPerKm = (acKw * 1000) / Math.max(20, speedKmh);

    // 3. Passenger Weight Penalty: ~1.5% consumption per 70kg passenger
    const weightFactor = 1 + (passengerCount - 1) * 0.015;

    // 4. Drive Mode Modifier
    const modeFactor = drivingMode === 'eco' ? 0.94 : drivingMode === 'sport' ? 1.12 : 1.0;

    // Total Wh/km
    const totalWhPerKm = (baseWhPerKm * speedFactor + acWhPerKm) * weightFactor * modeFactor;
    const usableKwh = batteryCapacity * 0.94; // 6% top/bottom buffer
    const estimatedRangeKm = Math.round((usableKwh * 1000) / totalWhPerKm);
    const efficiencyPercent = Math.round((estimatedRangeKm / selectedVehicle.claimedRangeKm) * 100);

    // Precomputed popular expressway corridor feasibility
    const tripAssessments = [
      {
        name: 'Delhi to Agra (Yamuna Expressway)',
        distanceKm: 210,
        via: 'Greater Noida → Agra',
        feasibleWithoutStop: estimatedRangeKm >= 225,
        remainingBatteryPercent: Math.max(0, Math.round(((estimatedRangeKm - 210) / estimatedRangeKm) * 100))
      },
      {
        name: 'Mumbai to Pune (Mumbai-Pune Expressway)',
        distanceKm: 155,
        via: 'Navi Mumbai → Lonavala (Ghat Incline) → Pune',
        feasibleWithoutStop: estimatedRangeKm >= 175,
        remainingBatteryPercent: Math.max(0, Math.round(((estimatedRangeKm - 155) / estimatedRangeKm) * 100))
      },
      {
        name: 'Bengaluru to Mysuru (Bengaluru-Mysuru Access Highway)',
        distanceKm: 145,
        via: 'Kengeri → Mandya → Mysuru',
        feasibleWithoutStop: estimatedRangeKm >= 160,
        remainingBatteryPercent: Math.max(0, Math.round(((estimatedRangeKm - 145) / estimatedRangeKm) * 100))
      },
      {
        name: 'Delhi to Jaipur (Delhi-Mumbai Expressway Phase-1)',
        distanceKm: 280,
        via: 'Sohna → Dausa → Jaipur',
        feasibleWithoutStop: estimatedRangeKm >= 300,
        remainingBatteryPercent: Math.max(0, Math.round(((estimatedRangeKm - 280) / estimatedRangeKm) * 100))
      }
    ];

    return {
      estimatedRangeKm,
      consumptionWhPerKm: Math.round(totalWhPerKm),
      efficiencyPercent,
      tripAssessments
    };
  }, [selectedVehicle, speedKmh, temperatureCelsius, acLevel, passengerCount, drivingMode]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header Banner */}
      <div className="mb-8 rounded-2xl border border-emerald-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50/50 p-6 sm:p-8 shadow-xs dark:border-emerald-500/20 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30">
                <ThermometerSun className="h-3.5 w-3.5" /> Indian Climate Tested
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30">
                Aerodynamic &amp; Thermal Physics Model
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Simulate Real Indian Highway &amp; City Range
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              ARAI test cycles don&apos;t reflect high AC usage, scorching Indian summers, or 100 km/h expressway cruising. Adjust the variables below to test real battery stamina.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-xs dark:border-slate-700/60 dark:bg-slate-800/80">
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Calculated Real Range</span>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {simulationResult.estimatedRangeKm} km
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {simulationResult.efficiencyPercent}% of ARAI ({selectedVehicle?.claimedRangeKm} km)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Sliders & Controls (7 Cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Vehicle Selector */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Select Electric Car to Simulate:
            </label>
            <select
              id="select-sim-car"
              value={selectedVehicleId}
              onChange={e => setSelectedVehicleId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-orange-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white shadow-2xs"
            >
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.name} ({v.batteryCapacityKwh} kWh • Claimed {v.claimedRangeKm} km)
                </option>
              ))}
            </select>

            {/* Quick Car Info */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200 dark:bg-slate-950/60 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedVehicle.heroImage}
                  alt={selectedVehicle.name}
                  className="h-12 w-16 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedVehicle.brand} {selectedVehicle.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Battery: {selectedVehicle.batteryCapacityKwh} kWh ({selectedVehicle.batteryChemistry})</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400">ARAI Official</span>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{selectedVehicle.claimedRangeKm} km</div>
              </div>
            </div>
          </div>

          {/* Environmental & Driving Sliders */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              Driving Environment Parameters
            </h3>

            {/* Cruising Speed */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Wind className="h-4 w-4 text-sky-600 dark:text-sky-400" /> Average Cruising Speed
                </span>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{speedKmh} km/h</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="5"
                value={speedKmh}
                onChange={e => setSpeedKmh(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>30 km/h (Heavy City)</span>
                <span>65 km/h (Mixed Outer)</span>
                <span>90 km/h (Highway)</span>
                <span>120 km/h (Expressway)</span>
              </div>
            </div>

            {/* Ambient Temperature */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ThermometerSun className="h-4 w-4 text-amber-600 dark:text-amber-400" /> Ambient Temperature (Weather)
                </span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{temperatureCelsius}°C</span>
              </div>
              <input
                type="range"
                min="12"
                max="46"
                step="2"
                value={temperatureCelsius}
                onChange={e => setTemperatureCelsius(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>12°C (Winter/Hills)</span>
                <span>25°C (Ideal)</span>
                <span>36°C (Warm)</span>
                <span>46°C (Peak Summer)</span>
              </div>
            </div>

            {/* AC / Climate Control Mode */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Air Conditioning / Climate Control:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'off', label: 'AC Off (Windows/Blower)', desc: 'Max Efficiency' },
                  { id: 'comfort', label: 'Comfort (24°C Auto)', desc: 'Standard Indian' },
                  { id: 'chilled', label: 'Chilled (18°C Max)', desc: 'High Compressor Load' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAcLevel(item.id as any)}
                    className={`rounded-xl p-2.5 text-left border transition-all cursor-pointer ${
                      acLevel === item.id
                        ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold dark:bg-orange-500/20 dark:text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Passengers & Luggage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Passenger Count:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPassengerCount(num)}
                      className={`flex-1 rounded-xl py-2 text-center text-xs font-bold border transition-all cursor-pointer ${
                        passengerCount === num
                          ? 'border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-500/20 dark:text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'
                      }`}
                    >
                      {num} {num === 1 ? 'Solo' : 'Pax'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Drive Mode:
                </label>
                <div className="flex gap-2">
                  {(['eco', 'normal', 'sport'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDrivingMode(mode)}
                      className={`flex-1 rounded-xl py-2 text-center text-xs font-bold capitalize border transition-all cursor-pointer ${
                        drivingMode === mode
                          ? 'border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-500/20 dark:text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Simulation Output & Trip Feasibility (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Main Simulated Metrics Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
              <span>Simulation Diagnostics</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Active Physics Output</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Simulated Real Range</span>
                <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {simulationResult.estimatedRangeKm} km
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  vs {selectedVehicle.claimedRangeKm} km ARAI
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Energy Consumption</span>
                <div className="mt-1 text-2xl font-black text-orange-600 dark:text-orange-400">
                  {simulationResult.consumptionWhPerKm} Wh/km
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {(1000 / simulationResult.consumptionWhPerKm).toFixed(1)} km per unit (kWh)
                </span>
              </div>
            </div>

            {/* Range comparison visual bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>ARAI MIDC Certified</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedVehicle.claimedRangeKm} km (100%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-slate-400 dark:bg-slate-600 rounded-full w-full" />
              </div>

              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
                <span>Simulated Highway/City Range</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {simulationResult.estimatedRangeKm} km ({simulationResult.efficiencyPercent}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, simulationResult.efficiencyPercent)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Popular Expressway Trips Readiness */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              Can {selectedVehicle.name} Do These Popular Trips Without Stopping?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Calculated based on your selected cruising speed ({speedKmh} km/h) and temperature ({temperatureCelsius}°C):
            </p>

            <div className="space-y-3">
              {simulationResult.tripAssessments.map((trip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{trip.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {trip.distanceKm} km • {trip.via}
                    </div>
                  </div>

                  <div className="text-right">
                    {trip.feasibleWithoutStop ? (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Non-Stop ({trip.remainingBatteryPercent}% left)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                        <BatteryCharging className="h-3.5 w-3.5" />
                        <span>1 Quick 15-min Charge</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
