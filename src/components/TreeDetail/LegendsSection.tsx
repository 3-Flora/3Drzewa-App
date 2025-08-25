import React from 'react';
import { Award } from 'lucide-react';
import { Comment } from '../../types';
import LegendItem from './LegendItem';

interface LegendsSectionProps {
  legends: Comment[];
  onVote: (commentId: string) => void;
}

const LegendsSection: React.FC<LegendsSectionProps> = ({ legends, onVote }) => {
  if (legends.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <Award className="w-5 h-5 text-yellow-600" />
        <span>Legendy i historie</span>
      </h3>
      <div className="space-y-4">
        {legends.map((legend) => (
          <LegendItem
            key={legend.id}
            legend={legend}
            onVote={onVote}
          />
        ))}
      </div>
    </div>
  );
};

export default LegendsSection;
