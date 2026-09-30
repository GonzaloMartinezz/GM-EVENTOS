import { api } from './api';
import { EventFilters, EventItem, PaginatedResponse, EventCategory } from '../types/event';

export async function fetchEvents(filters: EventFilters = {}): Promise<PaginatedResponse<EventItem>> {
  const params: Record<string, string | number | boolean> = {};
  if (filters.q) params.q = filters.q;
  if (filters.category) params.category = filters.category;
  if (filters.city) params.city = filters.city;
  if (filters.featured) params.featured = true;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  const { data } = await api.get<PaginatedResponse<EventItem>>('/events', { params });
  return data;
}

export async function fetchEventBySlug(slug: string): Promise<EventItem> {
  const { data } = await api.get<EventItem>(`/events/${slug}`);
  return data;
}

export async function fetchCategories(): Promise<EventCategory[]> {
  const { data } = await api.get<EventCategory[]>('/events/categories');
  return data;
}

// ---------- Admin ----------

export async function fetchAdminEvents(page = 1, limit = 20) {
  const { data } = await api.get<PaginatedResponse<EventItem>>('/admin/events', {
    params: { page, limit },
  });
  return data;
}

export async function fetchAdminEventById(id: string): Promise<EventItem> {
  const { data } = await api.get<EventItem>(`/admin/events/${id}`);
  return data;
}

export async function createEvent(payload: Partial<EventItem>): Promise<EventItem> {
  const { data } = await api.post<EventItem>('/admin/events', payload);
  return data;
}

export async function updateEvent(id: string, payload: Partial<EventItem>): Promise<EventItem> {
  const { data } = await api.put<EventItem>(`/admin/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  await api.delete(`/admin/events/${id}`);
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post<{ url: string }>('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url;
}
