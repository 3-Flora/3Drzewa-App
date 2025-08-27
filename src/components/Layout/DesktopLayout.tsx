import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  Plus, 
  Users, 
  CheckCircle,
  Home,
  BookOpen,
  FileText,
  BarChart3,
  Search
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const isMapPage = location.pathname === '/map';

  const leftNavItems = [
    { 
      path: '/community', 
      icon: Home, 
      label: 'Strona główna',
      color: 'accent',
      colorClass: 'accent'
    },
    { 
      path: '/map', 
      icon: Map, 
      label: 'Mapa',
      color: 'primary',
      colorClass: 'primary'
    },
    { 
      path: '/submit', 
      icon: Plus, 
      label: 'Zgłoś drzewo',
      color: 'secondary',
      colorClass: 'secondary'
    },
    { 
      path: '/verify', 
      icon: CheckCircle, 
      label: 'Weryfikacja',
      color: 'accent',
      colorClass: 'accent'
    },
    { 
      path: '/forms', 
      icon: FileText, 
      label: 'Moje wnioski',
      color: 'primary',
      colorClass: 'primary'
    },
    { 
      path: '/reports', 
      icon: BarChart3, 
      label: 'Raporty',
      color: 'secondary',
      colorClass: 'secondary'
    },
    { 
      path: '/species', 
      icon: BookOpen, 
      label: 'Encyklopedia',
      color: 'accent',
      colorClass: 'accent'
    },
    { 
      path: '/legends', 
      icon: Search, 
      label: 'Legendy',
      color: 'primary',
      colorClass: 'primary'
    },
  ];



  // On map page, show only left sidebar
  if (isMapPage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        {/* Left Sidebar - Always visible on map page */}
        <motion.aside 
          className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border z-40 overflow-y-auto transition-colors duration-200"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-6">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-8"
            >
              <Link 
                to="/community" 
                className="flex items-center space-x-3 text-accent-700 dark:text-accent-400 font-bold text-xl hover:text-accent-800 dark:hover:text-accent-300 transition-colors"
              >
                <img 
                  src="/image copy.png"
                  alt="3Drzewa Logo" 
                  className="w-10 h-10 object-cover rounded-full border-2 border-accent-300 shadow-lg"
                />
                <span>3Drzewa</span>
              </Link>
            </motion.div>

            {/* Navigation Items */}
            <nav className="space-y-2">
              {leftNavItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? (item.colorClass === 'primary' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700' :
                             item.colorClass === 'secondary' ? 'bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700' :
                             'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 border border-accent-200 dark:border-accent-700')
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                                          <item.icon className={`w-5 h-5 ${
                        item.colorClass === 'primary' ? 'text-primary-600' :
                        item.colorClass === 'secondary' ? 'text-secondary-600' :
                        'text-accent-600'
                      }`} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content - Only left margin for map page */}
        <main className="ml-64 min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
          {children}
        </main>
      </div>
    );
  }

  // On other pages, show both sidebars
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      {/* Left Sidebar */}
      <motion.aside 
        className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border z-40 overflow-y-auto transition-colors duration-200"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8"
          >
            <Link 
              to="/community" 
              className="flex items-center space-x-3 text-accent-700 font-bold text-xl hover:text-accent-800 transition-colors"
            >
              <img 
                src="/image copy.png"
                alt="3Drzewa Logo" 
                className="w-10 h-10 object-cover rounded-full border-2 border-accent-300 shadow-lg"
              />
              <span>3Drzewa</span>
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {leftNavItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      isActive
                        ? (item.colorClass === 'primary' ? 'bg-primary-100 text-primary-700 border border-primary-200' :
                           item.colorClass === 'secondary' ? 'bg-secondary-100 text-secondary-700 border border-secondary-200' :
                           'bg-accent-100 text-accent-700 border border-accent-200')
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${
                      item.colorClass === 'primary' ? 'text-primary-600' :
                      item.colorClass === 'secondary' ? 'text-secondary-600' :
                      'text-accent-600'
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.aside>



      {/* Right Sidebar - Empty but visible for layout consistency */}
      <motion.aside 
        className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-dark-card border-l border-gray-200 dark:border-dark-border z-40 overflow-y-auto transition-colors duration-200"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6">
          {/* Empty sidebar - keeping layout consistent */}
          <div className="text-center text-gray-400 mt-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-sm">Prawy sidebar</p>
            <p className="text-xs">Zachowuje spójność layoutu</p>
          </div>
        </div>
      </motion.aside>

              {/* Main Content - Both margins for other pages */}
        <main className="ml-64 mr-64 min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        {children}
      </main>
    </div>
  );
};

export default DesktopLayout;
