import { Router } from 'express';
import { getSettings } from '../controllers/settingsController';

const router = Router();

// Público: la home lo consume para armar los textos
router.get('/', getSettings);

export default router;
