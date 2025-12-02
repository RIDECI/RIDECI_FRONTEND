export interface Profile {
    id?: number;
    name: string;
    email: string;
    phoneNumber?: string;
    password: string[];
    bio?: string;
    profilePictureUrl?: string;
}