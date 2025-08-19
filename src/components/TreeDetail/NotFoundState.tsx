import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine } from 'lucide-react';

const NotFoundState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Drzewo nie znalezione
        </h3>
        <Link
          to="/map"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Powrót do mapy
        </Link>
      </div>
    </div>
  );
};

export default NotFoundState;
