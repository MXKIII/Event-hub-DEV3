import bcrypt from "bcryptjs";
import type { IUserRepository } from "../../../domain/interfaces/userRepositoryInterface.js";

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: { email: string; password: string }): Promise<{ id: string; email: string }> {
    const email = input.email?.trim();
    const password = input.password ?? "";

    if (!email) {
      throw Object.assign(new Error("Email is required"), { statusCode: 400 });
    }
    if (password.length < 8) {
      throw Object.assign(new Error("Password must be at least 8 characters"), { statusCode: 400 });
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw Object.assign(new Error("Email is already in use"), { statusCode: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({ email, passwordHash });

    return { id: user.id, email: user.email };
  }
}