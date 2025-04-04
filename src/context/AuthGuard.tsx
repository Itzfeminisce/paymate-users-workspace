import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const AuthGuard: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  

  // Show nothing while checking authentication status
  if (isLoading) {
    return null; // Or a loading spinner component
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }


  return <Outlet />;
};

export default AuthGuard;
