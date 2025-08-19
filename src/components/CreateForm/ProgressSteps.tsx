import React from 'react';

interface ProgressStepsProps {
  currentStep: 'municipality' | 'report' | 'tree' | 'summary';
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = ['municipality', 'report', 'tree', 'summary'];
  const stepTitles = {
    municipality: 'Wybierz gminę',
    report: 'Wybierz typ raportu',
    tree: 'Wybierz drzewo',
    summary: 'Podsumowanie i generowanie'
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-100 p-6">
      <div className="flex items-center justify-center space-x-4 mb-6 max-w-2xl mx-auto">
        {steps.map((stepName, index) => (
          <React.Fragment key={stepName}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              currentStep === stepName 
                ? 'bg-green-600 text-white' 
                : index < steps.indexOf(currentStep)
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {index + 1}
            </div>
            {index < 3 && (
              <div className={`w-12 h-1 ${
                index < steps.indexOf(currentStep)
                  ? 'bg-green-600'
                  : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-gray-800 text-center">{stepTitles[currentStep]}</h1>
    </div>
  );
};

export default ProgressSteps;
