import React from 'react';
import { BookOpen } from 'lucide-react';

const LegendsEmptyState = () => {
  return (
    <div className="text-center py-12">
      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        Brak legend
      </h3>
      <p className="text-gray-600">
        Spróbuj zmienić kryteria wyszukiwania.
      </p>
    </div>
  );
};

export default LegendsEmptyState;
