import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

// ProtectedRoute - Only protects routes that require authentication (cart, checkout, orders)
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
