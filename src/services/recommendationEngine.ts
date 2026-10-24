import { Vehicle, UserRecommendationInput, RecommendationResult } from '../types/ev';

export function getEVRecommendations(
  vehicles: Vehicle[],
  input: UserRecommendationInput
): RecommendationResult[] {
  const scoredVehicles: { vehicle: Vehicle; score: number; reasons: string[] }[] = [];

  for (const v of vehicles) {
    let score = 50; // base score
    const reasons: string[] = [];

    // 1. Budget Evaluation (Critical)
    if (v.startingPriceLakh <= input.budgetMaxLakh) {
      const budgetHeadroom = input.budgetMaxLakh - v.startingPriceLakh;
      if (budgetHeadroom >= 0 && budgetHeadroom <= 4) {
        score += 25; // Perfect budget fit
        reasons.push(`Hits your budget target perfectly starting at ₹${v.startingPriceLakh} Lakh.`);
      } else if (budgetHeadroom > 4) {
        score += 18; // Great value savings
        reasons.push(`Substantially below your budget, saving you ₹${budgetHeadroom.toFixed(1)} Lakh.`);
      }
    } else {
      // Over budget
      const excess = v.startingPriceLakh - input.budgetMaxLakh;
      if (excess <= 2) {
        score -= 15; // Slightly over budget
        reasons.push(`Slightly above budget by ₹${excess.toFixed(1)} Lakh, but provides exceptional tech.`);
      } else {
        score -= 50; // Heavily penalized
      }
    }

    // 2. Commute & Range Matching
    const weeklyKm = input.dailyDrivingKm * 6; // 6 days active
    if (v.realWorldRangeKm >= weeklyKm) {
      score += 20;
      reasons.push(`With ${v.realWorldRangeKm} km real-world range, you only need to charge once a week for your ${input.dailyDrivingKm} km daily commute.`);
    } else if (v.realWorldRangeKm >= input.dailyDrivingKm * 2.5) {
      score += 14;
      reasons.push(`Real-world ${v.realWorldRangeKm} km range easily covers your daily ${input.dailyDrivingKm} km driving with 2 charges per week.`);
    } else {
      score -= 10;
    }

    // 3. City vs Highway Dynamics
    if (input.cityVsHighwaySplit === 'mostly-city') {
      if (v.dimensions.lengthMm <= 4350) {
        score += 12;
        reasons.push(`Compact ${v.dimensions.lengthMm}mm length ensures effortless parking and nimble city driving.`);
      }
    } else if (input.cityVsHighwaySplit === 'mostly-highway') {
      if (v.highwayRangeKm >= 320 && v.dcChargingSpeedKw >= 50) {
        score += 15;
        reasons.push(`Solid ${v.highwayRangeKm} km highway range and ${v.dcChargingSpeedKw} kW fast charging enable reliable interstate road trips.`);
      }
    }

    // 4. Home Charging Compatibility
    if (!input.hasHomeCharging) {
      // Relies heavily on public fast charging!
      if (v.dcChargingSpeedKw >= 70) {
        score += 15;
        reasons.push(`Since you don't have dedicated home charging, its fast ${v.dcChargingSpeedKw} kW DC speed (${v.chargingTimeDcMin10To80} min 10-80%) makes public charging hassle-free.`);
      } else if (v.dcChargingSpeedKw <= 30) {
        score -= 15;
      }
    }

    // 5. Seating & Passenger Space
    if (input.passengerCount >= 5) {
      if (v.dimensions.widthMm >= 1800 && v.dimensions.bootSpaceLitre >= 400) {
        score += 12;
        reasons.push(`Wide 5-passenger cabin (${v.dimensions.widthMm}mm width) and ${v.dimensions.bootSpaceLitre}L boot accommodate your family comfortably.`);
      }
    }

    // 6. User Specific Priority
    switch (input.primaryPriority) {
      case 'safety':
        if (v.ncapRating === 5) {
          score += 20;
          reasons.push(`Certified 5-Star ${v.ncapAgency} safety rating with ${v.airbags} airbags gives maximum peace of mind.`);
        }
        if (v.adasLevel >= 2) {
          score += 10;
          reasons.push('Includes full Level 2 ADAS active crash avoidance system.');
        }
        break;

      case 'range':
        if (v.claimedRangeKm >= 500) {
          score += 25;
          reasons.push(`Massive ${v.claimedRangeKm} km claimed range (${v.realWorldRangeKm} km real-world) eliminates all range anxiety.`);
        }
        break;

      case 'performance':
        if (v.acceleration0To100 <= 7.5 || v.motorPowerBhp >= 200) {
          score += 22;
          reasons.push(`Blistering ${v.acceleration0To100}s 0-100 km/h acceleration with ${v.motorPowerBhp} bhp delivers thrilling performance.`);
        }
        break;

      case 'value':
        if (v.startingPriceLakh <= 15) {
          score += 20;
          reasons.push('Outstanding price-to-specification ratio with low total cost of ownership.');
        }
        break;

      case 'luxury':
        if (v.premiumAudio && v.ventilatedSeats && v.sunroof !== 'None') {
          score += 20;
          reasons.push(`Premium executive ambiance with ${v.premiumAudio}, ventilated seats, and panoramic roof.`);
        }
        break;
    }

    scoredVehicles.push({
      vehicle: v,
      score,
      reasons: reasons.slice(0, 3) // Top 3 compelling reasons
    });
  }

  // Sort descending by score
  scoredVehicles.sort((a, b) => b.score - a.score);

  const topResults = scoredVehicles.slice(0, 5);

  const badgeOrder: ('Best Overall' | 'Best Value' | 'Best Range' | 'Best Family Choice' | 'Best Premium Choice')[] = [
    'Best Overall',
    'Best Value',
    'Best Range',
    'Best Family Choice',
    'Best Premium Choice'
  ];

  return topResults.map((item, idx) => ({
    vehicle: item.vehicle,
    matchScore: Math.min(Math.max(item.score, 65), 98), // Normalize between 65% and 98%
    rankBadge: badgeOrder[idx] || 'Best Overall',
    reasons: item.reasons
  }));
}

export function getRecommendations(
  vehicles: Vehicle[],
  inputs: {
    budgetMaxLakh: number;
    dailyDrivingKm: number;
    primaryUse: 'family' | 'city' | 'highway' | 'performance' | 'luxury';
    homeChargingAvailable: boolean;
  }
) {
  const priorityMap: Record<string, 'safety' | 'range' | 'performance' | 'value' | 'luxury'> = {
    family: 'safety',
    city: 'value',
    highway: 'range',
    performance: 'performance',
    luxury: 'luxury'
  };

  const adaptedInput: UserRecommendationInput = {
    budgetMaxLakh: inputs.budgetMaxLakh,
    dailyDrivingKm: inputs.dailyDrivingKm,
    cityVsHighwaySplit: inputs.primaryUse === 'city' ? 'mostly-city' : inputs.primaryUse === 'highway' ? 'mostly-highway' : 'balanced',
    passengerCount: inputs.primaryUse === 'family' ? 5 : 4,
    bodyTypePreference: 'Any',
    hasHomeCharging: inputs.homeChargingAvailable,
    primaryPriority: priorityMap[inputs.primaryUse] || 'range',
    city: 'Delhi'
  };

  const results = getEVRecommendations(vehicles, adaptedInput);
  return results.map(r => ({
    vehicle: r.vehicle,
    matchPercentage: r.matchScore,
    matchReasons: r.reasons
  }));
}
