export interface ConversationResponse {
  id: string;
  travelId: string;
  driverId: number;
  type: 'TRIP' | 'GROUP';
  travelStatus: string;
  active: boolean;
  participants: number[];
  createdAt: string;
  updatedAt: string;
}