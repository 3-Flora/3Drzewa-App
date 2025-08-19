import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const LegendsHeader = () => {
  return (
    <div className="text-center mb-8">
      <motion.div 
        className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
      >
        <BookOpen className="w-10 h-10 text-white" />
      </motion.div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Globalne Legendy</h1>
      <p className="text-gray-600">Odkryj historie i legendy najsłynniejszych drzew Polski</p>
    </div>
  );
};

export default LegendsHeader;
