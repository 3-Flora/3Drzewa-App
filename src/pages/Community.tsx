import React, { useState, useEffect } from 'react';
import { fetchCommunityFeed, voteOnTree, postComment } from '../utils/api';
import { TreeSubmission } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {
  CommunityHeader,
  TreeCard,
  EmptyState
} from '../components/Community';

const Community = () => {
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const feedData = await fetchCommunityFeed();
      setTrees(feedData);
    } catch (error) {
      console.error('Error loading community feed:', error);
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
      await postComment(treeId, newComment);
      setNewComment('');
      setCommentingOn(null);
      // In a real app, we'd reload comments or update local state
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const filteredTrees = trees.filter(tree => {
    const matchesSearch = tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tree.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tree.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie społeczności...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <CommunityHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Feed */}
      <div className="space-y-6">
        {filteredTrees.map((tree, index) => (
          <TreeCard
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
            isCommenting={commentingOn === tree.id}
          />
        ))}
      </div>

      {filteredTrees.length === 0 && <EmptyState />}
    </div>
  );
};

export default Community;