import React from 'react';
import { User, Calendar, MapPin, TreePine } from 'lucide-react';

interface FormCardContentProps {
  applicantName: string;
  generatedDate: string;
  applicantAddress: string;
  treeId: string;
  content: string;
}

const FormCardContent: React.FC<FormCardContentProps> = ({
  applicantName,
  generatedDate,
  applicantAddress,
  treeId,
  content,
}) => {
  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Wnioskodawca:</span>
            <span className="font-medium text-gray-800">{applicantName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Data utworzenia:</span>
            <span className="font-medium text-gray-800">
              {new Date(generatedDate).toLocaleDateString('pl-PL')}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Adres:</span>
            <span className="font-medium text-gray-800 text-sm">{applicantAddress}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TreePine className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">ID drzewa:</span>
            <span className="font-medium text-gray-800">{treeId}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Podgląd treści:</h4>
        <p className="text-gray-700 text-sm line-clamp-3">
          {content.substring(0, 200)}...
        </p>
      </div>
    </div>
  );
};

export default FormCardContent;
