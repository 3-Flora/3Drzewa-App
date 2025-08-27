import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreeSubmission } from '../types';
import { fetchPendingVerifications, voteOnTree } from '../utils/api';
import {
  VerifyHeader,
  VerifyTreeCard,
  VerifyEmptyState,
} from '../components/Verify';

const Verify = () => {
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPendingVerifications();
  }, []);

  const loadPendingVerifications = async () => {
    try {
      setLoading(true);
      const pendingData = await fetchPendingVerifications();
      setTrees(pendingData);
      setError(null);
    } catch (err) {
      console.error('Error loading pending verifications:', err);
      setError('Nie udało się załadować weryfikacji');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (treeId: string, vote: 'approve' | 'reject') => {
    try {
      await voteOnTree(treeId, vote);
      
      setTrees(prev => prev.map(tree => {
        if (tree.id === treeId) {
          // Create a new tree object with updated votes
          const updatedTree = { ...tree };
          
          // If user already voted the same way, remove the vote
          if (updatedTree.userVote === vote) {
            // Remove vote
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
    } catch (error) {
      console.error('Error voting on tree:', error);
      alert('Wystąpił błąd podczas głosowania');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-dark-text-secondary">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={loadPendingVerifications}
            className="px-4 py-2 bg-primary-600 dark:bg-primary-700 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors duration-200"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (trees.length === 0) {
    return <VerifyEmptyState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <VerifyHeader />
      
      <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8 lg:px-8 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {trees.map((tree, index) => (
            <motion.div
              key={tree.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VerifyTreeCard
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

export default Verify;