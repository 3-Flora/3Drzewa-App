import React from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Ładowanie Twoich drzew...</p>
      </div>
    </div>
  );
};

export default LoadingState;
