import React from 'react';
import { MapPin } from 'lucide-react';

const SubmitHeader = () => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <MapPin className="w-6 h-6 text-green-600" />
      <h1 className="text-2xl font-bold text-gray-800">Zgłoś nowe drzewo</h1>
    </div>
  );
};

export default SubmitHeader;
