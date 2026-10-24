import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Globe } from 'lucide-react';
import { parseNaturalLanguageQuery } from '../../services/searchIntentParser';
import { FilterCriteria } from '../../types/ev';

interface HeroSectionProps {
  onSearchSubmit: (query: string, parsedFilters?: Partial<FilterCriteria>) => void;
  onQuickFilter: (chip: string, filters: Partial<FilterCriteria>) => void;
  onOpenAdvisor: () => void;
  onOpenLiveSearch?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSubmit,
  onQuickFilter,
  onOpenAdvisor,
  onOpenLiveSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularQueries = [
    'Tata Curvv EV vs Nexon EV',
    'MG Windsor EV BaaS pricing',
    'Mahindra BE 6e real highway range',
    'Best family electric SUV under ₹20 Lakh',
    'EVs with 0% road tax in Delhi and UP',
    'BYD Seal Performance AWD',
    'Citroën ë-C3',
    'Mercedes EQS 580 ARAI range',
  ];

  const quickFilterChips = [
    { label: 'Under ₹15 Lakh', filter: { maxPriceLakh: 15 } },
    { label: '₹15 – ₹25 Lakh', filter: { minPriceLakh: 15, maxPriceLakh: 25 } },
    { label: 'Best Range (450+ km)', filter: { minRangeKm: 450, sortBy: 'range-desc' as const } },
    { label: 'Fast Charging (≥70 kW)', filter: { fastChargingSpeedKw: 70, sortBy: 'charging-desc' as const } },
    { label: '5-Star NCAP Safety', filter: { minNcapRating: 5 } },
    { label: 'Luxury Flagships (₹50L+)', filter: { minPriceLakh: 50 } },
  ];

  const handleExecuteSearch = (q: string) => {
    if (!q.trim()) return;
    const parsed = parseNaturalLanguageQuery(q);
    onSearchSubmit(q, parsed.interpretedFilters);
    setShowSuggestions(false);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white py-14 sm:py-20 dark:border-slate-800/80 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-amber-500 mb-3">
          All Models Purchasable in India · Real-Time Web Grounded
        </p>

        {/* H1 Headline with balanced text */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl text-balance dark:text-white">
          Every Electric Car in India, <br className="hidden sm:inline" />
          <span className="text-orange-600 dark:text-amber-400">Verified in Real Time.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-balance dark:text-slate-300">
          Explore complete specifications, ARAI vs. real-world range, state RTO subsidies, and on-demand live Google search updates across mass-market, mid-size, and luxury EVs.
        </p>

        {/* Search Input Bar */}
        <div className="relative mx-auto mt-8 max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleExecuteSearch(searchInput);
            }}
            className="flex items-center rounded-2xl border border-slate-300 bg-white p-2 shadow-lg transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-2xl"
          >
            <div className="flex items-center pl-3 text-orange-500 dark:text-amber-400">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              id="hero-smart-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search all Indian EVs by model, brand, or budget (e.g. 'Curvv EV', 'BE 6e', 'Under 15 Lakh')..."
              className="w-full bg-transparent px-3.5 py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-medium dark:text-white dark:placeholder-slate-400"
            />

            <button
              type="submit"
              id="hero-search-submit-btn"
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 transition-all hover:bg-amber-400 active:scale-95 shrink-0 shadow-md cursor-pointer"
            >
              <span>Search</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Autocomplete / Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-2 z-30 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl text-left backdrop-blur-xl animate-in fade-in duration-150 dark:border-slate-800 dark:bg-slate-900/98">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Popular Indian EV Queries
                </span>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  Close
                </button>
              </div>
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {popularQueries.map((pq) => (
                  <button
                    key={pq}
                    type="button"
                    onClick={() => {
                      setSearchInput(pq);
                      handleExecuteSearch(pq);
                    }}
                    className="flex items-center gap-2 rounded-xl p-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-orange-600 transition-colors text-left dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-amber-400"
                  >
                    <Search className="h-3.5 w-3.5 text-orange-500 dark:text-amber-400 shrink-0" />
                    <span>{pq}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Search Grounding Callout */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span>Need real-time 2025/2026 pricing or waiting times?</span>
          <button
            onClick={onOpenLiveSearch}
            className="text-orange-600 hover:text-orange-700 dark:text-amber-400 dark:hover:text-amber-300 font-semibold underline underline-offset-4 flex items-center gap-1 cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5" />
            Ask Live Search Grounding →
          </button>
        </div>

        {/* Quick Filter Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-600 dark:text-slate-400 mr-1 font-medium">Quick Filters:</span>
          {quickFilterChips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => onQuickFilter(chip.label, chip.filter)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-orange-500 hover:text-orange-600 active:scale-95 transition-all shadow-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-amber-500/50 dark:hover:text-amber-400 cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Interactive Advisory Prompt */}
        <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:px-6 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
          <div className="text-left">
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              Unsure which model fits your daily commute and city?
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized recommendation based on daily km, home charging, and budget.
            </p>
          </div>
          <button
            onClick={onOpenAdvisor}
            className="ml-auto rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-all shrink-0 dark:bg-slate-800 dark:text-amber-400 dark:hover:bg-slate-700 dark:border dark:border-slate-700 cursor-pointer"
          >
            Match My Commute
          </button>
        </div>
      </div>
    </section>
  );
};
