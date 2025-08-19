import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ChevronRight } from 'lucide-react';
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
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48">
        <img
          src={species.images.tree}
          alt={species.namePolish}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          {species.characteristics.nativeToPoland && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Rodzimy
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {species.namePolish}
        </h3>
        <p className="text-sm text-gray-600 italic mb-2">
          {species.nameLatin}
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
            {species.characteristics.maxHeight}
          </div>
          <div>
            <span className="font-medium">Żywotność:</span>
            <br />
            {species.characteristics.lifespan}
          </div>
        </div>
        
        <Link
          to={`/species/${species.id}`}
          className="flex items-center justify-between w-full glass-primary glass-primary-hover text-green-700 px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Zobacz szczegóły</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default SpeciesCard;
