import React from 'react';
import { User, ThumbsUp } from 'lucide-react';
import { Comment } from '../../types';

interface LegendItemProps {
  legend: Comment;
  onVote: (commentId: string) => void;
}

const LegendItem: React.FC<LegendItemProps> = ({ legend, onVote }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {legend.userAvatar ? (
            <img src={legend.userAvatar} alt={legend.userName} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-yellow-600" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-gray-800">{legend.userName}</span>
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                Legenda
              </span>
            </div>
            <p className="text-gray-700 mb-2">{legend.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(legend.date).toLocaleDateString('pl-PL')}
            </p>
          </div>
        </div>
        <button
          onClick={() => onVote(legend.id)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition-colors ${
            legend.userVoted
              ? 'bg-yellow-100 text-yellow-700'
              : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-700'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{legend.votes}</span>
        </button>
      </div>
    </div>
  );
};

export default LegendItem;
