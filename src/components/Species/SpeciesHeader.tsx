import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

const SpeciesHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Book className="w-12 h-12 text-green-600 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800">Encyklopedia gatunków</h1>
        <p className="text-gray-600">Poznaj polskie gatunki drzew i naucz się je rozpoznawać</p>
      </motion.div>
    </div>
  );
};

export default SpeciesHeader;
