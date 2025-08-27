import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText,
  BarChart3,
  BookOpen,
  Leaf,
  Settings
} from 'lucide-react';

const More = () => {
  const moreItems = [
    { 
      path: '/forms', 
      icon: FileText, 
      label: 'Wnioski',
      description: 'Przeglądaj i zarządzaj swoimi wnioskami',
      color: 'blue',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      path: '/reports', 
      icon: BarChart3, 
      label: 'Raporty',
      description: 'Analizy i statystyki dotyczące drzew',
      color: 'purple',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    { 
      path: '/legends', 
      icon: BookOpen, 
      label: 'Legendy',
      description: 'Przeglądaj legendy i historie drzew',
      color: 'yellow',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    { 
      path: '/species', 
      icon: Leaf, 
      label: 'Gatunki',
      description: 'Katalog gatunków drzew i ich charakterystyka',
      color: 'green',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      path: '/settings', 
      icon: Settings, 
      label: 'Ustawienia',
      description: 'Konfiguracja aplikacji i preferencje użytkownika',
      color: 'gray',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 pt-16 md:pt-20 pb-24 md:pb-8 lg:px-8 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* More Items - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className="block p-6 rounded-2xl border-2 bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-emerald-100 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-emerald-700 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {item.label}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-600 opacity-80">
                    Kliknij aby przejść
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default More;
