import React from 'react';
import { MapPin } from 'lucide-react';
import { TreeSubmission } from '../../types';

interface VerifyTreeCardContentProps {
  tree: TreeSubmission;
}

const VerifyTreeCardContent: React.FC<VerifyTreeCardContentProps> = ({
  tree,
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        {tree.images && tree.images.length > 0 && (
          <div className="md:w-1/3">
            <img
              src={tree.images[0]}
              alt={tree.species}
              className="w-full h-48 md:h-40 object-cover rounded-lg"
            />
            {tree.images.length > 1 && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                +{tree.images.length - 1} więcej zdjęć
              </p>
            )}
          </div>
        )}
        
        {/* Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {tree.species}
          </h3>
          <p className="text-sm text-gray-600 italic mb-2">
            {tree.speciesLatin}
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-3 h-3" />
            <span>{tree.location.address}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
            <p>Pierśnica: {tree.circumference} cm</p>
            {tree.height && <p>Wysokość: {tree.height} m</p>}
            <p>Stan: {tree.condition}</p>
            {tree.isMonument && (
              <p className="text-yellow-600 font-medium">Kandydat na pomnik</p>
            )}
          </div>
          
          <p className="text-gray-700 text-sm">
            {tree.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyTreeCardContent;
