import type { User } from "../entities/users.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(input: { email: string; passwordHash: string }): Promise<User>;
  setOtpSecret(userId: string, otpSecret: string | null): Promise<void>;
  setOtpEnabled(userId: string, otpEnabled: number): Promise<void>;
}