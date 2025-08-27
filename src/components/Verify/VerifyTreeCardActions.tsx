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
    <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-dark-border">
      {/* Approve/Disapprove buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onVote(treeId, 'approve')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            userVote === 'approve'
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600'
              : 'bg-gray-50 dark:bg-dark-600 text-gray-600 dark:text-dark-text-secondary hover:bg-green-50 dark:hover:bg-green-900/50 hover:text-green-600 dark:hover:text-green-400 hover:border-green-200 dark:hover:border-green-500 border border-gray-200 dark:border-dark-border'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{votes.approve}</span>
        </button>
        
        <button
          onClick={() => onVote(treeId, 'reject')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            userVote === 'reject'
              ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600'
              : 'bg-gray-50 dark:bg-dark-600 text-gray-600 dark:text-dark-text-secondary hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500 border border-gray-200 dark:border-dark-border'
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
