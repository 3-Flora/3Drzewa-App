import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const VerifyHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-800">Weryfikacja społecznościowa</h1>
      <p className="text-gray-600">Pomóż społeczności weryfikować zgłoszenia drzew</p>
    </motion.div>
  );
};

export default VerifyHeader;
