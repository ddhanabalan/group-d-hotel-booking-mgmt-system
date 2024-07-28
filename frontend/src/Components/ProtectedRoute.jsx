import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedUserTypes, userType }) => {
  return allowedUserTypes.includes(userType) ? element : <Navigate to="ErrorPage" />;
};

export default ProtectedRoute;
