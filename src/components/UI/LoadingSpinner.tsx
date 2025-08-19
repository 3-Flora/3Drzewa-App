import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-emerald-200/30 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner spinning ring */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-emerald-500 border-r-emerald-400 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-2 h-2 bg-emerald-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
      <div className="ml-4">
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
        <motion.p
          className="text-emerald-600 text-sm font-medium mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Ładowanie...
        </motion.p>
      </div>
    </div>
  );
};

// Simple version for inline use
export const SimpleSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-emerald-200/50 border-t-emerald-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default LoadingSpinner;