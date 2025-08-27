import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import DesktopLayout from './DesktopLayout';

const Layout = () => {
  const location = useLocation();
  const isMapPage = location.pathname === '/map';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      {/* Desktop Layout with Sidebars */}
      <div className="hidden lg:block">
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      </div>

      {/* Mobile Layout with Bottom Navigation */}
      <div className="lg:hidden">
        <Navigation />
        <main className={`${isMapPage ? 'h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)]' : 'pb-20 lg:pb-0'} pt-12 lg:pt-16 bg-gray-50 dark:bg-dark-bg transition-colors duration-200`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;