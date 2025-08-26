import React from 'react';
import { motion } from 'framer-motion';
import HelpSettings from './HelpSettings';
import AboutSettings from './AboutSettings';

interface SettingsContentProps {
  activeSection: string;
  settingsItems: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    emoji: string;
  }>;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  activeSection,
  settingsItems
}) => {
  const getSectionTitle = () => {
    return settingsItems.find(item => item.id === activeSection)?.title || '';
  };

  const renderSettingsSection = () => {
    switch (activeSection) {
      case 'help':
        return <HelpSettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {getSectionTitle()}
      </h2>
      {renderSettingsSection()}
    </motion.div>
  );
};

export default SettingsContent;
