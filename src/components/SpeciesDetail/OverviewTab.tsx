import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Calendar, MapPin } from 'lucide-react';
import { TreeSpecies } from '../../types';

interface OverviewTabProps {
  species: TreeSpecies;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ species }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Opis gatunku</h3>
        <p className="text-gray-700 leading-relaxed">{species.description}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TreePine className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-800">Wysokość</h4>
          </div>
          <p className="text-gray-700">{species.characteristics.maxHeight}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-800">Żywotność</h4>
          </div>
          <p className="text-gray-700">{species.characteristics.lifespan}</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold text-gray-800">Pochodzenie</h4>
          </div>
          <p className="text-gray-700">
            {species.characteristics.nativeToPoland ? 'Gatunek rodzimy' : 'Gatunek introdukowany'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
