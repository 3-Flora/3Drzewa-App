import React from 'react';
import { useNavigationHistory } from '../../hooks/useNavigationHistory';
import { ArrowLeft } from 'lucide-react';

const TreeDetailHeader: React.FC = () => {
  const { goBack, getPreviousPath } = useNavigationHistory();
  const previousPath = getPreviousPath();
  
  // Get readable name for previous page
  const getPreviousPageName = (path: string) => {
    switch (path) {
      case '/map':
        return 'mapy';
      case '/community':
        return 'społeczności';
      case '/profile':
        return 'profilu';
      case '/reports':
        return 'raportów';
      case '/verify':
        return 'weryfikacji';
      case '/forms':
        return 'wniosków';
      case '/submit':
        return 'zgłaszania';
      case '/create-form':
        return 'tworzenia wniosku';
      case '/select-tree':
        return 'wyboru drzewa';
      case '/more':
        return 'menu';
      case '/':
        return 'strony głównej';
      default:
        return 'poprzedniej strony';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Powrót do {getPreviousPageName(previousPath)}</span>
        </button>
      </div>
    </div>
  );
};

export default TreeDetailHeader;
