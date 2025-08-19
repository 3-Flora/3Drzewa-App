import React from 'react';
import { ArrowLeft, ChevronDown, FileText } from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';

interface NavigationButtonsProps {
  step: 'municipality' | 'report' | 'tree' | 'summary';
  canProceed: boolean;
  generating: boolean;
  onBack: () => void;
  onNext: () => void;
  onGenerate: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  step,
  canProceed,
  generating,
  onBack,
  onNext,
  onGenerate,
}) => {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-100">
      <button
        onClick={onBack}
        disabled={step === 'municipality'}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold ${
          step === 'municipality'
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Wstecz</span>
      </button>

      {step !== 'summary' ? (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
            canProceed
              ? 'text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          style={canProceed ? { 
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(5, 150, 105, 0.6)'
          } : {}}
        >
          <span>Dalej</span>
          <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
        </button>
      ) : (
        <button
          onClick={onGenerate}
          disabled={generating}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white"
          style={{ 
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(5, 150, 105, 0.6)'
          }}
        >
          {generating ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>Wygeneruj PDF</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
