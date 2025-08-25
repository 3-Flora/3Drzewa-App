import React from 'react';
import { BarChart3 } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Błąd ładowania statystyk
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="btn-green px-6 py-3 rounded-xl font-bold"
        >
          Spróbuj ponownie
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
