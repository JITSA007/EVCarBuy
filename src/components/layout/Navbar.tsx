import React, { useState } from 'react';
import {
  Layers,
  MapPin,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any, param?: string) => void;
  selectedCity: string;
  onOpenCityModal: () => void;
  onOpenAdvisor?: () => void;
  onOpenAdvisorModal?: () => void;
  onOpenLiveSearch?: () => void;
  onOpenAdmin?: () => void;
  comparedCount?: number;
  compareCount?: number;
  favoriteCount?: number;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  selectedCity,
  onOpenCityModal,
  onOpenAdvisor,
  onOpenAdvisorModal,
  onOpenLiveSearch,
  comparedCount = 0,
  compareCount = 0,
  favoriteCount = 0,
  savedCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const totalCompare = comparedCount || compareCount;
  const totalSaved = favoriteCount || savedCount;
  const triggerAdvisor = onOpenAdvisor || onOpenAdvisorModal || (() => {});

  const navLinks = [
    { id: 'cars', label: 'All EVs' },
    { id: 'compare', label: 'Compare', badge: totalCompare > 0 ? `${totalCompare}` : null },
    { id: 'subsidies', label: 'State Subsidies' },
    { id: 'salarycalc', label: 'Ownership & EMI' },
    { id: 'rangesim', label: 'Real Range' },
    { id: 'charging', label: 'Charging Hubs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-xs dark:border-slate-800/80 dark:bg-slate-950/95 dark:text-white backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title, single line */}
        <button
          id="brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
          title="BharatEV Live Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-emerald-600 text-white shadow-md shadow-orange-500/20">
            <span className="font-black text-sm tracking-tighter">EV</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                BharatEV <span className="text-amber-500 font-black">Live</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
              India Electric Vehicle Hub
            </p>
          </div>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`relative whitespace-nowrap shrink-0 transition-colors hover:text-amber-500 dark:hover:text-amber-400 ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 rounded bg-amber-500/20 px-1 py-0.2 text-[10px] font-bold text-amber-500">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-amber-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + helper utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* City Selector */}
          <button
            id="city-selector-btn"
            onClick={onOpenCityModal}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/80 px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors whitespace-nowrap"
            title="Change city for on-road pricing"
          >
            <MapPin className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-medium text-slate-500 dark:text-slate-400">RTO:</span>
            <span>{selectedCity}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors"
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Shortlist Badge Button */}
          {totalSaved > 0 && (
            <button
              onClick={() => onNavigate('cars')}
              className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-500 transition-colors"
              title="Saved shortlist"
            >
              <Heart className="h-3.5 w-3.5 fill-rose-500" />
              <span>{totalSaved}</span>
            </button>
          )}

          {/* Primary Action Button: Live Search Grounding */}
          <button
            id="live-search-cta"
            onClick={onOpenLiveSearch}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400 active:scale-95 transition-all whitespace-nowrap"
          >
            <Search className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Live Search</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 lg:hidden">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-850">
            <button
              onClick={onOpenCityModal}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              <span>Location: {selectedCity}</span>
            </button>
            <button
              onClick={onOpenLiveSearch}
              className="text-xs font-bold text-amber-500 flex items-center gap-1"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Live Search
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-lg p-2.5 text-left text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[10px] font-bold text-amber-500">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
