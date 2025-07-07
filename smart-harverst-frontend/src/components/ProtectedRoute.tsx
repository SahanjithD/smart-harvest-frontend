import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ProtectedRouteProps = {
  allowedRoles?: Array<'owner' | 'supervisor'>;
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/farm-user/login" replace state={{ from: location }} />;
  }
  
  // Check role if restrictions exist
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User doesn't have required role, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // User is authenticated and has required role
  return <Outlet />;
};

export default ProtectedRoute;
