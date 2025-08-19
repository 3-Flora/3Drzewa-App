import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface FormCardHeaderProps {
  municipalityName: string;
  formId: string;
  status: string;
}

const FormCardHeader: React.FC<FormCardHeaderProps> = ({
  municipalityName,
  formId,
  status,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'draft': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'sent': return 'Wysłany';
      case 'processed': return 'Przetworzony';
      case 'draft': return 'Szkic';
      default: return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b-2 border-green-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Wniosek do {municipalityName}
            </h3>
            <p className="text-gray-600">ID: {formId}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormCardHeader;
