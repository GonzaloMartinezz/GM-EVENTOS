import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAdminEvents, deleteEvent } from '../../services/eventService';
import { logout, getStoredUser } from '../../services/authService';
import { EventItem, CATEGORY_LABELS } from '../../types/event';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  async function load() {
    setLoading(true);
    try {
      const res = await fetchAdminEvents();
      setEvents(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`¿Seguro que querés eliminar "${title}"? Esta acción no se puede deshacer.`)) return;
    await deleteEvent(id);
    load();
  }

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <strong>Panel admin {user ? `· ${user.name}` : ''}</strong>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/admin/contenido" className="btn btn-outline btn-sm">
              Contenido del sitio
            </Link>
            <Link to="/" className="btn btn-outline btn-sm">
              Ver sitio
            </Link>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
              Salir
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>Eventos</h2>
          <Link to="/admin/eventos/nuevo" className="btn btn-primary">
            + Nuevo evento
          </Link>
        </div>

        {loading && <p>Cargando...</p>}

        {!loading && events.length === 0 && (
          <p className="empty-state">Todavía no cargaste ningún evento.</p>
        )}

        {!loading && events.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Publicado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{CATEGORY_LABELS[event.category]}</td>
                  <td>{new Date(event.startDate).toLocaleDateString('es-AR')}</td>
                  <td>{event.published ? 'Sí' : 'No'}</td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <Link to={`/admin/eventos/${event._id}`} className="btn btn-outline btn-sm">
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(event._id, event.title)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
