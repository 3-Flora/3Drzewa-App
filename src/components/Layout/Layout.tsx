import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;