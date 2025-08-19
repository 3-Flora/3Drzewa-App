import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Send, 
  Bot,
  Sparkles,
  MapPin,
  TreePine,
  User,
  Calendar,
  Building,
  AlertCircle,
  CheckCircle,
  Loader,
  ChevronDown,
  Mail,
  FileCheck
} from 'lucide-react';
import { fetchUserTrees, generateMunicipalForm } from '../utils/api';
import { TreeSubmission } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Modal from '../components/UI/Modal';

// Mock data for municipalities and reports
const mockMunicipalities = [
  { id: '1', name: 'Gmina Kraków', voivodeship: 'Małopolskie' },
  { id: '2', name: 'Gmina Warszawa', voivodeship: 'Mazowieckie' },
  { id: '3', name: 'Gmina Gdańsk', voivodeship: 'Pomorskie' },
  { id: '4', name: 'Gmina Wrocław', voivodeship: 'Dolnośląskie' },
  { id: '5', name: 'Gmina Poznań', voivodeship: 'Wielkopolskie' },
  { id: '6', name: 'Gmina Łódź', voivodeship: 'Łódzkie' },
  { id: '7', name: 'Gmina Katowice', voivodeship: 'Śląskie' },
  { id: '8', name: 'Gmina Lublin', voivodeship: 'Lubelskie' },
];

const mockReports = [
  { 
    id: '1', 
    name: 'Wniosek o uznanie za pomnik przyrody', 
    description: 'Standardowy wniosek zgodny z ustawą o ochronie przyrody',
    template: 'standard_monument_request'
  },
  { 
    id: '2', 
    name: 'Wniosek o objęcie ochroną prawną', 
    description: 'Wniosek o objęcie drzewa szczególną ochroną prawną',
    template: 'legal_protection_request'
  },
  { 
    id: '3', 
    name: 'Zgłoszenie zagrożenia pomnika przyrody', 
    description: 'Zgłoszenie zagrożenia dla istniejącego pomnika przyrody',
    template: 'threat_report'
  },
  { 
    id: '4', 
    name: 'Wniosek o rewaloryzację pomnika', 
    description: 'Wniosek o przeprowadzenie prac rewaloryzacyjnych',
    template: 'revaluation_request'
  },
];

const CreateForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [step, setStep] = useState<'municipality' | 'report' | 'tree' | 'summary'>('municipality');
  const [selectedMunicipality, setSelectedMunicipality] = useState<typeof mockMunicipalities[0] | null>(null);
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null);
  const [selectedTree, setSelectedTree] = useState<TreeSubmission | null>(null);
  const [userTrees, setUserTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const [formData, setFormData] = useState({
    additionalInfo: '',
    justification: ''
  });

  useEffect(() => {
    if (user) {
      loadUserTrees();
    }
  }, [user]);

  const loadUserTrees = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const trees = await fetchUserTrees(user.id);
      // Filter for eligible trees (pending or monument)
      const eligibleTrees = trees.filter(tree => 
        tree.status === 'pending' || tree.status === 'monument'
      );
      setUserTrees(eligibleTrees);
    } catch (error) {
      console.error('Error loading user trees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAIAssistant = async () => {
    if (!selectedTree || !selectedReport) return;
    
    setAiLoading(true);
    try {
      // Simulate AI - in reality this would be an API call to OpenAI/Claude
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const suggestion = `Na podstawie wybranego raportu "${selectedReport.name}" dla drzewa ${selectedTree.species} (${selectedTree.speciesLatin}), proponuję następujące uzasadnienie:

PODSTAWA PRAWNA:
Zgodnie z art. 40 ust. 1 ustawy z dnia 16 kwietnia 2004 r. o ochronie przyrody (Dz. U. z 2021 r. poz. 1098 ze zm.), pomnikami przyrody mogą być uznane pojedyncze twory przyrody żywej o szczególnej wartości naukowej, kulturowej, historyczno-pamiątkowej, krajobrazowej lub rzadkości.

CHARAKTERYSTYKA DRZEWA:
• Gatunek: ${selectedTree.species} (${selectedTree.speciesLatin})
• Pierśnica: ${selectedTree.circumference} cm
• Lokalizacja: ${selectedTree.location.address}
• Stan zdrowotny: ${selectedTree.condition === 'excellent' ? 'doskonały' : selectedTree.condition === 'good' ? 'dobry' : 'zadowalający'}

WALORY UZASADNIAJĄCE OCHRONĘ:
1. WALORY PRZYRODNICZE:
   • Imponujące rozmiary świadczące o zaawansowanym wieku
   • ${selectedTree.condition === 'excellent' ? 'Doskonały' : 'Dobry'} stan zdrowotny
   • Potencjalne siedlisko dla lokalnej fauny

2. WALORY KRAJOBRAZOWE:
   • Dominanta krajobrazowa w okolicy
   • Wzbogacenie estetyki przestrzeni
   • Naturalny punkt orientacyjny

3. WALORY KULTUROWE:
   • Świadek lokalnej historii i tradycji
   • Miejsce o znaczeniu dla społeczności lokalnej

WNIOSKUJĘ o ${selectedReport.name.toLowerCase()} dla opisanego drzewa ze względu na jego wyjątkowe walory przyrodnicze, krajobrazowe i kulturowe.`;

      setAiSuggestion(suggestion);
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
      setAiSuggestion('Przepraszamy, wystąpił błąd podczas generowania sugestii AI.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleUseAISuggestion = () => {
    setFormData(prev => ({
      ...prev,
      justification: aiSuggestion
    }));
    setShowAIAssistant(false);
  };

  const handleGenerate = async () => {
    if (!selectedMunicipality || !selectedReport || !selectedTree) {
      alert('Proszę wypełnić wszystkie wymagane pola.');
      return;
    }

    setGenerating(true);
    try {
      // TODO: Connect to .NET API POST /api/forms/generate
      // Mock PDF generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock PDF URL
      const mockPdfUrl = `https://example.com/forms/wniosek-${selectedMunicipality.name}-${Date.now()}.pdf`;
      setGeneratedPdfUrl(mockPdfUrl);
      setShowInstructions(true);
      
    } catch (error) {
      console.error('Error generating form:', error);
      alert('Wystąpił błąd podczas generowania wniosku.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    // TODO: Implement actual PDF download
    alert('Pobieranie PDF - funkcjonalność w przygotowaniu');
  };

  const getStepTitle = () => {
    switch (step) {
      case 'municipality': return 'Wybierz gminę';
      case 'report': return 'Wybierz typ raportu';
      case 'tree': return 'Wybierz drzewo';
      case 'summary': return 'Podsumowanie i generowanie';
      default: return 'Tworzenie wniosku';
    }
  };

  const canProceed = () => {
    switch (step) {
      case 'municipality': return selectedMunicipality !== null;
      case 'report': return selectedReport !== null;
      case 'tree': return selectedTree !== null;
      case 'summary': return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 'municipality') setStep('report');
    else if (step === 'report') setStep('tree');
    else if (step === 'tree') setStep('summary');
  };

  const handleBack = () => {
    if (step === 'report') setStep('municipality');
    else if (step === 'tree') setStep('report');
    else if (step === 'summary') setStep('tree');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/forms"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Powrót do wniosków</span>
            </Link>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-100 p-6">
          <div className="flex items-center justify-center space-x-4 mb-6 max-w-2xl mx-auto">
            {['municipality', 'report', 'tree', 'summary'].map((stepName, index) => (
              <React.Fragment key={stepName}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step === stepName 
                    ? 'bg-green-600 text-white' 
                    : index < ['municipality', 'report', 'tree', 'summary'].indexOf(step)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-12 h-1 ${
                    index < ['municipality', 'report', 'tree', 'summary'].indexOf(step)
                      ? 'bg-green-600'
                      : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">{getStepTitle()}</h1>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
          {/* Step 1: Municipality Selection */}
          {step === 'municipality' && (
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
                {mockMunicipalities.map((municipality) => (
                  <button
                    key={municipality.id}
                    onClick={() => setSelectedMunicipality(municipality)}
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
          )}

          {/* Step 2: Report Selection */}
          {step === 'report' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">Wybierz typ raportu</h2>
                <p className="text-gray-600">Jaki rodzaj wniosku chcesz złożyć?</p>
              </div>

              <div className="space-y-4">
                {mockReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedReport?.id === report.id
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 hover:border-green-200 hover:bg-green-25'
                    }`}
                  >
                    <h3 className="font-bold text-gray-800 mb-1">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Tree Selection */}
          {step === 'tree' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">Wybierz drzewo</h2>
                <p className="text-gray-600">Które z Twoich drzew dotyczy wniosek?</p>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : userTrees.length === 0 ? (
                <div className="text-center py-8">
                  <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Brak kwalifikujących się drzew
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Aby złożyć wniosek, musisz mieć drzewa oczekujące na weryfikację lub uznane za pomniki przyrody.
                  </p>
                  <Link
                    to="/submit"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                      backdropFilter: 'blur(15px)',
                      border: '2px solid rgba(5, 150, 105, 0.6)',
                      color: 'white'
                    }}
                  >
                    <TreePine className="w-4 h-4" />
                    <span>Zgłoś drzewo</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userTrees.map((tree) => (
                    <button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedTree?.id === tree.id
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 hover:border-green-200 hover:bg-green-25'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{tree.species}</h3>
                          <p className="text-sm text-gray-600 italic mb-2">{tree.speciesLatin}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{tree.location.address}</span>
                            </div>
                            <span>Pierśnica: {tree.circumference} cm</span>
                          </div>
                        </div>
                        {tree.images.length > 0 && (
                          <img
                            src={tree.images[0]}
                            alt={tree.species}
                            className="w-16 h-12 object-cover rounded-lg ml-4"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Summary and Generation */}
          {step === 'summary' && (
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
                      onClick={() => setShowAIAssistant(true)}
                      className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Bot className="w-4 h-4" />
                      <Sparkles className="w-3 h-3" />
                      <span>Pomoc AI</span>
                    </button>
                  </div>
                  <textarea
                    value={formData.justification}
                    onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 transition-colors resize-none"
                    placeholder="Dodatkowe uwagi, załączniki, kontakt..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-100">
            <button
              onClick={handleBack}
              disabled={step === 'municipality'}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold ${
                step === 'municipality'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Wstecz</span>
            </button>

            {step !== 'summary' ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  canProceed()
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                style={canProceed() ? { 
                  background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(5, 150, 105, 0.6)'
                } : {}}
              >
                <span>Dalej</span>
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(5, 150, 105, 0.6)'
                }}
              >
                {generating ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Wygeneruj PDF</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* AI Assistant Modal */}
        <Modal
          isOpen={showAIAssistant}
          onClose={() => setShowAIAssistant(false)}
          title="Asystent AI - Pomoc w tworzeniu wniosku"
        >
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Asystent AI</h3>
                  <p className="text-sm text-gray-600">Pomogę Ci stworzyć profesjonalne uzasadnienie</p>
                </div>
              </div>
              
              {!aiSuggestion ? (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    Kliknij poniżej, aby wygenerować sugestię uzasadnienia na podstawie wybranych danych.
                  </p>
                  <button
                    onClick={handleAIAssistant}
                    disabled={aiLoading}
                    className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold disabled:opacity-50 text-white"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.7) 100%)',
                      backdropFilter: 'blur(15px)',
                      border: '2px solid rgba(59, 130, 246, 0.6)'
                    }}
                  >
                    {aiLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Generuję sugestię...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Wygeneruj sugestię</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                      {aiSuggestion}
                    </pre>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setAiSuggestion('')}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Wygeneruj ponownie
                    </button>
                    <button
                      onClick={handleUseAISuggestion}
                      className="flex items-center space-x-2 px-6 py-2 rounded-xl font-bold text-white"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(5, 150, 105, 0.6)'
                      }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Użyj tej sugestii</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>

        {/* Instructions Modal */}
        <Modal
          isOpen={showInstructions}
          onClose={() => setShowInstructions(false)}
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
                onClick={handleDownloadPdf}
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
                onClick={() => navigate('/forms')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-bold text-sm"
              >
                Powrót do wniosków
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
};

export default CreateForm;