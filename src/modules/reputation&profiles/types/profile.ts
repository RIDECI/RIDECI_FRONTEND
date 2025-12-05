import {type ProfileType, type IdentificationType } from "./enums"
import type { Reputation } from "./reputation"

// Type for data coming from the backend
export interface ProfileBackend {
    id: number;
    name: string;
    email: string;
    vehicles: string[];
    phoneNumber: string;
    ratings: string[];
    badges: string[];
    profileType: ProfileType;
    reputation: Reputation;
    identificationType: IdentificationType;
    identificationNumber: string;
    address: string;
    profilePictureUrl: string;
    birthDate: string; // Backend returns birthDate as string
}

// Type for use in the application
export interface Profile {
    id: number;
    name: string;
    email: string;
    vehicles: string[];
    phoneNumber: string;
    ratings: string[];
    badges: string[];
    profileType: ProfileType;
    reputation: Reputation;
    identificationType: IdentificationType;
    identificationNumber: string;
    address: string;
    profilePictureUrl: string;
    birthDate: Date; // Application uses Date object
}
