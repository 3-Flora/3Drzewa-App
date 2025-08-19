import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Award, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { fetchUserTrees } from '../utils/api';
import { TreeSubmission } from '../types';
import {
  ProfileHeader,
  QuickActions,
  ProfileSection,
  NotLoggedIn
} from '../components/Profile';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userTrees, setUserTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadUserTrees();
    }
  }, [user]);

  const loadUserTrees = async () => {
    if (!user) return;
    try {
      const trees = await fetchUserTrees(user.id);
      setUserTrees(trees);
    } catch (error) {
      console.error('Error loading user trees:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  if (!user) {
    return <NotLoggedIn />;
  }

  const monumentCount = userTrees.filter(t => t.status === 'monument').length;
  const approvedCount = userTrees.filter(t => t.status === 'approved').length;
  const pendingCount = userTrees.filter(t => t.status === 'pending').length;

  const profileSections = [
    {
      id: 'trees',
      title: 'Moje drzewa',
      icon: TreePine,
      emoji: '🌳',
      description: `${userTrees.length} zgłoszonych drzew`,
      color: 'emerald'
    },
    {
      id: 'stats',
      title: 'Statystyki',
      icon: Award,
      emoji: '📊',
      description: `${monumentCount} pomników, ${approvedCount} zatwierdzonych`,
      color: 'blue'
    },
    {
      id: 'settings',
      title: 'Ustawienia konta',
      icon: Settings,
      emoji: '⚙️',
      description: 'Zarządzaj swoim kontem',
      color: 'gray'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <ProfileHeader
          user={user}
          monumentCount={monumentCount}
          onLogout={logout}
        />
        
        <QuickActions />
        
        {/* Profile Sections - Vertical Layout */}
        <div className="space-y-6">
          {profileSections.map((section) => (
            <ProfileSection
              key={section.id}
              section={section}
              activeSection={activeSection}
              onToggle={toggleSection}
              user={user}
              userTrees={userTrees}
              loading={loading}
              monumentCount={monumentCount}
              approvedCount={approvedCount}
              pendingCount={pendingCount}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;