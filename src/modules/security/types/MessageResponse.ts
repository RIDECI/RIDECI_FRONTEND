export interface MessageResponse {
    messageId?: string;
    conversationId: string;
    senderId: string;
    content: string;
    timestamp?: Date;
}