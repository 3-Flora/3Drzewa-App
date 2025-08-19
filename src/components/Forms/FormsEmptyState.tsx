import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, TreePine } from 'lucide-react';

interface FormsEmptyStateProps {
  hasForms: boolean;
}

const FormsEmptyState: React.FC<FormsEmptyStateProps> = ({ hasForms }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-12">
        <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-medium text-gray-800 mb-4">
          {hasForms ? 'Brak wyników' : 'Brak wniosków'}
        </h3>
        <p className="text-gray-600 mb-8">
          {hasForms 
            ? 'Spróbuj zmienić kryteria wyszukiwania.'
            : 'Nie masz jeszcze żadnych wygenerowanych wniosków.'
          }
        </p>
        {!hasForms && (
          <button
            onClick={() => navigate('/forms/create')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{ 
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(5, 150, 105, 0.6)',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 1) 0%, rgba(5, 150, 105, 0.8) 100%)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(5, 150, 105, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <TreePine className="w-4 h-4" />
            <span>Stwórz pierwszy wniosek</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FormsEmptyState;
