import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  User,
  Award,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Eye
} from 'lucide-react';
import { fetchPendingVerifications, voteOnTree, postComment } from '../utils/api';
import { TreeSubmission } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'monument': return 'Pomnik przyrody';
      case 'approved': return 'Zatwierdzony';
      case 'pending': return 'Oczekuje weryfikacji';
      case 'rejected': return 'Odrzucony';
      default: return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monument': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Weryfikacja społecznościowa</h1>
          <p className="text-gray-600">Pomóż społeczności weryfikować zgłoszenia drzew</p>
        </div>

        {/* Instructions */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">Jak weryfikować?</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Sprawdź zdjęcia i opis drzewa</li>
            <li>• Oceń czy dane są poprawne i kompletne</li>
            <li>• Zagłosuj za zatwierdzeniem lub odrzuceniem</li>
            <li>• Dodaj komentarz lub legendę z dodatkowymi informacjami</li>
          </ul>
        </div>

        {/* Verification Feed */}
        {trees.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Brak zgłoszeń do weryfikacji
            </h3>
            <p className="text-gray-600">
              Wszystkie zgłoszenia zostały już zweryfikowane przez społeczność.
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {trees.map((tree, index) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Użytkownik #{tree.userId}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(tree.submissionDate).toLocaleDateString('pl-PL')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tree.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tree.status)}`}>
                        {getStatusLabel(tree.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Image */}
                    {tree.images.length > 0 && (
                      <div className="md:w-1/3">
                        <img
                          src={tree.images[0]}
                          alt={tree.species}
                          className="w-full h-48 md:h-40 object-cover rounded-lg"
                        />
                        {tree.images.length > 1 && (
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            +{tree.images.length - 1} więcej zdjęć
                          </p>
                        )}
                      </div>
                    )}
                    
                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {tree.species}
                      </h3>
                      <p className="text-sm text-gray-600 italic mb-2">
                        {tree.speciesLatin}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{tree.location.address}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                        <p>Pierśnica: {tree.circumference} cm</p>
                        {tree.height && <p>Wysokość: {tree.height} m</p>}
                        <p>Stan: {tree.condition}</p>
                        {tree.isMonument && (
                          <p className="text-yellow-600 font-medium">Kandydat na pomnik</p>
                        )}
                      </div>
                      
                      <p className="text-gray-700 text-sm">
                        {tree.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Voting Section */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 space-y-4">
                  <div className="flex flex-col space-y-3">
                    {/* Like/Dislike buttons */}
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => handleVote(tree.id, 'approve')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-300 glass shadow-lg ${
                          tree.userVote === 'approve'
                            ? 'bg-green-500 text-white border-2 border-green-500'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span>{tree.votes.approve}</span>
                      </button>
                      
                      <button
                        onClick={() => handleVote(tree.id, 'reject')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-300 glass shadow-lg ${
                          tree.userVote === 'reject'
                            ? 'bg-red-500 text-white border-2 border-red-500'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                        <span>{tree.votes.reject}</span>
                      </button>
                    </div>
                    
                    {/* Comment and Details buttons */}
                    <div className="flex items-center justify-between">
                      
                      <button
                        onClick={() => setCommentingOn(commentingOn === tree.id ? null : tree.id)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm text-blue-600 glass-secondary glass-secondary-hover transition-all duration-300 shadow-lg"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Komentuj</span>
                      </button>
                      
                      <Link
                        to={`/tree/${tree.id}`}
                        className="text-sm px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-white btn-green"
                      >
                        Zobacz szczegóły →
                      </Link>
                    </div>
                  </div>
                  
                  {/* Comment Input */}
                  {commentingOn === tree.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-200 w-full"
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="w-full">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Dodaj komentarz lub legendę..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none max-w-full"
                              rows={3}
                            />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 space-y-2 sm:space-y-0">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={isLegend}
                                  onChange={(e) => setIsLegend(e.target.checked)}
                                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-600">Oznacz jako legendę</span>
                              </label>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setCommentingOn(null)}
                                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                  Anuluj
                                </button>
                                <button
                                  onClick={() => handleComment(tree.id)}
                                  disabled={!newComment.trim()}
                                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Dodaj
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Verify;