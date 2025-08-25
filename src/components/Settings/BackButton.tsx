import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-bold mb-4"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>{label}</span>
    </motion.button>
  );
};

export default BackButton;
