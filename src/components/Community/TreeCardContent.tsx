import React from 'react';
import { TreeSubmission } from '../../types';
import { TreePine, X } from 'lucide-react';

interface TreeCardContentProps {
  tree: TreeSubmission;
  onImageClick?: (imageUrl: string) => void;
}

const TreeCardContent: React.FC<TreeCardContentProps> = ({ tree, onImageClick }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const formatTreeInfo = (tree: TreeSubmission) => {
    const parts = [];
    
    if (tree.species) {
      parts.push(tree.species);
    }
    
    if (tree.location?.address) {
      parts.push(tree.location.address);
    }
    
    if (tree.height) {
      parts.push(`${tree.height}m wysokości`);
    }
    
    if (tree.circumference) {
      parts.push(`${tree.circumference}cm obwodu`);
    }
    
    return parts.join(' • ');
  };

  const handleImageClick = (imageUrl: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation to tree detail
    setSelectedImage(imageUrl);
    if (onImageClick) {
      onImageClick(imageUrl);
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="space-y-3">
        {/* Tweet Text */}
        <div className="text-gray-900 dark:text-dark-text text-sm leading-relaxed">
          {tree.description || 'Brak opisu drzewa'}
        </div>
        
        {/* Tree Information */}
        {tree.species || tree.location?.address || tree.height || tree.circumference ? (
          <div className="text-gray-600 dark:text-dark-text-secondary text-xs flex items-center space-x-2">
            <TreePine className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span>{formatTreeInfo(tree)}</span>
          </div>
        ) : null}
        
        {/* Location */}
        {tree.location?.address && (
          <div className="text-gray-600 dark:text-dark-text-secondary text-xs flex items-center space-x-2">
            <span>{tree.location.address}</span>
          </div>
        )}
        
        {/* Media Preview - if tree has images */}
        {tree.images && tree.images.length > 0 && (
          <div className="mt-3">
            <div className="grid grid-cols-1 gap-2">
              {tree.images.slice(0, 1).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Drzewo ${index + 1}`}
                    className="w-full h-64 object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={(e) => handleImageClick(image, e)}
                  />
                  {tree.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      +{tree.images.length - 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Powiększone zdjęcie drzewa"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TreeCardContent;
