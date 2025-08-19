import React, { useState, useEffect } from 'react';
import { fetchPendingVerifications, voteOnTree, postComment } from '../utils/api';
import { TreeSubmission } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {
  VerifyHeader,
  VerifyInstructions,
  VerifyEmptyState,
  VerifyTreeCard
} from '../components/Verify';

const Verify = () => {
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLegend, setIsLegend] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadPendingVerifications();
  }, []);

  const loadPendingVerifications = async () => {
    try {
      const pendingTrees = await fetchPendingVerifications();
      setTrees(pendingTrees);
    } catch (error) {
      console.error('Error loading pending verifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (treeId: string, vote: 'approve' | 'reject') => {
    try {
      await voteOnTree(treeId, vote);
      // Update local state
      setTrees(prev => prev.map(tree => {
        if (tree.id === treeId) {
          const newTree = { ...tree };
          if (newTree.userVote === vote) {
            // Remove vote
            newTree.votes[vote]--;
            newTree.userVote = undefined;
          } else {
            // Add or change vote
            if (newTree.userVote) {
              newTree.votes[newTree.userVote]--;
            }
            newTree.votes[vote]++;
            newTree.userVote = vote;
          }
          return newTree;
        }
        return tree;
      }));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleComment = async (treeId: string) => {
    if (!newComment.trim()) return;
    
    try {
      await postComment(treeId, newComment, isLegend);
      setNewComment('');
      setCommentingOn(null);
      setIsLegend(false);
      // In a real app, we'd reload comments or update local state
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie weryfikacji...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <VerifyHeader />
      <VerifyInstructions />

      {/* Verification Feed */}
      {trees.length === 0 ? (
        <VerifyEmptyState />
      ) : (
        <div className="flex flex-col space-y-3">
          {trees.map((tree, index) => (
            <VerifyTreeCard
              key={tree.id}
              tree={tree}
              index={index}
              userVote={tree.userVote}
              onVote={handleVote}
              onCommentClick={(treeId) => setCommentingOn(commentingOn === treeId ? null : treeId)}
              onCommentSubmit={handleComment}
              onCommentCancel={() => setCommentingOn(null)}
              newComment={newComment}
              onCommentChange={setNewComment}
              isLegend={isLegend}
              onLegendChange={setIsLegend}
              isCommenting={commentingOn === tree.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Verify;