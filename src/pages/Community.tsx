import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreeSubmission } from '../types';
import { fetchCommunityFeed, voteOnTree } from '../utils/api';
import {
  CommunityHeader,
  TreeCard,
  EmptyState,
} from '../components/Community';

const Community = () => {
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCommunityFeed();
  }, []);

  const loadCommunityFeed = async () => {
    try {
      setLoading(true);
      const feedData = await fetchCommunityFeed();
      setTrees(feedData);
      setError(null);
    } catch (err) {
      console.error('Error loading community feed:', err);
      setError('Nie udało się załadować feedu społeczności');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (treeId: string, vote: 'approve' | 'reject') => {
    try {
      const newTree = await voteOnTree(treeId, vote);
      
      setTrees(prev => prev.map(tree => {
        if (tree.id === treeId) {
          // If user already voted the same way, remove the vote
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
      console.error('Error voting on tree:', error);
      alert('Wystąpił błąd podczas głosowania');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadCommunityFeed}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (trees.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      
      <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {trees.map((tree, index) => (
            <motion.div
              key={tree.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TreeCard
                tree={tree}
                userVote={tree.userVote}
                onVote={handleVote}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Community;