import { LoginData } from './login.model';

export interface RegisterData extends LoginData {
  username: string;
}