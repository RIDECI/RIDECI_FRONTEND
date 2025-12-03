export interface MessageResponse {
    messageId?: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp?: Date;
}
