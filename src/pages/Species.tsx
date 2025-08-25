import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchSpecies } from '../utils/api';
import { TreeSpecies } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {
  SpeciesHeader,
  SpeciesSearchFilter,
  SpeciesGrid,
  EmptyState,
  QuickTips
} from '../components/Species';

const Species = () => {
  const [species, setSpecies] = useState<TreeSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFamily, setFilterFamily] = useState<string>('all');

  useEffect(() => {
    loadSpecies();
  }, []);

  const loadSpecies = async () => {
    try {
      const speciesData = await fetchSpecies();
      setSpecies(speciesData);
    } catch (error) {
      console.error('Error loading species:', error);
    } finally {
      setLoading(false);
    }
  };

  const families = [...new Set(species.map(s => s.family))];

  const filteredSpecies = species.filter(s => {
    const matchesSearch = s.namePolish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.nameLatin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFamily = filterFamily === 'all' || s.family === filterFamily;
    return matchesSearch && matchesFamily;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie gatunków...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <SpeciesHeader />
        
        <SpeciesSearchFilter
          searchTerm={searchTerm}
          filterFamily={filterFamily}
          families={families}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterFamily}
        />

        {filteredSpecies.length === 0 ? (
          <EmptyState />
        ) : (
          <SpeciesGrid species={filteredSpecies} />
        )}

        <QuickTips />
      </motion.div>
    </div>
  );
};

export default Species;