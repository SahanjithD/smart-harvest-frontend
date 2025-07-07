import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// Use the component from the same directory
import SupervisorDashboard from './SupervisorDashboard';

// This acts as a router to the appropriate dashboard based on user role
const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Only redirect if we know the user is authenticated and is an owner
    if (isAuthenticated && user?.role === 'owner') {
      navigate('/owner-dashboard', { replace: true });
    }
  }, [user, navigate, isAuthenticated]);
  
  // Show loading state if authentication is still being determined
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // For supervisors, show supervisor dashboard
  return <SupervisorDashboard />;
};

export default Dashboard;
