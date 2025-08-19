import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine } from 'lucide-react';
import { TreeSubmission } from '../../types';
import LoadingSpinner from '../UI/LoadingSpinner';
import TreeCard from './TreeCard';

interface TreesSectionProps {
  loading: boolean;
  userTrees: TreeSubmission[];
}

const TreesSection: React.FC<TreesSectionProps> = ({ loading, userTrees }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Ładowanie Twoich drzew...</p>
      </div>
    );
  }

  if (userTrees.length === 0) {
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
      {userTrees.map((tree, index) => (
        <TreeCard key={tree.id} tree={tree} index={index} />
      ))}
    </div>
  );
};

export default TreesSection;
