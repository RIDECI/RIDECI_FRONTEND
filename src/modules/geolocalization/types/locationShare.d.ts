export enum ShareStatus {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export interface LocationShareDocument {
    id: string;
    userId: number;
    travelId: number;
    emergencyContacts: string[];
    createdAt: string;
    expiresAt: string;
    trackingUrl: string;
    shareStatus: ShareStatus;
}
