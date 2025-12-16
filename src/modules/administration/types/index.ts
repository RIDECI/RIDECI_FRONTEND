// src/modules/administration/types/index.ts

import type { SecurityReport } from '../services/reportService';

export interface Profile {
  role: "Conductor" | "Pasajero" | "Acompañante";
  rating: number;
  plate?: string;
  vehicle?: string;
  status?: "Activo" | "Suspendido"; 
}

export interface UserCard {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  phone?: string;
  identificationNumber?: string;
  identificationType?: string;
  birthDate?: string;
  status: "Pendiente" | "Verificado" | "Suspendido" | "Bloqueado";
  profiles: Profile[];
  activeProfile?: Profile;
}

export type PendingAction = 
  | "approve" 
  | "reject" 
  | "suspend_account" 
  | "suspend_profile" 
  | "activate_account" 
  | "activate_profile"
  | "archive" 
  | null;

// Report legacy 
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

// Re-exportar EnrichedReport del servicio de enriquecimiento
export type { EnrichedReport } from '../services/reportEnrichmentService';
export type { SecurityReport } from '../services/reportService';

export type StatusFilter = "Todos" | "ABIERTO" | "EN INVESTIGACIÓN" | "RESUELTO" | "CRÍTICO";
export type SeverityFilter = "Todas" | "CRÍTICA" | "ALTA" | "MEDIA" | "BAJA";

export type ErrorKind = "network" | "validation" | "unknown" | null;