import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  User,
  Heart,
  TreePine,
  Award,
  Clock
} from 'lucide-react';
import { fetchGlobalLegends } from '../utils/api';
import { TreeLegend } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Legends = () => {
  const [legends, setLegends] = useState<TreeLegend[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  useEffect(() => {
    loadLegends();
  }, []);

  const loadLegends = async () => {
    try {
      const legendsData = await fetchGlobalLegends();
      setLegends(legendsData);
    } catch (error) {
      console.error('Error loading legends:', error);
    } finally {
      setLoading(false);
    }
  };

  const regions = [...new Set(legends.map(l => l.region))];

  const filteredLegends = legends.filter(legend => {
    const matchesSearch = legend.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         legend.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         legend.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || legend.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie legend...</p>
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
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Globalne Legendy</h1>
          <p className="text-gray-600">Odkryj historie i legendy najsłynniejszych drzew Polski</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Szukaj legend, gatunków, lokalizacji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-300 bg-white shadow-lg"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-300 appearance-none bg-white min-w-48 shadow-lg"
            >
              <option value="all">Wszystkie regiony</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Legends Grid */}
        {filteredLegends.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Brak legend
            </h3>
            <p className="text-gray-600">
              Spróbuj zmienić kryteria wyszukiwania.
            </p>
          </div>
        ) : (
          <div className="space-y-8 w-full">
            {filteredLegends.map((legend, index) => (
              <motion.div
                key={legend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-100 w-full"
              >
                <div className="flex flex-col">
                  {/* Image */}
                  <div className="w-full">
                    <img
                      src={legend.image}
                      alt={legend.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="w-full p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{legend.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <TreePine className="w-4 h-4" />
                            <span>{legend.species}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{legend.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{legend.period}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-amber-600" />
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
                          Legenda
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {legend.story}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{legend.author}</p>
                          <p className="text-xs text-gray-600">Autor legendy</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-4 py-2 glass text-amber-700 rounded-xl glass-hover transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold">
                          <Heart className="w-4 h-4" />
                          <span>{legend.likes}</span>
                        </button>
                        <button className="px-6 py-3 glass-accent glass-accent-hover text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                          Zobacz na mapie
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Legends;