import { api } from './api';
import { SiteSettings } from '../types/settings';

export async function fetchSettings(): Promise<SiteSettings> {
  const { data } = await api.get<SiteSettings>('/settings');
  return data;
}

export async function updateSettings(payload: Partial<SiteSettings>): Promise<SiteSettings> {
  const { data } = await api.put<SiteSettings>('/admin/settings', payload);
  return data;
}
