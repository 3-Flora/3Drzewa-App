import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { User, TreeSubmission } from '../../types';
import ProfileHeader from './ProfileHeader';
import StatsSection from './StatsSection';
import TreesSection from './TreesSection';
import QuickActions from './QuickActions';

interface ProfileSectionProps {
  user: User;
  userTrees: TreeSubmission[];
  activeSection: string | null;
  onSectionChange: (section: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  emoji: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  userTrees,
  activeSection,
  onSectionChange
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      title: 'Profil użytkownika',
      description: 'Zarządzaj swoim profilem i danymi',
      icon: require('lucide-react').User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      emoji: '👤'
    },
    {
      id: 'trees',
      title: 'Moje drzewa',
      description: 'Przeglądaj i zarządzaj swoimi zgłoszeniami',
      icon: require('lucide-react').TreePine,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      emoji: '🌳'
    },
    {
      id: 'stats',
      title: 'Statystyki',
      description: 'Zobacz swoje statystyki i osiągnięcia',
      icon: require('lucide-react').BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      emoji: '📊'
    },
    {
      id: 'actions',
      title: 'Szybkie akcje',
      description: 'Szybki dostęp do najważniejszych funkcji',
      icon: require('lucide-react').Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      emoji: '⚡'
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileHeader user={user} />;
      case 'trees':
        return <TreesSection trees={userTrees} />;
      case 'stats':
        return <StatsSection user={user} />;
      case 'actions':
        return <QuickActions />;
      default:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 text-left ${item.bgColor}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${item.color} bg-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl mb-2">{item.emoji}</div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {renderSection()}
    </div>
  );
};

export default ProfileSection;
