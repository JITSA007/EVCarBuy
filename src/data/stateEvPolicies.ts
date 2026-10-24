export interface StateEvPolicy {
  stateCode: string;
  stateName: string;
  capitalCity: string;
  roadTaxExemptionPercent: number; // e.g. 100 for complete waiver
  registrationFeeWaived: boolean;
  cashSubsidyAvailable: boolean;
  maxSubsidyAmountLakh: number;
  subsidyTerms: string;
  evElectricityTariffPerUnit: number; // ₹ per kWh
  greenNumberPlateMandate: boolean;
  parkingTollExemptions: string;
  policyValidity: string;
  officialNotification: string;
  keyHighlights: string[];
}

export const STATE_EV_POLICIES: StateEvPolicy[] = [
  {
    stateCode: 'DL',
    stateName: 'Delhi (NCT)',
    capitalCity: 'New Delhi',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: true,
    maxSubsidyAmountLakh: 0.5,
    subsidyTerms: 'Delhi EV Policy 2.0 provides 100% road tax and registration fee waiver. Scrappage incentive up to ₹25,000 for retiring end-of-life ICE vehicles.',
    evElectricityTariffPerUnit: 4.50,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Reserved EV parking lots in MCD zones with free 1-hour charging.',
    policyValidity: 'Valid through December 2026',
    officialNotification: 'Delhi Transport Department Gazette F.No.12/EV/2020',
    keyHighlights: [
      'Zero road tax and zero registration fee across all electric vehicle price bands',
      'Dedicated domestic EV charging tariff of ₹4.50/kWh (significantly cheaper than regular slabs)',
      'Subsidized public charging tariff capped at ₹6.50/kWh for low-tension charging',
      'Scrappage bonus for turning in 15-year-old petrol or 10-year-old diesel cars'
    ]
  },
  {
    stateCode: 'MH',
    stateName: 'Maharashtra',
    capitalCity: 'Mumbai',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: false,
    maxSubsidyAmountLakh: 0.0,
    subsidyTerms: '100% road tax and registration fee waiver on all battery electric passenger cars. Zero green cess.',
    evElectricityTariffPerUnit: 7.20,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Toll-free or concessional rates on key state expressways under consideration.',
    policyValidity: 'Valid through 2026',
    officialNotification: 'Govt. of Maharashtra Motor Vehicles Dept Order No. MVR-0721/CR-14',
    keyHighlights: [
      '100% road tax exemption saving between ₹1.2 Lakh to ₹7.5 Lakh on electric cars',
      'Mandatory EV charging infrastructure provisions for all new residential societies in MMR & Pune',
      'MSEDCL smart meter program with separate EV charging connection'
    ]
  },
  {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    capitalCity: 'Lucknow',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: true,
    maxSubsidyAmountLakh: 1.0,
    subsidyTerms: 'UP EV Manufacturing & Mobility Policy provides 100% road tax and registration fee waiver for pure EVs bought or manufactured in UP.',
    evElectricityTariffPerUnit: 6.20,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Free parking in government designated spaces.',
    policyValidity: 'Extended through October 2027',
    officialNotification: 'UP Transport Notification No. 1046/30-2-2022',
    keyHighlights: [
      'Full 100% road tax waiver extended by UP cabinet through 2027',
      'Registration charges completely waived across all RTOs (Noida, Ghaziabad, Lucknow, Kanpur)',
      'Direct purchase subsidy of ₹1 Lakh for the first 25,000 four-wheeler EV buyers',
      'Fast-track approval for housing society high-speed EV chargers'
    ]
  },
  {
    stateCode: 'KA',
    stateName: 'Karnataka',
    capitalCity: 'Bengaluru',
    roadTaxExemptionPercent: 96,
    registrationFeeWaived: true,
    cashSubsidyAvailable: false,
    maxSubsidyAmountLakh: 0.0,
    subsidyTerms: 'Zero road tax on EVs with ex-showroom under ₹25 Lakh. Concessional 4% road tax applies only to luxury EVs above ₹25 Lakh (vs 18-21% for ICE cars).',
    evElectricityTariffPerUnit: 6.00,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Priority charging bays at BESCOM stations.',
    policyValidity: 'Valid through 2027',
    officialNotification: 'Karnataka Motor Vehicles Taxation (Amendment) Act',
    keyHighlights: [
      '0% road tax on mass-market electric vehicles priced under ₹25 Lakh',
      'Concessional 4% road tax on premium EVs (huge advantage over 18-20% petrol/diesel road tax)',
      'BESCOM EV Mitra app with extensive fast-charging corridor network across NH44 & Mysore Expressway',
      'Subsidized EV meter tariff at ₹5.90/unit during off-peak hours'
    ]
  },
  {
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    capitalCity: 'Chennai',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: false,
    maxSubsidyAmountLakh: 0.0,
    subsidyTerms: '100% motor vehicle tax exemption on all electric cars through December 2025/2026.',
    evElectricityTariffPerUnit: 6.50,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Concessional parking in municipal parking zones.',
    policyValidity: 'Valid through December 2026',
    officialNotification: 'Tamil Nadu Home (Transport) Dept G.O. Ms. No. 544',
    keyHighlights: [
      'Complete road tax holiday saving ₹1.5L - ₹5L compared to petrol/diesel counterparts',
      'Over 2,000 public fast charging points being deployed across state highways',
      'Strong local manufacturing hub (VinFast, Hyundai, Tata, Ola) creating spare parts availability'
    ]
  },
  {
    stateCode: 'TG',
    stateName: 'Telangana',
    capitalCity: 'Hyderabad',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: false,
    maxSubsidyAmountLakh: 0.0,
    subsidyTerms: 'Telangana Revised EV Policy provides 100% road tax and registration fee waiver for electric cars registered in the state.',
    evElectricityTariffPerUnit: 6.00,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Free EV parking in civic body spaces.',
    policyValidity: 'Valid through 2026',
    officialNotification: 'Telangana Transport Dept G.O. Rt. No. 231',
    keyHighlights: [
      '100% lifetime road tax waiver across all passenger EV categories',
      'Registration charges fully waived for personal electric cars',
      'TSSPDCL dedicated EV LT-9 tariff category for home charging points',
      'Outer Ring Road (ORR) equipped with fast-charging stations at all exit junctions'
    ]
  },
  {
    stateCode: 'GJ',
    stateName: 'Gujarat',
    capitalCity: 'Gandhinagar / Ahmedabad',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: true,
    maxSubsidyAmountLakh: 0.20,
    subsidyTerms: 'Zero road tax on EVs plus direct DBT subsidy of ₹10,000 per kWh up to ₹1.5 Lakh for early tranches.',
    evElectricityTariffPerUnit: 5.50,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Exemptions in municipal corporation multi-level parkings.',
    policyValidity: 'Valid through 2026',
    officialNotification: 'Gujarat Climate Change Department EV Policy 2021-2026',
    keyHighlights: [
      'Zero road tax on all electric passenger cars',
      'Synergy with Surya Gujarat rooftop solar scheme for free home charging',
      'Manufacturing incentives bringing vehicle delivery times down to record lows'
    ]
  },
  {
    stateCode: 'KL',
    stateName: 'Kerala',
    capitalCity: 'Thiruvananthapuram / Kochi',
    roadTaxExemptionPercent: 70,
    registrationFeeWaived: false,
    cashSubsidyAvailable: false,
    maxSubsidyAmountLakh: 0.0,
    subsidyTerms: 'Concessional 5% road tax on electric cars (compared to regular 15-21% road tax on ICE cars).',
    evElectricityTariffPerUnit: 5.80,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'KSEB charge network integration.',
    policyValidity: 'Valid through 2026',
    officialNotification: 'Kerala Motor Vehicles Taxation Act Amendments',
    keyHighlights: [
      'Flat 5% road tax for 15 years instead of regular 15% to 21% slab',
      'KSEB pole-mounted EV chargers in urban and semi-urban neighborhoods',
      'High adoption rate with widespread charging along MC Road and NH66'
    ]
  },
  {
    stateCode: 'HR',
    stateName: 'Haryana',
    capitalCity: 'Chandigarh / Gurugram',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: true,
    maxSubsidyAmountLakh: 1.5,
    subsidyTerms: 'Haryana Electric Vehicle Policy grants 100% motor vehicle tax rebate and direct ex-showroom subsidy up to ₹1.5 Lakh for cars under ₹40 Lakh.',
    evElectricityTariffPerUnit: 6.50,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Free parking in HSVP designated lots.',
    policyValidity: 'Valid through 2027',
    officialNotification: 'Haryana Industries & Commerce Notification 2022',
    keyHighlights: [
      'Full road tax exemption in Gurugram, Faridabad, Sonipat, and all districts',
      'Purchase incentive of 15% of car value capped at ₹1.5 Lakh for cars priced under ₹40 Lakh',
      'Mandatory EV charger installation in new commercial establishments'
    ]
  },
  {
    stateCode: 'RJ',
    stateName: 'Rajasthan',
    capitalCity: 'Jaipur',
    roadTaxExemptionPercent: 100,
    registrationFeeWaived: true,
    cashSubsidyAvailable: true,
    maxSubsidyAmountLakh: 0.50,
    subsidyTerms: '100% exemption on motor vehicle tax and lump-sum SGST reimbursement incentive.',
    evElectricityTariffPerUnit: 6.80,
    greenNumberPlateMandate: true,
    parkingTollExemptions: 'Municipal fee rebate.',
    policyValidity: 'Valid through 2026',
    officialNotification: 'Rajasthan Transport Dept Order F.6(130)/Pari/Tax/Hq/2021',
    keyHighlights: [
      '100% exemption from Motor Vehicle Tax',
      'SGST reimbursement paid directly into buyer bank account via DBT',
      'Rapidly expanding charging corridor on Delhi-Jaipur Expressway'
    ]
  }
];
