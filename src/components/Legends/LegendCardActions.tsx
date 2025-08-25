import React from 'react';
import { User, Heart } from 'lucide-react';
import { TreeLegend } from '../../types';

interface LegendCardActionsProps {
  legend: TreeLegend;
}

const LegendCardActions: React.FC<LegendCardActionsProps> = ({ legend }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{legend.author}</p>
          <p className="text-xs text-gray-600">Autor legendy</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 px-4 py-2 glass text-amber-700 rounded-xl glass-hover transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold">
          <Heart className="w-4 h-4" />
          <span>{legend.likes}</span>
        </button>
        <button className="px-6 py-3 btn-green text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Zobacz na mapie
        </button>
      </div>
    </div>
  );
};

export default LegendCardActions;
