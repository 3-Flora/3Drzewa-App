import React from 'react';
import { motion } from 'framer-motion';
import { TreeLegend } from '../../types';
import LegendCardContent from './LegendCardContent';
import LegendCardActions from './LegendCardActions';

interface LegendCardProps {
  legend: TreeLegend;
  index: number;
}

const LegendCard: React.FC<LegendCardProps> = ({ legend, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-100 w-full"
    >
      <div className="flex flex-col">
        {/* Image */}
        <div className="w-full">
          <img
            src={legend.image}
            alt={legend.title}
            className="w-full h-64 object-cover"
          />
        </div>
        
        {/* Content */}
        <LegendCardContent legend={legend} />
        
        {/* Actions */}
        <div className="px-8 pb-8">
          <LegendCardActions legend={legend} />
        </div>
      </div>
    </motion.div>
  );
};

export default LegendCard;
