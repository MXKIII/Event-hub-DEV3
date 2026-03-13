import crypto from "node:crypto";

function makeCode() {
  const raw = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

function sha256(input: string) {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}


export function generateBackupCodes(userId: string, count = 10) {
  const codes = Array.from({ length: count }, makeCode);
  const codesHash = codes.map((c) => sha256(`${userId}:${c}`));

  return { codes, codesHash };
}