import React, { useState } from 'react';
import { MessageCircle, Repeat, Heart, Eye, Bookmark, Share2 } from 'lucide-react';

interface TreeCardActionsProps {
  treeId: string;
  userVote?: 'approve' | 'reject';
  votes: {
    approve: number;
    reject: number;
  };
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
  onCommentClick?: (treeId: string) => void;
  onImageClick?: (imageUrl: string) => void;
}

const TreeCardActions: React.FC<TreeCardActionsProps> = ({
  treeId,
  userVote,
  votes,
  onVote,
  onCommentClick,
  onImageClick,
}) => {
  const [likeCount, setLikeCount] = useState(votes.approve);
  const [isLiked, setIsLiked] = useState(userVote === 'approve');
  const [commentCount, setCommentCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);
  const [viewCount, setViewCount] = useState(votes.approve + votes.reject);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
      onVote(treeId, 'approve'); // Remove vote
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      onVote(treeId, 'approve'); // Add vote
    }
  };

  const handleComment = () => {
    setCommentCount(prev => prev + 1);
    if (onCommentClick) {
      onCommentClick(treeId);
    }
  };

  const handleRetweet = () => {
    setRetweetCount(prev => prev + 1);
  };

  const handleView = () => {
    setViewCount(prev => prev + 1);
  };

  return (
    <div className="flex items-center justify-between max-w-md">
      {/* Comment */}
      <button 
        onClick={handleComment}
        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group"
      >
        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
          <MessageCircle className="w-5 h-5" />
        </div>
        <span className="text-sm">{commentCount}</span>
      </button>

      {/* Retweet/Share */}
      <button 
        onClick={handleRetweet}
        className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors group"
      >
        <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
          <Repeat className="w-5 h-5" />
        </div>
        <span className="text-sm">{retweetCount}</span>
      </button>

      {/* Like/Vote */}
      <button 
        onClick={handleLike}
        className={`flex items-center space-x-2 transition-colors group ${
          isLiked 
            ? 'text-red-500' 
            : 'text-gray-500 hover:text-red-500'
        }`}
      >
        <div className={`p-2 rounded-full transition-colors ${
          isLiked 
            ? 'bg-red-50' 
            : 'group-hover:bg-red-50'
        }`}>
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </div>
        <span className="text-sm">{likeCount}</span>
      </button>

      {/* Views */}
      <button 
        onClick={handleView}
        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group"
      >
        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
          <Eye className="w-5 h-5" />
        </div>
        <span className="text-sm">{viewCount}</span>
      </button>

      {/* Bookmark */}
      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
          <Bookmark className="w-5 h-5" />
        </div>
      </button>

      {/* Share */}
      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
          <Share2 className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
};

export default TreeCardActions;
