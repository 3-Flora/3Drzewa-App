import React from 'react';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';

interface Municipality {
  id: string;
  name: string;
  voivodeship: string;
}

interface MunicipalitySelectionProps {
  municipalities: Municipality[];
  selectedMunicipality: Municipality | null;
  onMunicipalitySelect: (municipality: Municipality) => void;
}

const MunicipalitySelection: React.FC<MunicipalitySelectionProps> = ({
  municipalities,
  selectedMunicipality,
  onMunicipalitySelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Wybierz gminę</h2>
        <p className="text-gray-600">Do której gminy chcesz wysłać wniosek?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {municipalities.map((municipality) => (
          <button
            key={municipality.id}
            onClick={() => onMunicipalitySelect(municipality)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              selectedMunicipality?.id === municipality.id
                ? 'border-green-300 bg-green-50'
                : 'border-gray-200 hover:border-green-200 hover:bg-green-25'
            }`}
          >
            <h3 className="font-bold text-gray-800">{municipality.name}</h3>
            <p className="text-sm text-gray-600">{municipality.voivodeship}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MunicipalitySelection;
