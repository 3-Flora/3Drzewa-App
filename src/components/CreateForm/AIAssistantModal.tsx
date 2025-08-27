import React from 'react';
import { Bot, Sparkles, Loader, CheckCircle } from 'lucide-react';
import Modal from '../UI/Modal';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiSuggestion: string;
  aiLoading: boolean;
  onGenerateSuggestion: () => void;
  onUseSuggestion: () => void;
  onRegenerate: () => void;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  aiSuggestion,
  aiLoading,
  onGenerateSuggestion,
  onUseSuggestion,
  onRegenerate,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asystent AI - Pomoc w tworzeniu wniosku"
    >
      <div className="space-y-6">
                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-700 dark:to-dark-800 p-6 rounded-xl border-2 border-blue-100 dark:border-dark-border transition-colors duration-200">
           <div className="flex items-center space-x-3 mb-4">
             <div className="w-12 h-12 bg-blue-100 dark:bg-dark-600 rounded-full flex items-center justify-center">
               <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
             </div>
             <div>
               <h3 className="font-bold text-gray-800 dark:text-dark-text">Asystent AI</h3>
               <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Pomogę Ci stworzyć profesjonalne uzasadnienie</p>
             </div>
           </div>
          
          {!aiSuggestion ? (
            <div className="text-center">
                             <p className="text-gray-700 dark:text-dark-text-secondary mb-4">
                 Kliknij poniżej, aby wygenerować sugestię uzasadnienia na podstawie wybranych danych.
               </p>
              <button
                onClick={onGenerateSuggestion}
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
              <div className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border max-h-64 overflow-y-auto transition-colors duration-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-dark-text font-sans">
                  {aiSuggestion}
                </pre>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onRegenerate}
                  className="px-4 py-2 text-gray-600 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text transition-colors"
                >
                  Wygeneruj ponownie
                </button>
                <button
                  onClick={onUseSuggestion}
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
  );
};

export default AIAssistantModal;
