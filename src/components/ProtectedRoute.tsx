import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  try {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    // If useAuth throws an error, context is not ready
    return <div>Loading...</div>;
  }
};

export default ProtectedRoute;