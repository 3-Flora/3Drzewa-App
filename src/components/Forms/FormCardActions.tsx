import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download, Edit, Send, Trash2 } from 'lucide-react';

interface FormCardActionsProps {
  formId: string;
  status: string;
  onPreview: () => void;
  onDownload: () => void;
  onSend: () => void;
  onDelete: () => void;
}

const FormCardActions: React.FC<FormCardActionsProps> = ({
  formId,
  status,
  onPreview,
  onDownload,
  onSend,
  onDelete,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onPreview}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        style={{ 
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: '#1d4ed8'
        }}
      >
        <Eye className="w-4 h-4" />
        <span>Podgląd</span>
      </button>
      
      <button
        onClick={onDownload}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        style={{ 
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          color: '#15803d'
        }}
      >
        <Download className="w-4 h-4" />
        <span>Pobierz PDF</span>
      </button>
      
      {status === 'draft' && (
        <>
          <Link
            to={`/forms/edit/${formId}`}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            style={{ 
              background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(107, 114, 128, 0.05) 100%)',
              border: '1px solid rgba(107, 114, 128, 0.3)',
              color: '#374151'
            }}
          >
            <Edit className="w-4 h-4" />
            <span>Edytuj</span>
          </Link>
          
          <button
            onClick={onSend}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            style={{ 
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
              border: '1px solid rgba(5, 150, 105, 0.6)',
              color: 'white'
            }}
          >
            <Send className="w-4 h-4" />
            <span>Wyślij</span>
          </button>
          
          <button
            onClick={onDelete}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            style={{ 
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#dc2626'
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span>Usuń</span>
          </button>
        </>
      )}
    </div>
  );
};

export default FormCardActions;
