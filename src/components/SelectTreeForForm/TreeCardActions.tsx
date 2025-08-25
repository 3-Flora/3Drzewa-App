import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, FileText } from 'lucide-react';
import { TreeSubmission } from '../../types';

interface TreeCardActionsProps {
  tree: TreeSubmission;
}

const TreeCardActions: React.FC<TreeCardActionsProps> = ({ tree }) => {
  return (
    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t-2 border-gray-200">
      <Link
        to={`/tree/${tree.id}`}
        className="flex items-center space-x-2 px-6 py-3 glass glass-hover text-gray-700 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <Eye className="w-4 h-4" />
        <span>Zobacz szczegóły</span>
      </Link>
      
      <Link
        to={`/forms/create/${tree.id}`}
        className="flex items-center space-x-2 px-6 py-3 btn-green text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <FileText className="w-4 h-4" />
        <span>Stwórz wniosek</span>
      </Link>
    </div>
  );
};

export default TreeCardActions;
