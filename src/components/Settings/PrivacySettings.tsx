import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Mail, Smartphone, Lock } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface PrivacySettingsProps {
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
    dataSharing: boolean;
  };
  onPrivacyChange: (key: string, value: boolean) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ 
  privacy, 
  onPrivacyChange 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-purple-600" />
          Widoczność profilu
        </h4>
        <div className="space-y-4">
          {[
            { key: 'profileVisible', label: 'Profil publiczny', icon: Eye },
            { key: 'showEmail', label: 'Pokaż email', icon: Mail },
            { key: 'showPhone', label: 'Pokaż telefon', icon: Smartphone }
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">{label}</span>
              </div>
              <ToggleSwitch
                isOn={privacy[key as keyof typeof privacy]}
                onChange={() => onPrivacyChange(key, !privacy[key as keyof typeof privacy])}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-red-600" />
          Bezpieczeństwo danych
        </h4>
        <div className="space-y-4">
          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-bold">
            🔐 Zmień hasło
          </button>
          <button className="w-full btn-green text-white px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            📱 Włącz uwierzytelnianie dwuskładnikowe
          </button>
          <button className="w-full bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-700 transition-colors font-bold">
            📥 Pobierz moje dane
          </button>
          <button className="w-full bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-bold">
            🗑️ Usuń konto
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacySettings;
