import React from 'react';
import { User } from 'lucide-react';

interface CommentFormProps {
  newComment: string;
  isLegend: boolean;
  onCommentChange: (value: string) => void;
  onLegendChange: (value: boolean) => void;
  onSubmit: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  newComment,
  isLegend,
  onCommentChange,
  onLegendChange,
  onSubmit
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex space-x-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-green-600" />
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Dodaj komentarz lub legendę..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={3}
          />
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isLegend}
                onChange={(e) => onLegendChange(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-600">Oznacz jako legendę</span>
            </label>
            <button
              onClick={onSubmit}
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
