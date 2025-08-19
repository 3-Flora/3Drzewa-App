import React from 'react';
import { Globe } from 'lucide-react';

interface AdditionalStatsProps {
  newThisMonth: number;
  approvedTrees: number;
  totalTrees: number;
  activeUsers: number;
}

const AdditionalStats: React.FC<AdditionalStatsProps> = ({
  newThisMonth,
  approvedTrees,
  totalTrees,
  activeUsers
}) => {
  const approvalRate = Math.round((approvedTrees / totalTrees) * 100);
  const avgTreesPerUser = Math.round(totalTrees / activeUsers * 10) / 10;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Globe className="w-6 h-6 mr-3 text-green-600" />
        Dodatkowe statystyki
      </h3>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600 mb-1">{newThisMonth}</div>
          <div className="text-sm text-gray-600">Nowych drzew w tym miesiącu</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600 mb-1">{approvalRate}%</div>
          <div className="text-sm text-gray-600">Wskaźnik zatwierdzenia</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600 mb-1">{avgTreesPerUser}</div>
          <div className="text-sm text-gray-600">Średnia drzew na użytkownika</div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalStats;
