import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && err.stack ? { stack: err.stack } : {}),
  });
}
