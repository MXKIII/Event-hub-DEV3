import type { IUserRepository, UserRecord } from "../../domain/interfaces/userRepositoryInterface.js";
import { prisma } from "../../prisma/client.js";

export class UserRepositoryDatabase implements IUserRepository {
  async findByEmail(email: string): Promise<UserRecord | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      otpSecret: user.otpSecret,
      otpEnabled: user.otpEnabled,
    };
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      otpSecret: user.otpSecret,
      otpEnabled: user.otpEnabled,
    };
  }

  async create(input: { email: string; passwordHash: string }): Promise<UserRecord> {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
      },
    });

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      otpSecret: user.otpSecret,
      otpEnabled: user.otpEnabled,
    };
  }

  async setOtpSecret(userId: string, otpSecret: string | null): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { otpSecret },
    });
  }

  async setOtpEnabled(userId: string, otpEnabled: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { otpEnabled },
    });
  }
}