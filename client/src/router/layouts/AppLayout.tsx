import React from 'react';
import AppLayoutHeader from '/components/App/AppLayoutHeader';
import AppLayoutFooter from '/components/App/AppLayoutFooter';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="app">
      <AppLayoutHeader />
      <div className="content">
        <Outlet />
      </div>
      <AppLayoutFooter />
    </div>
  );
};

export default AppLayout;
