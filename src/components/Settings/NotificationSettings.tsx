import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Smartphone, Mail, MessageSquare } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface NotificationSettingsProps {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    newTrees: boolean;
    verifications: boolean;
    comments: boolean;
  };
  onNotificationChange: (key: string, value: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  notifications, 
  onNotificationChange 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Typy powiadomień
        </h4>
        <div className="space-y-4">
          {[
            { key: 'push', label: 'Powiadomienia push', icon: Smartphone },
            { key: 'email', label: 'Powiadomienia email', icon: Mail },
            { key: 'sms', label: 'Powiadomienia SMS', icon: MessageSquare }
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">{label}</span>
              </div>
              <ToggleSwitch
                isOn={notifications[key as keyof typeof notifications]}
                onChange={() => onNotificationChange(key, !notifications[key as keyof typeof notifications])}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4">Kategorie powiadomień</h4>
        <div className="space-y-4">
          {[
            { key: 'newTrees', label: 'Nowe drzewa w okolicy', emoji: '🌳' },
            { key: 'verifications', label: 'Statusy weryfikacji', emoji: '✅' },
            { key: 'comments', label: 'Nowe komentarze', emoji: '💬' }
          ].map(({ key, label, emoji }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{emoji}</span>
                <span className="font-medium text-gray-800">{label}</span>
              </div>
              <ToggleSwitch
                isOn={notifications[key as keyof typeof notifications]}
                onChange={() => onNotificationChange(key, !notifications[key as keyof typeof notifications])}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationSettings;
