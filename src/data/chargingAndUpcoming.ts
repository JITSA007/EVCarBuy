import { UpcomingEV, ChargingStation, DataSyncJob, PriceHistoryPoint } from '../types/ev';

export const UPCOMING_EVS: UpcomingEV[] = [
  {
    id: 'tata-sierra-ev',
    name: 'Tata Sierra EV',
    brand: 'Tata',
    slug: 'tata-sierra-ev',
    expectedLaunch: 'Mid 2026',
    expectedPriceMinLakh: 22.0,
    expectedPriceMaxLakh: 28.0,
    expectedRangeKm: 550,
    batteryKwh: 65.0,
    segment: 'Midsize Lifestyle SUV',
    bodyType: 'SUV',
    status: 'Announced',
    highlights: [
      'Iconic alpine curved rear glass roof inspired by the legend',
      'Dual-motor AWD capability on acti.ev skateboard architecture',
      'Lounge 4-seater and family 5-seater configurations'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'tata-safari-ev',
    name: 'Tata Safari EV',
    brand: 'Tata',
    slug: 'tata-safari-ev',
    expectedLaunch: 'Late 2026',
    expectedPriceMinLakh: 26.5,
    expectedPriceMaxLakh: 33.0,
    expectedRangeKm: 510,
    batteryKwh: 70.0,
    segment: '3-Row Flagship Electric SUV',
    bodyType: 'SUV',
    status: 'Testing',
    highlights: [
      'Flagship 6-seater and 7-seater electric SUV with captain seats',
      'Dual-motor electric AWD with terrain response modes',
      'Rear seat entertainment screens, ventilated middle-row, and boss mode'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'mahindra-xuve8',
    name: 'Mahindra XUV.e8',
    brand: 'Mahindra',
    slug: 'mahindra-xuve8',
    expectedLaunch: 'Mid 2026',
    expectedPriceMinLakh: 25.0,
    expectedPriceMaxLakh: 32.0,
    expectedRangeKm: 540,
    batteryKwh: 80.0,
    segment: 'Premium 7-Seater Electric SUV',
    bodyType: 'SUV',
    status: 'Launching Soon',
    highlights: [
      'Born Electric INGLO platform with triple-screen pillar-to-pillar display',
      '80 kWh LFP Blade battery pack with 175 kW ultra-fast DC charging',
      'Full 7-seat family layout based on XUV700 proportions'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'kia-carens-ev',
    name: 'Kia Carens / Clavis EV',
    brand: 'Kia',
    slug: 'kia-carens-ev',
    expectedLaunch: 'Mid 2026',
    expectedPriceMinLakh: 16.0,
    expectedPriceMaxLakh: 21.5,
    expectedRangeKm: 420,
    batteryKwh: 48.0,
    segment: '3-Row Family Electric MPV',
    bodyType: 'MPV',
    status: 'Testing',
    highlights: [
      'Indias most accessible 3-row family electric car',
      '48 kWh liquid-cooled battery delivering real-world 350+ km',
      'Level 2 ADAS, dual 10.25-inch displays, and roof-mounted AC vents'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'byd-seagull-dolphin',
    name: 'BYD Seagull / Dolphin',
    brand: 'BYD',
    slug: 'byd-seagull',
    expectedLaunch: 'Late 2026',
    expectedPriceMinLakh: 10.5,
    expectedPriceMaxLakh: 13.9,
    expectedRangeKm: 380,
    batteryKwh: 38.8,
    segment: 'Urban Electric Hatchback',
    bodyType: 'Hatchback',
    status: 'Announced',
    highlights: [
      'Ultra-safe BYD Blade battery chemistry at an entry price point',
      'e-Platform 3.0 with rotating 10.1-inch infotainment touchscreen',
      'Direct rival to Tata Tiago EV and Citroën ë-C3'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'hyundai-inster-ev',
    name: 'Hyundai Inster EV',
    brand: 'Hyundai',
    slug: 'hyundai-inster-ev',
    expectedLaunch: 'Late 2026',
    expectedPriceMinLakh: 11.0,
    expectedPriceMaxLakh: 15.0,
    expectedRangeKm: 355,
    batteryKwh: 42.0,
    segment: 'Sub-Compact Electric Crossover',
    bodyType: 'Compact SUV',
    status: 'Testing',
    highlights: [
      'Distinctive pixel-LED lighting and retro-modern styling',
      'Flexible flat-folding seats creating open cabin lounge',
      '30-minute fast charging and Vehicle-to-Load (V2L) standard'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'kia-ev3',
    name: 'Kia EV3',
    brand: 'Kia',
    slug: 'kia-ev3',
    expectedLaunch: 'Late 2026',
    expectedPriceMinLakh: 20.0,
    expectedPriceMaxLakh: 26.0,
    expectedRangeKm: 600,
    batteryKwh: 81.4,
    segment: 'Compact Luxury Crossover',
    bodyType: 'Compact SUV',
    status: 'Testing',
    highlights: [
      'Mini-EV9 concept design with sliding center lounge table',
      'Huge 81.4 kWh pack with 600 km claimed range',
      'Generative AI assistant and in-car gaming hub'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'vinfast-vf6',
    name: 'VinFast VF6',
    brand: 'VinFast',
    slug: 'vinfast-vf6',
    expectedLaunch: 'Mid 2026',
    expectedPriceMinLakh: 16.0,
    expectedPriceMaxLakh: 21.0,
    expectedRangeKm: 410,
    batteryKwh: 59.6,
    segment: 'B-SUV',
    bodyType: 'SUV',
    status: 'Testing',
    highlights: [
      'Locally manufactured at VinFast Tamil Nadu mega-plant',
      'Pininfarina Italian exterior styling and eco-leather cabin',
      '10-year / 200,000 km battery warranty standard'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
  }
];

export const CHARGING_STATIONS: ChargingStation[] = [
  {
    id: 'cs-delhi-cp',
    name: 'Tata Power EZ Charge - Connaught Place',
    operator: 'Tata Power EZ Charge',
    address: 'Block E, Radial Road 3, Connaught Place',
    city: 'Delhi',
    lat: 28.6315,
    lng: 77.2167,
    is24x7: true,
    isFastCharger: true,
    rating: 4.8,
    reviewCount: 310,
    connectors: [
      { type: 'CCS2', powerKw: 60, availableUnits: 3, totalUnits: 4, ratePerKwh: 18.5 },
      { type: 'Type 2 AC', powerKw: 22, availableUnits: 2, totalUnits: 2, ratePerKwh: 14.0 }
    ],
    amenities: ['Coffee Shop', 'Washrooms', 'Shopping Mall', 'Security']
  },
  {
    id: 'cs-mumbai-bkc',
    name: 'Jio-bp pulse Hypercharger - BKC',
    operator: 'Jio-bp pulse',
    address: 'G Block, Bandra Kurla Complex, Bandra East',
    city: 'Mumbai',
    lat: 19.0657,
    lng: 72.8687,
    is24x7: true,
    isFastCharger: true,
    rating: 4.9,
    reviewCount: 420,
    connectors: [
      { type: 'CCS2', powerKw: 120, availableUnits: 4, totalUnits: 6, ratePerKwh: 20.0 },
      { type: 'CCS2', powerKw: 60, availableUnits: 2, totalUnits: 2, ratePerKwh: 18.0 }
    ],
    amenities: ['Wild Bean Cafe', 'Free Wi-Fi', 'EV Lounge', '24/7 Security']
  },
  {
    id: 'cs-blr-indiranagar',
    name: 'Statiq Ultra Hub - 100ft Road Indiranagar',
    operator: 'Statiq',
    address: 'Opp. Toit Brewpub, 100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    lat: 12.9719,
    lng: 77.6412,
    is24x7: true,
    isFastCharger: true,
    rating: 4.7,
    reviewCount: 280,
    connectors: [
      { type: 'CCS2', powerKw: 60, availableUnits: 2, totalUnits: 4, ratePerKwh: 19.0 },
      { type: 'Type 2 AC', powerKw: 7.4, availableUnits: 2, totalUnits: 2, ratePerKwh: 13.5 }
    ],
    amenities: ['Restaurants', 'Convenience Store', 'Covered Parking']
  },
  {
    id: 'cs-hyd-hitec',
    name: 'Zeon Fast Charging - Cyber Towers Hitec City',
    operator: 'Zeon Charging',
    address: 'Near Cyber Gateway, Hitec City, Madhapur',
    city: 'Hyderabad',
    lat: 17.4504,
    lng: 78.3808,
    is24x7: true,
    isFastCharger: true,
    rating: 4.8,
    reviewCount: 350,
    connectors: [
      { type: 'CCS2', powerKw: 50, availableUnits: 3, totalUnits: 4, ratePerKwh: 18.0 }
    ],
    amenities: ['Tech Park Access', 'ATM', 'Rest Area']
  }
];

export const DATA_SYNC_LOGS: DataSyncJob[] = [
  {
    id: 'sync-01',
    source: 'Tata Motors API & Homologation Portal',
    type: 'Manufacturer Feed',
    timestamp: '2026-09-04 06:30 IST',
    status: 'Completed',
    recordsProcessed: 22,
    changesDetected: 2,
    latencyMs: 420,
    notes: 'Verified 22 electric vehicle models across all manufacturer catalogs in India.'
  },
  {
    id: 'sync-02',
    source: 'ARAI Range Certification Registry',
    type: 'ARAI Range Certification',
    timestamp: '2026-09-03 18:15 IST',
    status: 'Completed',
    recordsProcessed: 35,
    changesDetected: 0,
    latencyMs: 650,
    notes: 'All 22 car models verified against official ARAI / MIDC certificate registry.'
  },
  {
    id: 'sync-03',
    source: 'Delhi & Maharashtra Transport Dept RTO Feeds',
    type: 'Dealer Price Scrape',
    timestamp: '2026-09-03 11:00 IST',
    status: 'Completed',
    recordsProcessed: 42,
    changesDetected: 1,
    latencyMs: 890,
    notes: 'Re-validated 0% EV road tax waiver in Delhi, Maharashtra, Tamil Nadu, and Telangana.'
  }
];

export const PRICE_HISTORY: PriceHistoryPoint[] = [
  {
    id: 'ph-1',
    date: '18 Aug 2026',
    variantName: 'Nexon EV Empowered Plus 45 kWh',
    priceLakh: 16.99,
    changeLakh: -0.25,
    changePercent: -1.45,
    city: 'All India Ex-Showroom',
    reason: 'Festive season battery localization price correction',
    source: 'Tata Motors Official Press Release'
  },
  {
    id: 'ph-2',
    date: '05 Jul 2026',
    variantName: 'MG Windsor EV Essence',
    priceLakh: 15.50,
    changeLakh: 0.0,
    changePercent: 0.0,
    city: 'All India Ex-Showroom',
    reason: 'Introductory price locked for initial 10,000 bookings',
    source: 'MG Motor India'
  },
  {
    id: 'ph-3',
    date: '12 May 2026',
    variantName: 'Curvv EV Accomplished 55 kWh',
    priceLakh: 19.29,
    changeLakh: 0.30,
    changePercent: 1.58,
    city: 'All India Ex-Showroom',
    reason: 'Input cost adjustments on high-capacity nickel-cobalt cells',
    source: 'Homologation Update'
  }
];
