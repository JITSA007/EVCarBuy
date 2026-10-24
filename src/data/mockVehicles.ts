import { Vehicle } from '../types/ev';
import { INDIAN_CITIES } from './cities';
import { MANUFACTURERS } from './manufacturers';
import { VEHICLES_BATCH_1 } from './vehiclesBatch1';
import { VEHICLES_BATCH_2 } from './vehiclesBatch2';
import { VEHICLES_BATCH_3 } from './vehiclesBatch3';
import { VEHICLES_BATCH_4 } from './vehiclesBatch4';
import { UPCOMING_EVS, CHARGING_STATIONS, DATA_SYNC_LOGS, PRICE_HISTORY } from './chargingAndUpcoming';

export { INDIAN_CITIES } from './cities';
export { MANUFACTURERS } from './manufacturers';
export { UPCOMING_EVS, CHARGING_STATIONS, DATA_SYNC_LOGS, PRICE_HISTORY } from './chargingAndUpcoming';

// Master combined list of 30 Electric Vehicles in India (Including MG Tomahawk EV, Tesla, Maruti e Vitara, Tata Harrier EV, Cyberster, etc.)
export const VEHICLES: Vehicle[] = [
  ...VEHICLES_BATCH_1,
  ...VEHICLES_BATCH_2,
  ...VEHICLES_BATCH_3,
  ...VEHICLES_BATCH_4
];
