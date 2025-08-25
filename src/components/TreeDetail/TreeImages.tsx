import React from 'react';
import { Camera } from 'lucide-react';

interface TreeImagesProps {
  images: string[];
  species: string;
  onImageClick: (image: string) => void;
}

const TreeImages: React.FC<TreeImagesProps> = ({ images, species, onImageClick }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Zdjęcia</h3>
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageClick(image)}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={image}
              alt={`${species} ${index + 1}`}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
              <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TreeImages;
