import React from 'react';
import { FileText } from 'lucide-react';

const InfoBox = () => {
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-blue-800 mb-2">Informacja o wnioskach</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            Wnioski do gmin można składać tylko dla <strong>zatwierdzonych drzew</strong> lub <strong>pomników przyrody</strong>. 
            Drzewa oczekujące na weryfikację nie kwalifikują się do składania wniosków.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
