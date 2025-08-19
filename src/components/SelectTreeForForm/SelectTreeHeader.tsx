import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TreePine } from 'lucide-react';

const SelectTreeHeader = () => {
  return (
    <>
      {/* Navigation */}
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

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <TreePine className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Wybierz drzewo do wniosku</h1>
        <p className="text-gray-600">Wybierz zatwierdzone drzewo, dla którego chcesz stworzyć wniosek do gminy</p>
      </div>
    </>
  );
};

export default SelectTreeHeader;
