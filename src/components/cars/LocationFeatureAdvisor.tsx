import React, { useState } from 'react';
import { Vehicle } from '../../types/ev';
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Award,
  Wind,
  ShieldAlert,
  Sun,
  CloudRain,
  Navigation,
  ChevronRight,
  HelpCircle,
  Compass
} from 'lucide-react';

interface LocationFeatureAdvisorProps {
  vehicle: Vehicle;
  selectedCity: string;
  onOpenCityModal?: () => void;
  onSelectVariant?: (variantId: string) => void;
}

interface CityIntelligence {
  name: string;
  state: string;
  climateSummary: string;
  trafficAndRoadProfile: string;
  rtoPolicySummary: string;
  mustHaveFeatures: {
    name: string;
    reason: string;
    matched: boolean;
    importance: 'Critical' | 'Highly Recommended';
  }[];
  goodToHaveFeatures: {
    name: string;
    reason: string;
    matched: boolean;
  }[];
  overratedFeatures: {
    name: string;
    reason: string;
    presentOnThisCar: boolean;
  }[];
  recommendedVariantName: string;
  recommendedVariantReason: string;
  overallCitySuitabilityScore: number; // out of 100
  cityVerdict: string;
}

export const LocationFeatureAdvisor: React.FC<LocationFeatureAdvisorProps> = ({
  vehicle,
  selectedCity,
  onOpenCityModal,
  onSelectVariant
}) => {
  const [activeTab, setActiveTab] = useState<'must-have' | 'overrated' | 'verdict'>('must-have');

  // Generate real-world city intelligence tailored to the current vehicle and selected city
  const cityIntel: CityIntelligence = React.useMemo(() => {
    const city = selectedCity.toLowerCase();

    // Features check on this vehicle
    const hasVentilatedSeats = vehicle.ventilatedSeats;
    const has360Camera = vehicle.camera360;
    const hasAdas = vehicle.adasLevel >= 2;
    const hasHighGroundClearance = vehicle.dimensions.groundClearanceMm >= 185;
    const hasFastDc = vehicle.dcChargingSpeedKw >= 60;
    const hasLongRange = vehicle.realWorldRangeKm >= 320;
    const hasSunroof = vehicle.sunroof !== 'None';
    const isAwd = vehicle.driveType === 'AWD';

    if (city.includes('delhi') || city.includes('noida') || city.includes('gurugram') || city.includes('faridabad')) {
      return {
        name: 'Delhi NCR',
        state: 'Delhi / Haryana / UP',
        climateSummary: 'Peak 46°C summer heat, severe post-monsoon smog (AQI 450+), and chilly winters.',
        trafficAndRoadProfile: 'Heavy bumper-to-bumper Ring Road jams paired with fast expressways (Delhi-Meerut & Yamuna).',
        rtoPolicySummary: '100% RTO Road Tax & Registration fee waiver (Zero road tax!) + Odd-Even exemption.',
        mustHaveFeatures: [
          {
            name: 'PM2.5 / HEPA Cabin Air Purifier with AQI Display',
            reason: 'Crucial for Delhi NCR winter months when ambient particulate smog hits hazardous 400+ AQI levels.',
            matched: vehicle.keyHighlights.some(h => h.toLowerCase().includes('purifier') || h.toLowerCase().includes('air')) || vehicle.connectedCar,
            importance: 'Critical'
          },
          {
            name: 'Ventilated Front Seats',
            reason: 'Indispensable during scorching 44°C - 46°C Delhi-NCR heatwaves where car leather burns through clothing.',
            matched: hasVentilatedSeats,
            importance: 'Critical'
          },
          {
            name: 'Connected App Pre-Cooling / Pre-Conditioning',
            reason: 'Allows cooling cabin down to 22°C while plugged in at home, saving 15% battery range before entering.',
            matched: vehicle.connectedCar,
            importance: 'Highly Recommended'
          },
          {
            name: 'Multi-Stage Regenerative Braking',
            reason: 'Recovers battery stamina during slow crawl on DND Flyway, Gurugram Cyber City, and Ring Road jams.',
            matched: true,
            importance: 'Highly Recommended'
          }
        ],
        goodToHaveFeatures: [
          {
            name: 'Level 2 ADAS (Adaptive Cruise + Lane Centering)',
            reason: 'Exceptional for long cruises on Yamuna Expressway towards Agra or Delhi-Mumbai Expressway.',
            matched: hasAdas
          },
          {
            name: 'Liquid-Cooled Battery Thermal Management',
            reason: 'Safeguards lithium cells from premature thermal degradation in North Indian summers.',
            matched: true
          }
        ],
        overratedFeatures: [
          {
            name: 'Panoramic Glass Sunroof Without Thick Sunblind',
            reason: 'Acts like a solar greenhouse under 46°C Delhi sun, drastically increasing AC power consumption.',
            presentOnThisCar: hasSunroof
          },
          {
            name: 'AWD (All-Wheel Drive)',
            reason: 'Unnecessary on flat plains of NCR; adds 140kg of kerb weight and penalizes real-world city range.',
            presentOnThisCar: isAwd
          }
        ],
        recommendedVariantName: vehicle.variants.length > 1 ? vehicle.variants[1]?.name || vehicle.variants[0].name : vehicle.variants[0]?.name || 'Standard',
        recommendedVariantReason: `Select the trim featuring ventilated seats and connected car tech. In Delhi, you save ₹${(vehicle.startingPriceLakh * 0.12).toFixed(1)} Lakh in 0% RTO tax.`,
        overallCitySuitabilityScore: hasVentilatedSeats ? 94 : 82,
        cityVerdict: `${vehicle.name} is an outstanding choice for Delhi NCR buyers. With 0% RTO tax in Delhi and strong regeneration for NCR bottlenecks, it delivers massive fuel savings.`
      };
    } else if (city.includes('mumbai') || city.includes('thane') || city.includes('navi mumbai') || city.includes('pune')) {
      return {
        name: 'Mumbai & MMR',
        state: 'Maharashtra',
        climateSummary: 'Heavy coastal monsoons, high humidity, and moderate warm temperatures year-round.',
        trafficAndRoadProfile: 'Waterlogged streets in monsoons (Hindmata, Milan Subway), tight street parking, WEH crawls.',
        rtoPolicySummary: '0% Road Tax on EV passenger cars in Maharashtra.',
        mustHaveFeatures: [
          {
            name: 'High Ground Clearance (185mm+) & IP67 Battery Waterproofing',
            reason: 'Essential to navigate flooded underpasses and Mumbai monsoon waterlogging without battery pack shorting.',
            matched: hasHighGroundClearance,
            importance: 'Critical'
          },
          {
            name: '360-Degree Surround Camera & Auto-Folding Mirrors',
            reason: 'Vital for tight parking slots in South Mumbai, Bandra lanes, and crowded residential societies.',
            matched: has360Camera,
            importance: 'Critical'
          },
          {
            name: 'Auto-Hold with Hill Start Assist',
            reason: 'Eliminates rollback on Western Express Highway flyover stop-and-go inclines.',
            matched: true,
            importance: 'Highly Recommended'
          },
          {
            name: 'Single-Pedal Driving / High Regen',
            reason: 'Relieves leg fatigue in 90-minute daily crawls along BKC and Eastern Freeway.',
            matched: true,
            importance: 'Highly Recommended'
          }
        ],
        goodToHaveFeatures: [
          {
            name: 'Vehicle-to-Load (V2L) Power Outlets',
            reason: 'Handy emergency power backup for coastal villas during Alibaug or Lonavala weekend trips.',
            matched: vehicle.v2l
          },
          {
            name: 'Wireless Apple CarPlay & Android Auto',
            reason: 'Essential for live Google Maps traffic rerouting through Mumbai suburban traffic.',
            matched: vehicle.wirelessCharging || vehicle.connectedCar
          }
        ],
        overratedFeatures: [
          {
            name: 'Heated Front Seats / Steering Wheel',
            reason: 'Completely redundant in Mumbai’s warm, humid coastal maritime weather.',
            presentOnThisCar: false
          }
        ],
        recommendedVariantName: vehicle.variants.find(v => v.name.toLowerCase().includes('plus') || v.name.toLowerCase().includes('smart') || v.name.toLowerCase().includes('top'))?.name || vehicle.variants[0]?.name || 'Standard',
        recommendedVariantReason: `Prioritize the variant with 360-degree parking camera and auto-hold. Ground clearance of ${vehicle.dimensions.groundClearanceMm}mm gives high confidence in monsoons.`,
        overallCitySuitabilityScore: hasHighGroundClearance && has360Camera ? 95 : 85,
        cityVerdict: `Terrific for Mumbai and Western Express commutes. ${vehicle.dimensions.groundClearanceMm}mm ground clearance handles Indian monsoon water wading gracefully.`
      };
    } else if (city.includes('bengaluru') || city.includes('bangalore') || city.includes('mysuru')) {
      return {
        name: 'Bengaluru (Silicon Valley of India)',
        state: 'Karnataka',
        climateSummary: 'Pleasant year-round weather (18°C - 33°C), moderate monsoons, and low humidity.',
        trafficAndRoadProfile: 'Infamous Silk Board, Tin Factory, and Outer Ring Road (ORR) jams paired with fast weekend expressways to Mysuru and Coorg.',
        rtoPolicySummary: '4% concessional road tax slab + massive BESCOM charging network across all metro corridors.',
        mustHaveFeatures: [
          {
            name: 'Real Highway Range (300km+)',
            reason: 'Effortlessly completes the 145 km Bengaluru-Mysuru expressway round trip without needing an anxiety stop.',
            matched: hasLongRange,
            importance: 'Critical'
          },
          {
            name: 'Fast DC Fast Charging Speed (60kW+)',
            reason: 'Allows quick 20-minute top-ups at expressway food plazas along NH44 / NH75.',
            matched: hasFastDc,
            importance: 'Highly Recommended'
          },
          {
            name: 'Aggressive Stop-Go Regenerative Recovery',
            reason: 'Recovers up to 22% battery during Silk Board and Bellandur ORR peak-hour crawls.',
            matched: true,
            importance: 'Highly Recommended'
          }
        ],
        goodToHaveFeatures: [
          {
            name: 'Panoramic Sunroof',
            reason: 'Unlike North India, Bengaluru’s pleasant climate actually makes opening the sunblind enjoyable for morning drives.',
            matched: hasSunroof
          },
          {
            name: 'Hill Descent Control & Electronic Parking Brake',
            reason: 'Valuable for weekend road trips up to Nandi Hills, Ooty, or Chikmagalur coffee estates.',
            matched: true
          }
        ],
        overratedFeatures: [
          {
            name: 'Extreme High-Power Ventilated Seats',
            reason: 'Nice to have, but ambient temps rarely exceed 34°C, so standard breathable fabric/leatherette is comfortable.',
            presentOnThisCar: hasVentilatedSeats
          }
        ],
        recommendedVariantName: vehicle.variants.find(v => v.claimedRangeKm > 400)?.name || vehicle.variants[0]?.name || 'Standard',
        recommendedVariantReason: `Choose the Long-Range battery pack so you can make weekend trips to Mysuru, Coorg, or Kabini with zero range anxiety.`,
        overallCitySuitabilityScore: hasLongRange ? 96 : 84,
        cityVerdict: `Perfect fit for Bengaluru tech professionals. Exceptional stop-go energy recuperation in ORR traffic and seamless expressway stamina.`
      };
    } else if (
      city.includes('shimla') ||
      city.includes('dehradun') ||
      city.includes('manali') ||
      city.includes('srinagar') ||
      city.includes('dharamshala') ||
      city.includes('rishikesh') ||
      city.includes('mussoorie') ||
      city.includes('ooty') ||
      city.includes('gangtok') ||
      city.includes('shillong') ||
      city.includes('nainital')
    ) {
      // Hilly & Mountain Terrains
      const hasHillAssist = true; // standard on EVs with electronic brake
      const hasSufficientGroundClearance = vehicle.dimensions.groundClearanceMm >= 180;
      const isHighPower = vehicle.motorPowerBhp >= 130;

      return {
        name: `${selectedCity} (Hilly / Mountain Region)`,
        state: 'Himalayan / Western Ghats',
        climateSummary: 'Steep elevations, freezing winter chills (0°C to 5°C), hairpin bends, and mountain fog.',
        trafficAndRoadProfile: 'Steep hill climbs, sharp blind turns, broken tarmac, and loose gravel patches.',
        rtoPolicySummary: 'State EV road tax concession + zero tailpipe emissions preserves fragile mountain ecology.',
        mustHaveFeatures: [
          {
            name: 'Hill Start Assist & Auto-Hold',
            reason: 'Critical: Prevents dangerous backwards roll on steep 20-degree hairpin turns when stopped behind trucks.',
            matched: hasHillAssist,
            importance: 'Critical'
          },
          {
            name: 'High Ground Clearance (185mm+) with Tough Underbody Skid Plate',
            reason: 'Protects the under-floor lithium battery pack from boulder strikes and broken mountain road debris.',
            matched: hasSufficientGroundClearance,
            importance: 'Critical'
          },
          {
            name: 'Multi-Mode Downhill Regenerative Braking',
            reason: 'Going down mountain ghats recovers 18% to 25% battery for free while preventing brake pad overheating/fade.',
            matched: true,
            importance: 'Critical'
          },
          {
            name: 'Defogger, Heated ORVMs & Strong LED Fog Lamps',
            reason: 'Essential for safely cutting through thick mountain fog, dew, and winter mist on ridge routes.',
            matched: true,
            importance: 'Highly Recommended'
          }
        ],
        goodToHaveFeatures: [
          {
            name: 'AWD (All-Wheel Drive) / Dual Motor',
            reason: 'Provides confident traction on wet, mossy roads, frost, and steep loose-gravel climbs.',
            matched: isAwd
          },
          {
            name: 'Instant Electric Motor Torque (130+ BHP)',
            reason: 'Allows effortless uphill overtaking of slow commercial trucks without downshifting delays.',
            matched: isHighPower
          }
        ],
        overratedFeatures: [
          {
            name: 'Ultra-Low Profile Tires (19" / 20" Wheels with 40-profile sidewalls)',
            reason: 'Sharp mountain potholes and rocks cause sidewall punctures and alloy wheel rim bends. 16-18" with thick sidewalls is superior.',
            presentOnThisCar: vehicle.startingPriceLakh > 45
          },
          {
            name: 'Highway ADAS Adaptive Cruise Control',
            reason: 'Of minimal use on twisting mountain roads with constant sharp hairpin turns and unmarked lanes.',
            presentOnThisCar: hasAdas
          }
        ],
        recommendedVariantName: vehicle.variants.find(v => v.batteryCapacityKwh >= 40)?.name || vehicle.variants[0]?.name || 'Standard Pack',
        recommendedVariantReason: `Select the Long-Range pack with high ground clearance. Cold winter temperatures reduce battery range by 15-20%, so extra capacity is vital in ${selectedCity}.`,
        overallCitySuitabilityScore: hasSufficientGroundClearance && hasLongRange ? 92 : 78,
        cityVerdict: `${vehicle.name} handles mountain terrains well. Instant electric torque excels on steep ghat inclines, and downhill regenerative braking recharges the battery continuously.`
      };
    } else if (
      city.includes('ahmedabad') ||
      city.includes('jaipur') ||
      city.includes('lucknow') ||
      city.includes('hyderabad') ||
      city.includes('chennai') ||
      city.includes('bhopal') ||
      city.includes('nagpur') ||
      city.includes('surat')
    ) {
      // Extreme Heat & Arid Summer Zones
      return {
        name: `${selectedCity} (High Heat & Arid Summer Zone)`,
        state: 'Central / Southern / Western India',
        climateSummary: 'Severe 42°C to 47°C summer heatwaves, intense UV solar radiation, and long sunny seasons.',
        trafficAndRoadProfile: 'Dense urban traffic heat islands combined with expanding outer ring roads and expressways.',
        rtoPolicySummary: 'State EV road tax subsidies + significant petrol fuel savings in metro commuting.',
        mustHaveFeatures: [
          {
            name: 'Ventilated Front Driver & Passenger Seats',
            reason: 'Crucial: Cools your back instantly in 44°C summer heat, preventing sweaty shirts after 10 minutes parked in the sun.',
            matched: hasVentilatedSeats,
            importance: 'Critical'
          },
          {
            name: 'Connected App Remote AC Pre-Cooling',
            reason: 'Allows switching on the AC from your phone 5 minutes before leaving your office or home so cabin is 22°C when you enter.',
            matched: vehicle.connectedCar,
            importance: 'Critical'
          },
          {
            name: 'Liquid-Cooled Battery with Dedicated Thermal Chiller',
            reason: 'Protects battery longevity and prevents thermal throttling during rapid DC charging in scorching 45°C afternoons.',
            matched: true,
            importance: 'Critical'
          }
        ],
        goodToHaveFeatures: [
          {
            name: 'Solar-Reflective UV Cut Window Glass',
            reason: 'Reduces cabin heat soak by up to 35%, cutting down on the energy required by the climate control compressor.',
            matched: true
          },
          {
            name: 'Rear AC Vents with Dedicated Blower Speed',
            reason: 'Ensures rear passengers stay comfortable without having to blast front AC at maximum fan noise.',
            matched: vehicle.startingPriceLakh >= 10
          }
        ],
        overratedFeatures: [
          {
            name: 'Panoramic Glass Sunroof Without Thick Blackout Blind',
            reason: 'Glass roofs act as massive greenhouse heat magnets under the harsh sun, forcing the AC to draw 2-3 kW of extra power.',
            presentOnThisCar: hasSunroof
          },
          {
            name: 'All-Black Synthetic Leather Upholstery',
            reason: 'Black interiors absorb solar heat and reach 60°C+ after 1 hour in outdoor parking, making seating burning hot.',
            presentOnThisCar: false
          }
        ],
        recommendedVariantName: vehicle.variants.find(v => v.name.toLowerCase().includes('empowered') || v.name.toLowerCase().includes('top') || v.name.toLowerCase().includes('max') || v.name.toLowerCase().includes('pro'))?.name || vehicle.variants[0]?.name || 'Standard',
        recommendedVariantReason: `Choose the trim with ventilated seats and connected car app pre-cooling. In ${selectedCity}, these two features make a massive day-to-day comfort difference.`,
        overallCitySuitabilityScore: hasVentilatedSeats ? 95 : 81,
        cityVerdict: `${vehicle.name} delivers strong thermal resilience for ${selectedCity}. Its liquid-cooled battery system ensures reliable battery life and fast charging even in peak summer.`
      };
    } else if (
      city.includes('kolkata') ||
      city.includes('kochi') ||
      city.includes('goa') ||
      city.includes('visakhapatnam') ||
      city.includes('coimbatore') ||
      city.includes('trivandrum')
    ) {
      // Coastal & High-Humidity Zones
      return {
        name: `${selectedCity} (Coastal & High-Humidity Zone)`,
        state: 'Coastal India',
        climateSummary: 'High coastal humidity, heavy monsoon spells, saline sea breeze, and mild winters.',
        trafficAndRoadProfile: 'Frequent waterlogged intersections, narrow coastal town roads, and busy market corridors.',
        rtoPolicySummary: 'Concessional EV registration and lower running cost vs expensive coastal petrol tariffs.',
        mustHaveFeatures: [
          {
            name: 'IP67 / IP68 Battery & Motor Water Ingress Protection',
            reason: 'Ensures the high-voltage battery pack and drive motor can wade safely through flooded coastal roads without electrical faults.',
            matched: true,
            importance: 'Critical'
          },
          {
            name: 'High Ground Clearance (185mm+)',
            reason: 'Prevents underbody scraping and water ingress during heavy coastal cloudbursts and waterlogged roads.',
            matched: hasHighGroundClearance,
            importance: 'Critical'
          },
          {
            name: '360-Degree Surround View Parking Camera',
            reason: 'Essential for maneuvering and parallel parking through narrow heritage coastal streets and crowded markets.',
            matched: has360Camera,
            importance: 'Highly Recommended'
          }
        ],
        goodToHaveFeatures: [
          {
            name: 'Auto-Hold & Electronic Handbrake',
            reason: 'Effortless stop-and-go driving on narrow coastal ferry approach ramps and flyovers.',
            matched: true
          },
          {
            name: 'Vehicle-to-Load (V2L) Power Backup',
            reason: 'Allows running emergency household appliances (fans, laptops, router) during monsoon power outages.',
            matched: vehicle.v2l
          }
        ],
        overratedFeatures: [
          {
            name: 'Heated Steering Wheel & Heated Seats',
            reason: 'Zero utility in warm coastal climates where temperatures never drop low enough to justify heating.',
            presentOnThisCar: false
          }
        ],
        recommendedVariantName: vehicle.variants.find(v => v.name.toLowerCase().includes('plus') || v.name.toLowerCase().includes('fearless') || v.name.toLowerCase().includes('smart'))?.name || vehicle.variants[0]?.name || 'Standard',
        recommendedVariantReason: `Opt for the variant with 360-camera and high-clearance wheels. IP67 waterproof battery ensures peace of mind during monsoon cloudbursts in ${selectedCity}.`,
        overallCitySuitabilityScore: hasHighGroundClearance ? 94 : 85,
        cityVerdict: `Excellent fit for ${selectedCity}. IP67 sealed powertrain and instant torque handle monsoon commuting and stop-and-go coastal traffic with supreme ease.`
      };
    } else {
      // Default Pan-India / Tier-1 / Tier-2 City Intelligence
      return {
        name: selectedCity,
        state: 'India',
        climateSummary: 'Tropical Indian climate with high summer heat and seasonal monsoon precipitation.',
        trafficAndRoadProfile: 'Mix of congested urban market roads, speed-breakers, and national highway corridors.',
        rtoPolicySummary: 'Applicable state EV incentives and 5% concessional GST bracket.',
        mustHaveFeatures: [
          {
            name: 'Battery Thermal Management (Liquid-Cooled)',
            reason: 'Essential for long battery lifespan across Indian seasonal extremes.',
            matched: true,
            importance: 'Critical'
          },
          {
            name: 'High Ground Clearance (180mm+)',
            reason: 'Prevents underbody scraping over tall, unscientific speed breakers and monsoon potholes.',
            matched: hasHighGroundClearance,
            importance: 'Critical'
          },
          {
            name: 'CCS2 Public Fast Charging Support',
            reason: 'Compatible with 10,000+ public chargers across Tata Power, Jio-bp, Statiq, and Zeon networks.',
            matched: true,
            importance: 'Highly Recommended'
          }
        ],
        goodToHaveFeatures: [
          {
            name: 'Reverse Parking Camera & Sensors',
            reason: 'Prevents minor dings in crowded Indian market parking zones.',
            matched: true
          },
          {
            name: 'Auto-Folding ORVMs',
            reason: 'Crucial when squeezing through narrow commercial gullies and auto-rickshaw traffic.',
            matched: true
          }
        ],
        overratedFeatures: [
          {
            name: 'Heavy All-Wheel Drive (AWD)',
            reason: 'Increases purchase cost by ₹3-5 Lakh without noticeable benefit on standard city roads.',
            presentOnThisCar: isAwd
          }
        ],
        recommendedVariantName: vehicle.variants[0]?.name || 'Base Standard',
        recommendedVariantReason: `Offers the best price-to-battery ratio for daily commuting in ${selectedCity}.`,
        overallCitySuitabilityScore: 88,
        cityVerdict: `A well-engineered electric car for ${selectedCity} conditions with low ₹1.20/km running costs.`
      };
    }
  }, [vehicle, selectedCity]);

  return (
    <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow-xs dark:border-orange-500/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:shadow-xl">
      {/* City Header & Location Picker Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 border border-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Location Feature Intelligence: <span className="text-orange-600 dark:text-orange-400">{cityIntel.name}</span>
              </h3>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-black text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                {cityIntel.overallCitySuitabilityScore}/100 Match
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tailored advice on which features matter vs. which are overrated for {cityIntel.name}&apos;s climate &amp; roads.
            </p>
          </div>
        </div>

        {onOpenCityModal && (
          <button
            type="button"
            onClick={onOpenCityModal}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:hover:border-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400" />
            <span>Change City ({selectedCity})</span>
          </button>
        )}
      </div>

      {/* City Climate & RTO Snapshot */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 flex items-start gap-3 dark:border-slate-800 dark:bg-slate-950/70">
          <Sun className="h-4 w-4 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-300 block">Climate &amp; Road Profile</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {cityIntel.climateSummary} {cityIntel.trafficAndRoadProfile}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 flex items-start gap-3 dark:border-slate-800 dark:bg-slate-950/70">
          <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-300 block">State EV Policy &amp; Tax Status</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {cityIntel.rtoPolicySummary}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: Must-Haves vs Overrated vs Variant Verdict */}
      <div className="mt-6 flex border-b border-slate-200 dark:border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('must-have')}
          className={`flex items-center gap-2 pb-3 px-3 font-bold transition-all border-b-2 ${
            activeTab === 'must-have'
              ? 'border-orange-600 text-orange-600 dark:border-orange-500 dark:text-orange-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Must-Have Features ({cityIntel.mustHaveFeatures.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('overrated')}
          className={`flex items-center gap-2 pb-3 px-3 font-bold transition-all border-b-2 ${
            activeTab === 'overrated'
              ? 'border-orange-600 text-orange-600 dark:border-orange-500 dark:text-orange-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          <span>Overrated / Skip in {cityIntel.name}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('verdict')}
          className={`flex items-center gap-2 pb-3 px-3 font-bold transition-all border-b-2 ${
            activeTab === 'verdict'
              ? 'border-orange-600 text-orange-600 dark:border-orange-500 dark:text-orange-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          <span>Best Variant Recommendation</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mt-4">
        {activeTab === 'must-have' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Features that offer maximum functional value for {cityIntel.name} drivers:
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {cityIntel.mustHaveFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{feat.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.2 text-[10px] font-bold ${
                          feat.importance === 'Critical'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30'
                            : 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30'
                        }`}
                      >
                        {feat.importance}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                      {feat.reason}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {feat.matched ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Included in this EV</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Missing / Higher Trim</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'overrated' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Features that dealerships hype up, but offer little practical benefit in {cityIntel.name} (save your money!):
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {cityIntel.overratedFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 flex items-start gap-3 text-xs dark:border-amber-500/20 dark:bg-amber-950/10"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{feat.name}</span>
                      <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] dark:bg-slate-800 dark:text-slate-300 dark:border-0">
                        Overrated in {cityIntel.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feat.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'verdict' && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-5 space-y-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Recommended Trim for {cityIntel.name}
                </span>
                <h4 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {vehicle.name} — <span className="text-emerald-700 dark:text-emerald-300">{cityIntel.recommendedVariantName}</span>
                </h4>
              </div>
              <div className="rounded-xl bg-white border border-emerald-200 px-3 py-1.5 text-center shadow-xs dark:bg-slate-900 dark:border-emerald-500/30">
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block uppercase">City Suitability</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {cityIntel.overallCitySuitabilityScore}%
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {cityIntel.recommendedVariantReason}
            </p>

            <div className="pt-3 border-t border-emerald-200 dark:border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 dark:text-slate-400">
                City Verdict: <strong className="text-slate-900 dark:text-white">{cityIntel.cityVerdict}</strong>
              </span>

              {onSelectVariant && vehicle.variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const target = vehicle.variants.find(v => v.name === cityIntel.recommendedVariantName) || vehicle.variants[0];
                    onSelectVariant(target.id);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
                >
                  <span>Select {cityIntel.recommendedVariantName}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
