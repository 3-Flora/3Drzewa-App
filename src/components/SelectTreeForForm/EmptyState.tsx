import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine } from 'lucide-react';

interface EmptyStateProps {
  hasTrees: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasTrees }) => {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-12">
        <TreePine className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-medium text-gray-800 mb-4">
          {hasTrees 
            ? 'Brak kwalifikujących się drzew'
            : 'Nie masz jeszcze żadnych drzew'
          }
        </h3>
        <p className="text-gray-600 mb-8">
          {hasTrees 
            ? 'Aby stworzyć wniosek, Twoje drzewa muszą oczekiwać na weryfikację lub być pomnikami przyrody.'
            : 'Aby stworzyć wniosek do gminy, musisz najpierw zgłosić drzewo.'
          }
        </p>
        <Link
          to="/submit"
          className="inline-flex items-center space-x-2 glass-accent glass-accent-hover text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
        >
          <TreePine className="w-5 h-5" />
          <span>Zgłoś pierwsze drzewo</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
