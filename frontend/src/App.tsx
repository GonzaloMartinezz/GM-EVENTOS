import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

// Code Splitting (Lazy Loading) para mejorar radicalmente el rendimiento inicial
const Agenda = lazy(() => import('./pages/Agenda'));
const ComoFunciona = lazy(() => import('./pages/ComoFunciona'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const EventForm = lazy(() => import('./pages/admin/EventForm'));
const SiteSettingsFormPage = lazy(() => import('./pages/admin/SiteSettingsForm'));

export default function App() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-black flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#ff3c00] border-t-transparent rounded-full animate-spin"></div></div>}>
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
    </Suspense>
  );
}
