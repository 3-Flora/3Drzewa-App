import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  User,
  Search,
  Filter,
  Award,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { fetchCommunityFeed, voteOnTree, postComment } from '../utils/api';
import { TreeSubmission } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';

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
      case 'pending': return 'Oczekuje';
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
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Społeczność</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Szukaj drzew, gatunków, lokalizacji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Wszystkie</option>
              <option value="monument">Pomniki przyrody</option>
              <option value="approved">Zatwierdzone</option>
              <option value="pending">Oczekujące</option>
              <option value="rejected">Odrzucone</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {filteredTrees.map((tree, index) => (
          <motion.div
            key={tree.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      className="w-full h-48 md:h-32 object-cover rounded-lg"
                    />
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
                  
                  <p className="text-sm text-gray-700 mb-3">
                    Pierśnica: {tree.circumference} cm
                    {tree.height && ` • Wysokość: ${tree.height} m`}
                  </p>
                  
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {tree.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="flex flex-col space-y-3">
                {/* Like/Dislike buttons */}
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleVote(tree.id, 'approve')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-300 glass shadow-lg ${
                      tree.userVote === 'approve'
                        ? 'bg-green-500 text-white border-2 border-green-500'
                        : 'bg-white text-green-500 border-2 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="text-lg text-green-500">👍</span>
                    <span>{tree.votes.approve}</span>
                  </button>
                  
                  <button
                    onClick={() => handleVote(tree.id, 'reject')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-300 glass shadow-lg ${
                      tree.userVote === 'reject'
                        ? 'bg-red-500 text-white border-2 border-red-500'
                        : 'bg-white text-red-500 border-2 border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <span className="text-lg text-red-500">👎</span>
                    <span>{tree.votes.reject}</span>
                  </button>
                </div>
                
                {/* Comment and Details buttons */}
                <div className="flex items-center justify-center space-x-4">
                  
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
                  className="mt-3 pt-3 border-t border-gray-200"
                >
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Dodaj komentarz..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        rows={2}
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setCommentingOn(null)}
                          className="px-4 py-2 text-sm text-gray-700 glass glass-hover rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Anuluj
                        </button>
                        <button
                          onClick={() => handleComment(tree.id)}
                          disabled={!newComment.trim()}
                          className="px-6 py-2 glass-accent glass-accent-hover text-white text-sm rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold"
                        >
                          Dodaj
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTrees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Brak wyników
          </h3>
          <p className="text-gray-600">
            Spróbuj zmienić kryteria wyszukiwania lub filtry.
          </p>
        </div>
      )}
    </div>
  );
};

export default Community;