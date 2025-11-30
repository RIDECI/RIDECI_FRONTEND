import { Location } from "./location"
import { TravelType } from "./enums"
import { Status } from "./enums"
 export interface Travel{
    id: number,
    organizerId: number,
    dirverId: number,
    availableSlots: number,
    status: Status,
    travelType: TravelType,
    estimatedCost: number,
    departureDateTime: number,
    passengersId: number[],
    conditions: string,
    origin: Location,
    destiny: Location

}