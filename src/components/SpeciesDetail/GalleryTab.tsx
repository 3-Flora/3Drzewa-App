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
        {species.images.map((image, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-medium text-gray-800">
              {image.type === 'Tree' && 'Pokrój drzewa'}
              {image.type === 'Leaf' && 'Liście'}
              {image.type === 'Bark' && 'Kora'}
              {image.type === 'Fruit' && 'Owoce'}
              {!['Tree', 'Leaf', 'Bark', 'Fruit'].includes(image.type) && image.type}
            </h4>
            <img
              src={image.imageUrl}
              alt={image.altText}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GalleryTab;
