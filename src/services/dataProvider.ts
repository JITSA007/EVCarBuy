import {
  Vehicle,
  Manufacturer,
  UpcomingEV,
  ChargingStation,
  CityPricing,
  PriceBreakdown,
  DataSyncJob,
  PriceHistoryPoint,
  FilterCriteria
} from '../types/ev';
import {
  VEHICLES,
  MANUFACTURERS,
  UPCOMING_EVS,
  CHARGING_STATIONS,
  INDIAN_CITIES,
  DATA_SYNC_LOGS,
  PRICE_HISTORY
} from '../data/mockVehicles';

export interface IVehicleDataProvider {
  getVehicles(filters?: Partial<FilterCriteria>): Promise<Vehicle[]>;
  getVehiclesSync(filters?: Partial<FilterCriteria>): Vehicle[];
  getVehicleBySlug(slug: string): Promise<Vehicle | undefined>;
  getVehicleById(id: string): Promise<Vehicle | undefined>;
  getManufacturers(): Promise<Manufacturer[]>;
  getManufacturersSync(): Manufacturer[];
  getManufacturerBySlug(slug: string): Promise<Manufacturer | undefined>;
  getUpcomingVehicles(): Promise<UpcomingEV[]>;
  getUpcomingVehiclesSync(): UpcomingEV[];
  getChargingStations(city?: string): Promise<ChargingStation[]>;
  getChargingStationsSync(city?: string): ChargingStation[];
  getCities(): CityPricing[];
  calculateOnRoadPrice(vehicle: Vehicle, variantId?: string, cityName?: string): PriceBreakdown;
  getPriceHistory(vehicleId?: string): PriceHistoryPoint[];
  getSyncLogs(): DataSyncJob[];
  triggerManualSync(sourceName: string): Promise<DataSyncJob>;
  updateVehiclePrice(vehicleId: string, variantId: string, newPriceLakh: number, reason?: string): Promise<boolean>;
}

class MockVehicleProvider implements IVehicleDataProvider {
  private vehicles: Vehicle[] = [...VEHICLES];
  private syncLogs: DataSyncJob[] = [...DATA_SYNC_LOGS];
  private priceHistory: PriceHistoryPoint[] = [...PRICE_HISTORY];

  constructor() {
    // Load any persisted admin overrides from localStorage if in browser
    if (typeof window !== 'undefined') {
      try {
        const savedCustomVehicles = localStorage.getItem('evclubindia_custom_vehicles') || localStorage.getItem('voltsphere_custom_vehicles');
        if (savedCustomVehicles) {
          this.vehicles = JSON.parse(savedCustomVehicles);
        }
        const savedLogs = localStorage.getItem('evclubindia_sync_logs') || localStorage.getItem('voltsphere_sync_logs');
        if (savedLogs) {
          this.syncLogs = JSON.parse(savedLogs);
        }
      } catch {
        // ignore fallback to memory
      }
    }
  }

  getVehiclesSync(filters?: Partial<FilterCriteria>): Vehicle[] {
    let result = [...this.vehicles];
    if (!filters) return result;
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.bodyType.toLowerCase().includes(q) ||
        v.segment.toLowerCase().includes(q) ||
        v.keyHighlights.some(h => h.toLowerCase().includes(q))
      );
    }
    return result;
  }

  getManufacturersSync(): Manufacturer[] {
    return MANUFACTURERS;
  }

  getUpcomingVehiclesSync(): UpcomingEV[] {
    return UPCOMING_EVS;
  }

  getChargingStationsSync(city?: string): ChargingStation[] {
    if (!city || city === 'All') return CHARGING_STATIONS;
    return CHARGING_STATIONS.filter(cs => cs.city.toLowerCase() === city.toLowerCase());
  }

  async getVehicles(filters?: Partial<FilterCriteria>): Promise<Vehicle[]> {
    let result = [...this.vehicles];

    if (!filters) return result;

    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.bodyType.toLowerCase().includes(q) ||
        v.segment.toLowerCase().includes(q) ||
        v.keyHighlights.some(h => h.toLowerCase().includes(q))
      );
    }

    if (filters.brands && filters.brands.length > 0) {
      result = result.filter(v => filters.brands?.includes(v.brand) || filters.brands?.includes(v.manufacturerId));
    }

    if (filters.bodyTypes && filters.bodyTypes.length > 0) {
      result = result.filter(v => filters.bodyTypes?.includes(v.bodyType));
    }

    if (filters.minPriceLakh !== undefined && filters.minPriceLakh > 0) {
      result = result.filter(v => v.endingPriceLakh >= (filters.minPriceLakh ?? 0));
    }

    if (filters.maxPriceLakh !== undefined && filters.maxPriceLakh > 0) {
      result = result.filter(v => v.startingPriceLakh <= (filters.maxPriceLakh ?? 100));
    }

    if (filters.minRangeKm !== undefined && filters.minRangeKm > 0) {
      result = result.filter(v => v.claimedRangeKm >= (filters.minRangeKm ?? 0));
    }

    if (filters.minBatteryKwh !== undefined && filters.minBatteryKwh > 0) {
      result = result.filter(v => v.batteryCapacityKwh >= (filters.minBatteryKwh ?? 0));
    }

    if (filters.seating && filters.seating.length > 0) {
      result = result.filter(v => filters.seating?.includes(v.seatingCapacity));
    }

    if (filters.driveTypes && filters.driveTypes.length > 0) {
      result = result.filter(v => filters.driveTypes?.includes(v.driveType));
    }

    if (filters.fastChargingSpeedKw !== undefined && filters.fastChargingSpeedKw > 0) {
      result = result.filter(v => v.dcChargingSpeedKw >= (filters.fastChargingSpeedKw ?? 0));
    }

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

    if (filters.minNcapRating !== undefined && filters.minNcapRating > 0) {
      result = result.filter(v => (v.ncapRating ?? 0) >= (filters.minNcapRating ?? 0));
    }

    if (filters.sortBy) {
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
    }

    return result;
  }

  async getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
    return this.vehicles.find(v => v.slug === slug || v.id === slug);
  }

  async getVehicleById(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.find(v => v.id === id);
  }

  async getManufacturers(): Promise<Manufacturer[]> {
    return MANUFACTURERS;
  }

  async getManufacturerBySlug(slug: string): Promise<Manufacturer | undefined> {
    return MANUFACTURERS.find(m => m.slug === slug || m.id === slug);
  }

  async getUpcomingVehicles(): Promise<UpcomingEV[]> {
    return UPCOMING_EVS;
  }

  async getChargingStations(city?: string): Promise<ChargingStation[]> {
    if (!city || city === 'All') return CHARGING_STATIONS;
    return CHARGING_STATIONS.filter(cs => cs.city.toLowerCase() === city.toLowerCase());
  }

  getCities(): CityPricing[] {
    return INDIAN_CITIES;
  }

  calculateOnRoadPrice(vehicle: Vehicle, variantId?: string, cityName: string = 'Delhi'): PriceBreakdown {
    const selectedVariant = variantId
      ? vehicle.variants.find(v => v.id === variantId) || vehicle.variants[0]
      : vehicle.variants[0];

    const exShowroom = selectedVariant ? selectedVariant.exShowroomPriceLakh : vehicle.startingPriceLakh;
    const cityConfig = INDIAN_CITIES.find(c => c.city.toLowerCase() === cityName.toLowerCase()) || INDIAN_CITIES[0];

    // Calculate state RTO
    const rtoAmountLakh = (exShowroom * (cityConfig.rtoPercent / 100)) + (cityConfig.rtoFlatFee / 100000);
    // Insurance (comprehensive 3-year third party + 1 yr own damage)
    const insuranceLakh = exShowroom * (cityConfig.insuranceRatePercent / 100);
    // State Subsidy Discount
    const stateSubsidyLakh = cityConfig.evSubsidyLakh;
    // TCS (1% on cars > ₹10L) + Fastag + Registration handling
    const tcsLakh = exShowroom > 10.0 ? exShowroom * 0.01 : 0.0;
    const tcsAndOthersLakh = tcsLakh + cityConfig.otherChargesLakh;

    const onRoadTotalLakh = Math.max(
      exShowroom + rtoAmountLakh + insuranceLakh + tcsAndOthersLakh - stateSubsidyLakh,
      exShowroom
    );

    let policyNote = `${cityConfig.state}: 0% EV Road Tax waiver applicable.`;
    if (cityConfig.evSubsidyLakh > 0) {
      policyNote += ` Includes ₹${(cityConfig.evSubsidyLakh * 100000).toLocaleString('en-IN')} state EV purchase incentive.`;
    }
    if (cityConfig.rtoPercent > 0) {
      policyNote = `${cityConfig.state}: ${cityConfig.rtoPercent}% concessional EV road tax applied.`;
    }

    return {
      city: cityConfig.city,
      exShowroomLakh: Number(exShowroom.toFixed(2)),
      rtoLakh: Number(rtoAmountLakh.toFixed(2)),
      insuranceLakh: Number(insuranceLakh.toFixed(2)),
      stateSubsidyLakh: Number(stateSubsidyLakh.toFixed(2)),
      tcsAndOthersLakh: Number(tcsAndOthersLakh.toFixed(2)),
      onRoadTotalLakh: Number(onRoadTotalLakh.toFixed(2)),
      isEstimated: true,
      statePolicyNote: policyNote
    };
  }

  getPriceHistory(vehicleId?: string): PriceHistoryPoint[] {
    if (!vehicleId) return this.priceHistory;
    return this.priceHistory.filter(ph => ph.variantName.toLowerCase().includes(vehicleId.toLowerCase()) || true);
  }

  getSyncLogs(): DataSyncJob[] {
    return this.syncLogs;
  }

  async triggerManualSync(sourceName: string): Promise<DataSyncJob> {
    const latency = Math.floor(Math.random() * 500) + 250;
    const newLog: DataSyncJob = {
      id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      source: sourceName,
      type: 'Admin Verification',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'Completed',
      recordsProcessed: this.vehicles.length,
      changesDetected: 0,
      latencyMs: latency,
      notes: `Manual sync requested by Admin. Verified schema integrity for ${this.vehicles.length} vehicle models.`
    };

    this.syncLogs.unshift(newLog);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('evclubindia_sync_logs', JSON.stringify(this.syncLogs));
      } catch {
        // ignore
      }
    }
    return newLog;
  }

  async updateVehiclePrice(vehicleId: string, variantId: string, newPriceLakh: number, reason: string = 'Admin price correction'): Promise<boolean> {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return false;

    const variant = vehicle.variants.find(va => va.id === variantId);
    if (!variant) return false;

    const oldPrice = variant.exShowroomPriceLakh;
    const change = newPriceLakh - oldPrice;
    const changePercent = oldPrice > 0 ? (change / oldPrice) * 100 : 0;

    variant.exShowroomPriceLakh = newPriceLakh;

    // Recalculate vehicle starting and ending price
    const prices = vehicle.variants.map(va => va.exShowroomPriceLakh);
    vehicle.startingPriceLakh = Math.min(...prices);
    vehicle.endingPriceLakh = Math.max(...prices);
    vehicle.lastVerifiedDate = new Date().toISOString().split('T')[0];

    // Add price history point
    const historyPoint: PriceHistoryPoint = {
      id: `ph-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      variantName: `${vehicle.name} ${variant.name}`,
      priceLakh: newPriceLakh,
      changeLakh: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      city: 'All India Ex-Showroom',
      reason: reason,
      source: 'Admin Live Verification Feed'
    };
    this.priceHistory.unshift(historyPoint);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('evclubindia_custom_vehicles', JSON.stringify(this.vehicles));
      } catch {
        // ignore
      }
    }

    return true;
  }
}

// Export singleton instance conforming to IVehicleDataProvider
export const vehicleDataProvider: IVehicleDataProvider = new MockVehicleProvider();
