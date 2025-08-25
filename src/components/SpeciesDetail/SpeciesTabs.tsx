import React from 'react';
import { motion } from 'framer-motion';
import { Info, Camera, Calendar, Book } from 'lucide-react';
import OverviewTab from './OverviewTab';
import IdentificationTab from './IdentificationTab';
import SeasonalTab from './SeasonalTab';
import GalleryTab from './GalleryTab';
import { TreeSpecies } from '../../types';

interface SpeciesTabsProps {
  activeTab: 'overview' | 'identification' | 'seasonal' | 'gallery';
  onTabChange: (tab: 'overview' | 'identification' | 'seasonal' | 'gallery') => void;
  species: TreeSpecies;
}

const SpeciesTabs: React.FC<SpeciesTabsProps> = ({ activeTab, onTabChange, species }) => {
  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: Info },
    { id: 'identification', label: 'Identyfikacja', icon: Camera },
    { id: 'seasonal', label: 'Zmiany sezonowe', icon: Calendar },
    { id: 'gallery', label: 'Galeria', icon: Book },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab species={species} />;
      case 'identification':
        return <IdentificationTab species={species} />;
      case 'seasonal':
        return <SeasonalTab species={species} />;
      case 'gallery':
        return <GalleryTab species={species} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SpeciesTabs;
