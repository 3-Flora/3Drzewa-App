import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Building, FileText, TreePine, Bot, Sparkles } from 'lucide-react';

interface Municipality {
  id: string;
  name: string;
  voivodeship: string;
}

interface Report {
  id: string;
  name: string;
  description: string;
  template: string;
}

interface TreeSubmission {
  id: string;
  species: string;
  circumference: number;
}

interface FormData {
  additionalInfo: string;
  justification: string;
}

interface SummaryStepProps {
  selectedMunicipality: Municipality | null;
  selectedReport: Report | null;
  selectedTree: TreeSubmission | null;
  formData: FormData;
  onFormDataChange: (field: keyof FormData, value: string) => void;
  onAIAssistantClick: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  selectedMunicipality,
  selectedReport,
  selectedTree,
  formData,
  onFormDataChange,
  onAIAssistantClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <FileCheck className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Podsumowanie wniosku</h2>
        <p className="text-gray-600">Sprawdź dane przed wygenerowaniem PDF</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2 flex items-center">
            <Building className="w-4 h-4 mr-2" />
            Gmina
          </h3>
          <p className="text-blue-700">{selectedMunicipality?.name}</p>
          <p className="text-sm text-blue-600">{selectedMunicipality?.voivodeship}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border-2 border-green-100">
          <h3 className="font-bold text-green-800 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Raport
          </h3>
          <p className="text-green-700 text-sm">{selectedReport?.name}</p>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-100">
          <h3 className="font-bold text-emerald-800 mb-2 flex items-center">
            <TreePine className="w-4 h-4 mr-2" />
            Drzewo
          </h3>
          <p className="text-emerald-700">{selectedTree?.species}</p>
          <p className="text-sm text-emerald-600">Pierśnica: {selectedTree?.circumference} cm</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Uzasadnienie wniosku
            </label>
            <button
              onClick={onAIAssistantClick}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Bot className="w-4 h-4" />
              <Sparkles className="w-3 h-3" />
              <span>Pomoc AI</span>
            </button>
          </div>
          <textarea
            value={formData.justification}
            onChange={(e) => onFormDataChange('justification', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 transition-colors resize-none"
            placeholder="Uzasadnienie dlaczego drzewo powinno być objęte ochroną..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dodatkowe informacje (opcjonalnie)
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => onFormDataChange('additionalInfo', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 transition-colors resize-none"
            placeholder="Dodatkowe uwagi, załączniki, kontakt..."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryStep;
