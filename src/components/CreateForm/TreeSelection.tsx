import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TreePine, MapPin } from 'lucide-react';
import { TreeSubmission } from '../../types';
import LoadingSpinner from '../UI/LoadingSpinner';

interface TreeSelectionProps {
  userTrees: TreeSubmission[];
  selectedTree: TreeSubmission | null;
  loading: boolean;
  onTreeSelect: (tree: TreeSubmission) => void;
}

const TreeSelection: React.FC<TreeSelectionProps> = ({
  userTrees,
  selectedTree,
  loading,
  onTreeSelect,
}) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-6">
          <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Wybierz drzewo</h2>
          <p className="text-gray-600">Które z Twoich drzew dotyczy wniosek?</p>
        </div>
        <div className="text-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </motion.div>
    );
  }

  if (userTrees.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-6">
          <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Wybierz drzewo</h2>
          <p className="text-gray-600">Które z Twoich drzew dotyczy wniosek?</p>
        </div>
        <div className="text-center py-8">
          <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Brak kwalifikujących się drzew
          </h3>
          <p className="text-gray-600 mb-4">
            Aby złożyć wniosek, musisz mieć drzewa oczekujące na weryfikację lub uznane za pomniki przyrody.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{ 
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(5, 150, 105, 0.6)',
              color: 'white'
            }}
          >
            <TreePine className="w-4 h-4" />
            <span>Zgłoś drzewo</span>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Wybierz drzewo</h2>
        <p className="text-gray-600">Które z Twoich drzew dotyczy wniosek?</p>
      </div>

      <div className="space-y-4">
        {userTrees.map((tree) => (
          <button
            key={tree.id}
            onClick={() => onTreeSelect(tree)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              selectedTree?.id === tree.id
                ? 'border-green-300 bg-green-50'
                : 'border-gray-200 hover:border-green-200 hover:bg-green-25'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{tree.species}</h3>
                <p className="text-sm text-gray-600 italic mb-2">{tree.speciesLatin}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{tree.location.address}</span>
                  </div>
                  <span>Pierśnica: {tree.circumference} cm</span>
                </div>
              </div>
              {tree.images.length > 0 && (
                <img
                  src={tree.images[0]}
                  alt={tree.species}
                  className="w-16 h-12 object-cover rounded-lg ml-4"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TreeSelection;
