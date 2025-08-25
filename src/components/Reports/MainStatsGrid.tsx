import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Award, Users, Eye } from 'lucide-react';

interface MainStatsGridProps {
  stats: {
    totalTrees: number;
    monuments: number;
    activeUsers: number;
    pendingVerifications: number;
  };
}

const MainStatsGrid: React.FC<MainStatsGridProps> = ({ stats }) => {
  const statItems = [
    { icon: TreePine, value: stats.totalTrees.toLocaleString(), label: 'Drzew w rejestrze', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { icon: Award, value: stats.monuments.toLocaleString(), label: 'Pomników przyrody', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { icon: Users, value: stats.activeUsers.toLocaleString(), label: 'Aktywnych użytkowników', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { icon: Eye, value: stats.pendingVerifications.toLocaleString(), label: 'Oczekuje weryfikacji', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bg} ${stat.border} border-2 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className={`${stat.color} mb-3 flex justify-center`}>
            <stat.icon className="w-8 h-8" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MainStatsGrid;
