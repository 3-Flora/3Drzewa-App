import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onChange: () => void;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onChange, className = '' }) => {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors ${className} ${
        isOn ? 'bg-emerald-500' : 'bg-gray-300'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
        isOn ? 'translate-x-6' : 'translate-x-0.5'
      }`} />
    </button>
  );
};

export default ToggleSwitch;
