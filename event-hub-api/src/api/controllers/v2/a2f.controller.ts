import type { NextFunction, Request, Response } from "express";
import { authenticator } from "@otplib/preset-default";
import { qrCodeGenerator, otpBackupCodeRepository } from "../../config/container.js";
import { UserRepositoryDatabase } from "../../../infrastructure/repositories/userRepositoryInterfaceDatabase.js";
import { generateBackupCodes } from "../../../utility/otp-backup-code-generator.js";
import { OtpBackupCode } from "../../../domain/entities/otp-backup-code.js";

export const qrCode = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!req.auth?.userId) {
      return res.jsonError("Vous n'êtes pas connecté", 401);
    }

    const userRepository = new UserRepositoryDatabase();
    const user = await userRepository.findById(req.auth.userId);

    if (!user) {
      return res.jsonError("Utilisateur introuvable", 404);
    }

    const secret = authenticator.generateSecret();

    await userRepository.setOtpSecret(user.id, secret);
    await userRepository.setOtpEnabled(user.id, 0);

    const qrCode = await qrCodeGenerator.generate(user.email, secret);

    return res.jsonSuccess({ qrCode }, 200);
  } catch (error) {
    next(error);
  }
};

export const enable = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!req.auth?.userId) {
      return res.jsonError("Vous n'êtes pas connecté", 401);
    }

    const { code } = req.body as { code?: string };

    if (!code || typeof code !== "string") {
      return res.jsonError("code is required", 400);
    }

    const userRepository = new UserRepositoryDatabase();
    const user = await userRepository.findById(req.auth.userId);

    if (!user) {
      return res.jsonError("Utilisateur introuvable", 404);
    }

    const secret = (user as any).otpSecret ?? (user as any).otp_secret;

    if (!secret) {
      return res.jsonError("OTP secret introuvable. Générez d'abord le QR code.", 400);
    }

    const isValid = authenticator.check(code, secret);

    if (!isValid) {
      return res.jsonError("Code OTP invalide", 401);
    }


    await userRepository.setOtpEnabled(user.id, 1);


    const { codes, codesHash } = generateBackupCodes(user.id, 10);

    const entity = new OtpBackupCode({
      id: Date.now(),
      user_id: user.id,
      codes: JSON.stringify(codesHash),
      nb_code_used: 0,
      nb_consecutive_tests: 0,
    });

    entity.validateOrThrow();
    await otpBackupCodeRepository.save(entity);


    return res.jsonSuccess({ message: "2FA activé", backupCodes: codes }, 200);
  } catch (error) {
    next(error);
  }
};

export const disable = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!req.auth?.userId) {
      return res.jsonError("Vous n'êtes pas connecté", 401);
    }

    const userRepository = new UserRepositoryDatabase();
    const user = await userRepository.findById(req.auth.userId);

    if (!user) {
      return res.jsonError("Utilisateur introuvable", 404);
    }

    await userRepository.setOtpEnabled(user.id, 0);
    await userRepository.setOtpSecret(user.id, null);
    
 
    await otpBackupCodeRepository.deleteByUserId(user.id);

    return res.jsonSuccess({ message: "2FA désactivé" }, 200);
  } catch (error) {
    next(error);
  }
};

