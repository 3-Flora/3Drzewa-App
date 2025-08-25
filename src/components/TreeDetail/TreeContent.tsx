import React from 'react';
import { TreeSubmission } from '../../types';
import TreeDetails from './TreeDetails';
import TreeImages from './TreeImages';

interface TreeContentProps {
  tree: TreeSubmission;
  onImageClick: (image: string) => void;
}

const TreeContent: React.FC<TreeContentProps> = ({ tree, onImageClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <TreeDetails tree={tree} />
          <TreeImages 
            images={tree.images} 
            species={tree.species} 
            onImageClick={onImageClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default TreeContent;
