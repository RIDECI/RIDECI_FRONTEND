// src/modules/administration/types/index.ts

export type IdentificationType = "CC" | "TI" | "CE" | "PP";

export type Profile = {
  role: "Acompañante" | "Conductor" | "Pasajero";
  rating: number;
  plate?: string | null;
  vehicle?: string | null;
};

export type UserCard = {
  id: string;
  name: string;
  email?: string;
  profilePictureUrl?: string | null;
  phone?: string;
  identificationNumber?: string;
  identificationType?: IdentificationType;
  birthDate?: string; // ISO string
  status?: "Pendiente" | "Verificado" | "Suspendido" | "Bloqueado" | string;
  profiles: Profile[];
  activeProfile?: Profile;
};

export type PendingAction = null | "suspend_account" | "suspend_profile" | "activate_account" | "approve" | "reject";
