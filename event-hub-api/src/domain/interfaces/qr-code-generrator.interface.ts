export interface IQrCodeGenerator {
  generate(username: string, secret: string): Promise<{ image: string; username: string; secret: string }>;
}