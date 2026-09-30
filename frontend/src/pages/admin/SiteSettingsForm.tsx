import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSettings, updateSettings } from '../../services/settingsService';
import { SiteSettings } from '../../types/settings';
import { CATEGORY_LABELS, EventCategory } from '../../types/event';

export default function SiteSettingsFormPage() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings()
      .then(setForm)
      .catch(() => setError('No pudimos cargar el contenido del sitio.'))
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    if (!form) return;
    setForm({ ...form, [key]: value });
    setSaved(false);
  }

  function updateCategoryDesc(category: string, value: string) {
    if (!form) return;
    setForm({
      ...form,
      categoryDescriptions: { ...form.categoryDescriptions, [category]: value },
    });
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError('');
    try {
      const updated = await updateSettings(form);
      setForm(updated);
      setSaved(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'No pudimos guardar los cambios.');
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

  if (!form) {
    return (
      <div className="admin-content">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <strong>Contenido del sitio</strong>
          <Link to="/admin" className="btn btn-outline btn-sm">
            Volver
          </Link>
        </div>
      </div>

      <div className="admin-content">
        <p style={{ color: 'var(--color-text-muted)', marginTop: -6 }}>
          Estos son los textos fijos de la home (no son eventos). Al guardar, se actualizan al
          instante: cualquiera que recargue la página los va a ver.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="info-card">
            <h3>Portada (hero)</h3>
            <div className="form-group">
              <label>Texto pequeño arriba del título</label>
              <input value={form.heroEyebrow} onChange={(e) => update('heroEyebrow', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Título (línea principal)</label>
                <input
                  value={form.heroTitleLine1}
                  onChange={(e) => update('heroTitleLine1', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Título (palabra destacada en naranja)</label>
                <input
                  value={form.heroTitleAccent}
                  onChange={(e) => update('heroTitleAccent', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Subtítulo</label>
              <textarea value={form.heroSubtitle} onChange={(e) => update('heroSubtitle', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Botón principal</label>
                <input
                  value={form.heroPrimaryCta}
                  onChange={(e) => update('heroPrimaryCta', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Botón secundario</label>
                <input
                  value={form.heroSecondaryCta}
                  onChange={(e) => update('heroSecondaryCta', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Sección de categorías</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Texto pequeño</label>
                <input
                  value={form.sectionCategoriesEyebrow}
                  onChange={(e) => update('sectionCategoriesEyebrow', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Título de la sección</label>
                <input
                  value={form.sectionCategoriesTitle}
                  onChange={(e) => update('sectionCategoriesTitle', e.target.value)}
                />
              </div>
            </div>

            <label style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Descripción de cada categoría
            </label>
            {(Object.entries(CATEGORY_LABELS) as [EventCategory, string][]).map(([value, label]) => (
              <div key={value} className="form-group" style={{ marginTop: 10 }}>
                <label>{label}</label>
                <input
                  value={form.categoryDescriptions?.[value] || ''}
                  onChange={(e) => updateCategoryDesc(value, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="info-card">
            <h3>Sección de headliners</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Texto pequeño</label>
                <input
                  value={form.sectionLineupEyebrow}
                  onChange={(e) => update('sectionLineupEyebrow', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Título de la sección</label>
                <input
                  value={form.sectionLineupTitle}
                  onChange={(e) => update('sectionLineupTitle', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Sección de calendario</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Texto pequeño</label>
                <input
                  value={form.sectionCalendarEyebrow}
                  onChange={(e) => update('sectionCalendarEyebrow', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Título de la sección</label>
                <input
                  value={form.sectionCalendarTitle}
                  onChange={(e) => update('sectionCalendarTitle', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Newsletter (franja final)</h3>
            <div className="form-group">
              <label>Texto pequeño</label>
              <input value={form.ctaEyebrow} onChange={(e) => update('ctaEyebrow', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Título</label>
              <input value={form.ctaTitle} onChange={(e) => update('ctaTitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Texto del botón</label>
              <input
                value={form.ctaButtonLabel}
                onChange={(e) => update('ctaButtonLabel', e.target.value)}
              />
            </div>
          </div>

          <div className="info-card">
            <h3>Pie de página</h3>
            <div className="form-group">
              <label>Texto del footer</label>
              <input value={form.footerText} onChange={(e) => update('footerText', e.target.value)} />
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}
          {saved && !saving && <p className="success-text" style={{ marginBottom: 12 }}>Guardado ✓</p>}

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}
