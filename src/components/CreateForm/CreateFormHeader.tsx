import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CreateFormHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link
          to="/forms"
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Powrót do wniosków</span>
        </Link>
      </div>
    </div>
  );
};

export default CreateFormHeader;
