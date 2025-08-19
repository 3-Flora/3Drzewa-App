import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, Download, Send } from 'lucide-react';
import { MunicipalForm } from '../../types';
import Modal from '../UI/Modal';

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: MunicipalForm | null;
  onDownload: (form: MunicipalForm) => void;
  onSend: (formId: string) => void;
}

const FormPreviewModal: React.FC<FormPreviewModalProps> = ({
  isOpen,
  onClose,
  form,
  onDownload,
  onSend,
}) => {
  if (!form) return null;

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Podgląd wniosku - ${form.municipalityName}`}
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">
                Wniosek do {form.municipalityName}
              </h4>
              <p className="text-gray-600">ID: {form.id}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600"><strong>Wnioskodawca:</strong></p>
              <p className="font-medium text-gray-800">{form.applicantName}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Data utworzenia:</strong></p>
              <p className="font-medium text-gray-800">
                {new Date(form.generatedDate).toLocaleDateString('pl-PL')}
              </p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Status:</strong></p>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusIcon(form.status)}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(form.status)}`}>
                  {getStatusLabel(form.status)}
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-600"><strong>ID drzewa:</strong></p>
              <p className="font-medium text-gray-800">{form.treeId}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border-2 border-gray-200 p-6 rounded-xl max-h-96 overflow-y-auto">
          <h5 className="font-semibold text-gray-800 mb-3">Treść wniosku:</h5>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {form.content}
          </pre>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onDownload(form)}
            className="btn-green flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Download className="w-4 h-4" />
            <span>Pobierz PDF</span>
          </button>
          {form.status === 'draft' && (
            <button
              onClick={() => {
                onSend(form.id);
                onClose();
              }}
              className="btn-green flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Send className="w-4 h-4" />
              <span>Wyślij do gminy</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FormPreviewModal;
