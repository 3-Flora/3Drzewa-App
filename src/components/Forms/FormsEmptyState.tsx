import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus } from 'lucide-react';
import { useNavigationHistory } from '../../hooks/useNavigationHistory';

const FormsEmptyState: React.FC = () => {
  const { navigateWithHistory } = useNavigationHistory();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Nie masz jeszcze wniosków
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Zacznij tworzyć wnioski do gmin o uznanie drzew za pomniki przyrody. 
          To prosty sposób na ochronę cennych drzew w Twojej okolicy.
        </p>
        
        <button
          onClick={() => navigateWithHistory('/forms/create')}
          className="inline-flex items-center space-x-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-300 font-bold shadow-2xl hover:scale-105"
        >
          <Plus className="w-6 h-6" />
          <span>Stwórz pierwszy wniosek</span>
        </button>
      </div>
    </motion.div>
  );
};

export default FormsEmptyState;
