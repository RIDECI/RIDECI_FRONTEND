export interface User {
  id: number;
  name?: string;
  role: 'driver' | 'passenger';
  email?: string;
}