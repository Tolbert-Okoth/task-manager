import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // Get the token from the auth state
  const { token } = useSelector((state) => state.auth);

  // If token exists, render the child component (e.g., Dashboard)
  // Otherwise, navigate to the login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;