import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  const location = useLocation();
  const isMapPage = location.pathname === '/map';

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className={`${isMapPage ? 'h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]' : 'pb-20 md:pb-0'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;