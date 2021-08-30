import { hash, compare } from "bcryptjs";

export async function hashPassword(pwd) {
  const hashedPassword = await hash(pwd, 12);
  return hashedPassword;
}

// hash pwd 是否相等
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
