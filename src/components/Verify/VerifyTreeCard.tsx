import React from 'react';
import { motion } from 'framer-motion';
import { TreeSubmission } from '../../types';
import VerifyTreeCardHeader from './VerifyTreeCardHeader';
import VerifyTreeCardContent from './VerifyTreeCardContent';
import VerifyTreeCardActions from './VerifyTreeCardActions';
import VerifyCommentInput from './VerifyCommentInput';

interface VerifyTreeCardProps {
  tree: TreeSubmission;
  index: number;
  userVote?: 'approve' | 'reject';
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
  onCommentClick: (treeId: string) => void;
  onCommentSubmit: (treeId: string) => void;
  onCommentCancel: () => void;
  newComment: string;
  onCommentChange: (value: string) => void;
  isLegend: boolean;
  onLegendChange: (value: boolean) => void;
  isCommenting: boolean;
}

const VerifyTreeCard: React.FC<VerifyTreeCardProps> = ({
  tree,
  index,
  userVote,
  onVote,
  onCommentClick,
  onCommentSubmit,
  onCommentCancel,
  newComment,
  onCommentChange,
  isLegend,
  onLegendChange,
  isCommenting,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <VerifyTreeCardHeader
        userId={tree.userId}
        submissionDate={tree.submissionDate}
        status={tree.status}
      />
      
      <VerifyTreeCardContent
        species={tree.species}
        speciesLatin={tree.speciesLatin}
        location={tree.location}
        circumference={tree.circumference}
        height={tree.height}
        condition={tree.condition}
        isMonument={tree.isMonument}
        description={tree.description}
        images={tree.images}
      />
      
      <VerifyTreeCardActions
        treeId={tree.id}
        userVote={userVote}
        votes={tree.votes}
        onVote={onVote}
        onCommentClick={onCommentClick}
        isCommenting={isCommenting}
      />
      
      {/* Comment Input */}
      {isCommenting && (
        <VerifyCommentInput
          newComment={newComment}
          onCommentChange={onCommentChange}
          isLegend={isLegend}
          onLegendChange={onLegendChange}
          onSubmit={() => onCommentSubmit(tree.id)}
          onCancel={onCommentCancel}
        />
      )}
    </motion.div>
  );
};

export default VerifyTreeCard;
