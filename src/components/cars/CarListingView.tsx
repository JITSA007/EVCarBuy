import React, { useState, useMemo } from 'react';
import { Vehicle, FilterCriteria, BodyType, DriveType } from '../../types/ev';
import { CarCard } from './CarCard';
import {
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Zap,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';

interface CarListingViewProps {
  vehicles: Vehicle[];
  comparedVehicles: Vehicle[];
  favoriteIds: string[];
  onToggleCompare: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  onSelectVehicle: (slug: string) => void;
  initialFilters?: Partial<FilterCriteria>;
  selectedCity: string;
}

export const CarListingView: React.FC<CarListingViewProps> = ({
  vehicles,
  comparedVehicles,
  favoriteIds,
  onToggleCompare,
  onToggleFavorite,
  onSelectVehicle,
  initialFilters,
  selectedCity
}) => {
  const defaultFilters: FilterCriteria = {
    searchQuery: '',
    brands: [],
    bodyTypes: [],
    minPriceLakh: 0,
    maxPriceLakh: 300,
    minRangeKm: 0,
    minBatteryKwh: 0,
    seating: [],
    driveTypes: [],
    fastChargingSpeedKw: 0,
    adasOnly: false,
    sunroofOnly: false,
    v2lOnly: false,
    camera360Only: false,
    minNcapRating: 0,
    status: 'all',
    sortBy: 'popular'
  };

  const [filters, setFilters] = useState<FilterCriteria>({
    ...defaultFilters,
    ...initialFilters
  });

  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);

  // Available filter options (dynamically extracted from all Indian vehicles)
  const allBrands: string[] = Array.from(new Set<string>(vehicles.map(v => v.brand))).sort();
  const allBodyTypes: BodyType[] = ['Compact SUV', 'SUV', 'Hatchback', 'Sedan', 'MPV', 'Coupe', 'Luxury'];
  const allDriveTypes: DriveType[] = ['FWD', 'RWD', 'AWD'];

  const budgetQuickTiers = [
    { label: 'Under ₹10L', max: 10 },
    { label: '₹10–15L', min: 10, max: 15 },
    { label: '₹15–20L', min: 15, max: 20 },
    { label: '₹20–30L', min: 20, max: 30 },
    { label: '₹30–50L', min: 30, max: 50 },
    { label: '₹50L+ Luxury', min: 50, max: 300 }
  ];

  // Filtering & Sorting Logic
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.bodyType.toLowerCase().includes(q) ||
        v.segment.toLowerCase().includes(q)
      );
    }

    // Brands
    if (filters.brands.length > 0) {
      result = result.filter(v => filters.brands.includes(v.brand));
    }

    // Body types
    if (filters.bodyTypes.length > 0) {
      result = result.filter(v => filters.bodyTypes.includes(v.bodyType));
    }

    // Budget
    if (filters.maxPriceLakh && filters.maxPriceLakh < 300) {
      result = result.filter(v => v.startingPriceLakh <= filters.maxPriceLakh);
    }
    if (filters.minPriceLakh && filters.minPriceLakh > 0) {
      result = result.filter(v => v.endingPriceLakh >= filters.minPriceLakh);
    }

    // Range
    if (filters.minRangeKm > 0) {
      result = result.filter(v => v.claimedRangeKm >= filters.minRangeKm);
    }

    // Battery
    if (filters.minBatteryKwh > 0) {
      result = result.filter(v => v.batteryCapacityKwh >= filters.minBatteryKwh);
    }

    // Fast charging
    if (filters.fastChargingSpeedKw > 0) {
      result = result.filter(v => v.dcChargingSpeedKw >= filters.fastChargingSpeedKw);
    }

    // Seating
    if (filters.seating.length > 0) {
      result = result.filter(v => filters.seating.includes(v.seatingCapacity));
    }

    // Drive types
    if (filters.driveTypes.length > 0) {
      result = result.filter(v => filters.driveTypes.includes(v.driveType));
    }

    // Safety NCAP
    if (filters.minNcapRating > 0) {
      result = result.filter(v => (v.ncapRating ?? 0) >= filters.minNcapRating);
    }

    // Feature toggles
    if (filters.adasOnly) {
      result = result.filter(v => v.adasLevel > 0);
    }
    if (filters.sunroofOnly) {
      result = result.filter(v => v.sunroof !== 'None');
    }
    if (filters.v2lOnly) {
      result = result.filter(v => v.v2l);
    }
    if (filters.camera360Only) {
      result = result.filter(v => v.camera360);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.startingPriceLakh - b.startingPriceLakh);
        break;
      case 'price-desc':
        result.sort((a, b) => b.endingPriceLakh - a.endingPriceLakh);
        break;
      case 'range-desc':
        result.sort((a, b) => b.claimedRangeKm - a.claimedRangeKm);
        break;
      case 'charging-desc':
        result.sort((a, b) => b.dcChargingSpeedKw - a.dcChargingSpeedKw);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
        result.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime());
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [vehicles, filters]);

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const toggleBodyType = (bType: BodyType) => {
    setFilters(prev => ({
      ...prev,
      bodyTypes: prev.bodyTypes.includes(bType)
        ? prev.bodyTypes.filter(b => b !== bType)
        : [...prev.bodyTypes, bType]
    }));
  };

  const resetAllFilters = () => {
    setFilters(defaultFilters);
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.brands.length > 0 ||
    filters.bodyTypes.length > 0 ||
    filters.minPriceLakh > 0 ||
    filters.maxPriceLakh < 300 ||
    filters.minRangeKm > 0 ||
    filters.minBatteryKwh > 0 ||
    filters.fastChargingSpeedKw > 0 ||
    filters.adasOnly ||
    filters.sunroofOnly ||
    filters.v2lOnly ||
    filters.camera360Only ||
    filters.minNcapRating > 0;

  // Render Filter Content (shared between Desktop sidebar & Mobile drawer)
  const renderFilterPanel = () => (
    <div className="space-y-6">
      {/* Header with Reset */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-orange-400" />
          <span className="text-sm font-bold text-white">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Budget Quick Tiers */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Budget (Ex-Showroom)
        </label>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {budgetQuickTiers.map(tier => {
            const isSelected =
              filters.maxPriceLakh === tier.max &&
              (tier.min ? filters.minPriceLakh === tier.min : filters.minPriceLakh === 0);
            return (
              <button
                key={tier.label}
                type="button"
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    minPriceLakh: isSelected ? 0 : tier.min || 0,
                    maxPriceLakh: isSelected ? 100 : tier.max
                  }));
                }}
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Manufacturer Brands */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Manufacturer
        </label>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {allBrands.map(brand => {
            const isSelected = filters.brands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                {isSelected && <Check className="h-3 w-3 text-emerald-400" />}
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body Types */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Body Type
        </label>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {allBodyTypes.map(bType => {
            const isSelected = filters.bodyTypes.includes(bType);
            return (
              <button
                key={bType}
                type="button"
                onClick={() => toggleBodyType(bType)}
                className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                {isSelected && <Check className="h-3 w-3 text-emerald-400" />}
                {bType}
              </button>
            );
          })}
        </div>
      </div>

      {/* Min Claimed Range */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Min Claimed Range
          </label>
          <span className="text-xs font-bold text-emerald-400">
            {filters.minRangeKm > 0 ? `${filters.minRangeKm} km+` : 'Any Range'}
          </span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {[0, 300, 400, 500].map(val => (
            <button
              key={val}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, minRangeKm: val }))}
              className={`flex-1 rounded-lg border py-1 text-xs font-semibold ${
                filters.minRangeKm === val
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300'
              }`}
            >
              {val === 0 ? 'All' : `${val}+ km`}
            </button>
          ))}
        </div>
      </div>

      {/* Fast Charging */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Fast Charging Speed
        </label>
        <div className="mt-2 flex gap-1.5">
          {[0, 50, 80, 120].map(kw => (
            <button
              key={kw}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, fastChargingSpeedKw: kw }))}
              className={`flex-1 rounded-lg border py-1 text-xs font-semibold ${
                filters.fastChargingSpeedKw === kw
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300'
              }`}
            >
              {kw === 0 ? 'All' : `${kw}kW+`}
            </button>
          ))}
        </div>
      </div>

      {/* Safety & NCAP */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Safety Rating
        </label>
        <button
          type="button"
          onClick={() =>
            setFilters(prev => ({ ...prev, minNcapRating: prev.minNcapRating === 5 ? 0 : 5 }))
          }
          className={`mt-2 w-full flex items-center justify-between rounded-xl border p-2.5 text-xs font-semibold ${
            filters.minNcapRating === 5
              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
              : 'border-slate-800 bg-slate-900/60 text-slate-300'
          }`}
        >
          <span>5-Star Bharat / Global NCAP</span>
          {filters.minNcapRating === 5 && <Check className="h-4 w-4 text-emerald-400" />}
        </button>
      </div>

      {/* Feature Checkboxes */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Must-Have Features
        </label>

        {[
          { key: 'adasOnly', label: 'Level 2 ADAS (Collision Avoidance)' },
          { key: 'sunroofOnly', label: 'Panoramic / Electric Sunroof' },
          { key: 'v2lOnly', label: 'V2L (Power Home Appliances)' },
          { key: 'camera360Only', label: '360° Surround Camera' }
        ].map(item => {
          const isChecked = Boolean(filters[item.key as keyof FilterCriteria]);
          return (
            <label
              key={item.key}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5 text-xs font-medium text-slate-300 hover:text-white"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={e =>
                  setFilters(prev => ({ ...prev, [item.key]: e.target.checked }))
                }
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
              />
              <span>{item.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
                <Zap className="h-3.5 w-3.5 text-orange-400" />
                <span>All Indian Electric Cars • 2026 Edition</span>
              </div>
              <div className="mt-1 flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Electric Cars in India
                </h1>
                <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-0.5 text-xs font-black text-white shadow-sm shadow-orange-500/20">
                  {filteredVehicles.length} of {vehicles.length} EVs
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                Comparing all {filteredVehicles.length} electric cars with verified specs, on-road prices in <strong className="text-white font-semibold">{selectedCity}</strong>, and ARAI range benchmarks.
              </p>
            </div>

            {/* Mobile Filter & Sort Triggers */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileFilterDrawerOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-slate-900 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <SlidersHorizontal className="h-4 w-4 text-orange-400" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              <select
                value={filters.sortBy}
                onChange={e =>
                  setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterCriteria['sortBy'] }))
                }
                className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs font-bold text-white focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="range-desc">Highest Range</option>
                <option value="charging-desc">Fastest Charging</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="latest">Latest Launches</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Active:</span>

              {filters.brands.map(b => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs text-white"
                >
                  {b}
                  <button onClick={() => toggleBrand(b)}>
                    <X className="h-3 w-3 hover:text-rose-400" />
                  </button>
                </span>
              ))}

              {filters.bodyTypes.map(bt => (
                <span
                  key={bt}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs text-white"
                >
                  {bt}
                  <button onClick={() => toggleBodyType(bt)}>
                    <X className="h-3 w-3 hover:text-rose-400" />
                  </button>
                </span>
              ))}

              {filters.maxPriceLakh < 100 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs text-white">
                  ≤ ₹{filters.maxPriceLakh}L
                  <button onClick={() => setFilters(prev => ({ ...prev, maxPriceLakh: 100 }))}>
                    <X className="h-3 w-3 hover:text-rose-400" />
                  </button>
                </span>
              )}

              {filters.minRangeKm > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs text-white">
                  Range ≥ {filters.minRangeKm} km
                  <button onClick={() => setFilters(prev => ({ ...prev, minRangeKm: 0 }))}>
                    <X className="h-3 w-3 hover:text-rose-400" />
                  </button>
                </span>
              )}

              {filters.fastChargingSpeedKw > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs text-white">
                  Charge ≥ {filters.fastChargingSpeedKw} kW
                  <button onClick={() => setFilters(prev => ({ ...prev, fastChargingSpeedKw: 0 }))}>
                    <X className="h-3 w-3 hover:text-rose-400" />
                  </button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-emerald-400 hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Left Sidebar + Right Car Cards */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 backdrop-blur-md">
              {renderFilterPanel()}
            </div>
          </aside>

          {/* Right Results Area */}
          <main className="lg:col-span-3">
            {/* Desktop Sort Bar */}
            <div className="hidden md:flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <span className="text-xs font-semibold text-slate-400">
                Found <strong className="text-white">{filteredVehicles.length}</strong> vehicles matching your criteria
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Sort By:</span>
                <select
                  id="car-listing-sort-select"
                  value={filters.sortBy}
                  onChange={e =>
                    setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterCriteria['sortBy'] }))
                  }
                  className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-200 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="range-desc">Highest Range</option>
                  <option value="charging-desc">Fastest Charging</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="latest">Latest Launches</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredVehicles.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
                <Search className="mx-auto h-12 w-12 text-slate-500" />
                <h3 className="mt-4 text-lg font-bold text-white">No EV Cars Found</h3>
                <p className="mt-1 text-sm text-slate-400 max-w-md mx-auto">
                  No electric vehicles matched all your active filters. Try broadening your budget range, resetting feature toggles, or clearing the search query.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Vehicle Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map(car => (
                  <CarCard
                    key={car.id}
                    vehicle={car}
                    isCompared={comparedVehicles.some(cv => cv.id === car.id)}
                    isFavorite={favoriteIds.includes(car.id)}
                    onToggleCompare={onToggleCompare}
                    onToggleFavorite={onToggleFavorite}
                    onSelectVehicle={onSelectVehicle}
                    selectedCity={selectedCity}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-base font-bold text-white">Filter EVs</span>
                <button
                  onClick={() => setMobileFilterDrawerOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {renderFilterPanel()}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 sticky bottom-0 bg-slate-900 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 rounded-xl border border-slate-700 py-2.5 text-xs font-bold text-slate-300"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterDrawerOpen(false)}
                className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-slate-950"
              >
                Apply ({filteredVehicles.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
