import React from 'react';
import { motion } from 'framer-motion';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import LanguageSettings from './LanguageSettings';
import HelpSettings from './HelpSettings';
import AboutSettings from './AboutSettings';

interface SettingsContentProps {
  activeSection: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    newTrees: boolean;
    verifications: boolean;
    comments: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
    dataSharing: boolean;
  };
  language: string;
  onNotificationChange: (key: string, value: boolean) => void;
  onPrivacyChange: (key: string, value: boolean) => void;
  onLanguageChange: (language: string) => void;
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
  notifications,
  privacy,
  language,
  onNotificationChange,
  onPrivacyChange,
  onLanguageChange,
  settingsItems
}) => {
  const getSectionTitle = () => {
    return settingsItems.find(item => item.id === activeSection)?.title || '';
  };

  const renderSettingsSection = () => {
    switch (activeSection) {
      case 'notifications':
        return (
          <NotificationSettings
            notifications={notifications}
            onNotificationChange={onNotificationChange}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            privacy={privacy}
            onPrivacyChange={onPrivacyChange}
          />
        );
      case 'language':
        return (
          <LanguageSettings
            language={language}
            onLanguageChange={onLanguageChange}
          />
        );
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
