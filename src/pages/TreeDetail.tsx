import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Heart,
  FileText,
  Camera,
  Ruler,
  TreePine,
  ThumbsUp
} from 'lucide-react';
import { fetchTreeById, fetchComments, postComment, voteOnComment, generateMunicipalForm } from '../utils/api';
import { TreeSubmission, Comment } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Modal from '../components/UI/Modal';

const TreeDetail = () => {
  const { treeId } = useParams<{ treeId: string }>();
  const navigate = useNavigate();
  const [tree, setTree] = useState<TreeSubmission | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLegend, setIsLegend] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    if (treeId) {
      loadTree(treeId);
      loadComments(treeId);
    }
  }, [treeId]);

  const loadTree = async (id: string) => {
    try {
      const treeData = await fetchTreeById(id);
      setTree(treeData);
    } catch (error) {
      console.error('Error loading tree:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (id: string) => {
    setCommentsLoading(true);
    try {
      const commentsData = await fetchComments(id);
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim() || !treeId) return;
    
    try {
      const comment = await postComment(treeId, newComment, isLegend);
      setComments(prev => [...prev, comment]);
      setNewComment('');
      setIsLegend(false);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleVoteComment = async (commentId: string) => {
    if (!treeId) return;
    
    try {
      await voteOnComment(commentId, treeId);
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              votes: comment.userVoted ? comment.votes - 1 : comment.votes + 1,
              userVoted: !comment.userVoted 
            }
          : comment
      ));
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
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

  const regularComments = comments.filter(c => !c.isLegend);
  const legends = comments.filter(c => c.isLegend);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie drzewa...</p>
        </div>
      </div>
    );
  }

  if (!tree) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Drzewo nie znalezione
          </h3>
          <Link
            to="/map"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Powrót do mapy
          </Link>
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
        <div className="flex items-center space-x-4 mb-6">
          <Link
            to="/map"
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Powrót do mapy</span>
          </Link>
        </div>

        {/* Tree Info */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{tree.species}</h1>
                <p className="text-lg text-gray-600 italic mb-2">{tree.speciesLatin}</p>
                <div className="glass bg-yellow-50 border-2 border-yellow-200 px-3 py-2 rounded-xl inline-flex items-center space-x-2">
                  {getStatusIcon(tree.status)}
                  <span className={`text-sm font-bold ${getStatusColor(tree.status).replace('bg-', 'text-').replace('-100', '-800')}`}>
                    {getStatusLabel(tree.status)}
                  </span>
                </div>
              </div>
              
              {tree.status === 'approved' && (
                <button
                  onClick={() => navigate('/forms/create')}
                  className="flex items-center space-x-2 glass-accent glass-accent-hover text-white px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <FileText className="w-5 h-5" />
                  <span>Stwórz wniosek</span>
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{tree.location.address}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Zgłoszono: {new Date(tree.submissionDate).toLocaleDateString('pl-PL')}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>Użytkownik #{tree.userId}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Ruler className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Pierśnica</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{tree.circumference} cm</p>
                  </div>
                  
                  {tree.height && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <TreePine className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Wysokość</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">{tree.height} m</p>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Opis</h3>
                  <p className="text-gray-700 leading-relaxed">{tree.description}</p>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Zdjęcia</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tree.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(image);
                        setShowImageModal(true);
                      }}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <img
                        src={image}
                        alt={`${tree.species} ${index + 1}`}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legends Section */}
        {legends.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Legendy i historie</span>
            </h3>
            <div className="space-y-4">
              {legends.map((legend) => (
                <div key={legend.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {legend.userAvatar ? (
                        <img src={legend.userAvatar} alt={legend.userName} className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-yellow-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-800">{legend.userName}</span>
                          <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                            Legenda
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{legend.content}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(legend.date).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleVoteComment(legend.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition-colors ${
                        legend.userVoted
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-700'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{legend.votes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span>Komentarze ({regularComments.length})</span>
          </h3>

          {/* Add Comment */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Dodaj komentarz lub legendę..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isLegend}
                      onChange={(e) => setIsLegend(e.target.checked)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">Oznacz jako legendę</span>
                  </label>
                  <button
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Dodaj
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {commentsLoading ? (
            <div className="text-center py-4">
              <LoadingSpinner size="sm" />
            </div>
          ) : regularComments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Brak komentarzy. Bądź pierwszy!</p>
          ) : (
            <div className="space-y-4">
              {regularComments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  {comment.userAvatar ? (
                    <img src={comment.userAvatar} alt={comment.userName} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">{comment.userName}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.date).toLocaleDateString('pl-PL')}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <button
                    onClick={() => handleVoteComment(comment.id)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition-colors ${
                      comment.userVoted
                        ? 'glass-secondary text-blue-800 border-2 border-blue-300 shadow-xl transform scale-105'
                        : 'glass glass-hover text-gray-700 hover:text-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{comment.votes}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Modal */}
        <Modal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          title="Zdjęcie drzewa"
        >
          <img
            src={selectedImage}
            alt="Powiększone zdjęcie"
            className="w-full max-h-96 object-contain rounded-lg"
          />
        </Modal>
      </motion.div>
    </div>
  );
};

export default TreeDetail;