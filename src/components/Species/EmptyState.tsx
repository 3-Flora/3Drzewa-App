import React from 'react';
import { Search } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
