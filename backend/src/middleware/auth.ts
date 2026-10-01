import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  let token = req.cookies?.token;

  if (!token && header && header.startsWith('Bearer ')) {
    token = header.slice('Bearer '.length);
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado: falta el token' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado: token inválido o expirado' });
  }
}
