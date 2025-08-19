import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchGlobalLegends } from '../utils/api';
import { TreeLegend } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {
  LegendsHeader,
  LegendsSearchFilter,
  LegendsGrid
} from '../components/Legends';

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
        <LegendsHeader />
        
        <LegendsSearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRegion={filterRegion}
          setFilterRegion={setFilterRegion}
          regions={regions}
        />
        
        <LegendsGrid filteredLegends={filteredLegends} />
      </motion.div>
    </div>
  );
};

export default Legends;