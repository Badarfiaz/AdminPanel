import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check if the user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // If not logged in, redirect to login page
  }

  return children; // If logged in, render the child components
};

export default PrivateRoute;
