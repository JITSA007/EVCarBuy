export type EVStatus = 'available' | 'upcoming' | 'discontinued';
export type BodyType =
  | 'Hatchback'
  | 'Sedan'
  | 'SUV'
  | 'Compact SUV'
  | 'Micro SUV'
  | 'Micro Car'
  | 'MPV'
  | 'Electric MPV'
  | 'Coupe'
  | 'Coupe SUV'
  | 'SUV Coupe'
  | 'Crossover'
  | 'Crossover MPV'
  | 'Crossover SUV'
  | 'Midsize SUV'
  | 'Luxury'
  | 'Luxury SAV'
  | 'Luxury Compact SUV'
  | 'Luxury Fullsize SUV'
  | 'Luxury SUV Coupe'
  | 'Performance Sedan'
  | 'Gran Coupe Sedan';
export type DriveType = 'FWD' | 'RWD' | 'AWD';
export type SunroofType =
  | 'Panoramic'
  | 'Single Pane'
  | 'None'
  | string;
export type DataConfidence = 'High' | 'Verified' | 'Estimated' | 'Pending Review';

export interface VehicleDimensions {
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  wheelbaseMm: number;
  groundClearanceMm: number;
  bootSpaceLitre: number;
  kerbWeightKg: number;
}

export interface VehicleVariant {
  id: string;
  name: string;
  exShowroomPriceLakh: number;
  batteryCapacityKwh?: number;
  batteryKwh?: number;
  claimedRangeKm: number;
  realWorldRangeKm: number;
  motorPowerBhp: number;
  torqueNm: number;
  acChargingKw: number;
  dcChargingKw: number;
  dcChargingTimeMin: number;
  keyFeatures: string[];
  isBaas?: boolean;
  batteryRentalPerKm?: number;
}

export interface Vehicle {
  id: string;
  manufacturerId: string;
  brand: string;
  name: string;
  slug: string;
  modelYear: number;
  bodyType: BodyType;
  segment: string;
  status: EVStatus;
  launchDate: string;
  startingPriceLakh: number;
  endingPriceLakh: number;
  claimedRangeKm: number;
  realWorldRangeKm: number;
  cityRangeKm: number;
  highwayRangeKm: number;
  rangeCertification: string; // e.g. 'ARAI / MIDC'
  batteryCapacityKwh: number;
  batteryChemistry: string; // e.g. 'LFP (Lithium Iron Phosphate)' or 'NMC'
  motorPowerBhp: number;
  torqueNm: number;
  driveType: DriveType;
  acceleration0To100: number; // in seconds
  topSpeedKmh: number;
  seatingCapacity: number;
  dimensions: VehicleDimensions;
  acChargingSpeedKw: number;
  dcChargingSpeedKw: number;
  chargingTimeAcHours: number;
  chargingTimeDcMin10To80: number;
  batteryWarrantyYears: number;
  batteryWarrantyKm: number;
  vehicleWarrantyYears: number;
  vehicleWarrantyKm: number;
  ncapRating: number | null; // e.g. 5 or null if unrated
  ncapAgency: string; // e.g. 'Bharat NCAP' or 'Global NCAP'
  airbags: number;
  adasLevel: number; // 0, 1, 2
  adasFeatures: string[];
  v2l: boolean; // Vehicle to Load
  v2g: boolean; // Vehicle to Grid
  connectedCar: boolean;
  sunroof: SunroofType;
  ventilatedSeats: boolean;
  camera360: boolean;
  wirelessCharging: boolean;
  premiumAudio: string;
  heroImage: string;
  gallery: {
    exterior: string[];
    interior: string[];
    charging: string[];
  };
  keyHighlights: string[];
  pros: string[];
  cons: string[];
  expertVerdict: string;
  rating: number; // out of 5
  reviewCount: number;
  variants: VehicleVariant[];
  lastVerifiedDate: string;
  dataSource: string;
  dataConfidence: DataConfidence;
  isDemoData: boolean;
  efficiencyWhPerKm?: number;
  baasAvailable?: boolean;
  baasStartingPriceLakh?: number;
  baasBatteryRentalPerKm?: number;
}

export interface CityPricing {
  city: string;
  state: string;
  rtoPercent: number;
  rtoFlatFee: number;
  evSubsidyLakh: number;
  insuranceRatePercent: number;
  otherChargesLakh: number;
}

export interface PriceBreakdown {
  city: string;
  exShowroomLakh: number;
  rtoLakh: number;
  insuranceLakh: number;
  stateSubsidyLakh: number;
  tcsAndOthersLakh: number;
  onRoadTotalLakh: number;
  isEstimated: boolean;
  statePolicyNote: string;
}

export interface PriceHistoryPoint {
  id: string;
  date: string;
  variantName: string;
  priceLakh: number;
  changeLakh: number;
  changePercent: number;
  city: string;
  reason: string;
  source: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  country: string;
  founded: number;
  evMarketSharePercent: number;
  description: string;
  officialWebsite: string;
  totalModels: number;
  startingPriceLakh: number;
  logoUrl: string;
  popularModels: string[];
  upcomingModels: string[];
}

export interface ChargingConnector {
  type: 'CCS2' | 'Type 2 AC' | 'GB/T' | 'Bharat DC-001';
  powerKw: number;
  availableUnits: number;
  totalUnits: number;
  ratePerKwh: number;
}

export interface ChargingStation {
  id: string;
  name: string;
  operator: string; // e.g. 'Tata Power EZ Charge', 'Jio-bp pulse', 'Statiq', 'Zeon'
  address: string;
  city: string;
  lat: number;
  lng: number;
  is24x7: boolean;
  isFastCharger: boolean;
  rating: number;
  reviewCount: number;
  connectors: ChargingConnector[];
  amenities: string[];
}

export interface UpcomingEV {
  id: string;
  name: string;
  brand: string;
  slug: string;
  expectedLaunch: string;
  expectedPriceMinLakh: number;
  expectedPriceMaxLakh: number;
  expectedRangeKm: number;
  batteryKwh: number;
  segment: string;
  bodyType: BodyType;
  status: 'Announced' | 'Testing' | 'Launching Soon';
  highlights: string[];
  imageUrl: string;
  expectedLaunchDate?: string;
  expectedPriceLakhMin?: number;
  expectedPriceLakhMax?: number;
  expectedBatteryKwh?: number;
  keyHighlight?: string;
  heroImage?: string;
}

export type UpcomingVehicle = UpcomingEV;
export type SyncAuditEntry = DataSyncJob;

export interface AdvisorInputs {
  budgetMaxLakh: number;
  dailyDrivingKm: number;
  primaryUse: 'family' | 'city' | 'highway' | 'performance' | 'luxury';
  homeChargingAvailable: boolean;
  preferredBodyType?: BodyType;
}

export interface DataSyncJob {
  id: string;
  source: string;
  type: 'Manufacturer Feed' | 'Dealer Price Scrape' | 'ARAI Range Certification' | 'Admin Verification';
  timestamp: string;
  status: 'Completed' | 'In Progress' | 'Warning' | 'Failed';
  recordsProcessed: number;
  changesDetected: number;
  latencyMs: number;
  notes: string;
}

export interface UserRecommendationInput {
  budgetMaxLakh: number;
  dailyDrivingKm: number;
  cityVsHighwaySplit: 'mostly-city' | 'balanced' | 'mostly-highway';
  passengerCount: number;
  bodyTypePreference: string;
  hasHomeCharging: boolean;
  primaryPriority: 'range' | 'value' | 'features' | 'performance' | 'safety' | 'luxury';
  city: string;
}

export interface RecommendationResult {
  vehicle: Vehicle;
  matchScore: number;
  rankBadge: 'Best Overall' | 'Best Value' | 'Best Range' | 'Best Family Choice' | 'Best Premium Choice';
  reasons: string[];
}

export interface FilterCriteria {
  searchQuery: string;
  brands: string[];
  bodyTypes: BodyType[];
  minPriceLakh: number;
  maxPriceLakh: number;
  minRangeKm: number;
  minBatteryKwh: number;
  seating: number[];
  driveTypes: DriveType[];
  fastChargingSpeedKw: number;
  adasOnly: boolean;
  sunroofOnly: boolean;
  v2lOnly: boolean;
  camera360Only: boolean;
  minNcapRating: number;
  status: 'all' | 'available' | 'upcoming';
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'range-desc' | 'charging-desc' | 'rating-desc' | 'latest';
}

export interface LiveGroundingSource {
  title: string;
  uri: string;
}

export interface LiveSyncResult {
  modelName: string;
  brand: string;
  isLiveGrounded: boolean;
  lastUpdated: string;
  verifiedPriceRange: string;
  realWorldRangeEstimate: string;
  summary: string;
  keyHighlights: string[];
  sources: LiveGroundingSource[];
}

export interface LiveSearchResult {
  query: string;
  answer: string;
  sources: LiveGroundingSource[];
}

