export type StateReport = "Aprobado" | "Pendiente" | "Rechazado";

export interface Report {
  id: string;
  type: string;
  date: string;
  state: StateReport;
  userReport: string;
  senderId?: string;
  evidence?: string;
  comment?: string;
  
}