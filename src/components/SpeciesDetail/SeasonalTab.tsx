import React from 'react';
import { motion } from 'framer-motion';
import { TreeSpecies } from '../../types';

interface SeasonalTabProps {
  species: TreeSpecies;
}

const SeasonalTab: React.FC<SeasonalTabProps> = ({ species }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Zmiany sezonowe</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">🌱 Wiosna</h4>
          <p className="text-gray-700">{species.seasonalChanges.spring}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">☀️ Lato</h4>
          <p className="text-gray-700">{species.seasonalChanges.summer}</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">🍂 Jesień</h4>
          <p className="text-gray-700">{species.seasonalChanges.autumn}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">❄️ Zima</h4>
          <p className="text-gray-700">{species.seasonalChanges.winter}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SeasonalTab;
