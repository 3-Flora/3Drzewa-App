import React from 'react';
import { Search, Filter } from 'lucide-react';

interface LegendsSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterRegion: string;
  setFilterRegion: (region: string) => void;
  regions: string[];
}

const LegendsSearchFilter: React.FC<LegendsSearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterRegion,
  setFilterRegion,
  regions
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Szukaj legend, gatunków, lokalizacji..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-300 bg-white shadow-lg"
        />
      </div>
      
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-300 appearance-none bg-white min-w-48 shadow-lg"
        >
          <option value="all">Wszystkie regiony</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LegendsSearchFilter;
