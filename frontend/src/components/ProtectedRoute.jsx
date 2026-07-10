import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';

function ProtectedRoute({ children }) {
  if (!getToken()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
