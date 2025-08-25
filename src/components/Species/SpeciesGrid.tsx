import React from 'react';
import { TreeSpecies } from '../../types';
import SpeciesCard from './SpeciesCard';

interface SpeciesGridProps {
  species: TreeSpecies[];
}

const SpeciesGrid: React.FC<SpeciesGridProps> = ({ species }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {species.map((speciesItem, index) => (
        <SpeciesCard
          key={speciesItem.id}
          species={speciesItem}
          index={index}
        />
      ))}
    </div>
  );
};

export default SpeciesGrid;
