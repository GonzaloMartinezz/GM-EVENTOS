import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';

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
  app.use(cookieParser());
  app.use(compression()); // Comprime las respuestas HTTP (Gzip) para mayor rendimiento
  app.use(morgan('dev'));

  // --- CONFIGURACIÓN DE SEGURIDAD GLOBAL ---
  // Establece headers HTTP de seguridad
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Permite cargar recursos desde dominios externos si es necesario
  }));

  // Sanitizar data que entra (Evita NoSQL Injection)
  app.use(mongoSanitize());

  // Prevenir contaminación de parámetros HTTP (HPP)
  app.use(hpp());

  // Límite de peticiones por IP
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por IP por ventana
    message: { error: 'Demasiadas peticiones desde esta IP. Por favor intenta más tarde.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  // Aplicar rate limiter a todas las rutas de API
  app.use('/api', apiLimiter);
  // --- FIN SEGURIDAD ---

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
