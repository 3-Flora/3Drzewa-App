import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useNavigationHistory } from '../hooks/useNavigationHistory';
import { TreeSubmission, Municipality, ReportType } from '../types';
import { fetchUserTrees, fetchMunicipalities, fetchReportTypes } from '../utils/api';
import {
  MunicipalitySelection,
  ReportSelection,
  TreeSelection,
  SummaryStep,
  ProgressSteps,
  NavigationButtons,
  AIAssistantModal,
  InstructionsModal,
  CreateFormHeader
} from '../components/CreateForm';

const CreateForm = () => {
  const { navigateWithHistory } = useNavigationHistory();
  const { user } = useAuth();
  
  const [step, setStep] = useState<'municipality' | 'report' | 'tree' | 'summary'>('municipality');
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [reports, setReports] = useState<ReportType[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
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
      loadMunicipalities();
      loadReportTypes();
    }
  }, [user]);

  const loadMunicipalities = async () => {
    try {
      const municipalitiesData = await fetchMunicipalities();
      setMunicipalities(municipalitiesData);
    } catch (error) {
      console.error('Error loading municipalities:', error);
    }
  };

  const loadReportTypes = async () => {
    try {
      const reportsData = await fetchReportTypes();
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading report types:', error);
    }
  };

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
- Gatunek: ${selectedTree.species} (${selectedTree.speciesLatin})
- Pierśnica: ${selectedTree.circumference} cm
- Wysokość: ${selectedTree.height || 'nie określono'} m
- Stan zdrowotny: ${selectedTree.condition}
- Lokalizacja: ${selectedTree.location.address}

UZASADNIENIE:
Drzewo to wyróżnia się szczególnymi walorami przyrodniczymi i krajobrazowymi. Jego imponujące rozmiary i doskonały stan zdrowotny świadczą o długowieczności i odporności na czynniki środowiskowe. Lokalizacja w ${selectedMunicipality?.name || 'wybranej gminie'} czyni je ważnym elementem lokalnego ekosystemu i krajobrazu.

WARTOŚĆ NAUKOWA:
Drzewo może służyć jako materiał badawczy dla dendrologów i ekologów, szczególnie w kontekście badań nad długowiecznością gatunku ${selectedTree.species} w warunkach miejskich.

WARTOŚĆ KULTUROWA I HISTORYCZNA:
Drzewo stanowi żywy pomnik historii lokalnej społeczności i może być związane z ważnymi wydarzeniami historycznymi lub tradycjami kulturowymi.

WARTOŚĆ KRAJOBRAZOWA:
Drzewo wzbogaca krajobraz ${selectedMunicipality?.name || 'gminy'} i stanowi ważny element zieleni miejskiej, poprawiając jakość życia mieszkańców.

WNIOSEK:
W związku z powyższym, wnoszę o uznanie opisanego drzewa za pomnik przyrody zgodnie z obowiązującymi przepisami prawa.`;

      setAiSuggestion(suggestion);
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
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

  const handleRegenerateAI = () => {
    setAiSuggestion('');
  };

  const handleGenerateForm = async () => {
    if (!selectedTree || !selectedMunicipality || !selectedReport) return;
    
    setGenerating(true);
    try {
      // TODO: podłączyć do backendu .NET API POST /api/forms/generate
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate PDF generation
      setGeneratedPdfUrl('https://example.com/generated-form.pdf');
      setShowInstructions(true);
    } catch (error) {
      console.error('Error generating form:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    // TODO: Implement actual PDF download
    alert('Pobieranie PDF - funkcjonalność w przygotowaniu');
  };

  const handleNavigateToForms = () => {
    navigateWithHistory('/forms');
  };

  const canProceed = () => {
    switch (step) {
      case 'municipality':
        return selectedMunicipality !== null;
      case 'report':
        return selectedReport !== null;
      case 'tree':
        return selectedTree !== null;
      case 'summary':
        return selectedTree !== null && selectedMunicipality !== null && selectedReport !== null;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (step === 'municipality') setStep('report');
    else if (step === 'report') setStep('tree');
    else if (step === 'tree') setStep('summary');
  };

  const prevStep = () => {
    if (step === 'summary') setStep('tree');
    else if (step === 'tree') setStep('report');
    else if (step === 'report') setStep('municipality');
  };

  const handleFormDataChange = (field: 'additionalInfo' | 'justification', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-text mb-4">Musisz być zalogowany</h2>
          <p className="text-gray-600 dark:text-dark-text-secondary">Zaloguj się, aby utworzyć wniosek do gminy.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <CreateFormHeader />
        
        <ProgressSteps currentStep={step} />
        
        {/* Step Content */}
        <div className="min-h-96">
          {step === 'municipality' && (
            <MunicipalitySelection
              municipalities={municipalities}
              selectedMunicipality={selectedMunicipality}
              onMunicipalitySelect={setSelectedMunicipality}
            />
          )}
          
          {step === 'report' && (
            <ReportSelection
              reports={reports}
              selectedReport={selectedReport}
              onReportSelect={setSelectedReport}
            />
          )}
          
          {step === 'tree' && (
            <TreeSelection
              userTrees={userTrees}
              selectedTree={selectedTree}
              onTreeSelect={setSelectedTree}
              loading={loading}
            />
          )}
          
          {step === 'summary' && (
            <SummaryStep
              selectedMunicipality={selectedMunicipality}
              selectedReport={selectedReport}
              selectedTree={selectedTree}
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onAIAssistantClick={() => setShowAIAssistant(true)}
            />
          )}
        </div>
        
        <NavigationButtons
          step={step}
          canProceed={canProceed()}
          onNext={nextStep}
          onBack={prevStep}
          onGenerate={handleGenerateForm}
          generating={generating}
        />
        
        {/* Modals */}
        <AIAssistantModal
          isOpen={showAIAssistant}
          onClose={() => setShowAIAssistant(false)}
          aiSuggestion={aiSuggestion}
          aiLoading={aiLoading}
          onGenerateSuggestion={handleAIAssistant}
          onUseSuggestion={handleUseAISuggestion}
          onRegenerate={handleRegenerateAI}
        />
        
        <InstructionsModal
          isOpen={showInstructions}
          onClose={() => setShowInstructions(false)}
          onDownloadPdf={handleDownloadPdf}
          onNavigateToForms={handleNavigateToForms}
        />
      </motion.div>
    </div>
  );
};

export default CreateForm;