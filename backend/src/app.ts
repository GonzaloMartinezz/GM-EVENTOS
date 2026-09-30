import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import eventRoutes from './routes/eventRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import settingsRoutes from './routes/settingsRoutes';
import { notFound, errorHandler } from './middleware/errorHandler';

export function createApp(): Application {
  const app = express();

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.use(
    cors({
      origin: [frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    })
  );

  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // Archivos subidos (flyers, fotos) servidos como estáticos
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'eventos-tucuman-api' }));

  app.use('/api/events', eventRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/settings', settingsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
