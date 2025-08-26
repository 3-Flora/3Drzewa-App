import React from 'react';
import { motion } from 'framer-motion';
import { TreeSubmission } from '../../types';
import TreeCardContent from './TreeCardContent';
import TreeCardActions from './TreeCardActions';

interface TreeCardProps {
  tree: TreeSubmission;
  index: number;
}

const TreeCard: React.FC<TreeCardProps> = ({ tree, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-300 cursor-pointer"
      onClick={() => window.location.href = `/tree/${tree.id}`}
    >
      <div className="p-8">
        <div className="flex items-start justify-between">
          <TreeCardContent tree={tree} />
          
          {tree.images.length > 0 && (
            <img
              src={tree.images[0]}
              alt={tree.species}
              className="w-32 h-24 object-cover rounded-2xl ml-6 border-3 border-gray-200 shadow-lg"
            />
          )}
        </div>
        
        <TreeCardActions tree={tree} />
      </div>
    </motion.div>
  );
};

export default TreeCard;
