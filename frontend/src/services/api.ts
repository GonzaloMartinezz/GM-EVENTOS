import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
});

// Adjunta el token del admin (si existe) a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el token expiró o es inválido, deslogueamos automáticamente
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
    return Promise.reject(error);
  }
);

/** Base para armar la URL completa de una imagen subida (ej: /uploads/foo.jpg) */
export function resolveImageUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  const base = API_URL.replace(/\/api\/?$/, '');
  return `${base}${pathOrUrl}`;
}
