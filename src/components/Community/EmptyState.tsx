import React from 'react';
import { Search } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
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
  );
};

export default EmptyState;
