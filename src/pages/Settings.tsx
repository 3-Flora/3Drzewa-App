import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileText, 
  Leaf, 
  CheckCircle, 
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  Info,
  BookOpen,
  BarChart3,
  Globe,
  MessageSquare,
  MoreHorizontal,
  ChevronRight,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  MapPin,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
  const [theme, setTheme] = useState('light');

  const mainMenuItems = [
    {
      title: 'Moje wnioski',
      description: 'Przeglądaj wygenerowane wnioski do gmin',
      icon: FileText,
      path: '/forms',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      emoji: '📄'
    },
    {
      title: 'Gatunki drzew',
      description: 'Przeglądaj encyklopedię gatunków',
      icon: Leaf,
      path: '/species',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      emoji: '🌿'
    },
    {
      title: 'Weryfikacja społecznościowa',
      description: 'Pomóż weryfikować zgłoszenia społeczności',
      icon: CheckCircle,
      path: '/verify',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      emoji: '✅'
    },
    {
      title: 'Globalne legendy',
      description: 'Przeglądaj historie i legendy drzew',
      icon: BookOpen,
      path: '/legends',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      emoji: '📚'
    },
    {
      title: 'Raporty i statystyki',
      description: 'Zobacz statystyki aplikacji i społeczności',
      icon: BarChart3,
      path: '/reports',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      emoji: '📊'
    },
  ];

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Powiadomienia',
      description: 'Zarządzaj powiadomieniami push i email',
      icon: Bell,
      emoji: '🔔'
    },
    {
      id: 'privacy',
      title: 'Prywatność i bezpieczeństwo',
      description: 'Ustawienia prywatności i bezpieczeństwa konta',
      icon: Shield,
      emoji: '🛡️'
    },
    {
      id: 'language',
      title: 'Język i region',
      description: 'Zmień język aplikacji i ustawienia regionalne',
      icon: Globe,
      emoji: '🌍'
    },
    {
      id: 'help',
      title: 'Pomoc i FAQ',
      description: 'Często zadawane pytania i wsparcie techniczne',
      icon: HelpCircle,
      emoji: '❓'
    },
    {
      id: 'about',
      title: 'O aplikacji',
      description: 'Informacje o RejestrDrzew i zespole',
      icon: Info,
      emoji: 'ℹ️'
    }
  ];

  const renderNotificationsSettings = () => (
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
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[key as keyof typeof notifications] ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  notifications[key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
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
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[key as keyof typeof notifications] ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  notifications[key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPrivacySettings = () => (
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
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privacy[key as keyof typeof privacy] ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  privacy[key as keyof typeof privacy] ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
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
          <button className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-bold">
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

  const renderLanguageSettings = () => (
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
              onClick={() => setLanguage(code)}
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

  const renderHelpSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glass-primary rounded-2xl p-6 shadow-2xl border-2 border-green-200">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
          Często zadawane pytania
        </h4>
        <div className="space-y-3">
          {[
            'Jak zgłosić nowe drzewo?',
            'Jak działa weryfikacja społecznościowa?',
            'Jak wygenerować wniosek do gminy?',
            'Jak rozpoznać gatunek drzewa?',
            'Jak dodać legendę do drzewa?'
          ].map((question, index) => (
            <button
              key={index}
              className="w-full text-left p-4 glass glass-hover rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{question}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="glass-secondary rounded-2xl p-6 shadow-2xl border-2 border-blue-200">
        <h4 className="font-bold text-gray-800 text-lg mb-4">Kontakt z pomocą</h4>
        <div className="space-y-3">
          <button className="w-full glass-secondary glass-secondary-hover text-blue-700 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            📧 Wyślij email do wsparcia
          </button>
          <button className="w-full glass-primary glass-primary-hover text-green-700 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            💬 Chat na żywo
          </button>
          <button className="w-full glass-accent glass-accent-hover text-emerald-700 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            📞 Zadzwoń do nas
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderAboutSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-100 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-bold text-gray-800 text-2xl mb-2">RejestrDrzew</h4>
        <p className="text-gray-600 mb-4">Wersja 1.0.0</p>
        <p className="text-gray-700 leading-relaxed">
          Społecznościowy rejestr polskich pomników przyrody. 
          Odkrywaj, dokumentuj i chroń nasze najcenniejsze drzewa.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4">Zespół</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Jan Kowalski</p>
              <p className="text-sm text-gray-600">Konsultant botaniczny</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Anna Nowak</p>
              <p className="text-sm text-gray-600">Specjalista ds. weryfikacji</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4">Informacje prawne</h4>
        <p className="text-gray-600 text-center py-8">
          Dokumenty prawne będą dostępne w przyszłych wersjach aplikacji.
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <MoreHorizontal className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Menu główne</h1>
          <p className="text-gray-600">Wszystkie funkcje i opcje aplikacji RejestrDrzew</p>
        </div>

        {/* Back Button */}
        {activeSection && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setActiveSection(null)}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-bold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Powrót do menu</span>
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          {!activeSection ? (
            <motion.div
              key="main-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Main Menu Section */}
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border-b-2 border-emerald-100">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="text-2xl mr-3">🌳</span>
                    Główne funkcje
                  </h3>
                </div>
                <div className="divide-y-2 divide-emerald-50">
                  {mainMenuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        className="flex items-center space-x-6 p-6 glass-hover transition-all duration-300 hover:shadow-lg group"
                      >
                        <motion.div 
                          className="p-4 rounded-2xl glass-primary group-hover:scale-110 transition-transform duration-300 shadow-lg"
                          whileHover={{ rotate: 10 }}
                        >
                          <span className="text-2xl">{item.emoji}</span>
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <motion.div 
                          className="text-emerald-600 group-hover:translate-x-2 transition-transform duration-300"
                          whileHover={{ scale: 1.2 }}
                        >
                          <ChevronRight className="w-6 h-6" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Settings Section */}
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b-2 border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="text-2xl mr-3">⚙️</span>
                    Ustawienia aplikacji
                  </h3>
                </div>
                <div className="divide-y-2 divide-gray-50">
                  {settingsItems.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center space-x-6 p-6 glass-hover transition-all duration-300 hover:shadow-lg group w-full`}
                    >
                      <motion.div 
                        className={`p-4 rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/50`}
                        whileHover={{ rotate: 10 }}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                      </motion.div>
                      <div className="flex-1 text-left">
                        <h4 className={`font-bold text-gray-800 text-lg mb-1`}>{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <motion.div 
                        className={`text-gray-600 group-hover:translate-x-2 transition-transform duration-300`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {settingsItems.find(item => item.id === activeSection)?.title}
              </h2>
              {activeSection === 'notifications' && renderNotificationsSettings()}
              {activeSection === 'privacy' && renderPrivacySettings()}
              {activeSection === 'language' && renderLanguageSettings()}
              {activeSection === 'help' && renderHelpSettings()}
              {activeSection === 'about' && renderAboutSettings()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Settings;
