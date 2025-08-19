import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight } from 'lucide-react';

const HelpSettings: React.FC = () => {
  return (
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
};

export default HelpSettings;
