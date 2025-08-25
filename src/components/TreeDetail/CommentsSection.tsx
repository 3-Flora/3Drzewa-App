import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Comment } from '../../types';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentsSectionProps {
  comments: Comment[];
  newComment: string;
  isLegend: boolean;
  commentsLoading: boolean;
  onCommentChange: (value: string) => void;
  onLegendChange: (value: boolean) => void;
  onSubmit: () => void;
  onVote: (commentId: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  newComment,
  isLegend,
  commentsLoading,
  onCommentChange,
  onLegendChange,
  onSubmit,
  onVote
}) => {
  const regularComments = comments.filter(c => !c.isLegend);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <span>Komentarze ({regularComments.length})</span>
      </h3>

      <CommentForm
        newComment={newComment}
        isLegend={isLegend}
        onCommentChange={onCommentChange}
        onLegendChange={onLegendChange}
        onSubmit={onSubmit}
      />

      {commentsLoading ? (
        <div className="text-center py-4">
          <LoadingSpinner size="sm" />
        </div>
      ) : regularComments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Brak komentarzy. Bądź pierwszy!</p>
      ) : (
        <div className="space-y-4">
          {regularComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
