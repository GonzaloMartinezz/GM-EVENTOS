import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
