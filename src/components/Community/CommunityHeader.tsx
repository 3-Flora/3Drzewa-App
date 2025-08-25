import React from 'react';
import { Search, Filter } from 'lucide-react';

interface CommunityHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Społeczność</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Szukaj drzew, gatunków, lokalizacji..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">Wszystkie</option>
            <option value="monument">Pomniki przyrody</option>
            <option value="approved">Zatwierdzone</option>
            <option value="pending">Oczekujące</option>
            <option value="rejected">Odrzucone</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
