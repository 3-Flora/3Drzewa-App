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
    <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 border-4 border-emerald-200">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-6 border-white shadow-2xl"
          />
        ) : (
          <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-200 rounded-full flex items-center justify-center border-6 border-white shadow-2xl">
            <User className="w-12 h-12 md:w-16 md:h-16 text-emerald-700" />
          </div>
        )}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{user.name}</h1>
          <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg">{user.email}</p>
          <div className="grid grid-cols-3 gap-2 md:gap-6 text-center">
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl border-2 border-emerald-100">
              <div className="text-xl md:text-3xl font-bold text-emerald-600 mb-1">{user.submissionsCount}</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Zgłoszeń</div>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl border-2 border-blue-100">
              <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1">{user.verificationsCount}</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Weryfikacji</div>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl border-2 border-yellow-100">
              <div className="text-xl md:text-3xl font-bold text-yellow-600 mb-1">{monumentCount}</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Pomniki</div>
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
