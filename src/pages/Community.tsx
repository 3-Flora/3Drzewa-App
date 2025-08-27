import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreeSubmission } from '../types';
import { fetchCommunityFeed, voteOnTree } from '../utils/api';
import {
  TreeCard,
  EmptyState,
} from '../components/Community';

const Community = () => {
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');

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
      const success = await voteOnTree(treeId, vote);
      
      if (success) {
        setTrees(prev => prev.map(tree => {
          if (tree.id === treeId) {
            // Create a copy of the tree to avoid mutating the original
            const updatedTree = { ...tree };
            
            // If user already voted the same way, remove the vote
            if (updatedTree.userVote === vote) {
              updatedTree.votes[vote]--;
              updatedTree.userVote = undefined;
            } else {
              // Add or change vote
              if (updatedTree.userVote) {
                updatedTree.votes[updatedTree.userVote]--;
              }
              updatedTree.votes[vote]++;
              updatedTree.userVote = vote;
            }
            return updatedTree;
          }
          return tree;
        }));
      }
    } catch (error) {
      console.error('Error voting on tree:', error);
      alert('Wystąpił błąd podczas głosowania');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-dark-text-secondary">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={loadCommunityFeed}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 font-semibold transition-colors duration-200"
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
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-200">




      {/* Feed Content */}
      <div className="max-w-4xl mx-auto lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="divide-y-2 divide-gray-300 dark:divide-dark-border"
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