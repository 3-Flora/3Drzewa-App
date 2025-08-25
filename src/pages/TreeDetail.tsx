import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchTreeById, fetchComments, postComment, voteOnComment } from '../utils/api';
import { TreeSubmission, Comment } from '../types';
import { useAuth } from '../hooks/useAuth';
import Modal from '../components/UI/Modal';
import {
  TreeDetailHeader,
  TreeInfo,
  TreeContent,
  LegendsSection,
  CommentsSection,
  LoadingState,
  NotFoundState
} from '../components/TreeDetail';

const TreeDetail = () => {
  const { treeId } = useParams<{ treeId: string }>();
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

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!tree) {
    return <NotFoundState />;
  }

  const legends = comments.filter(c => c.isLegend);

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <TreeDetailHeader />
        <TreeInfo tree={tree} />
        <TreeContent tree={tree} onImageClick={handleImageClick} />
        <LegendsSection legends={legends} onVote={handleVoteComment} />
        <CommentsSection
          comments={comments}
          newComment={newComment}
          isLegend={isLegend}
          commentsLoading={commentsLoading}
          onCommentChange={setNewComment}
          onLegendChange={setIsLegend}
          onSubmit={handleComment}
          onVote={handleVoteComment}
        />

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