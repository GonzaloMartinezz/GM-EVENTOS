import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Event, { EVENT_CATEGORIES } from '../models/Event';
import { slugify, uniqueSuffix } from '../utils/slugify';
import { AuthRequest } from '../middleware/auth';

/**
 * GET /api/events
 * Query params soportados:
 *  - q: texto libre (busca en título, artista, descripción, lugar)
 *  - category: una de EVENT_CATEGORIES
 *  - city: filtra por ciudad
 *  - from, to: rango de fechas (ISO)
 *  - featured: "true" para solo destacados
 *  - page, limit: paginación
 */
export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const {
    q,
    category,
    city,
    from,
    to,
    featured,
    page = '1',
    limit = '12',
  } = req.query as Record<string, string>;

  const filter: Record<string, any> = { published: true };

  if (q && q.trim()) {
    filter.$text = { $search: q.trim() };
  }
  if (category && EVENT_CATEGORIES.includes(category as any)) {
    filter.category = category;
  }
  if (city) {
    filter.city = new RegExp(city, 'i');
  }
  if (featured === 'true') {
    filter.featured = true;
  }
  if (from || to) {
    filter.startDate = {};
    if (from) filter.startDate.$gte = new Date(from);
    if (to) filter.startDate.$lte = new Date(to);
  } else {
    // Por default solo mostramos eventos que todavía no pasaron
    filter.startDate = { $gte: new Date(new Date().setHours(0, 0, 0, 0)) };
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);

  const [events, total] = await Promise.all([
    Event.find(filter)
      .sort({ startDate: 1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Event.countDocuments(filter),
  ]);

  res.json({
    data: events,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// GET /api/events/:slug
export const getEventBySlug = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.findOne({ slug: req.params.slug, published: true });
  if (!event) {
    res.status(404);
    throw new Error('Evento no encontrado');
  }
  res.json(event);
});

// GET /api/events/categories (lista fija, útil para el frontend)
export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  res.json(EVENT_CATEGORIES);
});

// ---------- Rutas protegidas (admin) ----------

// GET /api/admin/events (incluye no publicados)
export const getAllEventsAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { page = '1', limit = '20' } = req.query as Record<string, string>;
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const [events, total] = await Promise.all([
    Event.find({})
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Event.countDocuments({}),
  ]);

  res.json({
    data: events,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
  });
});

// GET /api/admin/events/:id
export const getEventByIdAdmin = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Evento no encontrado');
  }
  res.json(event);
});

async function generateUniqueSlug(title: string): Promise<string> {
  let slug = slugify(title);
  let exists = await Event.exists({ slug });
  while (exists) {
    slug = `${slugify(title)}-${uniqueSuffix()}`;
    exists = await Event.exists({ slug });
  }
  return slug;
}

// POST /api/admin/events
export const createEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body;

  if (!body.title || !body.startDate || !body.venueName || !body.artistName) {
    res.status(400);
    throw new Error('Faltan campos obligatorios: title, startDate, venueName, artistName');
  }

  const slug = await generateUniqueSlug(body.title);

  const event = await Event.create({
    ...body,
    slug,
    createdBy: req.user?.id,
  });

  res.status(201).json(event);
});

// PUT /api/admin/events/:id
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Evento no encontrado');
  }

  const body = req.body;

  // Si cambia el título, regeneramos el slug para que siga siendo legible
  if (body.title && body.title !== event.title) {
    body.slug = await generateUniqueSlug(body.title);
  }

  Object.assign(event, body);
  await event.save();

  res.json(event);
});

// DELETE /api/admin/events/:id
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Evento no encontrado');
  }
  res.json({ message: 'Evento eliminado', id: event.id });
});
