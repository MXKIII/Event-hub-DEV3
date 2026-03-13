-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpEnabled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "otp_secret" VARCHAR(40);
