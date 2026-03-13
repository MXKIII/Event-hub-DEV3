import type { Request, Response, NextFunction } from "express";
import { RegisterUseCase } from "../../../application/usecases/auth/RegisterUseCase.js";
import { LoginUseCase } from "../../../application/usecases/auth/LoginUseCase.js";
import { UserRepositoryDatabase } from "../../../infrastructure/repositories/userRepositoryInterfaceDatabase.js";
import { authenticator } from "@otplib/preset-default";
import { otpBackupCodeRepository } from "../../config/container.js";
import crypto from "node:crypto";

function getBodyString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export class AuthController {
  private readonly registerUseCase: RegisterUseCase;
  private readonly loginUseCase: LoginUseCase;

  constructor() {
    const userRepo = new UserRepositoryDatabase();
    this.registerUseCase = new RegisterUseCase(userRepo);
    this.loginUseCase = new LoginUseCase(userRepo);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = getBodyString(req.body?.email).toLowerCase();
      const password = getBodyString(req.body?.password);

      const result = await this.registerUseCase.execute({ email, password });

      return res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (err) {
      return next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = getBodyString(req.body?.email).toLowerCase();
      const password = getBodyString(req.body?.password);
      const otpCode = getBodyString(req.body?.otpCode); 
      const result = await this.loginUseCase.execute({ email, password });
      const userRepo = new UserRepositoryDatabase();
      const user = await userRepo.findByEmail(email);

      if (user && user.otpEnabled) {
        if (!otpCode) {
          return res.status(200).json({
            status: "success",
            data: {
              otpRequired: true,
              message: "Code 2FA requis",
            },
          });
        }

        const secret = user.otpSecret ?? null;
        let isValid = false;

        if (secret) {
          isValid = authenticator.check(otpCode, secret);
        }

        if (!isValid) {
          const backupEntry = await otpBackupCodeRepository.findByUserId(user.id);

          if (backupEntry) {
            const storedHashes: string[] = JSON.parse(backupEntry.props.codes);
            const inputHash = crypto
              .createHash("sha256")
              .update(`${user.id}:${otpCode}`)
              .digest("hex");

            const matchIndex = storedHashes.indexOf(inputHash);

            if (matchIndex !== -1) {
              isValid = true;

              storedHashes.splice(matchIndex, 1);
              backupEntry.props.codes = JSON.stringify(storedHashes);
              backupEntry.props.nb_code_used += 1;
              await otpBackupCodeRepository.save(backupEntry);
            }
          }
        }

        if (!isValid) {
          return res.status(401).json({
            status: "error",
            message: "Code 2FA invalide",
          });
        }
      }

      res.cookie("accessToken", result.token, {
        httpOnly: true,
        secure: true, 
        sameSite: "lax",
        maxAge: 3600 * 24 * 7 * 1000, 
      });

      return res.status(200).json({
        status: "success",
        data: {
          user: result.user.id,
        },
      });
    } catch (err) {
      return next(err);
    }
  };
}