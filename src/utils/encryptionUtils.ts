import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function generateHash({ password, saltRounds = 10 }: { password: string, saltRounds?: number}): string {
  return bcrypt.hashSync(password, saltRounds);
}

export function verifyHash({ password, hash }: { password: string; hash: string }): boolean {
  return bcrypt.compareSync(password, hash);
}

export async function generateCookie({ key, value }: { key: string; value: string }) {
  const data: { [key: string]: string } = {};
  data[key] = value;
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: process.env.USER_COOKIE_EXPIRY,
  });
}

export async function verifyCookie({ token }: { token: string }) : Promise<any> {
  return jwt.verify(token, process.env.JWT_SECRET);
}
