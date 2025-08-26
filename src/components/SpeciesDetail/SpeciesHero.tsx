import React from 'react';
import { CheckCircle } from 'lucide-react';
import { TreeSpecies } from '../../types';

interface SpeciesHeroProps {
  species: TreeSpecies;
}

const SpeciesHero: React.FC<SpeciesHeroProps> = ({ species }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-80">
        <img
          src={species.images.find(img => img.type === 'Tree')?.imageUrl || species.images[0]?.imageUrl || '/placeholder-tree.jpg'}
          alt={species.polishName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{species.polishName}</h1>
        <p className="text-lg italic opacity-90">{species.latinName}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm">
            <span>Rodzina: {species.family}</span>
            {species.traits.nativeToPoland && (
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Gatunek rodzimy</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesHero;
