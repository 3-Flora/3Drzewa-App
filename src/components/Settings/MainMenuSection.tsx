import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface MainMenuItem {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  bgColor: string;
  emoji: string;
}

interface MainMenuSectionProps {
  items: MainMenuItem[];
}

const MainMenuSection: React.FC<MainMenuSectionProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border-b-2 border-emerald-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="text-2xl mr-3">🌳</span>
          Główne funkcje
        </h3>
      </div>
      <div className="divide-y-2 divide-emerald-50">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={item.path}
              className="flex items-center space-x-6 p-6 glass-hover transition-all duration-300 hover:shadow-lg group"
            >
              <motion.div 
                className="p-4 rounded-2xl glass-primary group-hover:scale-110 transition-transform duration-300 shadow-lg"
                whileHover={{ rotate: 10 }}
              >
                <span className="text-2xl">{item.emoji}</span>
              </motion.div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <motion.div 
                className="text-emerald-600 group-hover:translate-x-2 transition-transform duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MainMenuSection;
