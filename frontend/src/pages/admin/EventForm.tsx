import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  createEvent,
  updateEvent,
  fetchAdminEventById,
  uploadImage,
} from '../../services/eventService';
import { resolveImageUrl } from '../../services/api';
import { BandMember, EventCategory, TicketPrice, CATEGORY_LABELS } from '../../types/event';

const emptyForm = {
  title: '',
  description: '',
  category: 'concierto' as EventCategory,
  startDate: '',
  venueName: '',
  address: '',
  city: 'San Miguel de Tucumán',
  province: 'Tucumán',
  mapsUrl: '',
  artistName: '',
  artistBio: '',
  ticketUrl: '',
  isFree: false,
  soldOut: false,
  featured: false,
  published: true,
  coverImage: '',
};

function toDateTimeLocal(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

export default function EventForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id && id !== 'nuevo');
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [bandMembers, setBandMembers] = useState<BandMember[]>([]);
  const [tickets, setTickets] = useState<TicketPrice[]>([{ label: 'General', price: 0 }]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (!isEditing || !id) return;
    fetchAdminEventById(id)
      .then((event) => {
        setForm({
          title: event.title,
          description: event.description,
          category: event.category,
          startDate: toDateTimeLocal(event.startDate),
          venueName: event.venueName,
          address: event.address,
          city: event.city,
          province: event.province,
          mapsUrl: event.mapsUrl || '',
          artistName: event.artistName,
          artistBio: event.artistBio || '',
          ticketUrl: event.ticketUrl || '',
          isFree: event.isFree,
          soldOut: event.soldOut,
          featured: event.featured,
          published: event.published,
          coverImage: event.coverImage || event.images[0] || '',
        });
        setBandMembers(event.bandMembers || []);
        setTickets(event.tickets.length ? event.tickets : [{ label: 'General', price: 0 }]);
      })
      .catch(() => setError('No pudimos cargar este evento.'))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError('');
    try {
      const url = await uploadImage(file);
      update('coverImage', url);
    } catch {
      setError('No pudimos subir la imagen. Probá con otro archivo (jpg, png o webp, hasta 8MB).');
    } finally {
      setUploading(false);
    }
  }

  function updateBandMember(idx: number, field: keyof BandMember, value: string) {
    setBandMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  }

  function addBandMember() {
    setBandMembers((prev) => [...prev, { name: '', role: '' }]);
  }

  function removeBandMember(idx: number) {
    setBandMembers((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateTicket(idx: number, field: keyof TicketPrice, value: string) {
    setTickets((prev) =>
      prev.map((t, i) =>
        i === idx ? { ...t, [field]: field === 'price' ? Number(value) || 0 : value } : t
      )
    );
  }

  function addTicket() {
    setTickets((prev) => [...prev, { label: '', price: 0 }]);
  }

  function removeTicket(idx: number) {
    setTickets((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.title || !form.startDate || !form.venueName || !form.artistName) {
      setError('Completá al menos título, fecha, lugar y artista/banda.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        bandMembers: bandMembers.filter((m) => m.name.trim()),
        tickets: form.isFree ? [] : tickets.filter((t) => t.label.trim()),
        images: form.coverImage ? [form.coverImage] : [],
      };

      if (isEditing && id) {
        await updateEvent(id, payload);
      } else {
        await createEvent(payload);
      }
      navigate('/admin');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'No pudimos guardar el evento. Revisá los datos.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-content">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <strong>{isEditing ? 'Editar evento' : 'Nuevo evento'}</strong>
          <Link to="/admin" className="btn btn-outline btn-sm">
            Volver
          </Link>
        </div>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit}>
          <div className="info-card">
            <h3>Datos generales</h3>

            <div className="form-group">
              <label>Título del evento *</label>
              <input value={form.title} onChange={(e) => update('title', e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoría</label>
                <select value={form.category} onChange={(e) => update('category', e.target.value as EventCategory)}>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Fecha y hora *</label>
                <input
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) => update('startDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Imagen del evento</h3>
            <div className="form-group">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              />
              {uploading && <p style={{ color: 'var(--color-text-muted)' }}>Subiendo imagen...</p>}
              {form.coverImage && (
                <div style={{ marginTop: 10, maxWidth: 240 }}>
                  <img src={resolveImageUrl(form.coverImage)} alt="Preview" style={{ borderRadius: 8 }} />
                </div>
              )}
            </div>
          </div>

          <div className="info-card">
            <h3>Artista / banda / elenco</h3>
            <div className="form-group">
              <label>Nombre del artista o banda *</label>
              <input value={form.artistName} onChange={(e) => update('artistName', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Bio / descripción del artista</label>
              <textarea value={form.artistBio} onChange={(e) => update('artistBio', e.target.value)} />
            </div>

            <label style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Integrantes (opcional)
            </label>
            {bandMembers.map((member, idx) => (
              <div key={idx} className="repeatable-row">
                <input
                  placeholder="Nombre"
                  value={member.name}
                  onChange={(e) => updateBandMember(idx, 'name', e.target.value)}
                />
                <input
                  placeholder="Rol (ej: voz, guitarra)"
                  value={member.role || ''}
                  onChange={(e) => updateBandMember(idx, 'role', e.target.value)}
                />
                <button type="button" className="btn btn-outline btn-sm" onClick={() => removeBandMember(idx)}>
                  Quitar
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline btn-sm" onClick={addBandMember}>
              + Agregar integrante
            </button>
          </div>

          <div className="info-card">
            <h3>Ubicación</h3>
            <div className="form-group">
              <label>Nombre del lugar *</label>
              <input value={form.venueName} onChange={(e) => update('venueName', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input value={form.address} onChange={(e) => update('address', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ciudad</label>
                <input value={form.city} onChange={(e) => update('city', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Provincia</label>
                <input value={form.province} onChange={(e) => update('province', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Link de Google Maps (cómo llegar)</label>
              <input value={form.mapsUrl} onChange={(e) => update('mapsUrl', e.target.value)} />
            </div>
          </div>

          <div className="info-card">
            <h3>Entradas</h3>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={form.isFree}
                  onChange={(e) => update('isFree', e.target.checked)}
                  style={{ width: 'auto' }}
                />
                Este evento es gratuito
              </label>
            </div>

            {!form.isFree && (
              <>
                {tickets.map((ticket, idx) => (
                  <div key={idx} className="repeatable-row">
                    <input
                      placeholder="Tipo (ej: General, VIP)"
                      value={ticket.label}
                      onChange={(e) => updateTicket(idx, 'label', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Precio $"
                      value={ticket.price}
                      onChange={(e) => updateTicket(idx, 'price', e.target.value)}
                    />
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => removeTicket(idx)}>
                      Quitar
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-outline btn-sm" onClick={addTicket}>
                  + Agregar tipo de entrada
                </button>
              </>
            )}

            <div className="form-group" style={{ marginTop: 14 }}>
              <label>Link externo de compra (Ticketek, Passline, etc.)</label>
              <input value={form.ticketUrl} onChange={(e) => update('ticketUrl', e.target.value)} />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={form.soldOut}
                  onChange={(e) => update('soldOut', e.target.checked)}
                  style={{ width: 'auto' }}
                />
                Entradas agotadas
              </label>
            </div>
          </div>

          <div className="info-card">
            <h3>Visibilidad</h3>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => update('featured', e.target.checked)}
                  style={{ width: 'auto' }}
                />
                Destacar este evento en la home
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => update('published', e.target.checked)}
                  style={{ width: 'auto' }}
                />
                Publicado (visible para el público)
              </label>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear evento'}
          </button>
        </form>
      </div>
    </div>
  );
}
