import React from 'react';

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh }) => {
  return (
    <div className="text-center">
      <button
        onClick={onRefresh}
        className="btn-green px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        Odśwież statystyki
      </button>
    </div>
  );
};

export default RefreshButton;
