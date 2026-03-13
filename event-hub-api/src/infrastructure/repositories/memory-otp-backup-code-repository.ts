import { OtpBackupCode } from "../../domain/entities/otp-backup-code.js";
import type { IOtpBackupCodeRepository } from "../../domain/interfaces/otp-backup-code-repository.interface.js";

export class MemoryOtpBackupCodeRepository implements IOtpBackupCodeRepository {
    private codesBackup: OtpBackupCode[] = [];

    async save(codeBackup: OtpBackupCode): Promise<OtpBackupCode> {

        const index = this.codesBackup.findIndex(
            (item) => item.props.user_id === codeBackup.props.user_id
        );

        if (index !== -1) {
            this.codesBackup[index] = codeBackup;
        } else {
            this.codesBackup.push(codeBackup);
        }

        return codeBackup;
    }

    async findByUserId(id: string): Promise<OtpBackupCode | null> {
        return this.codesBackup.find((codesBackup) => codesBackup.props.user_id === id) ?? null;
    }

    async deleteByUserId(id: string): Promise<void> {
        this.codesBackup = this.codesBackup.filter(
            (item) => item.props.user_id !== id
        );
    }
}