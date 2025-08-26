import React from 'react';
import { Link } from 'react-router-dom';
import VerifyTreeCardHeader from './VerifyTreeCardHeader';
import VerifyTreeCardContent from './VerifyTreeCardContent';
import VerifyTreeCardActions from './VerifyTreeCardActions';
import { TreeSubmission } from '../../types';

interface VerifyTreeCardProps {
  tree: TreeSubmission;
  userVote?: 'approve' | 'reject';
  onVote: (treeId: string, vote: 'approve' | 'reject') => void;
}

const VerifyTreeCard: React.FC<VerifyTreeCardProps> = ({
  tree,
  userVote,
  onVote,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Clickable header */}
      <Link to={`/tree/${tree.id}`} className="block">
        <VerifyTreeCardHeader
          userId={tree.userId}
          submissionDate={tree.submissionDate}
          status={tree.status}
          userData={tree.userData}
          user={(tree as any).user}
        />
      </Link>
      
      {/* Clickable content */}
      <Link to={`/tree/${tree.id}`} className="block">
        <VerifyTreeCardContent tree={tree} />
      </Link>
      
      {/* Actions (not clickable) */}
      <VerifyTreeCardActions
        treeId={tree.id}
        userVote={userVote}
        votes={tree.votes}
        onVote={onVote}
      />
    </div>
  );
};

export default VerifyTreeCard;
