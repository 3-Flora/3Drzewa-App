import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VerifyTreeCardActionsProps {
  treeId: string;
  userVote?: 'approve' | 'reject';
  votes: {
    approve: number;
    reject: number;
  };
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
}

const VerifyTreeCardActions: React.FC<VerifyTreeCardActionsProps> = ({
  treeId,
  userVote,
  votes,
  onVote,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-100">
      {/* Approve/Disapprove buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onVote(treeId, 'approve')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            userVote === 'approve'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 border border-gray-200'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{votes.approve}</span>
        </button>
        
        <button
          onClick={() => onVote(treeId, 'reject')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            userVote === 'reject'
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-gray-200'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{votes.reject}</span>
        </button>
      </div>
    </div>
  );
};

export default VerifyTreeCardActions;
