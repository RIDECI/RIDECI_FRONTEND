import type { LocationDocument } from './location';

export interface PickupPointDocument {
    passengerId: number;
    distanceFromPreviousStop: number;
    passengerLocation: LocationDocument;
    estimatedTimeToPick: number;
    order: number;
}
