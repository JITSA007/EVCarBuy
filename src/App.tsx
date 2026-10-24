import React, { useState, useEffect } from 'react';
import { vehicleDataProvider } from './services/dataProvider';
import { Vehicle, FilterCriteria, CityPricing } from './types/ev';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { CarListingView } from './components/cars/CarListingView';
import { CarDetailView } from './components/cars/CarDetailView';
import { CompareView } from './components/compare/CompareView';
import { UpcomingView } from './components/upcoming/UpcomingView';
import { ChargingNetworkView } from './components/charging/ChargingNetworkView';
import { RunningCostCalculatorView } from './components/calculator/RunningCostCalculatorView';
import { CompareFloatingBar } from './components/common/CompareFloatingBar';
import { LocationSelectorModal } from './components/common/LocationSelectorModal';
import { AdvisorModal } from './components/advisor/AdvisorModal';
import { PriceAlertModal } from './components/common/PriceAlertModal';
import { DataSyncModal } from './components/admin/DataSyncModal';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { StateSubsidyExplorerView } from './components/subsidy/StateSubsidyExplorerView';
import { RealWorldRangeSimulatorView } from './components/calculator/RealWorldRangeSimulatorView';
import { SalaryAffordabilityCalculatorView } from './components/calculator/SalaryAffordabilityCalculatorView';
import { LiveSearchModal } from './components/common/LiveSearchModal';

export type AppView = 'home' | 'cars' | 'detail' | 'compare' | 'upcoming' | 'charging' | 'calculator' | 'subsidies' | 'rangesim' | 'salarycalc';

export default function App() {
  // Master data
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => vehicleDataProvider.getVehiclesSync());
  const [cities] = useState<CityPricing[]>(() => vehicleDataProvider.getCities());
  const [manufacturers] = useState(() => vehicleDataProvider.getManufacturersSync());
  const [upcomingVehicles] = useState(() => vehicleDataProvider.getUpcomingVehiclesSync());
  const [stations] = useState(() => vehicleDataProvider.getChargingStationsSync());

  // View state
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // User preferences & selections
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    return localStorage.getItem('evclubindia_city') || localStorage.getItem('voltsphere_city') || 'Delhi';
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('evclubindia_favorites') || localStorage.getItem('voltsphere_favorites');
      return saved ? JSON.parse(saved) : ['tata-nexon-ev', 'byd-seal'];
    } catch {
      return ['tata-nexon-ev', 'byd-seal'];
    }
  });

  const [comparedVehicleIds, setComparedVehicleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('evclubindia_compared');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [listingFilters, setListingFilters] = useState<Partial<FilterCriteria>>({});

  // Modals state
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [priceAlertModalOpen, setPriceAlertModalOpen] = useState(false);
  const [priceAlertVehicle, setPriceAlertVehicle] = useState<Vehicle | null>(null);
  const [liveSearchModalOpen, setLiveSearchModalOpen] = useState(false);

  // Toast messages
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'info', message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync city to storage
  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('evclubindia_city', city);
    addToast('info', `City updated to ${city}. On-road prices adjusted.`);
  };

  // Sync favorites to storage
  const handleToggleFavorite = (vehicleId: string) => {
    setFavoriteIds(prev => {
      const isFav = prev.includes(vehicleId);
      const next = isFav ? prev.filter(id => id !== vehicleId) : [...prev, vehicleId];
      localStorage.setItem('evclubindia_favorites', JSON.stringify(next));
      addToast('success', isFav ? 'Removed from shortlist' : 'Added to your shortlist');
      return next;
    });
  };

  // Compared vehicles derived objects
  const comparedVehicles = comparedVehicleIds
    .map(id => vehicles.find(v => v.id === id))
    .filter((v): v is Vehicle => Boolean(v));

  // Toggle compare with 4-car maximum limit enforcement
  const handleToggleCompare = (vehicle: Vehicle) => {
    const exists = comparedVehicleIds.includes(vehicle.id);
    if (exists) {
      const next = comparedVehicleIds.filter(id => id !== vehicle.id);
      setComparedVehicleIds(next);
      localStorage.setItem('evclubindia_compared', JSON.stringify(next));
      addToast('info', `Removed ${vehicle.name} from comparison.`);
    } else {
      if (comparedVehicleIds.length >= 4) {
        addToast(
          'warning',
          'Comparison limit reached (max 4 EVs). Remove an EV to compare this car.'
        );
        return;
      }
      const next = [...comparedVehicleIds, vehicle.id];
      setComparedVehicleIds(next);
      localStorage.setItem('evclubindia_compared', JSON.stringify(next));
      addToast('success', `Added ${vehicle.name} to comparison tray (${next.length} of 4).`);
    }
  };

  const handleRemoveCompare = (id: string) => {
    const next = comparedVehicleIds.filter(vId => vId !== id);
    setComparedVehicleIds(next);
    localStorage.setItem('evclubindia_compared', JSON.stringify(next));
  };

  const handleClearCompare = () => {
    setComparedVehicleIds([]);
    localStorage.setItem('evclubindia_compared', JSON.stringify([]));
    addToast('info', 'Cleared all vehicles from comparison tray.');
  };

  // Navigation handlers
  const navigateTo = (view: AppView, slug?: string) => {
    setCurrentView(view);
    if (slug) {
      setSelectedSlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentView('home');
      } else if (hash === 'cars') {
        setCurrentView('cars');
      } else if (hash === 'compare') {
        setCurrentView('compare');
      } else if (hash === 'upcoming') {
        setCurrentView('upcoming');
      } else if (hash === 'charging') {
        setCurrentView('charging');
      } else if (hash === 'calculator') {
        setCurrentView('calculator');
      } else if (hash === 'subsidies') {
        setCurrentView('subsidies');
      } else if (hash === 'rangesim') {
        setCurrentView('rangesim');
      } else if (hash.startsWith('car/')) {
        const slug = hash.replace('car/', '');
        setSelectedSlug(slug);
        setCurrentView('detail');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectVehicle = (slug: string) => {
    setSelectedSlug(slug);
    setCurrentView('detail');
    window.location.hash = `car/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string, parsedFilters?: Partial<FilterCriteria>) => {
    setListingFilters({
      searchQuery: query,
      ...parsedFilters
    });
    setCurrentView('cars');
    window.location.hash = 'cars';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickFilter = (chip: string, filters: Partial<FilterCriteria>) => {
    setListingFilters(filters);
    setCurrentView('cars');
    window.location.hash = 'cars';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComparePreset = (vehicleIds: string[]) => {
    setComparedVehicleIds(vehicleIds);
    localStorage.setItem('evclubindia_compared', JSON.stringify(vehicleIds));
    setCurrentView('compare');
    window.location.hash = 'compare';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBrand = (brandSlug: string) => {
    const brandName = brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1);
    setListingFilters({ brands: [brandName] });
    setCurrentView('cars');
    window.location.hash = 'cars';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPriceAlert = (vehicle: Vehicle) => {
    setPriceAlertVehicle(vehicle);
    setPriceAlertModalOpen(true);
  };

  // Reload vehicles when admin triggers manual sync
  const handleDataUpdated = () => {
    setVehicles(vehicleDataProvider.getVehiclesSync());
    addToast('success', 'Master vehicle database reloaded with verified prices.');
  };

  // Active detail vehicle
  const activeDetailVehicle = vehicles.find(v => v.slug === selectedSlug) || vehicles[0];

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white transition-colors duration-200">
        {/* Toast Notification Layer */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />

        {/* Persistent Global Navbar */}
        <Navbar
          currentView={currentView}
          onNavigate={view => {
            navigateTo(view);
            window.location.hash = view === 'home' ? '' : view;
          }}
          selectedCity={selectedCity}
          onOpenCityModal={() => setCityModalOpen(true)}
          onOpenAdvisor={() => setAdvisorModalOpen(true)}
          onOpenLiveSearch={() => setLiveSearchModalOpen(true)}
          onOpenAdmin={() => setAdminModalOpen(true)}
          comparedCount={comparedVehicles.length}
          favoriteCount={favoriteIds.length}
        />

        {/* Main Viewport Router */}
        <main className="flex-1">
          {currentView === 'home' && (
            <HomeView
              vehicles={vehicles}
              manufacturers={manufacturers}
              upcomingVehicles={upcomingVehicles}
              comparedVehicles={comparedVehicles}
              favoriteIds={favoriteIds}
              onToggleCompare={handleToggleCompare}
              onToggleFavorite={handleToggleFavorite}
              onSelectVehicle={handleSelectVehicle}
              onSearchSubmit={handleSearchSubmit}
              onQuickFilter={handleQuickFilter}
              onOpenAdvisor={() => setAdvisorModalOpen(true)}
              onOpenLiveSearch={() => setLiveSearchModalOpen(true)}
              onComparePreset={handleComparePreset}
              onSelectBrand={handleSelectBrand}
              onNavigateToCars={() => {
                setListingFilters({});
                navigateTo('cars');
                window.location.hash = 'cars';
              }}
              onNavigateToUpcoming={() => {
                navigateTo('upcoming');
                window.location.hash = 'upcoming';
              }}
              onNavigateToSubsidies={() => {
                navigateTo('subsidies');
                window.location.hash = 'subsidies';
              }}
              onNavigateToRangeSim={() => {
                navigateTo('rangesim');
                window.location.hash = 'rangesim';
              }}
              onNavigateToSalaryCalc={() => {
                navigateTo('salarycalc');
                window.location.hash = 'salarycalc';
              }}
              selectedCity={selectedCity}
            />
          )}

          {currentView === 'cars' && (
            <CarListingView
              vehicles={vehicles}
              comparedVehicles={comparedVehicles}
              favoriteIds={favoriteIds}
              onToggleCompare={handleToggleCompare}
              onToggleFavorite={handleToggleFavorite}
              onSelectVehicle={handleSelectVehicle}
              initialFilters={listingFilters}
              selectedCity={selectedCity}
            />
          )}

          {currentView === 'detail' && activeDetailVehicle && (
            <CarDetailView
              vehicle={activeDetailVehicle}
              onBack={() => {
                navigateTo('cars');
                window.location.hash = 'cars';
              }}
              isCompared={comparedVehicleIds.includes(activeDetailVehicle.id)}
              isFavorite={favoriteIds.includes(activeDetailVehicle.id)}
              onToggleCompare={handleToggleCompare}
              onToggleFavorite={handleToggleFavorite}
              selectedCity={selectedCity}
              onOpenCityModal={() => setCityModalOpen(true)}
              onOpenPriceAlert={handleOpenPriceAlert}
            />
          )}

          {currentView === 'compare' && (
            <CompareView
              vehicles={comparedVehicles}
              allVehicles={vehicles}
              onRemoveVehicle={handleRemoveCompare}
              onAddVehicle={car => handleToggleCompare(car)}
              onClearAll={handleClearCompare}
              onSelectVehicle={handleSelectVehicle}
              selectedCity={selectedCity}
            />
          )}

          {currentView === 'upcoming' && (
            <UpcomingView
              upcomingVehicles={upcomingVehicles}
              onOpenPriceAlert={name => {
                addToast('success', `Launch notification confirmed for ${name}!`);
              }}
            />
          )}

          {currentView === 'charging' && (
            <ChargingNetworkView
              stations={stations}
              vehicles={vehicles}
            />
          )}

          {currentView === 'calculator' && (
            <RunningCostCalculatorView
              vehicles={vehicles}
            />
          )}

          {currentView === 'subsidies' && (
            <StateSubsidyExplorerView
              vehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
            />
          )}

          {currentView === 'rangesim' && (
            <RealWorldRangeSimulatorView
              vehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
            />
          )}

          {currentView === 'salarycalc' && (
            <SalaryAffordabilityCalculatorView
              vehicles={vehicles}
              selectedCity={selectedCity}
              onSelectVehicle={handleSelectVehicle}
            />
          )}
        </main>

        {/* Persistent Bottom Comparison Tray (Visible across all views except the Compare view itself) */}
        {currentView !== 'compare' && (
          <CompareFloatingBar
            selectedVehicles={comparedVehicles}
            onRemoveVehicle={handleRemoveCompare}
            onClearAll={handleClearCompare}
            onCompareNow={() => {
              navigateTo('compare');
              window.location.hash = 'compare';
            }}
          />
        )}

        {/* Persistent Global Footer */}
        <Footer
          onNavigate={view => {
            navigateTo(view as AppView);
            window.location.hash = view === 'home' ? '' : view;
          }}
          onOpenCityModal={() => setCityModalOpen(true)}
          onOpenAdvisor={() => setAdvisorModalOpen(true)}
          onOpenAdmin={() => setAdminModalOpen(true)}
        />

        {/* Global Modals */}
        <LocationSelectorModal
          isOpen={cityModalOpen}
          onClose={() => setCityModalOpen(false)}
          cities={cities}
          selectedCity={selectedCity}
          onSelectCity={handleSelectCity}
        />

        <AdvisorModal
          isOpen={advisorModalOpen}
          onClose={() => setAdvisorModalOpen(false)}
          allVehicles={vehicles}
          onSelectVehicle={handleSelectVehicle}
          onCompareVehicles={handleComparePreset}
        />

        <PriceAlertModal
          vehicle={priceAlertVehicle}
          isOpen={priceAlertModalOpen}
          onClose={() => setPriceAlertModalOpen(false)}
          onAlertCreated={msg => addToast('success', msg)}
        />

        <DataSyncModal
          isOpen={adminModalOpen}
          onClose={() => setAdminModalOpen(false)}
          vehicles={vehicles}
          onDataUpdated={handleDataUpdated}
        />

        <LiveSearchModal
          isOpen={liveSearchModalOpen}
          onClose={() => setLiveSearchModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
