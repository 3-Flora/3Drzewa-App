import React from 'react';
import { MapPin, Calendar, Award, CheckCircle, Clock } from 'lucide-react';
import { TreeSubmission } from '../../types';

interface TreeCardContentProps {
  tree: TreeSubmission;
}

const TreeCardContent: React.FC<TreeCardContentProps> = ({ tree }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'monument': return 'Pomnik przyrody';
      case 'approved': return 'Zatwierdzony';
      case 'pending': return 'Oczekuje weryfikacji';
      default: return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monument': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex-1">
      <div className="flex items-center space-x-4 mb-3">
        <h3 className="text-xl font-bold text-gray-800">{tree.species}</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon(tree.status)}
          <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(tree.status)}`}>
            {getStatusLabel(tree.status)}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 italic mb-3">{tree.speciesLatin}</p>
      
      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{tree.location.address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(tree.submissionDate).toLocaleDateString('pl-PL')}</span>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm line-clamp-2 mb-4">
        {tree.description}
      </p>
      
      <div className="flex items-center space-x-4 text-sm">
        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
          📏 Pierśnica: {tree.circumference} cm
        </span>
        {tree.height && (
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
            📐 Wysokość: {tree.height} m
          </span>
        )}
      </div>
    </div>
  );
};

export default TreeCardContent;
