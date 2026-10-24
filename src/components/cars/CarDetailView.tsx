import React, { useState, useMemo } from 'react';
import { Vehicle, LiveSyncResult } from '../../types/ev';
import { vehicleDataProvider } from '../../services/dataProvider';
import { fetchLiveVehicleSync, getCachedVehicleSync } from '../../services/liveEvService';
import { TrustBadge } from '../common/TrustBadge';
import { LocationFeatureAdvisor } from './LocationFeatureAdvisor';
import {
  Zap,
  BatteryCharging,
  Gauge,
  Shield,
  Heart,
  Layers,
  MapPin,
  Share2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  DollarSign,
  Award,
  Car,
  RefreshCw,
  Globe,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface CarDetailViewProps {
  vehicle: Vehicle;
  onBack: () => void;
  isCompared: boolean;
  isFavorite: boolean;
  onToggleCompare: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  selectedCity: string;
  onOpenCityModal: () => void;
  onOpenPriceAlert: (vehicle: Vehicle) => void;
}

export const CarDetailView: React.FC<CarDetailViewProps> = ({
  vehicle,
  onBack,
  isCompared,
  isFavorite,
  onToggleCompare,
  onToggleFavorite,
  selectedCity,
  onOpenCityModal
}) => {
  // Selected variant for pricing and specs
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    vehicle.variants[0]?.id || 'v1'
  );

  // Active gallery index
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const allImages = [vehicle.heroImage, ...(vehicle.galleryImages || [])];

  // Live Grounding sync state
  const [liveSync, setLiveSync] = useState<LiveSyncResult | null>(() =>
    getCachedVehicleSync(vehicle.brand, vehicle.name)
  );
  const [syncing, setSyncing] = useState(false);

  const handleLiveSync = async () => {
    setSyncing(true);
    try {
      const res = await fetchLiveVehicleSync(
        vehicle.brand,
        vehicle.name,
        vehicle.startingPriceLakh,
        vehicle.claimedRangeKm
      );
      setLiveSync(res);
    } catch {
      // Handled
    } finally {
      setSyncing(false);
    }
  };

  // Active variant object
  const activeVariant = useMemo(() => {
    return (
      vehicle.variants.find((v) => v.id === selectedVariantId) ||
      vehicle.variants[0]
    );
  }, [vehicle.variants, selectedVariantId]);

  // On-road price breakdown in selected city
  const priceBreakdown = useMemo(() => {
    return vehicleDataProvider.calculateOnRoadPrice(
      vehicle,
      selectedVariantId,
      selectedCity
    );
  }, [vehicle, selectedVariantId, selectedCity]);

  // Loan EMI Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(8.5);

  const emiCalculation = useMemo(() => {
    const onRoadTotalRs = priceBreakdown.onRoadTotalLakh * 100000;
    const downPaymentRs = (onRoadTotalRs * downPaymentPercent) / 100;
    const loanAmountRs = onRoadTotalRs - downPaymentRs;

    const monthlyInterestRate = interestRatePercent / (12 * 100);
    const totalMonths = loanTenureYears * 12;

    const emi =
      (loanAmountRs *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    const totalPayable = emi * totalMonths + downPaymentRs;
    const totalInterest = totalPayable - onRoadTotalRs;

    return {
      monthlyEmi: Math.round(emi),
      loanAmount: Math.round(loanAmountRs),
      downPayment: Math.round(downPaymentRs),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
    };
  }, [priceBreakdown.onRoadTotalLakh, downPaymentPercent, loanTenureYears, interestRatePercent]);

  // Running Cost Savings Calculator state
  const [dailyKm, setDailyKm] = useState<number>(45);
  const [electricityRate, setElectricityRate] = useState<number>(7.5);
  const [petrolRate, setPetrolRate] = useState<number>(98.0);

  const ownershipSavings = useMemo(() => {
    const annualKm = dailyKm * 365;

    // EV: efficiency ~7.5 km/kWh
    const evKwhPerYear = annualKm / 7.5;
    const evAnnualCost = evKwhPerYear * electricityRate;

    // Petrol ICE equivalent: ~14 km per litre
    const petrolLitresPerYear = annualKm / 14.0;
    const petrolAnnualCost = petrolLitresPerYear * petrolRate;

    const annualSavings = petrolAnnualCost - evAnnualCost;
    const fiveYearSavings = annualSavings * 5;

    return {
      annualKm: Math.round(annualKm),
      evAnnualCost: Math.round(evAnnualCost),
      petrolAnnualCost: Math.round(petrolAnnualCost),
      annualSavings: Math.round(annualSavings),
      fiveYearSavings: Math.round(fiveYearSavings),
    };
  }, [dailyKm, electricityRate, petrolRate]);

  // WhatsApp share
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out ${vehicle.brand} ${vehicle.name} on EVClubIndia!\n` +
      `• Price: ₹${vehicle.startingPriceLakh} – ₹${vehicle.endingPriceLakh} Lakh\n` +
      `• ARAI Range: ${vehicle.claimedRangeKm} km (Real-World: ${vehicle.realWorldRangeKm} km)\n` +
      `• Battery: ${vehicle.batteryCapacityKwh} kWh (${vehicle.chargingTimeDcMin10To80} min 10-80%)\n` +
      `• Safety: ${vehicle.ncapRating}★ Bharat NCAP with ${vehicle.airbags} Airbags\n` +
      `View specs: https://evclubindia.com/electric-cars/${vehicle.slug}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <button onClick={onBack} className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold cursor-pointer">
              ← Back to EV List
            </button>
            <span>/</span>
            <span>{vehicle.brand}</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">{vehicle.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                isFavorite
                  ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-400'
                  : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorite ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button
              onClick={() => onToggleCompare(vehicle)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                isCompared
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{isCompared ? 'In Compare (Selected)' : 'Add to Compare'}</span>
            </button>
          </div>
        </div>

        {/* Hero Section: Gallery + Summary Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg dark:border-slate-800 dark:shadow-2xl">
              <img
                src={allImages[activeImageIndex] || vehicle.heroImage}
                alt={`${vehicle.brand} ${vehicle.name}`}
                className="h-full w-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-lg bg-slate-950/85 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-slate-700">
                  {vehicle.brand} Official
                </span>
                <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md border border-emerald-500/30">
                  {vehicle.status === 'available' ? 'Available in India' : 'Upcoming'}
                </span>
              </div>
            </div>

            {/* Thumbnails list */}
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-105'
                      : 'border-slate-200 opacity-60 hover:opacity-100 dark:border-slate-800'
                  }`}
                >
                  <img src={img} alt="thumb" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Provenance & Verification Badge */}
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/40">
              <TrustBadge
                source={vehicle.dataSource}
                verifiedDate={vehicle.lastVerifiedDate}
                confidence={vehicle.dataConfidence}
                isDemoData={vehicle.isDemoData}
              />
            </div>
          </div>

          {/* Right: Quick Overview & On-Road Price Box (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-900/70">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {vehicle.segment} • {vehicle.bodyType}
                  </span>
                  <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {vehicle.brand} {vehicle.name}
                  </h1>
                </div>
                {vehicle.ncapRating && (
                  <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                      <Shield className="h-3.5 w-3.5 fill-amber-400" />
                      {vehicle.ncapRating}★ {vehicle.ncapAgency}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{vehicle.airbags} Airbags</span>
                  </div>
                )}
              </div>

              {/* Real-Time Google Search Grounding Module */}
              <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50/70 p-4 dark:border-amber-500/30 dark:bg-amber-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      Real-Time Web Verification
                    </span>
                  </div>
                  <button
                    onClick={handleLiveSync}
                    disabled={syncing}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {syncing ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Searching Web...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-3 w-3" />
                        <span>{liveSync ? 'Re-Sync Live' : 'Sync Live Data'}</span>
                      </>
                    )}
                  </button>
                </div>

                {liveSync ? (
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 dark:border-amber-500/20 pb-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Verified Ex-Showroom:{' '}
                        <strong className="text-slate-900 dark:text-white font-bold">{liveSync.verifiedPriceRange}</strong>
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        Real Range:{' '}
                        <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{liveSync.realWorldRangeEstimate}</strong>
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{liveSync.summary}</p>
                    
                    {liveSync.keyHighlights && liveSync.keyHighlights.length > 0 && (
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300 pl-1">
                        {liveSync.keyHighlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5">•</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {liveSync.sources && liveSync.sources.length > 0 && (
                      <div className="pt-1 border-t border-amber-200 dark:border-amber-500/20">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Grounded Sources:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {liveSync.sources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.uri}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[11px] text-slate-700 hover:text-orange-600 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-amber-400 dark:border-slate-800 transition-colors"
                            >
                              <ExternalLink className="h-2.5 w-2.5" />
                              <span className="truncate max-w-[140px]">{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    Query Google Search for latest 2025/2026 ex-showroom revisions, battery upgrades, and waiting periods across Indian cities.
                  </p>
                )}
              </div>

              {/* Variant Selector Tabs */}
              <div className="mt-5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Select Variant ({vehicle.variants.length} Available)
                </label>
                <div className="mt-2 space-y-2">
                  {vehicle.variants.map((v) => {
                    const isSelected = v.id === selectedVariantId;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-slate-900 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{v.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {v.batteryCapacityKwh} kWh • {v.claimedRangeKm} km claimed ({v.realWorldRangeKm} km real)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                            ₹{v.exShowroomPriceLakh} L
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Ex-Showroom</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* On-Road Price Breakdown for City */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Estimated On-Road Price in</span>
                    <button
                      onClick={onOpenCityModal}
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {selectedCity}
                    </button>
                  </div>
                  <button
                    onClick={onOpenCityModal}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  >
                    Change City
                  </button>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Ex-Showroom Price ({activeVariant.name}):</span>
                    <span className="font-semibold text-slate-900 dark:text-white">₹{priceBreakdown.exShowroomLakh} L</span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>RTO &amp; Road Tax Registration:</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {priceBreakdown.rtoLakh === 0 ? '₹0.00 (100% EV Waiver)' : `₹${priceBreakdown.rtoLakh} L`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Comprehensive Insurance (1+3 Yrs):</span>
                    <span className="font-semibold text-slate-900 dark:text-white">₹{priceBreakdown.insuranceLakh} L</span>
                  </div>

                  {priceBreakdown.stateSubsidyLakh > 0 && (
                    <div className="flex justify-between text-emerald-800 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 p-1.5 rounded font-semibold">
                      <span>Direct State Subsidy (DBT):</span>
                      <span>- ₹{priceBreakdown.stateSubsidyLakh} L</span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Net Estimated On-Road Price:</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        ₹{priceBreakdown.onRoadTotalLakh} Lakh
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Key Specifications Strip (6 Cards) */}
        <div className="mt-12">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Core Technical Architecture</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Verified manufacturer technical parameters and homologation metrics</p>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                label: 'ARAI Claimed Range',
                value: `${vehicle.claimedRangeKm} km`,
                sub: `Real: ~${vehicle.realWorldRangeKm} km`,
                icon: Zap,
                color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
              },
              {
                label: 'Battery Pack',
                value: `${vehicle.batteryCapacityKwh} kWh`,
                sub: vehicle.batteryChemistry.split(' ')[0],
                icon: BatteryCharging,
                color: 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10'
              },
              {
                label: '10-80% DC Charging',
                value: `${vehicle.chargingTimeDcMin10To80} min`,
                sub: `Max ${vehicle.dcChargingSpeedKw} kW`,
                icon: Gauge,
                color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
              },
              {
                label: 'Motor Power & Torque',
                value: `${vehicle.motorPowerBhp} bhp`,
                sub: `${vehicle.torqueNm} Nm peak`,
                icon: Award,
                color: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
              },
              {
                label: '0 to 100 km/h',
                value: `${vehicle.acceleration0To100}s`,
                sub: `${vehicle.topSpeedKmh} km/h top`,
                icon: Car,
                color: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
              },
              {
                label: 'Drive Configuration',
                value: vehicle.driveType,
                sub: `${vehicle.seatingCapacity} Seater • ${vehicle.dimensions.bootSpaceLitre}L Boot`,
                icon: HelpCircle,
                color: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
              }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
                  <div className={`inline-flex p-2 rounded-xl ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{stat.sub}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Range Intelligence (ARAI vs Real-World) */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Zap className="h-3.5 w-3.5" />
                <span>Range Transparency</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">ARAI Certified vs Real-World Range</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Standard test cycles versus simulated Indian highway &amp; city traffic with AC on
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              Tested at 24°C cabin AC &amp; standard highway cruise
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">ARAI Claimed (MIDC)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                  Official
                </span>
              </div>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{vehicle.claimedRangeKm} km</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Ideal lab conditions with regeneration &amp; gradual acceleration.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400">Real-World City Commute</span>
                <span className="text-[10px] bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 px-2 py-0.5 rounded font-bold">
                  High Regen
                </span>
              </div>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{vehicle.cityRangeKm} km</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Stop-and-go traffic benefits strongly from multi-stage regenerative braking.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Real-World Highway Cruising</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
                  90-100 km/h
                </span>
              </div>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{vehicle.highwayRangeKm} km</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Sustained highway aero drag reduces electric efficiency compared to low-speed city driving.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Battery & Charging Timeline */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <BatteryCharging className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Battery &amp; DC Fast Charging Curve</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Chemistry: {vehicle.batteryChemistry} • Liquid-cooled thermal management
          </p>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Charging Timeline (10% to 80% DC Fast Charge: {vehicle.chargingTimeDcMin10To80} Minutes)
            </p>
            <div className="relative h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
                style={{ width: '80%' }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <span>10% (Plug In)</span>
              <span>30% (10 min)</span>
              <span>50% (20 min)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">80% ({vehicle.chargingTimeDcMin10To80} min)</span>
              <span>100% (Tapered)</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Home AC Wallbox Charging</h4>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{vehicle.chargingTimeAcHours} Hours</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Using {vehicle.acChargingSpeedKw} kW AC home charger (0-100% overnight).</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Public DC Fast Charging</h4>
              <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">{vehicle.chargingTimeDcMin10To80} Minutes</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">10% to 80% at {vehicle.dcChargingSpeedKw} kW DC CCS2 public chargers.</p>
            </div>
          </div>
        </div>

        {/* Section 5: Fuel Cost Savings Calculator vs Petrol/Diesel */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">EV Running Cost vs Petrol ICE Calculator</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Calculate your direct monthly and 5-year fuel savings by switching from petrol to {vehicle.name}
          </p>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Controls (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Daily Commute Distance:</span>
                  <span className="text-emerald-700 dark:text-emerald-400">{dailyKm} km / day</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  step="5"
                  value={dailyKm}
                  onChange={e => setDailyKm(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Approx {ownershipSavings.annualKm.toLocaleString('en-IN')} km per year</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Electricity Rate (₹/kWh)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={electricityRate}
                    onChange={e => setElectricityRate(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Petrol Price (₹/Litre)</label>
                  <input
                    type="number"
                    step="1"
                    value={petrolRate}
                    onChange={e => setPetrolRate(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Savings Display (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Annual EV Electricity Cost</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">₹{ownershipSavings.evAnnualCost.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">~₹{(ownershipSavings.evAnnualCost / 12).toFixed(0)} / month</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Annual Petrol Car Fuel Cost</p>
                <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">₹{ownershipSavings.petrolAnnualCost.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">~₹{(ownershipSavings.petrolAnnualCost / 12).toFixed(0)} / month</p>
              </div>

              <div className="col-span-2 rounded-xl border border-emerald-300 bg-emerald-50/80 p-4 text-center dark:border-emerald-500/30 dark:bg-emerald-950/30">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Estimated 5-Year Net Fuel Savings</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  ₹{ownershipSavings.fiveYearSavings.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  You save approximately ₹{ownershipSavings.annualSavings.toLocaleString('en-IN')} every single year in running costs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Loan EMI Calculator */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Estimated Monthly EMI Loan Calculator</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Based on {selectedCity} on-road price of ₹{priceBreakdown.onRoadTotalLakh} Lakh
          </p>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Down Payment:</span>
                  <span className="text-emerald-700 dark:text-emerald-400">{downPaymentPercent}% (₹{((priceBreakdown.onRoadTotalLakh * 100000 * downPaymentPercent) / 100).toLocaleString('en-IN')})</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={e => setDownPaymentPercent(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tenure (Years)</label>
                  <select
                    value={loanTenureYears}
                    onChange={e => setLoanTenureYears(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {[3, 4, 5, 7].map(y => (
                      <option key={y} value={y}>{y} Years</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRatePercent}
                    onChange={e => setInterestRatePercent(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between dark:border-slate-800 dark:bg-slate-950">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estimated Monthly EMI</span>
                <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
                  ₹{emiCalculation.monthlyEmi.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ month</span>
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200 dark:border-slate-800 pt-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Loan Amount</span>
                  <p className="font-bold text-slate-900 dark:text-white">₹{(emiCalculation.loanAmount / 100000).toFixed(2)} L</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Total Interest</span>
                  <p className="font-bold text-slate-900 dark:text-white">₹{(emiCalculation.totalInterest / 100000).toFixed(2)} L</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Total Payable</span>
                  <p className="font-bold text-slate-900 dark:text-white">₹{(emiCalculation.totalPayable / 100000).toFixed(2)} L</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Location-Aware Feature Intelligence & Buyer Advisor */}
        <div className="mt-12">
          <LocationFeatureAdvisor
            vehicle={vehicle}
            selectedCity={selectedCity}
            onOpenCityModal={onOpenCityModal}
            onSelectVariant={setSelectedVariantId}
          />
        </div>

        {/* Section 8: Features Checklist & Safety */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Comfort, Tech &amp; Connectivity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Variant-specific standard features</p>

            <div className="mt-4 space-y-2 text-xs">
              {[
                { label: 'Ventilated Front Seats', status: vehicle.ventilatedSeats },
                { label: 'Sunroof', status: vehicle.sunroof !== 'None', note: vehicle.sunroof },
                { label: '360-Degree Surround Camera', status: vehicle.camera360 },
                { label: 'Wireless Phone Charger', status: vehicle.wirelessCharging },
                { label: 'Connected Car Technology', status: vehicle.connectedCar },
                { label: 'Vehicle-to-Load (V2L) Bidirectional Power', status: vehicle.v2l },
                { label: 'Level 2 ADAS Crash Prevention', status: vehicle.adasLevel >= 2 },
                { label: 'Premium Sound System', status: Boolean(vehicle.premiumAudio), note: vehicle.premiumAudio }
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 py-2">
                  <span className="text-slate-700 dark:text-slate-300">{feat.label}</span>
                  <div className="flex items-center gap-1.5 font-bold">
                    {feat.status ? (
                      <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Available {feat.note ? `(${feat.note})` : ''}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                        <XCircle className="h-4 w-4" />
                        <span>Not Available</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & ADAS Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Safety &amp; Driver Assistance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Crash test certification and active safety systems</p>

            <div className="mt-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                <Shield className="h-6 w-6 fill-amber-400" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-900 dark:text-white">
                  {vehicle.ncapRating ? `${vehicle.ncapRating}-Star Safety Rating` : 'Unrated / In Testing'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {vehicle.ncapAgency} • {vehicle.airbags} Standard Airbags • ISOFIX Child Mounts
                </p>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Safety &amp; ADAS Suite ({vehicle.adasFeatures.length} Features)
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {vehicle.adasFeatures.map((item, idx) => (
                  <span
                    key={`${item}-${idx}`}
                    className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-medium"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Warranty Box */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Official Warranty Coverage</span>
              <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Battery Warranty</span>
                  <p className="font-extrabold text-slate-900 dark:text-white">{vehicle.batteryWarrantyYears} Years / {vehicle.batteryWarrantyKm.toLocaleString('en-IN')} km</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Vehicle Warranty</span>
                  <p className="font-extrabold text-slate-900 dark:text-white">{vehicle.vehicleWarrantyYears} Years / {vehicle.vehicleWarrantyKm.toLocaleString('en-IN')} km</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Expert Verdict, Pros & Cons */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">EVClubIndia Expert Verdict</h3>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            &ldquo;{vehicle.expertVerdict}&rdquo;
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-950/10">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">What We Like (Pros)</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {vehicle.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-500/20 dark:bg-rose-950/10">
              <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400 uppercase tracking-wider">Things to Consider (Cons)</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {vehicle.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
