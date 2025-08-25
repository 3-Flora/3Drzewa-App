import React from 'react';
import { CheckCircle } from 'lucide-react';

const VerifyEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        Brak zgłoszeń do weryfikacji
      </h3>
      <p className="text-gray-600">
        Wszystkie zgłoszenia zostały już zweryfikowane przez społeczność.
      </p>
    </div>
  );
};

export default VerifyEmptyState;
