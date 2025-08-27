import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface CommentInputProps {
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  newComment,
  onCommentChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-border"
    >
      <div className="flex space-x-3">
        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Dodaj komentarz..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-text-secondary"
            rows={2}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-700 dark:text-dark-text glass glass-hover rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Anuluj
            </button>
            <button
              onClick={onSubmit}
              disabled={!newComment.trim()}
              className="px-6 py-2 btn-green text-white text-sm rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommentInput;
