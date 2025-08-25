import React from 'react';
import { MapPin, Calendar, User, Ruler, TreePine } from 'lucide-react';
import { TreeSubmission } from '../../types';

interface TreeDetailsProps {
  tree: TreeSubmission;
}

const TreeDetails: React.FC<TreeDetailsProps> = ({ tree }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-gray-600">
        <MapPin className="w-4 h-4" />
        <span>{tree.location.address}</span>
      </div>
      
      <div className="flex items-center space-x-2 text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>Zgłoszono: {new Date(tree.submissionDate).toLocaleDateString('pl-PL')}</span>
      </div>
      
      <div className="flex items-center space-x-2 text-gray-600">
        <User className="w-4 h-4" />
        <span>Użytkownik #{tree.userId}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Ruler className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Pierśnica</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">{tree.circumference} cm</p>
        </div>
        
        {tree.height && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <TreePine className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Wysokość</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{tree.height} m</p>
          </div>
        )}
      </div>

      <div className="pt-4">
        <h3 className="font-semibold text-gray-800 mb-2">Opis</h3>
        <p className="text-gray-700 leading-relaxed">{tree.description}</p>
      </div>
    </div>
  );
};

export default TreeDetails;
