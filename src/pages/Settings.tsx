
import { motion } from 'framer-motion';
import { 
  FileText, 
  Leaf, 
  CheckCircle, 
  BookOpen,
  BarChart3
} from 'lucide-react';

import {
  SettingsHeader,
  MainMenuSection
} from '../components/Settings';

const Settings = () => {
    // Statyczne dane menu - bez pobierania z bazy danych
  const mainMenuItems = [
    {
      title: 'Moje wnioski',
      description: 'Przeglądaj wygenerowane wnioski do gmin',
      icon: 'FileText',
      path: '/forms',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      emoji: '📄',
      IconComponent: FileText
    },
    {
      title: 'Gatunki drzew',
      description: 'Przeglądaj encyklopedię gatunków',
      icon: 'Leaf',
      path: '/species',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      emoji: '🌿',
      IconComponent: Leaf
    },
    {
      title: 'Weryfikacja społecznościowa',
      description: 'Pomóż weryfikować zgłoszenia społeczności',
      icon: 'CheckCircle',
      path: '/verify',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      emoji: '✅',
      IconComponent: CheckCircle
    },
    {
      title: 'Globalne legendy',
      description: 'Przeglądaj historie i legendy drzew',
      icon: 'BookOpen',
      path: '/legends',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      emoji: '📚',
      IconComponent: BookOpen
    },
    {
      title: 'Raporty i statystyki',
      description: 'Zobacz statystyki aplikacji i społeczności',
      icon: 'BarChart3',
      path: '/reports',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      emoji: '📊',
      IconComponent: BarChart3
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Leaf': return Leaf;
      case 'CheckCircle': return CheckCircle;
      case 'BookOpen': return BookOpen;
      case 'BarChart3': return BarChart3;
      default: return FileText;
    }
  };





  return (
    <div className="max-w-6xl mx-auto p-4 pt-8 pb-24 md:pb-8 lg:px-8 lg:py-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <SettingsHeader 
          title="Menu główne"
          description="Wszystkie funkcje i opcje aplikacji RejestrDrzew"
        />
        
        <MainMenuSection items={mainMenuItems} />
        

        

      </motion.div>
    </div>
  );
};

export default Settings;
