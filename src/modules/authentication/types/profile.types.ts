import type {LucideIcon} from 'lucide-react';

export type ProfileType = 'conductor' | 'pasajero' | 'acompanante';

export interface Profile {
    id: ProfileType;
    title: string;
    icon: LucideIcon;
    image: string;
}