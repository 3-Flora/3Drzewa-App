import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Odkrywaj',
      description: 'Przeglądaj mapę drzew w całej Polsce i poznawaj ich historie',
      icon: '🗺️'
    },
    {
      title: 'Dokumentuj',
      description: 'Zgłaszaj nowe drzewa, dodawaj zdjęcia i opisy',
      icon: '📸'
    },
    {
      title: 'Chroń',
      description: 'Generuj wnioski do gmin o uznanie drzew za pomniki przyrody',
      icon: '🛡️'
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-800 dark:to-dark-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text mb-4">
            Jak działamy?
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Społeczność miłośników przyrody współtworząca największy rejestr polskich drzew
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-dark-border"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
