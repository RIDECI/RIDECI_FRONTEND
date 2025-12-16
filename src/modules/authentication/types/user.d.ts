export enum IdentificationType {
  CC = "CC",
  TI = "TI",
  CE = "CE",
  PP = "PP",
}

export enum Role {
  PROFESSOR = "PROFESSOR",
  STUDENT = "STUDENT",
  ADMINISTRATOR = "ADMINISTRATOR",
}

export enum AccountState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
}


export interface User {
  userId: number;
  name: string;
  email: string;
  identificationType: IdentificationType;
  identificationNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  role: Role;
  state: AccountState;
}

export type ProfileType = 'conductor' | 'pasajero' | 'acompanante';

export interface Profile {
    id: ProfileType;
    title: string;
    icon: LucideIcon;
    image: string;
}