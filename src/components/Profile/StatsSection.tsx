import React from 'react';
import { User } from '../../types';

interface StatsSectionProps {
  user: User;
  monumentCount: number;
  approvedCount: number;
  pendingCount: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ 
  user, 
  monumentCount, 
  approvedCount, 
  pendingCount 
}) => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border-3 border-emerald-200 shadow-xl">
          <h3 className="font-bold text-gray-800 mb-6 text-xl">📊 Status zgłoszeń</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">🏆 Pomniki przyrody</span>
              <span className="font-bold text-yellow-600 text-xl">{monumentCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">✅ Zatwierdzone</span>
              <span className="font-bold text-emerald-600 text-xl">{approvedCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">⏳ Oczekujące</span>
              <span className="font-bold text-yellow-600 text-xl">{pendingCount}</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-3 border-blue-200 shadow-xl">
          <h3 className="font-bold text-gray-800 mb-6 text-xl">📈 Aktywność</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">📅 Członek od</span>
              <span className="font-bold text-blue-600">
                {new Date(user.registrationDate).toLocaleDateString('pl-PL')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">🔍 Weryfikacje</span>
              <span className="font-bold text-blue-600 text-xl">{user.verificationsCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">🌳 Zgłoszenia</span>
              <span className="font-bold text-blue-600 text-xl">{user.submissionsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
