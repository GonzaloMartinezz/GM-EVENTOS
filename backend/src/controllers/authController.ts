import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { signToken } from '../utils/jwt';

// POST /api/auth/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400);
    throw new Error('Email y contraseña son requeridos');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// GET /api/auth/me
export const me = asyncHandler(async (req: Request, res: Response) => {
  // @ts-expect-error viene del middleware requireAuth
  const authUser = req.user;
  const user = await User.findById(authUser.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
  res.json(user);
});
