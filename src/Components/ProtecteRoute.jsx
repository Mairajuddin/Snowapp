
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  const isAuthenticated = localStorage.getItem('X!@er88') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;