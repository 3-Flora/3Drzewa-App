import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Leaf, 
  CheckCircle, 
  BookOpen,
  BarChart3,
  Bell,
  Shield,
  HelpCircle,
  Info,
  Globe
} from 'lucide-react';
import { fetchSettingsMenu } from '../utils/api';
import { SettingsMenu } from '../types';
import {
  SettingsHeader,
  BackButton,
  MainMenuSection,
  SettingsMenuSection,
  SettingsContent
} from '../components/Settings';

const Settings = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuData, setMenuData] = useState<SettingsMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    newTrees: true,
    verifications: true,
    comments: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    dataSharing: false
  });
  const [language, setLanguage] = useState('pl');

  useEffect(() => {
    loadSettingsMenu();
  }, []);

  const loadSettingsMenu = async () => {
    try {
      const menuData = await fetchSettingsMenu();
      setMenuData(menuData);
    } catch (error) {
      console.error('Error loading settings menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Leaf': return Leaf;
      case 'CheckCircle': return CheckCircle;
      case 'BookOpen': return BookOpen;
      case 'BarChart3': return BarChart3;
      case 'Bell': return Bell;
      case 'Shield': return Shield;
      case 'Globe': return Globe;
      case 'HelpCircle': return HelpCircle;
      case 'Info': return Info;
      default: return FileText;
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  if (loading || !menuData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie ustawień...</p>
        </div>
      </div>
    );
  }

  // Map icons to components
  const mainMenuItems = menuData.mainMenuItems.map((item) => ({
    ...item,
    IconComponent: getIcon(item.icon)
  }));

  const settingsItems = menuData.settingsItems.map((item) => ({
    ...item,
    IconComponent: getIcon(item.icon)
  }));

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <SettingsHeader 
          title="Menu główne"
          description="Wszystkie funkcje i opcje aplikacji RejestrDrzew"
        />
        
        {activeSection && (
          <BackButton
            onClick={() => setActiveSection(null)}
            label="Powrót do menu"
          />
        )}
        
        <MainMenuSection items={mainMenuItems} />
        
        <SettingsMenuSection 
          items={settingsItems}
          onItemClick={(sectionId) => setActiveSection(sectionId)}
        />
        
        <AnimatePresence mode="wait">
          {activeSection && (
            <SettingsContent
              activeSection={activeSection}
              notifications={notifications}
              privacy={privacy}
              language={language}
              onNotificationChange={handleNotificationChange}
              onPrivacyChange={handlePrivacyChange}
              onLanguageChange={handleLanguageChange}
              settingsItems={settingsItems}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Settings;
