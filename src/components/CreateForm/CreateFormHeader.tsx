import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Bot } from 'lucide-react';

interface CreateFormHeaderProps {
  onShowInstructions?: () => void;
  onShowAIAssistant?: () => void;
}

const CreateFormHeader: React.FC<CreateFormHeaderProps> = ({ 
  onShowInstructions, 
  onShowAIAssistant 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
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
        
        <div className="flex items-center space-x-3">
          {onShowAIAssistant && (
            <button
              onClick={onShowAIAssistant}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>Asystent AI</span>
            </button>
          )}
          
          {onShowInstructions && (
            <button
              onClick={onShowInstructions}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Instrukcje</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFormHeader;
