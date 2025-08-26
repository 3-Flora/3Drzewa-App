import React from 'react';
import { motion } from 'framer-motion';
import { User, Edit, LogOut } from 'lucide-react';
import { User as UserType } from '../../types';

interface ProfileHeaderProps {
  user: UserType;
  monumentCount: number;
  onLogout: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, monumentCount, onLogout }) => {
  return (
    <div className="bg-emerald-800 rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-emerald-600">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-emerald-200 shadow-2xl"
          />
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-200 rounded-full flex items-center justify-center border-4 border-emerald-200 shadow-2xl">
            <User className="w-8 h-8 md:w-10 md:h-10 text-emerald-700" />
          </div>
        )}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-emerald-100 text-sm md:text-base mb-4">{user.email}</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center">
            <div className="bg-emerald-700 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border-2 border-emerald-500">
              <div className="text-lg md:text-xl font-bold text-white mb-1">{user.submissionsCount}</div>
              <div className="text-xs md:text-sm text-emerald-100 font-semibold">Zgłoszeń</div>
            </div>
            <div className="bg-emerald-700 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border-2 border-emerald-500">
              <div className="text-lg md:text-xl font-bold text-white mb-1">{user.verificationsCount}</div>
              <div className="text-xs md:text-sm text-emerald-100 font-semibold">Weryfikacji</div>
            </div>
            <div className="bg-emerald-700 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border-2 border-emerald-500">
              <div className="text-lg md:text-xl font-bold text-white mb-1">{monumentCount}</div>
              <div className="text-xs md:text-sm text-emerald-100 font-semibold">Pomniki</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-6 py-3 rounded-2xl transition-all duration-300 font-bold shadow-2xl flex items-center space-x-2 hover:scale-105 text-sm md:text-base">
            <Edit className="w-5 h-5" />
            <span>Edytuj profil</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center space-x-2 px-4 md:px-6 py-3 bg-red-500/70 hover:bg-red-600/80 text-white rounded-2xl transition-all duration-300 font-bold shadow-2xl hover:scale-105 text-sm md:text-base"
          >
            <LogOut className="w-5 h-5" />
            <span>Wyloguj się</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
