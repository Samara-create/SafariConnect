import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(localStorage.getItem('user'));
if (parsedUser?.role === 'admin') {
  return <Navigate to="/admin/dashboard" replace />;
}else {
  return <Navigate to="/Explore" replace />;
}

  return children; // ✅ return JSX component, not an object
};

export default AdminRoute; 
