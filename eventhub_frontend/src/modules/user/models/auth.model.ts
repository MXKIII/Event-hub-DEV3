import type { UserData } from './profile.model'
import type { RegisterData } from './register.model'
import type { LoginData } from './login.model'
import type { ApiLoginResponse } from '../services/auth.api'

export interface AuthContextType {
  currentUser: UserData | null
  isAuthenticated: boolean
  register: (data: RegisterData) => Promise<void>
  login: (data: LoginData & { otpCode?: string }) => Promise<ApiLoginResponse>
  logout: () => void
  updateProfile: (patch: Partial<UserData>) => void
}