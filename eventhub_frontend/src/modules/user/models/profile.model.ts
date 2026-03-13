import type { RegisterData } from './register.model';

export interface UserData extends Omit<RegisterData, 'password'> {
  id: string;
  otpEnabled?: boolean;
}