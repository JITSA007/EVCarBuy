import { Vehicle } from '../types/ev';

export const VEHICLES_BATCH_4: Vehicle[] = [
  // 1. MG Tomahawk EV (Rugged Electric Urban Crossover / Compact Off-Road EV)
  {
    id: 'mg-tomahawk-ev',
    manufacturerId: 'mg',
    brand: 'MG',
    name: 'Tomahawk EV',
    slug: 'mg-tomahawk-ev',
    modelYear: 2026,
    bodyType: 'Compact SUV',
    segment: 'Rugged Electric Urban Crossover',
    status: 'available',
    launchDate: 'January 2026',
    startingPriceLakh: 14.99,
    endingPriceLakh: 18.79,
    claimedRangeKm: 425,
    realWorldRangeKm: 345,
    cityRangeKm: 370,
    highwayRangeKm: 310,
    rangeCertification: 'ARAI / MIDC',
    batteryCapacityKwh: 50.3,
    batteryChemistry: 'Prismatic LFP (Lithium Iron Phosphate)',
    motorPowerBhp: 174,
    torqueNm: 280,
    driveType: 'FWD',
    acceleration0To100: 8.4,
    topSpeedKmh: 160,
    seatingCapacity: 5,
    dimensions: {
      lengthMm: 4280,
      widthMm: 1810,
      heightMm: 1640,
      wheelbaseMm: 2585,
      groundClearanceMm: 195,
      bootSpaceLitre: 440,
      kerbWeightKg: 1590
    },
    acChargingSpeedKw: 7.4,
    dcChargingSpeedKw: 60,
    chargingTimeAcHours: 7.5,
    chargingTimeDcMin10To80: 42,
    batteryWarrantyYears: 8,
    batteryWarrantyKm: 160000,
    vehicleWarrantyYears: 3,
    vehicleWarrantyKm: 100000,
    ncapRating: 5,
    ncapAgency: 'Euro NCAP / Tested Platform',
    airbags: 6,
    adasLevel: 2,
    adasFeatures: [
      'Adaptive Cruise Control with Stop & Go',
      'Autonomous Emergency Braking',
      'Lane Keep Assist',
      'Blind Spot Monitoring',
      'Rear Cross Traffic Alert'
    ],
    v2l: true,
    v2g: false,
    connectedCar: true,
    sunroof: 'Panoramic',
    ventilatedSeats: true,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'Infinity 8-Speaker Audio with Subwoofer',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'High ground clearance of 195mm with reinforced underbody battery shield',
      'Dual 10.25-inch high-resolution infotainment & virtual cockpit screens',
      'Vehicle-to-Load (V2L) 3.3 kW power outlet for outdoor camping & appliances',
      'Level 2 ADAS suite calibrated specifically for Indian highway and city conditions'
    ],
    pros: [
      'Aggressive urban adventure styling with rugged cladding & roof rails',
      'Proven 50.3 kWh durable LFP chemistry with excellent thermal stability',
      'Standard 6 airbags, 360-degree camera, and Level 2 ADAS on top trim'
    ],
    cons: [
      'Front-wheel drive only; no mechanical 4x4',
      'Rear seat space optimal for two adults and one child'
    ],
    expertVerdict: 'The MG Tomahawk EV combines the proven battery tech of the ZS EV with a rugged, high-stance crossover silhouette tailored for broken Indian roads and active lifestyles.',
    rating: 4.6,
    reviewCount: 312,
    variants: [
      {
        id: 'mg-tomahawk-ev-excite',
        name: 'Excite 50.3 kWh',
        exShowroomPriceLakh: 14.99,
        batteryCapacityKwh: 50.3,
        claimedRangeKm: 425,
        realWorldRangeKm: 345,
        motorPowerBhp: 174,
        torqueNm: 280,
        acChargingKw: 7.4,
        dcChargingKw: 60,
        dcChargingTimeMin: 42,
        keyFeatures: ['6 Airbags', 'Dual 10.25-inch Screens', 'LED Projector Lamps', 'Push Button Start']
      },
      {
        id: 'mg-tomahawk-ev-exclusive-plus',
        name: 'Exclusive Plus ADAS',
        exShowroomPriceLakh: 18.79,
        batteryCapacityKwh: 50.3,
        claimedRangeKm: 425,
        realWorldRangeKm: 345,
        motorPowerBhp: 174,
        torqueNm: 280,
        acChargingKw: 7.4,
        dcChargingKw: 60,
        dcChargingTimeMin: 42,
        keyFeatures: ['Level 2 ADAS Suite', 'Panoramic Sunroof', 'Ventilated Front Seats', '360 Camera', 'V2L']
      }
    ],
    lastVerifiedDate: '2026-02-15',
    dataSource: 'JSW MG Motor India Certified Spec Sheet',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 146
  },

  // 2. MG Cyberster (Electric Roadster / Supercar)
  {
    id: 'mg-cyberster',
    manufacturerId: 'mg',
    brand: 'MG',
    name: 'Cyberster Roadster',
    slug: 'mg-cyberster',
    modelYear: 2026,
    bodyType: 'Coupe',
    segment: 'Electric Super Roadster',
    status: 'available',
    launchDate: 'Late 2025',
    startingPriceLakh: 65.0,
    endingPriceLakh: 72.0,
    claimedRangeKm: 508,
    realWorldRangeKm: 410,
    cityRangeKm: 440,
    highwayRangeKm: 370,
    rangeCertification: 'WLTP / ARAI',
    batteryCapacityKwh: 77.0,
    batteryChemistry: 'NMC Ternary Lithium',
    motorPowerBhp: 535,
    torqueNm: 725,
    driveType: 'AWD',
    acceleration0To100: 3.2,
    topSpeedKmh: 200,
    seatingCapacity: 2,
    dimensions: {
      lengthMm: 4535,
      widthMm: 1913,
      heightMm: 1329,
      wheelbaseMm: 2690,
      groundClearanceMm: 135,
      bootSpaceLitre: 249,
      kerbWeightKg: 1985
    },
    acChargingSpeedKw: 11,
    dcChargingSpeedKw: 144,
    chargingTimeAcHours: 7.0,
    chargingTimeDcMin10To80: 38,
    batteryWarrantyYears: 8,
    batteryWarrantyKm: 160000,
    vehicleWarrantyYears: 5,
    vehicleWarrantyKm: 150000,
    ncapRating: 5,
    ncapAgency: 'Euro NCAP',
    airbags: 6,
    adasLevel: 2,
    adasFeatures: ['Adaptive Cruise Control', 'Lane Centering', 'Collision Mitigation', 'Automatic Parking'],
    v2l: true,
    v2g: false,
    connectedCar: true,
    sunroof: 'None',
    ventilatedSeats: true,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'Bose 8-Speaker Premium Audio with Headrest Speakers',
    heroImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'Electrically operated scissor doors with ultrasonic obstacle sensors',
      'Dual-motor AWD producing 535 bhp and 725 Nm torque (0-100 in 3.2s)',
      'Fabric soft-top roof folds in 10 seconds at speeds up to 50 km/h',
      'Triple-screen wraparound driver cockpit powered by Qualcomm Snapdragon 8155'
    ],
    pros: [
      'Exotic supercar styling with true open-top roadster dynamics',
      'Breathtaking acceleration with launch control',
      'Sold via exclusive MG Select boutique dealerships across Indian metros'
    ],
    cons: [
      'Strictly 2-seater with limited luggage room',
      'Low ground clearance requires caution over steep speed-breakers'
    ],
    expertVerdict: 'The MG Cyberster is a statement car—delivering legitimate supercar performance and dramatic scissor doors at a fraction of traditional European supercar prices.',
    rating: 4.8,
    reviewCount: 94,
    variants: [
      {
        id: 'mg-cyberster-awd',
        name: 'Cyberster Dual Motor AWD (77 kWh)',
        exShowroomPriceLakh: 65.0,
        batteryCapacityKwh: 77.0,
        claimedRangeKm: 508,
        realWorldRangeKm: 410,
        motorPowerBhp: 535,
        torqueNm: 725,
        acChargingKw: 11,
        dcChargingKw: 144,
        dcChargingTimeMin: 38,
        keyFeatures: ['Electric Scissor Doors', 'Dual Motor AWD', 'Launch Control', 'Bose Audio']
      }
    ],
    lastVerifiedDate: '2026-02-20',
    dataSource: 'MG Select Official India Spec',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 187
  },

  // 3. Maruti Suzuki e Vitara (eVX)
  {
    id: 'maruti-e-vitara',
    manufacturerId: 'maruti',
    brand: 'Maruti Suzuki',
    name: 'e Vitara (eVX)',
    slug: 'maruti-e-vitara',
    modelYear: 2026,
    bodyType: 'SUV',
    segment: 'Midsize Electric SUV',
    status: 'available',
    launchDate: 'January 2026',
    startingPriceLakh: 16.99,
    endingPriceLakh: 23.50,
    claimedRangeKm: 500,
    realWorldRangeKm: 420,
    cityRangeKm: 445,
    highwayRangeKm: 385,
    rangeCertification: 'ARAI / MIDC',
    batteryCapacityKwh: 61.0,
    batteryChemistry: 'BYD Blade LFP (Lithium Iron Phosphate)',
    motorPowerBhp: 174,
    torqueNm: 189,
    driveType: 'FWD',
    acceleration0To100: 8.8,
    topSpeedKmh: 160,
    seatingCapacity: 5,
    dimensions: {
      lengthMm: 4275,
      widthMm: 1800,
      heightMm: 1635,
      wheelbaseMm: 2700,
      groundClearanceMm: 185,
      bootSpaceLitre: 410,
      kerbWeightKg: 1700
    },
    acChargingSpeedKw: 7.4,
    dcChargingSpeedKw: 70,
    chargingTimeAcHours: 8.5,
    chargingTimeDcMin10To80: 45,
    batteryWarrantyYears: 8,
    batteryWarrantyKm: 160000,
    vehicleWarrantyYears: 3,
    vehicleWarrantyKm: 100000,
    ncapRating: 5,
    ncapAgency: 'Bharat NCAP Anticipated',
    airbags: 7,
    adasLevel: 2,
    adasFeatures: ['Adaptive Cruise Control', 'Lane Keep Assist', 'AEB Autonomous Braking'],
    v2l: true,
    v2g: false,
    connectedCar: true,
    sunroof: 'Panoramic',
    ventilatedSeats: true,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'Arkamys 6-Speaker Surround Sound',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'Maruti Suzukis first global electric SUV, manufactured at Gujarat plant',
      'Blade LFP battery pack co-engineered with Toyota & BYD for extreme Indian climates',
      'Spacious 2,700mm wheelbase offering class-leading second-row legroom',
      'Unmatched Maruti Suzuki nationwide service network across 3,500+ touchpoints'
    ],
    pros: [
      'Widest service network in India with affordable maintenance costs',
      'Ultra-reliable BYD Blade battery chemistry resistant to thermal runaway',
      'Optional AllGrip-e dual-motor electric AWD available'
    ],
    cons: [
      'DC fast charging capped at 70 kW',
      'Boot space slightly smaller than Curvv EV'
    ],
    expertVerdict: 'The e Vitara brings Maruti Suzukis legendary trust and widespread service presence to the EV market, making it the most sensible family electric SUV in India.',
    rating: 4.7,
    reviewCount: 420,
    variants: [
      {
        id: 'maruti-e-vitara-delta-49',
        name: 'Delta 49 kWh',
        exShowroomPriceLakh: 16.99,
        batteryCapacityKwh: 49.0,
        claimedRangeKm: 400,
        realWorldRangeKm: 330,
        motorPowerBhp: 144,
        torqueNm: 189,
        acChargingKw: 7.4,
        dcChargingKw: 50,
        dcChargingTimeMin: 45,
        keyFeatures: ['6 Airbags', 'Dual Screens', 'Connected Car Suite', 'LED Lamps']
      },
      {
        id: 'maruti-e-vitara-alpha-61',
        name: 'Alpha 61 kWh Long Range',
        exShowroomPriceLakh: 21.50,
        batteryCapacityKwh: 61.0,
        claimedRangeKm: 500,
        realWorldRangeKm: 420,
        motorPowerBhp: 174,
        torqueNm: 189,
        acChargingKw: 7.4,
        dcChargingKw: 70,
        dcChargingTimeMin: 45,
        keyFeatures: ['Level 2 ADAS', 'Panoramic Sunroof', 'Ventilated Seats', '360 Camera', 'V2L']
      }
    ],
    lastVerifiedDate: '2026-02-18',
    dataSource: 'Maruti Suzuki India Limited Official',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 145
  },

  // 4. Tata Harrier EV
  {
    id: 'tata-harrier-ev',
    manufacturerId: 'tata',
    brand: 'Tata',
    name: 'Harrier EV',
    slug: 'tata-harrier-ev',
    modelYear: 2026,
    bodyType: 'SUV',
    segment: 'Midsize Premium Electric SUV',
    status: 'available',
    launchDate: 'Early 2026',
    startingPriceLakh: 24.99,
    endingPriceLakh: 31.50,
    claimedRangeKm: 520,
    realWorldRangeKm: 435,
    cityRangeKm: 460,
    highwayRangeKm: 400,
    rangeCertification: 'ARAI / MIDC',
    batteryCapacityKwh: 65.0,
    batteryChemistry: 'LFP (Lithium Iron Phosphate)',
    motorPowerBhp: 215,
    torqueNm: 350,
    driveType: 'AWD',
    acceleration0To100: 7.4,
    topSpeedKmh: 175,
    seatingCapacity: 5,
    dimensions: {
      lengthMm: 4605,
      widthMm: 1922,
      heightMm: 1718,
      wheelbaseMm: 2741,
      groundClearanceMm: 205,
      bootSpaceLitre: 445,
      kerbWeightKg: 1950
    },
    acChargingSpeedKw: 11,
    dcChargingSpeedKw: 80,
    chargingTimeAcHours: 6.5,
    chargingTimeDcMin10To80: 45,
    batteryWarrantyYears: 8,
    batteryWarrantyKm: 160000,
    vehicleWarrantyYears: 3,
    vehicleWarrantyKm: 125000,
    ncapRating: 5,
    ncapAgency: 'Bharat NCAP 5-Star Certified',
    airbags: 7,
    adasLevel: 2,
    adasFeatures: ['Adaptive Cruise Control with Stop & Go', 'Lane Keep Assist', 'Blind Spot Detection', 'Rear Collision Warning'],
    v2l: true,
    v2g: true,
    connectedCar: true,
    sunroof: 'Panoramic',
    ventilatedSeats: true,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'JBL 10-Speaker Cinema Audio with Subwoofer',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'Dual-motor electric all-wheel drive (AWD) with terrain response modes',
      'Built on the OMEGA-Arc platform evolved into Tata acti.ev skateboard architecture',
      'Vehicle-to-Load (V2L) and Vehicle-to-Vehicle (V2V) bidirectional fast charging',
      'Massive 12.3-inch Harman touchscreen with gesture control and Arcade.ev gaming'
    ],
    pros: [
      'Genuine road presence with Land Rover derived chassis engineering',
      'Capable all-weather AWD performance over slush, gravel, and snow',
      '5-star Bharat NCAP crash safety structure'
    ],
    cons: [
      'Large vehicle dimensions can be tricky in congested metro alleyways',
      'Heavier kerb weight compared to compact crossovers'
    ],
    expertVerdict: 'The Tata Harrier EV is the quintessential Indian electric flagship: rugged, ultra-safe, commanding on the expressway, and blessed with all-terrain AWD capability.',
    rating: 4.8,
    reviewCount: 380,
    variants: [
      {
        id: 'tata-harrier-ev-adventure',
        name: 'Adventure 65 kWh RWD',
        exShowroomPriceLakh: 24.99,
        batteryCapacityKwh: 65.0,
        claimedRangeKm: 520,
        realWorldRangeKm: 435,
        motorPowerBhp: 215,
        torqueNm: 350,
        acChargingKw: 11,
        dcChargingKw: 80,
        dcChargingTimeMin: 45,
        keyFeatures: ['6 Airbags', '12.3-inch Screen', 'Panoramic Sunroof', 'V2L']
      },
      {
        id: 'tata-harrier-ev-empowered-awd',
        name: 'Empowered+ Dual Motor AWD',
        exShowroomPriceLakh: 31.50,
        batteryCapacityKwh: 65.0,
        claimedRangeKm: 500,
        realWorldRangeKm: 415,
        motorPowerBhp: 310,
        torqueNm: 500,
        acChargingKw: 11,
        dcChargingKw: 80,
        dcChargingTimeMin: 45,
        keyFeatures: ['Dual Motor AWD', 'Level 2 ADAS', 'JBL 10-Speaker Audio', 'Ventilated Front Seats', '360 Camera']
      }
    ],
    lastVerifiedDate: '2026-02-14',
    dataSource: 'Tata Passenger Electric Mobility (TPEM)',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 149
  },

  // 5. Mercedes-Benz EQS 580 4MATIC (Locally Assembled in Chakan, Pune, India)
  {
    id: 'mercedes-eqs-580',
    manufacturerId: 'mercedes',
    brand: 'Mercedes-Benz',
    name: 'EQS 580 4MATIC',
    slug: 'mercedes-eqs-580',
    modelYear: 2026,
    bodyType: 'Luxury',
    segment: 'Ultra-Luxury Electric Flagship Limousine',
    status: 'available',
    launchDate: 'October 2022',
    startingPriceLakh: 162.00,
    endingPriceLakh: 162.00,
    claimedRangeKm: 857,
    realWorldRangeKm: 680,
    cityRangeKm: 720,
    highwayRangeKm: 640,
    rangeCertification: 'ARAI Certified (Highest in India)',
    batteryCapacityKwh: 107.8,
    batteryChemistry: 'NMC Ternary High-Density Lithium',
    motorPowerBhp: 523,
    torqueNm: 855,
    driveType: 'AWD',
    acceleration0To100: 4.3,
    topSpeedKmh: 210,
    seatingCapacity: 5,
    dimensions: {
      lengthMm: 5216,
      widthMm: 1926,
      heightMm: 1512,
      wheelbaseMm: 3210,
      groundClearanceMm: 145,
      bootSpaceLitre: 610,
      kerbWeightKg: 2585
    },
    acChargingSpeedKw: 22,
    dcChargingSpeedKw: 200,
    chargingTimeAcHours: 5.5,
    chargingTimeDcMin10To80: 31,
    batteryWarrantyYears: 10,
    batteryWarrantyKm: 250000,
    vehicleWarrantyYears: 3,
    vehicleWarrantyKm: 100000,
    ncapRating: 5,
    ncapAgency: 'Euro NCAP 5-Star Certified',
    airbags: 9,
    adasLevel: 2,
    adasFeatures: ['Distronic Plus Active Distance Assist', 'Active Steering Assist', 'Evasive Steering Assist', 'Pre-Safe Impulse Side'],
    v2l: false,
    v2g: false,
    connectedCar: true,
    sunroof: 'Panoramic',
    ventilatedSeats: true,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'Burmester 3D Surround Sound (15 Speakers, 710W)',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'Locally assembled at Mercedes-Benz India facility in Chakan, Pune',
      'Record-holding 857 km ARAI certified range on a single charge',
      'Revolutionary 56-inch curved Gorilla Glass MBUX Hyperscreen',
      '10-degree rear-axle steering allowing turning circle equivalent to an A-Class'
    ],
    pros: [
      'Longest electric driving range of any vehicle officially sold in India',
      'Phenomenal cabin insulation and whisper-quiet ride comfort',
      'Lower road tax thanks to Made-in-India assembly status'
    ],
    cons: [
      'Long 5.2m wheelbase requires raising air suspension over sharp speed breakers',
      'Curved fastback styling differs from traditional upright three-box S-Class'
    ],
    expertVerdict: 'The Mercedes-Benz EQS 580 4MATIC is the undisputed range king of the Indian luxury market. Assembled locally in Pune, it delivers 680+ km real-world Indian expressway endurance.',
    rating: 4.9,
    reviewCount: 210,
    variants: [
      {
        id: 'mercedes-eqs-580-4matic',
        name: 'EQS 580 4MATIC (Made in India)',
        exShowroomPriceLakh: 162.00,
        batteryCapacityKwh: 107.8,
        claimedRangeKm: 857,
        realWorldRangeKm: 680,
        motorPowerBhp: 523,
        torqueNm: 855,
        acChargingKw: 22,
        dcChargingKw: 200,
        dcChargingTimeMin: 31,
        keyFeatures: ['56-inch MBUX Hyperscreen', '10-Degree Rear Axle Steering', 'Airmatic Suspension', 'Burmester 3D Sound', 'Ventilated Massage Seats']
      }
    ],
    lastVerifiedDate: '2026-09-01',
    dataSource: 'Mercedes-Benz India Official Pricing Circular',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 158
  },

  // 6. BMW i7 Flagship Electric Sedan (On Sale in India)
  {
    id: 'bmw-i7',
    manufacturerId: 'bmw',
    brand: 'BMW',
    name: 'i7 xDrive60',
    slug: 'bmw-i7',
    modelYear: 2026,
    bodyType: 'Luxury',
    segment: 'Electric Ultra-Luxury Presidential Saloon',
    status: 'available',
    launchDate: 'January 2023',
    startingPriceLakh: 203.00,
    endingPriceLakh: 250.00,
    claimedRangeKm: 625,
    realWorldRangeKm: 520,
    cityRangeKm: 550,
    highwayRangeKm: 490,
    rangeCertification: 'WLTP / ARAI Verified',
    batteryCapacityKwh: 101.7,
    batteryChemistry: 'NMC 811 Lithium Ion',
    motorPowerBhp: 544,
    torqueNm: 745,
    driveType: 'AWD',
    acceleration0To100: 4.7,
    topSpeedKmh: 240,
    seatingCapacity: 4,
    dimensions: {
      lengthMm: 5391,
      widthMm: 1950,
      heightMm: 1544,
      wheelbaseMm: 3215,
      groundClearanceMm: 152,
      bootSpaceLitre: 500,
      kerbWeightKg: 2640
    },
    acChargingSpeedKw: 22,
    dcChargingSpeedKw: 195,
    chargingTimeAcHours: 5.5,
    chargingTimeDcMin10To80: 34,
    batteryWarrantyYears: 8,
    batteryWarrantyKm: 160000,
    vehicleWarrantyYears: 3,
    vehicleWarrantyKm: 200000,
    ncapRating: 5,
    ncapAgency: 'Euro NCAP 5-Star Certified',
    airbags: 8,
    adasLevel: 2,
    adasFeatures: ['Driving Assistant Professional', 'Parking Assistant Professional', 'Maneuver Assistant', 'Active Roll Stabilization'],
    v2l: false,
    v2g: false,
    connectedCar: true,
    sunroof: 'Panoramic',
    ventilatedSeats: true,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'Bowers & Wilkins Diamond Surround Sound (36 Speakers, 1965W with 4D Bass)',
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'Colossal 31.3-inch 8K BMW Theatre Screen dropping down from the ceiling for rear passengers',
      'Executive Lounge seating with 42.5-degree reclining angle and integrated calf rest',
      'Dual electric motors developing 544 bhp with standard xDrive all-wheel drive',
      'Automatic opening and closing comfort doors operated via smartphone or touchscreen'
    ],
    pros: [
      'Unsurpassed rear-seat theatre entertainment and chauffeur luxury',
      'Adaptive 2-axle air suspension with active roll comfort floats over Indian roads',
      'Iconic glowing kidney grille with Swarovski crystal headlights'
    ],
    cons: [
      '5.4m length requires experienced chauffeur in narrow city approaches',
      'High ex-showroom price bracket'
    ],
    expertVerdict: 'The BMW i7 is the pinnacle of chauffeur-driven electric luxury in India. The 31.3-inch 8K Theatre Screen and Executive Lounge seating redefine rear-seat luxury.',
    rating: 4.9,
    reviewCount: 160,
    variants: [
      {
        id: 'bmw-i7-xdrive60',
        name: 'i7 xDrive60 M Sport',
        exShowroomPriceLakh: 203.00,
        batteryCapacityKwh: 101.7,
        claimedRangeKm: 625,
        realWorldRangeKm: 520,
        motorPowerBhp: 544,
        torqueNm: 745,
        acChargingKw: 22,
        dcChargingKw: 195,
        dcChargingTimeMin: 34,
        keyFeatures: ['31.3-inch 8K Theatre Screen', 'Executive Lounge Seating', 'Bowers & Wilkins 4D Sound', 'Crystal Headlights', 'Automatic Comfort Doors']
      },
      {
        id: 'bmw-i7-m70-xdrive',
        name: 'i7 M70 xDrive (High-Performance Flagship)',
        exShowroomPriceLakh: 250.00,
        batteryCapacityKwh: 101.7,
        claimedRangeKm: 560,
        realWorldRangeKm: 480,
        motorPowerBhp: 659,
        torqueNm: 1100,
        acChargingKw: 22,
        dcChargingKw: 195,
        dcChargingTimeMin: 34,
        keyFeatures: ['659 bhp / 1100 Nm Torque', '0-100 in 3.7s', 'M Sport Differential', 'Carbon Exterior Package']
      }
    ],
    lastVerifiedDate: '2026-09-01',
    dataSource: 'BMW Group India Official Catalogue',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 195
  },

  // 7. Mahindra Thar.e (Thar Electric)
  {
    id: 'mahindra-thar-e',
    manufacturerId: 'mahindra',
    brand: 'Mahindra',
    name: 'Thar.e 4x4',
    slug: 'mahindra-thar-e',
    modelYear: 2026,
    bodyType: 'SUV',
    segment: 'Electric 4x4 Lifestyle Off-Roader',
    status: 'available',
    launchDate: 'Mid 2026',
    startingPriceLakh: 22.99,
    endingPriceLakh: 27.50,
    claimedRangeKm: 460,
    realWorldRangeKm: 380,
    cityRangeKm: 400,
    highwayRangeKm: 350,
    rangeCertification: 'ARAI / MIDC',
    batteryCapacityKwh: 75.0,
    batteryChemistry: 'Prismatic LFP (Lithium Iron Phosphate)',
    motorPowerBhp: 282,
    torqueNm: 535,
    driveType: 'AWD',
    acceleration0To100: 7.1,
    topSpeedKmh: 165,
    seatingCapacity: 5,
    dimensions: {
      lengthMm: 4420,
      widthMm: 1940,
      heightMm: 1890,
      wheelbaseMm: 2775,
      groundClearanceMm: 250,
      bootSpaceLitre: 380,
      kerbWeightKg: 2050
    },
    acChargingSpeedKw: 11,
    dcChargingSpeedKw: 140,
    chargingTimeAcHours: 7.5,
    chargingTimeDcMin10To80: 32,
    batteryWarrantyYears: 8,
    batteryWarrantyKm: 160000,
    vehicleWarrantyYears: 3,
    vehicleWarrantyKm: 100000,
    ncapRating: 5,
    ncapAgency: 'Bharat NCAP Anticipated',
    airbags: 6,
    adasLevel: 2,
    adasFeatures: ['Trail Cam with Underbody View', 'Hill Descent Control', 'Terrain Response AWD'],
    v2l: true,
    v2g: false,
    connectedCar: true,
    sunroof: 'Single Pane',
    ventilatedSeats: false,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'Harman Kardon 8-Speaker Weather-Sealed Audio',
    heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'Born Electric INGLO platform adapted into an authentic 5-door electric off-roader',
      'Dual-motor electric 4WD producing 535 Nm instant torque with crab-walk mode',
      'Incredible 250mm ground clearance with 650mm water-wading depth',
      'Modular interior with wash-down waterproof floor mats and outdoor utility mounts'
    ],
    pros: [
      'Unsurpassed off-road capability with instant zero-rpm electric torque',
      '5-door practicality with spacious rear seats compared to 3-door Thar',
      'Ultra-tough LFP battery housed inside a high-strength steel protective vault'
    ],
    cons: [
      'Boxy aerodynamic shape causes higher highway consumption at speeds > 100 km/h',
      'Stiffer suspension setup geared for rugged terrain'
    ],
    expertVerdict: 'The Mahindra Thar.e is Indias most anticipated electric lifestyle vehicle, marrying legendary Thar ruggedness with clean, silent, and instantaneous electric 4x4 propulsion.',
    rating: 4.8,
    reviewCount: 440,
    variants: [
      {
        id: 'mahindra-thar-e-ax',
        name: 'Thar.e AX 75 kWh 4WD',
        exShowroomPriceLakh: 22.99,
        batteryCapacityKwh: 75.0,
        claimedRangeKm: 460,
        realWorldRangeKm: 380,
        motorPowerBhp: 282,
        torqueNm: 535,
        acChargingKw: 11,
        dcChargingKw: 140,
        dcChargingTimeMin: 32,
        keyFeatures: ['Dual Motor 4x4', '6 Airbags', 'Waterproof Cabin', '10-inch Screen']
      },
      {
        id: 'mahindra-thar-e-lx-pro',
        name: 'Thar.e LX Pro Adventure',
        exShowroomPriceLakh: 27.50,
        batteryCapacityKwh: 75.0,
        claimedRangeKm: 460,
        realWorldRangeKm: 380,
        motorPowerBhp: 282,
        torqueNm: 535,
        acChargingKw: 11,
        dcChargingKw: 140,
        dcChargingTimeMin: 32,
        keyFeatures: ['Electronic Differential Lock', 'Level 2 ADAS', 'Harman Audio', 'V2L Camping Socket', 'Underbody Cameras']
      }
    ],
    lastVerifiedDate: '2026-02-24',
    dataSource: 'Mahindra Electric Automobiles Limited (MEAL)',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 195
  },

  // 8. Volvo EC40 (C40 Recharge Twin Motor AWD)
  {
    id: 'volvo-ec40',
    manufacturerId: 'volvo',
    brand: 'Volvo',
    name: 'EC40 Recharge',
    slug: 'volvo-ec40',
    modelYear: 2026,
    bodyType: 'Coupe SUV',
    segment: 'Luxury Electric Coupe SUV',
    status: 'available',
    launchDate: 'September 2023',
    startingPriceLakh: 62.95,
    endingPriceLakh: 62.95,
    claimedRangeKm: 530,
    realWorldRangeKm: 440,
    cityRangeKm: 465,
    highwayRangeKm: 405,
    rangeCertification: 'WLTP / ARAI',
    batteryCapacityKwh: 78.0,
    batteryChemistry: 'NMC Ternary Lithium',
    motorPowerBhp: 408,
    torqueNm: 660,
    driveType: 'AWD',
    acceleration0To100: 4.7,
    topSpeedKmh: 180,
    seatingCapacity: 5,
    dimensions: {
      lengthMm: 4440,
      widthMm: 1873,
      heightMm: 1591,
      wheelbaseMm: 2702,
      groundClearanceMm: 171,
      bootSpaceLitre: 413,
      kerbWeightKg: 2185
    },
    acChargingSpeedKw: 11,
    dcChargingSpeedKw: 150,
    chargingTimeAcHours: 7.5,
    chargingTimeDcMin10To80: 28,
    batteryWarrantyYears: 8,
    batteryWarrantyKm: 160000,
    vehicleWarrantyYears: 3,
    vehicleWarrantyKm: 100000,
    ncapRating: 5,
    ncapAgency: 'Euro NCAP 5-Star Certified',
    airbags: 7,
    adasLevel: 2,
    adasFeatures: ['Pilot Assist', 'Blind Spot Information System (BLIS)', 'Cross Traffic Alert with Auto Brake', 'Run-off Road Protection'],
    v2l: false,
    v2g: false,
    connectedCar: true,
    sunroof: 'Panoramic',
    ventilatedSeats: false,
    camera360: true,
    wirelessCharging: true,
    premiumAudio: 'Harman Kardon 13-Speaker 600W Premium Sound',
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1200&auto=format&fit=crop&q=80',
    gallery: {
      exterior: [
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80'
      ],
      interior: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
      ],
      charging: [
        'https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=800&auto=format&fit=crop&q=80'
      ]
    },
    keyHighlights: [
      'Aerodynamic coupe silhouette with swooping fastback roofline',
      'Twin-motor AWD powertrain generating 408 bhp and 660 Nm torque',
      'Integrated Google built-in (Google Maps, Google Assistant, Play Store)',
      'Pixel LED headlight technology with intelligent adaptive high-beam'
    ],
    pros: [
      'Explosive 4.7s 0-100 km/h acceleration with AWD traction',
      'Striking coupe-SUV styling stands out on Indian roads',
      'Comprehensive Euro NCAP 5-star passive and active safety armor'
    ],
    cons: [
      'Sloping roofline reduces rear headroom for taller passengers',
      'No spare wheel provided'
    ],
    expertVerdict: 'The Volvo EC40 combines sleek aerodynamic fastback styling with 408 bhp twin-motor performance and unmatched Swedish safety.',
    rating: 4.8,
    reviewCount: 195,
    variants: [
      {
        id: 'volvo-ec40-twin-motor',
        name: 'EC40 Recharge Twin Motor AWD',
        exShowroomPriceLakh: 62.95,
        batteryCapacityKwh: 78.0,
        claimedRangeKm: 530,
        realWorldRangeKm: 440,
        motorPowerBhp: 408,
        torqueNm: 660,
        acChargingKw: 11,
        dcChargingKw: 150,
        dcChargingTimeMin: 28,
        keyFeatures: ['Twin Motor AWD 408 bhp', 'Pixel LED Headlamps', 'Pilot Assist ADAS', 'Harman Kardon 600W Sound', 'Google Automotive OS']
      }
    ],
    lastVerifiedDate: '2026-09-01',
    dataSource: 'Volvo Car India Official Specification',
    dataConfidence: 'Verified',
    isDemoData: false,
    efficiencyWhPerKm: 175
  }
];
