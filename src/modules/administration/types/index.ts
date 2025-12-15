// src/modules/administration/types/index.ts

export type IdentificationType = "CC" | "TI" | "CE" | "PP";

export interface Profile {
  role: "Acompañante" | "Conductor" | "Pasajero";
  rating: number;
  plate?: string | null;
  vehicle?: string | null;
}

export interface Report {
  id: string;
  title: string;
  reporter: string;
  conductor: string;
  severity: "CRÍTICA" | "ALTA" | "MEDIA" | "BAJA";
  status: "ABIERTO" | "EN INVESTIGACIÓN" | "RESUELTO" | "CRÍTICO";
  date: string;
  time: string;
  route: string;
  amount?: string;
  details?: string;
}

export interface UserCard {
  id: string;
  name: string;
  email?: string;
  profilePictureUrl?: string | null;
  phone?: string;
  identificationNumber?: string;
  identificationType?: IdentificationType;
  birthDate?: string;
  status?: "Pendiente" | "Verificado" | "Suspendido" | "Bloqueado" | string;
  profiles: Profile[];
  activeProfile?: Profile;
}

export type StatusFilter = "Todos" | "ABIERTO" | "EN INVESTIGACIÓN" | "RESUELTO" | "CRÍTICO";
export type SeverityFilter = "Todas" | "CRÍTICA" | "ALTA" | "MEDIA" | "BAJA";
export type PendingAction = null | "suspend_account" | "suspend_profile" | "activate_account" | "approve" | "reject" | "archive";
export type ErrorKind = "file" | "report" | "user";