import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Leaf, CheckCircle } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Link
        to="/forms"
        className="glass rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 glass-hover group hover:scale-105"
      >
        <div className="flex items-center space-x-6">
          <div className="p-4 glass-accent rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
            <FileText className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Moje wnioski</h3>
            <p className="text-sm text-gray-600">Zarządzaj wnioskami do gmin</p>
          </div>
        </div>
      </Link>
      <Link
        to="/species"
        className="glass rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 glass-hover group hover:scale-105"
      >
        <div className="flex items-center space-x-6">
          <div className="p-4 glass-primary rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Gatunki drzew</h3>
            <p className="text-sm text-gray-600">Encyklopedia gatunków</p>
          </div>
        </div>
      </Link>
      <Link
        to="/verify"
        className="glass rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 glass-hover group hover:scale-105"
      >
        <div className="flex items-center space-x-6">
          <div className="p-4 glass-secondary rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Weryfikacja</h3>
            <p className="text-sm text-gray-600">Pomóż społeczności</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuickActions;
