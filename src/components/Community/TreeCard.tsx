import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TreeCardHeader from './TreeCardHeader';
import TreeCardContent from './TreeCardContent';
import TreeCardActions from './TreeCardActions';
import CommentModal from './CommentModal';
import { TreeSubmission } from '../../types';

interface TreeCardProps {
  tree: TreeSubmission;
  userVote?: 'approve' | 'reject';
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
}

const TreeCard: React.FC<TreeCardProps> = ({
  tree,
  userVote,
  onVote,
}) => {
  const navigate = useNavigate();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  
  // Get user data from either userData (new) or user (legacy)
  const userData = tree.userData || tree.user;
  const userName = userData ? 
    ('userName' in userData ? userData.userName : userData.name) : 
    'Użytkownik';
  const userAvatar = userData?.avatar;
  const userInitial = userName.charAt(0).toUpperCase();

  const handlePostClick = () => {
    navigate(`/tree/${tree.id}`);
  };

  const handleCommentClick = (treeId: string) => {
    setIsCommentModalOpen(true);
  };

  const handleImageClick = (imageUrl: string) => {
    // Image modal is handled in TreeCardContent
    console.log('Image clicked:', imageUrl);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  return (
    <>
      <article className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer border-b-2 border-gray-300 dark:border-dark-border">
        <div className="flex space-x-3">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <Link to={`/tree/${tree.id}`}>
              {userAvatar ? (
                <img 
                  src={userAvatar} 
                  alt={userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-green-200">
                  {userInitial}
                </div>
              )}
            </Link>
          </div>

          {/* Tweet Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <TreeCardHeader
              userId={tree.userId || ''}
              submissionDate={tree.submissionDate}
              status={tree.status}
              userData={tree.userData}
              user={(tree as any).user}
            />
            
            {/* Content - Clickable for navigation */}
            <div className="mt-2" onClick={handlePostClick}>
              <TreeCardContent 
                tree={tree} 
                onImageClick={handleImageClick}
              />
            </div>
            
            {/* Actions */}
            <div className="mt-3">
              <TreeCardActions
                treeId={tree.id}
                userVote={userVote}
                votes={tree.votes}
                onVote={onVote}
                onCommentClick={handleCommentClick}
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>

        {/* Comment Modal */}
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={closeCommentModal}
          treeId={tree.id}
          treeTitle={tree.species || 'Drzewo'}
        />
      </article>
    </>
  );
};

export default TreeCard;
