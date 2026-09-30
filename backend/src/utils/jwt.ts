import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export function signToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Falta la variable de entorno JWT_SECRET');

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Falta la variable de entorno JWT_SECRET');
  return jwt.verify(token, secret) as JwtPayload;
}
