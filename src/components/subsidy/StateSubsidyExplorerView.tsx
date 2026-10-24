import React, { useState, useMemo } from 'react';
import { STATE_EV_POLICIES, StateEvPolicy } from '../../data/stateEvPolicies';
import { Vehicle } from '../../types/ev';
import { 
  Building2, ShieldCheck, Zap, Sparkles, CheckCircle2, 
  HelpCircle, ChevronRight, FileText, IndianRupee, Car
} from 'lucide-react';

interface StateSubsidyExplorerViewProps {
  vehicles: Vehicle[];
  onSelectVehicle?: (slug: string) => void;
}

export const StateSubsidyExplorerView: React.FC<StateSubsidyExplorerViewProps> = ({
  vehicles,
  onSelectVehicle
}) => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>('DL');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    vehicles.find(v => v.id === 'mg-tomahawk-ev')?.id || vehicles[0]?.id || ''
  );

  const activePolicy: StateEvPolicy = useMemo(() => {
    return STATE_EV_POLICIES.find(p => p.stateCode === selectedStateCode) || STATE_EV_POLICIES[0];
  }, [selectedStateCode]);

  const activeVehicle: Vehicle = useMemo(() => {
    return vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];
  }, [vehicles, selectedVehicleId]);

  // Calculations for on-road impact
  const exShowroom = activeVehicle ? activeVehicle.startingPriceLakh : 15;
  const exShowroomRupees = exShowroom * 100000;

  // Regular ICE Road Tax in this state (typically 10-18%)
  const standardIceRoadTaxRate = activePolicy.stateCode === 'KA' ? 0.18 : 
                                 activePolicy.stateCode === 'MH' ? 0.13 : 
                                 activePolicy.stateCode === 'DL' ? 0.10 : 0.12;
  const standardIceRoadTaxRupees = exShowroomRupees * standardIceRoadTaxRate;

  // EV Road Tax in this state
  const evRoadTaxPercent = 100 - activePolicy.roadTaxExemptionPercent;
  const evRoadTaxRupees = exShowroomRupees * (evRoadTaxPercent / 100) * standardIceRoadTaxRate;

  // Road tax saved
  const roadTaxSavedRupees = standardIceRoadTaxRupees - evRoadTaxRupees;

  // Registration fee
  const regFee = activePolicy.registrationFeeWaived ? 0 : 2500;

  // Insurance (~3.3%)
  const insuranceRupees = exShowroomRupees * 0.033;

  // State direct subsidy
  const stateSubsidyRupees = activePolicy.cashSubsidyAvailable ? activePolicy.maxSubsidyAmountLakh * 100000 : 0;

  // Estimated Net On-Road Price
  const netOnRoadRupees = exShowroomRupees + evRoadTaxRupees + regFee + insuranceRupees - stateSubsidyRupees;
  const netOnRoadLakh = (netOnRoadRupees / 100000).toFixed(2);

  // Home full charge cost
  const fullChargeCost = (activeVehicle?.batteryCapacityKwh || 50) * activePolicy.evElectricityTariffPerUnit;
  const costPerKm = (fullChargeCost / (activeVehicle?.realWorldRangeKm || 300)).toFixed(2);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                <Building2 className="h-3.5 w-3.5" /> Bharat State EV Subsidies &amp; RTO Explorer
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> Gazette Verified 2026
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              State-Wise EV Subsidies &amp; Road Tax Waivers
            </h1>
            <p className="mt-1 text-sm text-slate-300 sm:text-base">
              Explore official road tax exemptions, direct bank transfer subsidies, and subsidized EV electricity tariffs across Bharat.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-4 text-center">
            <span className="text-xs uppercase tracking-wider text-slate-400">Road Tax Saved on EV</span>
            <div className="text-2xl font-black text-emerald-400 sm:text-3xl">
              ₹{(roadTaxSavedRupees / 100000).toFixed(2)} Lakh
            </div>
            <span className="text-xs text-slate-400">vs equivalent petrol/diesel car</span>
          </div>
        </div>
      </div>

      {/* State Selection Chips */}
      <div className="mb-8">
        <label className="mb-3 block text-sm font-semibold text-slate-200">
          Select State or Union Territory:
        </label>
        <div className="flex flex-wrap gap-2">
          {STATE_EV_POLICIES.map(policy => {
            const isSelected = policy.stateCode === selectedStateCode;
            return (
              <button
                key={policy.stateCode}
                id={`btn-state-${policy.stateCode.toLowerCase()}`}
                onClick={() => setSelectedStateCode(policy.stateCode)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : 'border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{policy.stateName}</span>
                {policy.roadTaxExemptionPercent === 100 && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    0% Tax
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Policy Details & Interactive On-Road Price Simulator */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Official Policy Breakdown (7 Cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Policy Overview Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {activePolicy.stateName} EV Policy Overview
                </h2>
                <p className="text-xs text-slate-400">
                  Notification: {activePolicy.officialNotification}
                </p>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                {activePolicy.policyValidity}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
                <span className="text-xs text-slate-400">Road Tax Exemption</span>
                <div className="mt-1 text-xl font-black text-emerald-400">
                  {activePolicy.roadTaxExemptionPercent}%
                </div>
                <span className="text-[11px] text-slate-500">
                  {activePolicy.roadTaxExemptionPercent === 100 ? 'Zero Road Tax' : 'Concessional Slab'}
                </span>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
                <span className="text-xs text-slate-400">Registration Fee</span>
                <div className="mt-1 text-xl font-black text-emerald-400">
                  {activePolicy.registrationFeeWaived ? 'Waived (₹0)' : 'Nominal'}
                </div>
                <span className="text-[11px] text-slate-500">RTO Smart Card Only</span>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 sm:col-span-1 col-span-2">
                <span className="text-xs text-slate-400">Home EV Tariff</span>
                <div className="mt-1 text-xl font-black text-orange-400">
                  ₹{activePolicy.evElectricityTariffPerUnit.toFixed(2)}/kWh
                </div>
                <span className="text-[11px] text-slate-500">Dedicated EV Meter</span>
              </div>
            </div>

            {/* Policy Summary Terms */}
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-300">
              <div className="mb-1 flex items-center gap-1.5 font-semibold text-white">
                <FileText className="h-4 w-4 text-orange-400" /> Official Terms &amp; Scope:
              </div>
              <p className="leading-relaxed">{activePolicy.subsidyTerms}</p>
            </div>

            {/* Key Policy Highlights */}
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Key Benefits for Electric Car Buyers:
              </h3>
              <ul className="space-y-2.5">
                {activePolicy.keyHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Home Charging Cost Calculator for Selected State */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
            <h3 className="mb-2 text-lg font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              Home Charging Cost in {activePolicy.stateName}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              At the state EV tariff of ₹{activePolicy.evElectricityTariffPerUnit}/kWh, charging at home is dramatically cheaper than petrol or diesel.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <span className="text-xs text-slate-400">Cost for Full 100% Charge</span>
                <div className="mt-1 text-2xl font-black text-white">
                  ₹{Math.round(fullChargeCost)}
                </div>
                <span className="text-[11px] text-slate-500">
                  For {activeVehicle.name} ({activeVehicle.batteryCapacityKwh} kWh)
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <span className="text-xs text-slate-400">Effective Running Cost</span>
                <div className="mt-1 text-2xl font-black text-emerald-400">
                  ₹{costPerKm} / km
                </div>
                <span className="text-[11px] text-slate-500">
                  vs ₹7.50/km for Petrol
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <span className="text-xs text-slate-400">Monthly 1,200 km Fuel Bill</span>
                <div className="mt-1 text-2xl font-black text-orange-400">
                  ₹{Math.round(parseFloat(costPerKm) * 1200)}
                </div>
                <span className="text-[11px] text-slate-500">
                  Saves ~₹7,800/month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live On-Road Price Simulator for Selected Vehicle (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>On-Road Price Simulator</span>
              <span className="text-xs font-normal text-slate-400">{activePolicy.stateName}</span>
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Select an electric car to calculate the exact state RTO and net on-road price:
            </p>

            {/* Vehicle Selector */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Choose Electric Car:
              </label>
              <select
                id="select-subsidy-vehicle"
                value={selectedVehicleId}
                onChange={e => setSelectedVehicleId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none"
              >
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.name} (₹{v.startingPriceLakh}L - ₹{v.endingPriceLakh}L)
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Car Preview Card */}
            <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <img
                src={activeVehicle.heroImage}
                alt={activeVehicle.name}
                className="h-14 w-20 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">
                  {activeVehicle.brand} {activeVehicle.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{activeVehicle.batteryCapacityKwh} kWh</span>
                  <span>•</span>
                  <span>{activeVehicle.realWorldRangeKm} km real range</span>
                </div>
              </div>
              {onSelectVehicle && (
                <button
                  id={`btn-view-car-${activeVehicle.slug}`}
                  onClick={() => onSelectVehicle(activeVehicle.slug)}
                  className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:text-white hover:bg-slate-700"
                  title="View vehicle details"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Detailed Price Breakdown Table */}
            <div className="mt-5 space-y-2.5 text-sm border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Ex-Showroom Price (Base Trim)</span>
                <span className="font-semibold text-white">₹{exShowroom.toFixed(2)} Lakh</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1">
                  RTO Road Tax ({activePolicy.stateName})
                  {activePolicy.roadTaxExemptionPercent === 100 && (
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-400 font-bold">100% Waived</span>
                  )}
                </span>
                <span className="font-semibold text-emerald-400">
                  {evRoadTaxRupees === 0 ? '₹0' : `₹${(evRoadTaxRupees / 100000).toFixed(2)} Lakh`}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>RTO Registration &amp; Smart Card</span>
                <span className="font-medium text-white">
                  {regFee === 0 ? '₹0 (Waived)' : `₹${regFee}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Comprehensive Insurance (Est. 3-Year)</span>
                <span className="font-medium text-white">₹{(insuranceRupees / 100000).toFixed(2)} Lakh</span>
              </div>

              {activePolicy.cashSubsidyAvailable && (
                <div className="flex justify-between text-emerald-400 bg-emerald-500/10 p-2 rounded-lg font-medium">
                  <span>State Direct DBT Subsidy</span>
                  <span>- ₹{activePolicy.maxSubsidyAmountLakh.toFixed(2)} Lakh</span>
                </div>
              )}

              <div className="border-t border-slate-800 pt-3 mt-3 flex justify-between items-baseline">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400">Estimated On-Road</span>
                  <div className="text-xs text-emerald-400">
                    Includes ₹{(roadTaxSavedRupees / 100000).toFixed(2)}L Tax Savings
                  </div>
                </div>
                <div className="text-2xl font-black text-white">
                  ₹{netOnRoadLakh} Lakh
                </div>
              </div>
            </div>

            {/* Direct Consultation / Booking CTA */}
            <div className="mt-6">
              <a
                href="#cars"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-500 shadow-lg shadow-orange-600/30 transition-all"
              >
                <span>Browse All EVs Eligible for {activePolicy.stateName} Subsidy</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
