import { OtpBackupCode } from "../entities/otp-backup-code.js";

export interface IOtpBackupCodeRepository {
    save(codeBackup: OtpBackupCode): Promise<OtpBackupCode>;
    findByUserId(id: string): Promise<OtpBackupCode | null>;
    deleteByUserId(id: string): Promise<void>; 
}