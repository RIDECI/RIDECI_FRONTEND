import { Location } from "./location"
import { TravelType } from "./enums"
import { Status } from "./enums"
export interface Travel {
    id: string,
    organizerId: string,
    driverId: string,
    availableSlots: number,
    status: Status,
    travelType: TravelType,
    estimatedCost: number,
    departureDateTime: number,
    passengersId: string[],
    conditions: string,
    origin: Location,
    destiny: Location

}