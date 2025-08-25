import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface VerifyCommentInputProps {
  newComment: string;
  onCommentChange: (value: string) => void;
  isLegend: boolean;
  onLegendChange: (value: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const VerifyCommentInput: React.FC<VerifyCommentInputProps> = ({
  newComment,
  onCommentChange,
  isLegend,
  onLegendChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-4 pt-4 border-t border-gray-200 w-full"
    >
      <div className="flex flex-col space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div className="w-full">
            <textarea
              value={newComment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Dodaj komentarz lub legendę..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none max-w-full"
              rows={3}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 space-y-2 sm:space-y-0">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isLegend}
                  onChange={(e) => onLegendChange(e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Oznacz jako legendę</span>
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  onClick={onSubmit}
                  disabled={!newComment.trim()}
                  className="px-6 py-2 btn-green text-white text-sm rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold"
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyCommentInput;
