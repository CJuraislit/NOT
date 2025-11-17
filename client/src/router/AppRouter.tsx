import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from '/routes/routes';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '/routes/consts';
import AuthLayout from '/router/layouts/AuthLayout';
import Auth from '/pages/Auth/Auth';
import PrivateRoute from '/router/guards/PrivateRoute';
import AppLayout from '/router/layouts/AppLayout';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={LOGIN_ROUTE} element={<Auth />} />
        <Route path={REGISTER_ROUTE} element={<Auth />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} Component={Component} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
