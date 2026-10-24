import { FilterCriteria, BodyType } from '../types/ev';

export interface ParsedSearchIntent {
  interpretedFilters: Partial<FilterCriteria>;
  matchedKeywords: string[];
  explanation: string;
}

export function parseNaturalLanguageQuery(query: string): ParsedSearchIntent {
  const q = query.toLowerCase().trim();
  const filters: Partial<FilterCriteria> = {};
  const keywords: string[] = [];
  const explanations: string[] = [];

  // Check budget patterns: "under 20 lakh", "under 15L", "< 25 lakh", "below 10 lakh"
  const underBudgetMatch = q.match(/(?:under|below|less than|within|<)\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|l|lac)?/i);
  if (underBudgetMatch && underBudgetMatch[1]) {
    const val = parseFloat(underBudgetMatch[1]);
    // Safety check: if number is > 1000, probably not lakh
    if (val <= 150) {
      filters.maxPriceLakh = val;
      keywords.push(`Budget ≤ ₹${val}L`);
      explanations.push(`Maximum price set to ₹${val} Lakh`);
    }
  }

  // Check range patterns: "400 km range", "300km+", "500 km"
  const rangeMatch = q.match(/(\d+)\s*(?:km|kms)?\s*(?:range)?/i);
  if (rangeMatch && rangeMatch[1]) {
    const val = parseInt(rangeMatch[1], 10);
    if (val >= 200 && val <= 1000) {
      filters.minRangeKm = val;
      keywords.push(`Min ${val} km Range`);
      explanations.push(`Minimum claimed range set to ${val} km`);
    }
  }

  // Check body types
  const bodyTypesMap: { [key: string]: BodyType } = {
    'suv': 'SUV',
    'compact suv': 'Compact SUV',
    'hatchback': 'Hatchback',
    'sedan': 'Sedan',
    'mpv': 'MPV',
    'coupe': 'Coupe',
    'luxury': 'Luxury'
  };

  for (const [key, bType] of Object.entries(bodyTypesMap)) {
    if (q.includes(key)) {
      if (!filters.bodyTypes) filters.bodyTypes = [];
      if (!filters.bodyTypes.includes(bType)) {
        filters.bodyTypes.push(bType);
      }
      keywords.push(bType);
      explanations.push(`Body style filtered to ${bType}`);
    }
  }

  // Check brand names
  const brands = ['tata', 'mg', 'mahindra', 'hyundai', 'kia', 'byd', 'citroen', 'bmw'];
  for (const brand of brands) {
    if (q.includes(brand)) {
      if (!filters.brands) filters.brands = [];
      const brandCapitalized = brand.toUpperCase() === 'MG' || brand.toUpperCase() === 'BYD' || brand.toUpperCase() === 'BMW'
        ? brand.toUpperCase()
        : brand.charAt(0).toUpperCase() + brand.slice(1);
      filters.brands.push(brandCapitalized);
      keywords.push(brandCapitalized);
      explanations.push(`Brand filtered to ${brandCapitalized}`);
    }
  }

  // Check fast charging
  if (q.includes('fast charging') || q.includes('fast charge') || q.includes('rapid charge')) {
    filters.fastChargingSpeedKw = 50;
    filters.sortBy = 'charging-desc';
    keywords.push('DC Fast Charging (≥50 kW)');
    explanations.push('Filtered for fast DC charging speed');
  }

  // Check best range / long range
  if (q.includes('best range') || q.includes('highest range') || q.includes('long range')) {
    filters.sortBy = 'range-desc';
    filters.minRangeKm = 400;
    keywords.push('Long Range (400+ km)');
    explanations.push('Sorted by highest range');
  }

  // Check family EV
  if (q.includes('family') || q.includes('spacious') || q.includes('boot space')) {
    filters.minNcapRating = 5;
    if (!filters.bodyTypes) filters.bodyTypes = ['SUV', 'Compact SUV', 'MPV'];
    keywords.push('Family EV (5-Star Safety & Space)');
    explanations.push('Prioritizing 5-Star B-NCAP rating and spacious cabins');
  }

  // Check ADAS
  if (q.includes('adas') || q.includes('autopilot') || q.includes('autonomous')) {
    filters.adasOnly = true;
    keywords.push('ADAS Safety Features');
    explanations.push('Filtered for Level 2 ADAS enabled models');
  }

  // Check AWD / 4WD
  if (q.includes('awd') || q.includes('4wd') || q.includes('all wheel')) {
    filters.driveTypes = ['AWD'];
    keywords.push('All-Wheel Drive (AWD)');
    explanations.push('Filtered for dual-motor all-wheel drive');
  }

  // Check Sunroof
  if (q.includes('sunroof') || q.includes('panoramic')) {
    filters.sunroofOnly = true;
    keywords.push('Sunroof Equipped');
    explanations.push('Filtered for panoramic or single-pane sunroof');
  }

  // Check Seating
  if (q.includes('7 seater') || q.includes('7-seater') || q.includes('6 seater') || q.includes('6-seater')) {
    filters.seating = [6, 7];
    keywords.push('6/7 Seater');
    explanations.push('Filtered for 6 or 7 seating capacity');
  }

  return {
    interpretedFilters: filters,
    matchedKeywords: keywords,
    explanation: explanations.length > 0
      ? explanations.join(' • ')
      : 'Natural language search parsed'
  };
}
