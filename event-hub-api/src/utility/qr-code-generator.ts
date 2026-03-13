import qrcode from "qrcode";
import { authenticator } from "@otplib/preset-default";
import type { IQrCodeGenerator } from "../domain/interfaces/qr-code-generrator.interface.js";

export class QrCodeGenerator implements IQrCodeGenerator {
  constructor(private readonly appName: string) {}

  async generate(username: string, secret: string) {
    const otpauth = authenticator.keyuri(username, this.appName, secret);
    const image = await qrcode.toDataURL(otpauth);
    return { image, username, secret };
  }
}