import React from 'react';
import { BarChart3 } from 'lucide-react';

const ReportsHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
        <BarChart3 className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Raporty i statystyki</h1>
      <p className="text-gray-600">Aktualne dane o aplikacji i społeczności</p>
    </div>
  );
};

export default ReportsHeader;
