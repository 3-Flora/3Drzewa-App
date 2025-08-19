import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { MunicipalForm } from '../../types';
import FormCardHeader from './FormCardHeader';
import FormCardContent from './FormCardContent';
import FormCardActions from './FormCardActions';

interface FormCardProps {
  form: MunicipalForm;
  index: number;
  onPreview: (form: MunicipalForm) => void;
  onDownload: (form: MunicipalForm) => void;
  onSend: (formId: string) => void;
  onDelete: (formId: string) => void;
}

const FormCard: React.FC<FormCardProps> = ({
  form,
  index,
  onPreview,
  onDownload,
  onSend,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-300"
    >
      <FormCardHeader
        municipalityName={form.municipalityName}
        formId={form.id}
        status={form.status}
      />
      
      <FormCardContent
        applicantName={form.applicantName}
        generatedDate={form.generatedDate}
        applicantAddress={form.applicantAddress}
        treeId={form.treeId}
        content={form.content}
      />

      <FormCardActions
        formId={form.id}
        status={form.status}
        onPreview={() => onPreview(form)}
        onDownload={() => onDownload(form)}
        onSend={() => onSend(form.id)}
        onDelete={() => onDelete(form.id)}
      />
      
      {/* Single Action Button at Bottom */}
      <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-100">
        <div className="flex justify-center">
          <button
            onClick={() => onPreview(form)}
            className="btn-green flex items-center space-x-2 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Eye className="w-5 h-5" />
            <span>Zobacz wniosek</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FormCard;
