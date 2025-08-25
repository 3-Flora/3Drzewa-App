import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, CheckCircle } from 'lucide-react';

interface LanguageSettingsProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSettings: React.FC<LanguageSettingsProps> = ({ 
  language, 
  onLanguageChange 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-600" />
          Język aplikacji
        </h4>
        <div className="space-y-3">
          {[
            { code: 'pl', name: 'Polski', flag: '🇵🇱' },
            { code: 'en', name: 'English', flag: '🇬🇧' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' }
          ].map(({ code, name, flag }) => (
            <button
              key={code}
              onClick={() => onLanguageChange(code)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                language === code ? 'bg-emerald-100 border-2 border-emerald-300' : 'bg-white border-2 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{flag}</span>
                <span className="font-medium text-gray-800">{name}</span>
              </div>
              {language === code && <CheckCircle className="w-5 h-5 text-emerald-600" />}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-yellow-600" />
          Ustawienia regionalne
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format daty</label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-300 focus:outline-none">
              <option>DD.MM.YYYY (Polski)</option>
              <option>MM/DD/YYYY (Amerykański)</option>
              <option>YYYY-MM-DD (ISO)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jednostki miary</label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-300 focus:outline-none">
              <option>Metryczne (cm, m, kg)</option>
              <option>Imperialne (in, ft, lb)</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSettings;
