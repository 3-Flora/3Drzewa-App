import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Award, Users, Eye } from 'lucide-react';
import { mockHomeStats } from '../../data/mockData';
import { HomeStats } from '../../types';

const StatsSection = () => {
  const [stats, setStats] = useState<HomeStats[]>(mockHomeStats);

  useEffect(() => {
    // TODO: Replace with actual API call to backend .NET API GET /api/reports/stats
    // const loadStats = async () => {
    //   try {
    //     const response = await fetch('/api/reports/stats');
    //     const data = await response.json();
    //     setStats([
    //       { icon: 'TreePine', value: data.totalTrees.toLocaleString(), label: 'Drzew w rejestrze', color: 'text-green-600' },
    //       { icon: 'Award', value: data.monuments.toLocaleString(), label: 'Pomników przyrody', color: 'text-amber-600' },
    //       { icon: 'Users', value: data.activeUsers.toLocaleString(), label: 'Aktywnych użytkowników', color: 'text-blue-600' },
    //       { icon: 'Eye', value: data.pendingVerifications.toLocaleString(), label: 'Oczekuje weryfikacji', color: 'text-purple-600' },
    //     ]);
    //   } catch (error) {
    //     console.error('Error loading stats:', error);
    //   }
    // };
    // loadStats();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TreePine': return TreePine;
      case 'Award': return Award;
      case 'Users': return Users;
      case 'Eye': return Eye;
      default: return TreePine;
    }
  };

  return (
    <div className="py-16 bg-white dark:bg-dark-card transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = getIcon(stat.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`${stat.color} mb-2 flex justify-center`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-dark-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
