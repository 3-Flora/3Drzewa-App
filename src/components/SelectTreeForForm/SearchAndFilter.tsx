import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Szukaj swoich drzew..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 transition-colors"
        />
      </div>
      
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 appearance-none bg-white min-w-48"
        >
          <option value="approved">Zatwierdzone</option>
          <option value="monument">Pomniki przyrody</option>
          <option value="all">Wszystkie kwalifikujące się</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
