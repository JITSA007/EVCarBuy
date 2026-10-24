import React, { useState, useMemo } from 'react';
import { Vehicle } from '../../types/ev';
import { vehicleDataProvider } from '../../services/dataProvider';
import {
  Layers,
  X,
  Plus,
  Zap,
  BatteryCharging,
  Gauge,
  Shield,
  Award,
  CheckCircle2,
  XCircle,
  Share2,
  Trash2,
  HelpCircle,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface CompareViewProps {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onAddVehicle: (vehicle: Vehicle) => void;
  onClearAll: () => void;
  onSelectVehicle: (slug: string) => void;
  selectedCity: string;
}

export const CompareView: React.FC<CompareViewProps> = ({
  vehicles,
  allVehicles,
  onRemoveVehicle,
  onAddVehicle,
  onClearAll,
  onSelectVehicle,
  selectedCity
}) => {
  const [highlightDifferencesOnly, setHighlightDifferencesOnly] = useState(false);
  const [addCarModalOpen, setAddCarModalOpen] = useState(false);

  // Available cars to add (not currently in comparison)
  const availableToAdd = useMemo(() => {
    const currentIds = new Set(vehicles.map(v => v.id));
    return allVehicles.filter(v => !currentIds.has(v.id));
  }, [allVehicles, vehicles]);

  // Determine winners in key categories
  const winners = useMemo(() => {
    if (vehicles.length < 2) return {};

    const maxRange = Math.max(...vehicles.map(v => v.claimedRangeKm));
    const fastestCharging = Math.max(...vehicles.map(v => v.dcChargingSpeedKw));
    const lowestPrice = Math.min(...vehicles.map(v => v.startingPriceLakh));
    const quickestAccel = Math.min(...vehicles.map(v => v.acceleration0To100));

    return {
      bestRangeId: vehicles.find(v => v.claimedRangeKm === maxRange)?.id,
      fastestChargingId: vehicles.find(v => v.dcChargingSpeedKw === fastestCharging)?.id,
      mostAffordableId: vehicles.find(v => v.startingPriceLakh === lowestPrice)?.id,
      quickestAccelId: vehicles.find(v => v.acceleration0To100 === quickestAccel)?.id
    };
  }, [vehicles]);

  // Share comparison
  const handleShareComparison = () => {
    const names = vehicles.map(v => `${v.brand} ${v.name}`).join(' vs ');
    const text = encodeURIComponent(
      `Compare ${names} on EVClubIndia!\nView full side-by-side EV specs: https://evclubindia.com/compare`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 py-16 text-center text-slate-100">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <Layers className="mx-auto h-12 w-12 text-slate-500" />
          <h2 className="mt-4 text-xl font-bold text-white">No EVs Selected for Comparison</h2>
          <p className="mt-2 text-xs text-slate-400">
            Select 2 to 4 electric vehicles from the cars list or popular presets to compare specs, real-world range, charging, and pricing side-by-side.
          </p>
          <button
            onClick={() => setAddCarModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="h-4 w-4" />
            <span>Select EVs to Compare</span>
          </button>
        </div>

        {/* Modal to pick vehicles */}
        {addCarModalOpen && (
          <AddCarModal
            availableVehicles={availableToAdd}
            onSelect={v => {
              onAddVehicle(v);
              setAddCarModalOpen(false);
            }}
            onClose={() => setAddCarModalOpen(false)}
          />
        )}
      </div>
    );
  }

  // Row helper for comparison
  const renderRow = (label: string, accessor: (v: Vehicle) => React.ReactNode, isDifferent: boolean = true) => {
    if (highlightDifferencesOnly && !isDifferent) return null;

    return (
      <tr className="border-b border-slate-800/60 transition-colors hover:bg-slate-900/40">
        <td className="w-48 sm:w-60 p-3.5 text-xs font-semibold text-slate-400 bg-slate-950/80 sticky left-0 z-10">
          {label}
        </td>
        {vehicles.map(v => (
          <td key={v.id} className="p-3.5 text-center text-xs font-medium text-slate-200 min-w-[200px]">
            {accessor(v)}
          </td>
        ))}
        {Array.from({ length: Math.max(0, 4 - vehicles.length) }).map((_, i) => (
          <td key={`empty-col-${i}`} className="p-3.5 text-center text-slate-400 min-w-[200px] border-l border-dashed border-slate-800/40">
            -
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Tools */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Layers className="h-3.5 w-3.5" />
              <span>Side-by-Side Matrix ({vehicles.length} of 4)</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Electric Car Comparison
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Comparing ex-showroom &amp; on-road prices in {selectedCity}, real-world highway range, charging curves, and safety.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setHighlightDifferencesOnly(!highlightDifferencesOnly)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                highlightDifferencesOnly
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                  : 'border-slate-800 bg-slate-900 text-slate-300'
              }`}
            >
              {highlightDifferencesOnly ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              <span>{highlightDifferencesOnly ? 'Showing Differences Only' : 'Highlight Differences'}</span>
            </button>

            <button
              onClick={handleShareComparison}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-900/50"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Matrix Container */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl backdrop-blur-md">
          <table className="w-full border-collapse text-left">
            {/* Sticky Header Row with Vehicle Cards */}
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90">
                <th className="w-48 sm:w-60 p-4 text-xs font-bold uppercase tracking-wider text-slate-400 sticky left-0 z-20 bg-slate-950">
                  Specification
                </th>
                {vehicles.map(v => {
                  const onRoad = vehicleDataProvider.calculateOnRoadPrice(v, undefined, selectedCity);
                  return (
                    <th key={v.id} className="p-4 text-center min-w-[220px] align-top">
                      <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 p-3 shadow-sm">
                        <button
                          onClick={() => onRemoveVehicle(v.id)}
                          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>

                        <img
                          src={v.heroImage}
                          alt={v.name}
                          className="h-24 w-full rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />

                        <h3 className="mt-2 text-sm font-extrabold text-white line-clamp-1">
                          {v.brand} {v.name}
                        </h3>
                        <p className="text-[11px] text-slate-400">{v.segment}</p>

                        <div className="mt-2 text-xs font-extrabold text-emerald-400">
                          ₹{v.startingPriceLakh} – ₹{v.endingPriceLakh} L
                        </div>
                        <p className="text-[10px] text-slate-400">On-Road: ~₹{onRoad.onRoadTotalLakh}L ({selectedCity})</p>

                        <button
                          onClick={() => onSelectVehicle(v.slug)}
                          className="mt-3 w-full rounded-lg bg-slate-800 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </th>
                  );
                })}

                {/* Empty Add Car Slots up to 4 */}
                {Array.from({ length: Math.max(0, 4 - vehicles.length) }).map((_, i) => (
                  <th key={`add-slot-${i}`} className="p-4 text-center min-w-[220px] align-middle">
                    <button
                      onClick={() => setAddCarModalOpen(true)}
                      className="flex h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-800 bg-slate-900/20 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                    >
                      <Plus className="h-6 w-6 mb-1" />
                      <span className="text-xs font-bold">+ Add EV Car</span>
                      <span className="text-[10px] text-slate-400">Slot {vehicles.length + i + 1} of 4</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Category: Pricing */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  1. Pricing &amp; On-Road Taxes ({selectedCity})
                </td>
              </tr>
              {renderRow('Ex-Showroom Price Range', v => `₹${v.startingPriceLakh} – ₹${v.endingPriceLakh} Lakh`)}
              {renderRow('Estimated On-Road Total', v => {
                const p = vehicleDataProvider.calculateOnRoadPrice(v, undefined, selectedCity);
                const isAffordable = v.id === winners.mostAffordableId;
                return (
                  <span className={`font-bold ${isAffordable ? 'text-emerald-400' : 'text-white'}`}>
                    ₹{p.onRoadTotalLakh} Lakh {isAffordable && '🏆 Lowest'}
                  </span>
                );
              })}
              {renderRow('State EV Subsidy Benefit', v => {
                const p = vehicleDataProvider.calculateOnRoadPrice(v, undefined, selectedCity);
                return p.stateSubsidyLakh > 0 ? `₹${p.stateSubsidyLakh} Lakh` : 'N/A';
              })}
              {renderRow('Available Variants Count', v => `${v.variants.length} Trim Levels`)}

              {/* Category: Range & Efficiency */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  2. Range &amp; Real-World Efficiency
                </td>
              </tr>
              {renderRow('ARAI Certified Range (MIDC)', v => {
                const isBest = v.id === winners.bestRangeId;
                return (
                  <span className={`font-bold ${isBest ? 'text-emerald-400' : 'text-white'}`}>
                    {v.claimedRangeKm} km {isBest && '🏆 Best Range'}
                  </span>
                );
              })}
              {renderRow('Real-World City Commute', v => `${v.cityRangeKm} km (Est.)`)}
              {renderRow('Real-World Highway Range', v => `${v.highwayRangeKm} km (90-100 km/h)`)}
              {renderRow('Efficiency (Wh/km)', v => `${v.efficiencyWhPerKm || Math.round((v.batteryCapacityKwh * 1000) / v.realWorldRangeKm)} Wh/km`)}

              {/* Category: Battery & Charging */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  3. Battery &amp; Fast Charging
                </td>
              </tr>
              {renderRow('Battery Capacity (Gross)', v => `${v.batteryCapacityKwh} kWh`)}
              {renderRow('Battery Chemistry', v => v.batteryChemistry)}
              {renderRow('Max DC Fast Charging Rate', v => {
                const isFastest = v.id === winners.fastestChargingId;
                return (
                  <span className={`font-bold ${isFastest ? 'text-cyan-400' : 'text-white'}`}>
                    {v.dcChargingSpeedKw} kW {isFastest && '⚡ Fastest'}
                  </span>
                );
              })}
              {renderRow('10% to 80% DC Fast Charge', v => `${v.chargingTimeDcMin10To80} Minutes`)}
              {renderRow('AC Wallbox Home Charging', v => `${v.chargingTimeAcHours} Hours (${v.acChargingSpeedKw} kW)`)}

              {/* Category: Performance & Powertrain */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  4. Performance &amp; Powertrain
                </td>
              </tr>
              {renderRow('Motor Power (Max)', v => `${v.motorPowerBhp} bhp (${(v.motorPowerBhp * 0.7457).toFixed(0)} kW)`)}
              {renderRow('Peak Torque', v => `${v.torqueNm} Nm instant`)}
              {renderRow('0 to 100 km/h Acceleration', v => {
                const isQuick = v.id === winners.quickestAccelId;
                return (
                  <span className={`font-bold ${isQuick ? 'text-purple-400' : 'text-white'}`}>
                    {v.acceleration0To100} seconds {isQuick && '🚀 Quickest'}
                  </span>
                );
              })}
              {renderRow('Top Speed', v => `${v.topSpeedKmh} km/h`)}
              {renderRow('Drive Type / Configuration', v => v.driveType)}

              {/* Category: Safety */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  5. Safety &amp; Driver Assistance
                </td>
              </tr>
              {renderRow('Crash Test Rating', v => (
                <span className="font-bold text-amber-400">
                  {v.ncapRating ? `${v.ncapRating}★ ${v.ncapAgency}` : 'Unrated'}
                </span>
              ))}
              {renderRow('Standard Airbags Count', v => `${v.airbags} Airbags`)}
              {renderRow('ADAS Level', v => (v.adasLevel > 0 ? `Level ${v.adasLevel} ADAS` : 'No ADAS'))}
              {renderRow('360° Surround Camera', v => (v.camera360 ? 'Available' : 'No'))}

              {/* Category: Dimensions */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  6. Dimensions &amp; Practicality
                </td>
              </tr>
              {renderRow('Seating Capacity', v => `${v.seatingCapacity} Seater`)}
              {renderRow('Boot Space', v => `${v.dimensions.bootSpaceLitre} Litres`)}
              {renderRow('Ground Clearance (Unladen)', v => `${v.dimensions.groundClearanceMm} mm`)}
              {renderRow('Length × Width × Height', v => `${v.dimensions.lengthMm} × ${v.dimensions.widthMm} × ${v.dimensions.heightMm} mm`)}

              {/* Category: Features */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  7. Comfort &amp; Technology Highlights
                </td>
              </tr>
              {renderRow('Sunroof', v => v.sunroof)}
              {renderRow('Ventilated Seats', v => (v.ventilatedSeats ? 'Yes (Front)' : 'No'))}
              {renderRow('Vehicle-to-Load (V2L)', v => (v.v2l ? 'Yes (3.3 kW)' : 'No'))}
              {renderRow('Wireless Charger', v => (v.wirelessCharging ? 'Yes' : 'No'))}
              {renderRow('Connected Car Suite', v => (v.connectedCar ? 'Yes' : 'No'))}

              {/* Category: Warranty */}
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <td colSpan={5} className="p-3 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  8. Warranty Coverage
                </td>
              </tr>
              {renderRow('Battery Warranty', v => `${v.batteryWarrantyYears} Years / ${v.batteryWarrantyKm.toLocaleString('en-IN')} km`)}
              {renderRow('Vehicle Warranty', v => `${v.vehicleWarrantyYears} Years / ${v.vehicleWarrantyKm.toLocaleString('en-IN')} km`)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Car Modal */}
      {addCarModalOpen && (
        <AddCarModal
          availableVehicles={availableToAdd}
          onSelect={v => {
            onAddVehicle(v);
            setAddCarModalOpen(false);
          }}
          onClose={() => setAddCarModalOpen(false)}
        />
      )}
    </div>
  );
};

interface AddCarModalProps {
  availableVehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  onClose: () => void;
}

const AddCarModal: React.FC<AddCarModalProps> = ({ availableVehicles, onSelect, onClose }) => {
  const [search, setSearch] = useState('');

  const filtered = availableVehicles.filter(v =>
    `${v.brand} ${v.name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white">Add Electric Car to Comparison</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Search EV by brand or model..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1">
          {filtered.map(car => (
            <button
              key={car.id}
              onClick={() => onSelect(car)}
              className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left hover:border-emerald-500 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={car.heroImage}
                  alt={car.name}
                  className="h-10 w-16 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-sm font-bold text-white">{car.brand} {car.name}</p>
                  <p className="text-xs text-slate-400">{car.bodyType} • {car.claimedRangeKm} km range</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400">₹{car.startingPriceLakh}L</span>
                <span className="block text-[10px] text-slate-400">+ Add</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="py-6 text-center text-xs text-slate-400">No matching EV cars available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
