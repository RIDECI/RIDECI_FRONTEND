import type { LocationDocument } from './location';
import type { PickupPointDocument } from './pickupPoint';
import type { LocationShareDocument } from './locationShare';
import type { TravelTrackingDocument } from './travelTracking';

export interface RouteDocument {
    id: string;
    travelId: string;
    origin: LocationDocument;
    destiny: LocationDocument;
    totalDistance: number;
    estimatedTime: number;
    polyline: string;
    departureDateAndTime: string;
    pickUpPoints: PickupPointDocument[];
    locationShare: LocationShareDocument;
    travelTracking: TravelTrackingDocument;
}
