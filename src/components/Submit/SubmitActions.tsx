import React from 'react';
import { Save, FileText } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import LoadingSpinner from '../UI/LoadingSpinner';

interface SubmitActionsProps {
  loading: boolean;
  generatingForm: boolean;
  isMonument: boolean;
}

const SubmitActions: React.FC<SubmitActionsProps> = ({ 
  loading, 
  generatingForm, 
  isMonument 
}) => {
  const { watch } = useFormContext();
  const isMonumentChecked = watch('isMonument');

  return (
    <div className="flex flex-col md:flex-row gap-4 pt-6">
      <button
        type="submit"
        disabled={loading || generatingForm}
        className="flex-1 flex items-center justify-center space-x-2 glass-accent glass-accent-hover text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium disabled:opacity-50 shadow-lg"
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <Save className="w-2 h-5" />
            <span>Wyślij zgłoszenie</span>
          </>
        )}
      </button>

      {isMonumentChecked && (
        <div className="flex items-center space-x-2 text-sm text-gray-600 glass p-3 rounded-lg shadow-lg">
          <FileText className="w-4 h-4 text-amber-600" />
          <span>Po wysłaniu zostanie wygenerowany wniosek do gminy</span>
          {generatingForm && <LoadingSpinner size="sm" />}
        </div>
      )}
    </div>
  );
};

export default SubmitActions;
