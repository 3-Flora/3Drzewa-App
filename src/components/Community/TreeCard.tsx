import React from 'react';
import { motion } from 'framer-motion';
import { TreeSubmission } from '../../types';
import TreeCardHeader from './TreeCardHeader';
import TreeCardContent from './TreeCardContent';
import TreeCardActions from './TreeCardActions';
import CommentInput from './CommentInput';

interface TreeCardProps {
  tree: TreeSubmission;
  index: number;
  userVote?: 'approve' | 'reject';
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
  onCommentClick: (treeId: string) => void;
  onCommentSubmit: (treeId: string) => void;
  onCommentCancel: () => void;
  newComment: string;
  onCommentChange: (value: string) => void;
  isCommenting: boolean;
}

const TreeCard: React.FC<TreeCardProps> = ({
  tree,
  index,
  userVote,
  onVote,
  onCommentClick,
  onCommentSubmit,
  onCommentCancel,
  newComment,
  onCommentChange,
  isCommenting,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <TreeCardHeader
        userId={tree.userId}
        submissionDate={tree.submissionDate}
        status={tree.status}
      />
      
      <TreeCardContent
        species={tree.species}
        speciesLatin={tree.speciesLatin}
        location={tree.location}
        circumference={tree.circumference}
        height={tree.height}
        description={tree.description}
        images={tree.images}
      />
      
      <TreeCardActions
        treeId={tree.id}
        userVote={userVote}
        votes={tree.votes}
        onVote={onVote}
        onCommentClick={onCommentClick}
        isCommenting={isCommenting}
      />
      
      {/* Comment Input */}
      {isCommenting && (
        <CommentInput
          newComment={newComment}
          onCommentChange={onCommentChange}
          onSubmit={() => onCommentSubmit(tree.id)}
          onCancel={onCommentCancel}
        />
      )}
    </motion.div>
  );
};

export default TreeCard;
