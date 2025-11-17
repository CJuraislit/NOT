import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_ROUTE } from '/routes/consts';
import { useAuthStore } from '/store/auth.store';

const PrivateRoute = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <Outlet /> : <Navigate to={LOGIN_ROUTE} replace />;
};

export default PrivateRoute;
