import { Router } from 'express';
import { getEvents, getEventBySlug, getCategories } from '../controllers/eventController';

const router = Router();

// Rutas públicas
router.get('/', getEvents);
router.get('/categories', getCategories);
router.get('/:slug', getEventBySlug);

export default router;
