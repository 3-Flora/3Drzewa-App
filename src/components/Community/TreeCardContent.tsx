import React from 'react';
import { MapPin } from 'lucide-react';

interface TreeCardContentProps {
  species: string;
  speciesLatin: string;
  location: {
    address: string;
  };
  circumference: number;
  height?: number;
  description: string;
  images: string[];
}

const TreeCardContent: React.FC<TreeCardContentProps> = ({
  species,
  speciesLatin,
  location,
  circumference,
  height,
  description,
  images,
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        {images.length > 0 && (
          <div className="md:w-1/3">
            <img
              src={images[0]}
              alt={species}
              className="w-full h-48 md:h-32 object-cover rounded-lg"
            />
          </div>
        )}
        
        {/* Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {species}
          </h3>
          <p className="text-sm text-gray-600 italic mb-2">
            {speciesLatin}
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-3 h-3" />
            <span>{location.address}</span>
          </div>
          
          <p className="text-sm text-gray-700 mb-3">
            Pierśnica: {circumference} cm
            {height && ` • Wysokość: ${height} m`}
          </p>
          
          <p className="text-gray-700 text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreeCardContent;
