import React from 'react';
import { motion } from 'framer-motion';
import { TreeSpecies } from '../../types';

interface GalleryTabProps {
  species: TreeSpecies;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ species }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Galeria zdjęć</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Pokrój drzewa</h4>
          <img
            src={species.images.tree}
            alt="Drzewo"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Liście</h4>
          <img
            src={species.images.leaves}
            alt="Liście"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Kora</h4>
          <img
            src={species.images.bark}
            alt="Kora"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        {species.images.fruit && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">Owoce</h4>
            <img
              src={species.images.fruit}
              alt="Owoce"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GalleryTab;
