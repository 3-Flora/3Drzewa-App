import React from 'react';
import { TreePine, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <TreePine className="w-10 h-10 text-blue-600" />
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Brak drzew w feedzie
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Wygląda na to, że nikt jeszcze nie dodał drzew do społeczności. 
          Bądź pierwszy i dodaj swoje pierwsze drzewo!
        </p>
        
        {/* Action Button */}
        <Link
          to="/submit"
          className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Dodaj drzewo</span>
        </Link>
        
        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          Lub przejdź do <Link to="/map" className="text-blue-500 hover:underline">mapy</Link> żeby zobaczyć drzewa w Twojej okolicy
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
