import React from 'react';
import { User, Calendar, Award, CheckCircle, Clock, XCircle } from 'lucide-react';

interface VerifyTreeCardHeaderProps {
  userId: string;
  submissionDate: string;
  status: string;
}

const VerifyTreeCardHeader: React.FC<VerifyTreeCardHeaderProps> = ({
  userId,
  submissionDate,
  status,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'monument': return 'Pomnik przyrody';
      case 'approved': return 'Zatwierdzony';
      case 'pending': return 'Oczekuje weryfikacji';
      case 'rejected': return 'Odrzucony';
      default: return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monument': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Użytkownik #{userId}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{new Date(submissionDate).toLocaleDateString('pl-PL')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyTreeCardHeader;
