import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Edit, 
  Send, 
  Plus,
  Calendar,
  MapPin,
  TreePine,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  Filter,
  Search
} from 'lucide-react';
import { fetchMunicipalForms } from '../utils/api';
import { MunicipalForm } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Modal from '../components/UI/Modal';

const Forms = () => {
  const navigate = useNavigate();
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie wniosków...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wnioski do gmin</h1>
          <p className="text-gray-600">Zarządzaj wnioskami o uznanie za pomnik przyrody</p>
        </div>

        {/* Search and Filter */}
        {forms.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Szukaj wniosków..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 transition-colors"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 appearance-none bg-white min-w-48"
              >
                <option value="all">Wszystkie statusy</option>
                <option value="draft">Szkice</option>
                <option value="sent">Wysłane</option>
                <option value="processed">Przetworzone</option>
              </select>
            </div>
          </div>
        )}

        {/* How to create form - moved above list */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-600" />
            Jak stworzyć wniosek?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-green-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Znajdź drzewo</h4>
              <p className="text-xs text-gray-600">Wybierz swoje drzewo oczekujące na weryfikację lub pomnik przyrody</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Wypełnij dane</h4>
              <p className="text-xs text-gray-600">Uzupełnij informacje o gminie i uzasadnienie</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Wygeneruj PDF</h4>
              <p className="text-xs text-gray-600">Pobierz gotowy wniosek i wyślij do gminy</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              to="/forms/create"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{ 
                background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(5, 150, 105, 0.6)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 1) 0%, rgba(5, 150, 105, 0.8) 100%)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(5, 150, 105, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Rozpocznij tworzenie wniosku</span>
            </Link>
          </div>
        </div>

        {/* Forms List */}
        {filteredForms.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-12">
              <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-gray-800 mb-4">
                {forms.length === 0 ? 'Brak wniosków' : 'Brak wyników'}
              </h3>
              <p className="text-gray-600 mb-8">
                {forms.length === 0 
                  ? 'Nie masz jeszcze żadnych wygenerowanych wniosków.'
                  : 'Spróbuj zmienić kryteria wyszukiwania.'
                }
              </p>
              {forms.length === 0 && (
                <button
                  onClick={() => navigate('/forms/create')}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(5, 150, 105, 0.6)',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 1) 0%, rgba(5, 150, 105, 0.8) 100%)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(5, 150, 105, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <TreePine className="w-4 h-4" />
                  <span>Stwórz pierwszy wniosek</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-300"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b-2 border-green-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          Wniosek do {form.municipalityName}
                        </h3>
                        <p className="text-gray-600">ID: {form.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(form.status)}
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(form.status)}`}>
                        {getStatusLabel(form.status)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Wnioskodawca:</span>
                        <span className="font-medium text-gray-800">{form.applicantName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Data utworzenia:</span>
                        <span className="font-medium text-gray-800">
                          {new Date(form.generatedDate).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Adres:</span>
                        <span className="font-medium text-gray-800 text-sm">{form.applicantAddress}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TreePine className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">ID drzewa:</span>
                        <span className="font-medium text-gray-800">{form.treeId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Podgląd treści:</h4>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {form.content.substring(0, 200)}...
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setSelectedForm(form);
                        setShowPreview(true);
                      }}
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
                      onClick={() => handleDownload(form)}
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
                    
                    {form.status === 'draft' && (
                      <>
                        <Link
                          to={`/forms/edit/${form.id}`}
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
                          onClick={() => handleSend(form.id)}
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
                          onClick={() => handleDelete(form.id)}
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
                </div>
                
                {/* Single Action Button at Bottom */}
                <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-100">
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedForm(form);
                        setShowPreview(true);
                      }}
                      className="btn-green flex items-center space-x-2 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <Eye className="w-5 h-5" />
                      <span>Zobacz wniosek</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        <Modal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title={`Podgląd wniosku - ${selectedForm?.municipalityName}`}
        >
          {selectedForm && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">
                      Wniosek do {selectedForm.municipalityName}
                    </h4>
                    <p className="text-gray-600">ID: {selectedForm.id}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600"><strong>Wnioskodawca:</strong></p>
                    <p className="font-medium text-gray-800">{selectedForm.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Data utworzenia:</strong></p>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedForm.generatedDate).toLocaleDateString('pl-PL')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Status:</strong></p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(selectedForm.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedForm.status)}`}>
                        {getStatusLabel(selectedForm.status)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>ID drzewa:</strong></p>
                    <p className="font-medium text-gray-800">{selectedForm.treeId}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl max-h-96 overflow-y-auto">
                <h5 className="font-semibold text-gray-800 mb-3">Treść wniosku:</h5>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                  {selectedForm.content}
                </pre>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleDownload(selectedForm)}
                  className="btn-green flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Pobierz PDF</span>
                </button>
                {selectedForm.status === 'draft' && (
                  <button
                    onClick={() => {
                      handleSend(selectedForm.id);
                      setShowPreview(false);
                    }}
                    className="btn-green flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Wyślij do gminy</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </Modal>
      </motion.div>
    </div>
  );
};

export default Forms;