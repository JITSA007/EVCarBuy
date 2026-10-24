# BharatEV Live Hub - Real-Time Indian Electric Car Intelligence & Variant Studio

A reimagined, exhaustive platform covering every electric vehicle model purchasable in India, powered by live Google Search grounding to fetch real-time on-road prices, battery updates, and newly announced variants with authentic source citations.

## User Review & Critical Decisions

> [!IMPORTANT]
> Key architectural decisions confirmed through interactive requirements clarification:

- **Confirmed: Exclusively India-Purchasable Cars**: The catalog covers 100% of electric vehicles available for purchase or official booking in the Indian market. It spans mass-market EVs (Tata Tiago/Tigor/Punch/Nexon/Curvv, MG Comet/Windsor/ZS EV, Mahindra XUV400/BE 6e/XEV 9e, Citroën ë-C3), mid-premium (Hyundai Creta EV/Ioniq 5, BYD Atto 3/Seal/eMAX 7, Kia EV6/EV9), luxury flagships (BMW iX1/i4/iX/i7, Mercedes-Benz EQA/EQB/EQE/EQS, Audi Q8 e-tron, Porsche Taycan, Lotus Eletre, Rolls-Royce Spectre), and confirmed Indian market launches (Maruti Suzuki e Vitara, Tata Harrier EV).
- **Confirmed: Live Web Search Grounding via Gemini 3.8 Flash**: Real-time vehicle specs, ex-showroom revisions, and local waiting times are fetched on demand through a secure server-side Express endpoint utilizing `@google/genai` with `googleSearch` grounding. Source URLs, publication dates, and live notes are extracted directly from grounding chunks and presented transparently to the user.
- **Confirmed: Real-Time EV Hub Centerpiece**: A unified vehicle discovery hub featuring a Live Variant Studio, comprehensive spec sheets with ARAI vs. Real-World Indian range, state RTO road tax calculation, and multi-car comparison matrix.

---

## 1. Overview & Core Concept

- **What It Does**: BharatEV Live is an electric mobility intelligence platform built specifically for Indian car buyers. It provides complete, verified details on all electric passenger cars sold in India, backed by on-demand live web search to confirm latest 2025/2026 prices, battery pack revisions, and subsidy updates.
- **Target Audience / Persona**: Indian car buyers transitioning from ICE (petrol/diesel) to electric, tech-savvy commuters evaluating daily running costs, and luxury EV enthusiasts comparing real-world highway range across Indian expressways and climates.
- **Key Value**: Eliminates outdated automotive aggregator data by combining a pristine, pre-curated Indian EV database with instant live search grounding that pulls the latest verified pricing and specifications straight from automotive news and official manufacturer updates.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Zero-State & Catalog Exploration**:
   - The user arrives at the clean 1440px desktop layout. A restrained, single-line top bar provides effortless navigation.
   - The hero introduces the Indian EV ecosystem with a quick-filter bar (Budget Brackets: Under ₹15L, ₹15–25L, ₹25–50L, ₹50L+; Body Types: Hatchback, SUV, Sedan, MPV).
   - An upfront **"Live Search Any Indian EV"** bar allows typing any query (e.g., *"Mahindra BE 6e real range"* or *"MG Windsor BaaS battery rental pricing"*) to trigger instant live search grounding.

2. **Real-Time EV Hub & Variant Studio**:
   - Clicking any car opens the dedicated **Real-Time Vehicle Studio**.
   - **Live Sync Button**: A prominent `"Check Live Web Updates"` action queries the server API. The engine runs a grounded Google Search for the exact model, returning:
     - Latest verified ex-showroom price & waiting period.
     - Recent manufacturer software/battery upgrades or price cuts.
     - Direct clickable source links (Autocar India, Team-BHP, CarWale, Overdrive).
   - **Variant Selector**: Seamless switching across all official variants (e.g., Creative, Fearless, Empowered+, Long Range, AWD), updating battery kWh, DC fast charging curve, motor output, and safety equipment in real time.
   - **City & Terrain Reality Check**: City-specific advisory (Delhi NCR, Bengaluru, Mumbai, Chennai, Himalayan/Hilly regions) factoring in summer heat throttling, AC power draw, and hill descent regeneration.

3. **Side-by-Side Multi-Car Comparison**:
   - Users select up to 3 cars to compare in a sticky matrix.
   - Includes real-world vs. ARAI range differential, charging speeds (10–80% time on 50kW vs. 120kW chargers), ground clearance (vital for Indian speed breakers), boot space, and Bharat NCAP crash test safety ratings.

4. **Indian Ownership & TCO Reality**:
   - Clear breakdown of ex-showroom vs. on-road price across 28 Indian States & UTs (highlighting states with 0% EV road tax like Delhi, UP, Karnataka, and Maharashtra).
   - Home charging electricity bill calculator (₹6–₹10/unit) vs. commercial DC fast charging tariffs (₹18–₹24/unit).

### Visual Identity & Theme

- **Aesthetic Direction**: Contemporary Indian mobility design—modern, uncluttered, and editorial. No generic "AI-slop" neon capsules or pill-badge clusters.
- **Color Palette & Discipline (60-30-10)**:
  - *60% Neutral Canvas*: Deep midnight slate (`#090d16` to `#0f172a`) with subtle hairline dividers (`border-slate-800`).
  - *30% Structural Surfaces*: Matte cards (`#131c2e`), elevated dropdown panels, and refined typography.
  - *10% Disciplined Accent Budget*: Warm Indian saffron amber (`#f59e0b` / `#fb923c`) for primary CTAs and active states, paired with emerald (`#10b981`) for battery/efficiency indicators.
- **Typography & Hierarchy**:
  - Display: `Plus Jakarta Sans` for bold, balanced headings with `text-wrap: balance`.
  - Body: `Plus Jakarta Sans` (400/500 weights) with clear optical line height (1.6).
  - Data & Metrics: `tabular-nums font-mono` for all prices (₹ Lakhs), ranges (km), battery capacities (kWh), and acceleration figures.
- **Top Bar Contract**:
  - Zone 1: `BharatEV Live` wordmark.
  - Zone 2: 4 single-line links (`All Models`, `Live Sync`, `Compare`, `Range & Subsidy`).
  - Zone 3: 1 primary action (`Search Live Specs`).

---

## 3. Key Product Decisions & Trade-Offs

- **Full-Stack Express + Server-Side Gemini API (`server.ts`)**:
  - *Chosen Approach*: Implement an Express backend entry point mounted with Vite middleware for dev mode and static serving in production. Server routes `/api/ev/live-sync` and `/api/ev/search` invoke `@google/genai` with `googleSearch: {}` grounding.
  - *Why*: Adheres to strict environment security constraints (API keys must never be exposed to the browser) while giving users real-time Google Search grounding.
  - *Alternatives Considered*: Pure client-side mock data (lacks real-time freshness) or client-side API calls (violates security rules and exposes keys).
- **Hybrid Local Catalog + On-Demand Live Grounding**:
  - *Chosen Approach*: Ship an exhaustive, curated catalog of every Indian EV model as the instant-loading baseline, then layer on real-time live grounding queries when users request live updates or search specific models.
  - *Why*: Gives the user instantaneous 0ms page loads, instant filters, and zero latency for catalog browsing, while providing true real-time web accuracy on demand with authentic grounding citations.
- **Exclusively India-Purchasable Taxonomy**:
  - *Chosen Approach*: Focus 100% of vehicles and financial calculations on cars you can buy in India in Indian Rupees (₹ Lakh / ₹ Crore).
  - *Why*: Directly aligns with user clarification; avoids cluttering with foreign models that cannot be bought or registered in India.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             BROWSER CLIENT (React SPA)                      │
│                                                                             │
│  ┌──────────────────┐  ┌────────────────────┐  ┌─────────────────────────┐  │
│  │   Top Nav Bar    │  │  Live Search Bar   │  │   Quick Budget Filters  │  │
│  └────────┬─────────┘  └─────────┬──────────┘  └────────────┬────────────┘  │
│           │                      │                          │               │
│  ┌────────▼──────────────────────▼──────────────────────────▼────────────┐  │
│  │                    Real-Time EV Catalog & Hub                         │  │
│  │  - 30+ Verified Indian EV Models across 12 Brands                     │  │
│  │  - Unboxed metadata (ARAI, battery, price, motor kW)                  │  │
│  └────────┬──────────────────────────────────────────────────────────────┘  │
│           │                                                                 │
│  ┌────────▼─────────────────────────┐  ┌─────────────────────────────────┐  │
│  │      Vehicle Variant Studio      │  │      Multi-Car Compare Tray     │  │
│  │  - Variant-level specifications  │  │  - Real-world vs ARAI delta     │  │
│  │  - City & terrain adaptation     │  │  - Fast charging curve comparison│ │
│  │  - On-Demand Live Sync Button    │  │  - Ground clearance & dimensions│  │
│  └────────┬─────────────────────────┘  └─────────────────────────────────┘  │
│           │                                                                 │
└───────────┼─────────────────────────────────────────────────────────────────┘
            │ HTTP POST /api/ev/live-sync & /api/ev/search
            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXPRESS SERVER (`server.ts`)                        │
│                                                                             │
│  ┌─────────────────────────────────┐   ┌─────────────────────────────────┐  │
│  │   POST /api/ev/live-sync        │   │   POST /api/ev/search           │  │
│  │   Input: { modelName, brand }   │   │   Input: { query }              │  │
│  └────────────────┬────────────────┘   └────────────────┬────────────────┘  │
│                   │                                     │                   │
│                   ▼                                     ▼                   │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │            @google/genai SDK (Model: gemini-3.8-flash)                │  │
│  │            Tools: [{ googleSearch: {} }]                              │  │
│  └────────────────┬──────────────────────────────────────────────────────┘  │
│                   │                                                         │
│                   ▼                                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │         Google Search Grounding Engine (Real-Time Web)                │  │
│  │  - Queries Indian automotive sources (Autocar, Team-BHP, CarDekho)   │  │
│  │  - Extracts groundingChunks (URLs, Titles) & Verified Facts           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State Strategy

- **Vehicle Entity**:
  - `id`, `name`, `brand`, `bodyType` (`Hatchback` | `SUV` | `Sedan` | `MPV` | `Coupe/GT`)
  - `startingPriceLakh`, `maxPriceLakh`, `baasAvailable`, `baasPriceLakh`
  - `batteryCapacityKwh`, `realWorldRangeKm`, `claimedRangeKm` (ARAI)
  - `fastChargingMinutes` (10–80%), `fastChargingKw`, `acChargingHours`
  - `motorPowerBhp`, `motorTorqueNm`, `driveType` (`FWD` | `RWD` | `AWD`)
  - `groundClearanceMm`, `bootSpaceLitres`, `ncapRating`
  - `variants`: Array of detailed trim levels with individual prices, battery sizes, and specific equipment.
  - `liveSyncData`: Cache of latest live web search result (synced price, date, source URL, change summary).
- **Live Search & Sync Response**:
  - `modelName`, `currentVerifiedPrice`, `lastUpdatedDate`, `summary`, `recentUpdates`, `sources` (`title`, `uri`).
- **Interactive State Transitions**:
  - **Live Search Modal / Bar**: Live search with autocomplete across all Indian models + freeform query capability.
  - **Live Sync Trigger**: Displays animated sync status with informative feedback (`"Searching live automotive databases..."` $\to$ `"Verified via Team-BHP / Autocar India"`), updating the model card with verified live markers.
  - **Comparison Selection**: Instant add/remove up to 3 cars with floating drawer and full-screen comparison table.
  - **City Adaptation**: Dropdown to switch between Indian climates (Extreme Summer, Hilly/Mountain, Coastal Monsoon, Delhi NCR, Bengaluru) dynamically recalculating usable range and must-have feature advice.
