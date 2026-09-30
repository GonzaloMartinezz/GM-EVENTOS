import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import ComoFunciona from './pages/ComoFunciona';
import EventDetail from './pages/EventDetail';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import EventForm from './pages/admin/EventForm';
import SiteSettingsFormPage from './pages/admin/SiteSettingsForm';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/como-funciona" element={<ComoFunciona />} />
      <Route path="/eventos/:slug" element={<EventDetail />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/eventos/:id"
        element={
          <ProtectedRoute>
            <EventForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contenido"
        element={
          <ProtectedRoute>
            <SiteSettingsFormPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
