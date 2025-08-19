import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TreePine, 
  Award, 
  Users, 
  Eye, 
  TrendingUp,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  Leaf,
  Globe,
  Activity
} from 'lucide-react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

interface AppStats {
  totalTrees: number;
  monuments: number;
  activeUsers: number;
  pendingVerifications: number;
  approvedTrees: number;
  rejectedTrees: number;
  newThisMonth: number;
  topRegions: Array<{ name: string; count: number }>;
  topSpecies: Array<{ name: string; count: number }>;
  monthlyGrowth: Array<{ month: string; trees: number; users: number }>;
}

// Mock API function
const fetchAppStats = async (): Promise<AppStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    totalTrees: 2847,
    monuments: 156,
    activeUsers: 1234,
    pendingVerifications: 543,
    approvedTrees: 2148,
    rejectedTrees: 156,
    newThisMonth: 89,
    topRegions: [
      { name: 'Mazowieckie', count: 487 },
      { name: 'Małopolskie', count: 423 },
      { name: 'Śląskie', count: 356 },
      { name: 'Wielkopolskie', count: 298 },
      { name: 'Dolnośląskie', count: 267 }
    ],
    topSpecies: [
      { name: 'Dąb szypułkowy', count: 634 },
      { name: 'Lipa drobnolistna', count: 456 },
      { name: 'Buk zwyczajny', count: 389 },
      { name: 'Klon pospolity', count: 298 },
      { name: 'Jesion wyniosły', count: 234 }
    ],
    monthlyGrowth: [
      { month: 'Sty', trees: 156, users: 89 },
      { month: 'Lut', trees: 234, users: 123 },
      { month: 'Mar', trees: 298, users: 167 },
      { month: 'Kwi', trees: 367, users: 201 },
      { month: 'Maj', trees: 445, users: 245 },
      { month: 'Cze', trees: 523, users: 289 }
    ]
  };
};

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Pobieranie statystyk z API...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Błąd ładowania statystyk
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadStats}
            className="btn-green px-6 py-3 rounded-xl font-bold"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Raporty i statystyki</h1>
          <p className="text-gray-600">Aktualne dane o aplikacji i społeczności</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: TreePine, value: stats.totalTrees.toLocaleString(), label: 'Drzew w rejestrze', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
            { icon: Award, value: stats.monuments.toLocaleString(), label: 'Pomników przyrody', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
            { icon: Users, value: stats.activeUsers.toLocaleString(), label: 'Aktywnych użytkowników', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
            { icon: Eye, value: stats.pendingVerifications.toLocaleString(), label: 'Oczekuje weryfikacji', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
          ].map((stat, index) => (
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

        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-blue-600" />
            Status zgłoszeń
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.approvedTrees.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Zatwierdzone</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.pendingVerifications.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Oczekujące</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.rejectedTrees.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Odrzucone</div>
            </div>
          </div>
        </div>

        {/* Top Regions and Species */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Regions */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-green-600" />
              Top regiony
            </h3>
            <div className="space-y-4">
              {stats.topRegions.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{region.name}</span>
                  </div>
                  <span className="font-bold text-green-600">{region.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Species */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Leaf className="w-6 h-6 mr-3 text-emerald-600" />
              Najpopularniejsze gatunki
            </h3>
            <div className="space-y-4">
              {stats.topSpecies.map((species, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{species.name}</span>
                  </div>
                  <span className="font-bold text-emerald-600">{species.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
            Wzrost w ostatnich miesiącach
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {stats.monthlyGrowth.map((month, index) => (
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

        {/* Additional Stats */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3 text-green-600" />
            Dodatkowe statystyki
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.newThisMonth}</div>
              <div className="text-sm text-gray-600">Nowych drzew w tym miesiącu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {Math.round((stats.approvedTrees / stats.totalTrees) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Wskaźnik zatwierdzenia</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {Math.round(stats.totalTrees / stats.activeUsers * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Średnia drzew na użytkownika</div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center">
          <button
            onClick={loadStats}
            className="btn-green px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Odśwież statystyki
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;