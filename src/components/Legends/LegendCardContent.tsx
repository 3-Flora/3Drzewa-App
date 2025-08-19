import React from 'react';
import { TreePine, MapPin, Calendar, Award } from 'lucide-react';
import { TreeLegend } from '../../types';

interface LegendCardContentProps {
  legend: TreeLegend;
}

const LegendCardContent: React.FC<LegendCardContentProps> = ({ legend }) => {
  return (
    <div className="w-full p-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{legend.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <TreePine className="w-4 h-4" />
              <span>{legend.species}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{legend.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{legend.period}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-600" />
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
            Legenda
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 leading-relaxed mb-6">
        {legend.story}
      </p>
    </div>
  );
};

export default LegendCardContent;
