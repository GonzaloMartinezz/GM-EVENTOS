import { Router } from 'express';
import apicache from 'apicache';
import { getEvents, getEventBySlug, getCategories } from '../controllers/eventController';

const router = Router();
const cache = apicache.middleware;

// Rutas públicas cacheadas en memoria por 5 minutos para altísimo rendimiento
router.get('/', cache('5 minutes'), getEvents);
router.get('/categories', cache('5 minutes'), getCategories);
router.get('/:slug', cache('5 minutes'), getEventBySlug);

export default router;
