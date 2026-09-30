import { api } from './api';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: AdminUser;
}

export async function login(email: string, password: string): Promise<AdminUser> {
  const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
  localStorage.setItem('admin_token', data.token);
  localStorage.setItem('admin_user', JSON.stringify(data.user));
  return data.user;
}

export function logout() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
}

export function getStoredUser(): AdminUser | null {
  const raw = localStorage.getItem('admin_user');
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('admin_token');
}
