import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';
import {
  getAllEventsAdmin,
  getEventByIdAdmin,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { uploadImage } from '../controllers/uploadController';
import { updateSettings } from '../controllers/settingsController';

const router = Router();

// Todas las rutas de este archivo requieren estar logueado como admin
router.use(requireAuth);

router.get('/events', getAllEventsAdmin);
router.get('/events/:id', getEventByIdAdmin);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

router.put('/settings', updateSettings);

router.post('/upload', upload.single('image'), uploadImage);

export default router;
