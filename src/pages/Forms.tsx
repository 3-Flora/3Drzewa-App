import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchMunicipalForms } from '../utils/api';
import { MunicipalForm } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useNavigationHistory } from '../hooks/useNavigationHistory';
import {
  FormsHeader,
  FormsSearchFilter,
  FormsHowToCreate,
  FormsEmptyState,
  FormCard,
  FormPreviewModal
} from '../components/Forms';

const Forms = () => {
  const { navigateWithHistory } = useNavigationHistory();
  const [forms, setForms] = useState<MunicipalForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<MunicipalForm | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const formsData = await fetchMunicipalForms();
      setForms(formsData);
    } catch (error) {
      console.error('Error loading forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (form: MunicipalForm) => {
    // TODO: podłączyć do backendu .NET API GET /api/forms/{formId}/pdf
    const blob = new Blob([form.content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wniosek-${form.municipalityName}-${form.generatedDate}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSend = async (formId: string) => {
    // TODO: podłączyć do backendu .NET API POST /api/forms/{formId}/send
    setForms(prev => prev.map(form => 
      form.id === formId 
        ? { ...form, status: 'sent' }
        : form
    ));
  };

  const handleDelete = async (formId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten wniosek?')) return;
    
    // TODO: podłączyć do backendu .NET API DELETE /api/forms/{formId}
    setForms(prev => prev.filter(form => form.id !== formId));
  };

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.municipalityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || form.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-dark-text-secondary">Ładowanie wniosków...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <FormsHeader />
        
        <FormsSearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          hasForms={forms.length > 0}
        />

        <FormsHowToCreate />

        {/* Forms List */}
        {filteredForms.length === 0 ? (
          <FormsEmptyState />
        ) : (
          <div className="grid gap-6">
            {filteredForms.map((form, index) => (
              <FormCard
                key={form.id}
                form={form}
                index={index}
                onPreview={(form) => {
                  setSelectedForm(form);
                  setShowPreview(true);
                }}
                onDownload={handleDownload}
                onSend={handleSend}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Preview Modal */}
        <FormPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          form={selectedForm}
          onDownload={handleDownload}
          onSend={handleSend}
        />
      </motion.div>
    </div>
  );
};

export default Forms;