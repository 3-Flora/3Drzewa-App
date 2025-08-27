import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  Plus, 
  Users, 
  CheckCircle,
  MoreHorizontal,
  User,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const location = useLocation();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  // Only show navigation items if user is authenticated
  if (!auth) {
    return null;
  }

  const navItems = [
    { 
      path: '/map', 
      icon: Map, 
      label: 'Mapa', 
      desktop: 'Mapa',
      color: 'primary',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600',
      hoverBg: 'hover:bg-primary-200',
      activeBg: 'bg-primary-600',
      hoverBorder: 'hover:border-primary-300'
    },
    { 
      path: '/community', 
      icon: Users, 
      label: 'Feed', 
      desktop: 'Społeczność',
      color: 'secondary',
      bgColor: 'bg-secondary-100',
      textColor: 'text-secondary-600',
      hoverBg: 'hover:bg-secondary-200',
      activeBg: 'bg-secondary-600',
      hoverBorder: 'hover:border-secondary-300'
    },
    { 
      path: '/submit', 
      icon: Plus, 
      label: 'Zgłoś', 
      desktop: 'Zgłoś drzewo',
      color: 'accent',
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-600',
      hoverBg: 'hover:bg-accent-200',
      activeBg: 'bg-accent-600',
      hoverBorder: 'hover:border-accent-300'
    },
    { 
      path: '/verify', 
      icon: CheckCircle, 
      label: 'Sprawdź', 
      desktop: 'Weryfikacja',
      color: 'primary',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-700',
      hoverBg: 'hover:bg-primary-200',
      activeBg: 'bg-primary-700',
      hoverBorder: 'hover:border-primary-400'
    },
    { 
      path: '/settings', 
      icon: MoreHorizontal, 
      label: 'Więcej', 
      desktop: 'Więcej',
      color: 'secondary',
      bgColor: 'bg-secondary-100',
      textColor: 'text-secondary-700',
      hoverBg: 'hover:bg-secondary-200',
      activeBg: 'bg-secondary-700',
      hoverBorder: 'hover:border-secondary-400'
    },
  ];

  const currentTime = new Date().toLocaleTimeString('pl-PL', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <>
      {/* Desktop Navigation - Sticky Top */}
      <motion.nav 
        className="hidden md:flex bg-white shadow-xl border-b-4 border-emerald-200 px-8 py-2 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
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
          
          <div className="flex-1 flex items-center justify-center space-x-6 ml-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center py-2 px-2 rounded-2xl transition-all duration-300 min-w-0 flex-1 relative ${
                      isActive
                        ? `text-white`
                        : `${item.textColor} hover:scale-105 hover:bg-white/10`
                    }`}
                  >
                    {isActive && (
                      <div 
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${
                          item.color === 'primary' ? 'bg-primary-500' :
                          item.color === 'secondary' ? 'bg-secondary-500' :
                          item.color === 'accent' ? 'bg-accent-500' :
                          'bg-primary-500'
                        }`}
                      />
                    )}
                    <motion.div
                      className={isActive ? item.textColor.replace('text-', 'text-') : ''}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className={`text-sm font-medium ${isActive ? item.textColor : ''}`}>
                      {item.desktop}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {user && (
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-2 rounded-2xl text-sm font-bold text-gray-700 hover:text-accent-700 hover:bg-gray-50 transition-all duration-300"
              >
                <span>{user.name.split(' ')[0]}</span>
                {user.avatar ? (
                  <motion.img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border-2 border-emerald-400 shadow-lg" 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <motion.div 
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-300 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <User className="w-4 h-4 text-gray-600" />
                  </motion.div>
                )}
              </Link>
              
              {/* Dropdown Menu */}
              <motion.div 
                className="absolute right-0 top-full mt-2 w-48 glass rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <div className="p-3">
                  <Link 
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 glass-primary-hover hover:text-accent-700 rounded-xl transition-all duration-200 font-semibold"
                  >
                    🏠 Mój profil
                  </Link>
                  <Link 
                    to="/forms"
                    className="block px-4 py-3 text-sm text-gray-700 glass-primary-hover hover:text-accent-700 rounded-xl transition-all duration-200 font-semibold"
                  >
                    📄 Moje wnioski
                  </Link>
                  <hr className="my-2 border-primary-200" />
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 glass-hover hover:text-red-700 rounded-xl transition-all duration-200 font-semibold"
                  >
                    🚪 Wyloguj się
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Mobile Top Bar with Profile - Sticky Top */}
      <div className="md:hidden bg-white shadow-xl border-b-4 border-primary-200 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
        <Link 
          to="/" 
          className="flex items-center space-x-3 text-accent-700 font-bold text-xl hover:text-accent-800 transition-colors"
        >
          <img 
            src="/image copy.png"
            alt="3Drzewa Logo" 
            className="w-8 h-8 object-cover rounded-full border-2 border-accent-300 shadow-lg"
          />
          <span>3Drzewa</span>
        </Link>
        
        {user && (
          <Link
            to="/profile"
            className="flex items-center space-x-2 bg-white hover:bg-gray-50 px-3 py-2 rounded-2xl transition-all duration-300 shadow-lg border border-gray-200"
          >
            <span className="text-sm font-bold text-gray-700">{user.name.split(' ')[0]}</span>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border-2 border-emerald-400" />
            ) : (
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-300">
                <User className="w-3 h-3 text-gray-600" />
              </div>
            )}
          </Link>
        )}
      </div>

      {/* Mobile Navigation - Sticky Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-primary-200 shadow-2xl z-50 safe-area-bottom">
        <motion.div 
          className="flex justify-around py-2 px-2"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex flex-col items-center py-3 px-2 rounded-2xl transition-all duration-300 min-w-0 flex-1 relative ${
                    isActive
                      ? `text-white`
                      : `hover:scale-105 hover:bg-white/10 ${item.textColor}`
                  }`}
                >
                  {isActive && (
                    <div 
                      className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full ${
                        item.color === 'primary' ? 'bg-primary-500' :
                        item.color === 'secondary' ? 'bg-secondary-500' :
                        item.color === 'accent' ? 'bg-accent-500' :
                        'bg-primary-500'
                      }`}
                    />
                  )}
                  <motion.div
                    className={isActive ? item.textColor.replace('text-', 'text-') : ''}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? item.textColor : ''}`} />
                  </motion.div>
                  <span className={`text-xs font-medium ${isActive ? item.textColor : ''}`}>
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </nav>
    </>
  );
};

export default Navigation;