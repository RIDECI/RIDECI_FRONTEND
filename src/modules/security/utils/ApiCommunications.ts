import type { MessageResponse } from '../types/MessageResponse';
import type { ConversationResponse } from '../types/ConversationResponse';

const BASE_URL = 'https://hadescommunicationsecuritybackend-development.up.railway.app/conversations';

export const conversationApi = {
  getConversations: async (): Promise<ConversationResponse[]> => {
    try {
      console.log('🔄 Fetching conversations from:', BASE_URL);
      
      const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorText = await response.text();
          errorDetails = errorText;
          console.error('❌ Error response body:', errorText);
        } catch (textError) {
          errorDetails = 'No se pudo obtener detalles del error';
        }
        
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
      }

      const data = await response.json();
      console.log('✅ Conversations data received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching conversations:', error);
      throw error; 
    }
  },

  getConversation: async (conversationId: string): Promise<ConversationResponse | null> => {
    try {
      const response = await fetch(`${BASE_URL}/${conversationId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching conversation:', error);
      return null;
    }
  },

  getMessages: async (conversationId: string): Promise<MessageResponse[]> => {
    try {
      const response = await fetch(`${BASE_URL}/${conversationId}/messages`, {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  sendMessage: async (
    conversationId: string,
    senderId: string,
    content: string
  ): Promise<MessageResponse | null> => {
    try {
      const response = await fetch(`${BASE_URL}/${conversationId}/messages`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ senderId, content })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  }
};