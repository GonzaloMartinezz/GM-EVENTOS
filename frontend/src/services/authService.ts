import { api } from './api';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  user: AdminUser;
}

export async function login(email: string, password: string): Promise<AdminUser> {
  const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
  // El token se guarda automáticamente en una cookie HttpOnly
  localStorage.setItem('admin_user', JSON.stringify(data.user));
  return data.user;
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } catch (err) {
    console.error('Error al cerrar sesión', err);
  }
  localStorage.removeItem('admin_user');
}

export function getStoredUser(): AdminUser | null {
  const raw = localStorage.getItem('admin_user');
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('admin_user');
}
