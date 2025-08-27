import React from 'react';
import VerifyTreeCardHeader from './VerifyTreeCardHeader';
import VerifyTreeCardContent from './VerifyTreeCardContent';
import TinderVote from '../Community/TinderVote';
import { TreeSubmission } from '../../types';
import { useNavigationHistory } from '../../hooks/useNavigationHistory';

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
  const { navigateWithHistory } = useNavigationHistory();

  const handleTreeClick = () => {
    navigateWithHistory(`/tree/${tree.id}`);
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-dark-border">
      {/* Clickable header */}
      <div onClick={handleTreeClick} className="cursor-pointer">
        <VerifyTreeCardHeader
          userId={tree.userId}
          submissionDate={tree.submissionDate}
          status={tree.status}
          userData={tree.userData}
          user={(tree as any).user}
        />
      </div>
      
      {/* Clickable content */}
      <div onClick={handleTreeClick} className="cursor-pointer">
        <VerifyTreeCardContent tree={tree} />
      </div>
      
      {/* Tinder-style Voting for Verification */}
      <div className="p-6 bg-gray-50 dark:bg-dark-hover">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-4 text-center">
          Głosuj nad tym drzewem:
        </h4>
        <TinderVote
          treeId={tree.id}
          userVote={userVote}
          onVote={onVote}
        />
      </div>
    </div>
  );
};

export default VerifyTreeCard;
