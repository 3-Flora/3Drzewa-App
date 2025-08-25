import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FormsSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
  hasForms: boolean;
}

const FormsSearchFilter: React.FC<FormsSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  hasForms,
}) => {
  if (!hasForms) return null;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Szukaj wniosków..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 transition-colors"
        />
      </div>
      
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 appearance-none bg-white min-w-48"
        >
          <option value="all">Wszystkie statusy</option>
          <option value="draft">Szkice</option>
          <option value="sent">Wysłane</option>
          <option value="processed">Przetworzone</option>
        </select>
      </div>
    </div>
  );
};

export default FormsSearchFilter;
