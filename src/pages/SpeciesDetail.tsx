import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchSpeciesById } from '../utils/api';
import { TreeSpecies } from '../types';
import {
  SpeciesDetailHeader,
  SpeciesHero,
  SpeciesTabs,
  LoadingState,
  NotFoundState
} from '../components/SpeciesDetail';

const SpeciesDetail = () => {
  const { speciesId } = useParams<{ speciesId: string }>();
  const [species, setSpecies] = useState<TreeSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'identification' | 'seasonal' | 'gallery'>('overview');

  useEffect(() => {
    if (speciesId) {
      loadSpecies(speciesId);
    }
  }, [speciesId]);

  const loadSpecies = async (id: string) => {
    try {
      const speciesData = await fetchSpeciesById(id);
      setSpecies(speciesData);
    } catch (error) {
      console.error('Error loading species:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!species) {
    return <NotFoundState />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <SpeciesDetailHeader />
        <SpeciesHero species={species} />
        <SpeciesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          species={species}
        />
      </motion.div>
    </div>
  );
};

export default SpeciesDetail;