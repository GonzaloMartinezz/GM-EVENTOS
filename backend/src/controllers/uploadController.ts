import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// POST /api/admin/upload (multipart/form-data, campo "image")
export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No se recibió ningún archivo (campo "image")');
  }

  const publicUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ url: publicUrl });
});
