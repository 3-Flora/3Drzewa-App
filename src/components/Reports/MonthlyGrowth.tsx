import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MonthlyGrowthProps {
  monthlyGrowth: Array<{ month: string; trees: number; users: number }>;
}

const MonthlyGrowth: React.FC<MonthlyGrowthProps> = ({ monthlyGrowth }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
        Wzrost w ostatnich miesiącach
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {monthlyGrowth.map((month, index) => (
          <div key={index} className="text-center">
            <div className="bg-blue-50 rounded-xl p-4 mb-2">
              <div className="text-lg font-bold text-blue-600">{month.trees}</div>
              <div className="text-xs text-gray-600">drzew</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 mb-2">
              <div className="text-lg font-bold text-green-600">{month.users}</div>
              <div className="text-xs text-gray-600">użytkowników</div>
            </div>
            <div className="text-sm font-medium text-gray-800">{month.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyGrowth;
