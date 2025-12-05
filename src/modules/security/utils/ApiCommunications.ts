import type { MessageResponse } from '../types/MessageResponse';
import type { ConversationResponse } from '../types/ConversationResponse';

const BASE_URL = 'https://web-production-d849d5.up.railway.app/conversations';

export const conversationApi = {
  getConversations: async (): Promise<ConversationResponse[]> => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
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
    receiverId: string,
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
        body: JSON.stringify({ senderId, receiverId, content })
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
