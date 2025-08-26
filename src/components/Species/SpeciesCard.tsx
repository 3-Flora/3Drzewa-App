import React from 'react';
import { motion } from 'framer-motion';
import { TreeSpecies } from '../../types';

interface SpeciesCardProps {
  species: TreeSpecies;
  index: number;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => window.location.href = `/species/${species.id}`}
    >
      <div className="relative h-48">
        <img
          src={species.images.find(img => img.type === 'Tree')?.imageUrl || species.images[0]?.imageUrl || '/placeholder-tree.jpg'}
          alt={species.polishName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          {species.traits.nativeToPoland && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Rodzimy
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {species.polishName}
        </h3>
        <p className="text-sm text-gray-600 italic mb-2">
          {species.latinName}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          Rodzina: {species.family}
        </p>
        
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {species.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
          <div>
            <span className="font-medium">Wysokość:</span>
            <br />
            {species.traits.maxHeight}m
          </div>
          <div>
            <span className="font-medium">Żywotność:</span>
            <br />
            {species.traits.lifespan}
          </div>
        </div>
        

      </div>
    </motion.div>
  );
};

export default SpeciesCard;
