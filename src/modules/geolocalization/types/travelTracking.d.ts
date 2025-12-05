import type { LocationDocument } from './location';
import type { TrackingConfigurationDocument } from './trackingConfiguration';

export interface TravelTrackingDocument {
    travelId: number;
    lastLocation: LocationDocument;
    lastUpdate: string;
    locationHistory: LocationDocument[];
    distanceTraveled: number;
    remainingDistance: number;
    trackingConfiguration: TrackingConfigurationDocument;
}
