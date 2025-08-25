import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

interface TreeCardActionsProps {
  treeId: string;
  userVote?: 'approve' | 'reject';
  votes: {
    approve: number;
    reject: number;
  };
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
  onCommentClick: (treeId: string) => void;
  isCommenting: boolean;
}

const TreeCardActions: React.FC<TreeCardActionsProps> = ({
  treeId,
  userVote,
  votes,
  onVote,
  onCommentClick,
  isCommenting,
}) => {
  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 space-y-4">
      <div className="flex flex-col space-y-3">
        {/* Like/Dislike buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => onVote(treeId, 'approve')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-300 glass shadow-lg ${
              userVote === 'approve'
                ? 'btn-green text-white border-2 border-green-500'
                : 'bg-white text-green-500 border-2 border-gray-200 hover:border-green-300'
            }`}
          >
            <span className="text-lg text-green-500">👍</span>
            <span>{votes.approve}</span>
          </button>
          
          <button
            onClick={() => onVote(treeId, 'reject')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-300 glass shadow-lg ${
              userVote === 'reject'
                ? 'bg-red-500 text-white border-2 border-red-500'
                : 'bg-white text-red-500 border-2 border-gray-200 hover:border-red-300'
            }`}
          >
            <span className="text-lg text-red-500">👎</span>
            <span>{votes.reject}</span>
          </button>
        </div>
        
        {/* Comment and Details buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => onCommentClick(treeId)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm text-blue-600 glass-secondary glass-secondary-hover transition-all duration-300 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Komentuj</span>
          </button>
          
          <Link
            to={`/tree/${treeId}`}
            className="text-sm px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-white btn-green"
          >
            Zobacz szczegóły →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TreeCardActions;
