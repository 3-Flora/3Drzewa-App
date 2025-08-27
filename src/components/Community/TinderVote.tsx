import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface TinderVoteProps {
  treeId: string;
  userVote?: 'approve' | 'reject';
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
}

const TinderVote: React.FC<TinderVoteProps> = ({
  treeId,
  userVote,
  onVote,
}) => {
  const handleVote = (vote: 'approve' | 'reject') => {
    // If user already voted the same way, remove the vote
    if (userVote === vote) {
      onVote(treeId, vote); // This will remove the vote
    } else {
      // Add or change vote
      onVote(treeId, vote);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-6 py-4">
      {/* Dislike Button */}
      <button
        onClick={() => handleVote('reject')}
        className={`flex flex-col items-center justify-center w-20 h-20 rounded-full transition-all duration-300 transform hover:scale-110 ${
          userVote === 'reject'
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
            : 'bg-white text-red-500 border-4 border-red-500 hover:bg-red-50'
        }`}
      >
        <ThumbsDown className="w-8 h-8" />
        <span className="text-xs font-semibold mt-1">Odrzuć</span>
      </button>

      {/* Like Button */}
      <button
        onClick={() => handleVote('approve')}
        className={`flex flex-col items-center justify-center w-20 h-20 rounded-full transition-all duration-300 transform hover:scale-110 ${
          userVote === 'approve'
            ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
            : 'bg-white text-green-500 border-4 border-green-500 hover:bg-green-50'
        }`}
      >
        <ThumbsUp className="w-8 h-8" />
        <span className="text-xs font-semibold mt-1">Zatwierdź</span>
      </button>
    </div>
  );
};

export default TinderVote;
