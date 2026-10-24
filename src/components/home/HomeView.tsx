import React from 'react';
import { Vehicle, FilterCriteria, Manufacturer, UpcomingVehicle } from '../../types/ev';
import { HeroSection } from './HeroSection';
import { BudgetGridSection } from './BudgetGridSection';
import { UseCaseSection } from './UseCaseSection';
import { BrandsGridSection } from './BrandsGridSection';
import { CarCard } from '../cars/CarCard';
import { ArrowRight, Sparkles, Building2, Gauge, Wallet } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors">
      {/* 1. Hero Section with Natural Language Search */}
      <HeroSection
        onSearchSubmit={onSearchSubmit}
        onQuickFilter={onQuickFilter}
        onOpenAdvisor={onOpenAdvisor}
        onOpenLiveSearch={onOpenLiveSearch}
      />

      {/* Interactive EV Tools Banner (Salary Calculator, Subsidies & Range Sim) */}
      <section className="border-b border-slate-200/90 bg-white/80 py-8 px-4 sm:px-6 lg:px-8 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Salary & Ownership Affordability Calculator */}
          <div 
            onClick={onNavigateToSalaryCalc}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-white via-white to-emerald-50/50 p-6 shadow-xs transition-all hover:border-emerald-500 hover:shadow-lg dark:border-emerald-500/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 dark:hover:border-emerald-500/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30">
                <Wallet className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400">
                20/4/10 Rule
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Salary &amp; TCO Affordability Advisor
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Input your take-home pay to discover your ideal EV match. Computes EMIs, BaaS battery rentals, home tariffs, and net petrol savings.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Find Best EV For Your Salary</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2: State Subsidies & 0% RTO */}
          <div 
            onClick={onNavigateToSubsidies}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-orange-200/90 bg-gradient-to-br from-white via-white to-orange-50/50 p-6 shadow-xs transition-all hover:border-orange-500 hover:shadow-lg dark:border-orange-500/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/40 dark:hover:border-orange-500/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400">
                Save Up To ₹2.5 Lakh
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              State Subsidies &amp; 0% Road Tax Explorer
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Discover which Indian states (Delhi, UP, Maharashtra, Tamil Nadu, Telangana) offer 100% road tax waiver and calculated on-road savings.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-orange-700 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
              <span>Calculate Your State Savings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3: Real-World Highway & Climate Range Simulator */}
          <div 
            onClick={onNavigateToRangeSim}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-amber-50/40 p-6 shadow-xs transition-all hover:border-amber-500 hover:shadow-lg dark:border-slate-700/80 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 dark:hover:border-orange-500/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30">
                <Gauge className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-orange-100 border border-orange-200 px-3 py-1 text-xs font-bold text-orange-800 dark:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-400">
                Indian Climate Tested
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Real-World Highway &amp; AC Range Simulator
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Test how 42°C summer heat, 100 km/h expressway cruising, and 4 passengers impact true battery stamina across all electric cars.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Simulate Real Battery Range</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trending Electric Cars Grid */}
      <section className="py-16 border-b border-slate-200 bg-slate-50 dark:border-slate-800/80 dark:bg-[#0b0f19]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Most Researched • 2026</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Trending Electric Cars
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Top benchmarked EV cars in India with verified ARAI figures and on-road prices in {selectedCity}.
              </p>
            </div>

            <button
              onClick={onNavigateToCars}
              className="flex items-center gap-1.5 rounded-xl border border-orange-300 bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700 hover:bg-orange-600 hover:text-white dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300 dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-xs"
            >
              <span>Explore All {vehicles.length} EVs</span>
              <ArrowRight className="h-3.5 w-3.5" />
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
        onFilterUseCase={() => {
          onNavigateToCars();
        }}
      />

      {/* 5. Brands Grid */}
      <BrandsGridSection
        manufacturers={manufacturers}
        onSelectBrand={onSelectBrand}
      />

      {/* 7. Upcoming EVs Teaser Banner */}
      <section className="py-14 bg-slate-100/70 border-b border-slate-200 dark:bg-gradient-to-r dark:from-orange-950/25 dark:via-slate-900 dark:to-slate-950 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-orange-200 bg-white p-8 shadow-md dark:border-orange-500/30 dark:bg-gradient-to-r dark:from-orange-950/40 dark:via-slate-900/90 dark:to-slate-900/90">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-black text-white shadow-sm shadow-orange-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                2026 Sneak Peek • Future Tech
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Upcoming Electric Cars: Next-Gen Batteries &amp; 800V Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Preview confirmed electric cars arriving in India including Mahindra BE 6e Pack TWO, Tata Harrier EV, Maruti eVX, and Xiaomi SU7.
              </p>
            </div>

            <button
              onClick={onNavigateToUpcoming}
              className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-xs font-bold text-white hover:bg-orange-500 transition-all shadow-md active:scale-95 shrink-0"
            >
              <span>Explore Upcoming EVs</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
