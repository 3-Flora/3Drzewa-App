import React from 'react';
import { User, Heart } from 'lucide-react';
import { Comment } from '../../types';

interface CommentItemProps {
  comment: Comment;
  onVote: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onVote }) => {
  return (
    <div className="flex items-start space-x-3">
      {comment.userAvatar ? (
        <img src={comment.userAvatar} alt={comment.userName} className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-gray-800">{comment.userName}</span>
          <span className="text-xs text-gray-500">
            {new Date(comment.date).toLocaleDateString('pl-PL')}
          </span>
        </div>
        <p className="text-gray-700">{comment.content}</p>
      </div>
      <button
        onClick={() => onVote(comment.id)}
        className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition-colors ${
          comment.userVoted
            ? 'glass-secondary text-blue-800 border-2 border-blue-300 shadow-xl transform scale-105'
            : 'glass glass-hover text-gray-700 hover:text-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
        }`}
      >
        <Heart className="w-4 h-4" />
        <span>{comment.votes}</span>
      </button>
    </div>
  );
};

export default CommentItem;
