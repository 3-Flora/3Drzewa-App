import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SpeciesDetailHeader: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <Link
        to="/species"
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Powrót do encyklopedii</span>
      </Link>
    </div>
  );
};

export default SpeciesDetailHeader;
