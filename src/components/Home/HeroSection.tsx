import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TreePine, LogIn, UserPlus } from 'lucide-react';

interface HeroSectionProps {
  isAuthenticated: boolean;
  onShowLogin: () => void;
  onShowRegister: () => void;
}

const HeroSection = ({ isAuthenticated, onShowLogin, onShowRegister }: HeroSectionProps) => {
  return (
         <div 
       className="relative min-h-screen flex items-center justify-center z-10 transition-colors duration-200"
       style={{
         background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.3) 0%, rgba(239, 246, 255, 0.3) 50%, rgba(240, 253, 244, 0.3) 100%)'
       }}
     >
       <div className="dark:hidden absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30"></div>
       <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-800/30 to-dark-900/30"></div>
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <img 
              src="/image copy.png"
              alt="3Drzewa Logo" 
              className="w-24 h-24 object-cover rounded-full border-4 border-accent-400 shadow-2xl"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-dark-text mb-6 leading-tight">
            <span className="text-accent-600 dark:text-accent-400">3Drzewa</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Społeczność miłośników przyrody dokumentująca najpiękniejsze drzewa Polski. 
            Dołącz do nas i pomóż chronić nasze dziedzictwo przyrodnicze.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {isAuthenticated ? (
              <Link
                to="/map"
                className="btn-green flex items-center justify-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <TreePine className="w-6 h-6" />
                <span>Przejdź do mapy</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={onShowLogin}
                  className="btn-green flex items-center justify-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  <LogIn className="w-6 h-6" />
                  <span>Zaloguj się</span>
                </button>
                <button
                  onClick={onShowRegister}
                  className="flex items-center justify-center space-x-2 glass glass-hover text-accent-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  <UserPlus className="w-6 h-6" />
                  <span>Zarejestruj się</span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
