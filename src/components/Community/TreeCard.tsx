import React from 'react';
import { Link } from 'react-router-dom';
import TreeCardHeader from './TreeCardHeader';
import TreeCardContent from './TreeCardContent';
import TreeCardActions from './TreeCardActions';
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
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Clickable header */}
      <Link to={`/tree/${tree.id}`} className="block">
        <TreeCardHeader
          userId={tree.userId}
          submissionDate={tree.submissionDate}
          status={tree.status}
          userData={tree.userData}
          user={(tree as any).user}
        />
      </Link>
      
      {/* Clickable content */}
      <Link to={`/tree/${tree.id}`} className="block">
        <TreeCardContent tree={tree} />
      </Link>
      
      {/* Actions (not clickable) */}
      <TreeCardActions
        treeId={tree.id}
        userVote={userVote}
        votes={tree.votes}
        onVote={onVote}
      />
    </div>
  );
};

export default TreeCard;
