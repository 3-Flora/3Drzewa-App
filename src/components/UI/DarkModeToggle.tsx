import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      style={{
        backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
        color: isDarkMode ? '#fbbf24' : '#f59e0b',
        border: `1px solid ${isDarkMode ? '#374151' : '#d1d5db'}`
      }}
      title={isDarkMode ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny'}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;
