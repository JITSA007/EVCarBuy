import React from 'react';
import { Vehicle } from '../../types/ev';
import {
  BatteryCharging,
  Gauge,
  Zap,
  Shield,
  Heart,
  Layers,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

interface CarCardProps {
  vehicle: Vehicle;
  isCompared: boolean;
  isFavorite: boolean;
  onToggleCompare: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  onSelectVehicle: (slug: string) => void;
  selectedCity?: string;
}

export const CarCard: React.FC<CarCardProps> = ({
  vehicle,
  isCompared,
  isFavorite,
  onToggleCompare,
  onToggleFavorite,
  onSelectVehicle,
  selectedCity = 'Delhi'
}) => {
  // Compute badge
  const getBadge = () => {
    if (vehicle.startingPriceLakh < 12) return { label: 'Value EV Champion', color: 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/40' };
    if (vehicle.dcChargingSpeedKw >= 100) return { label: `${vehicle.dcChargingSpeedKw}kW Hypercharge`, color: 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/40' };
    if (vehicle.claimedRangeKm >= 550) return { label: 'Expressway Mile Muncher', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    if (vehicle.ncapRating === 5) return { label: '5★ Bharat NCAP Safe', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
    if (vehicle.rating >= 4.8) return { label: 'Top User Choice', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    return null;
  };

  const badge = getBadge();

  // Running cost indicator: typical Indian EV ~₹1.15 to ₹1.45/km
  const runningCostPerKm = (7.5 / 6.5).toFixed(2); // ~₹1.15 / km

  // Check state RTO waiver for selected city
  const isRtoFreeCity = ['delhi', 'noida', 'lucknow', 'mumbai', 'pune', 'chennai', 'hyderabad'].some(c =>
    selectedCity.toLowerCase().includes(c)
  );

  return (
    <div
      id={`car-card-${vehicle.id}`}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg dark:border-slate-800/90 dark:bg-slate-900/70 dark:text-white dark:hover:border-orange-500/40"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-slate-950">
        <img
          src={vehicle.heroImage}
          alt={`${vehicle.brand} ${vehicle.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />

        {/* Brand / Body Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md border border-slate-700/60">
            {vehicle.brand}
          </span>
          <span className="rounded-lg bg-slate-900/80 px-2 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md">
            {vehicle.bodyType}
          </span>
        </div>

        {/* Favorite Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(vehicle.id);
          }}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-slate-300 backdrop-blur-md transition-colors hover:bg-slate-900 hover:text-rose-500"
          title={isFavorite ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'stroke-[2.5]'}`} />
        </button>

        {/* Highlight Badge */}
        {badge && (
          <div className="absolute bottom-3 left-3">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md border ${badge.color}`}>
              <Sparkles className="h-3 w-3" />
              {badge.label}
            </span>
          </div>
        )}

        {/* NCAP Safety Star */}
        {vehicle.ncapRating && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/80 px-2.5 py-0.5 text-xs font-bold text-amber-400 border border-slate-700/60 backdrop-blur-md">
            <Shield className="h-3 w-3 fill-amber-400" />
            <span>{vehicle.ncapRating}★ NCAP</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              onClick={() => onSelectVehicle(vehicle.slug)}
              className="cursor-pointer text-lg font-black text-slate-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400"
            >
              {vehicle.brand} {vehicle.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{vehicle.segment} • {vehicle.variants.length} Variants</p>
          </div>
          <div className="text-right">
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
              ₹{vehicle.startingPriceLakh} – ₹{vehicle.endingPriceLakh} L
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Ex-Showroom</p>
            {vehicle.baasAvailable && (
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Or ₹{vehicle.baasStartingPriceLakh}L + BaaS</p>
            )}
          </div>
        </div>

        {/* 4 Core Spec Indicators */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/50">
          {/* Claimed vs Real Range */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Range (ARAI)</p>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-200">
                {vehicle.claimedRangeKm} km <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">({vehicle.realWorldRangeKm} real)</span>
              </p>
            </div>
          </div>

          {/* Battery */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/15 text-sky-600 dark:text-cyan-400">
              <BatteryCharging className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Battery</p>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-200">{vehicle.batteryCapacityKwh} kWh</p>
            </div>
          </div>

          {/* Charging Time */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Gauge className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Fast Charging</p>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-200">
                {vehicle.chargingTimeDcMin10To80}m <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">({vehicle.dcChargingSpeedKw} kW)</span>
              </p>
            </div>
          </div>

          {/* Power / Acceleration */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400">
              <Award className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">0-100 km/h</p>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-200">{vehicle.acceleration0To100}s ({vehicle.motorPowerBhp} bhp)</p>
            </div>
          </div>
        </div>

        {/* Useful Indicators (Running cost, 0% RTO tax, Chemistry) */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded bg-emerald-100 dark:bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            ₹{runningCostPerKm}/km running
          </span>
          {isRtoFreeCity && (
            <span className="inline-flex items-center rounded bg-orange-100 dark:bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold text-orange-800 dark:text-orange-400 border border-orange-200 dark:border-orange-500/25">
              0% RTO Tax in {selectedCity}
            </span>
          )}
          {vehicle.baasAvailable && (
            <span className="inline-flex items-center rounded bg-amber-100 dark:bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/25">
              BaaS from ₹{vehicle.baasStartingPriceLakh}L
            </span>
          )}
          <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {vehicle.batteryChemistry.split(' ')[0]} Battery
          </span>
          {vehicle.ventilatedSeats && (
            <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Ventilated Seats
            </span>
          )}
          {vehicle.adasLevel > 0 && (
            <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              L{vehicle.adasLevel} ADAS
            </span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-3">
          {/* Compare Checkbox */}
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white select-none">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(vehicle)}
              className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-950"
            />
            <span className="flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-slate-400" />
              Compare
            </span>
          </label>

          {/* View Details CTA */}
          <button
            onClick={() => onSelectVehicle(vehicle.slug)}
            className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-orange-700 hover:shadow-md active:scale-95 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
