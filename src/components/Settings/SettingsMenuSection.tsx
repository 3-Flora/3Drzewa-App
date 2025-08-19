import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SettingsMenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  emoji: string;
}

interface SettingsMenuSectionProps {
  items: SettingsMenuItem[];
  onItemClick: (sectionId: string) => void;
}

const SettingsMenuSection: React.FC<SettingsMenuSectionProps> = ({ 
  items, 
  onItemClick 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="text-2xl mr-3">⚙️</span>
          Ustawienia
        </h3>
      </div>
      <div className="divide-y-2 divide-gray-50">
        {items.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => onItemClick(item.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-6 p-6 hover:bg-gray-50 transition-all duration-300 group"
          >
            <div className="p-4 rounded-2xl bg-gray-100 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-2xl">{item.emoji}</span>
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <motion.div 
              className="text-gray-400 group-hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SettingsMenuSection;
