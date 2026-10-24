import { CityPricing } from '../types/ev';

export const INDIAN_CITIES: CityPricing[] = [
  {
    city: 'Delhi',
    state: 'Delhi (NCT)',
    rtoPercent: 0, // Delhi 100% waiver on EV road tax
    rtoFlatFee: 2500,
    evSubsidyLakh: 0.5, // Delhi EV policy incentive
    insuranceRatePercent: 3.2,
    otherChargesLakh: 0.15,
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    rtoPercent: 0, // Maharashtra EV road tax exemption
    rtoFlatFee: 4000,
    evSubsidyLakh: 0.0,
    insuranceRatePercent: 3.5,
    otherChargesLakh: 0.20,
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    rtoPercent: 4.0, // Karnataka 4% road tax on EVs > ₹25L
    rtoFlatFee: 5000,
    evSubsidyLakh: 0.0,
    insuranceRatePercent: 3.6,
    otherChargesLakh: 0.22,
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    rtoPercent: 0, // Telangana 100% road tax and registration exemption for EVs
    rtoFlatFee: 3000,
    evSubsidyLakh: 0.0,
    insuranceRatePercent: 3.3,
    otherChargesLakh: 0.18,
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    rtoPercent: 0, // Tamil Nadu 100% road tax waiver for EVs
    rtoFlatFee: 3500,
    evSubsidyLakh: 0.0,
    insuranceRatePercent: 3.4,
    otherChargesLakh: 0.19,
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    rtoPercent: 0,
    rtoFlatFee: 4000,
    evSubsidyLakh: 0.0,
    insuranceRatePercent: 3.4,
    otherChargesLakh: 0.19,
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    rtoPercent: 0, // Gujarat EV road tax rebate
    rtoFlatFee: 2800,
    evSubsidyLakh: 0.2,
    insuranceRatePercent: 3.2,
    otherChargesLakh: 0.16,
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    rtoPercent: 0, // WB road tax rebate
    rtoFlatFee: 3200,
    evSubsidyLakh: 0.0,
    insuranceRatePercent: 3.4,
    otherChargesLakh: 0.17,
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    rtoPercent: 0,
    rtoFlatFee: 3000,
    evSubsidyLakh: 0.1,
    insuranceRatePercent: 3.3,
    otherChargesLakh: 0.15,
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    rtoPercent: 0, // UP 100% road tax waiver extended through 2027
    rtoFlatFee: 2800,
    evSubsidyLakh: 1.0, // UP state subsidy up to ₹1 Lakh
    insuranceRatePercent: 3.3,
    otherChargesLakh: 0.16,
  },
  {
    city: 'Gurugram',
    state: 'Haryana',
    rtoPercent: 0, // Haryana 100% road tax waiver
    rtoFlatFee: 3200,
    evSubsidyLakh: 1.5, // Haryana EV policy incentive up to ₹1.5L
    insuranceRatePercent: 3.4,
    otherChargesLakh: 0.18,
  },
  {
    city: 'Kochi',
    state: 'Kerala',
    rtoPercent: 5.0, // Kerala 5% concessional road tax on EVs
    rtoFlatFee: 3500,
    evSubsidyLakh: 0.0,
    insuranceRatePercent: 3.5,
    otherChargesLakh: 0.18,
  },
  {
    city: 'Chandigarh',
    state: 'Punjab / UT',
    rtoPercent: 0,
    rtoFlatFee: 2000,
    evSubsidyLakh: 0.3,
    insuranceRatePercent: 3.1,
    otherChargesLakh: 0.14,
  }
];
