export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  otpSecret: string | null;
  otpEnabled: number;
};

export interface IUserRepository {
  findByEmail(email: string): Promise<UserRecord | null>;
  findById(id: string): Promise<UserRecord | null>;
  create(input: { email: string; passwordHash: string }): Promise<UserRecord>;
  setOtpSecret(userId: string, otpSecret: string | null): Promise<void>;
  setOtpEnabled(userId: string, otpEnabled: number): Promise<void>;
}