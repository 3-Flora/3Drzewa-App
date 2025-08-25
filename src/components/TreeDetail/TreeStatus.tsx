import React from 'react';
import { Award, CheckCircle, Clock, XCircle } from 'lucide-react';

interface TreeStatusProps {
  status: string;
}

const TreeStatus: React.FC<TreeStatusProps> = ({ status }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
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
    <div className="glass bg-yellow-50 border-2 border-yellow-200 px-3 py-2 rounded-xl inline-flex items-center space-x-2">
      {getStatusIcon(status)}
      <span className={`text-sm font-bold ${getStatusColor(status).replace('bg-', 'text-').replace('-100', '-800')}`}>
        {getStatusLabel(status)}
      </span>
    </div>
  );
};

export default TreeStatus;
