import React from 'react';
import { Settings } from 'lucide-react';

const SettingsSection: React.FC = () => {
  return (
    <div className="text-center py-16">
      <Settings className="w-20 h-20 text-gray-300 mx-auto mb-6" />
      <h3 className="text-2xl font-medium text-gray-800 mb-4">
        Ustawienia konta
      </h3>
      <p className="text-gray-600 mb-8">
        Funkcjonalność w przygotowaniu
      </p>
      <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-300 font-bold shadow-2xl hover:scale-105">
        Wkrótce dostępne
      </button>
    </div>
  );
};

export default SettingsSection;
