export interface ConversationResponse {
  id: string;    
  driverId: number;              
  travelId: number;  
  organizerId: number;         
  type: string;            
  active: boolean;          
  participants: number[];  
}
