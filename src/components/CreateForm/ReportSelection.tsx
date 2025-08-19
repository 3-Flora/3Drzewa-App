import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  template: string;
}

interface ReportSelectionProps {
  reports: Report[];
  selectedReport: Report | null;
  onReportSelect: (report: Report) => void;
}

const ReportSelection: React.FC<ReportSelectionProps> = ({
  reports,
  selectedReport,
  onReportSelect,
}) => {
  return (
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
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => onReportSelect(report)}
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
  );
};

export default ReportSelection;
