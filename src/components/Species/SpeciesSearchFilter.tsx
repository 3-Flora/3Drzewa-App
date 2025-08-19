import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SpeciesSearchFilterProps {
  searchTerm: string;
  filterFamily: string;
  families: string[];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

const SpeciesSearchFilter: React.FC<SpeciesSearchFilterProps> = ({
  searchTerm,
  filterFamily,
  families,
  onSearchChange,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Szukaj gatunków po nazwie polskiej lub łacińskiej..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={filterFamily}
          onChange={(e) => onFilterChange(e.target.value)}
          className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white min-w-48"
        >
          <option value="all">Wszystkie rodziny</option>
          {families.map(family => (
            <option key={family} value={family}>{family}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SpeciesSearchFilter;
