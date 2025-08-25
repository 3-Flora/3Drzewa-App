import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ProfileSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  emoji: string;
  description: string;
  color: string;
  activeSection: string | null;
  onToggle: (sectionId: string) => void;
  children?: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  id,
  title,
  icon: Icon,
  emoji,
  description,
  color,
  activeSection,
  onToggle,
  children
}) => {
  const isActive = activeSection === id;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className={`w-full p-8 text-left hover:bg-${color}-25 transition-all duration-300 flex items-center justify-between group`}
      >
        <div className="flex items-center space-x-6">
          <div className={`p-4 bg-${color}-100 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <span className="text-3xl">{emoji}</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
          {isActive ? (
            <ChevronUp className="w-8 h-8" />
          ) : (
            <ChevronDown className="w-8 h-8" />
          )}
        </div>
      </button>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t-2 border-gray-100"
        >
          <div className="p-8">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileSection;
