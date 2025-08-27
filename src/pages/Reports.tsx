import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ReportsHeader,
  MainStatsGrid,
  StatusBreakdown,
  TopRegions,
  TopSpecies,
  MonthlyGrowth,
  AdditionalStats,
  RefreshButton,
  ErrorState,
  LoadingState
} from '../components/Reports';
import { fetchAppStats } from '../utils/api';
import { AppStats } from '../types';

const Reports = () => {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const statsData = await fetchAppStats();
      setStats(statsData);
    } catch (err) {
      setError('Błąd podczas ładowania statystyk');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !stats) {
    return <ErrorState error={error || 'Nieznany błąd'} onRetry={loadStats} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8 pb-24 md:pb-8 lg:px-8 lg:py-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <ReportsHeader />
        
        <MainStatsGrid stats={stats} />
        
        <StatusBreakdown
          approvedTrees={stats.approvedTrees}
          pendingVerifications={stats.pendingVerifications}
          rejectedTrees={stats.rejectedTrees}
        />
        
        {/* Top Regions and Species */}
        <div className="grid md:grid-cols-2 gap-8">
          <TopRegions topRegions={stats.topRegions} />
          <TopSpecies topSpecies={stats.topSpecies} />
        </div>
        
        <MonthlyGrowth monthlyGrowth={stats.monthlyGrowth} />
        
        <AdditionalStats
          newThisMonth={stats.newThisMonth}
          approvedTrees={stats.approvedTrees}
          totalTrees={stats.totalTrees}
          activeUsers={stats.activeUsers}
        />
        
        <RefreshButton onRefresh={loadStats} />
      </motion.div>
    </div>
  );
};

export default Reports;