import React from 'react';
import { FileText } from 'lucide-react';
import { TreeSubmission } from '../../types';
import TreeStatus from './TreeStatus';
import { useNavigationHistory } from '../../hooks/useNavigationHistory';

interface TreeInfoProps {
  tree: TreeSubmission;
}

const TreeInfo: React.FC<TreeInfoProps> = ({ tree }) => {
  const { navigateWithHistory } = useNavigationHistory();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{tree.species}</h1>
            <p className="text-lg text-gray-600 italic mb-2">{tree.speciesLatin}</p>
            <TreeStatus status={tree.status} />
          </div>
          
          {tree.status === 'approved' && (
            <button
              onClick={() => navigateWithHistory('/forms/create')}
              className="flex items-center space-x-2 btn-green text-white px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              <span>Stwórz wniosek</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeInfo;
