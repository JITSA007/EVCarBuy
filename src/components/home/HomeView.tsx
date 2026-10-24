import React from 'react';
import { Vehicle, FilterCriteria, Manufacturer, UpcomingVehicle } from '../../types/ev';
import { HeroSection } from './HeroSection';
import { BudgetGridSection } from './BudgetGridSection';
import { UseCaseSection } from './UseCaseSection';
import { BrandsGridSection } from './BrandsGridSection';
import { CarCard } from '../cars/CarCard';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Building2, Gauge, Calculator, Wallet } from 'lucide-react';

interface HomeViewProps {
  vehicles: Vehicle[];
  manufacturers: Manufacturer[];
  upcomingVehicles: UpcomingVehicle[];
  comparedVehicles: Vehicle[];
  favoriteIds: string[];
  onToggleCompare: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  onSelectVehicle: (slug: string) => void;
  onSearchSubmit: (query: string, parsedFilters?: Partial<FilterCriteria>) => void;
  onQuickFilter: (chip: string, filters: Partial<FilterCriteria>) => void;
  onOpenAdvisor: () => void;
  onComparePreset: (vehicleIds: string[]) => void;
  onSelectBrand: (brandSlug: string) => void;
  onNavigateToCars: () => void;
  onNavigateToUpcoming: () => void;
  onNavigateToSubsidies?: () => void;
  onNavigateToRangeSim?: () => void;
  onNavigateToSalaryCalc?: () => void;
  onOpenLiveSearch?: () => void;
  selectedCity: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  vehicles,
  manufacturers,
  upcomingVehicles,
  comparedVehicles,
  favoriteIds,
  onToggleCompare,
  onToggleFavorite,
  onSelectVehicle,
  onSearchSubmit,
  onQuickFilter,
  onOpenAdvisor,
  onComparePreset,
  onSelectBrand,
  onNavigateToCars,
  onNavigateToUpcoming,
  onNavigateToSubsidies,
  onNavigateToRangeSim,
  onNavigateToSalaryCalc,
  onOpenLiveSearch,
  selectedCity
}) => {
  // Trending EV cars (top 6 by popularity/reviews)
  const trendingVehicles = vehicles.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. Hero Section with Natural Language Search */}
      <HeroSection
        onSearchSubmit={onSearchSubmit}
        onQuickFilter={onQuickFilter}
        onOpenAdvisor={onOpenAdvisor}
        onOpenLiveSearch={onOpenLiveSearch}
      />

      {/* Interactive EV Tools Banner (Salary Calculator, Subsidies & Range Sim) */}
      <section className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Salary & Ownership Affordability Calculator */}
          <div 
            onClick={onNavigateToSalaryCalc}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-6 transition-all hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Wallet className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                20/4/10 Rule
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              Salary &amp; TCO Affordability Advisor
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Input your take-home pay to discover your ideal EV match. Computes EMIs, BaaS battery rentals, home tariffs, and net petrol savings.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Find Best EV For Your Salary</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2: State Subsidies & 0% RTO */}
          <div 
            onClick={onNavigateToSubsidies}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/40 p-6 transition-all hover:border-orange-500/60 hover:shadow-xl hover:shadow-orange-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                Save Up To ₹2.5 Lakh
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
              State Subsidies &amp; 0% Road Tax Explorer
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Discover which Indian states (Delhi, UP, Maharashtra, Tamil Nadu, Telangana) offer 100% road tax waiver and calculated on-road savings.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
              <span>Calculate Your State Savings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3: Real-World Highway & Climate Range Simulator */}
          <div 
            onClick={onNavigateToRangeSim}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 p-6 transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-slate-800/40"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Gauge className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-1 text-xs font-bold text-orange-400">
                Indian Climate Tested
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
              Real-World Highway &amp; AC Range Simulator
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Test how 42°C summer heat, 100 km/h expressway cruising, and 4 passengers impact true battery stamina across all electric cars.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Simulate Real Battery Range</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trending Electric Cars Grid */}
      <section className="py-16 border-b border-slate-800/80 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
                <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                <span>Most Researched • 2026</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
                Trending Electric Cars
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Top benchmarked EV cars in India with verified ARAI figures and on-road prices in {selectedCity}.
              </p>
            </div>

            <button
              onClick={onNavigateToCars}
              className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500 hover:text-white transition-all shadow-sm"
            >
              <span>Explore All {vehicles.length} EVs</span>
              <ArrowRight className="h-3.5 w-3.5 text-orange-400 group-hover:text-white" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVehicles.map(car => (
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
        </div>
      </section>

      {/* 3. Budget Tiers Grid */}
      <BudgetGridSection
        onSelectBudget={(min, max, label) => {
          onQuickFilter(label || 'Budget Filter', { minPriceLakh: min, maxPriceLakh: max });
        }}
      />

      {/* 4. Use-Case Recommendations */}
      <UseCaseSection
        onSelectVehicle={onSelectVehicle}
        onFilterUseCase={label => {
          onNavigateToCars();
        }}
      />

      {/* 5. Brands Grid */}
      <BrandsGridSection
        manufacturers={manufacturers}
        onSelectBrand={onSelectBrand}
      />

      {/* 7. Upcoming EVs Teaser Banner */}
      <section className="py-14 bg-gradient-to-r from-orange-950/25 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-slate-900/90 to-slate-900/90 p-8 shadow-xl shadow-orange-950/20">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-black text-white shadow-sm shadow-orange-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                2026 Sneak Peek • Future Tech
              </span>
              <h3 className="text-2xl font-black text-white">
                Upcoming Electric Cars: Next-Gen Batteries &amp; 800V Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Preview confirmed electric cars arriving in India including Mahindra BE 6e Pack TWO, Tata Harrier EV, Maruti eVX, and Xiaomi SU7.
              </p>
            </div>

            <button
              onClick={onNavigateToUpcoming}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-6 py-3 text-xs font-bold text-white hover:from-orange-400 hover:to-amber-500 transition-all shadow-lg shadow-orange-500/25 flex-shrink-0 active:scale-95"
            >
              <span className="text-white">Explore Upcoming EVs</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
