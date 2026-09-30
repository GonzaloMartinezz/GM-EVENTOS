/** Genera un slug simple y legible a partir de un texto (sin dependencias externas) */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Genera un slug único agregando un sufijo random si ya existe */
export function uniqueSuffix(): string {
  return Math.random().toString(36).slice(2, 7);
}
