import React from 'react';
import { CheckCircle, Mail, Download } from 'lucide-react';
import Modal from '../UI/Modal';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
  onNavigateToForms: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onDownloadPdf,
  onNavigateToForms,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Wniosek został wygenerowany!"
    >
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Sukces!</h3>
          <p className="text-gray-600">Twój wniosek został pomyślnie wygenerowany jako PDF.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-100">
          <h4 className="font-bold text-green-800 mb-3">Następne kroki:</h4>
          <ol className="list-decimal list-inside space-y-2 text-green-700">
            <li>Pobierz wygenerowany PDF</li>
            <li>Wyślij wniosek przez ePUAP (Elektroniczna Platforma Usług Administracji Publicznej)</li>
            <li>Alternatywnie: wyślij wniosek pocztą tradycyjną do wybranej gminy</li>
            <li>Oczekuj odpowiedzi od gminy (zazwyczaj 30 dni)</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-100">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Wysyłanie przez ePUAP
          </h4>
          <p className="text-blue-700 text-sm mb-3">
            Zalecamy wysyłanie przez ePUAP - jest to szybsze i masz potwierdzenie doręczenia.
          </p>
          <a
            href="https://epuap.gov.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.7) 100%)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(59, 130, 246, 0.6)'
            }}
          >
            <Mail className="w-4 h-4" />
            <span>Przejdź do ePUAP</span>
          </a>
        </div>

        <div className="flex justify-center space-x-3">
          <button
            onClick={onDownloadPdf}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-white text-sm"
            style={{ 
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(5, 150, 105, 0.6)'
            }}
          >
            <Download className="w-4 h-4" />
            <span>Pobierz PDF</span>
          </button>
          
          <button
            onClick={onNavigateToForms}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-bold text-sm"
          >
            Powrót do wniosków
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InstructionsModal;
