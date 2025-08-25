import React from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Ładowanie gatunku...</p>
      </div>
    </div>
  );
};

export default LoadingState;
