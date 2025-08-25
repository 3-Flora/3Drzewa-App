import React from 'react';
import { Activity, CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatusBreakdownProps {
  approvedTrees: number;
  pendingVerifications: number;
  rejectedTrees: number;
}

const StatusBreakdown: React.FC<StatusBreakdownProps> = ({
  approvedTrees,
  pendingVerifications,
  rejectedTrees
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Activity className="w-6 h-6 mr-3 text-blue-600" />
        Status zgłoszeń
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{approvedTrees.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Zatwierdzone</div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{pendingVerifications.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Oczekujące</div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{rejectedTrees.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Odrzucone</div>
        </div>
      </div>
    </div>
  );
};

export default StatusBreakdown;
