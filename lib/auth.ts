import { pbkdf2Sync, randomBytes } from "crypto";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const verifyHash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString(
    "hex",
  );
  return hash === verifyHash;
}
