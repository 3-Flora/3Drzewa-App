import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const AboutSettings: React.FC = () => {
  return (
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
};

export default AboutSettings;
