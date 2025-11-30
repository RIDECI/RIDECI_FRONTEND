export type BrebKeyType = 'document' | 'email' | 'phone';

export interface BrebKey {
  id: string;
  type: BrebKeyType;
  value: string;
  label: string;
  icon: string;
}