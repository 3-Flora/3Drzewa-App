import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { TreePine, Award, CheckCircle, Clock, Calendar, MapPin } from 'lucide-react';
import { TreeSubmission } from '../../types';
import LoadingSpinner from '../UI/LoadingSpinner';

interface TreesSectionProps {
  trees: TreeSubmission[];
  loading: boolean;
}

const TreesSection: React.FC<TreesSectionProps> = ({ trees, loading }) => {
  const navigate = useNavigate();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument':
        return <Award className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'monument':
        return 'Pomnik przyrody';
      case 'approved':
        return 'Zatwierdzony';
      case 'pending':
        return 'Oczekuje';
      default:
        return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monument':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Ładowanie Twoich drzew...</p>
      </div>
    );
  }

  if (trees.length === 0) {
    return (
      <div className="text-center py-16">
        <TreePine className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-medium text-gray-800 mb-4">
          Nie masz jeszcze zgłoszonych drzew
        </h3>
        <p className="text-gray-600 mb-8">
          Zacznij dokumentować pomniki przyrody w swojej okolicy
        </p>
        <Link
          to="/submit"
          className="inline-flex items-center space-x-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-300 font-bold shadow-2xl hover:scale-105"
        >
          <TreePine className="w-6 h-6" />
          <span>Zgłoś pierwsze drzewo</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {trees.map((tree, index) => (
        <motion.div
          key={tree.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-emerald-200 cursor-pointer"
          onClick={() => navigate(`/tree/${tree.id}`)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-3">
                <h3 className="text-xl font-bold text-gray-800">{tree.species}</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(tree.status)}
                  <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(tree.status)}`}>
                    {getStatusLabel(tree.status)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic mb-3">{tree.speciesLatin}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{tree.location.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(tree.submissionDate).toLocaleDateString('pl-PL')}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                {tree.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold">
                  📏 Pierśnica: {tree.circumference} cm
                </span>
                {tree.height && (
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                    📐 Wysokość: {tree.height} m
                  </span>
                )}
              </div>
            </div>
            {tree.images && tree.images.length > 0 && (
              <img
                src={tree.images[0]}
                alt={tree.species}
                className="w-24 h-24 object-cover rounded-2xl ml-6 border-3 border-gray-200 shadow-lg"
              />
            )}
          </div>

        </motion.div>
      ))}
    </div>
  );
};

export default TreesSection;
