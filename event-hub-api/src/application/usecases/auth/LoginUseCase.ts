import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { IUserRepository } from "../../../domain/interfaces/userRepositoryInterface.js";

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: { email: string; password: string }): Promise<{
    token: string;
    user: { id: string; email: string; otpEnabled: boolean };
  }> {
    const email = input.email?.trim();
    const password = input.password ?? "";

    if (!email || !password) {
      throw Object.assign(new Error("Email and password are required"), { statusCode: 400 });
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw Object.assign(new Error("JWT_SECRET is not configured"), { statusCode: 500 });
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn: "7d" });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        otpEnabled: !!user.otpEnabled,
      },
    };
  }
}