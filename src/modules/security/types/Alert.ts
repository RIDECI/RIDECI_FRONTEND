export type StateAlert = "Aprobado" | "Pendiente" | "Rechazado";

export interface Alert {
  id: string;
  type: string;
  date: string;
  state: StateAlert;
  userReport: string;
  senderId?: string;
  evidence?: string;
  comment?: string;
  
}