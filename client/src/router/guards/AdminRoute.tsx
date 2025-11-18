import React from 'react';
import { useAuthStore } from '/store/auth.store';
import { useMyProfileQuery } from '/hooks/queries/user.queries';
import { HOME_ROUTE, LOGIN_ROUTE } from '/routes/consts';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { data: me, isLoading, isError } = useMyProfileQuery();

  if (isLoading) return null;

  if (isError || !me) return <Navigate to={HOME_ROUTE} replace />;

  if (me.role !== 'ADMIN') {
    return <Navigate to={HOME_ROUTE} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
