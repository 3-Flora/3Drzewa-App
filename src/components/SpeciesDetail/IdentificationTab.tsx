import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { TreeSpecies } from '../../types';

interface IdentificationTabProps {
  species: TreeSpecies;
}

const IdentificationTab: React.FC<IdentificationTabProps> = ({ species }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Cechy identyfikacyjne</h3>
        <div className="space-y-3">
          {species.identificationGuide.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {species.images.filter(img => ['Leaf', 'Bark'].includes(img.type)).map((image, index) => (
          <div key={index} className="space-y-4">
            <h4 className="font-semibold text-gray-800">
              {image.type === 'Leaf' ? 'Liście' : 'Kora'}
            </h4>
            <img
              src={image.imageUrl}
              alt={image.altText}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IdentificationTab;
